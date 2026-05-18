import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
              About Find A Venue
            </h1>
            <p className="text-muted font-inter text-lg">
              South Africa's premium, curated venue directory.
            </p>
          </div>

          <div className="prose prose-lg mx-auto">
            <p className="font-inter text-charcoal leading-relaxed mb-6">
              Find A Venue connects event organisers with South Africa's finest 
              wedding farms, corporate boardrooms, and safari lodges. We're 
              more than a directory — we're your personal concierge, handling every 
              enquiry so you can focus on what matters.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { title: 'Curated', text: 'Every venue is handpicked for quality and character.' },
                { title: 'Expert-led', text: "Our team knows SA's best spaces inside out." },
                { title: 'Concierge', text: 'One point of contact for every enquiry.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-sand rounded-lg">
                  <h3 className="font-fraunces text-2xl font-bold text-charcoal mb-2">{item.title}</h3>
                  <p className="font-inter text-muted text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}