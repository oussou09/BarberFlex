import AdminCsrfChecker from '../../components/admin/AdminCsrfChecker'
import AdminNav from '../../components/admin/admin-nav'
import DeviceChecker from '../../lib/DeviceChecker'


export const metadata = {
  title: 'Admin — BarberFlex',
  description: 'BarberFlex admin panel for managing reservations and blocked users.',
}

export default async function AdminLayout({ children }) {
    const isMobile = await DeviceChecker();

  return (
    <div className="min-h-screen bg-ink">
        <AdminCsrfChecker>
          <AdminNav />
          <div className="mx-auto max-w-6xl">
          {isMobile ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center px-4">
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-lg text-gray-400">
                Please use a desktop device to access the admin panel for managing reservations and blocked users.
              </p>
            </div>
          ) : (
            children
          )}
          </div>
        </AdminCsrfChecker>
    </div>
  )
}
