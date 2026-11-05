import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Heart, Search, X } from 'lucide-react'
import type { Product } from '../../../types'
import { products, categories } from '../../../data'
import { useShop } from '../../../hooks/useShop'
import { ProductCard, QuickView } from '../../Shop'
import { Mascot } from '../../ui'
import { FREE_DELIVERY_THRESHOLD, formatFCFA } from '../../../lib/format'
import { cn } from '../../../lib/utils'

type Sort = 'featured' | 'price-asc' | 'price-desc'

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function ProductsSection() {
  const { favorites } = useShop()
  const [category, setCategory] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('featured')
  const [quickView, setQuickView] = useState<Product | null>(null)

  const tabs = [
    { id: 'all', name: 'Tout', icon: '✨' },
    ...categories,
    { id: 'favorites', name: 'Favoris', icon: '♥' },
  ]

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    let list = products.filter((p) => {
      if (category === 'favorites') return favorites.includes(p.id)
      if (category !== 'all') return p.category === category
      return true
    })
    if (q) list = list.filter((p) => normalize(`${p.name} ${p.description}`).includes(q))
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceValue - b.priceValue)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceValue - a.priceValue)
    return list
  }, [category, query, sort, favorites])

  return (
    <section id="produits" className="section scroll-mt-12 bg-cream-50 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow">La boutique</p>
          <h2 className="mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 text-balance">
            Le meilleur du terroir. <span className="text-ink-400">Choisi à la main.</span>
          </h2>
          <p className="mt-4 text-[1.1875rem] leading-relaxed text-ink-500">
            Livraison offerte dès {formatFCFA(FREE_DELIVERY_THRESHOLD)} d’achat à Libreville.
          </p>
        </header>

        {/* Controls */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <LayoutGroup id="shop-tabs">
            <div
              role="tablist"
              aria-label="Catégories"
              className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-black/[0.05] p-1 [scrollbar-width:none]"
            >
              {tabs.map((t) => {
                const active = category === t.id
                const count = t.id === 'favorites' ? favorites.length : null
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(t.id)}
                    className={cn(
                      'group relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
                      active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative inline-block transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125">
                      {t.icon.startsWith('/') ? (
                        <img src={t.icon} alt="" className="h-5 w-5 object-contain" />
                      ) : t.id === 'favorites' ? (
                        <Heart className={cn('h-4 w-4', active && 'fill-clay-500 text-clay-500')} />
                      ) : (
                        t.icon
                      )}
                    </span>
                    <span className="relative">{t.name}</span>
                    {count !== null && count > 0 && (
                      <motion.span
                        key={count}
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        className="relative grid h-5 min-w-5 place-items-center rounded-full bg-clay-500 px-1 text-[11px] text-white tabular-nums"
                      >
                        {count}
                      </motion.span>
                    )}
                  </button>
                )
              })}
            </div>
          </LayoutGroup>

          <div className="flex w-full max-w-[560px] items-center gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Rechercher un produit</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher : tapioca, feuilles, bio…"
                className="h-11 w-full rounded-full border border-black/10 bg-white pl-10 pr-10 text-[0.9375rem] text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/5 text-ink-500 hover:bg-black/10 cursor-pointer"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </label>
            <label>
              <span className="sr-only">Trier</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 cursor-pointer rounded-full border border-black/10 bg-white px-4 text-sm text-ink-900 outline-none focus:border-brand-600"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        <p className="sr-only" aria-live="polite">
          {visible.length} produit{visible.length > 1 ? 's' : ''}
        </p>
        <motion.ul layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} onQuickView={setQuickView} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col items-center text-center">
            <Mascot className="h-32 w-32" />
            <p className="mt-4 text-lg font-semibold text-ink-900">
              {category === 'favorites' && !query ? 'Aucun favori pour l’instant.' : 'Rien trouvé…'}
            </p>
            <p className="mt-1 max-w-sm text-sm text-ink-500">
              {category === 'favorites' && !query
                ? 'Touchez le ♥ d’un produit pour le retrouver ici.'
                : 'Même Mani a cherché partout. Essayez un autre mot.'}
            </p>
            <button
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
              className="mt-3 text-brand-600 hover:underline cursor-pointer"
            >
              Voir tous les produits ›
            </button>
          </motion.div>
        )}
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}
