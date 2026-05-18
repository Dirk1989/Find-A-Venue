import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/admin/PostForm'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Edit Post</h1>
        <p className="mt-1 text-sm text-muted">Editing: {post.title}</p>
      </div>

      <div className="max-w-2xl">
        <PostForm initialData={post} />
      </div>
    </div>
  )
}