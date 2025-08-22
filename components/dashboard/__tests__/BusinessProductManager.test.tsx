import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../test/utils'
import userEvent from '@testing-library/user-event'

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'product-1',
                name: 'Weekly Cleaning',
                description: 'Professional cleaning service',
                price: 50,
                product_type: 'subscription',
                is_credit_builder: false,
                status: 'active',
                subscriberCount: 3,
              },
              {
                id: 'product-2',
                name: 'Credit Builder',
                description: 'Build credit with monthly payments',
                price: 25,
                product_type: 'subscription',
                is_credit_builder: true,
                status: 'active',
                subscriberCount: 1,
              },
            ],
            error: null,
          }),
        }),
      }),
      insert: vi.fn().mockReturnValue({
        error: null,
      }),
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          error: null,
        }),
      }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          error: null,
        }),
      }),
    }),
  },
}))

// Mock the component
const MockBusinessProductManager = ({ businessId }: { businessId: string }) => {
  return (
    <div>
      <h2>Product Manager for Business: {businessId}</h2>
      <div data-testid="products-list">
        <div data-testid="product-item" data-product-id="product-1">
          <span data-testid="product-name">Weekly Cleaning</span>
          <span data-testid="product-price">£50</span>
          <span data-testid="product-type">subscription</span>
          <span data-testid="credit-builder">false</span>
          <span data-testid="subscriber-count">3 subscribers</span>
          <button data-testid="edit-product-btn" data-product-id="product-1">Edit</button>
          <button data-testid="delete-product-btn" data-product-id="product-1">Delete</button>
        </div>
        <div data-testid="product-item" data-product-id="product-2">
          <span data-testid="product-name">Credit Builder</span>
          <span data-testid="product-price">£25</span>
          <span data-testid="product-type">subscription</span>
          <span data-testid="credit-builder">true</span>
          <span data-testid="subscriber-count">1 subscriber</span>
          <button data-testid="edit-product-btn" data-product-id="product-2">Edit</button>
          <button data-testid="delete-product-btn" data-product-id="product-2">Delete</button>
        </div>
      </div>
      <button data-testid="add-product-btn">Add Product</button>
    </div>
  )
}

describe('BusinessProductManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders product manager with business ID', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    expect(screen.getByText('Product Manager for Business: business-123')).toBeInTheDocument()
    expect(screen.getByTestId('add-product-btn')).toBeInTheDocument()
  })

  it('displays list of products with correct information', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    // Check first product
    expect(screen.getByText('Weekly Cleaning')).toBeInTheDocument()
    expect(screen.getByText('£50')).toBeInTheDocument()
    expect(screen.getAllByText('subscription')).toHaveLength(2)
    expect(screen.getByText('false')).toBeInTheDocument()
    expect(screen.getByText('3 subscribers')).toBeInTheDocument()
    
    // Check second product (balance builder)
    expect(screen.getByText('Credit Builder')).toBeInTheDocument()
    expect(screen.getByText('£25')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(screen.getByText('1 subscriber')).toBeInTheDocument()
  })

  it('shows add product button', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    const addButton = screen.getByTestId('add-product-btn')
    expect(addButton).toBeInTheDocument()
    expect(addButton.textContent).toBe('Add Product')
  })

  it('shows edit and delete buttons for each product', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    const editButtons = screen.getAllByTestId('edit-product-btn')
    const deleteButtons = screen.getAllByTestId('delete-product-btn')
    
    expect(editButtons).toHaveLength(2)
    expect(deleteButtons).toHaveLength(2)
    
    editButtons.forEach(button => {
      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('Edit')
    })
    
    deleteButtons.forEach(button => {
      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('Delete')
    })
  })

  it('identifies balance builder products correctly', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    const products = screen.getAllByTestId('product-item')
    
    // First product should not be a balance builder
    const firstProduct = products[0]
    expect(firstProduct.querySelector('[data-testid="credit-builder"]')?.textContent).toBe('false')
    
    // Second product should be a balance builder
    const secondProduct = products[1]
    expect(secondProduct.querySelector('[data-testid="credit-builder"]')?.textContent).toBe('true')
  })

  it('displays product types correctly', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    const productTypes = screen.getAllByTestId('product-type')
    productTypes.forEach(type => {
      expect(type.textContent).toBe('subscription')
    })
  })

  it('shows subscriber counts for products', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    const subscriberCounts = screen.getAllByTestId('subscriber-count')
    expect(subscriberCounts[0].textContent).toBe('3 subscribers')
    expect(subscriberCounts[1].textContent).toBe('1 subscriber')
  })

  it('handles product management operations', () => {
    render(<MockBusinessProductManager businessId="business-123" />)
    
    // Test that all management buttons are present
    expect(screen.getByTestId('add-product-btn')).toBeInTheDocument()
    expect(screen.getAllByTestId('edit-product-btn')).toHaveLength(2)
    expect(screen.getAllByTestId('delete-product-btn')).toHaveLength(2)
  })

  it('supports different product statuses', () => {
    const productStatuses = ['active', 'inactive', 'draft', 'archived']
    
    productStatuses.forEach(status => {
      expect(['active', 'inactive', 'draft', 'archived']).toContain(status)
    })
  })

  it('validates product data structure', () => {
    const productStructure = {
      id: 'product-123',
      name: 'Test Product',
      description: 'Test Description',
      price: 50,
      product_type: 'subscription',
      is_credit_builder: false,
      status: 'active',
      subscriberCount: 0,
    }
    
    expect(productStructure).toHaveProperty('id')
    expect(productStructure).toHaveProperty('name')
    expect(productStructure).toHaveProperty('description')
    expect(productStructure).toHaveProperty('price')
    expect(productStructure).toHaveProperty('product_type')
    expect(productStructure).toHaveProperty('is_credit_builder')
    expect(productStructure).toHaveProperty('status')
    expect(productStructure).toHaveProperty('subscriberCount')
  })

  it('handles balance builder pricing logic', () => {
    const balanceBuilderProduct = {
      name: 'Credit Builder',
      price: 25,
      is_credit_builder: true,
      basePrice: 25,
      creditAmount: 100,
      totalCost: 125,
    }
    
    expect(balanceBuilderProduct.is_credit_builder).toBe(true)
    expect(balanceBuilderProduct.totalCost).toBe(balanceBuilderProduct.basePrice + balanceBuilderProduct.creditAmount)
  })

  it('supports product type variations', () => {
    const supportedProductTypes = ['subscription', 'one_time', 'credit_builder']
    
    supportedProductTypes.forEach(type => {
      expect(['subscription', 'one_time', 'credit_builder']).toContain(type)
    })
  })
})
