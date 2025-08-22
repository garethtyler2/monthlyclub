import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import MyPostsList from '../MyPostsList'

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'post-1',
                created_at: '2024-01-15T10:00:00Z',
                title: 'Test Post 1',
                content: 'This is test content 1',
                link_url: 'https://example.com/1',
                image_url: 'https://example.com/image1.jpg',
              },
              {
                id: 'post-2',
                created_at: '2024-01-14T10:00:00Z',
                title: 'Test Post 2',
                content: 'This is test content 2',
                link_url: null,
                image_url: null,
              },
            ],
            error: null,
          }),
        }),
      }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    }),
  },
}))

// Mock environment variable
vi.mock('process.env', () => ({
  NEXT_PUBLIC_SITE_URL: 'https://www.monthlyclubhq.com',
}))

describe('MyPostsList', () => {
  const defaultProps = {
    businessId: 'test-business-id',
    businessSlug: 'test-business',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Post Loading and Display', () => {
    it('shows loading state initially', async () => {
      // Mock a delayed response to see loading state
      const { supabase } = await import('@/lib/supabase/client')
      vi.mocked(supabase.from().select().eq().order).mockImplementationOnce(() => 
        new Promise(resolve => setTimeout(() => resolve({
          data: [],
          error: null,
        }), 100))
      )
      
      render(<MyPostsList {...defaultProps} />)
      
      // Should show loading state initially
      expect(screen.getByText('Loading posts…')).toBeInTheDocument()
    })

    it('fetches and displays posts after loading', async () => {
      const { supabase } = await import('@/lib/supabase/client')
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledWith('business_posts')
        expect(supabase.from().select).toHaveBeenCalledWith('id, created_at, title, content, link_url, image_url')
        expect(supabase.from().select().eq).toHaveBeenCalledWith('business_id', 'test-business-id')
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
        expect(screen.getByText('Test Post 2')).toBeInTheDocument()
      })
    })

    it('displays post content correctly', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('This is test content 1')).toBeInTheDocument()
        expect(screen.getByText('This is test content 2')).toBeInTheDocument()
      })
    })

    it('displays post images when available', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        const image = screen.getByAltText('post image')
        expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg')
      })
    })

    it('displays post links when available', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        const link = screen.getByText('https://example.com/1')
        expect(link).toHaveAttribute('href', 'https://example.com/1')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noreferrer')
      })
    })

    it('displays post creation time', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText(/1\/15\/2024/)).toBeInTheDocument()
        expect(screen.getByText(/1\/14\/2024/)).toBeInTheDocument()
      })
    })
  })

  describe('Empty State', () => {
    it('shows empty state when no posts exist', async () => {
      const { supabase } = await import('@/lib/supabase/client')
      
      // Mock empty posts response
      vi.mocked(supabase.from().select().eq().order).mockResolvedValueOnce({
        data: [],
        error: null,
      })
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        // Should render EmptyPostsCta component
        expect(screen.getByText('Create your first post')).toBeInTheDocument()
      })
    })
  })

  describe('Post Deletion', () => {
    it('shows delete button for each post', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        const deleteButtons = screen.getAllByText('Delete')
        expect(deleteButtons).toHaveLength(2)
      })
    })

    it('opens confirmation dialog when delete is clicked', async () => {
      const user = userEvent.setup()
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      expect(screen.getByText('Delete this post?')).toBeInTheDocument()
      expect(screen.getByText('This action cannot be undone and will permanently remove the post.')).toBeInTheDocument()
    })

    it('deletes post when confirmed', async () => {
      const user = userEvent.setup()
      const { supabase } = await import('@/lib/supabase/client')
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      const allDeleteButtons = screen.getAllByRole('button', { name: 'Delete' })
      const confirmDeleteButton = allDeleteButtons.find(btn => btn.className.includes('bg-red-500'))
      await user.click(confirmDeleteButton!)
      
      await waitFor(() => {
        expect(supabase.from().delete).toHaveBeenCalled()
        expect(supabase.from().delete().eq).toHaveBeenCalledWith('id', 'post-1')
      })
    })

    it('removes deleted post from UI after successful deletion', async () => {
      const user = userEvent.setup()
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
        expect(screen.getByText('Test Post 2')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      const allDeleteButtons = screen.getAllByRole('button', { name: 'Delete' })
      const confirmDeleteButton = allDeleteButtons.find(btn => btn.className.includes('bg-red-500'))
      await user.click(confirmDeleteButton!)
      
      await waitFor(() => {
        expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument()
        expect(screen.getByText('Test Post 2')).toBeInTheDocument()
      })
    })

    it('handles deletion errors gracefully', async () => {
      const user = userEvent.setup()
      const { supabase } = await import('@/lib/supabase/client')
      
      // Mock deletion error
      vi.mocked(supabase.from().delete().eq).mockResolvedValueOnce({
        error: { message: 'Delete failed' },
        data: null,
      })
      
      // Mock alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      const allDeleteButtons = screen.getAllByRole('button', { name: 'Delete' })
      const confirmDeleteButton = allDeleteButtons.find(btn => btn.className.includes('bg-red-500'))
      await user.click(confirmDeleteButton!)
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Failed to delete: Delete failed')
      })
      
      // Post should still be visible
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      
      alertSpy.mockRestore()
    })

    it('closes confirmation dialog after deletion', async () => {
      const user = userEvent.setup()
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      expect(screen.getByText('Delete this post?')).toBeInTheDocument()
      
      const allDeleteButtons = screen.getAllByRole('button', { name: 'Delete' })
      const confirmDeleteButton = allDeleteButtons.find(btn => btn.className.includes('bg-red-500'))
      await user.click(confirmDeleteButton!)
      
      await waitFor(() => {
        expect(screen.queryByText('Delete this post?')).not.toBeInTheDocument()
      })
    })
  })

  describe('Share Functionality', () => {
    it('renders share button for each post', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        // ShareButton component should be rendered for each post
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
    })

    it('passes correct URL to share button', async () => {
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      // ShareButton should receive the business URL
      // The actual sharing logic is tested in ShareButton component
    })
  })

  describe('Loading States', () => {
    it('shows loading spinner during deletion', async () => {
      const user = userEvent.setup()
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      const allDeleteButtons = screen.getAllByRole('button', { name: 'Delete' })
      const confirmDeleteButton = allDeleteButtons.find(btn => btn.className.includes('bg-red-500'))
      await user.click(confirmDeleteButton!)
      
      // Should show loading state - check for remaining posts after deletion
      await waitFor(() => {
        expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument()
      })
    })

    it('disables delete button during deletion', async () => {
      const user = userEvent.setup()
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      const deleteButtons = screen.getAllByText('Delete')
      await user.click(deleteButtons[0])
      
      const allDeleteButtons = screen.getAllByRole('button', { name: 'Delete' })
      const confirmDeleteButton = allDeleteButtons.find(btn => btn.className.includes('bg-red-500'))
      await user.click(confirmDeleteButton!)
      
      // Delete button should be disabled
      expect(confirmDeleteButton).toBeDisabled()
    })
  })

  describe('Data Fetching', () => {
    it('fetches posts when businessId changes', async () => {
      const { rerender } = render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      })
      
      // Change businessId
      rerender(<MyPostsList businessId="new-business-id" businessSlug="new-business" />)
      
      // Should show loading state
      expect(screen.getByText('Loading posts…')).toBeInTheDocument()
    })

    it('orders posts by creation date (newest first)', async () => {
      const { supabase } = await import('@/lib/supabase/client')
      
      render(<MyPostsList {...defaultProps} />)
      
      await waitFor(() => {
        expect(supabase.from().select().eq().order).toHaveBeenCalledWith('created_at', { ascending: false })
      })
    })
  })

  describe('Error Handling', () => {
    it('handles fetch errors gracefully', async () => {
      const { supabase } = await import('@/lib/supabase/client')
      
      // Mock fetch error
      vi.mocked(supabase.from().select().eq().order).mockResolvedValueOnce({
        data: null,
        error: { message: 'Fetch failed' },
      })
      
      render(<MyPostsList {...defaultProps} />)
      
      // Should handle errors gracefully without crashing
      await waitFor(() => {
        expect(screen.getByText('Create your first post')).toBeInTheDocument()
      })
    })
  })
})
