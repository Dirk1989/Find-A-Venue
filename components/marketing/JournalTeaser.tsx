'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  category: string
  date: string
  image?: string
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Top 10 Cape Winelands Wedding Venues',
    category: 'Weddings',
    date: 'March 2026',
  },
  {
    id: '2',
    title: 'Planning a Corporate Retreat in South Africa',
    category: 'Corporate',
    date: 'March 2026',
  },
  {
    id: '3',
    title: 'Luxury Safari Lodges for Milestone Events',
    category: 'Safari',
    date: 'February 2026',
  },
]

export function JournalTeaser() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-charcoal">
            From the Journal
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              className="group overflow-hidden rounded-lg"
            >
              {/* Image */}
              <div className="h-64 bg-muted/20 rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full flex items-center justify-center text-muted/40 font-inter text-sm">
                  Article Image
                </div>
              </div>

              {/* Content */}
              <div>
                <p className="text-gold text-xs uppercase tracking-[0.18em] font-inter font-semibold mb-2">
                  {article.category}
                </p>
                <h3 className="font-fraunces text-xl font-bold text-charcoal mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted font-inter text-sm">{article.date}</p>
              </div>
            </motion.div>
          ))}
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
            href="/journal"
            className="text-charcoal hover:text-gold transition-colors font-inter font-semibold"
          >
            Read more articles →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
