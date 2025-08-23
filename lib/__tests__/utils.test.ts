import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUserConnectionsForSubscription } from '../utils';

// Mock Supabase properly
vi.mock('../supabase/client', () => ({
  supabase: {
    from: vi.fn()
  }
}));

// Import the mocked supabase
import { supabase } from '../supabase/client';

describe('createUserConnectionsForSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates user connections successfully for new subscription', async () => {
    const customerUserId = 'customer-123';
    const productId = 'product-456';
    const businessId = 'business-789';

    // Mock the business fetch
    vi.mocked(supabase.from).mockReturnValueOnce({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { user_id: 'business-owner-123' },
            error: null
          })
        })
      })
    } as any);

    // Mock the connection creation calls
    vi.mocked(supabase.from).mockReturnValueOnce({
      upsert: vi.fn().mockReturnValue({
        onConflict: vi.fn().mockResolvedValue({ data: null, error: null })
      })
    } as any);

    vi.mocked(supabase.from).mockReturnValueOnce({
      upsert: vi.fn().mockReturnValue({
        onConflict: vi.fn().mockResolvedValue({ data: null, error: null })
      })
    } as any);

    const result = await createUserConnectionsForSubscription(
      customerUserId,
      productId,
      businessId
    );

    expect(result).toBe(true);
    expect(vi.mocked(supabase.from)).toHaveBeenCalledTimes(3); // 1 for business, 2 for connections
  });

  it('skips connection creation when customer and business owner are the same user', async () => {
    const customerUserId = 'same-user-123';
    const productId = 'product-456';
    const businessId = 'business-789';

    // Mock business fetch to return same user ID
    vi.mocked(supabase.from).mockReturnValueOnce({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { user_id: 'same-user-123' },
            error: null
          })
        })
      })
    } as any);

    const result = await createUserConnectionsForSubscription(
      customerUserId,
      productId,
      businessId
    );

    expect(result).toBe(true);
    // Should only call business table, not user_connections
    expect(vi.mocked(supabase.from)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(supabase.from)).toHaveBeenCalledWith('businesses');
  });

  it('handles business fetch errors gracefully', async () => {
    const customerUserId = 'customer-123';
    const productId = 'product-456';
    const businessId = 'business-789';

    // Mock business fetch error
    vi.mocked(supabase.from).mockReturnValueOnce({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'Business not found' }
          })
        })
      })
    } as any);

    const result = await createUserConnectionsForSubscription(
      customerUserId,
      productId,
      businessId
    );

    expect(result).toBe(false);
    expect(vi.mocked(supabase.from)).toHaveBeenCalledTimes(1);
  });
});
