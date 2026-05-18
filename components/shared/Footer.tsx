'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-muted/20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-fraunces text-2xl font-bold text-ivory mb-2">
              Find A Venue
            </h3>
            <p className="font-inter text-ivory/60 text-sm">
              South Africa's premium, curated venue directory.
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-inter font-semibold text-ivory mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/venues"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/weddings"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  Weddings
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/corporate"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  Corporate
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  Journal
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* For Venues */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-inter font-semibold text-ivory mb-4 text-sm uppercase tracking-wider">
              For Venues
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/list-your-venue"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  List Your Venue
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-inter font-semibold text-ivory mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-ivory/60 hover:text-gold transition-colors text-sm font-inter"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-ivory/60 font-inter text-sm">
            © 2026 Find A Venue · findavenue.co.za
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-ivory/60 hover:text-gold transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-ivory/60 hover:text-gold transition-colors text-sm"
            >
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
