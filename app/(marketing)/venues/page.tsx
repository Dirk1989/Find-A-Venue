import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { motion } from 'framer-motion'

export default function VenuesPage() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
            All Venues
          </h1>
          <p className="text-muted font-inter text-lg max-w-2xl mx-auto">
            Coming soon: Browse and filter South Africa's finest venues.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 bg-sand rounded-lg flex items-center justify-center border border-charcoal/10"
              >
                <span className="text-muted/40 font-inter">Venue Placeholder {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
