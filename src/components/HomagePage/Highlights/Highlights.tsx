import { motion } from 'motion/react'
import { Leaf, Truck, Smartphone, HeartHandshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
    text: 'Nos tubercules quittent le champ moins de 48 h avant d’arriver à votre porte. Pas d’entrepôt, pas d’attente.',
    className: 'md:col-span-2 bg-white',
    iconClass: 'bg-brand-50 text-brand-600',
  },
  {
    Icon: Truck,
    title: 'Livraison offerte.',
    text: 'Dès 10 000 FCFA à Libreville.',
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
    text: 'Nous travaillons directement avec des coopératives du Woleu-Ntem, de la Ngounié et de l’Estuaire.',
    className: 'md:col-span-2 bg-gradient-to-br from-brand-700 to-brand-900 text-white',
    iconClass: 'bg-white/10 text-brand-200',
    dark: true,
  },
]

export default function Highlights() {
  return (
    <section id="avantages" className="section scroll-mt-12 bg-paper px-4 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mx-auto max-w-[760px] text-center text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 text-balance">
          Pourquoi Manioc Gabon.
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tiles.map(({ Icon, title, text, className, iconClass, dark }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`hover-wiggle group relative overflow-hidden rounded-[28px] p-8 sm:p-10 shadow-[var(--shadow-card)] ${className}`}
            >
              <span className={`inline-grid h-12 w-12 place-items-center rounded-2xl ${iconClass}`}>
                <Icon className="wiggle-target h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 whitespace-pre-line text-[1.5rem] sm:text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em]">
                {title}
              </h3>
              <p className={`mt-3 max-w-md text-[1.0625rem] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-500'}`}>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
