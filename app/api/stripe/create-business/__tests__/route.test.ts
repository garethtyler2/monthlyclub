import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Base mocks (success defaults)
vi.mock('stripe', () => ({
	default: vi.fn().mockImplementation(() => ({
		accounts: {
			create: vi.fn().mockResolvedValue({
				id: 'acct_test123',
				type: 'express',
				business_type: 'individual',
				capabilities: {
					transfers: { requested: true },
					card_payments: { requested: true },
				},
			}),
		},
		accountLinks: {
			create: vi.fn().mockResolvedValue({
				url: 'https://connect.stripe.com/setup/s/test123',
				expires_at: Date.now() + 3600000,
			}),
		},
	}))
}))

vi.mock('@supabase/supabase-js', () => ({
	createClient: vi.fn().mockImplementation(() => ({
		auth: {
			getUser: vi.fn().mockResolvedValue({
				data: { user: { id: 'test-user-id', email: 'test@example.com' } },
				error: null,
			}),
		},
		from: vi.fn().mockReturnValue({
			select: vi.fn().mockReturnValue({
				eq: vi.fn().mockReturnValue({
					single: vi.fn().mockResolvedValue({
						data: {
							id: 'test-business-id',
							stripe_account_id: null,
							slug: 'test-business',
						},
						error: null,
					}),
				}),
			}),
			update: vi.fn().mockReturnValue({
				eq: vi.fn().mockResolvedValue({
					error: null,
				}),
			}),
		}),
	})),
}))

describe('POST /api/stripe/create-business', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('creates Stripe account and returns account link for new business', async () => {
		const { POST } = await import('../route')

		const requestBody = {
			business_type: 'individual',
		}

		const request = new NextRequest('http://localhost:3000/api/stripe/create-business', {
			method: 'POST',
			headers: {
				'authorization': 'Bearer test-token',
				'origin': 'http://localhost:3000',
			},
			body: JSON.stringify(requestBody),
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(200)
		expect(data).toHaveProperty('url')
		expect(data.url).toContain('connect.stripe.com')
	})

	it('returns error for unauthorized request', async () => {
		// Override supabase mock for this test
		const { createClient } = await import('@supabase/supabase-js')
		vi.mocked(createClient).mockImplementationOnce(() => ({
			auth: {
				getUser: vi.fn().mockResolvedValue({
					data: { user: null },
					error: new Error('Unauthorized'),
				}),
			},
		} as any))

		const { POST } = await import('../route')

		const request = new NextRequest('http://localhost:3000/api/stripe/create-business', {
			method: 'POST',
			headers: {
				'authorization': 'Bearer invalid-token',
			},
			body: JSON.stringify({ business_type: 'individual' }),
		})

		const response = await POST(request)

		expect(response.status).toBe(401)
		const data = await response.json()
		expect(data).toHaveProperty('error')
	})

	it('returns error when business not found', async () => {
		const { createClient } = await import('@supabase/supabase-js')
		vi.mocked(createClient).mockImplementationOnce(() => ({
			auth: {
				getUser: vi.fn().mockResolvedValue({
					data: { user: { id: 'test-user-id', email: 'test@example.com' } },
					error: null,
				}),
			},
			from: vi.fn().mockReturnValue({
				select: vi.fn().mockReturnValue({
					eq: vi.fn().mockReturnValue({
						single: vi.fn().mockResolvedValue({
							data: null,
							error: new Error('Business not found'),
						}),
					}),
				}),
			}),
		} as any))

		const { POST } = await import('../route')

		const request = new NextRequest('http://localhost:3000/api/stripe/create-business', {
			method: 'POST',
			headers: {
				'authorization': 'Bearer test-token',
			},
			body: JSON.stringify({ business_type: 'individual' }),
		})

		const response = await POST(request)

		expect(response.status).toBe(404)
		const data = await response.json()
		expect(data).toHaveProperty('error')
	})

	it('handles Stripe account creation failure', async () => {
		// Ensure fresh module graph so the route uses our failing Stripe mock
		vi.resetModules()

		// Remock Stripe to fail
		vi.doMock('stripe', () => ({
			default: vi.fn().mockImplementation(() => ({
				accounts: {
					create: vi.fn().mockRejectedValue(new Error('Stripe API error')),
				},
				accountLinks: {
					create: vi.fn().mockResolvedValue({
						url: 'https://connect.stripe.com/setup/s/test123',
						expires_at: Date.now() + 3600000,
					}),
				},
			})),
		}))

		// Remock Supabase with default happy path
		vi.doMock('@supabase/supabase-js', () => ({
			createClient: vi.fn().mockImplementation(() => ({
				auth: {
					getUser: vi.fn().mockResolvedValue({
						data: { user: { id: 'test-user-id', email: 'test@example.com' } },
						error: null,
					}),
				},
				from: vi.fn().mockReturnValue({
					select: vi.fn().mockReturnValue({
						eq: vi.fn().mockReturnValue({
							single: vi.fn().mockResolvedValue({
								data: {
									id: 'test-business-id',
									stripe_account_id: null,
									slug: 'test-business',
								},
								error: null,
							}),
						}),
					}),
					update: vi.fn().mockReturnValue({
						eq: vi.fn().mockResolvedValue({ error: null }),
					}),
				}),
			})),
		}))

		const { POST } = await import('../route')

		const request = new NextRequest('http://localhost:3000/api/stripe/create-business', {
			method: 'POST',
			headers: {
				'authorization': 'Bearer test-token',
				'origin': 'http://localhost:3000',
			},
			body: JSON.stringify({ business_type: 'individual' }),
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(500)
		expect(data).toHaveProperty('error')
		expect(data.error).toBe('Stripe account creation failed')
	})

	it('uses existing Stripe account if already created', async () => {
		const { createClient } = await import('@supabase/supabase-js')
		vi.mocked(createClient).mockImplementationOnce(() => ({
			auth: {
				getUser: vi.fn().mockResolvedValue({
					data: { user: { id: 'test-user-id', email: 'test@example.com' } },
					error: null,
				}),
			},
			from: vi.fn().mockReturnValue({
				select: vi.fn().mockReturnValue({
					eq: vi.fn().mockReturnValue({
						single: vi.fn().mockResolvedValue({
							data: {
								id: 'test-business-id',
								stripe_account_id: 'acct_existing123',
								slug: 'test-business',
							},
							error: null,
						}),
					}),
				}),
			}),
		} as any))

		const { POST } = await import('../route')

		const request = new NextRequest('http://localhost:3000/api/stripe/create-business', {
			method: 'POST',
			headers: {
				'authorization': 'Bearer test-token',
				'origin': 'http://localhost:3000',
			},
			body: JSON.stringify({ business_type: 'individual' }),
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(200)
		expect(data).toHaveProperty('url')
	})
})
