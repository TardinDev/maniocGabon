import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, X } from 'lucide-react'
import type { Product } from '../../types'
import { useShop } from '../../hooks/useShop'
import { Button, FavoriteButton } from '../ui'
import { formatFCFA } from '../../lib/format'
import { categories } from '../../data'

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {product && <QuickViewDialog key={product.id} product={product} onClose={onClose} />}
    </AnimatePresence>
  )
}

function QuickViewDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleFavorite, isFavorite } = useShop()
  const [qty, setQty] = useState(1)
  const imgRef = useRef<HTMLImageElement>(null)
  const category = categories.find((c) => c.id === product.category)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-[60] grid place-items-end sm:place-items-center sm:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qv-title"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="pointer-events-auto relative grid w-full max-w-3xl overflow-hidden rounded-t-[28px] sm:rounded-[28px] bg-white shadow-[var(--shadow-modal)] sm:grid-cols-2"
        >
          <div className="relative aspect-[4/3] sm:aspect-auto bg-cream-50">
            <img ref={imgRef} src={product.image} alt={product.description} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">{category?.name ?? 'Produit'}</p>
              <div className="flex gap-2">
                <FavoriteButton
                  className="bg-cream-50"
                  active={isFavorite(product.id)}
                  onToggle={() => toggleFavorite(product.id)}
                  label={product.name}
                />
                <button
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full bg-cream-50 text-ink-700 hover:bg-cream-100 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h2 id="qv-title" className="mt-1 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-ink-900">
              {product.name}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">{product.description}.</p>
            <ul className="mt-5 space-y-2 text-sm text-ink-700">
              <li>🌿 Récolté chez nos producteurs partenaires</li>
              <li>🚚 Livraison en 24 à 48 h à Libreville</li>
              <li>📱 Paiement Mobile Money ou à la livraison</li>
            </ul>

            <div className="mt-auto pt-7">
              <p className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink-900 tabular-nums">
                {formatFCFA(product.priceValue * qty)}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center rounded-full bg-cream-50 p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-white cursor-pointer disabled:opacity-30"
                    disabled={qty <= 1}
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <motion.span key={qty} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                    {qty}
                  </motion.span>
                  <button
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-white cursor-pointer"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Button
                  className="flex-1"
                  onClick={() => {
                    addToCart(product, imgRef.current, qty)
                    onClose()
                  }}
                >
                  Ajouter au panier
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
