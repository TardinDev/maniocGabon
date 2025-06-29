import { useAuth } from '../../hooks/useAuth'
import { Users, ShoppingBag, Package, BarChart3, AlertTriangle, TrendingUp } from 'lucide-react'

export function AdminDashboard() {
  const { user } = useAuth()

  // Données simulées (à remplacer par des vraies données)
  const stats = {
    totalUsers: 156,
    totalOrders: 89,
    totalProducts: 12,
    pendingOrders: 7,
    revenue: 2450000, // en FCFA
    weeklyRevenue: 185000, // en FCFA
    newUsersThisWeek: 23
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header de la page */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Administration Manioc Gabon</h1>
            <p className="text-xl text-green-100">
              Bienvenue {user?.user_metadata?.full_name || 'Administrateur'}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Alertes - En priorité */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-900">Attention Administrative</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Vous avez {stats.pendingOrders} commandes en attente qui nécessitent votre attention.
              </p>
              <button className="mt-2 text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                Voir les commandes en attente →
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Utilisateurs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{stats.newUsersThisWeek}</span>
              <span className="text-gray-500 ml-1">cette semaine</span>
            </div>
          </div>

          {/* Total Commandes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Commandes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <AlertTriangle className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-orange-600 font-medium">{stats.pendingOrders}</span>
              <span className="text-gray-500 ml-1">en attente</span>
            </div>
          </div>

          {/* Total Produits */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Produits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Gérer les produits →
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques financières */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Chiffre d'affaires total */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">CA Total</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.revenue)}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-500 text-sm">Depuis le début</span>
            </div>
          </div>

          {/* Chiffre d'affaires hebdomadaire */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">CA Hebdomadaire</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.weeklyRevenue)}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">vs semaine dernière</span>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Package className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Ajouter un produit</p>
              <p className="text-sm text-gray-500">Nouveau produit au catalogue</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <ShoppingBag className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Voir les commandes</p>
              <p className="text-sm text-gray-500">Gérer les commandes clients</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Gérer les utilisateurs</p>
              <p className="text-sm text-gray-500">Administration des comptes</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <BarChart3 className="w-6 h-6 text-orange-600 mb-2" />
              <p className="font-medium text-gray-900">Voir les statistiques</p>
              <p className="text-sm text-gray-500">Rapports et analyses</p>
            </button>
          </div>
        </div>


      </div>
    </div>
  )
} 