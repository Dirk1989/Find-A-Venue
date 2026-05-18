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
      render: (item: Record<string, unknown>) => (
        <span className="font-medium text-charcoal">{item.title as string}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Record<string, unknown>) => (
        <span className="capitalize text-muted">{(item.category as string) ?? '—'}</span>
      ),
    },
    {
      key: 'published_at',
      label: 'Status',
      render: (item: Record<string, unknown>) => {
        const published = item.published_at as string | null
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
      render: (item: Record<string, unknown>) => (
        <span className="text-xs text-muted">
          {new Date(item.created_at as string).toLocaleDateString()}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={posts as unknown as Record<string, unknown>[]}
      onRowClick={(item) => router.push(`/admin/journal/${item.id as string}`)}
      emptyMessage="No journal posts yet."
    />
  )
}