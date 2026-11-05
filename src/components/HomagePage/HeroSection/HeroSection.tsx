import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Check, Plus, Smartphone, Sprout, Truck } from 'lucide-react'
import { Button } from '../../ui'
import { useShop } from '../../../hooks/useShop'
import { products } from '../../../data'
import { formatFCFA } from '../../../lib/format'

const ease = [0.22, 1, 0.36, 1] as const

const featured = products.find((p) => p.id === 6) ?? products[0]

const trust = [
  { Icon: Sprout, title: '100 % Gabon', text: 'Producteurs locaux' },
  { Icon: Truck, title: '24 – 48 h', text: 'Livraison à Libreville' },
  { Icon: Smartphone, title: 'Mobile Money', text: 'Ou paiement à la livraison' },
]

export default function HeroSection({ onDiscover }: { onDiscover?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const thumbRef = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()
  const { addToCart } = useShop()
  const [added, setAdded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '10%'])
  const cardY = useTransform(scrollYProgress, [0, 1], reduce || !isDesktop ? [0, 0] : [0, -60])

  const unit = featured.price.split('/')[1]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-paper">
      {/* Soft brand glow behind the visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full opacity-60 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(79,185,127,0.28), transparent 65%)' }}
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-20 pt-10 sm:pt-14 lg:min-h-[calc(100svh-48px)] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-16">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-700 shadow-sm ring-1 ring-black/5"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Nouvelle récolte 2026 disponible
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-6 text-[clamp(2.75rem,6.2vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-900 text-balance"
          >
            Le manioc.{' '}
            <span className="bg-gradient-to-r from-brand-700 via-brand-500 to-gold-500 bg-clip-text text-transparent">
              Version Gabon.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-[520px] text-[1.1875rem] leading-[1.5] text-ink-500 text-pretty lg:mx-0 lg:text-[1.3125rem]"
          >
            Tubercules, bâtons, feuilles et farines récoltés chez nos producteurs, puis livrés frais chez vous en
            48 heures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 lg:justify-start"
          >
            <Button size="xl" onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}>
              Commander maintenant
            </Button>
            <Button variant="link" size="lg" onClick={onDiscover}>
              Découvrir la culture du manioc ›
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
            className="mx-auto mt-12 grid max-w-[560px] grid-cols-3 divide-x divide-black/10 border-t border-black/10 pt-6 lg:mx-0"
          >
            {trust.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="hover-wiggle flex flex-col items-center gap-1.5 px-2 text-center lg:items-start lg:px-5 lg:text-left lg:first:pl-0"
              >
                <Icon className="wiggle-target h-5 w-5 text-brand-600" strokeWidth={1.8} aria-hidden />
                <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink-900">{title}</span>
                <span className="text-xs leading-snug text-ink-500">{text}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-brand-900 shadow-[0_30px_80px_-20px_rgba(15,74,48,0.45)] ring-1 ring-black/5 sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.img
              src="/banniere.jpg"
              alt="Bâtons de manioc enveloppés dans des feuilles et tubercules frais posés sur des feuilles de manioc"
              width={1600}
              height={1067}
              fetchPriority="high"
              style={{ y: imgY }}
              className="absolute inset-x-0 -top-[5%] h-[115%] w-full object-cover object-[42%_50%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease }}
              className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-medium text-ink-900 shadow-sm backdrop-blur-md sm:left-5 sm:top-5"
            >
              <span aria-hidden>🌿</span> Récolté ce matin · Woleu-Ntem
            </motion.div>

            <p className="absolute bottom-5 right-5 hidden max-w-[220px] text-right text-[0.8125rem] font-medium leading-snug text-white/90 sm:block">
              Bâtons préparés à la main, enveloppés dans les feuilles comme à la maison.
            </p>
          </div>

          {/* Floating product card — adds the featured product to the cart */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease }}
            className="absolute -bottom-8 left-4 right-4 sm:right-auto sm:w-[320px] lg:-left-10 lg:bottom-12"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 rounded-[20px] bg-white/95 p-3 pr-4 shadow-[var(--shadow-modal)] ring-1 ring-black/5 backdrop-blur-xl"
            >
              <img ref={thumbRef} src={featured.image} alt="" className="h-14 w-14 shrink-0 rounded-[14px] object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-gold-600">Le plus commandé</p>
                <p className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink-900">{featured.name}</p>
                <p className="text-xs text-ink-500 tabular-nums">
                  {formatFCFA(featured.priceValue)}
                  {unit && ` / ${unit}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(featured, thumbRef.current)
                  setAdded(true)
                  window.setTimeout(() => setAdded(false), 1400)
                }}
                aria-label={`Ajouter ${featured.name} au panier`}
                className={`grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full text-white transition-colors active:scale-90 ${
                  added ? 'bg-brand-500' : 'bg-ink-900 hover:bg-brand-700'
                }`}
              >
                <motion.span key={added ? 'ok' : 'add'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}>
                  {added ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" />}
                </motion.span>
              </button>
            </motion.div>
          </motion.div>

          {/* Delivery badge */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
            className="absolute -right-4 top-[34%] hidden lg:block"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ rotate: -4, scale: 1.05 }}
              className="flex items-center gap-3 rounded-[20px] bg-white/95 px-4 py-3 shadow-[var(--shadow-modal)] ring-1 ring-black/5 backdrop-blur-xl"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-xl" aria-hidden>
                🛵
              </span>
              <span>
                <span className="block text-[0.9375rem] font-semibold text-ink-900">Livraison offerte</span>
                <span className="block text-xs text-ink-500">dès 10 000 FCFA</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
