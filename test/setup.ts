import '@testing-library/jest-dom'
import { vi, beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'
import React from 'react'

// Make React available globally
global.React = React

// Start MSW before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
// Reset handlers after each test for isolation
afterEach(() => server.resetHandlers())
// Close MSW after all tests
afterAll(() => server.close())

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js image component to render a standard img element
vi.mock('next/image', () => ({
  default: vi.fn((props) => {
    // eslint-disable-next-line react/react-in-jsx-scope
    return React.createElement('img', { ...props })
  }),
}))

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'
process.env.SUPABASE_URL = 'http://localhost:54321'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.STRIPE_SECRET_KEY = 'sk_test_...'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_webhook_secret'
process.env.RESEND_API_KEY = 'test-key'

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock scrollIntoView for messaging component
Element.prototype.scrollIntoView = vi.fn()

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
