import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import {
  BarChart3,
  Flame,
  Zap,
  Sprout,
  Dumbbell,
  Gem,
  Microscope,
  Activity,
  HeartPulse,
  Brain,
  Sparkles,
  Bone,
  Shield,
  TrendingUp,
  Lightbulb,
  ClipboardList,
  UtensilsCrossed,
  Clock,
  Salad,
  AlertTriangle,
  Scale,
  Baby,
  Stethoscope,
  Check,
  Star,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

function AnimatedValue({ value }: { value: string }) {
  const numeric = parseFloat(value)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? numeric : 0)
  const spring = useSpring(mv, { stiffness: 70, damping: 20 })
  const decimals = value.includes('.') ? 1 : 0
  const rounded = useTransform(spring, (v) => v.toFixed(decimals))

  useEffect(() => {
    if (inView) mv.set(numeric)
  }, [inView, numeric, mv])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
    </span>
  )
}

export default function NutritionPage() {
  const reduce = useReducedMotion()

  const nutrients = [
    { nutrient: 'Calories', value: '160', unit: 'kcal', Icon: Flame, gradient: 'from-orange-500 to-orange-700' },
    { nutrient: 'Glucides', value: '38', unit: 'g', Icon: Zap, gradient: 'from-amber-500 to-amber-700' },
    { nutrient: 'Fibres', value: '1.8', unit: 'g', Icon: Sprout, gradient: 'from-emerald-500 to-emerald-700' },
    { nutrient: 'Protéines', value: '1.4', unit: 'g', Icon: Dumbbell, gradient: 'from-violet-500 to-violet-700' },
  ]

  const benefits = [
    {
      Icon: HeartPulse,
      title: 'Santé Cardiovasculaire',
      items: ['Riche en potassium', 'Réduit la pression artérielle', 'Améliore la circulation', 'Protège le cœur'],
      iconBg: 'bg-rose-500/10 ring-rose-500/15 text-rose-600',
      wrap: 'bg-rose-50 ring-rose-200',
    },
    {
      Icon: Brain,
      title: 'Santé Cérébrale',
      items: ['Améliore la concentration', 'Booste la mémoire', 'Réduit le stress oxydatif', 'Nourrit les neurones'],
      iconBg: 'bg-violet-500/10 ring-violet-500/15 text-violet-600',
      wrap: 'bg-violet-50 ring-violet-200',
    },
    {
      Icon: Sparkles,
      title: 'Énergie Durable',
      items: ['Glucides complexes', "Libération lente d'énergie", 'Évite les pics glycémiques', "Soutient l'endurance"],
      iconBg: 'bg-amber-500/10 ring-amber-500/15 text-amber-600',
      wrap: 'bg-amber-50 ring-amber-200',
    },
    {
      Icon: Bone,
      title: 'Santé Osseuse',
      items: ['Calcium et phosphore', 'Renforce les os', "Prévient l'ostéoporose", 'Soutient la croissance'],
      iconBg: 'bg-slate-500/10 ring-slate-500/15 text-slate-600',
      wrap: 'bg-slate-50 ring-slate-200',
    },
    {
      Icon: Shield,
      title: 'Système Immunitaire',
      items: ['Vitamine C naturelle', 'Antioxydants puissants', 'Combat les infections', 'Renforce les défenses'],
      iconBg: 'bg-sky-500/10 ring-sky-500/15 text-sky-600',
      wrap: 'bg-sky-50 ring-sky-200',
    },
    {
      Icon: Sprout,
      title: 'Digestion Saine',
      items: ['Fibres alimentaires', 'Facilite la digestion', 'Régule le transit', 'Nourrit la flore intestinale'],
      iconBg: 'bg-emerald-500/10 ring-emerald-500/15 text-emerald-600',
      wrap: 'bg-emerald-50 ring-emerald-200',
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-sky-50 to-white min-h-[80vh] overflow-hidden">
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Valeurs Nutritionnelles du Manioc
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez les exceptionnelles qualités nutritionnelles du manioc,
            un superaliment naturel aux multiples bienfaits pour la santé
          </motion.p>
        </motion.header>

        {/* Section Composition nutritionnelle */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            <BarChart3 className="w-8 h-8 text-sky-600" aria-hidden="true" />
            Composition Nutritionnelle
            <span className="text-lg font-medium text-slate-500 ml-2">(pour 100g)</span>
          </motion.h2>

          <motion.ul
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 list-none"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {nutrients.map((item, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`bg-gradient-to-br ${item.gradient} p-6 text-white text-center`}>
                  <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-white/15 ring-1 ring-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
                    <item.Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold tabular-nums">
                    <AnimatedValue value={item.value} />
                  </div>
                  <div className="text-sm text-white/85">{item.unit}</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-slate-800">{item.nutrient}</h3>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Section Vitamines et Minéraux */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            <Gem className="w-8 h-8 text-sky-600" aria-hidden="true" />
            Vitamines et Minéraux Essentiels
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Vitamines',
                HeaderIcon: Microscope,
                wrap: 'bg-gradient-to-br from-sky-50 to-indigo-50 ring-sky-100',
                titleClass: 'text-sky-900',
                labelClass: 'text-sky-800',
                valueClass: 'text-sky-700',
                fromX: -24,
                items: [
                  { name: 'Vitamine C', amount: '20.6mg', benefit: "Antioxydant naturel, renforce l'immunité" },
                  { name: 'Vitamine K', amount: '1.9μg', benefit: 'Coagulation sanguine, santé osseuse' },
                  { name: 'Folates', amount: '27μg', benefit: 'Formation des globules rouges' },
                  { name: 'Thiamine (B1)', amount: '0.087mg', benefit: 'Métabolisme énergétique' },
                ],
              },
              {
                title: 'Minéraux',
                HeaderIcon: Activity,
                wrap: 'bg-gradient-to-br from-emerald-50 to-teal-50 ring-emerald-100',
                titleClass: 'text-emerald-900',
                labelClass: 'text-emerald-800',
                valueClass: 'text-emerald-700',
                fromX: 24,
                items: [
                  { name: 'Potassium', amount: '271mg', benefit: 'Régulation tension artérielle' },
                  { name: 'Magnésium', amount: '21mg', benefit: 'Fonction musculaire et nerveuse' },
                  { name: 'Phosphore', amount: '27mg', benefit: 'Santé des os et dents' },
                  { name: 'Calcium', amount: '16mg', benefit: 'Solidité osseuse' },
                ],
              },
            ].map((panel, idx) => (
              <motion.div
                key={idx}
                className={`${panel.wrap} p-8 rounded-2xl ring-1`}
                initial={{ opacity: 0, x: panel.fromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className={`flex items-center justify-center gap-2 text-2xl font-bold mb-6 ${panel.titleClass}`}>
                  <panel.HeaderIcon className="w-6 h-6" aria-hidden="true" />
                  {panel.title}
                </h3>
                <motion.ul
                  className="space-y-3 list-none"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {panel.items.map((row, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      transition={{ duration: 0.4 }}
                      whileHover={reduce ? undefined : { x: 3 }}
                      className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-slate-900/5"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className={`font-semibold ${panel.labelClass}`}>{row.name}</span>
                        <span className={`font-bold tabular-nums ${panel.valueClass}`}>{row.amount}</span>
                      </div>
                      <p className="text-sm text-slate-600">{row.benefit}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Bienfaits pour la santé */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            <HeartPulse className="w-8 h-8 text-sky-600" aria-hidden="true" />
            Bienfaits pour la Santé
          </motion.h2>

          <motion.ul
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-none"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className={`group p-6 rounded-2xl ring-1 ${benefit.wrap} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 ${benefit.iconBg} transition-transform group-hover:scale-105`}>
                    <benefit.Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{benefit.title}</h3>
                </div>
                <motion.ul
                  className="space-y-2 list-none"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {benefit.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Section Comparaison avec autres aliments */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center"
          >
            <TrendingUp className="w-8 h-8 text-sky-600" aria-hidden="true" />
            Comparaison Nutritionnelle
          </motion.h2>

          <motion.div
            className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">Comparaison nutritionnelle du manioc avec d'autres aliments de base, pour 100g</caption>
                <thead className="bg-gradient-to-r from-sky-700 to-indigo-700 text-white">
                  <tr>
                    <th scope="col" className="p-4 text-left font-semibold">Aliment (100g)</th>
                    <th scope="col" className="p-4 text-center font-semibold">Calories</th>
                    <th scope="col" className="p-4 text-center font-semibold">Glucides</th>
                    <th scope="col" className="p-4 text-center font-semibold">Fibres</th>
                    <th scope="col" className="p-4 text-center font-semibold">Vitamine C</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="divide-y divide-slate-100"
                >
                  {[
                    { name: 'Manioc', calories: '160', carbs: '38g', fiber: '1.8g', vitc: '20.6mg', highlight: true },
                    { name: 'Pomme de terre', calories: '77', carbs: '17g', fiber: '2.2g', vitc: '19.7mg', highlight: false },
                    { name: 'Riz blanc', calories: '130', carbs: '28g', fiber: '0.4g', vitc: '0mg', highlight: false },
                    { name: 'Patate douce', calories: '86', carbs: '20g', fiber: '3.0g', vitc: '2.4mg', highlight: false },
                  ].map((food, index) => (
                    <motion.tr
                      key={index}
                      variants={fadeUp}
                      transition={{ duration: 0.4 }}
                      className={food.highlight ? 'bg-sky-50' : 'hover:bg-slate-50'}
                    >
                      <td className={`p-4 font-semibold ${food.highlight ? 'text-sky-900' : 'text-slate-800'}`}>
                        <span className="inline-flex items-center gap-2">
                          {food.name}
                          {food.highlight && <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-label="Aliment en focus" />}
                        </span>
                      </td>
                      <td className="p-4 text-center tabular-nums text-slate-700">{food.calories}</td>
                      <td className="p-4 text-center tabular-nums text-slate-700">{food.carbs}</td>
                      <td className="p-4 text-center tabular-nums text-slate-700">{food.fiber}</td>
                      <td className="p-4 text-center tabular-nums text-slate-700">{food.vitc}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Section Conseils nutritionnels */}
        <motion.section
          className="bg-gradient-to-br from-indigo-900 to-sky-800 text-white p-8 lg:p-12 rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full blur-[110px] opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.7), transparent 70%)' }}
              animate={{ x: [0, 40, -10, 0], y: [0, -20, 20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <div className="text-center mb-12 relative">
            <div className="inline-flex mb-4 w-14 h-14 rounded-2xl bg-white/10 ring-1 ring-white/15 items-center justify-center">
              <Lightbulb className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Conseils Nutritionnels</h2>
            <p className="text-lg text-white/85 max-w-3xl mx-auto">
              Optimisez les bienfaits nutritionnels du manioc dans votre alimentation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {[
              {
                HeaderIcon: ClipboardList,
                heading: 'Recommandations',
                fromX: -24,
                wrap: 'bg-white/10',
                ring: 'ring-1 ring-white/10',
                items: [
                  { Icon: UtensilsCrossed, title: 'Portion idéale', description: '150-200g par repas pour un adulte' },
                  { Icon: Clock, title: 'Moment optimal', description: "Le matin ou avant l'exercice physique" },
                  { Icon: Flame, title: 'Préparation', description: 'Toujours cuire le manioc avant consommation' },
                  { Icon: Salad, title: 'Association', description: 'Combiner avec des légumes verts et protéines' },
                ],
              },
              {
                HeaderIcon: AlertTriangle,
                heading: 'Précautions',
                fromX: 24,
                wrap: 'bg-amber-500/15',
                ring: 'ring-1 ring-amber-300/25',
                items: [
                  { Icon: Flame, title: 'Cuisson obligatoire', description: 'Ne jamais consommer le manioc cru' },
                  { Icon: Scale, title: 'Modération', description: "Équilibrer avec d'autres sources de glucides" },
                  { Icon: Baby, title: 'Enfants', description: 'Introduire progressivement chez les jeunes enfants' },
                  { Icon: Stethoscope, title: 'Conditions médicales', description: 'Consulter un professionnel si diabète ou allergies' },
                ],
              },
            ].map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: block.fromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
              >
                <h3 className="flex items-center gap-2 text-xl font-bold mb-5 text-white">
                  <block.HeaderIcon className="w-5 h-5" aria-hidden="true" />
                  {block.heading}
                </h3>
                <motion.ul
                  className="space-y-3 list-none"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {block.items.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      transition={{ duration: 0.4 }}
                      whileHover={reduce ? undefined : { x: 4 }}
                      className={`flex items-start gap-3 ${block.wrap} ${block.ring} p-4 rounded-xl`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/10 ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                        <item.Icon className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-0.5">{item.title}</h4>
                        <p className="text-sm text-white/85">{item.description}</p>
                      </div>
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
