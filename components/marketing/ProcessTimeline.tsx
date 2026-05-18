'use client'

import { motion } from 'framer-motion'

export function ProcessTimeline() {
  const steps = [
    { number: '01', title: 'Client browses & enquires', description: 'Browse our curated directory and submit your enquiry.' },
    { number: '02', title: 'We contact the venue', description: 'Our concierge reaches out to secure your date.' },
    { number: '03', title: 'We send the formal quote', description: 'Detailed pricing and availability directly to you.' },
    { number: '04', title: 'Client confirms', description: 'Approve the quote and lock in your booking.' },
    { number: '05', title: 'Fulfilment fee applies', description: 'We only earn when you do — 5–10% on confirmed bookings.' },
  ]

  return (
    <section className="py-24 bg-forest text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-gold text-xs uppercase tracking-[0.18em] font-inter font-semibold mb-4">
            The Process
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold">
            Five steps. Zero admin on your side.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-12 left-0 right-0 h-1 bg-gold origin-left"
            />

            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-gold rounded-full"
                  />

                  {/* Content */}
                  <div className="pt-20 text-center">
                    <h3 className="font-fraunces text-6xl font-bold text-gold mb-2">
                      {step.number}
                    </h3>
                    <h4 className="text-ivory font-inter font-semibold text-lg mb-2">
                      {step.title}
                    </h4>
                    <p className="text-ivory/70 font-inter text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center font-inter font-bold text-forest text-xs">
                    {idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-1 h-12 bg-gold/30 mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-ivory font-inter font-semibold mb-1">
                    {step.title}
                  </h4>
                  <p className="text-ivory/70 font-inter text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
