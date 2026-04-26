import { motion, useReducedMotion } from 'motion/react'
import { Trophy } from 'lucide-react'
import type { TopProduct } from '../../../data/adminMockData'

type Props = {
  products: TopProduct[]
  title?: string
}

const BAR_GRADIENTS = [
  'from-brand-700 to-brand-500',
  'from-brand-600 to-brand-400',
  'from-gold-500 to-gold-400',
  'from-clay-500 to-clay-400',
  'from-slate-600 to-slate-400',
]

export function TopProductsChart({ products, title = 'Top produits' }: Props) {
  const reduce = useReducedMotion()
  const formatFcfa = (v: number) => new Intl.NumberFormat('fr-FR').format(v) + ' FCFA'

  return (
    <div className="bg-white rounded-2xl ring-1 ring-brand-900/5 shadow-sm p-6 h-full">
      <header className="flex items-center gap-2 mb-5">
        <Trophy className="w-4 h-4 text-gold-500" aria-hidden="true" />
        <h3 className="text-base font-semibold text-brand-900">{title}</h3>
      </header>

      <ul className="space-y-4">
        {products.map((p, i) => {
          const gradient = BAR_GRADIENTS[i % BAR_GRADIENTS.length]
          return (
            <li key={p.name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-medium text-brand-900 truncate pr-3">
                  {p.name}
                </span>
                <span className="text-xs text-ink-500 tabular-nums whitespace-nowrap">
                  {formatFcfa(p.revenue)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                  initial={reduce ? { width: `${p.percent}%` } : { width: '0%' }}
                  whileInView={{ width: `${p.percent}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TopProductsChart
