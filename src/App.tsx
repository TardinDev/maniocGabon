import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import Header from './components/HomagePage/Header/Header'
import HeroSection from './components/HomagePage/HeroSection/HeroSection'
import ProductsSection from './components/HomagePage/ProductsSection/ProductsSection'
import Footer from './components/HomagePage/Footer/Footer'
import CulturePage from './components/CulturePage/CulturePage'
import NutritionPage from './components/NutritionPage/NutritionPage'
import RecettesPage from './components/RecettesPage/RecettesPage'
import { ProfilePage, OrdersPage, SettingsPage } from './components/UserPages'
import { AdminDashboard, ProductsManagement, UsersManagement, OrdersManagement, AdminProtection, AdminLayout } from './components/AdminPages'

type Page = 'accueil' | 'culture' | 'nutrition' | 'recettes' | 'contact' | 'profile' | 'orders' | 'settings' | 'admin-dashboard' | 'admin-products' | 'admin-users' | 'admin-orders'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil')

  const handleNavigation = (page: Page) => {
    setCurrentPage(page)

    if (page !== 'accueil' && page !== 'contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (page === 'contact') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

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
      case 'admin-dashboard':
      case 'admin-products':
      case 'admin-orders':
      case 'admin-users': {
        const inner =
          currentPage === 'admin-dashboard' ? <AdminDashboard onNavigate={(p) => handleNavigation(p as Page)} /> :
          currentPage === 'admin-products'  ? <ProductsManagement /> :
          currentPage === 'admin-orders'    ? <OrdersManagement /> :
                                              <UsersManagement />
        return (
          <AdminProtection onNavigateHome={() => setCurrentPage('accueil')}>
            <AdminLayout currentPage={currentPage} onNavigate={(p) => handleNavigation(p as Page)}>
              {inner}
            </AdminLayout>
          </AdminProtection>
        )
      }
      case 'contact':
        return (
          <>
            <HeroSection />
            <ProductsSection />
          </>
        )
      case 'accueil':
      default:
        return (
          <>
            <HeroSection />
            <ProductsSection />
          </>
        )
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-cream-50 text-ink-900 antialiased">
        <Header onNavigate={handleNavigation} currentPage={currentPage} />
        {renderPage()}
        <Footer />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(8, 46, 30, 0.92)',
              color: '#fff',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              padding: '10px 18px',
              fontSize: '0.875rem',
              fontFamily: 'Karla, Inter, sans-serif',
            },
            success: { iconTheme: { primary: '#CA9E2E', secondary: '#082E1E' } },
            error: { style: { background: 'rgba(201, 106, 67, 0.95)' } },
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App
