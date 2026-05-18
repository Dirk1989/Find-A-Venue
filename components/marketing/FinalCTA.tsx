'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-24 bg-forest text-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-fraunces text-4xl md:text-5xl font-bold mb-8"
        >
          Ready to find — or be found?
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-8"
        >
          <Link
            href="#enquiry"
            className="px-8 py-3 bg-gold hover:bg-opacity-90 text-charcoal font-inter font-semibold rounded transition-all"
          >
            Start an enquiry
          </Link>
          <a
            href="https://wa.me/27XXXXXXXXXX"
            className="px-8 py-3 bg-transparent border border-ivory hover:bg-ivory/10 text-ivory font-inter font-semibold rounded transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp us
          </a>
        </motion.div>

        {/* Email */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-ivory/60"
        >
          hello@findavenue.co.za
        </motion.p>
      </div>
    </section>
  )
}
