# Admin Dashboard Refonte — Design Spec

**Date:** 2026-04-26
**Scope variant:** C2 (visual refonte now, live Supabase data later in a separate session)
**Effort split agreed with user:** 80% admin / 20% culture (this spec covers admin only)

## 1. Goal

Bring the admin section up to the same visual quality as the rest of the site (homepage, culture, nutrition, recettes — all retravaillées with motion + bento layouts). Today the admin is plain (basic cards, no animation, mocked data inline). After this work it should feel like a real product dashboard while staying on mocked data — so we don't block on DB schema design.

A future session will swap the mock module for live Supabase queries without UI rewrites.

## 2. Architecture

### Shell

A new `AdminLayout.tsx` provides the persistent shell for all 4 admin pages:

- Left sidebar, fixed 240px wide
  - Brand block (logo + "Manioc Gabon Admin")
  - Nav items: Dashboard, Produits, Commandes, Utilisateurs (active state highlighted)
  - Footer block: admin profile (avatar, name, role) + "Retour au site" button
  - Background gradient `from-emerald-950 to-emerald-900`, light text
- Topbar, full width of content area
  - Breadcrumb (Admin / [page])
  - Cosmetic search input (no behavior in C2)
  - Notifications icon (cosmetic, with dot)
- Outlet area: cream-50 background, page content

`AdminLayout` accepts `currentPage` and `onNavigate` props (matches the existing `App.tsx` page-state pattern — no router introduced). The 4 admin routes in `App.tsx` are wrapped:

```tsx
<AdminProtection ...>
  <AdminLayout currentPage={currentPage} onNavigate={handleNavigation}>
    <AdminDashboard />
  </AdminLayout>
</AdminProtection>
```

The site-level `Header` and `Footer` continue to render outside, but the admin sidebar visually takes precedence (sticky, full-height inside the admin viewport). Decision: keep site Header/Footer as-is for consistency with the existing routing model — the admin sidebar is *additional* nav, not a replacement of the site shell. (If this proves visually heavy in implementation, fall back to hiding site Header/Footer when on admin pages.)

### Dashboard composition

`AdminDashboard.tsx` becomes a thin composer. Sections are extracted into `src/components/AdminPages/dashboard/`:

- `KpiCard.tsx` — generic KPI card (icon, label, value, delta/CTA, accent color)
- `RevenueChart.tsx` — 30-day area chart, custom SVG with gradient + path animation
- `TopProductsChart.tsx` — top 5 products, bar list with animated progress bars
- `ActivityFeed.tsx` — timeline of recent admin-relevant events
- `QuickActions.tsx` — 4 action cards (improved version of current buttons)
- `RecentOrdersTable.tsx` — modern table, last 5 orders

### Data layer

A single module `src/data/adminMockData.ts` exports:

- `adminStats` — totals (revenue, orders, products, users, pending counts, deltas)
- `revenueSeries30d` — array of `{ date, value }` with realistic variation
- `topProducts` — array of `{ name, revenue, percentOfTotal }`
- `recentActivity` — array of `{ id, type, label, timestamp, accent }`
- `recentOrders` — array of `{ id, customer, total, status, createdAt }`

The interface is what survives — when Supabase tables exist, we replace this module with hooks (`useAdminStats`, `useRevenueSeries`, etc.) returning the same shape.

### Reusable extraction

`AnimatedNumber` is currently inline in `CulturePage.tsx`. Extract to `src/components/ui/AnimatedNumber.tsx` and re-import from both places (CulturePage + KpiCard).

## 3. Visual system

Aligned with existing site identity (colors observed in `App.tsx` toaster + culture page):

- **Sidebar:** dark, `bg-gradient-to-b from-emerald-950 to-emerald-900`, light text on `text-emerald-50/90`, active item `bg-white/10 ring-1 ring-white/15`
- **Content surface:** `bg-cream-50` (existing), cards `bg-white rounded-2xl ring-1 ring-emerald-900/5 shadow-sm hover:shadow-lg transition-shadow`
- **Accent gold:** `#CA9E2E` (gold from toaster) used on the headline KPI (revenue) and primary CTAs
- **Status palette:** orange for pending, red for stock alerts, emerald for growth, slate for neutral
- **Typography:** Karla / Inter (already loaded). Page title `text-3xl font-bold text-emerald-950`. Card label `text-xs font-medium text-slate-500 uppercase tracking-wider`. Big numbers `text-3xl font-bold text-emerald-900 tabular-nums`.
- **Iconography:** lucide-react (already used). Icons in 40×40 rounded-xl badges with `bg-{accent}-100 ring-1 ring-{accent}-600/15`.

## 4. Motion

Reuses patterns from `CulturePage.tsx`:

- Page entrance: stagger fade-up on KPI row, then chart row, then feed/actions row
- Hover lift on cards: `whileHover={{ y: -4 }}` (skipped if `useReducedMotion`)
- KPI numbers count up (`AnimatedNumber`) on first inView
- Revenue chart: SVG path animated with `motion.path` `pathLength` from 0 → 1 over 1.2s ease
- TopProductsChart bars: width animation 0% → target% with stagger
- Activity feed items: stagger fade-up on first scroll-into-view

`useReducedMotion()` checked in every component that animates.

## 5. Mock data shape

```ts
// src/data/adminMockData.ts

export type AdminStats = {
  revenue: { total: number; lastWeek: number; deltaPct: number }
  orders: { total: number; pending: number }
  users: { total: number; newThisWeek: number; deltaPct: number }
  products: { total: number; outOfStock: number }
}

export type RevenuePoint = { date: string; value: number }
export type TopProduct = { name: string; revenue: number; percent: number }
export type ActivityItem = {
  id: string
  type: 'order' | 'signup' | 'stock' | 'product'
  label: string
  timestamp: string  // ISO
  accent: 'emerald' | 'orange' | 'red' | 'slate'
}
export type RecentOrder = {
  id: string
  customer: string
  customerInitials: string
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}
```

Values: realistic for a small Gabonese artisanal-food shop (revenue total around 2-3M FCFA, 80-100 orders, 12-15 products, 150-200 users). The 30-day series shows weekly seasonality (slight uptick on weekends) and one or two spikes — not flat, not random noise.

## 6. File plan

```
src/components/AdminPages/
├── AdminLayout.tsx              [NEW]
├── AdminDashboard.tsx           [REWRITE — thin composer]
├── dashboard/                   [NEW dir]
│   ├── KpiCard.tsx              [NEW]
│   ├── RevenueChart.tsx         [NEW — custom SVG]
│   ├── TopProductsChart.tsx     [NEW — custom SVG]
│   ├── ActivityFeed.tsx         [NEW]
│   ├── QuickActions.tsx         [NEW]
│   └── RecentOrdersTable.tsx    [NEW]
├── ProductsManagement.tsx       [unchanged logic, rendered inside AdminLayout via App.tsx]
├── OrdersManagement.tsx         [unchanged logic]
├── UsersManagement.tsx          [unchanged logic]
├── AdminProtection.tsx          [unchanged]
└── index.ts                     [add new exports]

src/components/ui/
└── AnimatedNumber.tsx           [NEW — extracted from CulturePage]

src/components/CulturePage/
└── CulturePage.tsx              [import AnimatedNumber from ui/]

src/data/
└── adminMockData.ts             [NEW]

src/App.tsx                      [wrap 4 admin pages in <AdminLayout>]
```

## 7. Out of scope (deferred to a later session)

- Live Supabase data — requires designing `products`, `orders`, `order_items`, `categories` tables first
- Functional global search in topbar
- Real notifications
- Dark mode toggle for the content area (sidebar is dark; content stays light)
- Charting library (we hand-roll SVG, ~150 lines total across both charts)
- Refactor of `ProductsManagement` / `OrdersManagement` / `UsersManagement` internals — only their rendering shell changes
- CulturePage polish — separate task #4 in the session task list, addressed after admin

## 8. Acceptance criteria

- All 4 admin pages render inside the new sidebar layout
- Dashboard shows: 4 KPI cards, revenue chart with animated path, top products bar list, activity feed, quick actions, recent orders table
- Page entrance is animated; respects `prefers-reduced-motion`
- All mock data lives in `src/data/adminMockData.ts`; no hardcoded values inline in components
- No TypeScript errors (`tsc -b` passes)
- No ESLint errors (`eslint .` passes)
- Production build succeeds (`npm run build`)
- Visual check at `/admin-dashboard`, `/admin-products`, `/admin-orders`, `/admin-users` — sidebar present, active item correct, navigation between admin pages works via the sidebar

## 9. Risks & open questions

- **Site Header/Footer + admin sidebar coexistence** may feel cluttered. Mitigation noted in §2 — fall back to hiding site Header/Footer for admin routes if visually heavy.
- **No router**: navigation stays on `App.tsx` page-state. Keep it for now — adding a router is a separate refactor.
- **Custom SVG charts**: trade-off accepted (no chart lib dep, full control, ~150 LOC). If maintenance becomes painful later we can revisit.
