import type { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Shield, ArrowLeft } from 'lucide-react'

interface AdminProtectionProps {
  children: ReactNode
  onNavigateHome?: () => void
}

export function AdminProtection({ children, onNavigateHome }: AdminProtectionProps) {
  const { isAdmin, user, loading } = useAuth()

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    )
  }

  // Utilisateur non connecté
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto shadow-lg">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Accès Refusé
            </h2>
            <p className="text-gray-600 mb-6">
              Vous devez être connecté pour accéder à cette section.
            </p>
            <button
              onClick={onNavigateHome}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Utilisateur connecté mais pas admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto shadow-lg">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Privilèges Insuffisants
            </h2>
            <p className="text-gray-600 mb-2">
              Cette section est réservée aux administrateurs.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Connecté en tant que: {user.email}
            </p>
            <button
              onClick={onNavigateHome}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Utilisateur admin → accès autorisé
  return <>{children}</>
} 