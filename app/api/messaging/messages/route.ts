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
    const conversationId = searchParams.get('conversation_id');
    
    if (!conversationId) {
      return NextResponse.json({ error: 'conversation_id is required' }, { status: 400 });
    }
    
    // Verify user is part of this conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
      .single();
    
    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found or access denied' }, { status: 404 });
    }
    
    // Get messages with sender details
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select(`
        *,
        sender:user_profiles!messages_sender_id_fkey (
          id, email, handle, display_name, avatar_url, created_at
        )
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (msgError) {
      console.error('Error fetching messages:', msgError);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
    
    // Mark messages as read
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('sender_id', conversation.participant1_id === user.id ? conversation.participant2_id : conversation.participant1_id)
      .is('read_at', null);
    
    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);
    
    return NextResponse.json({ messages: messages || [] });
    
  } catch (error) {
    console.error('Error in messages API:', error);
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
    
    const { conversation_id, content, message_type, image_url } = await request.json();
    
    if (!conversation_id || !message_type) {
      return NextResponse.json({ error: 'conversation_id and message_type are required' }, { status: 400 });
    }
    
    if (message_type === 'text' && !content) {
      return NextResponse.json({ error: 'content is required for text messages' }, { status: 400 });
    }
    
    if (message_type === 'image' && !image_url) {
      return NextResponse.json({ error: 'image_url is required for image messages' }, { status: 400 });
    }
    
    // Verify user is part of this conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversation_id)
      .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
      .single();
    
    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found or access denied' }, { status: 404 });
    }
    
    // Create message
    const { data: newMessage, error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id,
        sender_id: user.id,
        content: message_type === 'text' ? content : null,
        message_type,
        image_url: message_type === 'image' ? image_url : null
      })
      .select()
      .single();
    
    if (msgError) {
      console.error('Error creating message:', msgError);
      return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
    }
    
    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ 
        last_message_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', conversation_id);
    
    return NextResponse.json({ message: newMessage });
    
  } catch (error) {
    console.error('Error in create message API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
