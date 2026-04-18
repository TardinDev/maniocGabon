import { useEffect, useState } from 'react'
import { Menu, X, User, LogIn } from 'lucide-react'
import { navigationLinks } from '../../../data'
import { useAuth } from '../../../hooks/useAuth'
import { LoginModal } from '../../AuthPage/LoginModal'
import { SignupModal } from '../../AuthPage/SignupModal'
import { UserDropdown } from '../../AuthPage/UserDropdown'
import { testSupabaseConnection, testDatabase } from '../../../utils/testSupabase'
import { Button } from '../../ui'
import { cn } from '../../../lib/utils'

type Page = 'accueil' | 'culture' | 'nutrition' | 'recettes' | 'contact' | 'profile' | 'orders' | 'settings' | 'admin-dashboard' | 'admin-products' | 'admin-users' | 'admin-orders'

interface HeaderProps {
  onNavigate: (page: Page) => void
  currentPage: Page
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLoginClick = async () => {
    if (user) return
    const connectionOk = await testSupabaseConnection()
    if (connectionOk) {
      await testDatabase()
      setShowLoginModal(true)
    }
  }

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
      {/* Floating glass navbar — awwwards-style */}
      <header
        className={cn(
          'fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
          scrolled
            ? 'top-3 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl'
            : 'top-4 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-7xl',
        )}
      >
        <nav
          className={cn(
            'flex items-center justify-between gap-4 rounded-full px-3 sm:px-5 py-2.5 sm:py-3 transition-all duration-500',
            scrolled
              ? 'bg-white/85 backdrop-blur-xl border border-brand-100 shadow-[0_12px_40px_-12px_rgba(15,74,48,0.18)]'
              : 'bg-white/60 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_-12px_rgba(15,74,48,0.12)]',
          )}
        >
          {/* Brand */}
          <button
            onClick={() => onNavigate('accueil')}
            className="flex items-center gap-2.5 pl-1 pr-2 cursor-pointer group"
            aria-label="Manioc Gabon — accueil"
          >
            <span className="relative grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-brand-700 to-brand-900 shadow-inner overflow-hidden">
              <img
                src="/logo.png"
                alt=""
                className="w-7 h-7 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink-900">
                Manioc Gabon
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-700/80">
                Terroir · Gabon
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const active = currentPage === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id as Page)}
                    className={cn(
                      'relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer',
                      active
                        ? 'text-brand-900'
                        : 'text-ink-700 hover:text-brand-800',
                    )}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-full bg-brand-50 border border-brand-100" />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Auth zone */}
          <div className="flex items-center gap-2">
            {user ? (
              <UserDropdown onNavigate={onNavigate} />
            ) : (
              <>
                <Button
                  onClick={handleLoginClick}
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-ink-700 hover:text-brand-800"
                >
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Button>
                <Button
                  onClick={() => setShowSignupModal(true)}
                  variant="primary"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  Commander
                </Button>
              </>
            )}

            {/* Mobile menu trigger */}
            <button
              className="md:hidden grid place-items-center w-10 h-10 rounded-full bg-brand-50 text-brand-800 hover:bg-brand-100 transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={cn(
            'md:hidden absolute left-0 right-0 top-[calc(100%+0.5rem)] origin-top transition-all duration-300',
            isMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none',
          )}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-brand-100 shadow-[0_20px_60px_-20px_rgba(15,74,48,0.25)] p-5">
            <ul className="flex flex-col gap-1 mb-4">
              {navigationLinks.map((link) => {
                const active = currentPage === link.id
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        onNavigate(link.id as Page)
                        setIsMenuOpen(false)
                      }}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-2xl font-medium transition-colors cursor-pointer',
                        active
                          ? 'bg-brand-50 text-brand-900 border border-brand-100'
                          : 'text-ink-700 hover:bg-brand-50/60 hover:text-brand-800',
                      )}
                    >
                      {link.label}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-brand-100 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full grid place-items-center text-white font-semibold text-sm">
                      {user?.user_metadata?.full_name
                        ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                        : user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink-900 truncate">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Utilisateur'}
                      </p>
                      <p className="text-xs text-ink-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <UserDropdown onNavigate={onNavigate} />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => {
                      handleLoginClick()
                      setIsMenuOpen(false)
                    }}
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    <User className="w-4 h-4" />
                    Connexion
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSignupModal(true)
                      setIsMenuOpen(false)
                    }}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    Commander
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so content isn't hidden under fixed navbar */}
      <div aria-hidden className="h-20" />

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
