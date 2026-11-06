import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { useShop } from '../../hooks/useShop'
import { Button, Mascot } from '../ui'
import { FREE_DELIVERY_THRESHOLD, formatFCFA } from '../../lib/format'

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, openCheckout, updateQuantity, removeFromCart, totalItems, subtotal, deliveryFee, total } =
    useShop()

  useEffect(() => {
    if (!isCartOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isCartOpen, closeCart])

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)
  const progress = Math.min(1, subtotal / FREE_DELIVERY_THRESHOLD)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[56] flex w-full flex-col bg-paper shadow-[var(--shadow-modal)] sm:max-w-[420px]"
          >
            <header className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em] text-ink-900">Votre panier</h2>
                <p className="text-sm text-ink-500">
                  {totalItems} article{totalItems > 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-ink-700 hover:bg-black/10 cursor-pointer"
                aria-label="Fermer le panier"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {cart.length > 0 && (
              <div className="mx-6 mb-4 rounded-[18px] bg-white p-4 shadow-[var(--shadow-card)]">
                <p className="text-sm text-ink-700" aria-live="polite">
                  {remaining > 0 ? (
                    <>
                      Plus que <strong className="text-ink-900">{formatFCFA(remaining)}</strong> pour la livraison offerte.
                    </>
                  ) : (
                    <strong className="text-brand-700">🎉 Livraison offerte débloquée !</strong>
                  )}
                </p>
                <div className="relative mt-4 h-1.5 rounded-full bg-cream-100">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-400"
                    initial={false}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                  <motion.span
                    aria-hidden
                    className="absolute -top-[15px] text-lg"
                    initial={false}
                    animate={{ left: `calc(${progress * 100}% - 12px)`, y: progress >= 1 ? [0, -6, 0] : 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  >
                    <span className="inline-block -scale-x-100">🚚</span>
                  </motion.span>
                  <span aria-hidden className="absolute -right-1 -top-[14px] text-base">🏠</span>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center pb-16 text-center">
                  <Mascot className="h-32 w-32" />
                  <p className="mt-4 text-lg font-semibold text-ink-900">Votre panier est vide.</p>
                  <p className="mt-1 text-sm text-ink-500">Mani a faim… ajoutez-lui quelque chose !</p>
                  <Button variant="link" className="mt-3" onClick={() => {
                    closeCart()
                    document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })
                  }}>
                    Voir la boutique ›
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-black/5">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: 60, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-4 py-4"
                      >
                        <img
                          src={item.product.image}
                          alt=""
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.9375rem] font-semibold text-ink-900">{item.product.name}</p>
                          <p className="text-sm text-ink-500 tabular-nums">{formatFCFA(item.product.priceValue * item.quantity)}</p>
                          <div className="mt-2 flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="grid h-7 w-7 place-items-center rounded-full bg-black/5 hover:bg-black/10 cursor-pointer"
                              aria-label={`Diminuer ${item.product.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="grid h-7 w-7 place-items-center rounded-full bg-black/5 hover:bg-black/10 cursor-pointer"
                              aria-label={`Augmenter ${item.product.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="hover-wiggle grid h-9 w-9 place-items-center rounded-full text-ink-400 hover:bg-clay-500/10 hover:text-clay-500 cursor-pointer"
                          aria-label={`Retirer ${item.product.name}`}
                        >
                          <Trash2 className="wiggle-target h-4 w-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <footer className="border-t border-black/5 bg-white/70 px-6 pt-5 pb-6 backdrop-blur">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-ink-500">
                    <dt>Sous-total</dt>
                    <dd className="tabular-nums text-ink-900">{formatFCFA(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-500">
                    <dt>Livraison</dt>
                    <dd className="tabular-nums text-ink-900">{deliveryFee === 0 ? 'Offerte' : formatFCFA(deliveryFee)}</dd>
                  </div>
                  <div className="flex justify-between pt-2 text-[1.0625rem] font-semibold text-ink-900">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatFCFA(total)}</dd>
                  </div>
                </dl>
                <Button size="lg" className="mt-5 w-full" onClick={openCheckout}>
                  Passer la commande
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
