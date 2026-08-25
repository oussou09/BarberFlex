import Link from 'next/link'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Hero from '../components/home/hero'
import QuickReservation from '../components/home/quick-reservation'
import ServiceCard from '../components/service-card'
import Reveal from '../components/reveal'
import { SERVICES } from '../lib/data'
import { ArrowRightIcon } from '../components/icons'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />

      <Hero />

      {/* Services preview (anchor target for "Our Services") */}
      <section id="services" className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-100">
                  What we do
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
                  Our Services
                </h2>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-gray-100 hover:text-paper"
              >
                View full menu
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} delay={i * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuickReservation />

      {/* Closing CTA */}
      <section className="border-t border-gray-300/40 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-paper text-balance sm:text-5xl">
              Ready for your sharpest look yet?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-100 text-pretty">
              Reserve your chair now and skip the wait. It only takes a few
              seconds.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-paper px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-105"
            >
              Book Your Slot
              <ArrowRightIcon size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
