import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus } from 'lucide-react'
import { EnquiriesTable } from './EnquiriesTable'

export default async function AdminEnquiriesPage() {
  const supabase = await createClient()
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('id, full_name, email, event_type, event_date, guest_count, status, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Enquiries</h1>
          <p className="mt-1 text-sm text-muted">Manage client enquiries.</p>
        </div>
        <Link
          href="/admin/enquiries/new"
          className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90"
        >
          <Plus className="h-4 w-4" />
          New Enquiry
        </Link>
      </div>

      <EnquiriesTable enquiries={enquiries ?? []} />
    </div>
  )
}