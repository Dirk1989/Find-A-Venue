'use client'

import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/admin/DataTable'

interface Enquiry {
  id: string
  full_name: string
  email: string
  event_type: string
  event_date: string
  guest_count: number
  status: string
  created_at: string
}

export function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const router = useRouter()

  const columns = [
    {
      key: 'full_name',
      label: 'Name',
      render: (item: Record<string, unknown>) => (
        <span className="font-medium text-charcoal">{item.full_name as string}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (item: Record<string, unknown>) => (
        <span className="text-muted">{item.email as string}</span>
      ),
    },
    {
      key: 'event_type',
      label: 'Event Type',
      render: (item: Record<string, unknown>) => (
        <span className="capitalize text-muted">{item.event_type as string}</span>
      ),
    },
    {
      key: 'event_date',
      label: 'Event Date',
      render: (item: Record<string, unknown>) => (
        <span className="text-xs text-muted">
          {new Date(item.event_date as string).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'guest_count',
      label: 'Guests',
      render: (item: Record<string, unknown>) => (
        <span className="text-muted">{item.guest_count as number}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Record<string, unknown>) => {
        const status = item.status as string
        const colors: Record<string, string> = {
          new: 'bg-blue-100 text-blue-700',
          contacted_venue: 'bg-purple-100 text-purple-700',
          quote_sent: 'bg-yellow-100 text-yellow-700',
          confirmed: 'bg-green-100 text-green-700',
          lost: 'bg-red-100 text-red-600',
        }
        return (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
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
      data={enquiries as unknown as Record<string, unknown>[]}
      onRowClick={(item) => router.push(`/admin/enquiries/${item.id as string}`)}
      emptyMessage="No enquiries yet."
    />
  )
}