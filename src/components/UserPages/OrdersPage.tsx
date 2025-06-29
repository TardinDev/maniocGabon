import { UserOrders } from '../UserAccount/UserOrders'

export function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header de la page */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Mes Commandes</h1>
            <p className="text-xl text-green-100">
              Suivez vos commandes et consultez votre historique d'achats
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <UserOrders />
      </div>
    </div>
  )
} 