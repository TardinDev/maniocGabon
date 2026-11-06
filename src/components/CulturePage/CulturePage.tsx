import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CheckCircle2, CloudRain, Scissors, Sprout, Wheat, AlertTriangle } from 'lucide-react'
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

const facts = [
  { value: 12, prefix: '8–', suffix: ' mois', label: 'de la bouture à la récolte' },
  { value: 2, suffix: ' kg', label: 'pour un beau tubercule' },
  { value: 2, suffix: ' ans', label: 'en terre sans s’abîmer' },
  { value: 0, suffix: ' g', label: 'de gluten' },
]

const steps: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Sprout, title: 'Préparer le sol', text: 'Défrichage et brûlis léger : les cendres enrichissent la terre.' },
  { Icon: Scissors, title: 'Bouturer', text: 'On plante des tiges de 20 à 25 cm prélevées sur les plus beaux pieds.' },
  { Icon: CloudRain, title: 'Attendre la pluie', text: 'Plantation en octobre–novembre, au début de la saison des pluies.' },
  { Icon: Wheat, title: 'Récolter', text: 'Après 8 à 12 mois, on déterre les tubercules selon les besoins.' },
]

const varieties = [
  {
    name: 'Le manioc doux',
    image: '/imagesproducts/tubercule.jpg',
    text: 'Pauvre en composés amers, il se cuit simplement : bouilli, frit ou grillé.',
    uses: 'Frites, gâteaux, accompagnements',
  },
  {
    name: 'Le manioc amer',
    image: '/imagesproducts/racines.jpg',
    text: 'Riche en amidon, il doit être roui et fermenté avant d’être consommé.',
    uses: 'Bâtons, farine, tapioca',
  },
  {
    name: 'Les feuilles',
    image: '/imagesproducts/feuilles.jpg',
    text: 'Pilées puis mijotées des heures, elles sont un plat à part entière.',
    uses: 'Feuilles à l’huile de palme',
  },
]

export default function CulturePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [0.92, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%'])

  return (
    <main className="bg-paper">
      {/* Hero */}
      <header className="px-6 pt-16 text-center sm:pt-24">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
          Culture
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.06, ease }}
          className="mx-auto mt-2 max-w-[900px] text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-900 text-balance"
        >
          Une racine. <span className="text-ink-400">Tout un pays.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.14, ease }}
          className="mx-auto mt-5 max-w-[620px] text-[1.1875rem] leading-relaxed text-ink-500 sm:text-[1.3125rem]"
        >
          Venu d’Amérique du Sud il y a plusieurs siècles, le manioc est devenu le cœur de la cuisine gabonaise. Voici son histoire.
        </motion.p>
      </header>

      <div className="mx-auto mt-14 max-w-[1200px] px-4 sm:px-6">
        <motion.div
          ref={heroRef}
          style={{ scale }}
          className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-[var(--shadow-modal)] sm:aspect-[21/9]"
        >
          <motion.img
            src="/banniere.jpg"
            alt="Feuilles, bâtons et tubercules de manioc"
            style={{ y: imgY }}
            className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Key facts */}
      <section className="mx-auto max-w-[1000px] px-6 py-20">
        <dl className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4">
          {facts.map((f) => (
            <motion.div key={f.label} {...reveal} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-ink-500">{f.label}</dt>
              <dd className="text-[2.5rem] font-semibold tracking-[-0.03em] text-ink-900">
                <AnimatedNumber value={f.value} prefix={f.prefix} suffix={f.suffix} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </section>

      {/* Chapter 1 — History */}
      <section className="section bg-cream-50 px-6">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2">
          <motion.div {...reveal}>
            <p className="eyebrow">Chapitre 1 · Racines</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
              Arrivé par la mer. Adopté par la forêt.
            </h2>
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-ink-700">
              <p>
                Originaire d’Amérique du Sud, le manioc (<em>Manihot esculenta</em>) a traversé l’Atlantique au XVI<sup>e</sup> siècle avant de gagner
                les forêts d’Afrique centrale.
              </p>
              <p>
                Il s’y est imposé grâce à sa robustesse : il pousse sur des sols pauvres, résiste à la sécheresse et peut rester en terre jusqu’à ce qu’on en ait besoin.
              </p>
              <p>Aujourd’hui, il est présent à presque tous les repas, de Libreville à Oyem.</p>
            </div>
          </motion.div>
          <motion.div {...reveal} className="relative">
            <img src="/imagesproducts/tubercules.jpg" alt="Tubercules de manioc fraîchement coupés" loading="lazy" className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-[var(--shadow-card)]" />
            <motion.span
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="absolute -bottom-5 -left-3 grid h-16 w-16 place-items-center rounded-full bg-white text-3xl shadow-[var(--shadow-hover)] sm:-left-5"
              aria-hidden
            >
              🌍
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2 — Know-how */}
      <section className="section px-6">
        <div className="mx-auto max-w-[1100px]">
          <motion.div {...reveal} className="text-center">
            <p className="eyebrow">Chapitre 2 · Savoir-faire</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
              Un an de patience.
            </h2>
          </motion.div>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ Icon, title, text }, i) => (
              <motion.li
                key={title}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="hover-wiggle rounded-[22px] bg-white p-7 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="wiggle-target h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-semibold text-ink-400 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink-900">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chapter 3 — Varieties */}
      <section className="section bg-cream-50 px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <motion.div {...reveal} className="text-center">
            <p className="eyebrow">Chapitre 3 · Diversité</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
              Une plante, trois cuisines.
            </h2>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {varieties.map((v, i) => (
              <motion.article
                key={v.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="group overflow-hidden rounded-[22px] bg-white shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink-900">{v.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{v.text}</p>
                  <p className="mt-4 text-sm font-medium text-brand-700">{v.uses}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 4 — Heritage */}
      <section className="section bg-ink-900 px-6 text-white">
        <motion.div {...reveal} className="mx-auto max-w-[860px] text-center">
          <p className="text-sm font-semibold text-gold-300">Chapitre 4 · Héritage</p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-balance">
            Le bâton de manioc s’apprend en regardant faire. Pas dans un livre.
          </h2>
          <p className="mx-auto mt-8 max-w-[640px] text-[1.0625rem] leading-relaxed text-white/70">
            Rouissage, fermentation, pilage, cuisson dans les feuilles : ces gestes se transmettent de génération en génération.
            Chaque région a ses méthodes et ses spécialités, et le manioc accompagne les fêtes comme les repas de tous les jours.
          </p>
        </motion.div>
      </section>

      {/* Chapter 5 — Future */}
      <section className="section px-6">
        <div className="mx-auto max-w-[1100px]">
          <motion.div {...reveal} className="text-center">
            <p className="eyebrow">Chapitre 5 · Avenir</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900">
              Moderniser sans rien oublier.
            </h2>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Les défis',
                Icon: AlertTriangle,
                tint: 'text-clay-500',
                items: ['Des agriculteurs de plus en plus âgés', 'Des rendements encore faibles', 'Un accès difficile aux marchés urbains', 'Une transformation surtout artisanale'],
              },
              {
                title: 'Nos réponses',
                Icon: CheckCircle2,
                tint: 'text-brand-600',
                items: ['Former et équiper les jeunes producteurs', 'Partager des techniques de culture améliorées', 'Vendre en direct grâce aux coopératives', 'Payer chaque récolte au juste prix'],
              },
            ].map((b, i) => (
              <motion.div key={b.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="rounded-[28px] bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-900">{b.title}</h3>
                <ul className="mt-6 space-y-4">
                  {b.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[1.0625rem] text-ink-700">
                      <b.Icon className={`mt-0.5 h-5 w-5 shrink-0 ${b.tint}`} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-50 px-6 py-20 text-center">
        <motion.div {...reveal}>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-ink-900">Goûtez la différence.</h2>
          <p className="mt-3 text-[1.1875rem] text-ink-500">Du champ à votre table en 48 heures.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
            <Button size="lg" onClick={() => (window.location.hash = 'produits')}>Voir la boutique</Button>
            <Button variant="link" size="lg" onClick={() => (window.location.hash = 'recettes')}>Découvrir les recettes ›</Button>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
