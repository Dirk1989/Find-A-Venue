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
      render: (item: Enquiry) => (
        <span className="font-medium text-charcoal">{item.full_name}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (item: Enquiry) => (
        <span className="text-muted">{item.email}</span>
      ),
    },
    {
      key: 'event_type',
      label: 'Event Type',
      render: (item: Enquiry) => (
        <span className="capitalize text-muted">{item.event_type}</span>
      ),
    },
    {
      key: 'event_date',
      label: 'Event Date',
      render: (item: Enquiry) => (
        <span className="text-xs text-muted">
          {new Date(item.event_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'guest_count',
      label: 'Guests',
      render: (item: Enquiry) => (
        <span className="text-muted">{item.guest_count}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Enquiry) => {
        const status = item.status
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
      render: (item: Enquiry) => (
        <span className="text-xs text-muted">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ]

  return (
    <DataTable<Enquiry>
      columns={columns}
      data={enquiries}
      onRowClick={(item) => router.push(`/admin/enquiries/${item.id}`)}
      emptyMessage="No enquiries yet."
    />
  )
}