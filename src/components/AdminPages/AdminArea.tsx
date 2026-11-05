import { AdminDashboard } from './AdminDashboard'
import { ProductsManagement } from './ProductsManagement'
import { OrdersManagement } from './OrdersManagement'
import { UsersManagement } from './UsersManagement'
import { AdminProtection } from './AdminProtection'
import { AdminLayout } from './AdminLayout'
import type { Page } from '../../lib/routes'

type AdminPage = 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-users'

/** Lazily-loaded admin shell (kept out of the public bundle). */
export default function AdminArea({ currentPage, onNavigate }: { currentPage: AdminPage; onNavigate: (p: Page) => void }) {
  const inner =
    currentPage === 'admin-dashboard' ? <AdminDashboard onNavigate={(p) => onNavigate(p as Page)} /> :
    currentPage === 'admin-products' ? <ProductsManagement /> :
    currentPage === 'admin-orders' ? <OrdersManagement /> :
    <UsersManagement />

  return (
    <AdminProtection onNavigateHome={() => onNavigate('accueil')}>
      <AdminLayout currentPage={currentPage} onNavigate={(p) => onNavigate(p as Page)}>
        {inner}
      </AdminLayout>
    </AdminProtection>
  )
}
