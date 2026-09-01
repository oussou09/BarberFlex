'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getBlockedUsers, blockUser, unblockUser } from '../../../lib/data'
import { BanIcon, CheckIcon } from '../../../components/icons'
import { useBarberApp } from '../../../lib/AppContext'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { apiClient } from '../../../lib/api'

export default function BlockedUsersPage() {
  const {fetchBlockedUsersData, RefetchBlockedUsers, BlockedUsers, loadingBlockedUsers, GetAdminToken} = useBarberApp()
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
      phone: '',
      email: '',
      reason: ''
    },

    mode: 'onBlur',
  })

  const handleBlock = async (data) => {
    const toastId = toast.loading('Connecting to the server...');
    console.log('Form data:', data); // Log the form data for debugging
    const token = GetAdminToken();

    console.log('Admin Token:', `Bearer ${token}`); // Log the admin token for debugging
    try {
      const resp = await apiClient.post('/wp-admin/storeblockusers', data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      reset()
      toast.success('User blocked successfully.', { id: toastId });
      RefetchBlockedUsers();
    } catch (err) {
      console.error('Error sending message:', err)
      const errorMessage = err.response?.data?.message || 'Failed to send message. Please try again later.';
      toast.error(errorMessage, { id: toastId });
    }
  }

  const handleUnblock = (id) => {
    // TODO: Replace with real API call to Laravel backend.
    setBlocked(unblockUser(id))
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-paper">
        Blocked Users
      </h1>
      <p className="mt-2 text-gray-100">
        Blocked users will not be able to book appointments in the system.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Block form */}
        <form
          onSubmit={handleSubmit(handleBlock)}
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
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Email <span className="text-gray-300">(optional)</span>
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
                placeholder="user@example.com"
                aria-invalid={Boolean(errors.email)}
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wider text-gray-100">
                Reason <span className="text-gray-300">(optional)</span>
              </span>
              <input
                type="text"
                {...register('reason', {
                  required: 'Reason is required.',
                  minLength: {
                    value: 10,
                    message: 'Reason must contain at least 10 characters.',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Reason is too long.',
                  },
                })}
                placeholder="e.g. Repeated no-shows"
                aria-invalid={Boolean(errors.reason)}
                className="rounded-md border border-gray-300 bg-ink px-4 py-2.5 text-paper placeholder:text-gray-300 focus:border-paper focus:outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-paper px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            <BanIcon size={16} />
            {isSubmitting ? 'Blocking...' : 'Block User'}
          </button>
        </form>

        {/* Blocked list */}
        <div>
          {loadingBlockedUsers ? (
            <div className="overflow-hidden rounded-2xl border border-gray-300/50">
              <div className="animate-pulse">
                <div className="border-b border-gray-300/40 bg-gray-700/40 px-4 py-3">
                  <div className="flex gap-6">
                    <div className="h-3 w-16 rounded bg-paper/20" />
                    <div className="h-3 w-24 rounded bg-paper/20" />
                    <div className="h-3 w-20 rounded bg-paper/20" />
                    <div className="ml-auto h-3 w-16 rounded bg-paper/20" />
                  </div>
                </div>

                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 border-b border-gray-300/20 px-4 py-3 last:border-0"
                  >
                    <div className="h-4 w-20 rounded bg-paper/10" />
                    <div className="h-4 w-28 rounded bg-paper/10" />
                    <div className="h-4 w-24 rounded bg-paper/10" />
                    <div className="ml-auto h-8 w-24 rounded-md bg-paper/10" />
                  </div>
                ))}
              </div>
            </div>
          ) : !BlockedUsers || BlockedUsers.length === 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-300/50">
              <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-paper"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M8 11h6" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
                    No Blocked Users
                  </h3>
                  <p className="mt-1 text-sm text-gray-100">
                    There are no blocked users at the moment.
                  </p>
                </div>
              </div>
            </div>
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
                  {BlockedUsers.map((u) => (
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
                          // disabled={actionLoadingId === u.id}
                          onClick={() => handleUnblock(u.id)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs uppercase tracking-wider text-paper transition-colors hover:bg-gray-700 disabled:opacity-50"
                        >
                          <CheckIcon size={14} />
                          {/* {actionLoadingId === u.id ? 'Unblocking...' : 'Unblock'} */}
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
