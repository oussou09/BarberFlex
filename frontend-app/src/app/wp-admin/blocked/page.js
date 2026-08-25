'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getBlockedUsers, blockUser, unblockUser } from '../../../lib/data'
import { BanIcon, CheckIcon } from '../../../components/icons'

export default function BlockedUsersPage() {
  const [blocked, setBlocked] = useState(() => getBlockedUsers())
  const [form, setForm] = useState({ phone: '', email: '', reason: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleBlock(e) {
    e.preventDefault()
    if (!form.phone.trim()) {
      setError('Phone number is required to block a user.')
      setSuccess('')
      return
    }
    // TODO: Replace with real API call to Laravel backend.
    blockUser({
      phone: form.phone.trim(),
      email: form.email.trim(),
      reason: form.reason.trim(),
    })
    setBlocked(getBlockedUsers())
    setForm({ phone: '', email: '', reason: '' })
    setError('')
    setSuccess('User blocked successfully.')
  }

  function handleUnblock(id) {
    // TODO: Replace with real API call to Laravel backend.
    setBlocked(unblockUser(id))
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        Blocked Users
      </h1>
      <p className="mt-2 text-gray-100">
        Blocked users will not be able to book in the final version.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Block form */}
        <form
          onSubmit={handleBlock}
          className="h-fit rounded-2xl border border-gray-300/50 bg-gray-700/40 p-6"
        >
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
            Block a user
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Phone <span className="text-paper">*</span>
              </span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+212 6.. .. .. .."
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Email <span className="text-gray-300">(optional)</span>
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="user@example.com"
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Reason <span className="text-gray-300">(optional)</span>
              </span>
              <input
                type="text"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="e.g. Repeated no-shows"
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-paper"
              >
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 text-sm text-paper"
              >
                <CheckIcon size={16} />
                {success}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-paper px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02]"
          >
            <BanIcon size={16} />
            Block User
          </button>
        </form>

        {/* Blocked list */}
        <div>
          {blocked.length === 0 ? (
            <p className="rounded-2xl border border-gray-300/50 p-8 text-center text-gray-100">
              No blocked users.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-300/50">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300/40 bg-gray-700/40 text-xs uppercase tracking-wider text-gray-100">
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Reason</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blocked.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-gray-300/20 last:border-0"
                    >
                      <td className="px-4 py-3 text-paper">{u.phone}</td>
                      <td className="px-4 py-3 text-gray-100">
                        {u.email || '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-100">
                        {u.reason || '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleUnblock(u.id)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs uppercase tracking-wider text-paper transition-colors hover:bg-gray-700"
                        >
                          <CheckIcon size={14} />
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
