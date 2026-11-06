import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Flame, Leaf, Wheat, Zap, AlertTriangle, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { Button } from '../ui'

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease },
}

/** USDA FoodData Central — cassava, raw, per 100 g. */
const PER_100G = { kcal: 160, carbs: 38.1, fiber: 1.8, protein: 1.4, vitC: 20.6 }

const macros = [
  { label: 'Calories', value: 160, unit: 'kcal', Icon: Flame },
  { label: 'Glucides', value: 38, unit: 'g', Icon: Zap },
  { label: 'Fibres', value: 1.8, unit: 'g', Icon: Wheat },
  { label: 'Protéines', value: 1.4, unit: 'g', Icon: Leaf },
]

/** Amount per 100 g and share of the daily value (adult reference intakes). */
const micros = [
  { name: 'Vitamine C', amount: '20,6 mg', dv: 23, role: 'Antioxydant, soutient l’immunité' },
  { name: 'Folates (B9)', amount: '27 µg', dv: 7, role: 'Renouvellement des cellules' },
  { name: 'Thiamine (B1)', amount: '0,09 mg', dv: 7, role: 'Transforme les glucides en énergie' },
  { name: 'Potassium', amount: '271 mg', dv: 6, role: 'Équilibre hydrique, fonction musculaire' },
  { name: 'Magnésium', amount: '21 mg', dv: 5, role: 'Muscles et système nerveux' },
  { name: 'Phosphore', amount: '27 mg', dv: 2, role: 'Os et dents' },
]

const benefits: { Icon: LucideIcon; emoji: string; title: string; text: string; className: string }[] = [
  {
    Icon: Zap,
    emoji: '⚡',
    title: 'De l’énergie qui dure.',
    text: 'Riche en glucides complexes, le manioc est un carburant idéal pour les journées actives.',
    className: 'md:col-span-2 bg-ink-900 text-white',
  },
  { Icon: Wheat, emoji: '🌾', title: 'Sans gluten.', text: 'Une alternative naturelle au blé, en farine comme en tapioca.', className: 'bg-white' },
  { Icon: Leaf, emoji: '🍊', title: 'Source de vitamine C.', text: '100 g couvrent près d’un quart des besoins quotidiens.', className: 'bg-white' },
  {
    Icon: Leaf,
    emoji: '🌿',
    title: 'Les feuilles, championnes.',
    text: 'Bien plus riches en protéines, en fer et en provitamine A que la racine. À cuire longuement.',
    className: 'md:col-span-2 bg-gradient-to-br from-brand-700 to-brand-900 text-white',
  },
]

const compare = [
  { name: 'Manioc', kcal: 160, carbs: 38, fiber: 1.8, vitC: 20.6, highlight: true },
  { name: 'Pomme de terre', kcal: 77, carbs: 17, fiber: 2.2, vitC: 19.7 },
  { name: 'Patate douce', kcal: 86, carbs: 20, fiber: 3.0, vitC: 2.4 },
  { name: 'Riz blanc cuit', kcal: 130, carbs: 28, fiber: 0.4, vitC: 0 },
]

export default function NutritionPage() {
  return (
    <main className="bg-paper">
      {/* Hero */}
      <header className="px-6 pt-16 text-center sm:pt-24">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
          Nutrition
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.06, ease }}
          className="mx-auto mt-2 max-w-[900px] text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-900 text-balance"
        >
          L’énergie, <span className="text-ink-400">naturellement.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.14, ease }}
          className="mx-auto mt-5 max-w-[600px] text-[1.1875rem] leading-relaxed text-ink-500 sm:text-[1.3125rem]"
        >
          Ce que contient vraiment le manioc, chiffres à l’appui, et comment en profiter en toute sécurité.
        </motion.p>
      </header>

      {/* Macros */}
      <section className="mx-auto max-w-[1100px] px-4 pb-6 pt-14 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {macros.map(({ label, value, unit, Icon }, i) => (
            <motion.div
              key={label}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
              className="hover-wiggle rounded-[22px] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <Icon className="wiggle-target h-5 w-5 text-brand-600" strokeWidth={1.8} aria-hidden />
              <p className="mt-6 text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-ink-900 tabular-nums">
                {Number.isInteger(value) ? <AnimatedNumber value={value} /> : value.toLocaleString('fr-FR')}
                <span className="ml-1 text-base font-medium text-ink-500">{unit}</span>
              </p>
              <p className="mt-2 text-sm text-ink-500">{label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-400">Pour 100 g de manioc cru. Source : USDA FoodData Central.</p>
      </section>

      <PortionCalculator />

      {/* Micronutrients */}
      <section className="section px-6">
        <div className="mx-auto max-w-[860px]">
          <motion.div {...reveal} className="text-center">
            <p className="eyebrow">Vitamines et minéraux</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">Dans le détail.</h2>
          </motion.div>
          <ul className="mt-12 divide-y divide-black/10 border-y border-black/10">
            {micros.map((m, i) => (
              <motion.li key={m.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.04 }} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-5 sm:grid-cols-[180px_1fr_90px] sm:items-center">
                <div>
                  <p className="font-semibold text-ink-900">{m.name}</p>
                  <p className="text-sm text-ink-500 sm:hidden">{m.role}</p>
                </div>
                <div className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto">
                  <p className="mb-2 hidden text-sm text-ink-500 sm:block">{m.role}</p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(m.dv, 2)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05, ease }}
                    />
                  </div>
                </div>
                <p className="text-right text-sm tabular-nums">
                  <span className="font-semibold text-ink-900">{m.amount}</span>
                  <span className="block text-xs text-ink-500">{m.dv} % AJR</span>
                </p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-ink-400">AJR : apports journaliers de référence pour un adulte.</p>
        </div>
      </section>

      {/* Benefits bento */}
      <section className="section bg-cream-50 px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <motion.h2 {...reveal} className="text-center text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
            Ses atouts.
          </motion.h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((b, i) => {
              const dark = b.className.includes('text-white')
              return (
                <motion.article
                  key={b.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group rounded-[28px] p-8 shadow-[var(--shadow-card)] sm:p-10 ${b.className}`}
                >
                  <span className="inline-block text-4xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" aria-hidden>
                    {b.emoji}
                  </span>
                  <h3 className="mt-5 text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.025em]">{b.title}</h3>
                  <p className={`mt-3 max-w-md text-[1.0625rem] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-500'}`}>{b.text}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section px-4 sm:px-6">
        <div className="mx-auto max-w-[900px]">
          <motion.div {...reveal} className="text-center">
            <p className="eyebrow">Comparer</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">Face aux autres féculents.</h2>
          </motion.div>
          <motion.div {...reveal} className="mt-12 overflow-x-auto rounded-[22px] bg-white shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[560px] text-[0.9375rem]">
              <caption className="sr-only">Comparaison pour 100 g</caption>
              <thead>
                <tr className="border-b border-black/10 text-left text-xs font-semibold uppercase tracking-[0.04em] text-ink-500">
                  <th scope="col" className="px-6 py-4">Pour 100 g</th>
                  <th scope="col" className="px-4 py-4 text-right">Calories</th>
                  <th scope="col" className="px-4 py-4 text-right">Glucides</th>
                  <th scope="col" className="px-4 py-4 text-right">Fibres</th>
                  <th scope="col" className="px-6 py-4 text-right">Vitamine C</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((f) => (
                  <tr key={f.name} className={f.highlight ? 'bg-brand-50/60' : 'border-t border-black/5'}>
                    <th scope="row" className={`px-6 py-4 text-left font-semibold ${f.highlight ? 'text-brand-700' : 'text-ink-900'}`}>
                      {f.highlight && <span aria-hidden>🌿 </span>}
                      {f.name}
                    </th>
                    <td className="px-4 py-4 text-right tabular-nums text-ink-700">{f.kcal} kcal</td>
                    <td className="px-4 py-4 text-right tabular-nums text-ink-700">{f.carbs} g</td>
                    <td className="px-4 py-4 text-right tabular-nums text-ink-700">{f.fiber.toLocaleString('fr-FR')} g</td>
                    <td className="px-6 py-4 text-right tabular-nums text-ink-700">{f.vitC.toLocaleString('fr-FR')} mg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-4 text-center text-xs text-ink-400">Valeurs crues, sauf le riz (cuit). Source : USDA.</p>
        </div>
      </section>

      {/* Safety */}
      <section className="section bg-ink-900 px-6 text-white">
        <div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-2">
          <motion.div {...reveal}>
            <AlertTriangle className="h-8 w-8 text-gold-300" aria-hidden />
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">Toujours cuit. Jamais cru.</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
              Le manioc cru contient des composés qui libèrent du cyanure. Épluchage, trempage, fermentation et cuisson les éliminent : c’est
              pourquoi les recettes traditionnelles prennent leur temps.
            </p>
          </motion.div>
          <motion.ul {...reveal} className="space-y-4 self-center">
            {[
              'Épluchez et retirez la fibre centrale.',
              'Cuisez toujours le manioc et ses feuilles complètement.',
              'Le manioc amer doit être roui ou fermenté avant cuisson.',
              'Introduisez-le progressivement chez les jeunes enfants.',
              'Diabète ou régime particulier : demandez conseil à un professionnel de santé.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[1.0625rem] text-white/90">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <motion.div {...reveal}>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-ink-900">Envie de passer à table ?</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
            <Button size="lg" onClick={() => (window.location.hash = 'recettes')}>Voir les recettes</Button>
            <Button variant="link" size="lg" onClick={() => (window.location.hash = 'produits')}>Aller à la boutique ›</Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

/** Interactive slider: pick a portion, see what it brings. */
function PortionCalculator() {
  const [grams, setGrams] = useState(200)
  const reduce = useReducedMotion()
  const f = grams / 100
  const rows = [
    { label: 'Calories', value: Math.round(PER_100G.kcal * f), unit: 'kcal' },
    { label: 'Glucides', value: Math.round(PER_100G.carbs * f), unit: 'g' },
    { label: 'Fibres', value: Math.round(PER_100G.fiber * f * 10) / 10, unit: 'g' },
    { label: 'Vitamine C', value: Math.round(((PER_100G.vitC * f) / 90) * 100), unit: '% AJR' },
  ]
  const plateScale = 0.55 + (grams / 500) * 0.6

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6">
      <motion.div {...reveal} className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-cream-50 p-8 sm:p-12 md:grid-cols-[1fr_1.2fr]">
        <div className="relative grid aspect-square place-items-center">
          <div className="absolute inset-[8%] rounded-full bg-white shadow-[var(--shadow-card)]" aria-hidden />
          <div className="absolute inset-[16%] rounded-full ring-1 ring-black/5" aria-hidden />
          <motion.img
            src="/imagesproducts/tubercules.jpg"
            alt=""
            className="relative aspect-square w-[60%] rounded-full object-cover"
            animate={{ scale: plateScale, rotate: reduce ? 0 : grams / 4 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          />
        </div>
        <div>
          <p className="eyebrow">Calculateur de portion</p>
          <h2 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink-900">
            Combien dans votre assiette ?
          </h2>
          <label htmlFor="portion" className="mt-8 flex items-baseline justify-between text-sm text-ink-500">
            Portion
            <span className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-900 tabular-nums">{grams} g</span>
          </label>
          <input
            id="portion"
            type="range"
            min={50}
            max={500}
            step={10}
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
            className="mt-3 w-full cursor-pointer accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-400">
            <span>Encas</span>
            <span>Repas</span>
            <span>Grand appétit</span>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3">
            {rows.map((r) => (
              <div key={r.label} className="rounded-[18px] bg-white p-4 shadow-sm">
                <dt className="text-xs text-ink-500">{r.label}</dt>
                <dd className="mt-1 text-[1.375rem] font-semibold tracking-[-0.02em] text-ink-900 tabular-nums">
                  <motion.span key={r.value} initial={{ y: -6, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
                    {r.value.toLocaleString('fr-FR')}
                  </motion.span>
                  <span className="ml-1 text-sm font-medium text-ink-500">{r.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-ink-400">Une portion de 150 à 200 g suffit pour un repas d’adulte.</p>
        </div>
      </motion.div>
    </section>
  )
}
