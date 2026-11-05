import { useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import toast from 'react-hot-toast'
import { ArrowRight, Check } from 'lucide-react'
import { isEmail, looksLikeSpam } from '../../../lib/validation'
import type { Page } from '../../../lib/routes'

type Link = { label: string; page?: Page; hash?: string; href?: string }

const columns: { title: string; links: Link[] }[] = [
  {
    title: 'Boutique',
    links: [
      { label: 'Tous les produits', hash: 'produits' },
      { label: 'Comment ça marche', hash: 'fonctionnement' },
      { label: 'Questions fréquentes', hash: 'faq' },
    ],
  },
  {
    title: 'Découvrir',
    links: [
      { label: 'Culture du manioc', page: 'culture' },
      { label: 'Valeurs nutritionnelles', page: 'nutrition' },
      { label: 'Recettes traditionnelles', page: 'recettes' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+241 01 23 45 67', href: 'tel:+24101234567' },
      { label: 'contact@maniocgabon.ga', href: 'mailto:contact@maniocgabon.ga' },
      { label: 'Nous écrire', hash: 'contact' },
    ],
  },
]

const socials = [
  { name: 'Facebook', href: 'https://facebook.com', emoji: '👍' },
  { name: 'Instagram', href: 'https://instagram.com', emoji: '📸' },
  { name: 'TikTok', href: 'https://tiktok.com', emoji: '🎵' },
  { name: 'WhatsApp', href: 'https://wa.me/24101234567', emoji: '💬' },
]

export default function Footer({ onNavigate }: { onNavigate: (page: Page, section?: string) => void }) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const startedAt = useRef(Date.now())

  function subscribe(e: FormEvent) {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Entrez une adresse e-mail valide.')
      return
    }
    setError('')
    if (looksLikeSpam(honeypot, startedAt.current, 1500)) return
    setDone(true)
    setEmail('')
    toast.success('Bienvenue dans la récolte ! 🌱')
  }

  const go = (l: Link) => {
    if (l.page) onNavigate(l.page)
    else if (l.hash) onNavigate(l.hash === 'contact' ? 'contact' : 'accueil', l.hash)
  }

  return (
    <footer className="bg-cream-50 px-4 sm:px-6 text-[0.8125rem] text-ink-500">
      <div className="mx-auto max-w-[1024px]">
        {/* Newsletter */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-black/10 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-900">Recevez la récolte de la semaine.</h2>
            <p className="mt-1 text-[0.9375rem]">Nouveautés, recettes et offres. Un e-mail par mois, pas plus.</p>
          </div>
          <form onSubmit={subscribe} noValidate className="w-full md:w-auto">
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className="relative flex w-full md:w-[380px]">
              <label htmlFor="nl-email" className="sr-only">Adresse e-mail</label>
              <input
                id="nl-email"
                type="email"
                autoComplete="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setDone(false)
                }}
                aria-invalid={!!error}
                className="h-12 w-full rounded-full border border-black/15 bg-white pl-5 pr-14 text-[0.9375rem] text-ink-900 outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15"
              />
              <button
                type="submit"
                aria-label="S’inscrire à la newsletter"
                className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-600 active:scale-90 cursor-pointer"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={done ? 'ok' : 'go'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                    {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <ArrowRight className="h-4 w-4" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            {error && <p role="alert" className="mt-2 px-2 text-xs text-clay-500">{error}</p>}
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="h-8 w-auto" width={26} height={32} />
              <span className="text-[0.9375rem] font-semibold text-ink-900">Manioc Gabon</span>
            </div>
            <p className="mt-3 max-w-[220px] leading-relaxed">Le manioc du terroir gabonais, du champ à votre table.</p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-base shadow-sm transition-transform hover:-translate-y-1 hover:rotate-12 active:scale-90"
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="font-semibold text-ink-900">{c.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a href={l.href} className="hover:text-ink-900 hover:underline underline-offset-2">{l.label}</a>
                    ) : (
                      <button onClick={() => go(l)} className="text-left hover:text-ink-900 hover:underline underline-offset-2 cursor-pointer">
                        {l.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 border-t border-black/10 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Manioc Gabon. Tous droits réservés. Fait avec 🌿 à Libreville.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {(
              [
                ['Confidentialité', 'confidentialite'],
                ['Conditions générales', 'cgu'],
                ['Mentions légales', 'mentions'],
              ] as const
            ).map(([label, page]) => (
              <li key={page}>
                <button onClick={() => onNavigate(page)} className="hover:text-ink-900 hover:underline cursor-pointer">
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => window.dispatchEvent(new Event('mg:open-cookies'))}
                className="hover:text-ink-900 hover:underline cursor-pointer"
              >
                Gérer les cookies
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
