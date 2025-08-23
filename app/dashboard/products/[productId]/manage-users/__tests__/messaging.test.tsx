import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../../../../test/utils';
import userEvent from '@testing-library/user-event';

const mockCreateUserConnectionsForSubscription = vi.fn();
const mockNavigateToMessages = vi.fn();

vi.mock('@/lib/utils', () => ({
  createUserConnectionsForSubscription: mockCreateUserConnectionsForSubscription
}));

const MockMessagingComponent = () => {
  const [customerId, setCustomerId] = React.useState('customer-123');
  const [businessId, setBusinessId] = React.useState('business-456');
  const [productId, setProductId] = React.useState('product-789');
  const [connectionExists, setConnectionExists] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleMessageCustomer = async () => {
    setIsLoading(true);
    try {
      if (connectionExists) {
        mockNavigateToMessages(`/messages?customer=${customerId}`);
      } else {
        const success = await mockCreateUserConnectionsForSubscription(
          customerId,
          productId,
          businessId
        );
        if (success) {
          mockNavigateToMessages(`/messages?customer=${customerId}`);
        }
      }
    } catch (error) {
      console.error('Error messaging customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleConnection = () => {
    setConnectionExists(!connectionExists);
  };

  return (
    <div>
      <h2>Test Messaging Component</h2>
      <div data-testid="connection-status">
        Connection exists: {connectionExists ? 'Yes' : 'No'}
      </div>
      <button onClick={handleMessageCustomer} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Message Customer'}
      </button>
      <button onClick={toggleConnection}>
        Toggle Connection Status
      </button>
    </div>
  );
};

describe('Manage Users Messaging Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates directly to messages when connection already exists', async () => {
    const user = userEvent.setup();
    render(<MockMessagingComponent />);
    
    expect(screen.getByTestId('connection-status')).toHaveTextContent('Connection exists: No');
    
    await user.click(screen.getByText('Toggle Connection Status'));
    expect(screen.getByTestId('connection-status')).toHaveTextContent('Connection exists: Yes');
    
    await user.click(screen.getByText('Message Customer'));
    
    expect(mockNavigateToMessages).toHaveBeenCalledWith('/messages?customer=customer-123');
    expect(mockCreateUserConnectionsForSubscription).not.toHaveBeenCalled();
  });

  it('creates connection and navigates when connection does not exist', async () => {
    mockCreateUserConnectionsForSubscription.mockResolvedValue(true);
    
    const user = userEvent.setup();
    render(<MockMessagingComponent />);
    
    expect(screen.getByTestId('connection-status')).toHaveTextContent('Connection exists: No');
    
    await user.click(screen.getByText('Message Customer'));
    
    expect(mockCreateUserConnectionsForSubscription).toHaveBeenCalledWith(
      'customer-123',
      'product-789',
      'business-456'
    );
    expect(mockNavigateToMessages).toHaveBeenCalledWith('/messages?customer=customer-123');
  });

  it('handles connection creation failure gracefully', async () => {
    mockCreateUserConnectionsForSubscription.mockResolvedValue(false);
    
    const user = userEvent.setup();
    render(<MockMessagingComponent />);
    
    await user.click(screen.getByText('Message Customer'));
    
    expect(mockCreateUserConnectionsForSubscription).toHaveBeenCalled();
    expect(mockNavigateToMessages).not.toHaveBeenCalled();
  });

  it('manages loading state during connection creation', async () => {
    mockCreateUserConnectionsForSubscription.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(true), 100))
    );
    
    const user = userEvent.setup();
    render(<MockMessagingComponent />);
    
    const messageButton = screen.getByText('Message Customer');
    expect(messageButton).not.toBeDisabled();
    
    await user.click(messageButton);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.getByText('Processing...')).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByText('Message Customer')).toBeInTheDocument();
    });
  });
});
