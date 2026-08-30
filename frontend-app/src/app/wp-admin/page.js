"use client";

import Link from 'next/link'
import { useBarberApp } from '../../lib/AppContext'
import { CalendarIcon, BanIcon, ArrowRightIcon } from '../../components/icons'

export default function AdminHome() {
  const {reservations, loadingReserv} = useBarberApp()
  const confirmed = reservations.filter((r) => r.status === 'confirmed').length
  // const blocked = getBlockedUsers().length

  const cards = [
    {
      href: '/wp-admin/reservations',
      label: 'Reservations',
      value: `${confirmed} confirmed`,
      sub: `${reservations.length} total`,
      Icon: CalendarIcon,
    },
    {
      href: '/wp-admin/blocked',
      label: 'Blocked Users',
      // value: `${blocked} blocked`,
      value: `11 blocked`,
      sub: 'Manage access',
      Icon: BanIcon,
    },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        Dashboard
      </h1>
      <p className="mt-2 text-gray-100">
        Overview of your shop. Choose a section to manage.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map(({ href, label, value, sub, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between rounded-2xl border border-gray-300/50 p-6 transition-colors hover:border-paper hover:bg-gray-700/40"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-ink">
                <Icon size={24} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-100">
                  {label}
                </p>
                <p className="font-display text-xl font-bold text-paper">
                  {value}
                </p>
                <p className="text-xs text-gray-300">{sub}</p>
              </div>
            </div>
            <ArrowRightIcon
              size={20}
              className="text-gray-100 transition-transform group-hover:translate-x-1"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
