import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ContactForm from '../../components/contact/contact-form'
import Reveal from '../../components/reveal'
import {
  PhoneIcon,
  WhatsappIcon,
  MailIcon,
  LocationIcon,
} from '../../components/icons'

export const metadata = {
  title: 'Contact — BarberFlex',
  description:
    'Get in touch with BarberFlex. Call, WhatsApp or email us, or drop by our Casablanca shop.',
}

const CONTACTS = [
  {
    label: 'Address',
    value: '123 Main Street, Casablanca, Morocco',
    href: 'https://maps.google.com/?q=Casablanca',
    Icon: LocationIcon,
  },
  {
    label: 'Phone',
    value: '+212 600-000000',
    href: 'tel:+212600000000',
    Icon: PhoneIcon,
  },
  {
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/212600000000',
    Icon: WhatsappIcon,
  },
  {
    label: 'Email',
    value: 'hello@barberflex.com',
    href: 'mailto:hello@barberflex.com',
    Icon: MailIcon,
  },
]

export default function ContactPage() {


  return (
    <main className="min-h-screen bg-ink">
      <Navbar />

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-100">
              Say hello
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-paper text-balance sm:text-5xl">
              Get In Touch
            </h1>
            <p className="mt-4 max-w-xl text-gray-100 text-pretty">
              Questions, special requests or group bookings? Reach out through
              any channel below.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {CONTACTS.map(({ label, value, href, Icon }, i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-gray-300/50 p-5 transition-colors hover:border-paper hover:bg-gray-700/40"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper text-ink">
                      <Icon size={22} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-gray-100">
                        {label}
                      </span>
                      <span className="text-base text-paper">{value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Contact form */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
