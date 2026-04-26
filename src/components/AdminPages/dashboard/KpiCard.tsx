import { motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AnimatedNumber } from '../../ui/AnimatedNumber'

type Accent = 'gold' | 'emerald' | 'orange' | 'red' | 'slate'

const accentStyles: Record<Accent, { iconBg: string; iconRing: string; iconColor: string; valueColor: string }> = {
  gold:    { iconBg: 'bg-gold-500/10',     iconRing: 'ring-gold-500/20',    iconColor: 'text-gold-600',    valueColor: 'text-brand-900' },
  emerald: { iconBg: 'bg-brand-500/10',    iconRing: 'ring-brand-500/20',   iconColor: 'text-brand-700',   valueColor: 'text-brand-900' },
  orange:  { iconBg: 'bg-orange-500/10',   iconRing: 'ring-orange-500/20',  iconColor: 'text-orange-600',  valueColor: 'text-orange-700' },
  red:     { iconBg: 'bg-red-500/10',      iconRing: 'ring-red-500/20',     iconColor: 'text-red-600',     valueColor: 'text-red-700' },
  slate:   { iconBg: 'bg-slate-500/10',    iconRing: 'ring-slate-500/20',   iconColor: 'text-slate-600',   valueColor: 'text-slate-800' },
}

type Props = {
  label: string
  value: number
  prefix?: string
  suffix?: string
  Icon: LucideIcon
  accent: Accent
  footer?: ReactNode
}

export function KpiCard({ label, value, prefix, suffix, Icon, accent, footer }: Props) {
  const reduce = useReducedMotion()
  const a = accentStyles[accent]

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl ring-1 ring-brand-900/5 shadow-sm hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-medium text-ink-500 uppercase tracking-wider">{label}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 ${a.iconBg} ${a.iconRing}`}>
          <Icon className={`w-5 h-5 ${a.iconColor}`} aria-hidden="true" />
        </div>
      </div>
      <p className={`text-3xl font-bold ${a.valueColor}`}>
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
      </p>
      {footer && <div className="mt-4 text-sm">{footer}</div>}
    </motion.article>
  )
}

export default KpiCard
