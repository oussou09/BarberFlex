'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getBlockedUsers, blockUser, unblockUser } from '../../../lib/data'
import { BanIcon, CheckIcon } from '../../../components/icons'
import { apiClient, getCsrfCookie } from '../../../lib/api'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useBarberApp } from '../../../lib/AppContext'


export default function AdminLoginPage() {
    const {CheckCsrfToken} = useBarberApp()
    const router = useRouter()
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
        email: '',
        password: ''
      },
  
      mode: 'onBlur',
    })

  const handleLogin = async (data) => {
    const toastId = toast.loading('Login In ...')

    console.log('Admin login attempted with:', data)
    try {
      await getCsrfCookie()
      const resp = await apiClient.post('/wp-admin/login', data)
      toast.success(resp.data.message || 'Login Seccessfully', { id: toastId })
      await CheckCsrfToken(resp.data.token);
      router.push('/wp-admin/reservations')
    } catch (error) {
      console.error('Error fetching CSRF cookie:', error)

      const errorMessage = error.response?.data?.message || 'Error to send the data login. try again later'
      toast.error(errorMessage, { id: toastId })
      return
    }

    reset()
    setError('')
    // setSuccess('Admin login successful.')
  }

  return (
<div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 sm:gap-6 bg-ink px-4 py-8 sm:px-6">
  <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-paper sm:text-3xl md:text-4xl">
    Admins Login
  </h1>

  <div className="mx-auto mt-4 w-full max-w-md sm:mt-6 sm:max-w-lg md:max-w-xl">
    <form
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      className="h-fit w-full rounded-2xl border border-gray-300/50 bg-gray-700/40 px-5 py-6 sm:px-8 sm:py-8"
    >
      <h2 className="font-display text-base font-semibold uppercase tracking-wide text-paper sm:text-lg">
        Admin Login
      </h2>

      <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:gap-5">
        {/* Email Field */}
        <label className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-xs uppercase tracking-wider text-gray-100 sm:text-sm">
            Email <span className="text-paper">*</span>
          </span>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
            placeholder="admin@barberflex.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none sm:py-3 sm:text-base"
          />
          {errors.email && (
            <p className="text-xs text-red-300">
              {errors.email.message}
            </p>
          )}
        </label>

        {/* Password Field */}
        <label className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-xs uppercase tracking-wider text-gray-100 sm:text-sm">
            Password <span className="text-paper">*</span>
          </span>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters.',
              },
            })}
            placeholder="Password *****"
            aria-invalid={Boolean(errors.password)}
            className="w-full rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none sm:py-3 sm:text-base"
          />
          {errors.password && (
            <p className="text-xs text-red-300">
              {errors.password.message}
            </p>
          )}
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-paper px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:py-3.5 sm:text-base"
      >
        <BanIcon size={16} />
        {isSubmitting ? 'Authenticating...' : 'Login Panel'}
      </button>
    </form>
  </div>
</div>
  )
}
