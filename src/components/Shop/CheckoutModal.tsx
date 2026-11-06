import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, MessageCircle, X } from 'lucide-react'
import { useShop } from '../../hooks/useShop'
import { gabonCities, paymentMethods } from '../../data'
import { Button, Confetti, Field, Mascot } from '../ui'
import { WHATSAPP_NUMBER, formatFCFA } from '../../lib/format'
import { isEmail, isGabonPhone, looksLikeSpam } from '../../lib/validation'
import { cn } from '../../lib/utils'
import type { CustomerInfo } from '../../types'

const emptyInfo: CustomerInfo = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: 'Libreville',
  paymentMethod: paymentMethods[0].id,
}

type Errors = Partial<Record<keyof CustomerInfo, string>>

function validate(info: CustomerInfo): Errors {
  const e: Errors = {}
  if (info.firstName.trim().length < 2) e.firstName = 'Indiquez votre prénom.'
  if (info.lastName.trim().length < 2) e.lastName = 'Indiquez votre nom.'
  if (!isGabonPhone(info.phone)) e.phone = 'Numéro gabonais attendu, ex. +241 07 12 34 56.'
  if (info.email && !isEmail(info.email)) e.email = 'Adresse e-mail invalide.'
  if (info.address.trim().length < 8) e.address = 'Précisez le quartier et un repère.'
  return e
}

type Confirmed = { number: string; message: string }

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, openCart, cart, subtotal, deliveryFee, total, clearCart } = useShop()
  const [info, setInfo] = useState<CustomerInfo>(emptyInfo)
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerInfo, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())

  useEffect(() => {
    if (isCheckoutOpen) startedAt.current = Date.now()
  }, [isCheckoutOpen])

  useEffect(() => {
    if (!isCheckoutOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const errors = validate(info)
  const showError = (f: keyof CustomerInfo) => (touched[f] || submitted) && errors[f]

  const set = (f: keyof CustomerInfo) => (v: string) => setInfo((p) => ({ ...p, [f]: v }))
  const blur = (f: keyof CustomerInfo) => () => setTouched((t) => ({ ...t, [f]: true }))

  function handleClose() {
    closeCheckout()
    if (confirmed) {
      setConfirmed(null)
      setInfo(emptyInfo)
      setTouched({})
      setSubmitted(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) {
      const first = Object.keys(errors)[0]
      document.getElementById(`co-${first}`)?.focus()
      return
    }
    if (looksLikeSpam(honeypot, startedAt.current)) return

    const number = `MG-${Date.now().toString(36).toUpperCase().slice(-6)}`
    const payment = paymentMethods.find((m) => m.id === info.paymentMethod)?.name ?? info.paymentMethod
    const lines = cart.map((i) => `• ${i.quantity} × ${i.product.name} — ${formatFCFA(i.product.priceValue * i.quantity)}`)
    const message = [
      `Bonjour Manioc Gabon 👋 Nouvelle commande ${number}`,
      '',
      ...lines,
      '',
      `Livraison : ${deliveryFee === 0 ? 'offerte' : formatFCFA(deliveryFee)}`,
      `Total : ${formatFCFA(total)}`,
      '',
      `${info.firstName} ${info.lastName} — ${info.phone}`,
      `${info.address}, ${info.city}`,
      `Paiement : ${payment}`,
    ].join('\n')

    setConfirmed({ number, message })
    clearCart()
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="pointer-events-none fixed inset-0 z-[61] grid place-items-end sm:place-items-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="pointer-events-auto relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] bg-paper shadow-[var(--shadow-modal)] sm:rounded-[28px]"
            >
              <header className="flex items-center justify-between gap-4 border-b border-black/5 px-6 py-4 sm:px-8">
                {!confirmed ? (
                  <button
                    onClick={() => {
                      closeCheckout()
                      openCart()
                    }}
                    className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Panier
                  </button>
                ) : (
                  <span />
                )}
                <button
                  onClick={handleClose}
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-ink-700 hover:bg-black/10 cursor-pointer"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto">
                {confirmed ? (
                  <div className="relative px-6 py-14 text-center sm:px-10">
                    <Confetti />
                    <Mascot className="mx-auto h-36 w-36" hop={1} />
                    <h2 id="checkout-title" className="mt-6 text-[2rem] font-semibold tracking-[-0.03em] text-ink-900">
                      Merci, {info.firstName} !
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-ink-500">
                      Votre commande <strong className="text-ink-900">{confirmed.number}</strong> est enregistrée. Nous vous
                      appelons au {info.phone} pour confirmer la livraison.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(confirmed.message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-medium text-white transition-transform hover:brightness-105 active:scale-95"
                      >
                        <MessageCircle className="h-5 w-5" /> Envoyer sur WhatsApp
                      </a>
                      <Button variant="link" onClick={handleClose}>
                        Continuer mes achats ›
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_320px]">
                    <div>
                      <h2 id="checkout-title" className="text-[1.75rem] font-semibold tracking-[-0.025em] text-ink-900">
                        Où devons-nous livrer ?
                      </h2>
                      <p className="mt-1 text-sm text-ink-500">Livraison sous 24 à 48 heures.</p>

                      {/* Honeypot — hidden from humans, bots love it */}
                      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                        <label>
                          Site web
                          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                        </label>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Field id="co-firstName" label="Prénom" autoComplete="given-name" value={info.firstName} onChange={set('firstName')} onBlur={blur('firstName')} error={showError('firstName')} />
                        <Field id="co-lastName" label="Nom" autoComplete="family-name" value={info.lastName} onChange={set('lastName')} onBlur={blur('lastName')} error={showError('lastName')} />
                        <Field id="co-phone" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" value={info.phone} onChange={set('phone')} onBlur={blur('phone')} error={showError('phone')} />
                        <Field id="co-email" label="E-mail (facultatif)" type="email" autoComplete="email" value={info.email} onChange={set('email')} onBlur={blur('email')} error={showError('email')} />
                        <Field id="co-address" className="sm:col-span-2" label="Adresse (quartier, repère)" autoComplete="street-address" value={info.address} onChange={set('address')} onBlur={blur('address')} error={showError('address')} />
                        <div className="sm:col-span-2">
                          <label htmlFor="co-city" className="sr-only">Ville</label>
                          <select
                            id="co-city"
                            value={info.city}
                            onChange={(e) => set('city')(e.target.value)}
                            className="h-14 w-full cursor-pointer rounded-xl border border-black/15 bg-white px-4 text-[1.0625rem] text-ink-900 outline-none transition-colors focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15"
                          >
                            {gabonCities.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <fieldset className="mt-8">
                        <legend className="text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink-900">Paiement</legend>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {paymentMethods.map((m) => {
                            const active = info.paymentMethod === m.id
                            return (
                              <label
                                key={m.id}
                                className={cn(
                                  'relative flex cursor-pointer flex-col gap-1 rounded-xl border bg-white p-4 transition-all',
                                  active ? 'border-brand-600 ring-4 ring-brand-500/15' : 'border-black/15 hover:border-black/30',
                                )}
                              >
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={m.id}
                                  checked={active}
                                  onChange={(e) => set('paymentMethod')(e.target.value)}
                                  className="sr-only"
                                />
                                <motion.span
                                  className="text-2xl"
                                  animate={active ? { rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] } : { rotate: 0, scale: 1 }}
                                  transition={{ duration: 0.45 }}
                                >
                                  {m.icon}
                                </motion.span>
                                <span className="text-sm font-semibold text-ink-900">{m.name}</span>
                                <span className="text-xs text-ink-500">{m.description}</span>
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>
                    </div>

                    <aside className="h-fit rounded-[18px] bg-white p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-0">
                      <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink-900">Récapitulatif</h3>
                      <ul className="mt-4 max-h-56 space-y-2 overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <li key={item.product.id} className="flex justify-between gap-3 text-sm">
                            <span className="truncate text-ink-700">
                              {item.product.name} <span className="text-ink-400">× {item.quantity}</span>
                            </span>
                            <span className="whitespace-nowrap tabular-nums text-ink-900">
                              {formatFCFA(item.product.priceValue * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <dl className="mt-4 space-y-1.5 border-t border-black/5 pt-4 text-sm">
                        <div className="flex justify-between text-ink-500">
                          <dt>Sous-total</dt>
                          <dd className="tabular-nums text-ink-900">{formatFCFA(subtotal)}</dd>
                        </div>
                        <div className="flex justify-between text-ink-500">
                          <dt>Livraison</dt>
                          <dd className="tabular-nums text-ink-900">{deliveryFee === 0 ? 'Offerte' : formatFCFA(deliveryFee)}</dd>
                        </div>
                        <div className="flex justify-between pt-2 text-[1.0625rem] font-semibold text-ink-900">
                          <dt>Total</dt>
                          <dd className="tabular-nums">{formatFCFA(total)}</dd>
                        </div>
                      </dl>
                      <Button type="submit" size="lg" className="mt-5 w-full" disabled={cart.length === 0}>
                        Confirmer la commande
                      </Button>
                      <p className="mt-3 text-center text-xs text-ink-400">
                        En commandant, vous acceptez nos{' '}
                        <a href="#cgu" onClick={handleClose} className="underline">conditions générales</a>.
                      </p>
                    </aside>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
