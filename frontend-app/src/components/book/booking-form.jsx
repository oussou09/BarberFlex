'use client'

import { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

import { getUpcomingDays } from '../../lib/data'
import { CheckIcon, CalendarIcon, ClockIcon } from '../icons'
import { getCsrfCookie, apiClient } from '../../lib/api'
import { useBarberApp } from '../../lib/AppContext'


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

export default function BookingForm() {
  const params = useSearchParams()
  const { reservations = [] , loadingReserv = false } = useBarberApp()

  const prefillDate = params.get('date')
  const prefillTime = params.get('time')

  const [days, setDays] = useState([])
  const [confirmation, setConfirmation] = useState(null)
  const [myBookings, setMyBookings] = useState([])
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      date: prefillDate || '',
      time: prefillTime || '',
    },

    mode: 'onBlur',
  })

    useEffect(() => {
    const upcomingDays = getUpcomingDays(7)

    setDays(upcomingDays)

    if (upcomingDays[0]) {
      setValue('date', upcomingDays[0].value, {
        shouldValidate: true,
        shouldDirty: false,
      })
    }
  }, [setValue])

  const selectedDate = watch('date')
  const selectedTime = watch('time')

  function pickDate(value) {
    setValue('date', value, {
      shouldValidate: true,
      shouldDirty: true,
    })

    setValue('time', '', {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  function pickTime(value) {
    setValue('time', value, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const selectedDayNumber = selectedDate
  ? Number(selectedDate.replaceAll('-', ''))
  : null

  const takenTimes = new Set(
    (reservations || [])
      .filter((reservation) => {
        const activeStatus = [
          'pending',
          'confirmed',
        ].includes(
          String(reservation.status).toLowerCase()
        )

        return (
          Number(reservation.day) === selectedDayNumber &&
          activeStatus
        )
      })
      .map((reservation) => Number(reservation.houre))
  )

  async function onSubmit(data) {
    setServerError('')

    try {
      await getCsrfCookie()

      const response = await apiClient.post( '/reservations', data )

      const record = response.data.reservation || response.data

      setConfirmation(record)

      setMyBookings((previousBookings) => [
        record,
        ...previousBookings,
      ])

      reset({
        name: '',
        phone: '',
        email: '',
        date: data.date,
        time: '',
      })
    } catch (error) {
      console.error('Reservation failed:', error)

      const status = error.response?.status
      const message = error.response?.data?.message
      const backendErrors = error.response?.data?.errors

      if (backendErrors?.name?.[0]) {
        setError('name', {
          type: 'server',
          message: backendErrors.name[0],
        })
      }

      if (backendErrors?.phone?.[0]) {
        setError('phone', {
          type: 'server',
          message: backendErrors.phone[0],
        })
      }

      if (backendErrors?.email?.[0]) {
        setError('email', {
          type: 'server',
          message: backendErrors.email[0],
        })
      }

      if (backendErrors?.date?.[0]) {
        setError('date', {
          type: 'server',
          message: backendErrors.date[0],
        })
      }

      if (backendErrors?.time?.[0]) {
        setError('time', {
          type: 'server',
          message: backendErrors.time[0],
        })
      }

      if (status === 409) {
        setServerError(
          message || 'This time slot is already reserved.'
        )
      } else if (status === 401) {
        setServerError(
          'You must be logged in to make a reservation.'
        )
      } else {
        setServerError(
          message || 'Failed to create reservation.'
        )
      }
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Date picker */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <CalendarIcon
            size={20}
            className="text-gray-100"
          />

          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-paper">
            Choose a day
          </h2>
        </div>

        {days.length === 0 ? (
          // Loading skeleton
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex min-w-[72px] flex-col items-center rounded-xl border border-paper/20 px-3 py-3 animate-pulse"
              >
                <div className="h-3 w-10 rounded bg-paper/20" />
                <div className="mt-2 h-6 w-8 rounded bg-paper/20" />
                <div className="mt-1 h-3 w-6 rounded bg-paper/20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
            {days.map((day) => {
              const isSelected =
                day.value === selectedDate

              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => pickDate(day.value)}
                  defaultValue={days[0]?.value || ''}
                  className={`flex min-w-[72px] flex-col items-center rounded-xl border px-3 ms:px-5 py-2 transition-colors ${
                    isSelected
                      ? 'border-paper bg-paper text-ink'
                      : 'border-gray-300/50 text-gray-100 hover:border-paper'
                  }`}
                >
                  <span>
                    {day.isToday
                      ? 'Today'
                      : day.isTomorrow
                        ? 'Tomorrow'
                        : day.weekday}
                  </span>

                  <span>{day.day}</span>
                  <span>{day.month}</span>
                </button>
              )
            })}
          </div>
        )}

        <input
          type="hidden"
          {...register('date', {
            required: 'Please select a date.',
          })}
        />

        {errors.date && (
          <p className="mt-2 text-sm text-red-300">
            {errors.date.message}
          </p>
        )}
      </section>

      {/* Time picker */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <ClockIcon
            size={20}
            className="text-gray-100"
          />

          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-paper">
            Pick a time
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {loadingReserv ? (
            // Loading skeleton
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg bg-paper/10 px-3 py-3"
              >
                <div className="h-5 w-full rounded bg-paper/30" />
              </div>
            ))
          ) : (
            reservations &&
            OPENING_HOURS.map((slot) => {
              const isTaken = takenTimes.has(slot.value)
              const isSelected = slot.value === selectedTime

              return (
                <motion.button
                  key={slot.value}
                  type="button"
                  disabled={isTaken}
                  whileTap={isTaken ? undefined : { scale: 0.95 }}
                  onClick={() => {
                    if (!isTaken) {
                      pickTime(slot.value)
                    }
                  }}
                  className={`rounded-lg px-3 py-3 text-center text-sm font-semibold transition-all ${
                    isTaken
                      ? 'cursor-not-allowed bg-gradient-to-br from-gray-700 to-ink text-gray-300 line-through opacity-60'
                      : isSelected
                        ? 'bg-paper text-ink ring-2 ring-paper ring-offset-2 ring-offset-ink'
                        : 'bg-gradient-to-br from-paper to-gray-100 text-ink hover:opacity-90'
                  }`}
                >
                  {slot.label}
                </motion.button>
              )
            })
          )}
        </div>

         <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-100">
          <span className="flex items-center gap-2">
            <span className="h-3 w-4 rounded-sm bg-gradient-to-br from-paper to-gray-100" />
            Available
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-4 rounded-sm bg-gradient-to-br from-gray-700 to-ink" />
            Taken
          </span>
        </div>

        <input
          type="hidden"
          {...register('time', {
            required: 'Please select an available time.',
          })}
        />

        {errors.time && (
          <p className="mt-2 text-sm text-red-300">
            {errors.time.message}
          </p>
        )}
      </section>

      {/* Reservation form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-2xl border border-gray-300/50 bg-gray-700/40 p-6 sm:p-8"
      >
        <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-paper">
          Your details
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* Full name */}
          <label className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-wider text-gray-100">
              Full Name{' '}
              <span className="text-paper">*</span>
            </span>

            <input
              type="text"
              {...register('name', {
                required: 'Full name is required.',

                minLength: {
                  value: 2,
                  message:
                    'Full name must contain at least 2 characters.',
                },

                maxLength: {
                  value: 100,
                  message: 'Full name is too long.',
                },

                validate: (value) =>
                  value.trim().length >= 2 ||
                  'Full name cannot be empty.',
              })}
              placeholder="e.g. Amine Tazi"
              aria-invalid={Boolean(errors.name)}
              className="rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
            />

            {errors.name && (
              <p className="text-sm text-red-300">
                {errors.name.message}
              </p>
            )}
          </label>

          {/* Phone */}
          <label className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-wider text-gray-100">
              Phone Number{' '}
              <span className="text-paper">*</span>
            </span>

            <input
              type="tel"
              {...register('phone', {
                required: 'Phone number is required.',

                minLength: {
                  value: 8,
                  message:
                    'Phone number must contain at least 8 characters.',
                },

                maxLength: {
                  value: 20,
                  message: 'Phone number is too long.',
                },

                pattern: {
                  value: /^\+?[0-9\s()-]+$/,
                  message: 'Please enter a valid phone number.',
                },
              })}
              placeholder="+212 6.. .. .. .."
              aria-invalid={Boolean(errors.phone)}
              className="rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
            />

            {errors.phone && (
              <p className="text-sm text-red-300">
                {errors.phone.message}
              </p>
            )}

            <span className="text-xs text-gray-300">
              Required for confirmation
            </span>
          </label>

          {/* Email */}
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm uppercase tracking-wider text-gray-100">
              Email{' '}
              <span className="text-gray-300">
                (optional)
              </span>
            </span>

            <input
              type="email"
              {...register('email', {
                validate: (value) => {
                  if (!value.trim()) {
                    return true
                  }

                  return (
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                      value
                    ) ||
                    'Please enter a valid email address.'
                  )
                },
              })}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className="rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
            />

            {errors.email && (
              <p className="text-sm text-red-300">
                {errors.email.message}
              </p>
            )}
          </label>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-xl border border-gray-300/50 bg-ink px-4 py-3 text-sm text-gray-100">
          <span className="text-gray-300">
            Summary:{' '}
          </span>

          Date: {selectedDate || '—'} · Time:{' '}
          {selectedTime || '—'}
        </div>

        {/* Server error */}
        <AnimatePresence>
          {serverError && (
            <motion.p
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-red-300"
            >
              {serverError}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-md bg-paper px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? 'Saving...'
            : 'Confirm Reservation'}
        </button>
      </form>

      {/* Confirmation */}
      <AnimatePresence>
        {confirmation && (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-2xl border border-paper bg-gray-700/40 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink">
                <CheckIcon size={24} />
              </span>

              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-paper">
                Your reservation is confirmed!
              </h3>
            </div>

            <dl className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              <SummaryRow
                label="Name"
                value={confirmation.name}
              />

              <SummaryRow
                label="Phone"
                value={confirmation.phone}
              />

              {confirmation.email && (
                <SummaryRow
                  label="Email"
                  value={confirmation.email}
                />
              )}

              <SummaryRow
                label="Date"
                value={confirmation.date}
              />

              <SummaryRow
                label="Time"
                value={confirmation.time}
              />
            </dl>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local bookings */}
      {myBookings.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
            Your bookings this session
          </h3>

          <ul className="mt-4 flex flex-col gap-2">
            {myBookings.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-300/50 px-4 py-3 text-sm text-gray-100"
              >
                <span className="text-paper">
                  {booking.date} · {booking.time}
                </span>

                <span>{booking.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-300/30 py-1">
      <dt className="text-gray-300">
        {label}
      </dt>

      <dd className="text-paper">
        {value}
      </dd>
    </div>
  )
}