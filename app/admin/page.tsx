import { createClient } from '@/lib/supabase/server'
import { StatsCard } from '@/components/admin/StatsCard'
import { Building2, FileText, MessageSquare, Eye } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { count: venueCount } = await supabase
    .from('venues')
    .select('*', { count: 'exact', head: true })

  const { count: publishedCount } = await supabase
    .from('venues')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: postCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: enquiryCount } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })

  const { count: newEnquiryCount } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of Find A Venue.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Venues"
          value={venueCount ?? 0}
          icon={Building2}
          description={`${publishedCount ?? 0} published`}
        />
        <StatsCard
          title="Journal Posts"
          value={postCount ?? 0}
          icon={FileText}
        />
        <StatsCard
          title="Enquiries"
          value={enquiryCount ?? 0}
          icon={MessageSquare}
          description={`${newEnquiryCount ?? 0} new`}
        />
        <StatsCard
          title="Published Venues"
          value={publishedCount ?? 0}
          icon={Eye}
        />
      </div>

      <div className="mt-8 rounded-lg border border-forest/10 bg-ivory p-6">
        <h2 className="font-fraunces text-xl font-semibold text-charcoal">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/venues/new"
            className="rounded-lg border border-forest/10 bg-sand/50 p-4 text-sm font-medium text-charcoal transition-colors hover:bg-sand"
          >
            Add New Venue →
          </a>
          <a
            href="/admin/journal/new"
            className="rounded-lg border border-forest/10 bg-sand/50 p-4 text-sm font-medium text-charcoal transition-colors hover:bg-sand"
          >
            Write Journal Post →
          </a>
          <a
            href="/admin/enquiries"
            className="rounded-lg border border-forest/10 bg-sand/50 p-4 text-sm font-medium text-charcoal transition-colors hover:bg-sand"
          >
            View Enquiries →
          </a>
        </div>
      </div>
    </div>
  )
}