import React from 'react'
import { footerLinks, socialNetworks } from '../../../data'

export default function Footer() {

  return (
    <footer id="contact" style={{
      background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)',
      color: 'white',
      padding: '4rem 2rem 2rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Contenu principal du footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* Section 1: À propos */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <img 
                src="/logo.png" 
                alt="Manioc Gabon Logo" 
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '4px'
                }}
              />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                Manioc Gabon
              </h3>
            </div>
            
            <p style={{
              lineHeight: '1.6',
              opacity: 0.9,
              marginBottom: '1.5rem',
              fontSize: '0.95rem'
            }}>
              Votre partenaire de confiance pour tous vos besoins en manioc gabonais. 
              Nous proposons des produits frais, naturels et de qualité supérieure 
              directement des producteurs locaux.
            </p>
            
            {/* Certifications */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🌱</span> Bio certifié
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🇬🇦</span> Made in Gabon
              </div>
            </div>
          </div>

          {/* Section 2: Liens rapides */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#a7f3d0'
            }}>
              Liens rapides
            </h3>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {footerLinks.map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'translateX(5px)'
                      e.currentTarget.style.color = '#a7f3d0'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.8'
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.color = 'white'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem' }}>→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#a7f3d0'
            }}>
              Contactez-nous
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                    Libreville, Gabon<br/>
                    Quartier Montagne Sainte
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📞</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                    +241 01 23 45 67<br/>
                    +241 07 89 01 23
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                    contact@maniocgabon.ga<br/>
                    commandes@maniocgabon.ga
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>🕒</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                    Lun - Ven: 8h - 18h<br/>
                    Sam: 8h - 14h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Réseaux sociaux et Newsletter */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#a7f3d0'
            }}>
              Suivez-nous
            </h3>
            
            {/* Réseaux sociaux */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {socialNetworks.map(social => (
                <a
                  key={social.name}
                  href="#"
                  style={{
                    width: '45px',
                    height: '45px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div>
              <p style={{
                fontSize: '0.95rem',
                marginBottom: '1rem',
                opacity: 0.9
              }}>
                Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités
              </p>
              
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.1)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.2)',
          margin: '2rem 0'
        }}></div>

        {/* Footer bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            © 2025 Manioc Gabon. Tous droits réservés.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '0.9rem'
          }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
              Mentions légales
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
              Politique de confidentialité
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 