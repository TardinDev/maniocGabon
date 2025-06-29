import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings, ShoppingBag, ChevronDown, Shield } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

type AdminPage = 'admin-dashboard' | 'admin-products' | 'admin-users' | 'admin-orders'
type UserPage = 'profile' | 'orders' | 'settings'

interface UserDropdownProps {
  onNavigate?: (page: UserPage | AdminPage) => void
}

export function UserDropdown({ onNavigate }: UserDropdownProps = {}) {
  const { user, signOut, isAdmin } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Obtenir les initiales du nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Obtenir le nom d'affichage
  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    return user?.email?.split('@')[0] || 'Utilisateur'
  }

  // Naviguer vers une page utilisateur
  const handleUserNavigation = (page: UserPage) => {
    setIsOpen(false)
    if (onNavigate) {
      onNavigate(page)
    }
  }

  // Naviguer vers une page admin
  const handleAdminNavigation = (page: AdminPage) => {
    setIsOpen(false)
    if (onNavigate) {
      onNavigate(page)
    }
  }

  const handleSignOut = async () => {
    setIsOpen(false)
    await signOut()
    // Recharger la page pour retourner à l'accueil
    window.location.reload()
  }

  if (!user) return null

  const displayName = getDisplayName()
  const initials = getInitials(displayName)

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton utilisateur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-3 py-2 hover:bg-gray-50 transition-colors shadow-sm"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {initials}
        </div>
        
        {/* Nom (caché sur mobile) */}
        <span className="hidden md:block text-gray-700 font-medium max-w-32 truncate">
          {displayName}
        </span>
        
        {/* Flèche */}
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Info utilisateur */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {/* Profil */}
            <button
              onClick={() => handleUserNavigation('profile')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User className="w-4 h-4 mr-3" />
              Mon profil
            </button>

            {/* Commandes */}
            <button
              onClick={() => handleUserNavigation('orders')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 mr-3" />
              Mes commandes
            </button>

            {/* Paramètres */}
            <button
              onClick={() => handleUserNavigation('settings')}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3" />
              Paramètres
            </button>

            {/* Section Administration (visible seulement pour les admins) */}
            {isAdmin && (
              <>
                <div className="border-t border-gray-100 my-1"></div>
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Administration
                  </p>
                </div>
                
                {/* Tableau de bord admin */}
                <button
                  onClick={() => handleAdminNavigation('admin-dashboard')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Shield className="w-4 h-4 mr-3" />
                  Tableau de bord
                </button>

                {/* Gestion des produits */}
                <button
                  onClick={() => handleAdminNavigation('admin-products')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 mr-3" />
                  Gérer les produits
                </button>

                {/* Gestion des utilisateurs */}
                <button
                  onClick={() => handleAdminNavigation('admin-users')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4 mr-3" />
                  Gérer les utilisateurs
                </button>

                {/* Gestion des commandes */}
                <button
                  onClick={() => handleAdminNavigation('admin-orders')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Gérer les commandes
                </button>
              </>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Déconnexion */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 