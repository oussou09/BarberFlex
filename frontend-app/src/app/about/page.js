import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ServiceCard from '../../components/service-card'
import Reveal from '../../components/reveal'
import { SERVICES, BENEFITS } from '../../lib/data'
import { ICON_MAP } from '../../components/icons'

export const metadata = {
  title: 'About — BarberFlex',
  description:
    'Learn about BarberFlex: skilled barbers, premium products and a relaxed atmosphere in the heart of Casablanca.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />

      {/* Intro */}
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-100">
              Our story
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-paper text-balance sm:text-5xl">
              About BarberFlex
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-100 text-pretty">
              BarberFlex is a modern barbershop built on precision, style and
              respect for the craft. Our skilled barbers blend classic
              techniques with contemporary trends to give every client a cut
              that fits them perfectly. Step in for a clean fade, a sculpted
              beard or the full treatment — and leave feeling like the sharpest
              version of yourself.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-gray-300/40 bg-gray-700/30">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-3 max-w-xl text-gray-100">
              Straightforward pricing, premium results.
            </p>
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

      {/* Why choose us */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
              Why Choose Us
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => {
              const Icon = ICON_MAP[benefit.icon]
              return (
                <Reveal key={benefit.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col items-start rounded-2xl border border-gray-300/50 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 text-paper">
                      {Icon ? <Icon size={24} /> : null}
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold uppercase tracking-wide text-paper">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-100">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
