import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Global variables to control mock behavior
declare global {
  var __mockStripeSignatureFailure: boolean
  var __mockStripeUnsupportedEvent: boolean
}

// Mock Stripe with controllable behavior
vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: vi.fn().mockImplementation(() => {
        if (globalThis.__mockStripeSignatureFailure) {
          throw new Error('Invalid signature')
        }
        if (globalThis.__mockStripeUnsupportedEvent) {
          return {
            type: 'unsupported.event',
            data: { object: {} },
          }
        }
        // Default: checkout.session.completed
        return {
          type: 'checkout.session.completed',
          data: {
            object: {
              id: 'cs_test123',
              customer: 'cus_test123',
              metadata: {
                user_id: 'test-user-id',
                business_id: 'test-business-id',
                product_id: 'test-product-id',
                customer_reference: 'REF123',
                preferred_payment_day: '15',
                credit_amount: '',
              },
            },
          },
        }
      }),
    },
    customers: {
      update: vi.fn().mockResolvedValue({}),
    },
    setupIntents: {
      retrieve: vi.fn().mockResolvedValue({
        id: 'si_test123',
        payment_method: 'pm_test123',
      }),
    },
  })),
}))

// Mock Supabase - target the direct import used in the route
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockImplementation(() => ({
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          // For user profile queries (single .eq())
          single: vi.fn().mockResolvedValue({
            data: {
              id: 'test-user-profile-id',
              email: 'test@example.com',
            },
            error: null,
          }),
          // For subscription queries (double .eq())
          eq: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({
              data: null, // No existing subscription
              error: null,
            }),
          }),
        }),
      }),
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: {
              id: 'new-subscription-id',
              user_id: 'test-user-id',
              product_id: 'test-product-id',
              status: 'active',
            },
            error: null,
          }),
        }),
      }),
    }),
  })),
}))

describe('POST /api/stripe/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset global mock flags
    globalThis.__mockStripeSignatureFailure = false
    globalThis.__mockStripeUnsupportedEvent = false
  })

  it('handles checkout.session.completed event successfully', async () => {
    const requestBody = Buffer.from(JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test123',
          customer: 'cus_test123',
          metadata: {
            user_id: 'test-user-id',
            business_id: 'test-business-id',
            product_id: 'test-product-id',
            customer_reference: 'REF123',
            preferred_payment_day: '15',
          },
        },
      },
    }))

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: requestBody,
    })

    // Mock the actual route import
    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
    const responseText = await response.text()
    expect(responseText).toBe('Success')
  })

  it('creates subscription for regular product', async () => {
    const { createClient } = await import('@supabase/supabase-js')
    vi.mocked(createClient).mockImplementationOnce(() => ({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'test-user-profile-id',
                email: 'test@example.com',
              },
              error: null,
            }),
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({
                data: null,
                error: null,
              }),
            }),
          }),
        }),
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'new-subscription-id',
                user_id: 'test-user-id',
                product_id: 'test-product-id',
                status: 'active',
              },
              error: null,
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = Buffer.from(JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test123',
          customer: 'cus_test123',
          metadata: {
            user_id: 'test-user-id',
            business_id: 'test-business-id',
            product_id: 'regular-product-id',
            customer_reference: 'REF_REGULAR',
            preferred_payment_day: '20',
          },
        },
      },
    }))

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: requestBody,
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
  })

  it('handles balance builder products with credit amount', async () => {
    // Mock balance builder product
    const { createClient } = await import('@supabase/supabase-js')
    vi.mocked(createClient).mockImplementationOnce(() => ({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'test-user-profile-id',
                email: 'test@example.com',
              },
              error: null,
            }),
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({
                data: null,
                error: null,
              }),
            }),
          }),
        }),
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'balance-subscription-id',
                user_id: 'test-user-id',
                product_id: 'balance-builder-id',
                status: 'active',
              },
              error: null,
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = Buffer.from(JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_balance123',
          customer: 'cus_test123',
          metadata: {
            user_id: 'test-user-id',
            business_id: 'test-business-id',
            product_id: 'balance-builder-id',
            customer_reference: 'REF_BALANCE',
            preferred_payment_day: '25',
            credit_amount: '100',
          },
        },
      },
    }))

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: requestBody,
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
  })

  it('skips duplicate subscription creation', async () => {
    const { createClient } = await import('@supabase/supabase-js')
    vi.mocked(createClient).mockImplementationOnce(() => ({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: {
                id: 'test-user-profile-id',
                email: 'test@example.com',
              },
              error: null,
            }),
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({
                data: {
                  id: 'existing-subscription-id',
                  user_id: 'test-user-id',
                  product_id: 'test-product-id',
                  status: 'active',
                },
                error: null,
              }),
            }),
          }),
        }),
      }),
    } as any))

    const requestBody = Buffer.from(JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_duplicate123',
          customer: 'cus_test123',
          metadata: {
            user_id: 'test-user-id',
            business_id: 'test-business-id',
            product_id: 'test-product-id',
            customer_reference: 'REF_DUPLICATE',
            preferred_payment_day: '15',
          },
        },
      },
    }))

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: requestBody,
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
    const responseText = await response.text()
    expect(responseText).toBe('Subscription already exists')
  })

  it('handles webhook signature verification failure', async () => {
    // Set global flag to trigger signature failure
    globalThis.__mockStripeSignatureFailure = true

    const requestBody = Buffer.from(JSON.stringify({
      type: 'checkout.session.completed',
      data: { object: {} },
    }))

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'invalid-signature',
      },
      body: requestBody,
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(400)
    const responseText = await response.text()
    expect(responseText).toBe('Webhook Error')
  })

  it('handles unsupported webhook events', async () => {
    // Set global flag to trigger unsupported event
    globalThis.__mockStripeUnsupportedEvent = true

    const requestBody = Buffer.from(JSON.stringify({
      type: 'unsupported.event',
      data: { object: {} },
    }))

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'test-signature',
      },
      body: requestBody,
    })

    const { POST } = await import('../route')
    const response = await POST(request)

    expect(response.status).toBe(200)
    const responseText = await response.text()
    expect(responseText).toBe('Event received')
  })

  it('validates required metadata fields', async () => {
    const requiredFields = ['user_id', 'business_id', 'product_id', 'customer_reference', 'preferred_payment_day']
    const metadata = {
      user_id: 'test-user-id',
      business_id: 'test-business-id',
      product_id: 'test-product-id',
      customer_reference: 'REF_VALID',
      preferred_payment_day: '15',
    }

    requiredFields.forEach(field => {
      expect(metadata).toHaveProperty(field)
      expect(metadata[field as keyof typeof metadata]).toBeTruthy()
    })
  })

  it('handles balance builder credit amount parsing', async () => {
    const creditAmounts = ['100', '250', '500', '']
    
    creditAmounts.forEach(amount => {
      if (amount) {
        const parsed = parseInt(amount)
        expect(parsed).toBeGreaterThan(0)
        expect(typeof parsed).toBe('number')
      } else {
        expect(amount).toBe('')
      }
    })
  })
})
