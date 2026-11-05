import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Plus } from 'lucide-react'
import type { Product } from '../../types'
import { useShop } from '../../hooks/useShop'
import { FavoriteButton } from '../ui'
import { cn } from '../../lib/utils'

const tagStyles: Record<NonNullable<Product['tag']>, string> = {
  Nouveau: 'text-clay-500',
  'Best-seller': 'text-gold-600',
  Bio: 'text-brand-600',
}

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) {
  const { addToCart, toggleFavorite, isFavorite } = useShop()
  const imgRef = useRef<HTMLImageElement>(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = window.setTimeout(() => setAdded(false), 1400)
    return () => window.clearTimeout(t)
  }, [added])

  const [amount, unit] = product.price.split('/')

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-50 cursor-zoom-in"
        aria-label={`Aperçu rapide : ${product.name}`}
      >
        <img
          ref={imgRef}
          src={product.image}
          alt={product.description}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink-900 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Aperçu rapide
        </span>
      </button>

      <FavoriteButton
        className="absolute right-3 top-3"
        active={isFavorite(product.id)}
        onToggle={() => toggleFavorite(product.id)}
        label={product.name}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.tag && (
          <p className={cn('mb-1 text-xs font-semibold', tagStyles[product.tag])}>{product.tag}</p>
        )}
        <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink-900">{product.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-500 line-clamp-2">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="text-ink-900">
            <span className="text-[1.0625rem] font-semibold tabular-nums">{amount}</span>
            {unit && <span className="text-sm text-ink-500"> / {unit}</span>}
          </p>
          <button
            type="button"
            onClick={() => {
              addToCart(product, imgRef.current)
              setAdded(true)
            }}
            aria-label={`Ajouter ${product.name} au panier`}
            className={cn(
              'relative inline-flex h-9 min-w-[96px] items-center justify-center gap-1.5 overflow-hidden rounded-full px-4 text-[0.8125rem] font-medium text-white transition-colors duration-300 cursor-pointer active:scale-95',
              added ? 'bg-brand-500' : 'bg-brand-700 hover:bg-brand-600',
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="ok"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  className="inline-flex items-center gap-1"
                >
                  <Check className="h-4 w-4" strokeWidth={3} /> Ajouté
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  className="inline-flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Ajouter
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </article>
  )
}
