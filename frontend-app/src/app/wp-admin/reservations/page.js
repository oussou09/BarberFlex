'use client'

import { useState } from 'react'
import { getReservations, cancelReservation } from '../../../lib/data'
import { CloseIcon } from '../../../components/icons'

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(() => getReservations())

  function handleCancel(id) {
    // TODO: Replace with real API call to Laravel backend.
    setReservations(cancelReservation(id))
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        All Reservations
      </h1>
      <p className="mt-2 text-gray-100">
        Manage upcoming bookings. Cancel any reservation that can&apos;t be honored.
      </p>

      {reservations.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-gray-300/50 p-8 text-center text-gray-100">
          No reservations yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-300/50">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300/40 bg-gray-700/40 text-xs uppercase tracking-wider text-gray-100">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-300/20 last:border-0"
                >
                  <td className="px-4 py-3 text-paper">{r.date}</td>
                  <td className="px-4 py-3 text-paper">{r.time}</td>
                  <td className="px-4 py-3 text-paper">{r.name}</td>
                  <td className="px-4 py-3 text-gray-100">{r.phone}</td>
                  <td className="px-4 py-3 text-gray-100">{r.email || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs uppercase tracking-wider ${
                        r.status === 'Confirmed'
                          ? 'bg-paper text-ink'
                          : 'border border-gray-300 text-gray-100'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {r.status === 'Confirmed' ? (
                      <button
                        type="button"
                        onClick={() => handleCancel(r.id)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs uppercase tracking-wider text-paper transition-colors hover:bg-gray-700"
                      >
                        <CloseIcon size={14} />
                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
