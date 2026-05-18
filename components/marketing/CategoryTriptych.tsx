'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Category {
  id: string
  title: string
  href: string
}

const categories: Category[] = [
  { id: 'weddings', title: 'Weddings', href: '/collections/weddings' },
  { id: 'corporate', title: 'Corporate', href: '/collections/corporate' },
  { id: 'safari', title: 'Safari Lodges', href: '/collections/safari-lodges' },
]

export function CategoryTriptych() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 h-96 md:h-screen"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              layoutId={`category-${category.id}`}
              onHoverStart={() => setExpandedId(category.id)}
              onHoverEnd={() => setExpandedId(null)}
              className={`flex-1 rounded-lg overflow-hidden bg-sand/30 cursor-pointer relative group transition-all duration-500 ${
                expandedId === category.id ? 'md:flex-grow' : ''
              }`}
              initial={{ flex: 1 }}
              animate={{ flex: expandedId === category.id ? 1.6 : 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-forest/10" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                <h3 className="font-fraunces text-3xl md:text-4xl font-bold text-charcoal text-center mb-4">
                  {category.title}
                </h3>

                {/* Expanded content */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity:
                      expandedId === category.id || isMobile ? 1 : 0,
                    y: expandedId === category.id || isMobile ? 0 : 8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="font-inter text-muted mb-6 text-sm max-w-xs">
                    Discover the perfect venue for your {category.title.toLowerCase()} event.
                  </p>
                  <Link
                    href={category.href}
                    className="text-gold hover:text-forest transition-colors font-inter font-semibold text-sm underline"
                  >
                    Explore →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
