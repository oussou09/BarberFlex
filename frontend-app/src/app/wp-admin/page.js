"use client";

import Link from 'next/link'
import { useBarberApp } from '../../lib/AppContext'
import { CalendarIcon, BanIcon, ArrowRightIcon } from '../../components/icons'

export default function AdminHome() {
  const {reservations, loadingReserv, BlockedUsers, loadingBlockedUsers} = useBarberApp()
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
      value: `${BlockedUsers.length} blocked`,
    //   value: `11 blocked`,
      sub: 'Manage access',
      Icon: BanIcon,
    },
  ]

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        Dashboard
      </h1>
      <p className="mt-2 text-gray-100">
        Overview of your shop. Choose a section to manage.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        { loadingBlockedUsers || loadingReserv ? (
        // Loading skeleton for Two Dashboard Cards
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {[...Array(2)].map((_, i) => (
            <div
            key={i}
            className="flex animate-pulse items-center justify-between rounded-2xl border border-gray-300/50 p-6"
            >
            <div className="flex items-center gap-4">
                {/* Icon Skeleton */}
                <div className="h-12 w-12 rounded-xl bg-paper/10" />
                
                {/* Text Skeleton */}
                <div className="flex flex-col gap-2">
                <div className="h-3 w-20 rounded bg-paper/20" />
                <div className="h-6 w-16 rounded bg-paper/20" />
                <div className="h-3 w-24 rounded bg-paper/10" />
                </div>
            </div>
            
            {/* Arrow Icon Skeleton */}
            <div className="h-5 w-5 rounded bg-paper/10" />
            </div>
        ))}
        </div>
        )
        :
        (
        cards.map(({ href, label, value, sub, Icon }) => (
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
        ))
        )
        }
      </div>
    </div>
  )
}
