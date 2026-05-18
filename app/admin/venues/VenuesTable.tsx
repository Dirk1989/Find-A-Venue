'use client'

import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/admin/DataTable'

interface Venue {
  id: string
  name: string
  slug: string
  category: string | null
  province: string | null
  status: string
  featured: boolean
  created_at: string
  owner_id: string | null
}

export function VenuesTable({ venues }: { venues: Venue[] }) {
  const router = useRouter()

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (item: Record<string, unknown>) => (
        <span className="font-medium text-charcoal">{item.name as string}</span>
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
      key: 'province',
      label: 'Province',
      render: (item: Record<string, unknown>) => (
        <span className="text-muted">{(item.province as string) ?? '—'}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Record<string, unknown>) => {
        const status = item.status as string
        const colors: Record<string, string> = {
          published: 'bg-green-100 text-green-700',
          draft: 'bg-gray-100 text-gray-600',
          pending: 'bg-yellow-100 text-yellow-700',
          archived: 'bg-red-100 text-red-600',
        }
        return (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
          </span>
        )
      },
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (item: Record<string, unknown>) => (
        <span className={item.featured ? 'text-gold' : 'text-muted/40'}>
          {item.featured ? '★' : '☆'}
        </span>
      ),
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
      data={venues as unknown as Record<string, unknown>[]}
      onRowClick={(item) => router.push(`/admin/venues/${item.id as string}`)}
      emptyMessage="No venues yet. Create your first venue."
    />
  )
}