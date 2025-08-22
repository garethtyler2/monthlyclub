# Testing Guide for Monthly Club

This project uses a modern testing stack with Vitest, React Testing Library, and MSW for comprehensive testing coverage.

## 🚀 Quick Start

### Run Tests
```bash
# Run tests in watch mode (recommended for development)
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🧪 Testing Stack

- **Vitest**: Fast test runner with excellent TypeScript support
- **React Testing Library**: Industry standard for testing React components
- **MSW (Mock Service Worker)**: For mocking API calls and external services
- **@testing-library/jest-dom**: Additional matchers for better assertions

## 📁 Test Structure

```
test/
├── setup.ts              # Test environment setup
├── utils.tsx             # Test utilities and custom render
└── mocks/
    ├── server.ts         # MSW server setup
    └── handlers.ts       # API mock handlers

components/
└── ComponentName/
    └── __tests__/
        └── ComponentName.test.tsx

app/
└── api/
    └── endpoint/
        └── __tests__/
            └── route.test.ts
```

## 🎯 Writing Tests

### Component Testing

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### API Route Testing

```tsx
import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../route'

describe('POST /api/endpoint', () => {
  it('handles valid requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('success', true)
  })
})
```

### Testing with MSW

```tsx
import { http, HttpResponse } from 'msw'
import { server } from '../../../test/mocks/server'

it('fetches data from API', async () => {
  // Override the default handler for this test
  server.use(
    http.get('/api/data', () => {
      return HttpResponse.json({ items: ['test1', 'test2'] })
    })
  )

  render(<DataComponent />)
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('test1')).toBeInTheDocument()
  })
})
```

## 🔧 Test Utilities

### Custom Render Function

The `test/utils.tsx` file provides a custom render function that includes:
- React Query provider
- Proper TypeScript support
- Common test helpers

### Mock Data Helpers

```tsx
import { createMockUser, createMockBusiness } from '../../../test/utils'

const user = createMockUser({ name: 'John Doe' })
const business = createMockBusiness({ name: 'Test Corp' })
```

## 📊 Coverage

Run coverage reports to see test coverage:

```bash
npm run test:coverage
```

This will generate an HTML coverage report in the `coverage/` directory.

## 🚨 Common Testing Patterns

### Testing Async Operations

```tsx
it('handles async operations', async () => {
  render(<AsyncComponent />)
  
  // Wait for loading to complete
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
  
  expect(screen.getByText('Data loaded')).toBeInTheDocument()
})
```

### Testing Form Submissions

```tsx
it('submits form data', async () => {
  const user = userEvent.setup()
  render(<FormComponent />)
  
  const input = screen.getByLabelText('Name')
  const submitButton = screen.getByRole('button', { name: 'Submit' })
  
  await user.type(input, 'John Doe')
  await user.click(submitButton)
  
  expect(screen.getByText('Form submitted')).toBeInTheDocument()
})
```

### Testing Error States

```tsx
it('displays error message on failure', async () => {
  // Mock API to return error
  server.use(
    http.get('/api/data', () => {
      return HttpResponse.error()
    })
  )
  
  render(<DataComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Error loading data')).toBeInTheDocument()
  })
})
```

## 🎭 Mocking Strategies

### External Services

- **Supabase**: Mocked via MSW handlers
- **Stripe**: Mocked via MSW handlers  
- **Email Services**: Mocked via MSW handlers
- **AI Services**: Mocked via MSW handlers

### Next.js Features

- **Router**: Mocked in test setup
- **Image Component**: Mocked to return regular img tags
- **Environment Variables**: Set in test setup

## 📝 Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Error States**: Ensure your app handles failures gracefully
4. **Keep Tests Fast**: Use mocks for external dependencies
5. **Test Accessibility**: Use role-based queries to ensure good accessibility
6. **Group Related Tests**: Use `describe` blocks to organize test suites

## 🔍 Debugging Tests

### Using the UI

```bash
npm run test:ui
```

This opens a browser-based test runner with debugging capabilities.

### Console Logging

```tsx
it('debugs test', () => {
  render(<Component />)
  screen.debug() // Logs the current DOM
})
```

### Async Debugging

```tsx
it('debugs async', async () => {
  render(<AsyncComponent />)
  
  await waitFor(() => {
    screen.debug() // Logs after async operation
  })
})
```

## 🚀 Continuous Integration

Add this to your CI pipeline:

```yaml
- name: Run tests
  run: npm run test:run

- name: Generate coverage
  run: npm run test:coverage
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)

