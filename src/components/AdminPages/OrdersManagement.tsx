import { useState } from 'react'
import { Search, Package, Calendar, CreditCard, Eye, CheckCircle, Truck, XCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

interface AdminOrder {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
  shippingAddress: string
  paymentMethod: string
}

export function OrdersManagement() {
  const [ordersList, setOrdersList] = useState<AdminOrder[]>([
    {
      id: '1',
      orderNumber: 'MG-2024-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      date: '2024-01-20',
      status: 'pending',
      total: 25000,
      items: [
        { id: '1', name: 'Farine de Manioc Bio', quantity: 2, price: 8000 },
        { id: '2', name: 'Chips de Manioc', quantity: 3, price: 3000 }
      ],
      shippingAddress: 'Libreville, Gabon',
      paymentMethod: 'Carte bancaire'
    },
    {
      id: '2',
      orderNumber: 'MG-2024-002',
      customerName: 'Marie Martin',
      customerEmail: 'marie.martin@example.com',
      date: '2024-01-18',
      status: 'shipped',
      total: 15000,
      items: [
        { id: '3', name: 'Tapioca Premium', quantity: 1, price: 15000 }
      ],
      shippingAddress: 'Port-Gentil, Gabon',
      paymentMethod: 'Mobile Money'
    },
    {
      id: '3',
      orderNumber: 'MG-2024-003',
      customerName: 'Pierre Dubois',
      customerEmail: 'pierre.dubois@example.com',
      date: '2024-01-15',
      status: 'delivered',
      total: 12000,
      items: [
        { id: '4', name: 'Feuilles de Manioc', quantity: 4, price: 3000 }
      ],
      shippingAddress: 'Franceville, Gabon',
      paymentMethod: 'Espèces'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | AdminOrder['status']>('all')
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)

  // Filtrer les commandes
  const filteredOrders = ordersList.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Changer le statut d'une commande
  const updateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrdersList(prev => prev.map(order => {
      if (order.id === orderId) {
        toast.success(`Commande ${order.orderNumber} mise à jour`)
        return { ...order, status: newStatus }
      }
      return order
    }))
  }

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

  // Obtenir les informations du statut
  const getStatusInfo = (status: AdminOrder['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'En attente',
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Gestion des Commandes</h1>
            <p className="text-xl text-green-100">
              Suivez et gérez toutes les commandes clients
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-gray-900">{ordersList.length}</p>
            <p className="text-sm text-gray-500">Total commandes</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {ordersList.filter(o => o.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-500">En attente</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {ordersList.filter(o => o.status === 'processing').length}
            </p>
            <p className="text-sm text-gray-500">En préparation</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {ordersList.filter(o => o.status === 'shipped').length}
            </p>
            <p className="text-sm text-gray-500">Expédiées</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-2xl font-bold text-green-600">
              {ordersList.filter(o => o.status === 'delivered').length}
            </p>
            <p className="text-sm text-gray-500">Livrées</p>
          </div>
        </div>

        {/* Barre d'outils */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filtre par statut */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="processing">En préparation</option>
              <option value="shipped">Expédiées</option>
              <option value="delivered">Livrées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>
        </div>

        {/* Liste des commandes */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status)
            const StatusIcon = statusInfo.icon

            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header de la commande */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Commande {order.orderNumber}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(order.date)}
                        </span>
                        <span className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-1" />
                          {order.paymentMethod}
                        </span>
                        <span>Client: {order.customerName}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {statusInfo.label}
                      </span>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-green-600 hover:text-green-700 transition-colors flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Détails</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Résumé de la commande */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {order.items.length} article{order.items.length > 1 ? 's' : ''}
                      </p>
                      <p className="font-bold text-lg text-gray-900">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Livraison</p>
                      <p className="text-sm font-medium text-gray-900">{order.shippingAddress}</p>
                    </div>
                  </div>

                  {/* Actions rapides */}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="flex flex-wrap gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Passer en préparation
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Marquer comme expédiée
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Marquer comme livrée
                        </button>
                      )}
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Message si aucune commande */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Aucune commande ne correspond aux critères de recherche.' 
                : 'Aucune commande n\'a encore été passée.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de détails de commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Détails de la commande {selectedOrder.orderNumber}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Informations client */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Informations Client</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adresse de livraison</p>
                    <p className="font-medium">{selectedOrder.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mode de paiement</p>
                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Articles commandés */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Articles commandés</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900">Total</p>
                    <p className="font-bold text-xl text-green-600">
                      {formatPrice(selectedOrder.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Statut et actions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Statut et Actions</h4>
                <div className="flex items-center justify-between">
                  <div>
                    {(() => {
                      const statusInfo = getStatusInfo(selectedOrder.status)
                      const StatusIcon = statusInfo.icon
                      return (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {statusInfo.label}
                        </span>
                      )
                    })()}
                  </div>
                  
                  {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                    <div className="flex space-x-2">
                      {selectedOrder.status === 'pending' && (
                        <button
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, 'processing')
                            setSelectedOrder(null)
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Passer en préparation
                        </button>
                      )}
                      {selectedOrder.status === 'processing' && (
                        <button
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, 'shipped')
                            setSelectedOrder(null)
                          }}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Marquer comme expédiée
                        </button>
                      )}
                      {selectedOrder.status === 'shipped' && (
                        <button
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, 'delivered')
                            setSelectedOrder(null)
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Marquer comme livrée
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 