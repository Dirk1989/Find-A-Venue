import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-24 px-4 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-charcoal mb-4">
              Contact Us
            </h1>
            <p className="text-muted font-inter text-lg">
              We are here to help you find the perfect venue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-sand rounded-lg">
              <h2 className="font-fraunces text-2xl font-bold text-charcoal mb-4">
                Get in Touch
              </h2>
              <p className="text-muted font-inter mb-6">
                Send us an enquiry and our concierge team will respond within 24 hours.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-ivory border border-charcoal/10 rounded"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-ivory border border-charcoal/10 rounded"
                />
                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 bg-ivory border border-charcoal/10 rounded"
                />
                <button className="w-full px-6 py-3 bg-forest text-ivory font-inter font-semibold rounded hover:bg-opacity-90 transition-colors">
                  Send Message
                </button>
              </div>
            </div>

            <div className="p-8 bg-sand rounded-lg">
              <h2 className="font-fraunces text-2xl font-bold text-charcoal mb-4">
                Contact Details
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="font-inter font-semibold text-charcoal">Email</p>
                  <p className="text-muted">hello@findavenue.co.za</p>
                </div>
                <div>
                  <p className="font-inter font-semibold text-charcoal">Phone</p>
                  <p className="text-muted">+27 (0) 87 XXX XXXX</p>
                </div>
                <div>
                  <p className="font-inter font-semibold text-charcoal">WhatsApp</p>
                  <p className="text-muted">Reach us directly on WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}