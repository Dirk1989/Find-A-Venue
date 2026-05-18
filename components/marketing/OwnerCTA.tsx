'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

export function OwnerCTA() {
  const benefits = [
    'Free to list',
    'Pre-qualified leads',
    'Performance-based 5–10% fee',
    'We handle every enquiry',
  ]

  return (
    <section className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-96 bg-muted/20 rounded-lg overflow-hidden"
          >
            <div className="w-full h-full bg-forest/10 flex items-center justify-center text-muted/40">
              Venue Host Image
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-charcoal mb-6">
              List your venue. We'll bring the bookings.
            </h2>

            {/* Benefits */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-charcoal font-inter"
                >
                  <Check className="w-5 h-5 text-gold flex-shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/list-your-venue"
              className="inline-block px-6 py-3 bg-gold hover:bg-opacity-90 text-charcoal font-inter font-semibold rounded transition-all"
            >
              Apply to list →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
