'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon } from '../icons'
import { useForm } from 'react-hook-form'
import { apiClient, getCsrfCookie } from '../../lib/api'
import { toast } from 'sonner'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      full_name: '',
      message: ''
    },

    mode: 'onBlur',
  })

  const OnSubmit = async (data) => {
    const toastId = toast.loading('جاري إرسال الرسالة...')

    try {
      await getCsrfCookie()

      const resp = await apiClient.post('/storecontact', data)

      if (resp.status === 201 || resp.status === 200) {
        toast.success(resp.data.message || 'تم الإرسال بنجاح!', { id: toastId })
        setSent(true)
        reset()
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = error.response?.data?.message || 'فشل إرسال الرسالة. يرجى المحاولة لاحقاً.'
      toast.error(errorMessage, { id: toastId })
    }
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
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-md border border-gray-300 px-6 py-2.5 text-sm uppercase tracking-wider text-paper hover:bg-gray-700"
        >
          Send another
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(OnSubmit)}
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
            {...register('full_name', {
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
            className="rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
            />
            {errors.full_name && (
              <p className="text-sm text-red-300">
                {errors.full_name.message}
              </p>
            )}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-wider text-gray-100">
            Message <span className="text-paper">*</span>
          </span>
          <textarea
            type="text"
            {...register('message', {
              required: 'Message is required.',
              minLength: {
                value: 10,
                message: 'Message must contain at least 10 characters.',
              },
              maxLength: {
                value: 500,
                message: 'Message is too long.',
              },
            })}
            placeholder="How can we help?"
            rows={5}
            className="resize-none rounded-md border border-gray-300 bg-ink px-4 py-3 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
            />
            {errors.message && (
              <p className="text-sm text-red-300">
                {errors.message.message}
              </p>
            )}
        </label>
      </div>

      {/* <AnimatePresence>
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
      </AnimatePresence> */}

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-paper px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02]"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
