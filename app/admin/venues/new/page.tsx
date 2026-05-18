import { VenueForm } from '@/components/admin/VenueForm'

export default function NewVenuePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">New Venue</h1>
        <p className="mt-1 text-sm text-muted">Add a new venue to the directory.</p>
      </div>

      <div className="max-w-2xl">
        <VenueForm />
      </div>
    </div>
  )
}