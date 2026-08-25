'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon } from '../icons'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please fill in both your name and a message.')
      return
    }
    setError('')
    // TODO: Replace with real API call to Laravel backend.
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex flex-col items-center rounded-2xl border border-gray-300/50 bg-gray-700/40 p-10 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink">
          <CheckIcon size={28} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-paper">
          Message sent
        </h3>
        <p className="mt-2 text-gray-100">
          Thanks, {form.name.split(' ')[0]}. We&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: '', message: '' })
            setSent(false)
          }}
          className="mt-6 rounded-md border border-gray-300 px-6 py-2.5 text-sm uppercase tracking-wider text-paper hover:bg-gray-700"
        >
          Send another
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-300/50 bg-gray-700/40 p-6 sm:p-8"
    >
      <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-paper">
        Send us a message
      </h3>

      <div className="mt-6 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-wider text-gray-100">
            Name <span className="text-paper">*</span>
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className="rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-wider text-gray-100">
            Message <span className="text-paper">*</span>
          </span>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            className="resize-none rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
          />
        </label>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-paper"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-paper px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02]"
      >
        Send Message
      </button>
    </form>
  )
}
