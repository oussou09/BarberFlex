'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '../icons'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 md:grid-cols-2 md:pt-10">
        {/* Left: text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="order-2 md:order-1"
        >
          <span className="inline-block rounded-full border border-gray-300 px-4 py-1 text-xs uppercase tracking-[0.25em] text-gray-100">
            Casablanca · Est. 2026
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-paper text-balance sm:text-6xl lg:text-7xl">
            Premium Barber Experience
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-100 text-pretty">
            Book your slot in seconds. Walk in fresh, walk out sharper.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 rounded-md bg-paper px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-105"
            >
              Book Now
              <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:border-paper hover:bg-gray-700"
            >
              Our Services
            </a>
          </div>
        </motion.div>

        {/* Right: single combined barbershop illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.15 }}
          className="order-1 relative overflow-hidden md:order-2" // rounded-2xl border border-gray-300/50 bg-paper
        >
          <img
            src="/barber-full.png"
            alt="Barbershop illustration with vintage mirror, bearded logo, and barber chair"
            className="h-full w-full object-contain p-2"
          />
        </motion.div>
      </div>
    </section>
  )
}
