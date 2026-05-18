import { PostForm } from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">New Journal Post</h1>
        <p className="mt-1 text-sm text-muted">Write a new journal article.</p>
      </div>

      <div className="max-w-2xl">
        <PostForm />
      </div>
    </div>
  )
}