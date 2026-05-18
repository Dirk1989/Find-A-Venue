import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
              How It Works
            </h1>
            <p className="text-muted font-inter text-lg">
              Five steps. Zero admin on your side.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { step: '01', title: 'Client browses & enquires', desc: 'Browse our curated directory of South Africa\'s finest venues and submit your enquiry.' },
              { step: '02', title: 'We contact the venue', desc: 'Our concierge team reaches out to the venue on your behalf to check availability.' },
              { step: '03', title: 'We send the formal quote', desc: 'You receive a detailed quote with pricing, availability, and any special terms.' },
              { step: '04', title: 'Client confirms', desc: 'Approve the quote to lock in your booking with the venue.' },
              { step: '05', title: 'Fulfilment fee applies', desc: 'We only earn when you do — a 5–10% fee on confirmed bookings, never before.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-sand rounded-lg">
                <span className="font-fraunces text-4xl text-gold font-bold">{item.step}</span>
                <div>
                  <h3 className="font-inter font-semibold text-lg text-charcoal mb-1">{item.title}</h3>
                  <p className="text-muted font-inter text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}