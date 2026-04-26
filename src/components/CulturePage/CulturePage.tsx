import { motion, useReducedMotion } from 'motion/react'
import {
  Leaf,
  Sprout,
  Scissors,
  CloudRain,
  Wheat,
  Tractor,
  Landmark,
  Drama,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Dot,
} from 'lucide-react'
import { AnimatedNumber } from '../ui/AnimatedNumber'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}

export default function CulturePage() {
  const reduce = useReducedMotion()

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-emerald-50 to-white min-h-[80vh] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Titre principal */}
        <motion.header
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-emerald-900 mb-6"
          >
            Culture du Manioc au Gabon
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-emerald-800/80 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez l'histoire, les traditions et les techniques de culture du manioc,
            aliment de base emblématique du Gabon
          </motion.p>
        </motion.header>

        {/* Section Histoire */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="flex items-center gap-3 text-3xl sm:text-4xl font-bold text-emerald-900 mb-6">
                <Leaf className="w-8 h-8 text-emerald-600" aria-hidden="true" />
                Histoire et Origines
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  Le manioc (Manihot esculenta) est cultivé au Gabon depuis des siècles.
                  Originaire d'Amérique du Sud, cette plante s'est parfaitement adaptée
                  au climat tropical gabonais.
                </p>
                <p>
                  Introduit par les premiers explorateurs, le manioc est rapidement devenu
                  un pilier de l'alimentation gabonaise, particulièrement apprécié pour sa
                  résistance aux conditions climatiques difficiles et sa facilité de culture.
                </p>
                <p>
                  Aujourd'hui, le Gabon produit plus de <strong>230 000 tonnes</strong> de
                  manioc par an, faisant de cette culture l'une des plus importantes du pays.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-8 rounded-2xl"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-emerald-600/10 ring-1 ring-emerald-600/20 flex items-center justify-center"
                  animate={reduce ? undefined : { rotate: [0, 6, -4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sprout className="w-10 h-10 text-emerald-600" aria-hidden="true" />
                </motion.div>
              </div>
              <motion.dl
                className="grid grid-cols-2 gap-4 text-center"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {[
                  { value: 230, suffix: 'k', label: 'Tonnes/an' },
                  { value: 85, suffix: '%', label: 'Des familles' },
                  { value: 12, suffix: '', label: 'Mois/cycle' },
                  { value: 40, suffix: '%', label: 'Calories/jour' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    whileHover={reduce ? undefined : { y: -2, scale: 1.03 }}
                    className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-slate-900/5"
                  >
                    <dt className="text-2xl font-bold text-emerald-700">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </dt>
                    <dd className="text-sm text-slate-600 mt-1">{stat.label}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </motion.div>
          </div>
        </div>

        {/* Section Techniques de culture */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-emerald-900 mb-12 text-center"
          >
            <Tractor className="w-8 h-8 text-emerald-600" aria-hidden="true" />
            Techniques de Culture Traditionnelles
          </motion.h2>

          <motion.ul
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 list-none"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              {
                Icon: Sprout,
                title: 'Préparation du Sol',
                description: 'Défrichage et brûlis traditionnel pour enrichir le sol en cendres nutritives',
              },
              {
                Icon: Scissors,
                title: 'Bouturage',
                description: 'Plantation de boutures de 20-25cm provenant de plants mères sélectionnés',
              },
              {
                Icon: CloudRain,
                title: 'Saison des Pluies',
                description:
                  'Plantation en début de saison des pluies (octobre-novembre) pour optimiser la croissance',
              },
              {
                Icon: Wheat,
                title: 'Récolte',
                description: 'Récolte après 8-12 mois, tubercules pouvant peser jusqu\'à 2kg chacun',
              },
            ].map((step, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-900/5 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-xl bg-emerald-600/10 ring-1 ring-emerald-600/15 flex items-center justify-center transition-transform group-hover:scale-105">
                    <step.Icon className="w-7 h-7 text-emerald-700" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Section Variétés */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-emerald-900 mb-12 text-center"
          >
            <Leaf className="w-8 h-8 text-emerald-600" aria-hidden="true" />
            Variétés Cultivées au Gabon
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              {
                name: 'Manioc Doux',
                characteristics: 'Faible teneur en cyanure, consommation directe possible',
                uses: 'Bouilli, grillé, en tubercules',
                gradient: 'from-emerald-500 to-emerald-700',
              },
              {
                name: 'Manioc Amer',
                characteristics: 'Riche en amidon, nécessite transformation',
                uses: 'Farine, tapioca, boissons fermentées',
                gradient: 'from-teal-500 to-emerald-700',
              },
              {
                name: 'Manioc Rouge',
                characteristics: 'Chair rougeâtre, très nutritif',
                uses: 'Plats traditionnels, cérémonies',
                gradient: 'from-orange-500 to-red-600',
              },
            ].map((variety, index) => (
              <motion.article
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-900/5"
              >
                {!reduce && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/15 pointer-events-none"
                    initial={{ x: '-120%' }}
                    whileHover={{ x: '120%' }}
                    transition={{ duration: 0.7 }}
                  />
                )}
                <div className={`bg-gradient-to-br ${variety.gradient} p-8 text-white relative`}>
                  <h3 className="text-2xl font-bold mb-4">{variety.name}</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-semibold mb-1">Caractéristiques</dt>
                      <dd className="text-sm text-white/90">{variety.characteristics}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold mb-1">Utilisations</dt>
                      <dd className="text-sm text-white/90">{variety.uses}</dd>
                    </div>
                  </dl>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Section Importance culturelle */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl ring-1 ring-emerald-900/5"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-600/10 ring-1 ring-emerald-600/20 flex items-center justify-center mb-3">
                  <Landmark className="w-8 h-8 text-emerald-700" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">Patrimoine Culturel</h3>
              </div>
              <motion.ul
                className="space-y-3 text-slate-700"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  'Aliment de base dans 90% des foyers gabonais',
                  'Présent dans les cérémonies traditionnelles',
                  'Symbole de sécurité alimentaire',
                  'Transmission de savoir ancestral',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    transition={{ duration: 0.35 }}
                    className="flex items-start gap-3"
                  >
                    <Dot className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="flex items-center gap-3 text-3xl sm:text-4xl font-bold text-emerald-900 mb-6">
                <Drama className="w-8 h-8 text-emerald-600" aria-hidden="true" />
                Importance Culturelle
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  Au-delà de son importance nutritionnelle, le manioc occupe une place
                  centrale dans la culture gabonaise. Il est présent dans les rites de
                  passage, les célébrations et les traditions culinaires familiales.
                </p>
                <p>
                  Les techniques de transformation du manioc se transmettent de mère en
                  fille depuis des générations. Chaque région du Gabon a développé ses
                  propres méthodes de préparation et ses spécialités culinaires.
                </p>
                <p>
                  Le manioc représente également un symbole de résilience pour le peuple
                  gabonais, capable de nourrir les familles même pendant les périodes difficiles.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Défis et perspectives */}
        <motion.section
          className="bg-gradient-to-br from-emerald-900 to-emerald-700 text-white p-8 lg:p-12 rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(134,239,172,0.6), transparent 70%)' }}
              animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <div className="text-center mb-12 relative">
            <div className="inline-flex mb-4 w-14 h-14 rounded-2xl bg-white/10 ring-1 ring-white/15 items-center justify-center">
              <Rocket className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Défis et Perspectives</h2>
            <p className="text-lg text-white/85 max-w-3xl mx-auto">
              Moderniser la culture du manioc tout en préservant les traditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {[
              {
                title: 'Défis Actuels',
                Icon: AlertTriangle,
                iconClass: 'text-amber-300',
                items: [
                  'Vieillissement des agriculteurs',
                  'Méthodes de culture traditionnelles limitées',
                  'Accès limité aux marchés urbains',
                  'Transformation artisanale uniquement',
                ],
              },
              {
                title: 'Solutions Innovantes',
                Icon: CheckCircle2,
                iconClass: 'text-emerald-300',
                items: [
                  'Formation des jeunes agriculteurs',
                  'Techniques de culture améliorées',
                  'Développement de coopératives',
                  'Unités de transformation modernes',
                ],
              },
            ].map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">{block.title}</h3>
                <motion.ul
                  className="space-y-3"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {block.items.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-3"
                    >
                      <block.Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${block.iconClass}`} aria-hidden="true" />
                      <span className="text-white/95">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  )
}
