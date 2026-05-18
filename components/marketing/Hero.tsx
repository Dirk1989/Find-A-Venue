'use client'

import { motion } from 'framer-motion'
import { Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40">
        <div
          className="absolute inset-0 bg-forest/80"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15, 61, 46, 0.7), rgba(0, 0, 0, 0.4))',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Eyebrow */}
          <div className="mb-6 inline-block">
            <span className="text-gold text-xs uppercase tracking-[0.18em] font-inter font-semibold">
              South Africa · Curated since 2024
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-fraunces text-5xl md:text-7xl lg:text-8xl font-bold text-ivory mb-6 leading-tight">
            Find the venue your event{' '}
            <span className="italic text-gold">deserves</span>.
          </h1>

          {/* Subheading */}
          <p className="font-inter text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            A handpicked directory of South Africa's finest wedding farms,
            boardrooms, and safari lodges — with one expert concierge handling
            every enquiry.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mb-12 max-w-3xl mx-auto"
          >
            <div className="bg-ivory/15 backdrop-blur-xl border border-ivory/30 rounded-full p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Event Type"
                  className="flex-1 bg-transparent text-ivory placeholder:text-ivory/50 px-4 py-3 focus:outline-none font-inter text-sm"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Province"
                  className="w-32 bg-transparent text-ivory placeholder:text-ivory/50 px-4 py-3 focus:outline-none font-inter text-sm"
                />
                <input
                  type="number"
                  placeholder="Guests"
                  className="w-24 bg-transparent text-ivory placeholder:text-ivory/50 px-4 py-3 focus:outline-none font-inter text-sm"
                />
                <input
                  type="date"
                  className="w-36 bg-transparent text-ivory placeholder:text-ivory/50 px-4 py-3 focus:outline-none font-inter text-sm"
                />
              </div>
              <button className="bg-gold hover:bg-opacity-90 text-charcoal px-6 py-3 rounded-full flex items-center gap-2 font-inter font-semibold text-sm transition-all whitespace-nowrap">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="text-ivory/60 text-sm font-inter mb-6"
          >
            <p className="mb-4">Trusted by couples & brands across South Africa</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-ivory/20 rounded-lg flex items-center justify-center text-ivory/40 text-xs"
                >
                  Logo {i}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronRight className="w-6 h-6 text-gold/50 rotate-90" />
      </motion.div>
    </section>
  )
}
