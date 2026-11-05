import { createContext } from 'react'
import type { CartItem, Product } from '../types'

export interface ShopContextValue {
  cart: CartItem[]
  favorites: number[]
  totalItems: number
  subtotal: number
  deliveryFee: number
  total: number
  /** Increments every time an item is added — used to trigger the cart bump animation. */
  bump: number
  isCartOpen: boolean
  isCheckoutOpen: boolean
  addToCart: (product: Product, origin?: HTMLElement | null, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  openCart: () => void
  closeCart: () => void
  openCheckout: () => void
  closeCheckout: () => void
}

export const ShopContext = createContext<ShopContextValue | null>(null)
