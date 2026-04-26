# Admin Dashboard Refonte Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain admin dashboard with a polished sidebar-based layout (KPIs + animated charts + activity feed + recent orders) using mocked data, while leaving the door open for a Supabase data branchement in a later session.

**Architecture:** Introduce an `AdminLayout` shell (sidebar + topbar) that wraps all 4 admin routes. The dashboard page becomes a thin composer of 6 small section components living under `dashboard/`. All data comes from a single mock module `src/data/adminMockData.ts` whose typed shape will later be implemented by real Supabase hooks without UI changes.

**Tech Stack:** React 19, TypeScript, Tailwind v4 (custom theme tokens: `brand-*`, `gold-*`, `cream-*`, `ink-*`), `motion` (formerly framer-motion), `lucide-react` icons. No router, no chart library — SVG charts hand-rolled.

**Verification model:** This project has no test infrastructure (only `dev`/`build`/`lint`/`preview` scripts). Per task, verification = TypeScript type-check (`npx tsc -b --noEmit`) + lint (`npx eslint <files>`). Final task = full build (`npm run build`) + manual visual check via dev server.

---

## File Structure

**New files:**
- `src/components/ui/AnimatedNumber.tsx` — extracted reusable count-up component
- `src/data/adminMockData.ts` — typed mock dataset
- `src/components/AdminPages/AdminLayout.tsx` — sidebar + topbar shell
- `src/components/AdminPages/dashboard/KpiCard.tsx`
- `src/components/AdminPages/dashboard/RevenueChart.tsx`
- `src/components/AdminPages/dashboard/TopProductsChart.tsx`
- `src/components/AdminPages/dashboard/ActivityFeed.tsx`
- `src/components/AdminPages/dashboard/QuickActions.tsx`
- `src/components/AdminPages/dashboard/RecentOrdersTable.tsx`

**Modified files:**
- `src/components/CulturePage/CulturePage.tsx` — import `AnimatedNumber` from `ui/`
- `src/components/AdminPages/AdminDashboard.tsx` — full rewrite as composer
- `src/components/AdminPages/index.ts` — add `AdminLayout` export
- `src/App.tsx` — wrap 4 admin pages in `<AdminLayout>`

**Color tokens used (from `src/App.css` `@theme`):**
- `brand-50` … `brand-950` — emerald scale
- `gold-300/400/500/600` — primary CTA accent (`#CA9E2E` is `gold-500`)
- `clay-400/500` — terracotta secondary accent
- `cream-50/100/200` — backgrounds
- `ink-500/700/900` — text

Tailwind defaults (`emerald-*`, `slate-*`, `orange-*`, `red-*`, `amber-*`, `blue-*`, `purple-*`) remain available and are used where the spec already references them.

---

## Task 1: Extract `AnimatedNumber` to a shared `ui/` component

This component is currently inline in `src/components/CulturePage/CulturePage.tsx` (lines 28-46). The KPI cards in the new dashboard need it too. Extract first so later tasks can import without circular concerns.

**Files:**
- Create: `src/components/ui/AnimatedNumber.tsx`
- Modify: `src/components/CulturePage/CulturePage.tsx`

- [ ] **Step 1: Create the extracted component**

Write `src/components/ui/AnimatedNumber.tsx`:

```tsx
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  /** Locale used for digit grouping. Default 'fr-FR'. */
  locale?: string
  /** Spring stiffness — higher = snappier. */
  stiffness?: number
  /** Spring damping. */
  damping?: number
}

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  locale = 'fr-FR',
  stiffness = 80,
  damping = 20,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? value : 0)
  const spring = useSpring(mv, { stiffness, damping })
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString(locale))

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  )
}

export default AnimatedNumber
```

- [ ] **Step 2: Update `CulturePage.tsx` to import the shared component**

Edit `src/components/CulturePage/CulturePage.tsx`:

Replace the import block at lines 1-2 (the `motion/react` imports stay, just remove the unused ones):

```tsx
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { AnimatedNumber } from '../ui/AnimatedNumber'
```

(Keep `useRef` only if it's still used elsewhere — at the time of writing it isn't used outside the `AnimatedNumber` function, so the line `import { useEffect, useRef } from 'react'` becomes unnecessary. After this task `CulturePage.tsx` should no longer import `useEffect`, `useMotionValue`, `useSpring`, or `useTransform`. Verify the imports tree-shake cleanly.)

Then delete lines 28-46 (the inline `AnimatedNumber` function definition). The JSX usages of `<AnimatedNumber value={...} suffix={...} />` already match the new component's API and need no changes.

- [ ] **Step 3: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 4: Lint the changed files**

Run:
```bash
npx eslint src/components/ui/AnimatedNumber.tsx src/components/CulturePage/CulturePage.tsx
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AnimatedNumber.tsx src/components/CulturePage/CulturePage.tsx
git commit -m "refactor: extract AnimatedNumber to shared ui/ component"
```

---

## Task 2: Create the typed mock-data module

Single source of truth for all admin dashboard data. The shape is the contract: a future Supabase session replaces this module with hooks returning the same shape.

**Files:**
- Create: `src/data/adminMockData.ts`

- [ ] **Step 1: Write the module**

Create `src/data/adminMockData.ts`:

```ts
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
  timestamp: string // ISO 8601
  accent: ActivityAccent
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
export type RecentOrder = {
  id: string
  customer: string
  customerInitials: string
  total: number
  status: OrderStatus
  createdAt: string // ISO 8601
}

export const adminStats: AdminStats = {
  revenue: { total: 2_450_000, lastWeek: 185_000, deltaPct: 12 },
  orders: { total: 89, pending: 7 },
  users: { total: 156, newThisWeek: 23, deltaPct: 18 },
  products: { total: 12, outOfStock: 2 },
}

// 30-day revenue series — realistic small artisanal-shop pattern with mild
// weekly seasonality (slight uptick on weekends) and one mid-cycle spike.
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
  { id: '1247', customer: 'Aïssa Mba',          customerInitials: 'AM', total: 18_500, status: 'pending',   createdAt: '2026-04-26T20:42:00Z' },
  { id: '1246', customer: 'Marie Lendoye',      customerInitials: 'ML', total: 24_000, status: 'paid',      createdAt: '2026-04-26T15:51:00Z' },
  { id: '1245', customer: 'Bertrand Ondo',      customerInitials: 'BO', total:  9_500, status: 'paid',      createdAt: '2026-04-26T12:08:00Z' },
  { id: '1244', customer: 'Jean-Baptiste Eyene', customerInitials: 'JE', total: 32_000, status: 'shipped',   createdAt: '2026-04-26T09:47:00Z' },
  { id: '1243', customer: 'Clémence Mba',       customerInitials: 'CM', total: 14_750, status: 'delivered', createdAt: '2026-04-25T18:22:00Z' },
]
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/adminMockData.ts
git commit -m "feat(admin): add typed mock data module for dashboard"
```

---

## Task 3: Build `KpiCard`

Generic KPI card used 4 times in the dashboard hero row. Pulls in `AnimatedNumber` from Task 1.

**Files:**
- Create: `src/components/AdminPages/dashboard/KpiCard.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/dashboard/KpiCard.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
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
  /** Footer line — e.g. delta or CTA. Pass JSX. */
  footer?: React.ReactNode
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminPages/dashboard/KpiCard.tsx
git commit -m "feat(admin): add KpiCard component"
```

---

## Task 4: Build `RevenueChart` (custom SVG area chart)

30-day area chart, hand-rolled SVG. Animated path drawing on first scroll-into-view.

**Files:**
- Create: `src/components/AdminPages/dashboard/RevenueChart.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/dashboard/RevenueChart.tsx`:

```tsx
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

  const formatFcfa = (v: number) =>
    new Intl.NumberFormat('fr-FR').format(v) + ' FCFA'

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

        {/* Y grid (3 lines) */}
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminPages/dashboard/RevenueChart.tsx
git commit -m "feat(admin): add RevenueChart with animated SVG area chart"
```

---

## Task 5: Build `TopProductsChart`

Bar list (5 rows) with progress bars animated from 0 → target percentage.

**Files:**
- Create: `src/components/AdminPages/dashboard/TopProductsChart.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/dashboard/TopProductsChart.tsx`:

```tsx
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
  const formatFcfa = (v: number) =>
    new Intl.NumberFormat('fr-FR').format(v) + ' FCFA'

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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminPages/dashboard/TopProductsChart.tsx
git commit -m "feat(admin): add TopProductsChart with animated progress bars"
```

---

## Task 6: Build `ActivityFeed`

Timeline of the 8 most recent admin-relevant events.

**Files:**
- Create: `src/components/AdminPages/dashboard/ActivityFeed.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/dashboard/ActivityFeed.tsx`:

```tsx
import { motion } from 'motion/react'
import { ShoppingBag, UserPlus, AlertTriangle, Package, Activity } from 'lucide-react'
import type { ActivityAccent, ActivityItem, ActivityType } from '../../../data/adminMockData'

const ICON_BY_TYPE: Record<ActivityType, typeof ShoppingBag> = {
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminPages/dashboard/ActivityFeed.tsx
git commit -m "feat(admin): add ActivityFeed timeline component"
```

---

## Task 7: Build `QuickActions`

4-card grid of admin shortcuts. Calls a passed-in `onNavigate` to switch admin pages.

**Files:**
- Create: `src/components/AdminPages/dashboard/QuickActions.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/dashboard/QuickActions.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import { Package, ShoppingBag, Users, BarChart3, ArrowUpRight } from 'lucide-react'

export type AdminPage = 'admin-products' | 'admin-orders' | 'admin-users' | 'admin-dashboard'

type Action = {
  page: AdminPage
  title: string
  desc: string
  Icon: typeof Package
  iconClass: string
  badgeBg: string
}

const ACTIONS: Action[] = [
  { page: 'admin-products', title: 'Ajouter un produit',   desc: 'Nouveau produit au catalogue',  Icon: Package,     iconClass: 'text-brand-700',  badgeBg: 'bg-brand-500/10' },
  { page: 'admin-orders',   title: 'Voir les commandes',   desc: 'Gérer les commandes clients',   Icon: ShoppingBag, iconClass: 'text-clay-500',   badgeBg: 'bg-clay-400/10' },
  { page: 'admin-users',    title: 'Gérer les utilisateurs', desc: 'Administration des comptes',  Icon: Users,       iconClass: 'text-gold-600',   badgeBg: 'bg-gold-500/10' },
  { page: 'admin-dashboard', title: 'Voir les statistiques', desc: 'Rapports et analyses',        Icon: BarChart3,   iconClass: 'text-orange-600', badgeBg: 'bg-orange-500/10' },
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminPages/dashboard/QuickActions.tsx
git commit -m "feat(admin): add QuickActions card grid"
```

---

## Task 8: Build `RecentOrdersTable`

Modern table with avatar, ID, total, status pill, relative date.

**Files:**
- Create: `src/components/AdminPages/dashboard/RecentOrdersTable.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/dashboard/RecentOrdersTable.tsx`:

```tsx
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AdminPages/dashboard/RecentOrdersTable.tsx
git commit -m "feat(admin): add RecentOrdersTable component"
```

---

## Task 9: Build `AdminLayout` (sidebar + topbar shell)

Persistent shell wrapping the 4 admin pages. Accepts `currentPage` and `onNavigate` (mirrors `App.tsx` page-state pattern).

**Files:**
- Create: `src/components/AdminPages/AdminLayout.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AdminPages/AdminLayout.tsx`:

```tsx
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
import { useAuth } from '../../hooks/useAuth'

export type AdminPageKey = 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-users'

type AnyPageKey = AdminPageKey | 'accueil' | string

type NavItem = {
  key: AdminPageKey
  label: string
  Icon: typeof LayoutDashboard
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
      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 sticky top-0 h-screen flex-col bg-gradient-to-b from-brand-950 to-brand-900 text-brand-50 ring-1 ring-black/10">
        {/* Brand */}
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

        {/* Nav */}
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
                <Icon className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
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

        {/* Footer */}
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

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
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
                <Bell className="w-4.5 h-4.5 text-ink-700" aria-hidden="true" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-clay-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Page outlet */}
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Lint**

Run:
```bash
npx eslint src/components/AdminPages/AdminLayout.tsx
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AdminPages/AdminLayout.tsx
git commit -m "feat(admin): add AdminLayout sidebar+topbar shell"
```

---

## Task 10: Rewrite `AdminDashboard` as a thin composer

Replaces the entire current `AdminDashboard.tsx` body. New file imports the 6 dashboard sections and the mock data, lays them out in the bento grid described in spec §3.

**Files:**
- Modify (full rewrite): `src/components/AdminPages/AdminDashboard.tsx`

- [ ] **Step 1: Replace the entire file content**

Replace `src/components/AdminPages/AdminDashboard.tsx` with:

```tsx
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
  /** Optional — pass the App-level navigator so QuickActions can route. */
  onNavigate?: (page: AdminPage | 'accueil') => void
}

export function AdminDashboard({ onNavigate }: Props = {}) {
  const noopNav = (_page: AdminPage | 'accueil') => {}
  const navigate = onNavigate ?? noopNav

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
      {/* Page header */}
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

      {/* KPI row */}
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

      {/* Charts row: 2/3 + 1/3 on lg */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart series={revenueSeries30d} subtitle="30 derniers jours" />
        </div>
        <div>
          <TopProductsChart products={topProducts} />
        </div>
      </section>

      {/* Activity + Quick actions: 1/2 + 1/2 on lg */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ActivityFeed items={recentActivity} />
        <QuickActions onNavigate={(p) => navigate(p)} />
      </section>

      {/* Recent orders full width */}
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors.

- [ ] **Step 3: Lint**

Run:
```bash
npx eslint src/components/AdminPages/AdminDashboard.tsx
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AdminPages/AdminDashboard.tsx
git commit -m "feat(admin): rewrite AdminDashboard as bento composer"
```

---

## Task 11: Wire `AdminLayout` into `App.tsx` + update barrel exports

The 4 admin routes need to render inside `AdminLayout`, and `AdminDashboard` needs the `onNavigate` prop forwarded so its KPI CTAs and Quick Actions can route.

**Files:**
- Modify: `src/components/AdminPages/index.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the new export to the barrel**

Replace the contents of `src/components/AdminPages/index.ts` with:

```ts
export { AdminDashboard } from './AdminDashboard'
export { ProductsManagement } from './ProductsManagement'
export { UsersManagement } from './UsersManagement'
export { OrdersManagement } from './OrdersManagement'
export { AdminProtection } from './AdminProtection'
export { AdminLayout } from './AdminLayout'
export type { AdminPageKey } from './AdminLayout'
```

- [ ] **Step 2: Wrap the 4 admin routes in `AdminLayout` inside `App.tsx`**

In `src/App.tsx`:

Update the import line for AdminPages (line 13) to include `AdminLayout`:

```tsx
import { AdminDashboard, ProductsManagement, UsersManagement, OrdersManagement, AdminProtection, AdminLayout } from './components/AdminPages'
```

Then replace the 4 admin cases inside `renderPage()` (currently lines 34-57) with a single helper-driven block. Replace from `case 'admin-dashboard':` through the end of `case 'admin-orders':` (still inside the switch) with:

```tsx
      case 'admin-dashboard':
      case 'admin-products':
      case 'admin-orders':
      case 'admin-users': {
        const inner =
          currentPage === 'admin-dashboard' ? <AdminDashboard onNavigate={handleNavigation} /> :
          currentPage === 'admin-products'  ? <ProductsManagement /> :
          currentPage === 'admin-orders'    ? <OrdersManagement /> :
                                              <UsersManagement />
        return (
          <AdminProtection onNavigateHome={() => setCurrentPage('accueil')}>
            <AdminLayout currentPage={currentPage} onNavigate={handleNavigation}>
              {inner}
            </AdminLayout>
          </AdminProtection>
        )
      }
```

Note: `handleNavigation` is already defined later in the file (line 77). Hoisting it above `renderPage` is unnecessary because `renderPage` is *called* in the JSX `return`, by which time `handleNavigation` is in scope. JS hoists function declarations, but `handleNavigation` is a `const` arrow — verify the declaration order in your file. If TypeScript complains "used before declaration," move the `handleNavigation` definition above `renderPage`.

- [ ] **Step 3: Type-check**

Run:
```bash
npx tsc -b --noEmit
```
Expected: no errors. If "used before declaration" surfaces, move `handleNavigation` to before `renderPage` and re-run.

- [ ] **Step 4: Lint**

Run:
```bash
npx eslint src/App.tsx src/components/AdminPages/index.ts
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/AdminPages/index.ts
git commit -m "feat(admin): wrap admin routes in AdminLayout and forward navigation"
```

---

## Task 12: Final verification — build, lint, visual check

End-to-end validation. The dev server must render the dashboard correctly, sidebar navigation must switch between the 4 admin pages, and `prefers-reduced-motion` must short-circuit animations.

**Files:** none modified (verification only).

- [ ] **Step 1: Full build**

Run:
```bash
npm run build
```
Expected: `vite build` succeeds, `tsc -b` reports no errors, output bundle written under `dist/`.

- [ ] **Step 2: Full lint**

Run:
```bash
npm run lint
```
Expected: 0 errors. (Warnings allowed if pre-existing — note any new warnings.)

- [ ] **Step 3: Start the dev server**

Run:
```bash
npm run dev
```
Expected: server starts on `http://localhost:5173` (or the port printed). Leave it running for the visual checks below.

- [ ] **Step 4: Visual check — login as admin then navigate to `/admin-dashboard`**

In the browser:
1. Sign in with an admin account (per `database/admin_setup.sql`).
2. Navigate via the site Header to the admin section, ending up on the Dashboard page.

Verify on the Dashboard page:
- Sidebar visible at left (lg+ viewports), gradient brand-950 → brand-900, "Tableau de bord" item highlighted with gold dot
- Topbar with breadcrumb "Admin / Tableau de bord", search input, notifications bell with red dot
- 4 KPI cards in a row (sm: 2-col, lg: 4-col), numbers count up on first view
- Revenue chart fills the left 2/3, area gradient + line drawing animation plays once
- Top products bar list on the right, bars animate from 0 → target width
- Activity feed (8 items) and Quick actions grid (4 cards) below, side by side on lg
- Recent orders table at the bottom, status pills colored per status, rows fade in stagger

- [ ] **Step 5: Visual check — sidebar navigation**

Click each sidebar nav item in turn (Produits → Commandes → Utilisateurs → Tableau de bord). Verify:
- The active item changes (highlight + gold dot moves)
- The page content swaps to `ProductsManagement` / `OrdersManagement` / `UsersManagement` / `AdminDashboard`
- Topbar breadcrumb updates to match
- Sidebar stays sticky during scroll within each page

- [ ] **Step 6: Visual check — mobile/tablet (< lg)**

Resize the browser below the `lg` breakpoint (≈ 1024px). Verify:
- Sidebar is hidden
- Dashboard stack collapses to 1-column for KPIs and sections
- Topbar still renders, search input hides on `< md`, breadcrumb and bell remain

(Known limitation accepted in spec: no mobile drawer for the sidebar in C2 — sidebar is desktop-only. Document this if not already known.)

- [ ] **Step 7: Visual check — reduced motion**

In OS settings, enable "Reduce motion" (macOS: System Settings → Accessibility → Display → Reduce motion). Reload `/admin-dashboard`. Verify:
- KPI numbers appear at final value with no count-up
- Revenue chart line appears fully drawn immediately (no path animation)
- Top products bars appear at final width immediately
- Hover lift on cards is suppressed

- [ ] **Step 8: Visual check — return to site**

Click the "Retour au site" button at the bottom of the sidebar. Verify the homepage renders.

- [ ] **Step 9: Stop the dev server**

In the terminal running `npm run dev`, press `Ctrl+C`.

- [ ] **Step 10: Final commit (if anything tweaked during visual checks)**

If any small adjustments were made during the visual pass:
```bash
git add -A
git commit -m "polish(admin): visual tweaks from dashboard QA pass"
```
Otherwise no commit needed — Task 11 was the last code commit.

---

## Self-Review (already executed — fixes applied inline)

**Spec coverage check:**
- §2 Architecture / shell → Task 9 (AdminLayout), Task 11 (App.tsx wiring) ✓
- §2 Dashboard composition → Tasks 3-8 (6 sections) + Task 10 (composer) ✓
- §2 Data layer → Task 2 ✓
- §2 Reusable extraction → Task 1 ✓
- §3 Visual system tokens → applied across Tasks 3-10 (brand-*, gold-*, cream-*, ink-*) ✓
- §4 Motion (stagger, hover lift, count-up, path animation, useReducedMotion) → applied in Tasks 1, 3, 4, 5, 6, 7, 8, 10 ✓
- §5 Mock data shape → Task 2 (types match the spec) ✓
- §6 File plan → all files accounted for in Tasks 1-11 ✓
- §7 Out of scope → respected (no Supabase, no chart lib, no global search behavior, no mobile drawer) ✓
- §8 Acceptance criteria → all covered by Task 12 verification steps ✓

**Type consistency check:**
- `AdminPage` type defined in `QuickActions.tsx` (Task 7), imported by `AdminDashboard.tsx` (Task 10) — consistent
- `AdminPageKey` type defined in `AdminLayout.tsx` (Task 9), exported via barrel (Task 11) — consistent
- `RevenuePoint`, `TopProduct`, `ActivityItem`, `RecentOrder`, `OrderStatus`, `ActivityAccent`, `ActivityType` all defined in Task 2, imported with consistent names in Tasks 4, 5, 6, 8
- `AnimatedNumber` API: `value`, `prefix`, `suffix`, `locale`, `stiffness`, `damping` — Task 1 export matches all consumer call sites in Tasks 3 and updated `CulturePage.tsx` (which uses only `value` + `suffix`, both supported)

**Placeholder scan:** none found. All steps contain exact code or exact commands.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-04-26-admin-dashboard-refonte.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
