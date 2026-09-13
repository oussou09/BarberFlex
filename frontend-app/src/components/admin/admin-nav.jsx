'use client'

import { useBarberApp } from '../../lib/AppContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/wp-admin/reservations', label: 'Reservations' },
  { href: '/wp-admin/blocked', label: 'Blocked Users' },
]

export default function AdminNav() {
  const {RemoveAdminToken, CheckAdminToken} = useBarberApp();
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    RemoveAdminToken()
    setIsModalOpen(false)
    return router.push('/wp-admin/login')
  }
  return (
    <>
    <header className="sticky top-0 z-40 border-b border-gray-300/40 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-auto min-h-16 max-w-5xl flex-col items-center justify-between gap-3 px-4 py-3 md:h-16 md:flex-row md:gap-0 md:px-5 md:py-0">
        <Link
          href="/wp-admin"
          className="font-display text-lg font-bold tracking-widest text-paper sm:text-xl"
        >
          BARBERFLEX <span className="text-gray-100">ADMIN</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2.5 py-1.5 text-[10px] uppercase tracking-wider transition-colors sm:px-3 sm:py-2 sm:text-xs md:text-sm ${
                  active
                    ? 'bg-paper text-ink'
                    : 'text-gray-100 hover:bg-gray-700 hover:text-paper'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          {CheckAdminToken() && (

          <button
            type="button"
            onClick={() => { setIsModalOpen(true) }}
            className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-md border border-gray-300/50 bg-gray-700/40 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-100 transition-all cursor-pointer hover:border-red-300/50 hover:text-red-300 sm:px-4 sm:py-2 sm:text-xs md:text-sm"
          >
            {/* Logout Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            Logout
          </button>
          )}

          <Link
            href="/"
            className="ml-0 rounded-md border border-gray-300 px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-paper hover:bg-gray-700 sm:ml-1 sm:px-3 sm:py-2 sm:text-xs md:text-sm"
          >
            Exit
          </Link>
        </nav>
      </div>
    </header>
    {isModalOpen && (
    <>
      {/* CONFIRMATION MODAL OVERLAY */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        {/* Modal Card */}
        <div className="w-full max-w-md rounded-2xl border border-gray-300/50 bg-gray-700/40 p-5 sm:p-6 backdrop-blur-sm">
          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-paper/10 sm:h-14 sm:w-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-paper sm:hidden"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden text-paper sm:block"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          {/* Title & Message */}
          <h2 className="mt-4 text-center font-display text-base font-semibold uppercase tracking-wide text-paper sm:text-lg">
            Are you sure?
          </h2>
          <p className="mt-2 text-center text-xs text-gray-100 sm:text-sm">
            This action cannot be undone. Please confirm to proceed.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="flex-1 rounded-md border border-gray-300/50 bg-gray-700/40 px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-100 transition-colors hover:border-paper hover:text-paper"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 rounded-md bg-paper px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  )}
    
    </>
  )
}
