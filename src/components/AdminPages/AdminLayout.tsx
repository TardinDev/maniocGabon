import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Search,
  Bell,
  Home,
  Sprout,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export type AdminPageKey = 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-users'

type AnyPageKey = AdminPageKey | 'accueil' | string

type NavItem = {
  key: AdminPageKey
  label: string
  Icon: LucideIcon
}

const NAV: NavItem[] = [
  { key: 'admin-dashboard', label: 'Tableau de bord', Icon: LayoutDashboard },
  { key: 'admin-products',  label: 'Produits',         Icon: Package },
  { key: 'admin-orders',    label: 'Commandes',        Icon: ShoppingBag },
  { key: 'admin-users',     label: 'Utilisateurs',     Icon: Users },
]

const PAGE_TITLES: Record<AdminPageKey, string> = {
  'admin-dashboard': 'Tableau de bord',
  'admin-products':  'Produits',
  'admin-orders':    'Commandes',
  'admin-users':     'Utilisateurs',
}

type Props = {
  currentPage: AdminPageKey
  onNavigate: (page: AnyPageKey) => void
  children: ReactNode
}

export function AdminLayout({ currentPage, onNavigate, children }: Props) {
  const { user } = useAuth()
  const fullName = user?.user_metadata?.full_name || 'Administrateur'
  const initials = fullName
    .split(' ')
    .map((s: string) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen bg-cream-50 flex">
      <aside className="hidden lg:flex w-60 shrink-0 sticky top-0 h-screen flex-col bg-gradient-to-b from-brand-950 to-brand-900 text-brand-50 ring-1 ring-black/10">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold-500/20 ring-1 ring-gold-500/30 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-gold-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Manioc Gabon</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-200/80">Admin</p>
            </div>
          </div>
        </div>

        <nav aria-label="Navigation administration" className="flex-1 px-3 py-5 space-y-1">
          {NAV.map(({ key, label, Icon }) => {
            const active = currentPage === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => onNavigate(key)}
                aria-current={active ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-white/10 ring-1 ring-white/15 text-white'
                    : 'text-brand-100/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{label}</span>
                {active && (
                  <motion.span
                    layoutId="admin-nav-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400"
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-xs font-semibold text-brand-950">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{fullName}</p>
              <p className="text-[10px] uppercase tracking-wider text-brand-200/70">Admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('accueil')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-xs font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            Retour au site
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-cream-200/70 sticky top-0 z-10">
          <div className="flex items-center gap-4 px-4 lg:px-8 h-16">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-ink-500">Admin</span>
              <span className="text-ink-500">/</span>
              <span className="text-brand-900 font-semibold">{PAGE_TITLES[currentPage]}</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-md ml-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Rechercher…"
                  aria-label="Recherche admin"
                  className="w-full pl-9 pr-3 h-9 rounded-lg bg-cream-50 ring-1 ring-cream-200 focus:ring-brand-500/40 focus:bg-white outline-none text-sm placeholder:text-ink-500"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-cream-100 transition-colors"
              >
                <Bell className="w-4 h-4 text-ink-700" aria-hidden="true" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-clay-500" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
