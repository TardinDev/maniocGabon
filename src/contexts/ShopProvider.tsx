import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import toast from 'react-hot-toast'
import type { CartItem, Product } from '../types'
import { products } from '../data'
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../lib/format'
import { ShopContext, type ShopContextValue } from './ShopContext'

const CART_KEY = 'mg.cart.v1'
const FAV_KEY = 'mg.favorites.v1'

type StoredCart = { id: number; quantity: number }[]

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredCart
    return parsed
      .map(({ id, quantity }) => {
        const product = products.find((p) => p.id === id)
        return product && quantity > 0 ? { product, quantity: Math.min(quantity, 99) } : null
      })
      .filter((x): x is CartItem => x !== null)
  } catch {
    return []
  }
}

function readFavorites(): number[] {
  try {
    const raw = localStorage.getItem(FAV_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === 'number') : []
  } catch {
    return []
  }
}

type Flyer = { key: number; image: string; from: DOMRect; to: DOMRect }

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart)
  const [favorites, setFavorites] = useState<number[]>(readFavorites)
  const [isCartOpen, setCartOpen] = useState(false)
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)
  const [bump, setBump] = useState(0)
  const [flyers, setFlyers] = useState<Flyer[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart.map((i) => ({ id: i.product.id, quantity: i.quantity }))))
    } catch {
      /* storage unavailable (private mode) — cart stays in memory */
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
    } catch {
      /* ignore */
    }
  }, [favorites])

  const addToCart = useCallback(
    (product: Product, origin?: HTMLElement | null, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.product.id === product.id)
        return existing
          ? prev.map((i) => (i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, 99) } : i))
          : [...prev, { product, quantity: Math.min(quantity, 99) }]
      })

      const target = document.getElementById('cart-button')
      if (origin && target && !reduce) {
        const flyer = {
          key: Date.now() + Math.random(),
          image: product.image,
          from: origin.getBoundingClientRect(),
          to: target.getBoundingClientRect(),
        }
        setFlyers((f) => [...f, flyer])
        // Bump the cart once the product "lands"
        window.setTimeout(() => setBump((b) => b + 1), 650)
      } else {
        setBump((b) => b + 1)
      }

      toast.success(`${quantity > 1 ? `${quantity} × ` : ''}${product.name} ajouté au panier`, { id: `add-${product.id}`, icon: '🛒' })
    },
    [reduce],
  )

  const removeFromCart = useCallback((id: number) => setCart((p) => p.filter((i) => i.product.id !== id)), [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((p) => p.filter((i) => i.product.id !== id))
      return
    }
    setCart((p) => p.map((i) => (i.product.id === id ? { ...i, quantity: Math.min(quantity, 99) } : i)))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const value = useMemo<ShopContextValue>(() => {
    const totalItems = cart.reduce((t, i) => t + i.quantity, 0)
    const subtotal = cart.reduce((t, i) => t + i.product.priceValue * i.quantity, 0)
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
    return {
      cart,
      favorites,
      totalItems,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      bump,
      isCartOpen,
      isCheckoutOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite: (id: number) => favorites.includes(id),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openCheckout: () => {
        setCartOpen(false)
        setCheckoutOpen(true)
      },
      closeCheckout: () => setCheckoutOpen(false),
    }
  }, [cart, favorites, bump, isCartOpen, isCheckoutOpen, addToCart, removeFromCart, updateQuantity, clearCart, toggleFavorite])

  return (
    <ShopContext.Provider value={value}>
      {children}
      {/* Fly-to-cart sprites */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
        <AnimatePresence>
          {flyers.map((f) => {
            const size = 56
            const startX = f.from.left + f.from.width / 2 - size / 2
            const startY = f.from.top + f.from.height / 2 - size / 2
            const endX = f.to.left + f.to.width / 2 - size / 2
            const endY = f.to.top + f.to.height / 2 - size / 2
            return (
              <motion.img
                key={f.key}
                src={f.image}
                alt=""
                className="absolute left-0 top-0 rounded-full object-cover shadow-[var(--shadow-hover)] ring-2 ring-white"
                style={{ width: size, height: size }}
                initial={{ x: startX, y: startY, scale: 1, opacity: 1, rotate: 0 }}
                animate={{
                  x: [startX, (startX + endX) / 2, endX],
                  y: [startY, Math.min(startY, endY) - 120, endY],
                  scale: [1, 0.9, 0.3],
                  rotate: [0, 180, 360],
                  opacity: [1, 1, 0.6],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                onAnimationComplete={() => setFlyers((all) => all.filter((x) => x.key !== f.key))}
              />
            )
          })}
        </AnimatePresence>
      </div>
    </ShopContext.Provider>
  )
}
