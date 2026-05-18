import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { STORAGE_BUCKETS } from '@/lib/supabase/storage'

export default async function AdminMediaPage() {
  const supabase = await createClient()
  const { data: venueImages } = await supabase.storage
    .from(STORAGE_BUCKETS.VENUE_IMAGES)
    .list('venues/')

  const { data: postCovers } = await supabase.storage
    .from(STORAGE_BUCKETS.JOURNAL_COVERS)
    .list('posts/')

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-charcoal">Media Library</h1>
        <p className="mt-1 text-sm text-muted">Manage all uploaded images.</p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border border-forest/10 bg-ivory p-6">
          <h2 className="font-fraunces text-lg font-semibold text-charcoal">Venue Images</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {venueImages?.data.map((file) => (
              <div key={file.name} className="aspect-square rounded-lg overflow-hidden bg-sand">
                <img
                  src={`data:image/jpeg;base64,${file.data}`}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-forest/10 bg-ivory p-6">
          <h2 className="font-fraunces text-lg font-semibold text-charcoal">Journal Covers</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {postCovers?.data.map((file) => (
              <div key={file.name} className="aspect-square rounded-lg overflow-hidden bg-sand">
                <img
                  src={`data:image/jpeg;base64,${file.data}`}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-forest/10 bg-ivory p-6">
        <h2 className="font-fraunces text-lg font-semibold text-charcoal">Upload New Images</h2>
        <div className="mt-4">
          <ImageUpload
            onUpload={(urls) => console.log('Uploaded:', urls)}
            bucket={STORAGE_BUCKETS.VENUE_IMAGES}
            folder="venues"
          />
        </div>
      </div>
    </div>
  )
}