import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Helper function to wait for loading states to complete
export const waitForLoadingToFinish = () => {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

// Helper function to create mock user
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  ...overrides,
})

// Helper function to create mock business
export const createMockBusiness = (overrides = {}) => ({
  id: 'test-business-id',
  name: 'Test Business',
  slug: 'test-business',
  description: 'A test business description',
  created_at: '2024-01-01T00:00:00Z',
  ...overrides,
})

