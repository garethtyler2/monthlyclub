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

// Mock the supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => mockSupabase),
  createServiceRoleClient: vi.fn(() => mockSupabase),
}))

// Mock the service client for unread counts
vi.mock('@/lib/supabase/service', () => ({
  createServiceClient: vi.fn(() => mockSupabase),
}))

// Helper function to create mock chains
const createMockChain = (methods: Record<string, any>) => {
  const chain: any = {}
  Object.keys(methods).forEach(key => {
    chain[key] = vi.fn().mockReturnValue(chain)
  })
  // Set the final method to return the actual result
  const lastKey = Object.keys(methods)[Object.keys(methods).length - 1]
  chain[lastKey] = vi.fn().mockResolvedValue(methods[lastKey])
  return chain
}

// Helper function to create a mock chain that can handle multiple calls to the same method
const createSequenceMockChain = (methodSequence: Array<{ method: string, result: any }>) => {
  const chain: any = {}
  const methodCalls: any = {}
  
  methodSequence.forEach(({ method, result }) => {
    if (!methodCalls[method]) {
      methodCalls[method] = 0
    }
    
    if (!chain[method]) {
      chain[method] = vi.fn()
    }
    
    const callIndex = methodCalls[method]
    methodCalls[method]++
    
    if (callIndex === methodSequence.filter(m => m.method === method).length - 1) {
      // Last call to this method returns the result
      chain[method].mockReturnValueOnce(chain).mockResolvedValueOnce(result)
    } else {
      // Other calls return the chain for chaining
      chain[method].mockReturnValueOnce(chain)
    }
  })
  
  return chain
}

describe('GET /api/messaging/conversations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset mock implementations
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user1@example.com' } },
      error: null,
    })
  })

  it('returns conversations for authenticated user', async () => {
    // Mock the conversation data with proper structure
    const mockConversations = [
      {
        id: 'conv-1',
        participant1_id: 'user-1',
        participant2_id: 'user-2',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        participant1: {
          id: 'user-1',
          email: 'user1@example.com',
          handle: 'user1',
          display_name: 'User One',
          avatar_url: null,
          created_at: '2024-01-01T00:00:00Z'
        },
        participant2: {
          id: 'user-2',
          email: 'user2@example.com',
          handle: 'user2',
          display_name: 'User Two',
          avatar_url: null,
          created_at: '2024-01-01T00:00:00Z'
        }
      },
    ]

    // Mock the last message data
    const mockLastMessage = {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-2',
      content: 'Hello there!',
      created_at: '2024-01-01T00:00:00Z',
    }

    // Create fresh mock chains for each call
    let callCount = 0
    
    // Mock different responses based on call order
    mockSupabase.from.mockImplementation((table) => {
      if (table === 'conversations') {
        // Return conversations query result
        return {
          select: vi.fn().mockReturnThis(),
          or: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: mockConversations, error: null }),
        }
      } else if (table === 'messages') {
        callCount++
        if (callCount % 3 === 1) {
          // First call for last message (single)
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: mockLastMessage, error: null }),
          }
        } else if (callCount % 3 === 2) {
          // Second call for unread count (is)
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            is: vi.fn().mockResolvedValue({ count: 2 }),
          }
          // Override eq to handle multiple calls
          mockChain.eq = vi.fn().mockReturnValue(mockChain)
          return mockChain
        } else {
          // Third call for message details (select)
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockResolvedValue({ data: [mockLastMessage], error: null }),
          }
        }
      }
      return {
        select: vi.fn().mockReturnThis(),
        or: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
      }
    })

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('conversations')
    expect(data.conversations).toHaveLength(1)
    expect(data.conversations[0]).toHaveProperty('id', 'conv-1')
    expect(data.conversations[0]).toHaveProperty('other_participant')
    expect(data.conversations[0]).toHaveProperty('last_message')
    expect(data.conversations[0]).toHaveProperty('unread_count')
  })

  it('returns 401 for unauthenticated user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    })

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations')
    const response = await GET(request)

    expect(response.status).toBe(401)
  })

  it('returns 401 when auth error occurs', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Auth error' },
    })

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations')
    const response = await GET(request)

    expect(response.status).toBe(401)
  })

  it('handles database errors gracefully', async () => {
    const mockFromChain = createMockChain({
      select: null,
      or: null,
      order: { 
        data: null, 
        error: { message: 'Database error' } 
      },
    })

    mockSupabase.from.mockReturnValue(mockFromChain)

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations')
    const response = await GET(request)

    expect(response.status).toBe(500)
  })

  it('returns empty conversations array when no conversations exist', async () => {
    const mockFromChain = createMockChain({
      select: null,
      or: null,
      order: { data: [], error: null },
    })
    mockSupabase.from.mockReturnValue(mockFromChain)

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.conversations).toHaveLength(0)
  })

  it('calculates unread count correctly for other participant messages', async () => {
    const mockConversations = [
      {
        id: 'conv-1',
        participant1_id: 'user-1',
        participant2_id: 'user-2',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        participant1: {
          id: 'user-1',
          email: 'user1@example.com',
          handle: 'user1',
          display_name: 'User One',
          avatar_url: null,
          created_at: '2024-01-01T00:00:00Z'
        },
        participant2: {
          id: 'user-2',
          email: 'user2@example.com',
          handle: 'user2',
          display_name: 'User Two',
          avatar_url: null,
          created_at: '2024-01-01T00:00:00Z'
        }
      },
    ]

    const mockLastMessage = {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-2',
      content: 'Hello there!',
      created_at: '2024-01-01T00:00:00Z',
    }

    // Create fresh mock chains for each call
    let callCount = 0
    
    // Mock different responses based on call order
    mockSupabase.from.mockImplementation((table) => {
      if (table === 'conversations') {
        // Return conversations query result
        return {
          select: vi.fn().mockReturnThis(),
          or: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: mockConversations, error: null }),
        }
      } else if (table === 'messages') {
        callCount++
        if (callCount % 3 === 1) {
          // First call for last message (single)
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: mockLastMessage, error: null }),
          }
        } else if (callCount % 3 === 2) {
          // Second call for unread count (is)
          const mockChain = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            is: vi.fn().mockResolvedValue({ count: 3 }),
          }
          // Override eq to handle multiple calls
          mockChain.eq = vi.fn().mockReturnValue(mockChain)
          return mockChain
        } else {
          // Third call for message details (select)
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockResolvedValue({ data: [mockLastMessage], error: null }),
          }
        }
      }
      return {
        select: vi.fn().mockReturnThis(),
        or: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        is: vi.fn().mockReturnThis(),
      }
    })

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.conversations[0].unread_count).toBe(3)
  })
})

describe('POST /api/messaging/conversations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'user1@example.com' } },
      error: null,
    })
  })

  it('creates new conversation successfully', async () => {
    const mockConversation = {
      id: 'conv-1',
      participant1_id: 'user-1',
      participant2_id: 'user-2',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }

    const mockFullConversation = {
      ...mockConversation,
      participant1: {
        id: 'user-1',
        email: 'user1@example.com',
        handle: 'user1',
        display_name: 'User One',
        avatar_url: null,
        created_at: '2024-01-01T00:00:00Z'
      },
      participant2: {
        id: 'user-2',
        email: 'user2@example.com',
        handle: 'user2',
        display_name: 'User Two',
        avatar_url: null,
        created_at: '2024-01-01T00:00:00Z'
      }
    }

    // Create a simple mock chain
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
    }

    let callOrder = 0
    mockSupabase.from.mockImplementation((table) => {
      callOrder++
      if (table === 'user_profiles') {
        // User profile checks
        mockChain.single = vi.fn().mockResolvedValue({ data: { id: 'user-1' }, error: null })
        return mockChain
      } else if (table === 'conversations') {
        if (callOrder <= 3) {
          // Existing conversation check - return not found
          mockChain.single = vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
        } else if (callOrder === 4) {
          // Insert new conversation
          mockChain.single = vi.fn().mockResolvedValue({ data: mockConversation, error: null })
        } else {
          // Fetch full conversation details
          mockChain.single = vi.fn().mockResolvedValue({ data: mockFullConversation, error: null })
        }
        return mockChain
      }
      return mockChain
    })

    const requestBody = {
      participant2_id: 'user-2',
      initial_message: 'Hello!',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('conversation')
    expect(data.conversation).toHaveProperty('id')
  })

  it('returns 401 for unauthenticated user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    })

    const requestBody = {
      participant2_id: 'user-2',
      initial_message: 'Hello!',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
  })

  it('returns 400 for missing participant2_id', async () => {
    const requestBody = {
      initial_message: 'Hello!',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })

  it('returns 400 for missing initial_message', async () => {
    // Mock the service client for user profile queries
    const mockServiceChain = createMockChain({
      select: null,
      eq: null,
      single: { 
        data: { id: 'user-1' }, 
        error: null 
      },
    })

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'user_profiles') return mockServiceChain
      return mockServiceChain
    })

    const requestBody = {
      participant2_id: 'user-2',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })

  it('prevents creating conversation with self', async () => {
    // Mock the service client for user profile queries
    const mockServiceChain = createMockChain({
      select: null,
      eq: null,
      single: { 
        data: { id: 'user-1' }, 
        error: null 
      },
    })

    mockSupabase.from.mockImplementation((table) => {
      if (table === 'user_profiles') return mockServiceChain
      return mockServiceChain
    })

    const requestBody = {
      participant2_id: 'user-1',
      initial_message: 'Hello!',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error', 'Cannot create conversation with yourself')
  })

  it('handles database errors gracefully', async () => {
    // Create a simple mock chain
    const mockChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
    }

    let callOrder = 0
    mockSupabase.from.mockImplementation((table) => {
      callOrder++
      if (table === 'user_profiles') {
        // User profile checks
        mockChain.single = vi.fn().mockResolvedValue({ data: { id: 'user-1' }, error: null })
        return mockChain
      } else if (table === 'conversations') {
        if (callOrder <= 3) {
          // Existing conversation check - return not found
          mockChain.single = vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
        } else {
          // Insert new conversation - return error
          mockChain.single = vi.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } })
        }
        return mockChain
      }
      return mockChain
    })

    const requestBody = {
      participant2_id: 'user-2',
      initial_message: 'Hello!',
    }

    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error', 'Failed to create conversation')
  })

  it('handles invalid JSON in request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/messaging/conversations', {
      method: 'POST',
      body: 'invalid json',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error')
  })
})
