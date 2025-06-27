import React from 'react'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 min-h-[60vh] relative overflow-hidden flex flex-col text-white">
      {/* Contenu principal centré */}
      <div className="flex-1 flex items-center justify-center relative bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/banniere.png)'}}>
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-emerald-800/70 z-5"></div>
        
        {/* Motifs décoratifs de feuilles de manioc */}
        <div className="absolute top-[10%] left-[5%] w-20 h-20 lg:w-30 lg:h-30 opacity-15 rotate-12 z-8">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C60,20 80,25 90,40 C85,50 70,55 60,65 C55,70 50,85 45,75 C40,60 35,55 25,50 C20,45 15,35 25,25 C35,20 45,15 50,10 Z"/>
          </svg>
        </div>

        <div className="absolute top-[20%] right-[10%] w-16 h-16 lg:w-20 lg:h-20 opacity-15 -rotate-[25deg] z-8">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C60,20 80,25 90,40 C85,50 70,55 60,65 C55,70 50,85 45,75 C40,60 35,55 25,50 C20,45 15,35 25,25 C35,20 45,15 50,10 Z"/>
          </svg>
        </div>

        <div className="absolute bottom-[15%] left-[15%] w-20 h-20 lg:w-25 lg:h-25 opacity-15 rotate-45 z-8">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C60,20 80,25 90,40 C85,50 70,55 60,65 C55,70 50,85 45,75 C40,60 35,55 25,50 C20,45 15,35 25,25 C35,20 45,15 50,10 Z"/>
          </svg>
        </div>

        {/* Tubercules de manioc en arrière-plan */}
        <div className="absolute bottom-[5%] right-[5%] w-32 h-16 lg:w-38 lg:h-15 opacity-12 rotate-[10deg] z-8">
          <svg viewBox="0 0 150 60" fill="currentColor">
            <ellipse cx="30" cy="30" rx="25" ry="15" />
            <ellipse cx="70" cy="25" rx="30" ry="18" />
            <ellipse cx="110" cy="35" rx="20" ry="12" />
          </svg>
        </div>

        {/* Contenu principal */}
        <div className="text-center z-15 max-w-4xl px-4 sm:px-8 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
            Manioc Gabon
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed drop-shadow-md max-w-2xl mx-auto">
            Découvrez la richesse nutritionnelle et culturelle du manioc gabonais
          </p>
        </div>
      </div>

      {/* Effet de dégradé en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-25 bg-gradient-to-t from-black/10 to-transparent"></div>
    </section>
  )
} 