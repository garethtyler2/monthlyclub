import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get('handle');
    
    if (!handle) {
      return NextResponse.json({ error: 'handle parameter is required' }, { status: 400 });
    }
    
    // Search for users by handle (exact match first, then partial matches)
    const { data: users, error: searchError } = await supabase
      .from('user_profiles')
      .select('id, email, handle, display_name, avatar_url, created_at')
      .or(`handle.eq.${handle},handle.ilike.%${handle}%`)
      .neq('id', user.id) // Don't show the current user
      .order('handle') // Sort by handle
      .limit(10); // Limit results
    
    if (searchError) {
      console.error('Error searching users:', searchError);
      return NextResponse.json({ error: 'Failed to search users' }, { status: 500 });
    }
    
    // Prioritize exact matches
    const exactMatches = users?.filter(u => u.handle === handle) || [];
    const partialMatches = users?.filter(u => u.handle !== handle) || [];
    
    // Combine results with exact matches first
    const sortedUsers = [...exactMatches, ...partialMatches];
    
    return NextResponse.json({ 
      users: sortedUsers,
      exactMatch: exactMatches.length > 0
    });
    
  } catch (error) {
    console.error('Error in search users API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
