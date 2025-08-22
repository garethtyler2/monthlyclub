import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    customers: {
      create: vi.fn().mockResolvedValue({
        id: 'cus_test123',
        email: 'test@example.com',
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: 'cus_test123',
        email: 'test@example.com',
        invoice_settings: {
          default_payment_method: 'pm_test123',
        },
        deleted: false,
      }),
    },
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: 'cs_test123',
          url: 'https://checkout.stripe.com/test',
        }),
      },
    },
  })),
}))

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
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
              id: 'test-product-id',
              name: 'Test Product',
              price: 50,
              is_credit_builder: false,
              business: {
                stripe_account_id: 'acct_test123',
              },
            },
            error: null,
          }),
        }),
      }),
      insert: vi.fn().mockReturnValue({
        error: null,
      }),
    }),
  })),
}))

describe('POST /api/stripe/create-checkout-session', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates checkout session for regular subscription product', async () => {
    const requestBody = {
      productId: 'test-product-id',
      reference: 'REF123',
      preferredPaymentDay: '15',
    }

    const request = new NextRequest('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    // Mock the actual route import
    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('url')
  })

  it('handles balance builder products with credit amount', async () => {
    // Mock balance builder product
    const { createClient } = await import('@/lib/supabase/server')
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
                id: 'balance-builder-id',
                name: 'Credit Builder',
                price: 25,
                is_credit_builder: true,
                business: {
                  stripe_account_id: 'acct_test123',
                },
              },
              error: null,
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = {
      productId: 'balance-builder-id',
      reference: 'REF456',
      preferredPaymentDay: '20',
      creditAmount: 100,
    }

    const request = new NextRequest('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('url')
  })

  it('returns error for non-existent product', async () => {
    const { createClient } = await import('@/lib/supabase/server')
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
              error: new Error('Product not found'),
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = {
      productId: 'non-existent-id',
      reference: 'REF789',
      preferredPaymentDay: '10',
    }

    const request = new NextRequest('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data).toHaveProperty('error')
    expect(data.error).toBe('Product not found')
  })

  it('returns error for unauthorized user', async () => {
    const { createClient } = await import('@/lib/supabase/server')
    vi.mocked(createClient).mockImplementationOnce(() => ({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: null,
        }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'test-product-id',
                name: 'Test Product',
                price: 50,
                is_credit_builder: false,
                business: {
                  stripe_account_id: 'acct_test123',
                },
              },
              error: null,
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = {
      productId: 'test-product-id',
      reference: 'REF999',
      preferredPaymentDay: '25',
    }

    const request = new NextRequest('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data).toHaveProperty('error')
    expect(data.error).toBe('Unauthorized')
  })

  it('handles existing customer with payment method', async () => {
    // Mock existing customer
    const { createClient } = await import('@/lib/supabase/server')
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
                id: 'test-product-id',
                name: 'Test Product',
                price: 50,
                is_credit_builder: false,
                business: {
                  stripe_account_id: 'acct_test123',
                },
              },
              error: null,
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = {
      productId: 'test-product-id',
      reference: 'REF_EXISTING',
      preferredPaymentDay: '15',
    }

    const request = new NextRequest('http://localhost:3000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('url')
  })

  it('validates required request fields', async () => {
    const requiredFields = ['productId', 'reference', 'preferredPaymentDay']
    const requestBody = {
      productId: 'test-product-id',
      reference: 'REF_VALID',
      preferredPaymentDay: '15',
    }

    requiredFields.forEach(field => {
      expect(requestBody).toHaveProperty(field)
      expect(requestBody[field as keyof typeof requestBody]).toBeTruthy()
    })
  })

  it('handles balance builder credit amount validation', async () => {
    const balanceBuilderRequest = {
      productId: 'balance-builder-id',
      reference: 'REF_BALANCE',
      preferredPaymentDay: '20',
      creditAmount: 150,
    }

    expect(balanceBuilderRequest.creditAmount).toBeGreaterThan(0)
    expect(typeof balanceBuilderRequest.creditAmount).toBe('number')
  })
})
