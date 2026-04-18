import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Truck,
} from 'lucide-react'
import type { Product, CartItem, CustomerInfo } from '../../../types'
import { products, categories, paymentMethods } from '../../../data'
import { Button, Card, CardBody, CardMedia, Badge } from '../../ui'
import { cn } from '../../../lib/utils'

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
    paymentMethod: 'mobile_money',
  })
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const filteredProducts = products.filter((p) => p.category === selectedCategory)

  const addToCart = (product: Product) =>
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      return existing
        ? prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { product, quantity: 1 }]
    })

  const removeFromCart = (id: number) => setCart((p) => p.filter((i) => i.product.id !== id))

  const updateQuantity = (id: number, q: number) => {
    if (q <= 0) return removeFromCart(id)
    setCart((p) => p.map((i) => (i.product.id === id ? { ...i, quantity: q } : i)))
  }

  const totalItems = cart.reduce((t, i) => t + i.quantity, 0)
  const totalPrice = cart.reduce((t, i) => t + i.product.priceValue * i.quantity, 0)
  const deliveryFee = totalPrice >= 10000 ? 0 : 2000
  const finalTotal = totalPrice + deliveryFee

  const handleInputChange = (field: keyof CustomerInfo, value: string) =>
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))

  const validateForm = () =>
    !!(customerInfo.firstName && customerInfo.lastName && customerInfo.phone && customerInfo.address && customerInfo.city)

  const handleOrderSubmit = () => {
    if (!validateForm()) return
    setOrderConfirmed(true)
    console.log('Commande confirmée:', { customerInfo, cart, total: finalTotal })
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
        paymentMethod: 'mobile_money',
      })
    }, 3000)
  }

  return (
    <section id="produits" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-cream-50">
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B6E8C8, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-[0.7rem] uppercase tracking-[0.22em] text-brand-800 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            Boutique
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink-900 text-balance leading-[1]"
          >
            La sélection du <span className="italic text-brand-700">terroir</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed"
          >
            Tubercules, feuilles et farines. Chaque produit est sélectionné à la main chez nos producteurs partenaires.
          </motion.p>
        </div>

        {/* Floating cart button */}
        <button
          onClick={() => setShowCart(!showCart)}
          aria-label={`Ouvrir le panier (${totalItems})`}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 group flex items-center gap-2 rounded-full bg-brand-800 text-white pl-4 pr-5 py-3.5 shadow-[0_20px_40px_-12px_rgba(15,74,48,0.5)] hover:bg-brand-900 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <span className="relative grid place-items-center w-8 h-8 rounded-full bg-gold-400/20 text-gold-400">
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-clay-500 text-white rounded-full min-w-[20px] h-5 px-1 text-[11px] grid place-items-center font-semibold">
                {totalItems}
              </span>
            )}
          </span>
          <span className="text-sm font-medium">Panier</span>
        </button>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
          {/* Category rail */}
          <aside className="lg:sticky lg:top-28 glass rounded-3xl p-6 lg:p-7 border border-brand-100/80">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-semibold text-ink-900">Catégories</h3>
              <span className="text-xs text-ink-500">{categories.length}</span>
            </div>
            <ul className="space-y-1">
              {categories.map((c) => {
                const active = selectedCategory === c.id
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelectedCategory(c.id)}
                      className={cn(
                        'group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer',
                        active
                          ? 'bg-brand-800 text-white shadow-[0_10px_24px_-10px_rgba(15,74,48,0.6)]'
                          : 'text-ink-700 hover:bg-brand-50 hover:text-brand-800',
                      )}
                    >
                      <span
                        className={cn(
                          'grid place-items-center w-9 h-9 rounded-xl transition-colors',
                          active ? 'bg-white/10' : 'bg-brand-50',
                        )}
                      >
                        {c.icon.startsWith('/') ? (
                          <img src={c.icon} alt="" className="w-5 h-5 object-contain" />
                        ) : (
                          <span className="text-base">{c.icon}</span>
                        )}
                      </span>
                      <span className="flex-1 text-left">{c.name}</span>
                      <span
                        className={cn(
                          'text-xs transition-transform duration-300',
                          active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60',
                        )}
                      >
                        →
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-gold-400/15 to-gold-500/5 border border-gold-400/30">
              <div className="flex items-center gap-2 text-gold-600 mb-1">
                <Truck className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">Livraison offerte</span>
              </div>
              <p className="text-xs text-ink-700 leading-relaxed">
                À partir de <span className="font-semibold">10 000 FCFA</span> d'achat sur Libreville.
              </p>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
              >
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="h-full flex flex-col">
                      <CardMedia className="aspect-[4/3]">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-3 left-3">
                          <Badge variant="glass">
                            <Leaf />
                            Frais
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <Button
                            onClick={() => addToCart(product)}
                            variant="gold"
                            size="sm"
                            aria-label={`Ajouter ${product.name}`}
                          >
                            <Plus className="w-4 h-4" />
                            Ajouter
                          </Button>
                        </div>
                      </CardMedia>

                      <CardBody className="flex-1 flex flex-col">
                        <h4 className="font-display text-lg lg:text-xl font-semibold text-ink-900 mb-1.5 leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <div className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-500">Prix</div>
                            <div className="font-display text-xl font-semibold text-brand-800">{product.price}</div>
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            aria-label={`Ajouter ${product.name} au panier`}
                            className="sm:hidden grid place-items-center w-11 h-11 rounded-full bg-brand-800 text-white hover:bg-brand-900 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-800 hover:text-brand-900 transition-colors cursor-pointer group/btn"
                          >
                            <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
                            Ajouter
                          </button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && !showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setShowCart(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-100">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink-900">Votre panier</h3>
                  <p className="text-xs text-ink-500 mt-0.5">{totalItems} article{totalItems > 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="grid place-items-center w-10 h-10 rounded-full bg-brand-50 text-ink-700 hover:bg-brand-100 transition-colors cursor-pointer"
                  aria-label="Fermer le panier"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-ink-500">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 grid place-items-center">
                      <ShoppingBag className="w-7 h-7 text-brand-700" />
                    </div>
                    <p className="font-display text-lg text-ink-900">Votre panier est vide</p>
                    <p className="text-sm mt-1">Ajoutez des produits pour commencer</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((item) => (
                      <li key={item.product.id} className="flex items-center gap-4 p-3 rounded-2xl bg-cream-50 border border-brand-100/60">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-50 shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-base font-semibold text-ink-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-brand-700 font-medium">
                            {item.product.priceValue.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="grid place-items-center w-8 h-8 rounded-full bg-white border border-brand-100 text-ink-700 hover:bg-brand-50 transition-colors cursor-pointer"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="grid place-items-center w-8 h-8 rounded-full bg-brand-800 text-white hover:bg-brand-900 transition-colors cursor-pointer"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="grid place-items-center w-8 h-8 rounded-full text-clay-500 hover:bg-clay-500/10 transition-colors cursor-pointer"
                          aria-label="Retirer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-brand-100 p-6 bg-cream-50/60">
                  <div className="space-y-2 text-sm mb-5">
                    <div className="flex justify-between text-ink-500">
                      <span>Sous-total</span>
                      <span className="font-medium text-ink-900">{totalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-ink-500">
                      <span>Livraison</span>
                      <span className="font-medium text-ink-900">
                        {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toLocaleString()} FCFA`}
                      </span>
                    </div>
                    {deliveryFee === 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-brand-700 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                        Livraison offerte
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-brand-100">
                      <span className="font-display text-lg font-semibold text-ink-900">Total</span>
                      <span className="font-display text-lg font-semibold text-brand-800">
                        {finalTotal.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowCheckout(true)}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Passer la commande
                  </Button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Checkout modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm"
              onClick={() => setShowCheckout(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 grid place-items-center p-4"
            >
              <div className="relative bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-brand-100">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">
                      Finaliser la commande
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">Livraison sous 24 à 48 heures</p>
                  </div>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="grid place-items-center w-10 h-10 rounded-full bg-brand-50 text-ink-700 hover:bg-brand-100 transition-colors cursor-pointer"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                  {orderConfirmed ? (
                    <div className="text-center py-16">
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-50 grid place-items-center"
                      >
                        <CheckCircle2 className="w-10 h-10 text-brand-700" />
                      </motion.div>
                      <h3 className="font-display text-3xl font-semibold text-ink-900 mb-3">
                        Commande confirmée
                      </h3>
                      <p className="text-ink-500 max-w-md mx-auto mb-6">
                        Merci pour votre confiance. Nous vous contacterons très vite pour la livraison.
                      </p>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-50 border border-brand-100 text-sm text-brand-800">
                        <Sparkles className="w-4 h-4 text-gold-500" />
                        Appel de confirmation sous 30 minutes
                      </div>
                    </div>
                  ) : (
                    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                      {/* Form */}
                      <div>
                        <h3 className="font-display text-xl font-semibold text-ink-900 mb-5">
                          Vos informations
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <Input placeholder="Prénom *" value={customerInfo.firstName} onChange={(v) => handleInputChange('firstName', v)} />
                          <Input placeholder="Nom *" value={customerInfo.lastName} onChange={(v) => handleInputChange('lastName', v)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <Input type="tel" placeholder="Téléphone * (+241...)" value={customerInfo.phone} onChange={(v) => handleInputChange('phone', v)} />
                          <Input type="email" placeholder="Email (optionnel)" value={customerInfo.email} onChange={(v) => handleInputChange('email', v)} />
                        </div>
                        <textarea
                          placeholder="Adresse de livraison complète *"
                          value={customerInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-2xl border border-brand-100 bg-cream-50/40 text-sm outline-none transition-colors focus:border-brand-600 focus:bg-white mb-3 resize-y"
                        />
                        <select
                          value={customerInfo.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl border border-brand-100 bg-cream-50/40 text-sm outline-none transition-colors focus:border-brand-600 focus:bg-white cursor-pointer"
                        >
                          <option value="Libreville">Libreville</option>
                          <option value="Port-Gentil">Port-Gentil</option>
                          <option value="Franceville">Franceville</option>
                          <option value="Oyem">Oyem</option>
                          <option value="Moanda">Moanda</option>
                          <option value="Lambaréné">Lambaréné</option>
                        </select>

                        <h3 className="font-display text-xl font-semibold text-ink-900 mt-8 mb-4">
                          Mode de paiement
                        </h3>
                        <div className="space-y-2">
                          {paymentMethods.map((m) => {
                            const active = customerInfo.paymentMethod === m.id
                            return (
                              <label
                                key={m.id}
                                className={cn(
                                  'flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer',
                                  active
                                    ? 'border-brand-600 bg-brand-50/50'
                                    : 'border-brand-100 bg-white hover:border-brand-200',
                                )}
                              >
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={m.id}
                                  checked={active}
                                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                  className="accent-brand-700"
                                />
                                <span className="text-sm font-medium text-ink-900 flex-1">{m.name}</span>
                                {m.popular && <Badge variant="gold">Populaire</Badge>}
                              </label>
                            )
                          })}
                        </div>
                      </div>

                      {/* Summary */}
                      <aside className="rounded-3xl bg-cream-50 border border-brand-100 p-6 h-fit lg:sticky lg:top-0">
                        <h3 className="font-display text-xl font-semibold text-ink-900 mb-4">Résumé</h3>
                        <ul className="space-y-2 mb-5 max-h-64 overflow-y-auto pr-1">
                          {cart.map((item) => (
                            <li key={item.product.id} className="flex justify-between text-sm">
                              <span className="text-ink-700 truncate pr-3">
                                {item.product.name}
                                <span className="text-ink-500"> × {item.quantity}</span>
                              </span>
                              <span className="font-semibold text-brand-800 whitespace-nowrap">
                                {(item.product.priceValue * item.quantity).toLocaleString()} F
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-brand-100 pt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-ink-500">Sous-total</span>
                            <span className="font-medium text-ink-900">{totalPrice.toLocaleString()} FCFA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink-500">Livraison</span>
                            <span className="font-medium text-ink-900">
                              {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toLocaleString()} FCFA`}
                            </span>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-brand-100">
                            <span className="font-display text-lg font-semibold text-ink-900">Total</span>
                            <span className="font-display text-lg font-semibold text-brand-800">
                              {finalTotal.toLocaleString()} FCFA
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={handleOrderSubmit}
                          disabled={!validateForm()}
                          variant="primary"
                          size="lg"
                          className="w-full mt-5"
                        >
                          Confirmer la commande
                        </Button>
                      </aside>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ——— Helpers ——— */
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border border-brand-100 bg-cream-50/40 text-sm outline-none transition-colors focus:border-brand-600 focus:bg-white placeholder:text-ink-500"
    />
  )
}

function Leaf() {
  return (
    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor">
      <path d="M8,2 C10,4 13,4 14,7 C13,9 10.5,9.5 9,11 C8.5,11.5 8,13 7.5,12 C7,10 6,9 4,8 C3,7 2.5,5.5 4,4 C5.5,3.5 7,3 8,2 Z" />
    </svg>
  )
}
