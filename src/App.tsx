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
import { AdminDashboard, ProductsManagement, UsersManagement, OrdersManagement, AdminProtection } from './components/AdminPages'

type Page = 'accueil' | 'culture' | 'nutrition' | 'recettes' | 'contact' | 'profile' | 'orders' | 'settings' | 'admin-dashboard' | 'admin-products' | 'admin-users' | 'admin-orders'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil')

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
        return (
          <AdminProtection onNavigateHome={() => setCurrentPage('accueil')}>
            <AdminDashboard />
          </AdminProtection>
        )
      case 'admin-products':
        return (
          <AdminProtection onNavigateHome={() => setCurrentPage('accueil')}>
            <ProductsManagement />
          </AdminProtection>
        )
      case 'admin-users':
        return (
          <AdminProtection onNavigateHome={() => setCurrentPage('accueil')}>
            <UsersManagement />
          </AdminProtection>
        )
      case 'admin-orders':
        return (
          <AdminProtection onNavigateHome={() => setCurrentPage('accueil')}>
            <OrdersManagement />
          </AdminProtection>
        )
      case 'contact':
        // Scroll vers le footer pour la section contact
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

  const handleNavigation = (page: Page) => {
    setCurrentPage(page)
    
    // Scroll vers le top pour les nouvelles pages (sauf accueil et contact)
    if (page !== 'accueil' && page !== 'contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    // Pour contact, scroll vers le footer
    if (page === 'contact') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={handleNavigation} currentPage={currentPage} />
        {renderPage()}
        <Footer />
        
        {/* Notifications Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App
