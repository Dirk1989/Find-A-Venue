import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { VenueForm } from '@/components/admin/VenueForm'

export default async function EditVenuePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: venue } = await supabase
    .from('venues')
    .select('*')
    .eq('id', id)
    .single()

  if (!venue) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Edit Venue</h1>
        <p className="mt-1 text-sm text-muted">Editing: {venue.name}</p>
      </div>

      <div className="max-w-2xl">
        <VenueForm initialData={venue} />
      </div>
    </div>
  )
}