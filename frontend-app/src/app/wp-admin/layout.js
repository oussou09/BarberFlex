import AdminCsrfChecker from '../../components/admin/AdminCsrfChecker'
import AdminNav from '../../components/admin/admin-nav'

export const metadata = {
  title: 'Admin — BarberFlex',
  description: 'BarberFlex admin panel for managing reservations and blocked users.',
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink">
        <AdminCsrfChecker>
          <AdminNav />
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </AdminCsrfChecker>
    </div>
  )
}
