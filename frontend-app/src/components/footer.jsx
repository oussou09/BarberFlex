import Link from 'next/link'
import { InstagramIcon, FacebookIcon, WhatsappIcon } from './icons'

const SOCIALS = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://facebook.com', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://wa.me/212600000000', label: 'WhatsApp', Icon: WhatsappIcon },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-300/40 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-xl font-bold tracking-widest text-paper">
            BARBER<span className="text-gray-100">FLEX</span>
          </p>
          <p className="mt-2 text-sm text-gray-100">
            © 2026 BarberFlex. All rights reserved.
          </p>
        </div>

        <nav className="flex gap-6 text-sm uppercase tracking-wider text-gray-100">
          <Link href="/" className="hover:text-paper">
            Home
          </Link>
          <Link href="/about" className="hover:text-paper">
            About
          </Link>
          <Link href="/contact" className="hover:text-paper">
            Contact
          </Link>
        </nav>

        <div className="flex gap-3">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-100 transition-colors hover:border-paper hover:text-paper"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
