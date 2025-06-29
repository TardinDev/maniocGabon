import { useState, useEffect } from 'react'
import { Package, Calendar, CreditCard, Eye, Truck, CheckCircle, XCircle } from 'lucide-react'

// Types pour les commandes (simulation pour le moment)
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
}

export function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Simuler le chargement des commandes
  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true)
      
      // Simulation d'un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Données simulées (en attendant l'intégration e-commerce)
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'MG-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 25000,
          items: [
            {
              id: '1',
              name: 'Farine de Manioc Bio',
              quantity: 2,
              price: 8000,
              image: '/imagesproducts/farine.png'
            },
            {
              id: '2', 
              name: 'Chips de Manioc',
              quantity: 3,
              price: 3000,
              image: '/imagesproducts/chips.png'
            }
          ],
          shippingAddress: 'Libreville, Gabon',
          paymentMethod: 'Carte bancaire'
        },
        {
          id: '2',
          orderNumber: 'MG-2024-002',
          date: '2024-01-20',
          status: 'shipped',
          total: 15000,
          items: [
            {
              id: '3',
              name: 'Tapioca Premium',
              quantity: 1,
              price: 15000,
              image: '/imagesproducts/tapioca.png'
            }
          ],
          shippingAddress: 'Port-Gentil, Gabon',
          paymentMethod: 'Mobile Money'
        }
      ]
      
      setOrders(mockOrders)
      setIsLoading(false)
    }

    loadOrders()
  }, [])

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  // Obtenir le statut avec couleur
  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'En attente',
          color: 'bg-yellow-100 text-yellow-700',
          icon: XCircle
        }
      case 'processing':
        return {
          label: 'En préparation',
          color: 'bg-blue-100 text-blue-700',
          icon: Package
        }
      case 'shipped':
        return {
          label: 'Expédiée',
          color: 'bg-purple-100 text-purple-700',
          icon: Truck
        }
      case 'delivered':
        return {
          label: 'Livrée',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle
        }
      case 'cancelled':
        return {
          label: 'Annulée',
          color: 'bg-red-100 text-red-700',
          icon: XCircle
        }
      default:
        return {
          label: 'Inconnu',
          color: 'bg-gray-100 text-gray-700',
          icon: Package
        }
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes Commandes</h1>
          <p className="text-gray-600">Suivez l'état de vos commandes et consultez votre historique</p>
        </div>

        {orders.length === 0 ? (
          // État vide
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande sur notre site.</p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Découvrir nos produits
            </button>
          </div>
        ) : (
          // Liste des commandes
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon

              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header de la commande */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Commande #{order.orderNumber}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(order.date)}
                            </span>
                            <span className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-1" />
                              {order.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {statusInfo.label}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="text-green-600 hover:text-green-700 transition-colors flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Détails</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Résumé des articles */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg border-2 border-white object-cover"
                            style={{ zIndex: 10 - index }}
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {order.items.length} article{order.items.length > 1 ? 's' : ''}
                        </p>
                        <p className="font-bold text-lg text-gray-900">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Détails étendus */}
                  {selectedOrder?.id === order.id && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Détails de la commande</h4>
                        
                        {/* Articles */}
                        <div className="space-y-3 mb-6">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.name}</h5>
                                <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Informations de livraison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Adresse de livraison</h5>
                            <p className="text-gray-600">{order.shippingAddress}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Mode de paiement</h5>
                            <p className="text-gray-600">{order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Note informative */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Package className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Bientôt disponible</h4>
              <p className="text-sm text-blue-700 mt-1">
                Le système de commandes en ligne sera bientôt intégré. Pour le moment, vous pouvez nous contacter directement pour passer commande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 