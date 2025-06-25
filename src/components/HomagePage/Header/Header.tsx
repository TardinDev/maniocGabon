import React from 'react'
import { navigationLinks } from '../../../data'

export default function Header() {
    
  return (
    <header style={{
      background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)',
      minHeight: '60vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      color: 'white'
    }}>
      {/* Menu de navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 20
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <img 
            src="/logo.png" 
            alt="Manioc Gabon Logo" 
            style={{
              width: '45px',
              height: '45px',
              objectFit: 'contain',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)',
              padding: '4px'
            }}
          />
          Manioc Gabon
        </div>
        
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          alignItems: 'center'
        }}>
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: '500', 
                  transition: 'opacity 0.3s' 
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenu principal centré */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage: 'url(/banniere.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(6, 78, 59, 0.7)',
          zIndex: 5
        }}></div>
        {/* Motifs décoratifs de feuilles de manioc */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '120px',
          height: '120px',
          opacity: 0.15,
          transform: 'rotate(15deg)',
          zIndex: 8
        }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C60,20 80,25 90,40 C85,50 70,55 60,65 C55,70 50,85 45,75 C40,60 35,55 25,50 C20,45 15,35 25,25 C35,20 45,15 50,10 Z"/>
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '80px',
          height: '80px',
          opacity: 0.15,
          transform: 'rotate(-25deg)',
          zIndex: 8
        }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C60,20 80,25 90,40 C85,50 70,55 60,65 C55,70 50,85 45,75 C40,60 35,55 25,50 C20,45 15,35 25,25 C35,20 45,15 50,10 Z"/>
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '100px',
          height: '100px',
          opacity: 0.15,
          transform: 'rotate(45deg)',
          zIndex: 8
        }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C60,20 80,25 90,40 C85,50 70,55 60,65 C55,70 50,85 45,75 C40,60 35,55 25,50 C20,45 15,35 25,25 C35,20 45,15 50,10 Z"/>
          </svg>
        </div>

        {/* Tubercules de manioc en arrière-plan */}
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '150px',
          height: '60px',
          opacity: 0.12,
          transform: 'rotate(10deg)',
          zIndex: 8
        }}>
          <svg viewBox="0 0 150 60" fill="currentColor">
            <ellipse cx="30" cy="30" rx="25" ry="15" />
            <ellipse cx="70" cy="25" rx="30" ry="18" />
            <ellipse cx="110" cy="35" rx="20" ry="12" />
          </svg>
        </div>

        {/* Contenu principal */}
        <div style={{
          textAlign: 'center',
          zIndex: 15,
          maxWidth: '800px',
          padding: '0 2rem',
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            lineHeight: '1.1'
          }}>
            Manioc Gabon
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Découvrez la richesse nutritionnelle et culturelle du manioc gabonais
          </p>


        </div>
      </div>

      {/* Effet de dégradé en bas */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)'
      }}></div>
    </header>
  )
}
