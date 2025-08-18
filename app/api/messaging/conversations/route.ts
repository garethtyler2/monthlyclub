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
    
    // Get user's conversations with participant details
    const { data: conversations, error: convError } = await supabase
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
      .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false });
    
    if (convError) {
      console.error('Error fetching conversations:', convError);
      return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
    }
    
    // Get last message and unread count for each conversation
    const conversationsWithDetails = await Promise.all(
      (conversations || []).map(async (conv) => {
        const otherParticipantId = conv.participant1_id === user.id 
          ? conv.participant2_id 
          : conv.participant1_id;
        
        const otherParticipant = conv.participant1_id === user.id 
          ? conv.participant2 
          : conv.participant1;
        
        // Get last message
        const { data: lastMessage } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        // Get unread count
        const { count: unreadCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact' })
          .eq('conversation_id', conv.id)
          .eq('sender_id', otherParticipantId)
          .is('read_at', null);
        
        console.log('Unread count calculation:', {
          conversationId: conv.id,
          currentUserId: user.id,
          otherParticipantId,
          unreadCount,
          participant1: conv.participant1_id,
          participant2: conv.participant2_id
        });
        
        // Also log the actual messages to see their read_at status
        const { data: messageDetails } = await supabase
          .from('messages')
          .select('id, sender_id, read_at, content')
          .eq('conversation_id', conv.id);
        
        console.log('Message details for conversation:', conv.id, messageDetails);
        
        return {
          ...conv,
          other_participant: otherParticipant,
          last_message: lastMessage || null,
          unread_count: unreadCount || 0
        };
      })
    );
    
    return NextResponse.json({ conversations: conversationsWithDetails });
    
  } catch (error) {
    console.error('Error in conversations API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { participant2_id } = await request.json();
    
    if (!participant2_id) {
      return NextResponse.json({ error: 'participant2_id is required' }, { status: 400 });
    }
    
    // Check if users have a connection
    const { data: connection, error: connError } = await supabase
      .from('user_connections')
      .select('*')
      .or(`and(user_id.eq.${user.id},connected_user_id.eq.${participant2_id}),and(user_id.eq.${participant2_id},connected_user_id.eq.${user.id})`)
      .limit(1)
      .single();
    
    if (connError || !connection) {
      return NextResponse.json({ error: 'Users are not connected' }, { status: 403 });
    }
    
    // Check if conversation already exists
    const { data: existingConv, error: existingError } = await supabase
      .from('conversations')
      .select('*')
      .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${participant2_id}),and(participant1_id.eq.${participant2_id},participant2_id.eq.${user.id})`)
      .single();
    
    if (existingConv) {
      return NextResponse.json({ conversation: existingConv });
    }
    
    // Create new conversation
    const { data: newConversation, error: createError } = await supabase
      .from('conversations')
      .insert({
        participant1_id: user.id,
        participant2_id: participant2_id
      })
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating conversation:', createError);
      return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
    }
    
    return NextResponse.json({ conversation: newConversation });
    
  } catch (error) {
    console.error('Error in create conversation API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
