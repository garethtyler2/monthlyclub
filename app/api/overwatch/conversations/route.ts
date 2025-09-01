import { NextResponse } from 'next/server'
import { createClient, createServiceRoleClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check admin privileges
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const adminEmails = ['gareth@monthlyclubhq.com']
  const adminHandles = ['admin', 'gareth']
  const isAdmin = adminEmails.includes(user.email || '') || adminHandles.includes(profile?.handle || '')

  if (!isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const service = createServiceRoleClient()

  // Fetch conversations with participant details
  const { data: conversations, error } = await service
    .from('conversations')
    .select(`
      *,
      participant1:user_profiles!conversations_participant1_id_fkey(id, email, display_name, handle, avatar_url),
      participant2:user_profiles!conversations_participant2_id_fkey(id, email, display_name, handle, avatar_url)
    `)
    .order('last_message_at', { ascending: false })
    .limit(200)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Fetch last message for each conversation
  const withLastMessage = await Promise.all(
    (conversations || []).map(async (conv) => {
      const { data: lastMessage } = await service
        .from('messages')
        .select('*')
        .eq('conversation_id', conv.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      return { ...conv, last_message: lastMessage || null }
    })
  )

  return NextResponse.json({ conversations: withLastMessage })
}


