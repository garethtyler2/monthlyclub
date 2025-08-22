import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, POST } from '../route'
import { NextRequest } from 'next/server'

// Mock Supabase with proper chaining support
const mockSupabase = {
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
}

// Mock the service client for marking messages as read
const mockServiceClient = {
  from: vi.fn(),
}

// Mock the supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => mockSupabase),
  createServiceRoleClient: vi.fn(() => mockServiceClient),
}))

describe('GET /api/messaging/messages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user1@example.com' } },
      error: null,
    })
  })

  it('returns messages for authenticated user', async () => {
    const mockMessages = [
      {
        id: 'msg-1',
        content: 'Hello there!',
        sender_id: 'user-2',
        created_at: new Date().toISOString(),
        read_at: null,
      },
      {
        id: 'msg-2',
        content: 'Hi back!',
        sender_id: 'user-1',
        created_at: new Date().toISOString(),
        read_at: new Date().toISOString(),
      },
    ]

    // Mock the service client for marking messages as read
    const mockServiceChain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockResolvedValue({ data: [], error: null }),
    }

    // Create a chainable mock factory
    const createChainableMock = (finalResult: any) => {
      const mock = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        or: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue(finalResult),
        update: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(finalResult),
      }
      return mock
    }

    // Set up different mock chains for different query patterns
    const mockConversationSelectChain = createChainableMock({ 
      data: { 
        id: 'conv-1', 
        participant1_id: 'user-1', 
        participant2_id: 'user-2' 
      }, 
      error: null 
    })

    const mockMessagesSelectChain = createChainableMock({ data: mockMessages, error: null })
    const mockMessagesFetchChain = createChainableMock({ data: mockMessages, error: null })
    const mockConversationUpdateChain = createChainableMock({ data: [], error: null })

    // Mock different responses based on table and method calls
    let callCount = 0
    mockSupabase.from.mockImplementation((table) => {
      callCount++
      console.log(`Mock call ${callCount}: ${table}`)
      if (table === 'conversations' && callCount === 1) return mockConversationSelectChain
      if (table === 'messages' && callCount === 2) return mockMessagesSelectChain
      if (table === 'messages' && callCount === 3) return mockMessagesFetchChain
      if (table === 'conversations' && callCount === 4) return mockConversationUpdateChain
      return mockMessagesSelectChain
    })
    mockServiceClient.from.mockReturnValue(mockServiceChain)

    const request = new NextRequest('http://localhost:3000/api/messaging/messages?conversation_id=conv-1')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('messages')
    expect(data.messages).toHaveLength(2)
    expect(data.messages[0].content).toBe('Hello there!')
    expect(data.messages[1].content).toBe('Hi back!')
  })

  it('returns 401 for unauthenticated user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    })

    const request = new NextRequest('http://localhost:3000/api/messaging/messages?conversation_id=conv-1')
    const response = await GET(request)

    expect(response.status).toBe(401)
  })

  it('returns 400 for missing conversation_id', async () => {
    const request = new NextRequest('http://localhost:3000/api/messaging/messages')
    const response = await GET(request)

    expect(response.status).toBe(400)
  })

  it('handles database errors gracefully', async () => {
    // Mock conversation access check to fail
    const mockConversationSelectChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ 
        data: null, 
        error: { message: 'Database error' } 
      }),
    }

    mockSupabase.from.mockReturnValue(mockConversationSelectChain)

    const request = new NextRequest('http://localhost:3000/api/messaging/messages?conversation_id=conv-1')
    const response = await GET(request)

    expect(response.status).toBe(404)
  })

  it('returns empty messages array when no messages exist', async () => {
    // Mock the service client for marking messages as read
    const mockServiceChain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      is: vi.fn().mockResolvedValue({ data: [], error: null }),
    }

    // Create a chainable mock factory
    const createChainableMock = (finalResult: any) => {
      const mock = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        or: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue(finalResult),
        update: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue(finalResult),
      }
      return mock
    }

    // Set up different mock chains for different query patterns
    const mockConversationSelectChain = createChainableMock({ 
      data: { 
        id: 'conv-1', 
        participant1_id: 'user-1', 
        participant2_id: 'user-2' 
      }, 
      error: null 
    })

    const mockMessagesSelectChain = createChainableMock({ data: [], error: null })
    const mockMessagesFetchChain = createChainableMock({ data: [], error: null })
    const mockConversationUpdateChain = createChainableMock({ data: [], error: null })

    // Mock different responses based on table and method calls
    let callCount = 0
    mockSupabase.from.mockImplementation((table) => {
      callCount++
      console.log(`Mock call ${callCount}: ${table}`)
      if (table === 'conversations' && callCount === 1) return mockConversationSelectChain
      if (table === 'messages' && callCount === 2) return mockMessagesSelectChain
      if (table === 'messages' && callCount === 3) return mockMessagesFetchChain
      if (table === 'conversations' && callCount === 4) return mockConversationUpdateChain
      return mockMessagesSelectChain
    })
    mockServiceClient.from.mockReturnValue(mockServiceChain)

    const request = new NextRequest('http://localhost:3000/api/messaging/messages?conversation_id=conv-1')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.messages).toHaveLength(0)
  })
})

describe('POST /api/messaging/messages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user1@example.com' } },
      error: null,
    })
  })

  it('sends message successfully', async () => {
    const mockMessage = {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      content: 'Hello there!',
      message_type: 'text',
      created_at: new Date().toISOString(),
      read_at: null,
    }

    // Set up the mock chain for conversation verification and updates
    const mockConversationChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(), // Add update method for conversation updates
      single: vi.fn().mockResolvedValue({ 
        data: { 
          id: 'conv-1', 
          participant1_id: 'user-1', 
          participant2_id: 'user-2' 
        }, 
        error: null 
      }),
    }

    // Set up the mock chain for message insertion
    const mockMessageChain = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ 
        data: mockMessage, 
        error: null 
      }),
    }

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'conversations') return mockConversationChain
      if (table === 'messages') return mockMessageChain
      return mockConversationChain
    })

    const requestBody = {
      conversation_id: 'conv-1',
      content: 'Hello there!',
      message_type: 'text',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('message')
    expect(data.message).toHaveProperty('id')
    expect(data.message.content).toBe('Hello there!')
  })

  it('returns 401 for unauthenticated user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    })

    const requestBody = {
      conversation_id: 'conv-1',
      content: 'Hello there!',
      message_type: 'text',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
  })

  it('returns 400 for missing conversation_id', async () => {
    const requestBody = {
      content: 'Hello there!',
      message_type: 'text',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })

  it('returns 400 for missing content', async () => {
    const requestBody = {
      conversation_id: 'conv-1',
      message_type: 'text',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })

  it('returns 400 for empty content', async () => {
    const requestBody = {
      conversation_id: 'conv-1',
      content: '',
      message_type: 'text',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })

  it('handles database errors gracefully', async () => {
    const mockConversationChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(), // Add update method for conversation updates
      single: vi.fn().mockResolvedValue({ 
        data: { 
          id: 'conv-1', 
          participant1_id: 'user-1', 
          participant2_id: 'user-2' 
        }, 
        error: null 
      }),
    }

    const mockMessageChain = {
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ 
        data: null, 
        error: { message: 'Database error' } 
      }),
    }

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'conversations') return mockConversationChain
      if (table === 'messages') return mockMessageChain
      return mockConversationChain
    })

    const requestBody = {
      conversation_id: 'conv-1',
      content: 'Hello there!',
      message_type: 'text',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error', 'Failed to create message')
  })

  it('handles invalid JSON in request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/messaging/messages', {
      method: 'POST',
      body: 'invalid json',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error')
  })
})
