'use client'

import { motion } from 'framer-motion'

export function Testimonials() {
  return (
    <section className="py-24 bg-sand">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-xs uppercase tracking-[0.18em] font-inter font-semibold mb-4">
            Praise
          </span>
        </motion.div>

        {/* Main Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <blockquote className="font-fraunces text-4xl md:text-5xl italic text-charcoal leading-tight mb-8">
            "Find A Venue saved us 40 hours of admin and found us the farm of our dreams."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full" />
            <div className="text-left">
              <p className="font-inter font-semibold text-charcoal">
                Lerato & James
              </p>
              <p className="font-inter text-sm text-muted">
                Franschhoek, March 2026
              </p>
            </div>
          </div>
        </motion.div>

        {/* Logo Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border-t border-muted/20 pt-12"
        >
          <p className="text-center text-muted text-sm font-inter mb-8">
            Trusted by leading venues and event planners
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="px-4 py-2 text-muted/40 font-inter text-sm"
              >
                Logo {i}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
