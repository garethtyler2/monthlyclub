import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../test/utils'
import userEvent from '@testing-library/user-event'

// Mock Supabase client with spies we can assert on (use alias path to match component import)
vi.mock('@/lib/supabase/client', () => {
  const signInWithPassword = vi.fn()
  const signUp = vi.fn()
  const signInWithOAuth = vi.fn()
  const getUser = vi.fn()
  const onAuthStateChange = vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } })

  const insert = vi.fn().mockResolvedValue({ error: null })
  const from = vi.fn().mockReturnValue({ insert })

  return {
    supabase: {
      auth: { getUser, signInWithPassword, signUp, signInWithOAuth, onAuthStateChange },
      from,
    },
  }
})

// Use the component under test
import LoginPageContent from '../LoginPageContent'

// Ensure fetch is mocked
const fetchMock = vi.fn()
// @ts-expect-error overriding global for tests
global.fetch = fetchMock

// Reference to mocked supabase instance
let supabase: any

beforeEach(async () => {
  vi.clearAllMocks()
  // dynamically import the mocked module using the same alias
  supabase = (await import('@/lib/supabase/client')).supabase

  // default: no logged-in user
  supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

  // default auth success
  supabase.auth.signInWithPassword.mockResolvedValue({ data: { user: { id: 'u1', email: 'test@example.com' } }, error: null })
  supabase.auth.signUp.mockResolvedValue({
    data: { user: { id: 'u2', email: 'new@example.com', created_at: '2024-01-01T00:00:00Z' } },
    error: null,
  })
  supabase.auth.signInWithOAuth.mockResolvedValue({ data: { url: 'https://oauth.example/auth' }, error: null })

  // default email API success
  fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) })

  // jsdom origin
  Object.defineProperty(window, 'location', { value: { origin: 'http://localhost:3000' }, writable: true })
})

describe('LoginPageContent integration', () => {
  it('logs in with email/password and shows success message', async () => {
    const user = userEvent.setup()
    render(<LoginPageContent />)

    // open email sign-in form
    const emailEntryBtn = await screen.findByRole('button', { name: /sign in with email/i })
    await user.click(emailEntryBtn)

    // fill and submit (labels are not associated; target by role and type)
    const emailInput = screen.getAllByRole('textbox')[0] as HTMLInputElement
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    const signInButtons = screen.getAllByRole('button', { name: /sign in/i })
    const submitBtn = signInButtons.find((b) => (b as HTMLButtonElement).type === 'submit') as HTMLButtonElement
    await user.click(submitBtn)

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' })

    // status message shown
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument()
  })

  it('signs up, creates profile, and shows success message', async () => {
    const user = userEvent.setup()
    render(<LoginPageContent />)

    // switch to sign up tab
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    // open email sign-up form
    const emailEntryBtn = await screen.findByRole('button', { name: /sign up with email/i })
    await user.click(emailEntryBtn)

    // fill and submit
    const emailInput = screen.getAllByRole('textbox')[0] as HTMLInputElement
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement
    await user.type(emailInput, 'new@example.com')
    await user.type(passwordInput, 'abc12345')

    const signUpButtons = screen.getAllByRole('button', { name: /^sign up$/i })
    const submitBtn = signUpButtons.find((b) => (b as HTMLButtonElement).type === 'submit') as HTMLButtonElement
    await user.click(submitBtn)

    expect(supabase.auth.signUp).toHaveBeenCalledWith({ email: 'new@example.com', password: 'abc12345' })

    // profile insert
    expect(supabase.from).toHaveBeenCalledWith('user_profiles')

    // user feedback
    expect(await screen.findByText(/please check your email/i)).toBeInTheDocument()
  })

  it('invokes OAuth sign-in for Google with redirect', async () => {
    const user = userEvent.setup()
    render(<LoginPageContent />)

    await user.click(await screen.findByRole('button', { name: /google/i }))

    expect(supabase.auth.signInWithOAuth).toHaveBeenCalled()
    const call = supabase.auth.signInWithOAuth.mock.calls[0][0]
    expect(call.provider).toBe('google')
    expect(call.options.redirectTo).toBe('http://localhost:3000/')
  })

  it('shows error message on login failure', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ data: { user: null }, error: { message: 'Invalid credentials' } })

    const user = userEvent.setup()
    render(<LoginPageContent />)

    await user.click(await screen.findByRole('button', { name: /sign in with email/i }))
    const emailInput = screen.getAllByRole('textbox')[0] as HTMLInputElement
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement
    await user.type(emailInput, 'bad@example.com')
    await user.type(passwordInput, 'wrong')

    const signInButtons = screen.getAllByRole('button', { name: /sign in/i })
    const submitBtn = signInButtons.find((b) => (b as HTMLButtonElement).type === 'submit') as HTMLButtonElement
    await user.click(submitBtn)

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
  })
})
