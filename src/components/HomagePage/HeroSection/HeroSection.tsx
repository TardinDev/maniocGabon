import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '../../ui'
import { AnimatedNumber } from '../../ui/AnimatedNumber'

const ease = [0.22, 1, 0.36, 1] as const

const stickers = [
  { emoji: '🌿', label: 'Cultivé sans pesticides', className: 'left-[4%] top-[8%] sm:left-[6%] sm:top-[12%]', rotate: -6 },
  { emoji: '🚚', label: 'Livré en 48 h', className: 'right-[4%] top-[18%] sm:right-[8%] sm:top-[14%]', rotate: 5 },
  { emoji: '🇬🇦', label: 'Made in Gabon', className: 'left-[10%] bottom-[10%] sm:left-[30%] sm:bottom-[12%]', rotate: 3 },
]

export default function HeroSection({ onDiscover }: { onDiscover?: () => void }) {
  const imageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [0.9, 1])
  const radius = useTransform(scrollYProgress, [0, 0.5], reduce ? [28, 28] : [40, 28])
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <section className="relative overflow-hidden bg-paper pt-14 sm:pt-20">
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow text-[0.95rem] sm:text-[1.0625rem]"
        >
          Nouvelle récolte 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mt-2 text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink-900 text-balance"
        >
          Le manioc.
          <br />
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500 bg-clip-text text-transparent">
            Version Gabon.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="mx-auto mt-5 max-w-[620px] text-[1.1875rem] sm:text-[1.3125rem] leading-[1.4] text-ink-500 text-pretty"
        >
          Tubercules, feuilles, bâtons et farines récoltés chez nos producteurs. Livrés chez vous en 48 heures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7"
        >
          <Button
            size="lg"
            onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Commander maintenant
          </Button>
          <Button variant="link" size="lg" onClick={onDiscover}>
            Découvrir la culture du manioc ›
          </Button>
        </motion.div>
      </div>

      {/* Big hero image with scroll-linked zoom and draggable stickers */}
      <div className="mx-auto mt-14 sm:mt-16 max-w-[1200px] px-4 sm:px-6">
        <motion.div
          ref={imageRef}
          style={{ scale, borderRadius: radius }}
          className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-brand-900 shadow-[var(--shadow-modal)]"
        >
          <motion.img
            src="/banniere.jpg"
            alt="Feuilles de manioc, tubercules frais et bâtons de manioc emballés dans des feuilles"
            width={1600}
            height={1067}
            fetchPriority="high"
            style={{ y: imgY }}
            className="absolute inset-0 h-[112%] w-full -top-[6%] object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {stickers.map((s, i) => (
            <motion.div
              key={s.label}
              drag={!reduce}
              dragConstraints={imageRef}
              dragElastic={0.25}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileDrag={{ scale: 1.15, rotate: 0, cursor: 'grabbing' }}
              initial={{ opacity: 0, y: 20, rotate: s.rotate }}
              animate={{ opacity: 1, y: 0, rotate: s.rotate }}
              transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
              className={`absolute ${s.className} z-10 select-none cursor-grab inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-[0.8125rem] sm:text-sm font-semibold text-ink-900 shadow-[var(--shadow-card)] backdrop-blur-md touch-none`}
            >
              <span aria-hidden className="mr-1.5">{s.emoji}</span>
              {s.label}
            </motion.div>
          ))}

          <p className="absolute bottom-4 right-5 z-10 hidden sm:block text-xs font-medium text-white/80">
            Psst… les étiquettes se déplacent ✋
          </p>
        </motion.div>
      </div>

      {/* Key figures */}
      <div className="mx-auto max-w-[980px] px-6 py-16 sm:py-20">
        <dl className="grid grid-cols-3 gap-6 text-center">
          {[
            { value: 100, suffix: '%', label: 'Origine Gabon' },
            { value: 48, suffix: ' h', label: 'Du champ à chez vous' },
            { value: 12, suffix: '+', label: 'Produits du terroir' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[0.8125rem] sm:text-sm text-ink-500">{s.label}</dt>
              <dd className="text-[2rem] sm:text-[3rem] font-semibold tracking-[-0.03em] text-ink-900">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
