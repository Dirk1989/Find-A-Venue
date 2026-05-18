import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: enquiry } = await supabase
    .from('enquiries')
    .select('*')
    .eq('id', id)
    .single()

  if (!enquiry) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Enquiry #{id}</h1>
        <p className="mt-1 text-sm text-muted">View and manage enquiry details.</p>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="rounded-lg border border-forest/10 bg-ivory p-6">
              <h3 className="font-fraunces text-lg font-semibold text-charcoal">Client Information</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-sm text-muted">Full Name</dt>
                  <dd className="font-medium text-charcoal">{enquiry.full_name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd className="font-medium text-charcoal">{enquiry.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd className="font-medium text-charcoal">{enquiry.phone || '—'}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-forest/10 bg-ivory p-6">
              <h3 className="font-fraunces text-lg font-semibold text-charcoal">Event Details</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-sm text-muted">Event Type</dt>
                  <dd className="font-medium text-charcoal">{enquiry.event_type}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Event Date</dt>
                  <dd className="font-medium text-charcoal">
                    {new Date(enquiry.event_date).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Guest Count</dt>
                  <dd className="font-medium text-charcoal">{enquiry.guest_count}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Message</dt>
                  <dd className="font-medium text-charcoal">{enquiry.message}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-forest/10 bg-ivory p-6">
              <h3 className="font-fraunces text-lg font-semibold text-charcoal">Status</h3>
              <div className="mt-4">
                <select
                  value={enquiry.status}
                  className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value="new">New</option>
                  <option value="contacted_venue">Contacted Venue</option>
                  <option value="quote_sent">Quote Sent</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-forest/10 bg-ivory p-6">
              <h3 className="font-fraunces text-lg font-semibold text-charcoal">Financials</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-sm text-muted">Fulfilment Fee %</dt>
                  <dd className="font-medium text-charcoal">{enquiry.fulfillment_fee_pct}%</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Booking Value</dt>
                  <dd className="font-medium text-charcoal">R {enquiry.booking_value}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-forest px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90">
            Update Status
          </button>
        </div>
      </div>
    </div>
  )
}