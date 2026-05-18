'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-fraunces text-2xl md:text-3xl font-semibold text-forest hover:text-gold transition-colors">
              Find A Venue
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/venues"
              className="text-charcoal hover:text-gold transition-colors text-sm font-inter"
            >
              Venues
            </Link>
            <Link
              href="/collections/weddings"
              className="text-charcoal hover:text-gold transition-colors text-sm font-inter"
            >
              Weddings
            </Link>
            <Link
              href="/collections/corporate"
              className="text-charcoal hover:text-gold transition-colors text-sm font-inter"
            >
              Corporate
            </Link>
            <Link
              href="/collections/safari-lodges"
              className="text-charcoal hover:text-gold transition-colors text-sm font-inter"
            >
              Safari Lodges
            </Link>
            <Link
              href="/journal"
              className="text-charcoal hover:text-gold transition-colors text-sm font-inter"
            >
              Journal
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/list-your-venue"
              className="px-4 py-2 text-forest border border-forest hover:bg-forest hover:text-ivory transition-colors text-sm font-inter rounded"
            >
              List your venue
            </Link>
            <Link
              href="#enquiry"
              className="px-4 py-2 bg-forest text-ivory hover:bg-opacity-90 transition-colors text-sm font-inter rounded"
            >
              Enquire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-muted/20"
          >
            <Link
              href="/venues"
              className="block px-2 py-2 text-charcoal hover:text-gold transition-colors text-sm"
            >
              Venues
            </Link>
            <Link
              href="/collections/weddings"
              className="block px-2 py-2 text-charcoal hover:text-gold transition-colors text-sm"
            >
              Weddings
            </Link>
            <Link
              href="/collections/corporate"
              className="block px-2 py-2 text-charcoal hover:text-gold transition-colors text-sm"
            >
              Corporate
            </Link>
            <Link
              href="/collections/safari-lodges"
              className="block px-2 py-2 text-charcoal hover:text-gold transition-colors text-sm"
            >
              Safari Lodges
            </Link>
            <Link
              href="/journal"
              className="block px-2 py-2 text-charcoal hover:text-gold transition-colors text-sm"
            >
              Journal
            </Link>
            <div className="flex gap-2 mt-4">
              <Link
                href="/list-your-venue"
                className="flex-1 px-4 py-2 text-forest border border-forest hover:bg-forest hover:text-ivory transition-colors text-sm rounded text-center"
              >
                List
              </Link>
              <Link
                href="#enquiry"
                className="flex-1 px-4 py-2 bg-forest text-ivory hover:bg-opacity-90 transition-colors text-sm rounded text-center"
              >
                Enquire
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
