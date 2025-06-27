import React, { useState } from 'react'
import { navigationLinks } from '../../../data'

type Page = 'accueil' | 'culture' | 'nutrition' | 'recettes' | 'contact'

interface HeaderProps {
  onNavigate: (page: Page) => void
  currentPage: Page
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    

  return (
    <header className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 relative text-white">
      {/* Menu de navigation */}
      <nav className="flex justify-between items-center p-4 lg:px-8 bg-black/10 backdrop-blur-lg border-b border-white/10 z-20 relative">
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
        <ul className="hidden md:flex gap-8 list-none m-0 p-0 items-center">
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

        {/* Menu mobile */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-emerald-900/95 backdrop-blur-lg border-b border-white/10 transform transition-transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} z-10`}>
          <ul className="flex flex-col p-4 gap-4">
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
        </div>
      </nav>
    </header>
  )
}
