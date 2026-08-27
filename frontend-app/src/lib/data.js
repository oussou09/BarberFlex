/*
 * BarberFlex mock data layer.
 *
 * This module keeps all demo data in memory and exposes helper functions that
 * mimic an async API. To connect a real backend later, replace the bodies of
 * these functions with fetch() calls and keep the same signatures.
 *
 * // TODO: Replace with real API calls to Laravel backend.
 */



// ---- In-memory stores (demo only) -----------------------------------------

let reservations = [
  {
    id: 'r1',
    name: 'Yassine Alami',
    phone: '+212 600-112233',
    email: 'yassine@example.com',
    date: '2026-08-18',
    time: '10:00',
    status: 'Confirmed',
  },
  {
    id: 'r2',
    name: 'Omar Bennani',
    phone: '+212 611-445566',
    email: '',
    date: '2026-08-18',
    time: '15:00',
    status: 'Confirmed',
  },
  {
    id: 'r3',
    name: 'Karim Idrissi',
    phone: '+212 622-778899',
    email: 'karim@example.com',
    date: '2026-08-19',
    time: '12:00',
    status: 'Cancelled',
  },
]

let blockedUsers = [
  {
    id: 'b1',
    phone: '+212 699-000111',
    email: 'noshow@example.com',
    reason: 'Repeated no-shows',
  },
]

// Hours the shop is open. Used to build slot grids.
const OPENING_HOURS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
]

// Deterministic pseudo-random so a given date always shows the same taken slots.
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// ---- Helpers ---------------------------------------------------------------

let idCounter = 1000
function nextId(prefix) {
  idCounter += 1
  return `${prefix}${idCounter}`
}

// Return the next `count` days as { value, label, weekday } objects.
export function getUpcomingDays(count = 7) {
  const days = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    )

    const year = date.getFullYear()
    const monthNumber = String(
      date.getMonth() + 1
    ).padStart(2, '0')
    const dayNumber = String(
      date.getDate()
    ).padStart(2, '0')

    const value =
      `${year}-${monthNumber}-${dayNumber}`

    days.push({
      value,

      weekday: date.toLocaleDateString(
        'en-US',
        { weekday: 'short' }
      ),

      day: date.toLocaleDateString(
        'en-US',
        { day: '2-digit' }
      ),

      month: date.toLocaleDateString(
        'en-US',
        { month: 'short' }
      ),

      isToday: i === 0,
      isTomorrow: i === 1,
    })
  }

  return days
}


// TODO: Replace with real API call to Laravel backend.
// export function createReservation(reservation) {
//   const record = {
//     id: nextId('r'),
//     status: 'Confirmed',
//     ...reservation,
//   }
//   reservations = [record, ...reservations]
//   return record
// }

// TODO: Replace with real API call to Laravel backend.
// export function getReservations() {
//   return [...reservations]
// }

// TODO: Replace with real API call to Laravel backend.
export function cancelReservation(id) {
  reservations = reservations.map((r) =>
    r.id === id ? { ...r, status: 'Cancelled' } : r,
  )
  return getReservations()
}

// TODO: Replace with real API call to Laravel backend.
export function getBlockedUsers() {
  return [...blockedUsers]
}

// TODO: Replace with real API call to Laravel backend.
export function blockUser(user) {
  const record = { id: nextId('b'), ...user }
  blockedUsers = [record, ...blockedUsers]
  return record
}

// TODO: Replace with real API call to Laravel backend.
export function unblockUser(id) {
  blockedUsers = blockedUsers.filter((u) => u.id !== id)
  return getBlockedUsers()
}

// Static service + benefit content used across pages.
export const SERVICES = [
  {
    name: 'Classic Haircut',
    price: '120 MAD',
    description: 'Precision cut and style tailored to your face shape.',
    icon: 'scissors',
  },
  {
    name: 'Beard Trim',
    price: '70 MAD',
    description: 'Sharp lines, hot towel and beard oil finish.',
    icon: 'razor',
  },
  {
    name: 'Full Service',
    price: '180 MAD',
    description: 'Haircut, beard sculpt and styling in one session.',
    icon: 'crown',
  },
  {
    name: 'Kids Cut',
    price: '80 MAD',
    description: 'Patient, friendly cuts for the younger gentlemen.',
    icon: 'star',
  },
]

export const BENEFITS = [
  {
    title: 'Experienced Barbers',
    description: 'A team with years behind the chair and a steady hand.',
    icon: 'award',
  },
  {
    title: 'Premium Products',
    description: 'Only top-grade grooming products touch your hair and skin.',
    icon: 'bottle',
  },
  {
    title: 'Relaxed Atmosphere',
    description: 'Sit back, unwind and enjoy the ritual of a proper cut.',
    icon: 'sofa',
  },
  {
    title: 'Easy Online Booking',
    description: 'Reserve your slot in seconds, any time of the day.',
    icon: 'calendar',
  },
]
