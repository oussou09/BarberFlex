'use client'

import { useEffect, useMemo, useState } from 'react'
// import { getReservations } from '../../../lib/data'
import { useBarberApp } from '../../../lib/AppContext'
import { CloseIcon } from '../../../components/icons'
import BlockedUsersPage from '../blocked/page'
import { apiClient } from '../../../lib/api'
import { toast } from 'sonner'


const getFormattedDate = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return Number(`${year}${month}${day}`);
};

export default function ReservationsPage() {
  const {reservations = [], loadingReserv, GetAdminToken, RefetchReservations} = useBarberApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleCancel = async () => {
    console.log('handle cancel for slot: ', selectedSlot);
    const toastId = toast.loading('Connecting to the server...');
    try {
      const token = GetAdminToken();
      console.log('token: ', token)
      const resp = await apiClient.post('/wp-admin/cancelslot',
        {SlotId:selectedSlot.id},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      if (resp.status === 200) {
        toast.success(`slot ${selectedSlot.day ? String(selectedSlot.day).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') : '—'} ${selectedSlot.houre}:00 has been cencel successfully.` || resp.data.message, { id: toastId });
        RefetchReservations()
      }
    } catch (err) {
      console.error('Error sending message:', err)
      const errorMessage = err.response?.data?.message || 'Failed to send message. Please try again later.';
      toast.error(errorMessage, { id: toastId });
    }
    setIsModalOpen(false);
  }

  const handleBlockUser = async () => {
    const toastId = toast.loading('Connecting to the server...');

    try {
      const token = GetAdminToken();
      const resp = await apiClient.post('/wp-admin/storeblockusers',
        {
          full_name: selectedUser?.full_name || '',
          phone: selectedUser?.phone || '',
          email: selectedUser?.email || '',
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })

      toast.success(resp.data.message || 'User has been blocked successfully', { id: toastId });
      setIsModalOpen(false);
      RefetchReservations();
    } catch (err) {
      console.error('Error sending message:', err)

      const errorMessage = err.response?.data?.message || 'Failed to block user. Please try again later.';
      toast.error(errorMessage, { id: toastId });
    }

  }

  // 1. Filter States
  const [dayFilter, setDayFilter] = useState('default'); // 'default', 'today', 'tomorrow'
  const [statusFilter, setStatusFilter] = useState('default'); // 'default', 'confirmed', 'cancelled'

  // 2. Calculated Date Values for Today & Tomorrow
  const todayVal = useMemo(() => getFormattedDate(0), []);     // e.g., 20260829
  const tomorrowVal = useMemo(() => getFormattedDate(1), []);  // e.g., 20260830

  // 3. Unified Filter & Sort Pipeline
  const filteredAndSortedReservations = useMemo(() => {
    return (reservations || [])
      // STEP A: FILTER BY DAY
      .filter((item) => {
        if (dayFilter === 'today') return item.day === todayVal;
        if (dayFilter === 'tomorrow') return item.day === tomorrowVal;
        return true; // 'default' shows all days
      })
      // STEP B: FILTER BY STATUS
      .filter((item) => {
        if (statusFilter === 'confirmed') return item.status === 'confirmed';
        if (statusFilter === 'cancelled') return item.status === 'cancelled';
        return true; // 'default' shows all statuses
      })
      // STEP C: SORT (Chronological by Day, then by Hour slot)
      .toSorted((a, b) => {
        if (a.day !== b.day) {
          return a.day - b.day; // Earliest dates first
        }
        return a.houre - b.houre; // Earliest hours first
      });
  }, [reservations, dayFilter, statusFilter, todayVal, tomorrowVal]);


  return (
    <div className="px-4 sm:px-6 lg:px-8">
  <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-paper mt-8 sm:text-3xl md:text-4xl sm:mt-15">
    All Reservations
  </h1>
  <p className="mt-2 text-sm text-gray-100 sm:text-base">
    Manage upcoming bookings. Cancel any reservation that can&apos;t be honored.
  </p>

  {loadingReserv ? (
      // Loading skeleton for Reservations Table
        <div className="mt-6 mb-10 overflow-hidden rounded-2xl border border-gray-300/50 sm:mt-8 sm:mb-16">
          <div className="animate-pulse">
            {/* Table Header Skeleton */}
            <div className="border-b border-gray-300/40 bg-gray-700/40 px-4 py-3">
              <div className="flex gap-4">
                <div className="h-3 w-12 rounded bg-paper/20" />
                <div className="h-3 w-20 rounded bg-paper/20" />
                <div className="h-3 w-16 rounded bg-paper/20" />
                <div className="h-3 w-14 rounded bg-paper/20" />
                <div className="h-3 w-10 rounded bg-paper/20" />
                <div className="h-3 w-16 rounded bg-paper/20" />
                <div className="ml-auto h-3 w-12 rounded bg-paper/20" />
                <div className="h-3 w-12 rounded bg-paper/20" />
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-gray-300/20 px-4 py-3 last:border-0"
              >
                <div className="h-4 w-24 rounded bg-paper/10" />
                <div className="h-4 w-32 rounded bg-paper/10" />
                <div className="h-4 w-20 rounded bg-paper/10" />
                <div className="h-4 w-16 rounded bg-paper/10" />
                <div className="h-4 w-12 rounded bg-paper/10" />
                <div className="h-6 w-20 rounded-full bg-paper/10" />
                <div className="ml-auto h-8 w-20 rounded-md bg-paper/10" />
                <div className="h-8 w-20 rounded-md bg-paper/10" />
              </div>
            ))}
          </div>
        </div>
    ) : reservations.length === 0 ? (
    <p className="mt-8 rounded-2xl border border-gray-300/50 p-6 text-center text-sm text-gray-100 sm:mt-10 sm:p-8 sm:text-base">
      No reservations yet.
    </p>
  ) : (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mt-6 sm:mt-10">
        <h4 className="text-sm uppercase tracking-wider text-gray-100 sm:hidden">
          Sort By
        </h4>
        
        {/* Days Filter */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm uppercase tracking-wider text-gray-100">
            Days
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDayFilter('default')}
              className={`rounded-md px-3 py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all
                ${dayFilter === 'default' ? 'bg-paper font-semibold text-ink hover:scale-[1.02]'
                : 'border border-gray-300/50 bg-gray-700/40 font-medium text-gray-100 hover:border-paper hover:text-paper'
                }`}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setDayFilter('today')}
              className={`rounded-md px-3 py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all
                ${ dayFilter === 'today' ? 'bg-paper font-semibold text-ink hover:scale-[1.02]'
                : 'border border-gray-300/50 bg-gray-700/40 font-medium text-gray-100 hover:border-paper hover:text-paper'
                }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setDayFilter('tomorrow')}
              className={`rounded-md px-3 py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all
                ${ dayFilter === 'tomorrow' ? 'bg-paper font-semibold text-ink hover:scale-[1.02]'
                : 'border border-gray-300/50 bg-gray-700/40 font-medium text-gray-100 hover:border-paper hover:text-paper'
                }`}
            >
              Tomorrow
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm uppercase tracking-wider text-gray-100">
            Status
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter('default')}
              className={`rounded-md px-3 py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all ${
                statusFilter === 'default'
                  ? 'bg-paper font-semibold text-ink hover:scale-[1.02]'
                  : 'border border-gray-300/50 bg-gray-700/40 font-medium text-gray-100 hover:border-paper hover:text-paper'
              }`}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('confirmed')}
              className={`rounded-md px-3 py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all ${
                statusFilter === 'confirmed'
                  ? 'bg-paper font-semibold text-ink hover:scale-[1.02]'
                  : 'border border-gray-300/50 bg-gray-700/40 font-medium text-gray-100 hover:border-paper hover:text-paper'
              }`}
            >
              Confirmed
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('cancelled')}
              className={`rounded-md px-3 py-1.5 text-xs sm:text-sm uppercase tracking-wider transition-all ${
                statusFilter === 'cancelled'
                  ? 'bg-paper font-semibold text-ink hover:scale-[1.02]'
                  : 'border border-gray-300/50 bg-gray-700/40 font-medium text-gray-100 hover:border-paper hover:text-paper'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-10 overflow-x-auto rounded-2xl border border-gray-300/50 sm:mt-8 sm:mb-16">
        <table className="w-full min-w-[720px] text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-300/40 bg-gray-700/40 text-xs uppercase tracking-wider text-gray-100">
              <th className="px-3 py-3 sm:px-4">Name</th>
              <th className="px-3 py-3 sm:px-4">Email</th>
              <th className="px-3 py-3 sm:px-4">Phone</th>
              <th className="px-3 py-3 sm:px-4">Date</th>
              <th className="px-3 py-3 sm:px-4">Time</th>
              <th className="px-3 py-3 sm:px-4">Status</th>
              <th className="px-3 py-3 text-right sm:px-4">Action</th>
              <th className="px-3 py-3 text-right sm:px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedReservations?.map((r) => (
              <tr
                key={r.id}
                className="border-b border-gray-300/20 last:border-0"
              >
                <td className="px-3 py-3 text-paper sm:px-4">{r.full_name}</td>
                <td className="px-3 py-3 text-gray-100 sm:px-4">{r.email || '—'}</td>
                <td className="px-3 py-3 text-gray-100 sm:px-4">{r.phone}</td>
                <td className="px-3 py-3 text-paper sm:px-4">{r.day ? String(r.day).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') : '—'}</td>
                <td className="px-3 py-3 text-paper sm:px-4">{r.houre}:00</td>
                <td className="px-3 py-3 sm:px-4">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-[10px] sm:px-3 sm:text-xs uppercase tracking-wider ${
                      r.status === 'confirmed'
                        ? 'bg-paper text-ink'
                        : 'border border-gray-300 text-gray-100'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-right sm:px-3">
                  {r.status === 'confirmed' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUser(null);
                        setSelectedSlot(r);
                        setIsModalOpen(true);
                        console.log('open model cancel slot');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-2 py-1.5 text-[10px] sm:px-3 sm:text-xs uppercase tracking-wider text-paper transition-colors hover:bg-gray-700"
                    >
                      <CloseIcon size={14} />
                      Cancel
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-300 sm:text-xs">—</span>
                  )}
                </td>
                <td className="px-3 py-3 text-right sm:px-4">
                  <button
                    type='button'
                    onClick={() => {
                      setSelectedSlot(null);
                      setSelectedUser(r);
                      setIsModalOpen(true);
                      console.log('open model block user');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-2 py-1.5 text-[10px] sm:px-3 sm:text-xs uppercase tracking-wider text-paper transition-colors hover:bg-gray-700"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )}

  {isModalOpen && (
    <>
      {/* CONFIRMATION MODAL OVERLAY */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        {/* Modal Card */}
        <div className="w-full max-w-md rounded-2xl border border-gray-300/50 bg-gray-700/40 p-5 sm:p-6 backdrop-blur-sm">
          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-paper/10 sm:h-14 sm:w-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-paper sm:hidden"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden text-paper sm:block"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          {/* Title & Message */}
          <h2 className="mt-4 text-center font-display text-base font-semibold uppercase tracking-wide text-paper sm:text-lg">
            Are you sure?
          </h2>
          <p className="mt-2 text-center text-xs text-gray-100 sm:text-sm">
            This action cannot be undone. Please confirm to proceed.
            <br/>
            {selectedSlot && (
              <span className="text-paper">
                You are about to cancel the slot on {selectedSlot.day ? String(selectedSlot.day).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') : '—'} at {selectedSlot.houre}:00.
              </span>
            )}
            {selectedUser && (
              <span className="text-paper">
                You are about to block the user {selectedUser.full_name || '—'} with email {selectedUser.email || '—'} and phone {selectedUser.phone || '—'}.
              </span>
            )}
          </p>

          {/* Buttons */}
          <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedSlot(null);
                setSelectedUser(null);
                setIsModalOpen(false);
              }}
              className="flex-1 rounded-md border border-gray-300/50 bg-gray-700/40 px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-100 transition-colors hover:border-paper hover:text-paper"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if(selectedUser){
                  handleBlockUser()
                }else{
                  handleCancel()
                }
              }}
              className="flex-1 rounded-md bg-paper px-4 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.02]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  )}
</div>
  )
}
