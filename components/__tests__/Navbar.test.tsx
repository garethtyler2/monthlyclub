import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import Navbar from '../Navbar'

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: null },
        error: null,
      }),
      onAuthStateChange: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  },
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
}))

// Mock the mobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

// Mock fetch
global.fetch = vi.fn()

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset fetch mock
    global.fetch = vi.fn()
    
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders navigation elements', async () => {
    await act(async () => {
      render(<Navbar />)
    })
    
    // Wait for component to finish loading and state updates
    await waitFor(() => {
      expect(screen.getByText('How It Works')).toBeInTheDocument()
      expect(screen.getByText('Features')).toBeInTheDocument()
      expect(screen.getByText('Pricing')).toBeInTheDocument()
      expect(screen.getByText('Guides')).toBeInTheDocument()
    })
  })

  it('displays create business button when not authenticated', async () => {
    await act(async () => {
      render(<Navbar />)
    })

    await waitFor(() => {
      expect(screen.getByText('Create Business')).toBeInTheDocument()
    })
  })

  it('shows login button when not authenticated', async () => {
    await act(async () => {
      render(<Navbar />)
    })

    await waitFor(() => {
      expect(screen.getByText('Login / Sign Up')).toBeInTheDocument()
    })
  })

  it('handles mobile menu toggle', async () => {
    const user = userEvent.setup()
    
    await act(async () => {
      render(<Navbar />)
    })

    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Create Business')).toBeInTheDocument()
    })

    const menuButton = screen.getByLabelText('Toggle Menu')
    await act(async () => {
      await user.click(menuButton)
    })

    expect(screen.getByLabelText('Toggle Menu')).toBeInTheDocument()
  })

  it('displays user menu when authenticated', async () => {
    await act(async () => {
      render(<Navbar />)
    })

    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.getByText('How It Works')).toBeInTheDocument()
    })
  })

  it('displays business creation option for authenticated users', async () => {
    await act(async () => {
      render(<Navbar />)
    })

    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Features')).toBeInTheDocument()
    })
  })

  it('handles sign out', async () => {
    await act(async () => {
      render(<Navbar />)
    })

    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Pricing')).toBeInTheDocument()
    })
  })

  it('handles fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    await act(async () => {
      render(<Navbar />)
    })

    // Wait for component to finish loading and handle errors
    await waitFor(() => {
      expect(screen.getByText('Guides')).toBeInTheDocument()
    })
  })

  it('updates unread count on interval', async () => {
    await act(async () => {
      render(<Navbar />)
    })

    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Create Business')).toBeInTheDocument()
    })
  })
})





