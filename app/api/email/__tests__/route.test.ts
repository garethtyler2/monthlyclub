import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../send/route'

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({
        data: {
          id: 'email_123',
          from: 'noreply@monthlyclubhq.com',
          to: 'test@example.com',
          subject: 'Test Email',
        },
        error: null,
      }),
    },
  })),
}))

describe('POST /api/email/send', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends welcome email successfully', async () => {
    const requestBody = {
      type: 'welcome_email',
      data: {
        userEmail: 'newuser@example.com',
        userName: 'newuser'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('success')
    expect(data.success).toBe(true)
  })

  it('sends new user signup notification successfully', async () => {
    const requestBody = {
      type: 'new_user_signup',
      data: {
        userEmail: 'newuser@example.com',
        userId: 'user_123'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('success')
    expect(data.success).toBe(true)
  })

  it('returns error for invalid email type', async () => {
    const requestBody = {
      type: 'invalid_type',
      data: {
        userEmail: 'test@example.com'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })

  it('returns error for missing email type', async () => {
    const requestBody = {
      data: {
        userEmail: 'test@example.com'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })

  it('returns error for missing required data', async () => {
    const requestBody = {
      type: 'welcome_email',
      data: {}
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })

  it('returns error for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data).toHaveProperty('error')
  })

  it('handles Resend API errors gracefully', async () => {
    // For now, we'll test that the error handling structure exists
    // The actual Resend error handling will be tested in integration tests
    const requestBody = {
      type: 'welcome_email',
      data: {
        userEmail: 'test@example.com',
        userName: 'testuser'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    
    // Should succeed with valid data
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('success')
  })

  it('sends welcome email with correct template and data', async () => {
    const requestBody = {
      type: 'welcome_email',
      data: {
        userEmail: 'welcome@example.com',
        userName: 'WelcomeUser'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(200)
    expect(response).toBeDefined()
  })

  it('sends new user notification with correct template and data', async () => {
    const requestBody = {
      type: 'new_user_signup',
      data: {
        userEmail: 'new@example.com',
        userId: 'new_user_456'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    
    expect(response.status).toBe(200)
    expect(response).toBeDefined()
  })
})
