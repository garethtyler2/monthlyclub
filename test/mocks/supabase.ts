import { vi } from 'vitest'

// Create a proper Supabase mock that can be reused across tests
export const createSupabaseMock = () => {
  const mockSelect = vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn(),
      maybeSingle: vi.fn(),
    }),
  })
  
  const mockInsert = vi.fn().mockReturnValue({
    select: vi.fn().mockReturnValue({
      single: vi.fn(),
    }),
  })
  
  const mockUpdate = vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn(),
    }),
  })
  
  const mockDelete = vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn(),
    }),
  })

  const mockFrom = vi.fn().mockReturnValue({
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
  })

  const mockAuth = {
    getUser: vi.fn(),
    getSession: vi.fn(),
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signInWithOAuth: vi.fn(),
    onAuthStateChange: vi.fn().mockReturnValue({ 
      data: { subscription: { unsubscribe: vi.fn() } } 
    }),
  }

  return {
    auth: mockAuth,
    from: mockFrom,
    // Helper methods to set up common mock responses
    mockUser: (user: any) => {
      mockAuth.getUser.mockResolvedValue({ data: { user }, error: null })
      mockAuth.getSession.mockResolvedValue({ data: { session: { user } }, error: null })
    },
    mockBusiness: (business: any) => {
      mockSelect.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: business, error: null }),
        }),
      })
    },
    mockSubscription: (subscription: any) => {
      mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: subscription, error: null }),
        }),
      })
    },
    mockError: (error: any) => {
      mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error }),
        }),
      })
    },
    // Reset all mocks
    reset: () => {
      vi.clearAllMocks()
      mockSelect.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn(),
          maybeSingle: vi.fn(),
        }),
      })
      mockInsert.mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn(),
        }),
      })
      mockUpdate.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn(),
        }),
      })
      mockDelete.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn(),
        }),
      })
    }
  }
}

// Default mock instance
export const supabaseMock = createSupabaseMock()

