import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

export async function getServerAuth() {
  const cookieStore = await cookies()
  const headersList = await headers()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  try {
    // Get the current user (recommended over getSession)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        user: null,
        business: null,
        subscriptions: [],
        isAdmin: false,
        unreadMessageCount: 0,
        hasBusiness: false,
        hasSubscriptions: false
      }
    }

    // Get business data
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Get subscriptions data
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('subscriptions')
      .select('id, product_id')
      .eq('user_id', user.id)

    // Check if user is admin
    const { data: adminCheck, error: adminError } = await supabase
      .from('businesses')
      .select('is_admin')
      .eq('user_id', user.id)
      .single()

    const isAdmin = adminCheck?.is_admin || false

    // Get unread message count
    const { count: unreadMessageCount, error: messageError } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', user.id)
      .eq('is_read', false)

    return {
      user: user,
      business: business || null,
      subscriptions: subscriptions || [],
      isAdmin,
      unreadMessageCount: unreadMessageCount || 0,
      hasBusiness: !!business,
      hasSubscriptions: (subscriptions?.length || 0) > 0
    }
  } catch (error) {
    console.error('Server auth error:', error)
    return {
      user: null,
      business: null,
      subscriptions: [],
      isAdmin: false,
      unreadMessageCount: 0,
      hasBusiness: false,
      hasSubscriptions: false
    }
  }
}
