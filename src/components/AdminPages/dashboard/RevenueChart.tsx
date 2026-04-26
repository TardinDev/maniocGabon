import { motion, useInView, useReducedMotion } from 'motion/react'
import { useMemo, useRef } from 'react'
import { TrendingUp } from 'lucide-react'
import type { RevenuePoint } from '../../../data/adminMockData'

type Props = {
  series: RevenuePoint[]
  title?: string
  subtitle?: string
}

const W = 600
const H = 220
const PAD_X = 16
const PAD_Y = 16

export function RevenueChart({ series, title = 'Revenus 30 jours', subtitle }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const { linePath, areaPath, max, lastValue } = useMemo(() => {
    if (series.length === 0) {
      return { linePath: '', areaPath: '', max: 0, lastValue: 0 }
    }
    const values = series.map((p) => p.value)
    const max = Math.max(...values) * 1.1
    const min = 0
    const stepX = (W - PAD_X * 2) / (series.length - 1)
    const points = series.map((p, i) => {
      const x = PAD_X + i * stepX
      const y = PAD_Y + (H - PAD_Y * 2) * (1 - (p.value - min) / (max - min || 1))
      return { x, y }
    })
    const linePath = points
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
      .join(' ')
    const areaPath =
      `M ${points[0].x.toFixed(2)} ${(H - PAD_Y).toFixed(2)} ` +
      points.map((pt) => `L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(' ') +
      ` L ${points[points.length - 1].x.toFixed(2)} ${(H - PAD_Y).toFixed(2)} Z`
    return { linePath, areaPath, max, lastValue: values[values.length - 1] }
  }, [series])

  const formatFcfa = (v: number) => new Intl.NumberFormat('fr-FR').format(v) + ' FCFA'

  return (
    <div ref={ref} className="bg-white rounded-2xl ring-1 ring-brand-900/5 shadow-sm p-6">
      <header className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-brand-900">{title}</h3>
          {subtitle && <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 text-brand-700 font-medium">
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            {formatFcfa(lastValue)}
          </span>
        </div>
      </header>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Évolution des revenus sur ${series.length} jours`}>
        <defs>
          <linearGradient id="revenue-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F7A4C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1F7A4C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="revenue-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#15603C" />
            <stop offset="100%" stopColor="#CA9E2E" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((t) => {
          const y = PAD_Y + (H - PAD_Y * 2) * t
          return (
            <line
              key={t}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={y}
              y2={y}
              stroke="#0B1B14"
              strokeOpacity="0.06"
              strokeDasharray="3 4"
            />
          )
        })}

        <motion.path
          d={areaPath}
          fill="url(#revenue-area)"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#revenue-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <p className="sr-only">Pic du mois : {formatFcfa(max / 1.1)}</p>
    </div>
  )
}

export default RevenueChart
