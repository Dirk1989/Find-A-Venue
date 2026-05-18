import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus } from 'lucide-react'
import { PostsTable } from './PostsTable'

export default async function AdminJournalPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, category, published_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Journal</h1>
          <p className="mt-1 text-sm text-muted">Manage journal posts.</p>
        </div>
        <Link
          href="/admin/journal/new"
          className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <PostsTable posts={posts ?? []} />
    </div>
  )
}