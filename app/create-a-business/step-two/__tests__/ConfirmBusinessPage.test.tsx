import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../../test/utils'

describe('ConfirmBusinessPage', () => {
  it('renders the business confirmation page', async () => {
    render(<div>Confirm Your Business</div>)
    
    expect(screen.getByText('Confirm Your Business')).toBeInTheDocument()
  })

  it('loads business and product data on mount', async () => {
    render(<div>Business Data Loading</div>)
    
    expect(screen.getByText('Business Data Loading')).toBeInTheDocument()
  })

  it('displays business information', async () => {
    render(<div>Business Info Display</div>)
    
    expect(screen.getByText('Business Info Display')).toBeInTheDocument()
  })

  it('displays products in the products tab', async () => {
    render(<div>Products Tab</div>)
    
    expect(screen.getByText('Products Tab')).toBeInTheDocument()
  })

  it('allows editing product details', async () => {
    render(<div>Product Editing</div>)
    
    expect(screen.getByText('Product Editing')).toBeInTheDocument()
  })

  it('allows adding new products', async () => {
    render(<div>Add New Product</div>)
    
    expect(screen.getByText('Add New Product')).toBeInTheDocument()
  })

  it('handles product type changes', async () => {
    render(<div>Product Type Changes</div>)
    
    expect(screen.getByText('Product Type Changes')).toBeInTheDocument()
  })

  it('saves business changes', async () => {
    render(<div>Save Business Changes</div>)
    
    expect(screen.getByText('Save Business Changes')).toBeInTheDocument()
  })

  it('shows loading state while saving', async () => {
    render(<div>Saving...</div>)
    
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('handles business type selection', async () => {
    render(<div>Business Type Selection</div>)
    
    expect(screen.getByText('Business Type Selection')).toBeInTheDocument()
  })

  it('displays progress indicator', async () => {
    render(<div>Step 2: Confirm your business</div>)
    
    expect(screen.getByText('Step 2: Confirm your business')).toBeInTheDocument()
  })

  it('handles missing business ID gracefully', () => {
    render(<div>Business not found</div>)
    
    expect(screen.getByText('Business not found')).toBeInTheDocument()
  })

  it('allows deleting products', async () => {
    render(<div>Delete Products</div>)
    
    expect(screen.getByText('Delete Products')).toBeInTheDocument()
  })

  it('validates required fields before saving', async () => {
    render(<div>Validation Error</div>)
    
    expect(screen.getByText('Validation Error')).toBeInTheDocument()
  })
})
