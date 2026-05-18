'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { venueSchema, type VenueFormData } from '@/lib/validators/venue'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { STORAGE_BUCKETS } from '@/lib/supabase/storage'
import { Loader2 } from 'lucide-react'

const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
]

const CATEGORIES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'safari', label: 'Safari' },
  { value: 'private', label: 'Private' },
]

const PRICE_BANDS = [
  { value: 'R', label: 'R (Affordable)' },
  { value: 'RR', label: 'RR (Mid-range)' },
  { value: 'RRR', label: 'RRR (Premium)' },
  { value: 'RRRR', label: 'RRRR (Luxury)' },
]

const AMENITY_OPTIONS = [
  'WiFi', 'Parking', 'Catering', 'Bar', 'Pool', 'Garden',
  'Dance Floor', 'Stage', 'Bridal Suite', 'Air Conditioning',
  'Wheelchair Access', 'Accommodation',
]

export function VenueForm({ initialData }: { initialData?: VenueFormData & { id?: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [formData, setFormData] = useState<VenueFormData>({
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    tagline: initialData?.tagline ?? '',
    description: initialData?.description ?? '',
    category: initialData?.category ?? 'wedding',
    province: initialData?.province ?? '',
    town: initialData?.town ?? '',
    address: initialData?.address ?? '',
    lat: initialData?.lat ?? null,
    lng: initialData?.lng ?? null,
    capacity_min: initialData?.capacity_min ?? null,
    capacity_max: initialData?.capacity_max ?? null,
    price_band: initialData?.price_band ?? null,
    amenities: initialData?.amenities ?? [],
    status: initialData?.status ?? 'draft',
    featured: initialData?.featured ?? false,
    owner_id: initialData?.owner_id ?? null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const parsed = venueSchema.parse(formData)
      const supabase = (await import('@/lib/supabase/client')).createClient()

      const data = {
        ...parsed,
        tagline: parsed.tagline || null,
        town: parsed.town || null,
        address: parsed.address || null,
      }

      let result
      if (initialData?.id) {
        result = await supabase.from('venues').update(data).eq('id', initialData.id).select().single()
      } else {
        result = await supabase.from('venues').insert(data).select().single()
      }

      if (result.error) throw result.error

      // Upload images if any
      if (imageUrls.length > 0 && result.data) {
        const mediaInserts = imageUrls.map((url, i) => ({
          venue_id: result.data.id,
          url,
          position: i,
          is_cover: i === 0,
        }))
        await supabase.from('venue_media').insert(mediaInserts)
      }

      router.push('/admin/venues')
      router.refresh()
    } catch (err) {
      console.error('Venue save error:', err)
      setError(err instanceof Error ? err.message : 'Failed to save venue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (key: keyof VenueFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    const current = formData.amenities as string[]
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity]
    updateField('amenities', updated)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Basic Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Venue Name *</label>
            <input
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Slug *</label>
            <input
              value={formData.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="venue-name-slug"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Tagline</label>
          <input
            value={formData.tagline as string}
            onChange={(e) => updateField('tagline', e.target.value)}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder="A short, compelling tagline"
            maxLength={120}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            required
          />
        </div>
      </section>

      {/* Category & Location */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Category & Location</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Province *</label>
            <select
              value={formData.province}
              onChange={(e) => updateField('province', e.target.value)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              required
            >
              <option value="">Select province</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Town</label>
            <input
              value={formData.town as string}
              onChange={(e) => updateField('town', e.target.value)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Price Band</label>
            <select
              value={formData.price_band ?? ''}
              onChange={(e) => updateField('price_band', e.target.value || null)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="">Select price band</option>
              {PRICE_BANDS.map((pb) => (
                <option key={pb.value} value={pb.value}>{pb.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Capacity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Min Guests</label>
            <input
              type="number"
              value={formData.capacity_min ?? ''}
              onChange={(e) => updateField('capacity_min', e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">Max Guests</label>
            <input
              type="number"
              value={formData.capacity_max ?? ''}
              onChange={(e) => updateField('capacity_max', e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((amenity) => {
            const selected = (formData.amenities as string[]).includes(amenity)
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selected
                    ? 'bg-forest text-ivory'
                    : 'bg-sand text-muted hover:bg-forest/10'
                }`}
              >
                {amenity}
              </button>
            )
          })}
        </div>
      </section>

      {/* Images */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Venue Images</h2>
        <p className="text-sm text-muted">Upload venue photos. The first image will be the cover.</p>
        <ImageUpload
          onUpload={(urls) => setImageUrls((prev) => [...prev, ...urls])}
          bucket={STORAGE_BUCKETS.VENUE_IMAGES}
          folder="venues"
        />
      </section>

      {/* Status */}
      <section className="space-y-4">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Status</h2>
        <div className="flex items-center gap-4">
          <select
            value={formData.status}
            onChange={(e) => updateField('status', e.target.value)}
            className="rounded-lg border border-forest/10 bg-ivory px-3 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="rounded border-forest/10 text-forest focus:ring-gold"
            />
            Featured venue
          </label>
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3 border-t border-forest/10 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-forest px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : initialData?.id ? (
            'Update Venue'
          ) : (
            'Create Venue'
          )}
        </button>
        <a
          href="/admin/venues"
          className="rounded-lg border border-forest/10 px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-sand"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}