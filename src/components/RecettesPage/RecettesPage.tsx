import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import {
  UtensilsCrossed,
  Salad,
  Cake,
  Leaf,
  Flame,
  Wheat,
  ShoppingCart,
  ChefHat,
  Clock,
  Users,
  ArrowRight,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

type Recipe = {
  id: number
  name: string
  time: string
  difficulty: 'Facile' | 'Moyen' | 'Intermédiaire'
  servings: string
  Icon: LucideIcon
  gradient: string
  ingredients: string[]
  instructions: string[]
}

export default function RecettesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'plats-principaux' | 'accompagnements' | 'desserts'>(
    'plats-principaux',
  )
  const reduce = useReducedMotion()

  const recipeCategories: { id: typeof selectedCategory; name: string; Icon: LucideIcon }[] = [
    { id: 'plats-principaux', name: 'Plats Principaux', Icon: UtensilsCrossed },
    { id: 'accompagnements', name: 'Accompagnements', Icon: Salad },
    { id: 'desserts', name: 'Desserts', Icon: Cake },
  ]

  const recipes: Record<typeof selectedCategory, Recipe[]> = {
    'plats-principaux': [
      {
        id: 1,
        name: 'Manioc aux Feuilles de Patate Douce',
        time: '45 min',
        difficulty: 'Facile',
        servings: '4 personnes',
        Icon: Leaf,
        gradient: 'from-emerald-500 to-emerald-700',
        ingredients: [
          '1kg de manioc frais',
          '500g de feuilles de patate douce',
          '200g de poisson fumé',
          '1 oignon',
          'Huile de palme',
        ],
        instructions: [
          'Éplucher et couper le manioc en morceaux',
          "Faire bouillir le manioc dans l'eau salée pendant 20 minutes",
          'Laver et hacher finement les feuilles',
          "Faire revenir l'oignon dans l'huile de palme",
        ],
      },
      {
        id: 2,
        name: 'Bâtons de Manioc Grillés',
        time: '30 min',
        difficulty: 'Facile',
        servings: '6 personnes',
        Icon: Flame,
        gradient: 'from-orange-500 to-red-600',
        ingredients: ['1.5kg de manioc frais', "Huile d'olive", 'Sel', 'Épices au choix'],
        instructions: [
          'Éplucher le manioc et le couper en bâtons',
          "Faire bouillir 15 minutes dans l'eau salée",
          'Égoutter et laisser refroidir',
          'Griller au barbecue 10-15 minutes',
        ],
      },
    ],
    accompagnements: [
      {
        id: 3,
        name: 'Farine de Manioc Fermentée',
        time: '3 jours',
        difficulty: 'Intermédiaire',
        servings: '500g',
        Icon: Wheat,
        gradient: 'from-amber-500 to-amber-700',
        ingredients: ['2kg de manioc amer', 'Eau propre', 'Feuilles de bananier'],
        instructions: [
          'Éplucher et râper le manioc',
          'Envelopper dans des feuilles de bananier',
          'Laisser fermenter 3 jours',
          'Faire sécher au soleil',
        ],
      },
    ],
    desserts: [
      {
        id: 4,
        name: 'Gâteau de Manioc au Coco',
        time: '1h 15',
        difficulty: 'Moyen',
        servings: '8 personnes',
        Icon: Cake,
        gradient: 'from-rose-500 to-orange-500',
        ingredients: ['500g de manioc râpé', '400ml de lait de coco', '200g de sucre', '3 œufs'],
        instructions: [
          'Préchauffer le four à 180°C',
          'Mélanger le manioc râpé avec le lait de coco',
          'Battre les œufs avec le sucre',
          'Cuire 45 minutes',
        ],
      },
    ],
  }

  const getDifficultyColor = (difficulty: Recipe['difficulty']) => {
    switch (difficulty) {
      case 'Facile':
        return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
      case 'Moyen':
        return 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'
      case 'Intermédiaire':
        return 'bg-orange-100 text-orange-800 ring-1 ring-orange-200'
    }
  }

  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-b from-orange-50 to-white min-h-[80vh] overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
            Recettes Traditionnelles au Manioc
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Redécouvrez les saveurs authentiques du Gabon avec nos recettes traditionnelles à base de manioc
          </motion.p>
        </motion.header>

        {/* Tabs de catégories */}
        <motion.div
          role="tablist"
          aria-label="Catégories de recettes"
          className="mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {recipeCategories.map((category) => {
            const active = selectedCategory === category.id
            return (
              <motion.button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`recipes-${category.id}`}
                id={`tab-${category.id}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className={`relative min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-full font-medium shadow-sm ring-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 ${
                  active
                    ? 'text-white ring-transparent'
                    : 'bg-white text-orange-800 ring-orange-200 hover:bg-orange-50'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="category-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-red-600 shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <category.Icon className="relative w-5 h-5" aria-hidden="true" />
                <span className="relative">{category.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grille de recettes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            id={`recipes-${selectedCategory}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedCategory}`}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          >
            {recipes[selectedCategory]?.map((recipe) => (
              <motion.article
                key={recipe.id}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-br ${recipe.gradient} p-6 text-white text-center relative overflow-hidden`}>
                  {!reduce && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-10 bg-white/10 rounded-full blur-2xl pointer-events-none"
                      animate={{ x: [0, 30, -20, 0], y: [0, -10, 20, 0] }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-white/15 ring-1 ring-white/20 flex items-center justify-center transition-transform group-hover:scale-105 relative">
                    <recipe.Icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 relative">{recipe.name}</h3>
                  <div className="flex justify-center gap-4 text-sm text-white/90 relative">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span className="tabular-nums">{recipe.time}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4" aria-hidden="true" />
                      {recipe.servings}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="mb-5">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                      <ShoppingCart className="w-4 h-4 text-orange-600" aria-hidden="true" />
                      Ingrédients
                    </h4>
                    <motion.ul
                      className="space-y-1.5 text-sm text-slate-600 list-none"
                      variants={stagger}
                      initial="hidden"
                      animate="visible"
                    >
                      {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                        <motion.li
                          key={index}
                          variants={fadeUp}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-2"
                        >
                          <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" aria-hidden="true" />
                          <span>{ingredient}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
                      <ChefHat className="w-4 h-4 text-orange-600" aria-hidden="true" />
                      Préparation
                    </h4>
                    <motion.ol
                      className="space-y-2 text-sm text-slate-600 list-none"
                      variants={stagger}
                      initial="hidden"
                      animate="visible"
                    >
                      {recipe.instructions.slice(0, 3).map((step, index) => (
                        <motion.li
                          key={index}
                          variants={fadeUp}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-2"
                        >
                          <span
                            className="bg-orange-100 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold tabular-nums mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </motion.li>
                      ))}
                    </motion.ol>
                  </div>

                  <motion.button
                    type="button"
                    aria-label={`Voir la recette complète : ${recipe.name}`}
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                  >
                    Voir la recette complète
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
