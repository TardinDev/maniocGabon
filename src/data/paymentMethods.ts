import type { PaymentMethod } from '../types'

export const paymentMethods: PaymentMethod[] = [
  { 
    id: 'mobile', 
    name: 'Mobile Money', 
    icon: '📱',
    description: 'Airtel Money, Moov Money',
    popular: true
  },
  { 
    id: 'delivery', 
    name: 'Paiement à la livraison', 
    icon: '💰',
    description: 'Espèces à la réception'
  },
  { 
    id: 'bank', 
    name: 'Virement bancaire', 
    icon: '🏦',
    description: 'Virement vers notre compte'
  }
] 