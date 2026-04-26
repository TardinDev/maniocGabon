import { motion } from 'motion/react'
import { ShoppingBag, UserPlus, AlertTriangle, Package, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ActivityAccent, ActivityItem, ActivityType } from '../../../data/adminMockData'

const ICON_BY_TYPE: Record<ActivityType, LucideIcon> = {
  order:   ShoppingBag,
  signup:  UserPlus,
  stock:   AlertTriangle,
  product: Package,
}

const ACCENT_CLASSES: Record<ActivityAccent, { dot: string; ring: string }> = {
  emerald: { dot: 'bg-brand-500',  ring: 'ring-brand-500/30' },
  orange:  { dot: 'bg-orange-500', ring: 'ring-orange-500/30' },
  red:     { dot: 'bg-red-500',    ring: 'ring-red-500/30' },
  gold:    { dot: 'bg-gold-500',   ring: 'ring-gold-500/30' },
  slate:   { dot: 'bg-slate-500',  ring: 'ring-slate-500/30' },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

type Props = { items: ActivityItem[]; title?: string }

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "à l'instant"
  if (mins < 60) return `il y a ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  return `il y a ${days} j`
}

export function ActivityFeed({ items, title = 'Activité récente' }: Props) {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-brand-900/5 shadow-sm p-6 h-full">
      <header className="flex items-center gap-2 mb-5">
        <Activity className="w-4 h-4 text-brand-700" aria-hidden="true" />
        <h3 className="text-base font-semibold text-brand-900">{title}</h3>
      </header>

      <motion.ol
        className="relative space-y-4"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {items.map((item) => {
          const Icon = ICON_BY_TYPE[item.type]
          const a = ACCENT_CLASSES[item.accent]
          return (
            <motion.li
              key={item.id}
              variants={fadeUp}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-3"
            >
              <div className={`relative shrink-0 w-9 h-9 rounded-full bg-cream-50 flex items-center justify-center ring-1 ${a.ring}`}>
                <Icon className="w-4 h-4 text-ink-700" aria-hidden="true" />
                <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${a.dot} ring-2 ring-white`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-brand-900 truncate">{item.label}</p>
                {item.detail && <p className="text-xs text-ink-500 truncate">{item.detail}</p>}
              </div>
              <time className="text-xs text-ink-500 whitespace-nowrap pt-1" dateTime={item.timestamp}>
                {timeAgo(item.timestamp)}
              </time>
            </motion.li>
          )
        })}
      </motion.ol>
    </div>
  )
}

export default ActivityFeed
