import { useState } from 'react'
import { navigationLinks } from '../../../data'
import { useAuth } from '../../../hooks/useAuth'
import { LoginModal } from '../../AuthPage/LoginModal'
import { SignupModal } from '../../AuthPage/SignupModal'
import { UserDropdown } from '../../AuthPage/UserDropdown'
import { testSupabaseConnection, testDatabase } from '../../../utils/testSupabase'

type Page = 'accueil' | 'culture' | 'nutrition' | 'recettes' | 'contact'

interface HeaderProps {
  onNavigate: (page: Page) => void
  currentPage: Page
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const handleLoginClick = async () => {
    if (user) {
      // Si l'utilisateur est connecté, ne rien faire (le dropdown s'occupe de la déconnexion)
      return
    }

    console.log('🔄 Test de connexion Supabase...')
    
    // Tester la connexion Supabase
    const connectionOk = await testSupabaseConnection()
    
    if (connectionOk) {
      // Si la connexion fonctionne, tester la base de données
      await testDatabase()
      // Puis ouvrir le modal de connexion
      setShowLoginModal(true)
    }
  }

  // Gestion du changement entre les modals
  const handleSwitchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  const handleSwitchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  return (
    <>
      <header className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 relative text-white">
      {/* Menu de navigation */}
      <nav className="flex justify-between items-center p-4 lg:px-8 bg-black/10 backdrop-blur-lg border-b border-white/10 shadow-lg z-20 relative">
        <div className="flex items-center gap-3 text-xl lg:text-2xl font-bold">
          <img 
            src="/logo.png" 
            alt="Manioc Gabon Logo" 
            className="w-10 h-10 lg:w-12 lg:h-12 object-contain rounded-lg bg-white/10 p-1"
          />
          <span className="hidden sm:block">Manioc Gabon</span>
          <span className="sm:hidden">MG</span>
        </div>
        
        {/* Menu hamburger pour mobile */}
        <button 
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
        
        {/* Menu desktop */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-8 list-none m-0 p-0 items-center">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => onNavigate(link.id as Page)}
                  className={`text-white no-underline font-medium hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer ${
                    currentPage === link.id ? 'opacity-100 border-b-2 border-white' : ''
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Zone d'authentification */}
          {user ? (
            // Utilisateur connecté : afficher le dropdown
            <UserDropdown />
          ) : (
            // Utilisateur non connecté : afficher les boutons de connexion/inscription
            <div className="flex items-center gap-3">
              <button
                onClick={handleLoginClick}
                className="bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Connexion
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className="border-2 border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Inscription
              </button>
            </div>
          )}
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-emerald-900/95 backdrop-blur-lg border-b border-white/10 transform transition-transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} z-10`}>
          <div className="p-4">
            <ul className="flex flex-col gap-4 mb-4">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => {
                      onNavigate(link.id as Page)
                      setIsMenuOpen(false)
                    }}
                    className={`text-white no-underline font-medium hover:opacity-70 transition-opacity block py-2 bg-transparent border-none cursor-pointer text-left w-full ${
                      currentPage === link.id ? 'opacity-100 border-l-4 border-white pl-4' : ''
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Zone d'authentification mobile */}
            <div className="border-t border-white/20 pt-4">
              {user ? (
                // Utilisateur connecté sur mobile
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-2 py-2 bg-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.user_metadata?.full_name 
                        ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                        : user?.email?.charAt(0).toUpperCase() || 'U'
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur'}
                      </p>
                      <p className="text-xs text-white/70 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <UserDropdown />
                </div>
              ) : (
                // Utilisateur non connecté sur mobile
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleLoginClick()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-white text-emerald-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Connexion
                  </button>
                  <button
                    onClick={() => {
                      setShowSignupModal(true)
                      setIsMenuOpen(false)
                    }}
                    className="w-full border-2 border-white text-white px-4 py-3 rounded-lg font-medium hover:bg-white hover:text-emerald-700 transition-colors"
                  >
                    Inscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>

    {/* Modals d'authentification */}
    <LoginModal
      isOpen={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      onSwitchToSignup={handleSwitchToSignup}
    />
    
    <SignupModal
      isOpen={showSignupModal}
      onClose={() => setShowSignupModal(false)}
      onSwitchToLogin={handleSwitchToLogin}
    />
  </>
  )
}
