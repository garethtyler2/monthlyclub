import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

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
      console.error('Auth error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log('Creating conversation for user:', user.id);
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { participant2_id } = body;
    
    if (!participant2_id) {
      console.error('Missing participant2_id in request');
      return NextResponse.json({ error: 'participant2_id is required' }, { status: 400 });
    }
    
    console.log('Creating conversation between:', user.id, 'and', participant2_id);
    
    // Use service role client to bypass RLS for conversation creation
    const serviceSupabase = createServiceRoleClient();
    
    // Check if both user profiles exist
    const { data: userProfile, error: userProfileError } = await serviceSupabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single();
    
    if (userProfileError || !userProfile) {
      console.error('Current user profile not found:', userProfileError);
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }
    
    const { data: participantProfile, error: participantProfileError } = await serviceSupabase
      .from('user_profiles')
      .select('id')
      .eq('id', participant2_id)
      .single();
    
    if (participantProfileError || !participantProfile) {
      console.error('Participant profile not found:', participantProfileError);
      return NextResponse.json({ error: 'Participant profile not found' }, { status: 404 });
    }
    
    console.log('Both user profiles found, proceeding with conversation creation...');
    
    // NOTE: We previously required an existing connection. Now we allow starting a conversation
    // by handle even without a pre-existing connection. If you want to enforce connections later,
    // add the check back here.
    
    // Check if conversation already exists
    const { data: existingConv, error: existingError } = await serviceSupabase
      .from('conversations')
      .select('*')
      .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${participant2_id}),and(participant1_id.eq.${participant2_id},participant2_id.eq.${user.id})`)
      .single();
    
    if (existingError) {
      if (existingError.code === 'PGRST116') {
        // No conversation found, which is what we want
        console.log('No existing conversation found, proceeding to create new one...');
      } else {
        console.error('Error checking existing conversation:', existingError);
        return NextResponse.json({ error: 'Failed to check existing conversation' }, { status: 500 });
      }
    } else if (existingConv) {
      console.log('Found existing conversation:', existingConv.id);
      return NextResponse.json({ conversation: existingConv });
    }
    
    console.log('No existing conversation found, creating new one...');
    
    // Create new conversation
    const conversationData = {
      participant1_id: user.id,
      participant2_id: participant2_id
    };
    
    console.log('Attempting to insert conversation with data:', conversationData);
    
    const { data: newConversation, error: createError } = await serviceSupabase
      .from('conversations')
      .insert(conversationData)
      .select()
      .single();
    
    if (createError) {
      console.error('Error creating conversation:', createError);
      console.error('Error details:', {
        code: createError.code,
        message: createError.message,
        details: createError.details,
        hint: createError.hint
      });
      return NextResponse.json({ error: 'Failed to create conversation', details: createError.message }, { status: 500 });
    }
    
    console.log('Successfully created conversation:', newConversation.id);
    
    // Fetch the full conversation with participant details
    const { data: fullConversation, error: fetchError } = await serviceSupabase
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
      .eq('id', newConversation.id)
      .single();
    
    if (fetchError) {
      console.error('Error fetching full conversation details:', fetchError);
      // Return the basic conversation if we can't get full details
      return NextResponse.json({ conversation: newConversation });
    }
    
    return NextResponse.json({ conversation: fullConversation });
    
  } catch (error) {
    console.error('Unexpected error in create conversation API:', error);
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
