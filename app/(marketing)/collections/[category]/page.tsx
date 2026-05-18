import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  const categoryTitles: Record<string, string> = {
    weddings: 'Wedding Venues',
    corporate: 'Corporate Event Spaces',
    'safari-lodges': 'Safari Lodges',
  }

  const title = categoryTitles[category] || 'Collection'

  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
            {title}
          </h1>
          <p className="text-muted font-inter text-lg max-w-2xl mx-auto">
            Discover curated {title.toLowerCase()} across South Africa.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 bg-sand rounded-lg flex items-center justify-center border border-charcoal/10"
              >
                <span className="text-muted/40 font-inter">Venue {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
