import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

const steps = [
  { emoji: '🛒', title: 'Vous choisissez', text: 'Composez votre panier en ligne, en quelques secondes.' },
  { emoji: '🧑🏾‍🌾', title: 'On récolte', text: 'Nos producteurs récoltent votre commande le matin même.' },
  { emoji: '🛵', title: 'On livre', text: 'Votre manioc arrive frais à votre porte en 24 à 48 h.' },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'center 50%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section id="fonctionnement" className="section scroll-mt-12 bg-cream-50 px-6">
      <div className="mx-auto max-w-[980px] text-center">
        <p className="eyebrow">Comment ça marche</p>
        <h2 className="mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 text-balance">
          Du champ à la marmite. <span className="text-ink-400">En trois étapes.</span>
        </h2>

        <div ref={ref} className="relative mt-16">
          {/* Progress line (desktop) */}
          <div aria-hidden className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-[2px] rounded bg-black/10 md:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded bg-gradient-to-r from-brand-500 to-gold-400" />
          </div>

          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group flex flex-col items-center"
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.9 }}
                  className="relative grid h-20 w-20 cursor-default place-items-center rounded-full bg-white text-4xl shadow-[var(--shadow-card)]"
                >
                  {s.emoji}
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-ink-900 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                </motion.span>
                <h3 className="mt-6 text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink-900">{s.title}</h3>
                <p className="mt-2 max-w-[260px] text-[1.0625rem] leading-relaxed text-ink-500">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
