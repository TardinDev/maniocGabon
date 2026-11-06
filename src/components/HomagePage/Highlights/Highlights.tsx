import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { Leaf, Truck, Smartphone, HeartHandshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'

type Tile = {
  Icon: LucideIcon
  title: string
  text: string
  className: string
  iconClass: string
  dark?: boolean
}

const tiles: Tile[] = [
  {
    Icon: Leaf,
    title: 'Récolté le matin.\nChez vous le lendemain.',
    text: 'Nos tubercules quittent le champ moins de 48 h avant d’arriver à votre porte.',
    className: 'bg-white',
    iconClass: 'bg-brand-50 text-brand-600',
  },
  {
    Icon: Truck,
    title: 'Livraison offerte.',
    text: 'Dès 10 000 FCFA d’achat à Libreville.',
    className: 'bg-ink-900 text-white',
    iconClass: 'bg-white/10 text-gold-300',
    dark: true,
  },
  {
    Icon: Smartphone,
    title: 'Mobile Money.',
    text: 'Airtel Money, Moov Money ou paiement à la livraison.',
    className: 'bg-white',
    iconClass: 'bg-gold-400/15 text-gold-600',
  },
  {
    Icon: HeartHandshake,
    title: 'Des producteurs payés au juste prix.',
    text: 'En direct avec des coopératives du Woleu-Ntem, de la Ngounié et de l’Estuaire.',
    className: 'bg-gradient-to-br from-brand-700 to-brand-900 text-white',
    iconClass: 'bg-white/10 text-brand-200',
    dark: true,
  },
]

const photo = {
  src: '/images/tri-manioc.jpg',
  alt: 'Des femmes assises autour d’un grand tas de manioc trient et épluchent les tubercules à la main.',
}

const ease = [0.22, 1, 0.36, 1] as const

function TileCard({ tile, className }: { tile: Tile; className?: string }) {
  const { Icon, title, text, iconClass, dark } = tile
  return (
    <article
      className={cn(
        'hover-wiggle group relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 shadow-[var(--shadow-card)] xl:p-8',
        tile.className,
        className,
      )}
    >
      <span className={cn('inline-grid h-11 w-11 place-items-center rounded-2xl', iconClass)}>
        <Icon className="wiggle-target h-[22px] w-[22px]" strokeWidth={1.8} />
      </span>
      <h3 className="mt-auto whitespace-pre-line pt-6 text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.025em] xl:text-[1.5rem]">
        {title}
      </h3>
      <p className={cn('mt-2 text-[0.9875rem] leading-relaxed', dark ? 'text-white/70' : 'text-ink-500')}>{text}</p>
    </article>
  )
}

function PhotoCaption() {
  return (
    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
      <p className="text-sm font-semibold text-gold-300">Le tri</p>
      <p className="mt-1 text-[1.5rem] font-semibold leading-tight tracking-[-0.025em]">Chaque tubercule passe entre leurs mains.</p>
    </div>
  )
}

/**
 * Desktop: the section pins while you scroll. The four cards start huddled in the
 * middle, then spread to the corners as the photo grows in behind them.
 */
function ScrollSpread() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  const spread = useTransform(p, [0.08, 0.6], [0, 1], { clamp: true })
  const imgScale = useTransform(spread, [0, 1], [0.72, 1])
  const imgOpacity = useTransform(spread, [0, 0.35, 1], [0, 0.6, 1])
  const imgRadius = useTransform(spread, [0, 1], [80, 28])
  const innerScale = useTransform(spread, [0, 1], [1.35, 1.05])
  const captionOpacity = useTransform(spread, [0.75, 1], [0, 1])
  const captionY = useTransform(spread, [0.75, 1], [16, 0])

  return (
    <div ref={ref} className="relative hidden h-[240vh] lg:block">
      <div className="sticky top-12 flex h-[calc(100svh-48px)] flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-[1180px]">
          <h2 className="text-center text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900">
            Pourquoi Manioc Gabon.
          </h2>

          <div className="relative mt-12 grid h-[min(560px,calc(100svh-260px))] min-h-[460px] grid-cols-[1fr_1.45fr_1fr] grid-rows-2 gap-5">
            {/* Central photo */}
            <motion.figure
              style={{ scale: imgScale, opacity: imgOpacity, borderRadius: imgRadius }}
              className="relative col-start-2 row-span-2 row-start-1 overflow-hidden bg-ink-900 shadow-[var(--shadow-hover)]"
            >
              <motion.img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{ scale: innerScale, objectPosition: '50% 45%' }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
              <motion.div style={{ opacity: captionOpacity, y: captionY }}>
                <PhotoCaption />
              </motion.div>
            </motion.figure>

            {tiles.map((tile, i) => (
              <SpreadTile key={tile.title} tile={tile} index={i} spread={spread} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Grid slots around the photo: top-left, top-right, bottom-left, bottom-right
const slots = [
  { cls: 'col-start-1 row-start-1', dir: 1, rot: -4 },
  { cls: 'col-start-3 row-start-1', dir: -1, rot: 3 },
  { cls: 'col-start-1 row-start-2', dir: 1, rot: 3 },
  { cls: 'col-start-3 row-start-2', dir: -1, rot: -3 },
]

function SpreadTile({ tile, index, spread }: { tile: Tile; index: number; spread: MotionValue<number> }) {
  const s = slots[index]
  // Closed: the side cards meet in the middle (half the photo column + half the gap ≈ 76 % of a card width, slightly overlapped).
  const x = useTransform(spread, [0, 1], [`${s.dir * 78}%`, '0%'])
  const rotate = useTransform(spread, [0, 1], [s.rot, 0])
  const scale = useTransform(spread, [0, 1], [0.94, 1])

  return (
    <motion.div style={{ x, rotate, scale }} className={cn('relative z-10', s.cls)}>
      <motion.div className="h-full" whileHover={{ y: -4 }} transition={{ duration: 0.3, ease }}>
        <TileCard tile={tile} />
      </motion.div>
    </motion.div>
  )
}

/** Mobile/tablet and reduced motion: a simple stack with the photo in the middle. */
function StackedHighlights({ className }: { className?: string }) {
  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: i * 0.06, ease },
  })
  return (
    <div className={cn('section px-4 sm:px-6', className)}>
      <div className="mx-auto max-w-[720px]">
        <h2 className="text-center text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900">
          Pourquoi Manioc Gabon.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {tiles.slice(0, 2).map((t, i) => (
            <motion.div key={t.title} {...reveal(i)}>
              <TileCard tile={t} className="min-h-[220px]" />
            </motion.div>
          ))}
          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ink-900 shadow-[var(--shadow-hover)] sm:col-span-2 sm:aspect-[16/9]"
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
            <PhotoCaption />
          </motion.figure>
          {tiles.slice(2).map((t, i) => (
            <motion.div key={t.title} {...reveal(i)}>
              <TileCard tile={t} className="min-h-[220px]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Highlights() {
  const reduce = useReducedMotion()
  return (
    <section id="avantages" className="scroll-mt-12 bg-paper">
      {reduce ? (
        <StackedHighlights />
      ) : (
        <>
          <ScrollSpread />
          <StackedHighlights className="lg:hidden" />
        </>
      )}
    </section>
  )
}
