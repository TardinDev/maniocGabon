// Types pour les produits
export interface Product {
  id: number
  name: string
  description: string
  price: string
  priceValue: number
  image: string
  category: string
}

// Types pour les catégories
export interface Category {
  id: string
  name: string
  icon: string
}

// Types pour le panier
export interface CartItem {
  product: Product
  quantity: number
}

// Types pour les informations client
export interface CustomerInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  paymentMethod: string
}

// Types pour les liens de navigation
export interface NavigationLink {
  label: string
  href: string
}

// Types pour les réseaux sociaux
export interface SocialNetwork {
  icon: string
  name: string
  color: string
}

// Types pour les méthodes de paiement
export interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
  popular?: boolean
} 