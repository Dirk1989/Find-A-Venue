import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default function JournalPage() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
            Journal
          </h1>
          <p className="text-muted font-inter text-lg max-w-2xl mx-auto">
            Expert insights and inspiration for your next event.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
              >
                <div className="h-64 bg-sand rounded-lg mb-4 flex items-center justify-center border border-charcoal/10">
                  <span className="text-muted/40 font-inter">Article {i} Image</span>
                </div>
                <h3 className="font-fraunces text-xl font-bold text-charcoal mb-2">
                  Article Title {i}
                </h3>
                <p className="text-muted font-inter text-sm">March 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
