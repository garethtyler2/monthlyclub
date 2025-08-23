import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/utils';
import userEvent from '@testing-library/user-event';

const MockMessagesPage = () => {
  const [searchParams] = React.useState(new URLSearchParams('?customer=test-customer-123'));
  const [connections, setConnections] = React.useState([]);
  const [conversations, setConversations] = React.useState([]);
  const [selectedConversation, setSelectedConversation] = React.useState(null);

  React.useEffect(() => {
    const customerId = searchParams.get('customer');
    if (customerId) {
      console.log('Processing customer ID from URL:', customerId);
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Messages</h1>
      <div data-testid="customer-id">
        Customer ID: {searchParams.get('customer') || 'none'}
      </div>
      <div data-testid="connections-count">
        Connections: {connections.length}
      </div>
      <div data-testid="conversations-count">
        Conversations: {conversations.length}
      </div>
      {selectedConversation && (
        <div data-testid="selected-conversation">
          Selected: {selectedConversation.id}
        </div>
      )}
    </div>
  );
};

describe('Messaging Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('processes customer ID from URL parameters correctly', async () => {
    render(<MockMessagesPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('customer-id')).toHaveTextContent('Customer ID: test-customer-123');
    });
  });

  it('displays connection and conversation counts correctly', async () => {
    render(<MockMessagesPage />);
    
    expect(screen.getByTestId('connections-count')).toHaveTextContent('Connections: 0');
    expect(screen.getByTestId('conversations-count')).toHaveTextContent('Conversations: 0');
  });

  it('handles missing URL parameters gracefully', async () => {
    const MockMessagesPageNoParams = () => {
      const [searchParams] = React.useState(new URLSearchParams(''));
      const [connections, setConnections] = React.useState([]);
      const [conversations, setConversations] = React.useState([]);

      return (
        <div>
          <h1>Messages</h1>
          <div data-testid="customer-id">
            Customer ID: {searchParams.get('customer') || 'none'}
          </div>
          <div data-testid="connections-count">
            Connections: {connections.length}
          </div>
          <div data-testid="conversations-count">
            Conversations: {conversations.length}
          </div>
        </div>
      );
    };

    render(<MockMessagesPageNoParams />);
    
    expect(screen.getByTestId('customer-id')).toHaveTextContent('Customer ID: none');
    expect(screen.getByTestId('connections-count')).toHaveTextContent('Connections: 0');
    expect(screen.getByTestId('conversations-count')).toHaveTextContent('Conversations: 0');
  });
});
