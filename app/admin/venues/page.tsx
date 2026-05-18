import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { VenuesTable } from './VenuesTable'

export default async function AdminVenuesPage() {
  const supabase = await createClient()
  const { data: venues } = await supabase
    .from('venues')
    .select('id, name, slug, category, province, status, featured, created_at, owner_id')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Venues</h1>
          <p className="mt-1 text-sm text-muted">Manage venue listings.</p>
        </div>
        <Link
          href="/admin/venues/new"
          className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90"
        >
          <Plus className="h-4 w-4" />
          Add Venue
        </Link>
      </div>

      <VenuesTable venues={venues ?? []} />
    </div>
  )
}