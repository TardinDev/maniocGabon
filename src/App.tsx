import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { MotionConfig } from 'motion/react'
import './App.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ShopProvider } from './contexts/ShopProvider'
import Header from './components/HomagePage/Header/Header'
import HeroSection from './components/HomagePage/HeroSection/HeroSection'
import Highlights from './components/HomagePage/Highlights/Highlights'
import ProductsSection from './components/HomagePage/ProductsSection/ProductsSection'
import HowItWorks from './components/HomagePage/HowItWorks/HowItWorks'
import FunFacts from './components/HomagePage/FunFacts/FunFacts'
import Faq from './components/HomagePage/Faq/Faq'
import ContactSection from './components/HomagePage/Contact/ContactSection'
import Footer from './components/HomagePage/Footer/Footer'
import { CartDrawer, CheckoutModal } from './components/Shop'
import { CookieBanner, LegalPage } from './components/Legal'
import { NotFound } from './components/NotFound/NotFound'
import { PAGE_TITLES, resolveLocation, type Page } from './lib/routes'

// Secondary pages are code-split so the home page loads fast.
const CulturePage = lazy(() => import('./components/CulturePage/CulturePage'))
const NutritionPage = lazy(() => import('./components/NutritionPage/NutritionPage'))
const RecettesPage = lazy(() => import('./components/RecettesPage/RecettesPage'))
const ProfilePage = lazy(() => import('./components/UserPages').then((m) => ({ default: m.ProfilePage })))
const OrdersPage = lazy(() => import('./components/UserPages').then((m) => ({ default: m.OrdersPage })))
const SettingsPage = lazy(() => import('./components/UserPages').then((m) => ({ default: m.SettingsPage })))
const AdminArea = lazy(() => import('./components/AdminPages/AdminArea'))

function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Chargement">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
    </div>
  )
}

function scrollToSection(id: string) {
  // Wait one frame so the home page is mounted before scrolling.
  requestAnimationFrame(() => {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
  })
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => resolveLocation(window.location.pathname, window.location.hash).page)

  // Sync with the URL hash (back/forward buttons, in-page anchors, deep links)
  useEffect(() => {
    const apply = () => {
      const { page, section } = resolveLocation(window.location.pathname, window.location.hash)
      setCurrentPage(page)
      if (section) scrollToSection(section)
      else window.scrollTo({ top: 0 })
    }
    const initial = resolveLocation(window.location.pathname, window.location.hash)
    if (initial.section) scrollToSection(initial.section)
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage]
  }, [currentPage])

  const handleNavigation = useCallback((page: Page, section?: string) => {
    const target = section ?? (page === 'contact' ? 'contact' : undefined)
    const hash = target ? `#${target}` : page === 'accueil' ? '' : `#${page}`
    if (window.location.pathname !== '/') {
      window.location.href = `/${hash}`
      return
    }
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash || '/')
    }
    setCurrentPage(page)
    if (target) scrollToSection(target)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'culture':
        return <CulturePage />
      case 'nutrition':
        return <NutritionPage />
      case 'recettes':
        return <RecettesPage />
      case 'profile':
        return <ProfilePage />
      case 'orders':
        return <OrdersPage />
      case 'settings':
        return <SettingsPage />
      case 'confidentialite':
      case 'cgu':
      case 'mentions':
        return <LegalPage kind={currentPage} />
      case 'not-found':
        return <NotFound onHome={() => handleNavigation('accueil')} />
      case 'admin-dashboard':
      case 'admin-products':
      case 'admin-orders':
      case 'admin-users':
        return <AdminArea currentPage={currentPage} onNavigate={handleNavigation} />
      case 'contact':
      case 'accueil':
      default:
        return (
          <main>
            <HeroSection onDiscover={() => handleNavigation('culture')} />
            <Highlights />
            <ProductsSection />
            <HowItWorks />
            <FunFacts />
            <Faq />
            <ContactSection />
          </main>
        )
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <ShopProvider>
          <div className="min-h-screen bg-paper text-ink-900 antialiased">
            <a
              href="#produits"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[90] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
            >
              Aller à la boutique
            </a>
            <Header onNavigate={handleNavigation} currentPage={currentPage} />
            <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
            <Footer onNavigate={handleNavigation} />
            <CartDrawer />
            <CheckoutModal />
            <CookieBanner onNavigatePrivacy={() => handleNavigation('confidentialite')} />

            <Toaster
              position="top-center"
              containerStyle={{ top: 60 }}
              toastOptions={{
                duration: 2600,
                style: {
                  background: 'rgba(29, 29, 31, 0.88)',
                  color: '#fff',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
                },
                success: { iconTheme: { primary: '#4FB97F', secondary: '#fff' } },
                error: { style: { background: 'rgba(201, 106, 67, 0.95)' } },
              }}
            />
          </div>
        </ShopProvider>
      </AuthProvider>
    </MotionConfig>
  )
}

export default App
