'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getUpcomingDays } from '../../lib/data'
import Reveal from '../reveal'
import { ClockIcon } from '../icons'
import { useBarberApp } from '../../lib/AppContext'

function SlotGrid({ dateValue }) {

const {reservations , loadingReserv } = useBarberApp()

const OPENING_HOURS = [
  { label: '10:00', value: 10 },
  { label: '11:00', value: 11 },
  { label: '12:00', value: 12 },
  { label: '14:00', value: 14 },
  { label: '15:00', value: 15 },
  { label: '16:00', value: 16 },
  { label: '17:00', value: 17 },
  { label: '18:00', value: 18 },
  { label: '19:00', value: 19 },
  { label: '20:00', value: 20 },
  { label: '21:00', value: 21 },
  { label: '22:00', value: 22 },
]

  const router = useRouter()

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {
      loadingReserv ? (
        // Loading skeleton for the days cards container
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-300/50 bg-ink/60 p-6 animate-pulse"
            >
              <div className="mb-4 flex items-baseline justify-between">
                <div className="h-6 w-24 rounded bg-paper/20" />
                <div className="h-4 w-28 rounded bg-paper/10" />
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="rounded-lg bg-paper/10 px-3 py-3"
                  >
                    <div className="h-5 w-full rounded bg-paper/20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
      reservations && OPENING_HOURS.map((slot, i) => {
        console.log('reservations object', reservations,);

        const cleanSelectedDate = String(dateValue || '').replaceAll('-', '')
        console.log('cleanSelectedDate: ', cleanSelectedDate);
        // 2. تحويل الحجوزات إلى مصفوفة لضمان عمل الدالة حتى لو كانت Object


        // 3. البحث عما إذا كان هناك حجز "مؤكد" لهذه الساعة بالتحديد
        const isBooked = reservations.some((res) => {
          const isSameDay = String(res.day) === cleanSelectedDate
          const isSameHour = Number(res.houre) === Number(slot.value)
          const isConfirmed = String(res.status).toLowerCase() === 'confirmed'

          return isSameDay && isSameHour && isConfirmed
        })

        console.log(`isBooked: ${isBooked} for slot ${slot.value} on date ${cleanSelectedDate}`);

        return (
          <motion.button
            key={i}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push(`/book`)} //day=${dateValue}&houre=${slot.value}
            // className="rounded-lg bg-gradient-to-br from-paper to-gray-100 px-3 py-3 text-center text-sm font-semibold text-ink shadow-sm transition-shadow hover:shadow-md"
          className={`rounded-lg px-3 py-3 text-center text-sm font-semibold transition-all ${
                      isBooked
                        ? 'cursor-not-allowed bg-gradient-to-br from-gray-700 to-ink text-gray-300 line-through opacity-60'
                        : 'bg-gradient-to-br from-paper to-gray-100 text-ink shadow-sm transition-shadow hover:shadow-md'
                    }`}
          >
            {slot.label}
          </motion.button>
        )
        }))}
    </div>
  )
}

export default function QuickReservation() {
  const days = getUpcomingDays(2) // Today + Tomorrow
  const labels = ['Today', 'Tomorrow']

  console.log('days', days)
  console.log('labels', labels)

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
