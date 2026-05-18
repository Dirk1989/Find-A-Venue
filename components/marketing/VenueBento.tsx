'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface VenueCard {
  id: string
  name: string
  location: string
  category: 'wedding' | 'corporate' | 'safari'
  image?: string
}

const venues: VenueCard[] = [
  {
    id: '1',
    name: 'Vineyard Estate',
    location: 'Franschhoek',
    category: 'wedding',
  },
  { id: '2', name: 'City Boardroom', location: 'Cape Town', category: 'corporate' },
  { id: '3', name: 'Safari Lodge', location: 'Kruger', category: 'safari' },
  { id: '4', name: 'Coastal Manor', location: 'Garden Route', category: 'wedding' },
  { id: '5', name: 'Tech Campus', location: 'Johannesburg', category: 'corporate' },
  { id: '6', name: 'Bushveld Retreat', location: 'Limpopo', category: 'safari' },
]

export function VenueBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  return (
    <section className="py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-gold text-xs uppercase tracking-[0.18em] font-inter font-semibold mb-4">
            The Collection
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-charcoal">
            Six places we'd send our closest friends.
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[350px]"
        >
          {/* Large card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 md:row-span-2 group relative overflow-hidden rounded-lg bg-muted/10 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-ivory">
              <h3 className="font-fraunces text-2xl font-semibold mb-1">
                {venues[0].name}
              </h3>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-inter">
                <MapPin className="w-3 h-3" />
                {venues[0].location}
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-ivory/15 backdrop-blur-sm px-3 py-1 rounded-full text-ivory text-xs font-inter z-20">
              Wedding
            </div>
          </motion.div>

          {/* Two stacked cards */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 group relative overflow-hidden rounded-lg bg-muted/10 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-ivory">
              <h3 className="font-fraunces text-lg font-semibold mb-1">
                {venues[1].name}
              </h3>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-inter">
                <MapPin className="w-3 h-3" />
                {venues[1].location}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-3 group relative overflow-hidden rounded-lg bg-muted/10 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-ivory">
              <h3 className="font-fraunces text-lg font-semibold mb-1">
                {venues[2].name}
              </h3>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-inter">
                <MapPin className="w-3 h-3" />
                {venues[2].location}
              </div>
            </div>
          </motion.div>

          {/* Wide card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 group relative overflow-hidden rounded-lg bg-muted/10 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-ivory">
              <h3 className="font-fraunces text-2xl font-semibold mb-1">
                {venues[3].name}
              </h3>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-inter">
                <MapPin className="w-3 h-3" />
                {venues[3].location}
              </div>
            </div>
          </motion.div>

          {/* Last two portrait cards */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 group relative overflow-hidden rounded-lg bg-muted/10 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-ivory">
              <h3 className="font-fraunces text-lg font-semibold mb-1">
                {venues[4].name}
              </h3>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-inter">
                <MapPin className="w-3 h-3" />
                {venues[4].location}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-3 group relative overflow-hidden rounded-lg bg-muted/10 hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-ivory">
              <h3 className="font-fraunces text-lg font-semibold mb-1">
                {venues[5].name}
              </h3>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-inter">
                <MapPin className="w-3 h-3" />
                {venues[5].location}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/venues"
            className="text-charcoal hover:text-gold transition-colors font-inter font-semibold flex items-center justify-center gap-2"
          >
            View all 120+ venues →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
