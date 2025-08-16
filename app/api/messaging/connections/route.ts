import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user's connections with details
    const { data: connections, error: connError } = await supabase
      .from('user_connections')
      .select(`
        *,
        connected_user:user_profiles!user_connections_connected_user_id_fkey (
          id, email, handle, display_name, avatar_url, created_at
        ),
        business:businesses (
          id, name, slug
        ),
        product:products (
          id, name
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (connError) {
      console.error('Error fetching connections:', connError);
      return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
    }
    
    return NextResponse.json({ connections: connections || [] });
    
  } catch (error) {
    console.error('Error in connections API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
