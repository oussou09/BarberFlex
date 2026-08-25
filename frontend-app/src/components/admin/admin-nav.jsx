'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/wp-admin/reservations', label: 'Reservations' },
  { href: '/wp-admin/blocked', label: 'Blocked Users' },
]

export default function AdminNav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-gray-300/40 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href="/wp-admin"
          className="font-display text-xl font-bold tracking-widest text-paper"
        >
          BARBERFLEX <span className="text-gray-100">ADMIN</span>
        </Link>
        <nav className="flex items-center gap-2">
          {LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-xs uppercase tracking-wider transition-colors sm:text-sm ${
                  active
                    ? 'bg-paper text-ink'
                    : 'text-gray-100 hover:bg-gray-700 hover:text-paper'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/"
            className="ml-1 rounded-md border border-gray-300 px-3 py-2 text-xs uppercase tracking-wider text-paper hover:bg-gray-700 sm:text-sm"
          >
            Exit
          </Link>
        </nav>
      </div>
    </header>
  )
}
