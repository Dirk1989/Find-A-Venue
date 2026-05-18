import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default function ListYourVenuePage() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
              List Your Venue
            </h1>
            <p className="text-muted font-inter text-lg max-w-2xl mx-auto">
              Join South Africa's premium venue directory and bring bookings to your space.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {['Free to list', 'Pre-qualified leads', 'We handle enquiries'].map((benefit, i) => (
              <div
                key={i}
                className="p-8 bg-sand rounded-lg border border-charcoal/10"
              >
                <h3 className="font-inter font-semibold text-charcoal mb-2">
                  {benefit}
                </h3>
                <p className="text-muted text-sm">Learn more about our benefits</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-3 bg-gold hover:bg-opacity-90 text-charcoal font-inter font-semibold rounded transition-all">
              Apply to List →
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
