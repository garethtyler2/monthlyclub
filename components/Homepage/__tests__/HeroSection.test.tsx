import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import HeroSection from '../HeroSection'

describe('HeroSection', () => {
  it('renders the hero section with main heading', () => {
    render(<HeroSection />)
    
    // Check if the main heading is present
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders call-to-action links', () => {
    render(<HeroSection />)
    
    // Check if CTA links are present (the component uses links, not buttons)
    const ctaLinks = screen.getAllByRole('link')
    expect(ctaLinks.length).toBeGreaterThan(0)
  })

  it('displays the main value proposition', () => {
    render(<HeroSection />)
    
    // Check if the value proposition text is present - use the first occurrence
    const monthlyClubTexts = screen.getAllByText(/monthly club/i)
    expect(monthlyClubTexts.length).toBeGreaterThan(0)
  })

  it('renders the main hero content', () => {
    render(<HeroSection />)
    
    // Check if the main hero text is present
    expect(screen.getByText(/Transform Your Business/i)).toBeInTheDocument()
    expect(screen.getByText(/With Smart Subscriptions/i)).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<HeroSection />)
    
    // Check if feature cards are present - use more specific selectors
    expect(screen.getByText(/Balance Builder/i)).toBeInTheDocument()
    
    // For recurring revenue, check the heading specifically
    const recurringRevenueHeading = screen.getByRole('heading', { name: /Recurring Revenue/i })
    expect(recurringRevenueHeading).toBeInTheDocument()
    
    expect(screen.getByText(/Auto Payments/i)).toBeInTheDocument()
  })
})
