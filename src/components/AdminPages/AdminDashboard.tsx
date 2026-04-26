import { motion } from 'motion/react'
import { Banknote, ShoppingBag, UserPlus, AlertTriangle, TrendingUp, Clock } from 'lucide-react'
import { KpiCard } from './dashboard/KpiCard'
import { RevenueChart } from './dashboard/RevenueChart'
import { TopProductsChart } from './dashboard/TopProductsChart'
import { ActivityFeed } from './dashboard/ActivityFeed'
import { QuickActions } from './dashboard/QuickActions'
import type { AdminPage } from './dashboard/QuickActions'
import { RecentOrdersTable } from './dashboard/RecentOrdersTable'
import {
  adminStats,
  revenueSeries30d,
  topProducts,
  recentActivity,
  recentOrders,
} from '../../data/adminMockData'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

type Props = {
  onNavigate?: (page: AdminPage | 'accueil') => void
}

export function AdminDashboard({ onNavigate }: Props = {}) {
  const navigate = onNavigate ?? (() => {})

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brand-950 tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-ink-500 mt-1">Aperçu de votre activité — données simulées</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-500">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Mis à jour à l'instant</span>
        </div>
      </header>

      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
        aria-label="Indicateurs clés"
      >
        <motion.div variants={fadeUp}>
          <KpiCard
            label="Revenu total"
            value={adminStats.revenue.total}
            suffix=" FCFA"
            Icon={Banknote}
            accent="gold"
            footer={
              <span className="inline-flex items-center gap-1 text-brand-700 font-medium">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                +{adminStats.revenue.deltaPct}%
                <span className="text-ink-500 font-normal ml-1">vs sem. précédente</span>
              </span>
            }
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard
            label="Commandes en attente"
            value={adminStats.orders.pending}
            Icon={ShoppingBag}
            accent="orange"
            footer={
              <button
                type="button"
                onClick={() => navigate('admin-orders')}
                className="text-orange-700 hover:text-orange-800 font-medium"
              >
                Traiter →
              </button>
            }
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard
            label="Nouveaux clients (7j)"
            value={adminStats.users.newThisWeek}
            Icon={UserPlus}
            accent="emerald"
            footer={
              <span className="inline-flex items-center gap-1 text-brand-700 font-medium">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                +{adminStats.users.deltaPct}%
                <span className="text-ink-500 font-normal ml-1">vs sem. précédente</span>
              </span>
            }
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard
            label="Stock — alertes"
            value={adminStats.products.outOfStock}
            Icon={AlertTriangle}
            accent={adminStats.products.outOfStock > 0 ? 'red' : 'slate'}
            footer={
              <span className="text-ink-500">
                sur {adminStats.products.total} produits
              </span>
            }
          />
        </motion.div>
      </motion.section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart series={revenueSeries30d} subtitle="30 derniers jours" />
        </div>
        <div>
          <TopProductsChart products={topProducts} />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ActivityFeed items={recentActivity} />
        <QuickActions onNavigate={(p) => navigate(p)} />
      </section>

      <section>
        <RecentOrdersTable
          orders={recentOrders}
          onSeeAll={() => navigate('admin-orders')}
        />
      </section>
    </div>
  )
}

export default AdminDashboard
