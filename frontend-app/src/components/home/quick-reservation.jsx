'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getUpcomingDays } from '../../lib/data'
import Reveal from '../reveal'
import { ClockIcon } from '../icons'
import { useBarberApp } from '../../lib/AppContext'

function SlotGrid({ dateValue }) {

const {reservations , loadingReserv } = useBarberApp()

console.log('reservations', reservations)

const OPENING_HOURS = [
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00' },
  { label: '12:00', value: '12:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' },
  { label: '20:00', value: '20:00' },
  { label: '21:00', value: '21:00' },
  { label: '22:00', value: '22:00' },
]

  const router = useRouter()

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {OPENING_HOURS.map((slot, i) => {
        const isBooked = reservations.some(
            (res) => String(res.day) === String(dateValue) && Number(res.houre) === Number(slot.value)
          )
        const isAvailable = !isBooked

        if (!isAvailable) {
          return (
            <div
              key={i}
              aria-disabled="true"
              className="cursor-not-allowed rounded-lg bg-gradient-to-br from-gray-700 to-ink px-3 py-3 text-center text-sm text-gray-300 line-through opacity-60"
            >
              {slot.label}
            </div>
          )
        }
        return (
          <motion.button
            key={i}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push(`/book?date=${dateValue}&time=${slot.value}`)}
            className="rounded-lg bg-gradient-to-br from-paper to-gray-100 px-3 py-3 text-center text-sm font-semibold text-ink shadow-sm transition-shadow hover:shadow-md"
          >
            {slot.label}
          </motion.button>
        )
      })}
    </div>
  )
}

export default function QuickReservation() {
  const days = getUpcomingDays(2) // Today + Tomorrow
  const labels = ['Today', 'Tomorrow']

  return (
    <section className="border-t border-gray-300/40 bg-gray-700/30">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <ClockIcon size={22} className="text-gray-100" />
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
              Quick Reservation
            </h2>
          </div>
          <p className="mt-3 max-w-xl text-gray-100">
            Grab an open slot for today or tomorrow. Available times are bright;
            booked times are dimmed. Tap one to finish your reservation.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {days.map((day, i) => (
            <Reveal key={day.value} delay={i * 0.1}>
              <div className="rounded-2xl border border-gray-300/50 bg-ink/60 p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-paper">
                    {labels[i]}
                  </h3>
                  <span className="text-sm text-gray-100">
                    {day.weekday} {day.day} {day.month}
                  </span>
                </div>
                <SlotGrid dateValue={day.value} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
