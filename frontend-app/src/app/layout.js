// import { Analytics } from '@vercel/analytics/next'
import { Inter, Oswald } from 'next/font/google'
import { AppProvider } from '../lib/AppContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata = {
  title: 'BarberFlex — Premium Barber Experience',
  description:
    'Book your slot in seconds at BarberFlex. Walk in fresh, walk out sharper. Premium cuts, beard trims and full grooming.',
}

export const viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} bg-background`}>
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
        {/* {process.env.NODE_ENV === 'production' && <Analytics />} */}
      </body>
    </html>
  )
}
