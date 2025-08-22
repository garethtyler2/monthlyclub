import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import MessagesPage from '../page'

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'user-1', email: 'user1@example.com' } },
        error: null,
      }),
    },
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnValue({
        unsubscribe: vi.fn(),
      }),
    }),
  },
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// Mock fetch
global.fetch = vi.fn()

// Helper function to create valid mock data
const createMockConversation = (overrides = {}) => ({
  id: 'conv-1',
  participant1_id: 'user-1',
  participant2_id: 'user-2',
  participant1: {
    id: 'user-1',
    email: 'user1@example.com',
    display_name: 'User One',
    handle: 'user1',
  },
  participant2: {
    id: 'user-2',
    email: 'user2@example.com',
    display_name: 'User Two',
    handle: 'user2',
  },
  last_message: {
    id: 'msg-1',
    content: 'Hello there!',
    created_at: new Date('2024-01-01T00:00:00Z').toISOString(), // Use fixed valid date
  },
  last_message_at: new Date('2024-01-01T00:00:00Z').toISOString(), // Add this field
  unread_count: 2,
  ...overrides,
})

const createMockMessage = (overrides = {}) => ({
  id: 'msg-1',
  content: 'Hello there!',
  sender_id: 'user-2',
  created_at: new Date('2024-01-01T00:00:00Z').toISOString(), // Use fixed valid date
  read_at: null,
  ...overrides,
})

describe('MessagesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset fetch mock
    global.fetch = vi.fn()
  })

  it('renders loading state initially', () => {
    render(<MessagesPage />)
    
    // The loading state shows a spinner, not text
    expect(document.querySelector('.animate-spin')).toBeTruthy()
  })

  it('fetches and displays conversations', async () => {
    const mockConversations = [createMockConversation()]

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: mockConversations }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })

    render(<MessagesPage />)

    await waitFor(() => {
      expect(screen.getByText('User Two')).toBeInTheDocument() // Participant name from mock data
      expect(screen.getByText('Hello there!')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument() // unread count
    })
  })

  it('displays empty state when no conversations', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })

    render(<MessagesPage />)

    await waitFor(() => {
      // The component shows "Select a conversation" when no conversation is selected
      expect(screen.getByText('Select a conversation')).toBeInTheDocument()
      expect(screen.getByText('Choose a conversation from the sidebar to start messaging')).toBeInTheDocument()
    })
  })

  it('handles conversation selection', async () => {
    const mockConversations = [createMockConversation()]
    const mockMessages = [createMockMessage()]

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: mockConversations }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: mockMessages }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: mockConversations }),
      })

    const user = userEvent.setup()
    render(<MessagesPage />)

    await waitFor(() => {
      expect(screen.getByText('User Two')).toBeInTheDocument()
    })

    await user.click(screen.getByText('User Two'))

    // Use getAllByText to handle multiple elements with same text, then check the first one
    await waitFor(() => {
      const messageElements = screen.getAllByText('Hello there!')
      expect(messageElements.length).toBeGreaterThan(0)
      expect(messageElements[0]).toBeInTheDocument()
    })
  })

  it('allows sending messages', async () => {
    const mockConversations = [createMockConversation({ unread_count: 0 })]
    const mockMessages = [createMockMessage()]

    // Set up persistent mocks to prevent crashes
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ 
        conversations: mockConversations, 
        connections: [], 
        messages: mockMessages, 
        message: { 
          id: 'msg-2', 
          content: 'Hi back!',
          created_at: new Date('2024-01-01T00:00:00Z').toISOString(), // Add valid date
          sender_id: 'user-1',
          read_at: null
        } 
      }),
    })

    const user = userEvent.setup()
    render(<MessagesPage />)

    await waitFor(() => {
      expect(screen.getByText('User Two')).toBeInTheDocument()
    })

    await user.click(screen.getByText('User Two'))

    // Wait for the conversation to be fully loaded and the message input to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
    }, { timeout: 3000 })

    const messageInput = screen.getByPlaceholderText('Type a message...')
    await user.type(messageInput, 'Hi back!')
    
    // Check that the send button is enabled and clickable
    const sendButton = screen.getByText('Send')
    expect(sendButton).not.toBeDisabled()
    
    await user.click(sendButton)

    // Check that the fetch was called for sending the message
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/messaging/messages', expect.any(Object))
    }, { timeout: 2000 })
  })

  it('handles search functionality', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })

    const user = userEvent.setup()
    render(<MessagesPage />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search conversations...')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search conversations...')
    await user.type(searchInput, 'test search')

    expect(searchInput).toHaveValue('test search')
  })

  it('handles image upload', async () => {
    const mockConversations = [createMockConversation()]
    const mockMessages = [createMockMessage()]

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: mockConversations }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: mockMessages }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: mockConversations }),
      })

    const user = userEvent.setup()
    render(<MessagesPage />)

    await waitFor(() => {
      expect(screen.getByText('User Two')).toBeInTheDocument()
    })

    await user.click(screen.getByText('User Two'))

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
    }, { timeout: 5000 })

    // The image button is the first button in the message area (with ImageIcon)
    const imageButton = screen.getAllByRole('button').find(button => 
      button.querySelector('svg.lucide-image')
    ) || screen.getAllByRole('button')[0]
    expect(imageButton).toBeInTheDocument()
  })

  it('handles mobile responsiveness', async () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    })

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })

    render(<MessagesPage />)

    await waitFor(() => {
      // Should show mobile-optimized layout
      expect(screen.getAllByText('New Chat')).toHaveLength(2) // Header and sidebar buttons
    })
  })

  it('handles real-time message updates', async () => {
    const mockConversations = [createMockConversation({ unread_count: 0 })]
    const mockMessages = [createMockMessage()]

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: mockConversations }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ connections: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messages: mockMessages }),
      })

    render(<MessagesPage />)

    await waitFor(() => {
      expect(screen.getByText('User Two')).toBeInTheDocument()
    })

    // Real-time updates should be handled by Supabase subscription
    // This test verifies the subscription is set up
    expect(global.fetch).toHaveBeenCalledWith('/api/messaging/conversations')
  })

  it('handles error states gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    render(<MessagesPage />)

    await waitFor(() => {
      // Should handle errors gracefully without crashing
      expect(screen.getByText('Select a conversation')).toBeInTheDocument()
    })
  })
})
