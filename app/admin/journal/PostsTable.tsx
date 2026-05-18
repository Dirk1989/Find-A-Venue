'use client'

import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/admin/DataTable'

interface Post {
  id: string
  title: string
  slug: string
  category: string | null
  published_at: string | null
  created_at: string
}

export function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter()

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (item: Post) => (
        <span className="font-medium text-charcoal">{item.title}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Post) => (
        <span className="capitalize text-muted">{item.category ?? '—'}</span>
      ),
    },
    {
      key: 'published_at',
      label: 'Status',
      render: (item: Post) => {
        const published = item.published_at
        return published ? (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            Draft
          </span>
        )
      },
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (item: Post) => (
        <span className="text-xs text-muted">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ]

  return (
    <DataTable<Post>
      columns={columns}
      data={posts}
      onRowClick={(item) => router.push(`/admin/journal/${item.id}`)}
      emptyMessage="No journal posts yet."
    />
  )
}