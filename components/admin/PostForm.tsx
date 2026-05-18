'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { postSchema, type PostFormData } from '@/lib/validators/venue'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { STORAGE_BUCKETS } from '@/lib/supabase/storage'
import { Loader2 } from 'lucide-react'

export function PostForm({ initialData }: { initialData?: PostFormData & { id?: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [coverUrl, setCoverUrl] = useState<string[]>([])

  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    excerpt: initialData?.excerpt ?? '',
    body_mdx: initialData?.body_mdx ?? '',
    cover_url: initialData?.cover_url ?? '',
    category: initialData?.category ?? '',
    published_at: initialData?.published_at ?? null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const parsed = postSchema.parse(formData)
      const supabase = (await import('@/lib/supabase/client')).createClient()

      const data = {
        ...parsed,
        excerpt: parsed.excerpt || null,
        category: parsed.category || null,
        published_at: parsed.published_at || null,
      }

      let result
      if (initialData?.id) {
        result = await supabase.from('posts').update(data).eq('id', initialData.id).select().single()
      } else {
        result = await supabase.from('posts').insert(data).select().single()
      }

      if (result.error) throw result.error

      // Upload cover image if any
      if (coverUrl.length > 0 && result.data) {
        await supabase.storage
          .from(STORAGE_BUCKETS.JOURNAL_COVERS)
          .upload(`posts/${result.data.id}/cover-${Date.now()}.jpg`, coverUrl[0])
      }

      router.push('/admin/journal')
      router.refresh()
    } catch (err) {
      console.error('Post save error:', err)
      setError(err instanceof Error ? err.message : 'Failed to save post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (key: keyof PostFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Basic Information</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Title *</label>
          <input
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Slug *</label>
          <input
            value={formData.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder="post-slug"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder="Brief summary of the post"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Body (MDX)</label>
          <textarea
            value={formData.body_mdx}
            onChange={(e) => updateField('body_mdx', e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder="Write your post content in MDX format"
            required
          />
        </div>
      </section>

      {/* Category & Cover */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Category & Cover</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Category</label>
          <input
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder="e.g., Weddings, Corporate, Safari"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Cover Image</label>
          <ImageUpload
            onUpload={(urls) => setCoverUrl(urls)}
            bucket={STORAGE_BUCKETS.JOURNAL_COVERS}
            folder="posts"
          />
        </div>
      </section>

      {/* Status */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Status</h2>
        <div className="flex items-center gap-4">
          <select
            value={formData.published_at ? 'published' : 'draft'}
            onChange={(e) => {
              if (e.target.value === 'published') {
                updateField('published_at', new Date().toISOString())
              } else {
                updateField('published_at', null)
              }
            }}
            className="rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3 border-t border-forest/10 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-forest px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : initialData?.id ? (
            'Update Post'
          ) : (
            'Create Post'
          )}
        </button>
        <a
          href="/admin/journal"
          className="rounded-lg border border-forest/10 px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-sand"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}