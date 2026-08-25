'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getBlockedUsers, blockUser, unblockUser } from '../../../lib/data'
import { BanIcon, CheckIcon } from '../../../components/icons'
import { apiClient } from '../../../lib/api'

export default function AdminLoginPage() {
  const [blocked, setBlocked] = useState(() => getBlockedUsers())
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('Email and password are required to login.')
      setSuccess('')
      return
    }
    // TODO: Replace with real API call to Laravel backend.
    setForm({
      email: form.email.trim(),
      password: form.password.trim(),
    })

    console.log('Admin login attempted with:', form)

    const resp = await apiClient.post('/wp-admin/login', form)

    setForm({ email: '', password: '' })
    setError('')
    setSuccess('Admin login successful.')
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        Blocked Users
      </h1>
      <p className="mt-2 text-gray-100">
        Blocked users will not be able to book in the final version.
      </p>

      <div className="mx-auto mt-8 grid max-w-2xl place-items-center">
        <form
            onSubmit={handleLogin}
            className="h-fit w-full max-w-xl rounded-2xl border border-gray-300/50 bg-gray-700/40 p-6"
        >
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
            Admin Login
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Email <span className="text-paper">*</span>
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@barberflex.com"
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Password <span className="text-paper">*</span>
              </span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password *****"
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
            Login Panel
          </button>
        </form>
      </div>
    </div>
  )
}
