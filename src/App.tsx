import { useState } from 'react'
import './App.css'
import Header from './components/HomagePage/Header/Header'
import HeroSection from './components/HomagePage/HeroSection/HeroSection'
import ProductsSection from './components/HomagePage/ProductsSection/ProductsSection'
import Footer from './components/HomagePage/Footer/Footer'
import CulturePage from './components/CulturePage/CulturePage'
import NutritionPage from './components/NutritionPage/NutritionPage'
import RecettesPage from './components/RecettesPage/RecettesPage'

type Page = 'accueil' | 'culture' | 'nutrition' | 'recettes' | 'contact'

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
    
    // Scroll vers le top pour les nouvelles pages
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
    <>
      <Header onNavigate={handleNavigation} currentPage={currentPage} />
      {renderPage()}
      <Footer />
    </>
  )
}

export default App
