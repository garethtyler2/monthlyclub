import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { conversationId } = params;
    
    if (!conversationId) {
      return NextResponse.json({ error: 'conversationId is required' }, { status: 400 });
    }
    
    // Get conversation with participant details
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select(`
        *,
        participant1:user_profiles!conversations_participant1_id_fkey (
          id, email, handle, display_name, avatar_url, created_at
        ),
        participant2:user_profiles!conversations_participant2_id_fkey (
          id, email, handle, display_name, avatar_url, created_at
        )
      `)
      .eq('id', conversationId)
      .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
      .single();
    
    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found or access denied' }, { status: 404 });
    }
    
    // Get last message and unread count
    const otherParticipantId = conversation.participant1_id === user.id 
      ? conversation.participant2_id 
      : conversation.participant1_id;
    
    // Get last message
    const { data: lastMessage } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    // Get unread count
    const { count: unreadCount } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('conversation_id', conversationId)
      .eq('sender_id', otherParticipantId)
      .is('read_at', null);
    
    const conversationWithDetails = {
      ...conversation,
      last_message: lastMessage || null,
      unread_count: unreadCount || 0
    };
    
    return NextResponse.json({ conversation: conversationWithDetails });
    
  } catch (error) {
    console.error('Error in conversation API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
