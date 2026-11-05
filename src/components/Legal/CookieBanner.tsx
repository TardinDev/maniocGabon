import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../ui'

const KEY = 'mg.cookie-consent.v1'
export type CookieConsent = 'all' | 'essential'

function readConsent(): CookieConsent | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'all' || v === 'essential' ? v : null
  } catch {
    return null
  }
}

export function CookieBanner({ onNavigatePrivacy }: { onNavigatePrivacy: () => void }) {
  const [open, setOpen] = useState(() => readConsent() === null)

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener('mg:open-cookies', reopen)
    return () => window.removeEventListener('mg:open-cookies', reopen)
  }, [])

  const choose = (c: CookieConsent) => {
    try {
      localStorage.setItem(KEY, c)
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('mg:cookie-consent', { detail: c }))
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Gestion des cookies"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.8 }}
          className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[640px] rounded-[22px] bg-white/90 p-5 shadow-[var(--shadow-modal)] backdrop-blur-xl backdrop-saturate-150 sm:bottom-5 sm:p-6"
        >
          <div className="flex gap-4">
            <motion.span
              aria-hidden
              className="text-3xl"
              animate={{ rotate: [0, -15, 15, -8, 0] }}
              transition={{ duration: 1, delay: 1.4, repeat: 2, repeatDelay: 3 }}
            >
              🍪
            </motion.span>
            <div className="flex-1">
              <p className="text-[0.9375rem] font-semibold text-ink-900">Un petit cookie ?</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">
                Nous utilisons le stockage local pour mémoriser votre panier et vos favoris. Avec votre accord, nous
                mesurerons aussi l’audience de façon anonyme.{' '}
                <button onClick={onNavigatePrivacy} className="text-brand-600 hover:underline cursor-pointer">
                  En savoir plus
                </button>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => choose('all')}>
                  Tout accepter
                </Button>
                <Button size="sm" variant="ghost" className="bg-black/5" onClick={() => choose('essential')}>
                  Essentiels uniquement
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
