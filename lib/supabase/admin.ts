import { createClient } from '@supabase/supabase-js'

/**
 * Admin Supabase client with service role privileges.
 * Only use in Server Actions, Route Handlers, and Server Components
 * that are protected by admin auth checks.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

/**
 * Check if the current user has admin role.
 * Must be called from a server context.
 */
export async function isAdmin(userId: string) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  return data?.role === 'admin'
}