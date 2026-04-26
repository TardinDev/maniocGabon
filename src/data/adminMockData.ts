// Mock data for the admin dashboard.
// Replace the exports below with Supabase-backed hooks
// (useAdminStats, useRevenueSeries, etc.) preserving the same shapes.

export type AdminStats = {
  revenue: { total: number; lastWeek: number; deltaPct: number }
  orders: { total: number; pending: number }
  users: { total: number; newThisWeek: number; deltaPct: number }
  products: { total: number; outOfStock: number }
}

export type RevenuePoint = { date: string; value: number }

export type TopProduct = { name: string; revenue: number; percent: number }

export type ActivityType = 'order' | 'signup' | 'stock' | 'product'
export type ActivityAccent = 'emerald' | 'orange' | 'red' | 'slate' | 'gold'
export type ActivityItem = {
  id: string
  type: ActivityType
  label: string
  detail?: string
  timestamp: string
  accent: ActivityAccent
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
export type RecentOrder = {
  id: string
  customer: string
  customerInitials: string
  total: number
  status: OrderStatus
  createdAt: string
}

export const adminStats: AdminStats = {
  revenue: { total: 2_450_000, lastWeek: 185_000, deltaPct: 12 },
  orders: { total: 89, pending: 7 },
  users: { total: 156, newThisWeek: 23, deltaPct: 18 },
  products: { total: 12, outOfStock: 2 },
}

export const revenueSeries30d: RevenuePoint[] = [
  { date: '2026-03-28', value: 42_000 },
  { date: '2026-03-29', value: 58_000 },
  { date: '2026-03-30', value: 31_000 },
  { date: '2026-03-31', value: 36_000 },
  { date: '2026-04-01', value: 45_000 },
  { date: '2026-04-02', value: 48_000 },
  { date: '2026-04-03', value: 52_000 },
  { date: '2026-04-04', value: 67_000 },
  { date: '2026-04-05', value: 72_000 },
  { date: '2026-04-06', value: 38_000 },
  { date: '2026-04-07', value: 41_000 },
  { date: '2026-04-08', value: 49_000 },
  { date: '2026-04-09', value: 55_000 },
  { date: '2026-04-10', value: 61_000 },
  { date: '2026-04-11', value: 78_000 },
  { date: '2026-04-12', value: 89_000 },
  { date: '2026-04-13', value: 44_000 },
  { date: '2026-04-14', value: 51_000 },
  { date: '2026-04-15', value: 58_000 },
  { date: '2026-04-16', value: 63_000 },
  { date: '2026-04-17', value: 71_000 },
  { date: '2026-04-18', value: 95_000 },
  { date: '2026-04-19', value: 102_000 },
  { date: '2026-04-20', value: 49_000 },
  { date: '2026-04-21', value: 54_000 },
  { date: '2026-04-22', value: 62_000 },
  { date: '2026-04-23', value: 68_000 },
  { date: '2026-04-24', value: 74_000 },
  { date: '2026-04-25', value: 88_000 },
  { date: '2026-04-26', value: 96_000 },
]

export const topProducts: TopProduct[] = [
  { name: 'Farine de Manioc Bio', revenue: 980_000, percent: 40 },
  { name: 'Chips de Manioc',       revenue: 612_500, percent: 25 },
  { name: 'Tubercules Frais',      revenue: 441_000, percent: 18 },
  { name: 'Tapioca Premium',       revenue: 245_000, percent: 10 },
  { name: 'Manioc Fermenté',       revenue: 171_500, percent:  7 },
]

export const recentActivity: ActivityItem[] = [
  { id: 'a1',  type: 'order',   label: 'Nouvelle commande #1247',           detail: 'Aïssa M. — 18 500 FCFA',           timestamp: '2026-04-26T20:42:00Z', accent: 'emerald' },
  { id: 'a2',  type: 'signup',  label: 'Nouveau client',                    detail: 'Pascal Owono',                      timestamp: '2026-04-26T19:05:00Z', accent: 'gold' },
  { id: 'a3',  type: 'stock',   label: 'Stock faible — Tubercules Frais',   detail: '3 unités restantes',                timestamp: '2026-04-26T17:18:00Z', accent: 'orange' },
  { id: 'a4',  type: 'order',   label: 'Commande payée #1246',              detail: 'Marie L. — 24 000 FCFA',            timestamp: '2026-04-26T15:51:00Z', accent: 'emerald' },
  { id: 'a5',  type: 'stock',   label: 'Rupture — Manioc Fermenté',         detail: '0 unité',                            timestamp: '2026-04-26T14:33:00Z', accent: 'red' },
  { id: 'a6',  type: 'product', label: 'Produit mis à jour',                detail: 'Farine de Manioc Bio — prix +500',  timestamp: '2026-04-26T11:20:00Z', accent: 'slate' },
  { id: 'a7',  type: 'order',   label: 'Commande expédiée #1244',           detail: 'Jean-Baptiste E.',                  timestamp: '2026-04-26T09:47:00Z', accent: 'slate' },
  { id: 'a8',  type: 'signup',  label: 'Nouveau client',                    detail: 'Clémence Mba',                       timestamp: '2026-04-25T22:14:00Z', accent: 'gold' },
]

export const recentOrders: RecentOrder[] = [
  { id: '1247', customer: 'Aïssa Mba',           customerInitials: 'AM', total: 18_500, status: 'pending',   createdAt: '2026-04-26T20:42:00Z' },
  { id: '1246', customer: 'Marie Lendoye',       customerInitials: 'ML', total: 24_000, status: 'paid',      createdAt: '2026-04-26T15:51:00Z' },
  { id: '1245', customer: 'Bertrand Ondo',       customerInitials: 'BO', total:  9_500, status: 'paid',      createdAt: '2026-04-26T12:08:00Z' },
  { id: '1244', customer: 'Jean-Baptiste Eyene', customerInitials: 'JE', total: 32_000, status: 'shipped',   createdAt: '2026-04-26T09:47:00Z' },
  { id: '1243', customer: 'Clémence Mba',        customerInitials: 'CM', total: 14_750, status: 'delivered', createdAt: '2026-04-25T18:22:00Z' },
]
