import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversation_id');
    
    if (!conversationId) {
      return NextResponse.json({ error: 'conversation_id is required' }, { status: 400 });
    }
    
    // Get conversation details
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
      .single();
    
    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found or access denied' }, { status: 404 });
    }
    
    // Get all messages in the conversation
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (msgError) {
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
    
    // Calculate other participant ID
    const otherParticipantId = conversation.participant1_id === user.id 
      ? conversation.participant2_id 
      : conversation.participant1_id;
    
    // Get unread count before update
    const { count: unreadBefore } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('conversation_id', conversationId)
      .eq('sender_id', otherParticipantId)
      .is('read_at', null);
    
    // Try to mark messages as read using service role client
    const serviceClient = createServiceRoleClient();
    const { data: updateResult, error: updateError } = await serviceClient
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('sender_id', otherParticipantId)
      .is('read_at', null);
    
    // Get unread count after update
    const { count: unreadAfter } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('conversation_id', conversationId)
      .eq('sender_id', otherParticipantId)
      .is('read_at', null);
    
    return NextResponse.json({
      conversation,
      messages,
      currentUser: user.id,
      otherParticipantId,
      unreadBefore,
      unreadAfter,
      updateResult,
      updateError: updateError?.message || null
    });
    
  } catch (error) {
    console.error('Error in test read API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
