import { motion } from 'motion/react'
import type { OrderStatus, RecentOrder } from '../../../data/adminMockData'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending:   'En attente',
  paid:      'Payée',
  shipped:   'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
}

const STATUS_CLASS: Record<OrderStatus, string> = {
  pending:   'bg-orange-500/10 text-orange-700 ring-orange-500/20',
  paid:      'bg-brand-500/10  text-brand-700  ring-brand-500/20',
  shipped:   'bg-gold-500/10   text-gold-600   ring-gold-500/20',
  delivered: 'bg-slate-500/10  text-slate-700  ring-slate-500/20',
  cancelled: 'bg-red-500/10    text-red-700    ring-red-500/20',
}

const formatFcfa = (v: number) => new Intl.NumberFormat('fr-FR').format(v) + ' FCFA'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return "il y a moins d'1 h"
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  return `il y a ${days} j`
}

type Props = { orders: RecentOrder[]; title?: string; onSeeAll?: () => void }

export function RecentOrdersTable({ orders, title = 'Commandes récentes', onSeeAll }: Props) {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-brand-900/5 shadow-sm overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-cream-100">
        <h3 className="text-base font-semibold text-brand-900">{title}</h3>
        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-sm text-brand-700 hover:text-brand-900 font-medium"
          >
            Voir toutes →
          </button>
        )}
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-ink-500 bg-cream-50/60">
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Commande</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Statut</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {orders.map((o) => (
              <motion.tr
                key={o.id}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-cream-100 hover:bg-cream-50/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-white flex items-center justify-center text-xs font-semibold">
                      {o.customerInitials}
                    </div>
                    <span className="font-medium text-brand-900">{o.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-ink-700 tabular-nums">#{o.id}</td>
                <td className="px-6 py-4 text-brand-900 font-semibold tabular-nums">{formatFcfa(o.total)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ${STATUS_CLASS[o.status]}`}>
                    {STATUS_LABEL[o.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-ink-500 whitespace-nowrap">{timeAgo(o.createdAt)}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrdersTable
