import { NextResponse } from 'next/server'
import { createClient, createServiceRoleClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversation_id')

  if (!conversationId) {
    return NextResponse.json({ error: 'conversation_id is required' }, { status: 400 })
  }

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

  const { data: messages, error } = await service
    .from('messages')
    .select(`
      *,
      sender:user_profiles!messages_sender_id_fkey(id, email, display_name, handle, avatar_url)
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ messages: messages || [] })
}


