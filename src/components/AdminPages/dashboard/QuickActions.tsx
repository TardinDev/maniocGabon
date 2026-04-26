import { motion, useReducedMotion } from 'motion/react'
import { Package, ShoppingBag, Users, BarChart3, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type AdminPage = 'admin-products' | 'admin-orders' | 'admin-users' | 'admin-dashboard'

type Action = {
  page: AdminPage
  title: string
  desc: string
  Icon: LucideIcon
  iconClass: string
  badgeBg: string
}

const ACTIONS: Action[] = [
  { page: 'admin-products',  title: 'Ajouter un produit',     desc: 'Nouveau produit au catalogue', Icon: Package,     iconClass: 'text-brand-700',  badgeBg: 'bg-brand-500/10' },
  { page: 'admin-orders',    title: 'Voir les commandes',     desc: 'Gérer les commandes clients',  Icon: ShoppingBag, iconClass: 'text-clay-500',   badgeBg: 'bg-clay-400/10' },
  { page: 'admin-users',     title: 'Gérer les utilisateurs', desc: 'Administration des comptes',   Icon: Users,       iconClass: 'text-gold-600',   badgeBg: 'bg-gold-500/10' },
  { page: 'admin-dashboard', title: 'Voir les statistiques',  desc: 'Rapports et analyses',         Icon: BarChart3,   iconClass: 'text-orange-600', badgeBg: 'bg-orange-500/10' },
]

type Props = {
  onNavigate: (page: AdminPage) => void
  title?: string
}

export function QuickActions({ onNavigate, title = 'Actions rapides' }: Props) {
  const reduce = useReducedMotion()
  return (
    <div className="bg-white rounded-2xl ring-1 ring-brand-900/5 shadow-sm p-6">
      <h3 className="text-base font-semibold text-brand-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACTIONS.map((a) => (
          <motion.button
            key={a.page}
            type="button"
            onClick={() => onNavigate(a.page)}
            whileHover={reduce ? undefined : { y: -2 }}
            transition={{ duration: 0.2 }}
            className="group text-left p-4 rounded-xl ring-1 ring-brand-900/5 hover:ring-brand-500/30 hover:bg-cream-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.badgeBg}`}>
                <a.Icon className={`w-5 h-5 ${a.iconClass}`} aria-hidden="true" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-500 group-hover:text-brand-700 transition-colors" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-brand-900">{a.title}</p>
            <p className="text-xs text-ink-500 mt-0.5">{a.desc}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
