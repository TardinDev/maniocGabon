import React, { useState } from 'react'
import type { Product, CartItem, CustomerInfo } from '../../../types'
import { products, categories, paymentMethods } from '../../../data'
import { CartOutline } from 'react-ionicons'

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('batons')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Libreville',
    paymentMethod: 'mobile_money'
  })
  const [orderConfirmed, setOrderConfirmed] = useState(false)



  const filteredProducts = products.filter(product => product.category === selectedCategory)

  // Fonctions du panier
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.priceValue * item.quantity), 0)
  }

  const getDeliveryFee = () => {
    const total = getTotalPrice()
    return total >= 10000 ? 0 : 2000 // Livraison gratuite au-dessus de 10000 FCFA
  }

  const getFinalTotal = () => {
    return getTotalPrice() + getDeliveryFee()
  }

  // Fonctions de checkout
  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    return customerInfo.firstName && 
           customerInfo.lastName && 
           customerInfo.phone && 
           customerInfo.address && 
           customerInfo.city
  }

  const handleOrderSubmit = () => {
    if (validateForm()) {
      setOrderConfirmed(true)
      // Ici vous pouvez envoyer la commande à votre backend
      console.log('Commande confirmée:', { customerInfo, cart, total: getFinalTotal() })
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setCart([])
        setShowCart(false)
        setShowCheckout(false)
        setOrderConfirmed(false)
        setCustomerInfo({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          address: '',
          city: 'Libreville',
          paymentMethod: 'mobile_money'
        })
      }, 3000)
    }
  }



  return (
    <section style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(to bottom, #f0fdf4, #ffffff)',
      minHeight: '80vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Titre de la section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            color: '#064e3b',
            marginBottom: '1rem'
          }}>
            Nos Produits de Manioc
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#047857',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Découvrez notre gamme complète de produits à base de manioc gabonais
          </p>
        </div>

        {/* Bouton panier fixe */}
        <div style={{
          position: 'fixed',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          zIndex: 1000
        }}>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'black',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <CartOutline
              color="yellow"
              width="28px"
              height="28px"
            />
            {getTotalItems() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Panier coulissant */}
        {showCart && !showCheckout && (
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            height: '100vh',
            background: 'white',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
            zIndex: 1001,
            padding: '2rem',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#064e3b',
                margin: 0
              }}>
                Panier ({getTotalItems()})
              </h3>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 0',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                <p>Votre panier est vide</p>
                <p style={{ fontSize: '0.9rem' }}>Ajoutez des produits pour commencer</p>
              </div>
            ) : (
              <>
                <div style={{
                  marginBottom: '2rem'
                }}>
                  {cart.map(item => (
                    <div key={item.product.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '10px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ 
                        width: '60px', 
                        height: '60px',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0fdf4'
                      }}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#064e3b',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {item.product.name}
                        </h4>
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#059669',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          {item.product.priceValue.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            background: '#e5e7eb',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        <span style={{
                          fontWeight: '600',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            background: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid #e5e7eb',
                  paddingTop: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1rem', color: '#6b7280' }}>
                      Sous-total:
                    </span>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#064e3b'
                    }}>
                      {getTotalPrice().toLocaleString()} FCFA
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1rem', color: '#6b7280' }}>
                      Livraison:
                    </span>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: getDeliveryFee() === 0 ? '#10b981' : '#064e3b'
                    }}>
                      {getDeliveryFee() === 0 ? 'GRATUITE' : `${getDeliveryFee().toLocaleString()} FCFA`}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#064e3b'
                    }}>
                      Total:
                    </span>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#059669'
                    }}>
                      {getFinalTotal().toLocaleString()} FCFA
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => setShowCheckout(true)}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #059669, #047857)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    Finaliser la commande
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Page de checkout */}
        {showCheckout && !orderConfirmed && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1002,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid #e5e7eb'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#064e3b',
                  margin: 0
                }}>
                  Finaliser votre commande
                </h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Informations client */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#064e3b',
                  marginBottom: '1rem'
                }}>
                  Vos informations
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <input
                    type="text"
                    placeholder="Prénom *"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Nom *"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <input
                    type="tel"
                    placeholder="Téléphone * (+241...)"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email (optionnel)"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
                </div>

                <textarea
                  placeholder="Adresse de livraison complète *"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '1rem'
                  }}
                />

                <select
                  value={customerInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  <option value="Libreville">Libreville</option>
                  <option value="Port-Gentil">Port-Gentil</option>
                  <option value="Franceville">Franceville</option>
                  <option value="Oyem">Oyem</option>
                  <option value="Moanda">Moanda</option>
                  <option value="Lambaréné">Lambaréné</option>
                </select>
              </div>

              {/* Mode de paiement */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#064e3b',
                  marginBottom: '1rem'
                }}>
                  Mode de paiement
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {paymentMethods.map(method => (
                    <label key={method.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      border: customerInfo.paymentMethod === method.id ? '2px solid #059669' : '2px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: customerInfo.paymentMethod === method.id ? '#f0fdf4' : 'white'
                    }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={customerInfo.paymentMethod === method.id}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        style={{ accentColor: '#059669' }}
                      />
                      <span style={{ fontSize: '1rem', fontWeight: '500' }}>
                                                      {method.name}
                      </span>
                      {method.popular && (
                        <span style={{
                          background: '#059669',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          Populaire
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Résumé de commande */}
              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '10px',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#064e3b',
                  marginBottom: '1rem'
                }}>
                  Résumé de votre commande
                </h3>
                
                {cart.map(item => (
                  <div key={item.product.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span style={{ fontWeight: '600' }}>
                      {(item.product.priceValue * item.quantity).toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
                
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '0.75rem',
                  marginTop: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span>Livraison:</span>
                    <span style={{ color: getDeliveryFee() === 0 ? '#10b981' : '#064e3b' }}>
                      {getDeliveryFee() === 0 ? 'GRATUITE' : `${getDeliveryFee().toLocaleString()} FCFA`}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#059669'
                  }}>
                    <span>Total:</span>
                    <span>{getFinalTotal().toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              {/* Bouton de confirmation */}
              <button
                onClick={handleOrderSubmit}
                disabled={!validateForm()}
                style={{
                  width: '100%',
                  background: validateForm() 
                    ? 'linear-gradient(135deg, #059669, #047857)' 
                    : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  cursor: validateForm() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
              >
                Confirmer la commande
              </button>
              
              {!validateForm() && (
                <p style={{
                  textAlign: 'center',
                  color: '#ef4444',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem'
                }}>
                  Veuillez remplir tous les champs obligatoires (*)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Confirmation de commande */}
        {orderConfirmed && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1003,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '3rem',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                ✅
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '1rem'
              }}>
                Commande confirmée !
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Votre commande a été envoyée avec succès. Vous recevrez un appel de confirmation dans les plus brefs délais.
              </p>
              <div style={{
                background: '#f0fdf4',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #bbf7d0'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#047857',
                  margin: 0
                }}>
                  📞 Nous vous contacterons au <strong>{customerInfo.phone}</strong><br/>
                  🚚 Livraison prévue sous 24-48h à {customerInfo.city}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Overlay pour fermer le panier */}
        {(showCart && !showCheckout) && (
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: '400px',
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1000
            }}
          />
        )}

        {/* Contenu principal : deux colonnes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Colonne gauche : Catégories */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#064e3b',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Catégories
            </h3>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {categories.map(category => (
                <li key={category.id} style={{ marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      border: 'none',
                      borderRadius: '10px',
                      background: selectedCategory === category.id 
                        ? 'linear-gradient(135deg, #059669, #047857)' 
                        : 'transparent',
                      color: selectedCategory === category.id ? 'white' : '#374151',
                      fontSize: '1rem',
                      fontWeight: selectedCategory === category.id ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.background = '#f3f4f6'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {category.icon.startsWith('/') ? (
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          objectFit: 'contain',
                          borderRadius: '4px'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                    )}
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : Produits */}
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Image du produit */}
                  <div style={{
                    height: '150px',
                    background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Contenu du produit */}
                  <div style={{
                    padding: '1.5rem'
                  }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#064e3b',
                      marginBottom: '0.5rem'
                    }}>
                      {product.name}
                    </h4>
                    
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#6b7280',
                      lineHeight: '1.5',
                      marginBottom: '1rem'
                    }}>
                      {product.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#059669'
                      }}>
                        {product.price}
                      </span>
                      
                      <button 
                        onClick={() => addToCart(product)}
                        style={{
                          background: 'linear-gradient(135deg, #059669, #047857)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 