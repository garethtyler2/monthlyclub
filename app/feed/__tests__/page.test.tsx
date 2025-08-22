import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import FeedPage from '../page'

// Mock Next.js components
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  }
})

vi.mock('next/image', () => {
  return {
    default: ({ src, alt, width, height, className, ...props }: any) => (
      <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
    ),
  }
})

// Mock Supabase client
const mockSupabase = {
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
}

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => mockSupabase),
}))

// Mock data
const mockUser = {
  id: 'user-1',
  email: 'user@example.com',
}

const mockSubscriptions = [
  { product_id: 'product-1' },
  { product_id: 'product-2' },
]

const mockProducts = [
  { id: 'product-1', business_id: 'business-1' },
  { id: 'product-2', business_id: 'business-2' },
]

const mockMyBusiness = {
  id: 'business-3',
}

const mockPosts = [
  {
    id: 'post-1',
    created_at: '2024-01-01T10:00:00Z',
    title: 'First Post',
    content: 'This is the first post content',
    link_url: 'https://example.com',
    image_url: 'https://example.com/image1.jpg',
    business: {
      id: 'business-1',
      name: 'Business One',
      slug: 'business-one',
      image_url: 'https://example.com/business1.jpg',
    },
  },
  {
    id: 'post-2',
    created_at: '2024-01-01T09:00:00Z',
    title: 'Second Post',
    content: null,
    link_url: null,
    image_url: null,
    business: {
      id: 'business-2',
      name: 'Business Two',
      slug: 'business-two',
      image_url: null,
    },
  },
]

describe('FeedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default mock setup
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })
  })

  describe('Authentication', () => {
    it('shows login prompt for unauthenticated users', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      })

      render(await FeedPage())

      expect(screen.getByText('Your Feed')).toBeInTheDocument()
      expect(screen.getByText('Please log in to view your feed.')).toBeInTheDocument()
    })

    it('shows login prompt when auth error occurs', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Auth error' },
      })

      render(await FeedPage())

      expect(screen.getByText('Your Feed')).toBeInTheDocument()
      expect(screen.getByText('Please log in to view your feed.')).toBeInTheDocument()
    })
  })

  describe('Subscription and Business Logic', () => {
    it('fetches user subscriptions and products correctly', async () => {
      mockSupabase.from.mockImplementation((table) => {
        if (table === 'subscriptions') {
          let callCount = 0
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 2) {
                return { data: mockSubscriptions, error: null }
              }
              return mockChain
            }),
          }
          return mockChain
        }
        if (table === 'businesses') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: mockMyBusiness, error: null }),
          }
        }
        if (table === 'products') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockResolvedValue({ data: mockProducts, error: null }),
          }
        }
        if (table === 'business_posts') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({ data: mockPosts, error: null }),
          }
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
        }
      })

      render(await FeedPage())

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument()
        expect(screen.getByText('Second Post')).toBeInTheDocument()
      })
    })

    it('includes user own business in feed', async () => {
      // Mock no subscriptions but user owns a business
      mockSupabase.from.mockImplementation((table) => {
        if (table === 'subscriptions') {
          let callCount = 0
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 2) {
                return { data: [], error: null }
              }
              return mockChain
            }),
          }
          return mockChain
        }
        if (table === 'businesses') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: mockMyBusiness, error: null }),
          }
        }
        if (table === 'products') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockResolvedValue({ data: [], error: null }),
          }
        }
        if (table === 'business_posts') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({ data: mockPosts, error: null }),
          }
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
        }
      })

      render(await FeedPage())

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument()
      })
    })

    it('shows empty state when user has no subscriptions or business', async () => {
      // Mock no subscriptions and no business
      mockSupabase.from.mockImplementation((table) => {
        if (table === 'subscriptions') {
          let callCount = 0
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 2) {
                return { data: [], error: null }
              }
              return mockChain
            }),
          }
          return mockChain
        }
        if (table === 'businesses') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          }
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
        }
      })

      render(await FeedPage())

      expect(screen.getByText('Your Feed')).toBeInTheDocument()
      expect(screen.getByText('No posts yet. Subscribe to businesses or create a post if you own a business.')).toBeInTheDocument()
    })
  })

  describe('Post Display', () => {
    beforeEach(async () => {
      // Setup mocks for post display tests
      mockSupabase.from.mockImplementation((table) => {
        if (table === 'subscriptions') {
          let callCount = 0
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 2) {
                return { data: mockSubscriptions, error: null }
              }
              return mockChain
            }),
          }
          return mockChain
        }
        if (table === 'businesses') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: mockMyBusiness, error: null }),
          }
        }
        if (table === 'products') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockResolvedValue({ data: mockProducts, error: null }),
          }
        }
        if (table === 'business_posts') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({ data: mockPosts, error: null }),
          }
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
        }
      })
    })

    it('displays post title and content correctly', async () => {
      render(await FeedPage())

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument()
        expect(screen.getByText('This is the first post content')).toBeInTheDocument()
        expect(screen.getByText('Second Post')).toBeInTheDocument()
      })
    })

    it('displays business information with links', async () => {
      render(await FeedPage())

      await waitFor(() => {
        expect(screen.getByText('Business One')).toBeInTheDocument()
        expect(screen.getByText('Business Two')).toBeInTheDocument()
        
        const businessOneLink = screen.getByText('Business One').closest('a')
        expect(businessOneLink).toHaveAttribute('href', '/businesses/business-one')
      })
    })

    it('displays business avatar when available', async () => {
      render(await FeedPage())

      await waitFor(() => {
        const businessAvatar = screen.getByAltText('Business One')
        expect(businessAvatar).toBeInTheDocument()
        expect(businessAvatar).toHaveAttribute('src', 'https://example.com/business1.jpg')
      })
    })

    it('handles posts without business avatar gracefully', async () => {
      render(await FeedPage())

      await waitFor(() => {
        expect(screen.getByText('Business Two')).toBeInTheDocument()
        // Business Two has no image_url, so no avatar should be rendered
        expect(screen.queryByAltText('Business Two')).not.toBeInTheDocument()
      })
    })

    it('displays post images when available', async () => {
      render(await FeedPage())

      await waitFor(() => {
        const postImage = screen.getByAltText('post image')
        expect(postImage).toBeInTheDocument()
        expect(postImage).toHaveAttribute('src', 'https://example.com/image1.jpg')
      })
    })

    it('displays link URLs when available', async () => {
      render(await FeedPage())

      await waitFor(() => {
        const linkUrl = screen.getByText('https://example.com')
        expect(linkUrl).toBeInTheDocument()
        expect(linkUrl).toHaveAttribute('href', 'https://example.com')
        expect(linkUrl).toHaveAttribute('target', '_blank')
        expect(linkUrl).toHaveAttribute('rel', 'noreferrer')
      })
    })

    it('displays post timestamps correctly', async () => {
      render(await FeedPage())

      await waitFor(() => {
        // Check that timestamps are displayed (exact format may vary by locale)
        const timestamps = screen.getAllByText(/2024/);
        expect(timestamps).toHaveLength(2);
      })
    })

    it('handles posts with minimal content gracefully', async () => {
      render(await FeedPage())

      await waitFor(() => {
        // Second post has no content, image, or link
        expect(screen.getByText('Second Post')).toBeInTheDocument()
        expect(screen.queryByText('This is the second post content')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('handles database errors gracefully', async () => {
      // Mock subscription query error
      mockSupabase.from.mockImplementation((table) => {
        if (table === 'subscriptions') {
          let callCount = 0
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 2) {
                return { data: null, error: { message: 'Database error' } }
              }
              return mockChain
            }),
          }
          return mockChain
        }
        if (table === 'businesses') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
          }
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
        }
      })

      render(await FeedPage())

      // Should still render the page structure
      expect(screen.getByText('Your Feed')).toBeInTheDocument()
    })

    it('handles empty posts array gracefully', async () => {
      // Mock successful queries but empty posts
      mockSupabase.from.mockImplementation((table) => {
        if (table === 'subscriptions') {
          let callCount = 0
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockImplementation(() => {
              callCount++
              if (callCount === 2) {
                return { data: mockSubscriptions, error: null }
              }
              return mockChain
            }),
          }
          return mockChain
        }
        if (table === 'businesses') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: mockMyBusiness, error: null }),
          }
        }
        if (table === 'products') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockResolvedValue({ data: mockProducts, error: null }),
          }
        }
        if (table === 'business_posts') {
          return {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({ data: [], error: null }),
          }
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
        }
      })

      render(await FeedPage())

      expect(screen.getByText('Your Feed')).toBeInTheDocument()
      expect(screen.getByText('No posts yet.')).toBeInTheDocument()
    })
  })
}) 
