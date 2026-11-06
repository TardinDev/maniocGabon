import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Smartphone, Sprout, Truck } from 'lucide-react'
import { Button } from '../../ui'
import { cn } from '../../../lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

type Side = 'left' | 'right' | null

const panels = {
  left: {
    src: '/images/marche-manioc.jpg',
    alt: 'Deux vendeuses assises au marché derrière un étal de tubercules de manioc',
    position: '46% 60%',
    eyebrow: 'Au marché',
    title: 'Le manioc passe de main en main.',
    text: 'Chaque matin, les mamas installent leurs étals. C’est d’elles que nous tenons le goût du vrai manioc.',
    filter: 'saturate(1.12) contrast(1.06) sepia(0.08)',
  },
  right: {
    src: '/banniere.jpg',
    alt: 'Tubercules de manioc et bâtons enveloppés dans des feuilles, posés sur des feuilles de manioc',
    position: '58% 50%',
    eyebrow: 'La récolte',
    title: 'Racines, feuilles et bâtons.',
    text: 'Cueillis le matin chez nos producteurs, livrés frais chez vous en 48 heures.',
    filter: 'saturate(1.1) contrast(1.05)',
  },
} as const

const trust = [
  { Icon: Sprout, title: '100 % Gabon' },
  { Icon: Truck, title: 'Livré en 48 h' },
  { Icon: Smartphone, title: 'Mobile Money' },
]

const scrollToShop = () => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })

export default function HeroSection({ onDiscover }: { onDiscover?: () => void }) {
  return (
    <>
      <SplitHero onDiscover={onDiscover} />
      <MobileHero onDiscover={onDiscover} />
    </>
  )
}

/* ───────────────────────── Desktop: split screen ───────────────────────── */

const EDGE = 0.08

function SplitHero({ onDiscover }: { onDiscover?: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const lockRef = useRef(false)
  const [side, setSide] = useState<Side>(null)
  const reduce = useReducedMotion()

  // The copy panel slides away from the hovered half, revealing its photo.
  const panelLeft = side === 'left' ? '50%' : side === 'right' ? '0%' : '25%'

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    if (!lockRef.current) {
      setSide(x < 0.5 ? 'left' : 'right')
      return
    }
    // Over the copy panel: its outer edge (empty padding) flips to the hidden photo,
    // so the covered half stays reachable while the CTAs remain clickable.
    if (side === 'left' && x > 1 - EDGE) setSide('right')
    else if (side === 'right' && x < EDGE) setSide('left')
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        lockRef.current = false
        setSide(null)
      }}
      className="relative hidden h-[calc(100svh-48px)] max-h-[960px] min-h-[640px] overflow-hidden bg-ink-900 lg:block"
      aria-label="Présentation"
    >
      {(['left', 'right'] as const).map((key) => {
        const p = panels[key]
        const active = side === key
        return (
          <div key={key} className={cn('absolute inset-y-0 w-1/2 overflow-hidden', key === 'left' ? 'left-0' : 'right-0')}>
            <motion.img
              src={p.src}
              alt={p.alt}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ objectPosition: p.position }}
              initial={false}
              animate={{
                scale: reduce ? 1 : active ? 1.03 : 1.14,
                filter: active ? `${p.filter} grayscale(0) brightness(1)` : `${p.filter} grayscale(0.35) brightness(0.7)`,
              }}
              transition={{ duration: active ? 6 : 1, ease: active ? 'easeOut' : ease }}
            />
            {/* Cinematic grading: vignette + bottom fade behind the caption */}
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_45%,rgba(0,0,0,0.45)_100%)]" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, delay: 0.3, ease }}
                  className="absolute bottom-12 left-12 right-12 max-w-[480px] text-white"
                >
                  <p className="text-sm font-semibold text-gold-300">{p.eyebrow}</p>
                  <h2 className="mt-2 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em]">{p.title}</h2>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/80">{p.text}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Vertical teaser label while the half is only peeking */}
            <motion.span
              aria-hidden
              initial={false}
              animate={{ opacity: side === null ? 1 : 0 }}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 [writing-mode:vertical-rl]',
                key === 'left' ? 'left-7 rotate-180' : 'right-7',
              )}
            >
              {key === 'left' ? 'Le marché' : 'La récolte'}
            </motion.span>
          </div>
        )
      })}

      {/* Sliding copy panel */}
      <motion.div
        onMouseEnter={() => (lockRef.current = true)}
        onMouseLeave={() => (lockRef.current = false)}
        initial={false}
        animate={{ left: panelLeft }}
        transition={reduce ? { duration: 0 } : { duration: 0.9, ease }}
        className="absolute inset-y-0 z-10 flex w-1/2 items-center bg-paper shadow-[0_0_80px_rgba(0,0,0,0.35)]"
      >
        {/* Edge hint: hovering here reveals the photo hidden under the panel */}
        <AnimatePresence>
          {side !== null && (
            <motion.button
              key={side}
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setSide(side === 'left' ? 'right' : 'left')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className={cn(
                'group absolute inset-y-0 flex w-[16%] cursor-pointer items-center',
                side === 'left' ? 'right-0 justify-end pr-6' : 'left-0 justify-start pl-6',
              )}
            >
              <span
                className={cn(
                  'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink-400 transition-colors group-hover:text-brand-600 [writing-mode:vertical-rl]',
                  side === 'right' && 'rotate-180',
                )}
              >
                {side === 'left' ? 'La récolte' : 'Le marché'}
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
        <div className="mx-auto w-full max-w-[560px] px-12 xl:px-14">
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
            className="mt-6 text-[clamp(3rem,4.6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-900"
          >
            Le manioc.
            <br />
            <span className="bg-gradient-to-r from-brand-700 via-brand-500 to-gold-500 bg-clip-text text-transparent">Version Gabon.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-6 text-[1.25rem] leading-[1.5] text-ink-500"
          >
            Tubercules, bâtons, feuilles et farines récoltés chez nos producteurs, puis livrés frais chez vous en 48 heures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Button size="xl" onClick={scrollToShop}>
              Commander maintenant
            </Button>
            <Button variant="link" size="lg" onClick={onDiscover}>
              Notre histoire ›
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-6"
          >
            {trust.map(({ Icon, title }) => (
              <li key={title} className="hover-wiggle flex items-center gap-2 text-sm font-medium text-ink-700">
                <Icon className="wiggle-target h-4 w-4 text-brand-600" strokeWidth={2} aria-hidden />
                {title}
              </li>
            ))}
          </motion.ul>

          {/* Explicit toggles: keyboard-friendly, and a hint for mouse users */}
          <div className="mt-8 flex items-center gap-2 text-sm">
            {(['left', 'right'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setSide((s) => (s === k ? null : k))}
                aria-pressed={side === k}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors cursor-pointer',
                  side === k ? 'bg-ink-900 text-white' : 'bg-black/5 text-ink-700 hover:bg-black/10',
                )}
              >
                {k === 'left' && <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />}
                {k === 'left' ? 'Le marché' : 'La récolte'}
                {k === 'right' && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ───────────────────────── Mobile / tablet: stacked ───────────────────────── */

function MobileHero({ onDiscover }: { onDiscover?: () => void }) {
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [touched, setTouched] = useState(false)
  const reduce = useReducedMotion()

  // Alternate the two photos until the visitor picks one.
  useEffect(() => {
    if (touched || reduce) return
    const t = window.setInterval(() => setSide((s) => (s === 'left' ? 'right' : 'left')), 4500)
    return () => window.clearInterval(t)
  }, [touched, reduce])

  const p = panels[side]

  return (
    <section className="bg-paper px-5 pb-12 pt-10 text-center sm:px-8 lg:hidden">
      <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-700 shadow-sm ring-1 ring-black/5">
        <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden />
        Nouvelle récolte 2026 disponible
      </p>
      <h1 className="mt-5 text-[clamp(2.75rem,11vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-900">
        Le manioc.
        <br />
        <span className="bg-gradient-to-r from-brand-700 via-brand-500 to-gold-500 bg-clip-text text-transparent">Version Gabon.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-[520px] text-[1.125rem] leading-[1.5] text-ink-500">
        Tubercules, bâtons, feuilles et farines récoltés chez nos producteurs, puis livrés frais chez vous en 48 heures.
      </p>
      <div className="mt-7 flex flex-col items-center gap-3">
        <Button size="lg" onClick={scrollToShop}>
          Commander maintenant
        </Button>
        <Button variant="link" onClick={onDiscover}>
          Notre histoire ›
        </Button>
      </div>

      <div className="relative mx-auto mt-10 aspect-[4/5] max-w-[560px] overflow-hidden rounded-[28px] bg-ink-900 shadow-[var(--shadow-modal)] sm:aspect-[4/3]">
        <AnimatePresence initial={false}>
          <motion.img
            key={side}
            src={p.src}
            alt={p.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: p.position, filter: p.filter }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
          />
        </AnimatePresence>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white">
          <AnimatePresence mode="wait">
            <motion.div key={side} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <p className="text-sm font-semibold text-gold-300">{p.eyebrow}</p>
              <p className="mt-1 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">{p.title}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 inline-flex rounded-full bg-white/15 p-1 backdrop-blur-md">
            {(['left', 'right'] as const).map((k) => (
              <button
                key={k}
                onClick={() => {
                  setTouched(true)
                  setSide(k)
                }}
                aria-pressed={side === k}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer',
                  side === k ? 'bg-white text-ink-900' : 'text-white/85',
                )}
              >
                {k === 'left' ? 'Le marché' : 'La récolte'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
