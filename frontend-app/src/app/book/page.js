import { Suspense } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import BookingForm from '../../components/book/booking-form'

export const metadata = {
  title: 'Book Your Slot — BarberFlex',
  description:
    'Choose your day and time, then fill in your details to reserve your chair at BarberFlex.',
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />

      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-100">
            Reservation
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-paper text-balance sm:text-5xl">
            Book Your Slot
          </h1>
          <p className="mt-4 text-gray-100 text-pretty">
            Choose your day and time, then fill in your details.
          </p>

          <div className="mt-12">
            <Suspense
              fallback={
                <p className="text-gray-100">Loading availability…</p>
              }
            >
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
