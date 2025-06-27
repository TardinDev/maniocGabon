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
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-green-50 to-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800 mb-4">
            Nos Produits de Manioc
          </h2>
          <p className="text-lg sm:text-xl text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de produits à base de manioc gabonais
          </p>
        </div>

        {/* Bouton panier fixe */}
        <div className="fixed top-1/2 right-4 lg:right-8 transform -translate-y-1/2 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-black border-none rounded-full w-14 h-14 lg:w-16 lg:h-16 text-xl lg:text-2xl cursor-pointer shadow-lg transition-transform duration-300 relative flex items-center justify-center hover:scale-110"
          >
            <CartOutline
              color="yellow"
              width="28px"
              height="28px"
            />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Panier coulissant */}
        {showCart && !showCheckout && (
          <div className="fixed inset-0 z-50 lg:inset-y-0 lg:right-0 lg:left-auto">
            {/* Overlay pour mobile */}
            <div className="lg:hidden absolute inset-0 bg-black/50" onClick={() => setShowCart(false)}></div>
            
            <div className="relative lg:static bg-white w-full h-full lg:w-96 lg:h-screen shadow-xl p-4 sm:p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
                <h3 className="text-xl lg:text-2xl font-bold text-emerald-800">
                  Panier ({getTotalItems()})
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-none border-none text-xl cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-lg">Votre panier est vide</p>
                  <p className="text-sm">Ajoutez des produits pour commencer</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                        <div className="w-15 h-15 overflow-hidden rounded-lg flex items-center justify-center bg-green-50">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-emerald-800 mb-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-emerald-600 font-semibold">
                            {item.product.priceValue.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="bg-gray-200 border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="font-semibold min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="bg-emerald-600 text-white border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center hover:bg-emerald-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="bg-red-500 text-white border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center hover:bg-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base text-gray-600">Sous-total:</span>
                      <span className="text-base font-semibold text-emerald-700">
                        {getTotalPrice().toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base text-gray-600">Livraison:</span>
                      <span className="text-base font-semibold text-emerald-700">
                        {getDeliveryFee() === 0 ? 'Gratuit' : `${getDeliveryFee().toLocaleString()} FCFA`}
                      </span>
                    </div>
                    {getDeliveryFee() === 0 && (
                      <p className="text-xs text-green-600 mb-4">🎉 Livraison gratuite !</p>
                    )}
                    <div className="flex justify-between items-center mb-6 text-lg font-bold text-emerald-800">
                      <span>Total:</span>
                      <span>{getFinalTotal().toLocaleString()} FCFA</span>
                    </div>
                    
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-none rounded-lg py-4 text-lg font-semibold cursor-pointer hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300"
                    >
                      Passer la commande
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal de checkout */}
        {showCheckout && (
          <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowCheckout(false)}></div>
            
            <div className="relative bg-white w-full h-full lg:w-2/3 lg:max-w-4xl lg:h-4/5 lg:mx-auto lg:my-8 lg:rounded-lg shadow-xl p-4 sm:p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-800">
                  Finaliser votre commande
                </h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="bg-none border-none text-xl cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {orderConfirmed ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-8">✅</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-4">
                    Commande confirmée !
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Nous vous contacterons dans les plus brefs délais pour la livraison.
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-emerald-700 font-semibold">
                      📞 Vous recevrez un appel de confirmation sous 30 minutes
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Informations client */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-6">
                      Vos informations
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Prénom *"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="p-3 border-2 border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        placeholder="Nom *"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="p-3 border-2 border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input
                        type="tel"
                        placeholder="Téléphone * (+241...)"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="p-3 border-2 border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-emerald-500"
                      />
                      <input
                        type="email"
                        placeholder="Email (optionnel)"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="p-3 border-2 border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-emerald-500"
                      />
                    </div>

                    <textarea
                      placeholder="Adresse de livraison complète *"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-base outline-none resize-y mb-4 transition-colors focus:border-emerald-500"
                    />

                    <select
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-emerald-500"
                    >
                      <option value="Libreville">Libreville</option>
                      <option value="Port-Gentil">Port-Gentil</option>
                      <option value="Franceville">Franceville</option>
                      <option value="Oyem">Oyem</option>
                      <option value="Moanda">Moanda</option>
                      <option value="Lambaréné">Lambaréné</option>
                    </select>

                    {/* Mode de paiement */}
                    <div className="mt-8">
                      <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-4">
                        Mode de paiement
                      </h3>
                      
                      <div className="flex flex-col gap-3">
                        {paymentMethods.map(method => (
                          <label key={method.id} className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            customerInfo.paymentMethod === method.id 
                              ? 'border-emerald-600 bg-green-50' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={customerInfo.paymentMethod === method.id}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                              className="accent-emerald-600"
                            />
                            <span className="text-base font-medium">{method.name}</span>
                            {method.popular && (
                              <span className="bg-emerald-600 text-white px-2 py-1 rounded-xl text-xs font-semibold">
                                Populaire
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Résumé de commande */}
                  <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-6">
                      Résumé de la commande
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {item.product.name} x{item.quantity}
                          </span>
                          <span className="text-sm font-semibold text-emerald-700">
                            {(item.product.priceValue * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sous-total:</span>
                        <span className="font-semibold">{getTotalPrice().toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Livraison:</span>
                        <span className="font-semibold">
                          {getDeliveryFee() === 0 ? 'Gratuit' : `${getDeliveryFee().toLocaleString()} FCFA`}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-emerald-800 pt-2 border-t">
                        <span>Total:</span>
                        <span>{getFinalTotal().toLocaleString()} FCFA</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleOrderSubmit}
                      disabled={!validateForm()}
                      className={`w-full mt-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
                        validateForm()
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Confirmer la commande
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grille des catégories et produits */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Colonne gauche : Catégories */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 lg:sticky lg:top-8">
            <h3 className="text-xl lg:text-2xl font-bold text-emerald-800 mb-6 text-center">
              Catégories
            </h3>
            
            <ul className="list-none p-0 m-0 space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-4 lg:p-6 border-none rounded-lg font-medium cursor-pointer transition-all duration-300 flex items-center gap-3 text-left ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold' 
                        : 'bg-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.icon.startsWith('/') ? (
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        className="w-6 h-6 object-contain rounded"
                      />
                    ) : (
                      <span className="text-lg">{category.icon}</span>
                    )}
                    <span className="text-sm lg:text-base">{category.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : Produits */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Image du produit */}
                  <div className="h-40 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center border-b border-gray-200 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contenu du produit */}
                  <div className="p-4 lg:p-6">
                    <h4 className="text-lg lg:text-xl font-bold text-emerald-800 mb-2">
                      {product.name}
                    </h4>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-emerald-600">
                        {product.price}
                      </span>
                      
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-emerald-800"
                      >
                        Ajouter
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