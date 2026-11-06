import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Mascot } from '../../ui'

const facts = [
  'Le manioc pousse même quand il ne pleut presque pas. Un vrai dur à cuire.',
  'Un seul plant peut donner jusqu’à 10 kg de tubercules.',
  'Ses racines peuvent rester en terre jusqu’à deux ans : c’est un garde-manger naturel.',
  'Le tapioca de votre dessert ? C’est du manioc !',
  'Le manioc est naturellement sans gluten.',
  'Les feuilles de manioc contiennent plus de protéines que beaucoup de légumes verts.',
  'Le bâton de manioc est fermenté puis cuit dans des feuilles. Patience récompensée.',
  'Plus de 800 millions de personnes dans le monde mangent du manioc chaque jour.',
]

export default function FunFacts() {
  const [index, setIndex] = useState(0)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))
  const [hop, setHop] = useState(0)
  const [talking, setTalking] = useState(false)

  useEffect(() => {
    if (!talking) return
    const t = window.setTimeout(() => setTalking(false), 1400)
    return () => window.clearTimeout(t)
  }, [talking, hop])

  const next = () => {
    const unseen = facts.map((_, i) => i).filter((i) => !seen.has(i) && i !== index)
    const pool = unseen.length ? unseen : facts.map((_, i) => i).filter((i) => i !== index)
    const n = pool[Math.floor(Math.random() * pool.length)]
    setIndex(n)
    setSeen((s) => new Set(s).add(n))
    setHop((h) => h + 1)
    setTalking(true)
  }

  const complete = seen.size === facts.length

  return (
    <section className="section overflow-hidden bg-ink-900 px-6 text-white">
      <div className="mx-auto grid max-w-[1000px] items-center gap-12 md:grid-cols-[1fr_1.2fr]">
        <div className="relative mx-auto w-56 sm:w-64">
          <div aria-hidden className="absolute inset-6 rounded-full bg-brand-500/30 blur-3xl" />
          <button
            onClick={next}
            className="relative block w-full cursor-pointer focus-visible:outline-white"
            aria-label="Demander une anecdote à Mani"
          >
            <Mascot className="w-full drop-shadow-2xl" hop={hop} talking={talking} />
          </button>
        </div>

        <div>
          <p className="text-[0.95rem] font-semibold text-gold-300">Le saviez-vous ?</p>
          <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Mani a des choses à vous dire.
          </h2>

          <div className="relative mt-8 min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="relative rounded-[22px] bg-white px-6 py-5 text-[1.1875rem] leading-relaxed text-ink-900 shadow-[var(--shadow-modal)]"
                aria-live="polite"
              >
                <span aria-hidden className="absolute -left-2 top-8 hidden h-4 w-4 rotate-45 bg-white md:block" />
                {facts[index]}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={next}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink-900 transition-transform hover:bg-cream-50 active:scale-95 cursor-pointer"
            >
              🎲 Une autre anecdote
            </button>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="flex gap-1" aria-hidden>
                {facts.map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: seen.has(i) ? 1 : 0.7 }}
                    className={`h-1.5 w-1.5 rounded-full ${seen.has(i) ? 'bg-gold-300' : 'bg-white/20'}`}
                  />
                ))}
              </span>
              <span>
                {complete ? '🏆 Expert du manioc !' : `${seen.size}/${facts.length} découvertes`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
