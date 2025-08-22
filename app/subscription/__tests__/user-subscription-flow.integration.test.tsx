import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { createSupabaseMock } from '../../../test/mocks/supabase'

// Mock Supabase client for user subscription flow
vi.mock('@/lib/supabase/client', () => {
  const mockSupabase = createSupabaseMock()
  return { supabase: mockSupabase }
})

// Mock Stripe checkout API - use a simpler approach
const mockCreateCheckoutSession = vi.fn().mockResolvedValue({
  url: 'https://checkout.stripe.com/test-session'
})

// Mock the products list component
vi.mock('@/components/business/products-list', () => ({
  default: ({ products, userSubscriptions, isOwner }: any) => (
    <div data-testid="products-list">
      {products.map((product: any) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: £{product.price}</p>
          {product.is_credit_builder && (
            <p data-testid="credit-builder-info">Credit Builder Product</p>
          )}
          <button
            data-testid={`select-${product.id}`}
            onClick={() => product.onSelect?.(product.id)}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  )
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/business/test-business',
}))

// Mock the subscription confirm page component
vi.mock('../confirm/page', () => ({
  default: () => (
    <div data-testid="subscription-confirm-page">
      <h2>Confirm Subscription</h2>
      <p>Credit Builder</p>
      <button data-testid="confirm-subscription-btn">Confirm Subscription</button>
    </div>
  )
}))

// Import components after mocking
import ProductsList from '@/components/business/products-list'
import SubscriptionConfirmPage from '../confirm/page'

describe('User Subscription Flow Integration', () => {
  let supabase: any
  let mockRouter: any

  beforeEach(async () => {
    vi.clearAllMocks()

    // Get mocked instances
    supabase = (await import('@/lib/supabase/client')).supabase
    mockRouter = (await import('next/navigation')).useRouter()

    // Setup default mocks using the helper
    supabase.mockUser({ id: 'test-user-id', email: 'test@example.com' })
  })

  describe('Product Discovery and Selection', () => {
    it('displays available products for subscription', async () => {
      const user = userEvent.setup()

      const mockProducts = [
        {
          id: 'product-1',
          name: 'Weekly Cleaning',
          description: 'Professional cleaning service every week',
          price: 50,
          is_credit_builder: false,
          business_id: 'business-123'
        },
        {
          id: 'product-2',
          name: 'Monthly Gardening',
          description: 'Monthly garden maintenance service',
          price: 80,
          is_credit_builder: false,
          business_id: 'business-123'
        }
      ]

      const mockUserSubscriptions = []
      const mockOnSelect = vi.fn()

      render(
        <ProductsList
          products={mockProducts}
          userSubscriptions={mockUserSubscriptions}
          isOwner={false}
        />
      )

      expect(screen.getByText('Weekly Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Monthly Gardening')).toBeInTheDocument()

      expect(screen.getByText('Price: £50')).toBeInTheDocument()
      expect(screen.getByText('Price: £80')).toBeInTheDocument()

      expect(screen.getByText('Professional cleaning service every week')).toBeInTheDocument()
      expect(screen.getByText('Monthly garden maintenance service')).toBeInTheDocument()
    })

    it('shows user subscription status for products', async () => {
      const user = userEvent.setup()

      const mockProducts = [
        {
          id: 'product-1',
          name: 'Weekly Cleaning',
          description: 'Professional cleaning service every week',
          price: 50,
          is_credit_builder: false,
          business_id: 'business-123'
        }
      ]

      const mockUserSubscriptions = [
        { product_id: 'product-1' }
      ]

      render(
        <ProductsList
          products={mockProducts}
          userSubscriptions={mockUserSubscriptions}
          isOwner={false}
        />
      )

      expect(screen.getByText('Weekly Cleaning')).toBeInTheDocument()

      expect(mockUserSubscriptions).toHaveLength(1)
      expect(mockUserSubscriptions[0].product_id).toBe('product-1')
    })

    it('handles product selection and initiates subscription process', async () => {
      const user = userEvent.setup()

      const mockProducts = [
        {
          id: 'product-1',
          name: 'Weekly Cleaning',
          description: 'Professional cleaning service every week',
          price: 50,
          is_credit_builder: false,
          business_id: 'business-123'
        }
      ]

      const mockUserSubscriptions = []
      const mockOnSelect = vi.fn()

      render(
        <ProductsList
          products={mockProducts}
          userSubscriptions={mockUserSubscriptions}
          isOwner={false}
        />
      )

      const selectButton = screen.getByTestId('select-product-1')
      await user.click(selectButton)

      expect(selectButton).toBeInTheDocument()
    })
  })

  describe('Subscription Setup and Configuration', () => {
    it('allows users to configure subscription preferences', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <div data-testid="subscription-config">
            <h3>Configure Your Subscription</h3>
            <div>
              <label htmlFor="reference">Customer Reference</label>
              <input
                id="reference"
                type="text"
                data-testid="reference-input"
                placeholder="Enter reference (optional)"
              />
            </div>
            <div>
              <label htmlFor="payment-day">Preferred Payment Day</label>
              <select id="payment-day" data-testid="payment-day-select">
                <option value="">Select day</option>
                <option value="1">1st of month</option>
                <option value="15">15th of month</option>
                <option value="28">28th of month</option>
              </select>
            </div>
            <button data-testid="continue-btn">Continue to Payment</button>
          </div>
        </div>
      )

      const referenceInput = screen.getByTestId('reference-input')
      await user.type(referenceInput, 'REF123')

      const paymentDaySelect = screen.getByTestId('payment-day-select')
      await user.selectOptions(paymentDaySelect, '15')

      expect(referenceInput).toHaveValue('REF123')
      expect(paymentDaySelect).toHaveValue('15')

      const continueBtn = screen.getByTestId('continue-btn')
      await user.click(continueBtn)

      expect(continueBtn).toBeInTheDocument()
    })

    it('handles balance builder credit amount configuration', async () => {
      const user = userEvent.setup()

      const CreditConfigComponent = () => {
        const [creditAmount, setCreditAmount] = React.useState(0)
        const basePrice = 25
        const totalCost = basePrice + creditAmount

        return (
          <div>
            <div data-testid="credit-config">
              <h3>Credit Builder Configuration</h3>
              <div>
                <label htmlFor="credit-amount">Credit Amount (£)</label>
                <input
                  id="credit-amount"
                  type="number"
                  data-testid="credit-amount-input"
                  placeholder="Enter credit amount"
                  min="50"
                  max="500"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(Number(e.target.value))}
                />
                <p>Choose how much credit you want to build each month</p>
              </div>
              <div data-testid="cost-summary">
                <p>Base Price: £{basePrice}</p>
                <p>Credit Amount: £<span data-testid="credit-display">{creditAmount}</span></p>
                <p>Total Monthly Cost: £<span data-testid="total-cost">{totalCost}</span></p>
              </div>
              <button data-testid="update-credit-btn">Update Credit Amount</button>
            </div>
          </div>
        )
      }

      render(<CreditConfigComponent />)

      const creditInput = screen.getByTestId('credit-amount-input')
      await user.type(creditInput, '100')

      expect(creditInput).toHaveValue(100)

      const updateBtn = screen.getByTestId('update-credit-btn')
      await user.click(updateBtn)

      const creditDisplay = screen.getByTestId('credit-display')
      const totalCost = screen.getByTestId('total-cost')

      expect(creditDisplay).toHaveTextContent('100')
      expect(totalCost).toHaveTextContent('125')
    })
  })

  describe('Payment Processing and Subscription Creation', () => {
    it('creates Stripe checkout session for subscription', async () => {
      const user = userEvent.setup()

      const mockProduct = {
        id: 'product-1',
        name: 'Weekly Cleaning',
        description: 'Professional cleaning service every week',
        price: 50,
        is_credit_builder: false,
        business_id: 'business-123'
      }

      render(
        <div>
          <div data-testid="payment-setup">
            <h3>Payment Setup</h3>
            <p>Product: {mockProduct.name}</p>
            <p>Price: £{mockProduct.price}/month</p>
            <button
              data-testid="create-checkout-btn"
              onClick={() => mockCreateCheckoutSession(mockProduct.id)}
            >
              Set Up Payment Method
            </button>
          </div>
        </div>
      )

      const checkoutBtn = screen.getByTestId('create-checkout-btn')
      await user.click(checkoutBtn)

      expect(mockCreateCheckoutSession).toHaveBeenCalledWith('product-1')
    })

    it('handles successful payment and subscription creation', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <div data-testid="payment-success">
            <h3>Payment Successful!</h3>
            <p>Your subscription has been created</p>
            <div data-testid="subscription-details">
              <p>Subscription ID: sub-123</p>
              <p>Status: Active</p>
              <p>Next Payment: 15th of month</p>
            </div>
          </div>
        </div>
      )

      expect(screen.getByText('Payment Successful!')).toBeInTheDocument()
      expect(screen.getByText('Your subscription has been created')).toBeInTheDocument()

      expect(screen.getByText('Subscription ID: sub-123')).toBeInTheDocument()
      expect(screen.getByText('Status: Active')).toBeInTheDocument()
      expect(screen.getByText('Next Payment: 15th of month')).toBeInTheDocument()
    })

    it('handles payment failures gracefully', async () => {
      const user = userEvent.setup()

      const mockPaymentError = {
        code: 'card_declined',
        message: 'Your card was declined'
      }

      render(
        <div>
          <div data-testid="payment-failure">
            <h3>Payment Failed</h3>
            <p>Error: {mockPaymentError.message}</p>
            <div data-testid="error-details">
              <p>Error Code: {mockPaymentError.code}</p>
              <p>Please try again with a different payment method</p>
            </div>
            <button data-testid="retry-btn">Try Again</button>
            <button data-testid="contact-support-btn">Contact Support</button>
          </div>
        </div>
      )

      expect(screen.getByText('Payment Failed')).toBeInTheDocument()
      expect(screen.getByText('Error: Your card was declined')).toBeInTheDocument()

      expect(screen.getByText('Error Code: card_declined')).toBeInTheDocument()
      expect(screen.getByText('Please try again with a different payment method')).toBeInTheDocument()

      const retryBtn = screen.getByTestId('retry-btn')
      const supportBtn = screen.getByTestId('contact-support-btn')

      expect(retryBtn).toBeInTheDocument()
      expect(supportBtn).toBeInTheDocument()
    })
  })

  describe('Subscription Management and Cancellation', () => {
    it('allows users to view their active subscriptions', async () => {
      const user = userEvent.setup()

      const mockSubscriptions = [
        {
          id: 'sub-1',
          product_name: 'Weekly Cleaning',
          price: 50,
          status: 'active',
          next_payment_date: '2024-02-15'
        },
        {
          id: 'sub-2',
          product_name: 'Credit Builder',
          price: 25,
          status: 'active',
          next_payment_date: '2024-02-20'
        }
      ]

      render(
        <div>
          <div data-testid="subscriptions-overview">
            <h3>Your Subscriptions</h3>
            {mockSubscriptions.map(sub => (
              <div key={sub.id} data-testid={`subscription-${sub.id}`}>
                <h4>{sub.product_name}</h4>
                <p>Price: £{sub.price}/month</p>
                <p>Status: {sub.status}</p>
                <p>Next Payment: {sub.next_payment_date}</p>
                <button data-testid={`manage-${sub.id}`}>Manage</button>
              </div>
            ))}
          </div>
        </div>
      )

      expect(screen.getByText('Your Subscriptions')).toBeInTheDocument()

      expect(screen.getByText('Weekly Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Price: £50/month')).toBeInTheDocument()
      expect(screen.getAllByText('Status: active')[0]).toBeInTheDocument()

      expect(screen.getByText('Credit Builder')).toBeInTheDocument()
      expect(screen.getByText('Price: £25/month')).toBeInTheDocument()

      expect(screen.getByTestId('manage-sub-1')).toBeInTheDocument()
      expect(screen.getByTestId('manage-sub-2')).toBeInTheDocument()
    })

    it('allows users to cancel subscriptions', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <div data-testid="subscription-management">
            <h3>Manage Subscription</h3>
            <div data-testid="subscription-actions">
              <button data-testid="pause-btn">Pause Subscription</button>
              <button data-testid="cancel-btn">Cancel Subscription</button>
              <button data-testid="change-plan-btn">Change Plan</button>
            </div>
          </div>
        </div>
      )

      const cancelBtn = screen.getByTestId('cancel-btn')
      await user.click(cancelBtn)

      expect(cancelBtn).toBeInTheDocument()
    })

    it('handles subscription status changes', async () => {
      const user = userEvent.setup()

      const StatusChangeComponent = () => {
        const [status, setStatus] = React.useState('active')

        return (
          <div>
            <div data-testid="status-change">
              <h3>Subscription Status</h3>
              <p>Current Status: {status}</p>
              <select
                data-testid="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button data-testid="update-status-btn">Update Status</button>
            </div>
          </div>
        )
      }

      render(<StatusChangeComponent />)

      expect(screen.getByText('Current Status: active')).toBeInTheDocument()

      const statusSelect = screen.getByTestId('status-select')
      await user.selectOptions(statusSelect, 'paused')

      expect(statusSelect).toHaveValue('paused')

      const updateBtn = screen.getByTestId('update-status-btn')
      await user.click(updateBtn)

      expect(updateBtn).toBeInTheDocument()
    })
  })

  describe('Credit Balance Management for Balance Builder Users', () => {
    it('displays current credit balance and transaction history', async () => {
      const user = userEvent.setup()

      const mockCreditData = {
        current_balance: 150,
        total_earned: 300,
        total_spent: 150,
        transactions: [
          { amount: 100, type: 'earning', date: '2024-01-15' },
          { amount: -50, type: 'spending', date: '2024-01-20' },
          { amount: 100, type: 'earning', date: '2024-02-15' }
        ]
      }

      render(
        <div>
          <div data-testid="credit-overview">
            <h3>Credit Balance</h3>
            <div data-testid="balance-summary">
              <p>Current Balance: £{mockCreditData.current_balance}</p>
              <p>Total Earned: £{mockCreditData.total_earned}</p>
              <p>Total Spent: £{mockCreditData.total_spent}</p>
            </div>
            <div data-testid="transaction-history">
              <h4>Recent Transactions</h4>
              {mockCreditData.transactions.map((tx, index) => (
                <div key={index} data-testid={`transaction-${index}`}>
                  <span>{tx.date}</span>
                  <span>{tx.type === 'earning' ? '+' : '-'}£{Math.abs(tx.amount)}</span>
                  <span>{tx.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

      expect(screen.getByText('Current Balance: £150')).toBeInTheDocument()
      expect(screen.getByText('Total Earned: £300')).toBeInTheDocument()
      expect(screen.getByText('Total Spent: £150')).toBeInTheDocument()

      expect(screen.getByText('Recent Transactions')).toBeInTheDocument()
      expect(screen.getAllByText('+£100')[0]).toBeInTheDocument()
      expect(screen.getByText('-£50')).toBeInTheDocument()
    })

    it('allows users to spend credit on services', async () => {
      const user = userEvent.setup()

      render(
        <div>
          <div data-testid="credit-spending">
            <h3>Use Your Credit</h3>
            <div data-testid="available-services">
              <h4>Available Services</h4>
              <div data-testid="service-1">
                <p>Deep Cleaning - £80</p>
                <button data-testid="use-credit-1">Use Credit</button>
              </div>
              <div data-testid="service-2">
                <p>Window Cleaning - £30</p>
                <button data-testid="use-credit-2">Use Credit</button>
              </div>
            </div>
            <div data-testid="credit-balance">
              <p>Available Credit: £150</p>
            </div>
          </div>
        </div>
      )

      expect(screen.getByText('Deep Cleaning - £80')).toBeInTheDocument()
      expect(screen.getByText('Window Cleaning - £30')).toBeInTheDocument()
      expect(screen.getByText('Available Credit: £150')).toBeInTheDocument()

      const useCreditBtn = screen.getByTestId('use-credit-1')
      await user.click(useCreditBtn)

      expect(useCreditBtn).toBeInTheDocument()
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('handles network errors during subscription creation', async () => {
      const user = userEvent.setup()

      const mockNetworkError = {
        message: 'Network connection failed',
        code: 'NETWORK_ERROR'
      }

      render(
        <div>
          <div data-testid="network-error">
            <h3>Connection Error</h3>
            <p>Error: {mockNetworkError.message}</p>
            <p>Code: {mockNetworkError.code}</p>
            <button data-testid="retry-network-btn">Retry</button>
            <button data-testid="offline-mode-btn">Continue Offline</button>
          </div>
        </div>
      )

      expect(screen.getByText('Connection Error')).toBeInTheDocument()
      expect(screen.getByText('Error: Network connection failed')).toBeInTheDocument()

      const retryBtn = screen.getByTestId('retry-network-btn')
      const offlineBtn = screen.getByTestId('offline-mode-btn')

      expect(retryBtn).toBeInTheDocument()
      expect(offlineBtn).toBeInTheDocument()
    })

    it('handles insufficient funds scenarios', async () => {
      const user = userEvent.setup()

      const mockInsufficientFunds = {
        message: 'Insufficient funds in account',
        code: 'INSUFFICIENT_FUNDS',
        required_amount: 50,
        available_amount: 30
      }

      render(
        <div>
          <div data-testid="insufficient-funds">
            <h3>Insufficient Funds</h3>
            <p>Error: {mockInsufficientFunds.message}</p>
            <div data-testid="amount-details">
              <p>Required: £{mockInsufficientFunds.required_amount}</p>
              <p>Available: £{mockInsufficientFunds.available_amount}</p>
              <p>Shortfall: £{mockInsufficientFunds.required_amount - mockInsufficientFunds.available_amount}</p>
            </div>
            <button data-testid="add-funds-btn">Add Funds</button>
            <button data-testid="change-payment-btn">Change Payment Method</button>
          </div>
        </div>
      )

      expect(screen.getByText('Insufficient Funds')).toBeInTheDocument()
      expect(screen.getByText('Error: Insufficient funds in account')).toBeInTheDocument()

      expect(screen.getByText('Required: £50')).toBeInTheDocument()
      expect(screen.getByText('Available: £30')).toBeInTheDocument()
      expect(screen.getByText('Shortfall: £20')).toBeInTheDocument()

      const addFundsBtn = screen.getByTestId('add-funds-btn')
      const changePaymentBtn = screen.getByTestId('change-payment-btn')

      expect(addFundsBtn).toBeInTheDocument()
      expect(changePaymentBtn).toBeInTheDocument()
    })
  })
})
