import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShoppingBag, User } from 'lucide-react'
import { navigationLinks } from '../../../data'
import { useAuth } from '../../../hooks/useAuth'
import { useShop } from '../../../hooks/useShop'
import { LoginModal } from '../../AuthPage/LoginModal'
import { SignupModal } from '../../AuthPage/SignupModal'
import { UserDropdown } from '../../AuthPage/UserDropdown'
import { cn } from '../../../lib/utils'
import type { Page } from '../../../lib/routes'

interface HeaderProps {
  onNavigate: (page: Page) => void
  currentPage: Page
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user } = useAuth()
  const { totalItems, bump, openCart } = useShop()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const go = (page: Page) => {
    onNavigate(page)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
          isMenuOpen
            ? 'bg-paper'
            : 'bg-paper/80 backdrop-blur-xl backdrop-saturate-[1.8]',
          scrolled && !isMenuOpen && 'shadow-[0_1px_0_rgba(0,0,0,0.08)]',
        )}
      >
        <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-4 sm:px-6" aria-label="Navigation principale">
          {/* Brand */}
          <button
            onClick={() => go('accueil')}
            className="hover-jelly flex items-center gap-2 cursor-pointer"
            aria-label="Manioc Gabon — accueil"
          >
            <img src="/logo.png" alt="" width={26} height={32} className="jelly-target h-7 w-auto" />
            <span className="text-[0.95rem] font-semibold tracking-[-0.02em] text-ink-900">Manioc Gabon</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const active = currentPage === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id as Page)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative px-3 py-1 text-[0.8125rem] transition-colors duration-200 cursor-pointer',
                      active ? 'text-ink-900' : 'text-ink-700/80 hover:text-ink-900',
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute left-1/2 -bottom-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-600"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {user ? (
              <div className="hidden sm:block">
                <UserDropdown onNavigate={onNavigate} />
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="hover-wiggle hidden sm:grid place-items-center w-9 h-9 rounded-full text-ink-700 hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Se connecter"
              >
                <User className="wiggle-target w-[18px] h-[18px]" />
              </button>
            )}

            <button
              id="cart-button"
              onClick={openCart}
              className="hover-wiggle relative grid place-items-center w-9 h-9 rounded-full text-ink-700 hover:bg-black/5 transition-colors cursor-pointer"
              aria-label={`Ouvrir le panier, ${totalItems} article${totalItems > 1 ? 's' : ''}`}
            >
              <motion.span
                key={bump}
                animate={bump ? { rotate: [0, -14, 12, -6, 0], scale: [1, 1.25, 1] } : undefined}
                transition={{ duration: 0.5 }}
                className="wiggle-target"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
              </motion.span>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={`badge-${bump}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.35, 1] }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute -top-0.5 -right-0.5 grid min-w-[17px] h-[17px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white tabular-nums"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu trigger — two lines morphing into an X */}
            <button
              className="md:hidden relative grid place-items-center w-9 h-9 cursor-pointer"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  'absolute h-[1.5px] w-[17px] rounded bg-ink-900 transition-transform duration-300',
                  isMenuOpen ? 'rotate-45' : '-translate-y-[3.5px]',
                )}
              />
              <span
                className={cn(
                  'absolute h-[1.5px] w-[17px] rounded bg-ink-900 transition-transform duration-300',
                  isMenuOpen ? '-rotate-45' : 'translate-y-[3.5px]',
                )}
              />
            </button>
          </div>
        </nav>

        {/* Mobile full-screen menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-0 top-12 bottom-0 bg-paper overflow-y-auto px-8 pt-6 pb-10"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                className="flex flex-col"
              >
                {navigationLinks.map((link) => (
                  <motion.li
                    key={link.id}
                    variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
                  >
                    <button
                      onClick={() => go(link.id as Page)}
                      className={cn(
                        'w-full py-2 text-left text-[1.75rem] font-semibold tracking-[-0.02em] cursor-pointer',
                        currentPage === link.id ? 'text-brand-700' : 'text-ink-900',
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-10 border-t border-black/10 pt-6">
                {user ? (
                  <UserDropdown onNavigate={(p) => go(p)} />
                ) : (
                  <div className="flex flex-col gap-3 text-[0.9375rem]">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setShowLoginModal(true)
                      }}
                      className="text-left text-brand-600 cursor-pointer"
                    >
                      Se connecter ›
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setShowSignupModal(true)
                      }}
                      className="text-left text-brand-600 cursor-pointer"
                    >
                      Créer un compte ›
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content isn't hidden under the fixed navbar */}
      <div aria-hidden className="h-12" />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false)
          setShowSignupModal(true)
        }}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false)
          setShowLoginModal(true)
        }}
      />
    </>
  )
}
