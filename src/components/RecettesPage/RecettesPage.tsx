import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Clock, Users, ChefHat } from 'lucide-react'
import { recipes, recipeCategories, type Recipe, type RecipeCategory } from '../../data/recipes'
import { RecipeModal } from './RecipeModal'
import { cn } from '../../lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export default function RecettesPage() {
  const [category, setCategory] = useState<RecipeCategory | 'all'>('all')
  const [open, setOpen] = useState<Recipe | null>(null)

  const visible = useMemo(
    () => (category === 'all' ? recipes : recipes.filter((r) => r.category === category)),
    [category],
  )
  const [featured, ...rest] = visible

  return (
    <main className="bg-paper">
      {/* Hero */}
      <header className="px-6 pb-12 pt-16 text-center sm:pt-24">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
          Recettes
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.06, ease }}
          className="mx-auto mt-2 max-w-[860px] text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink-900 text-balance"
        >
          À vos marmites.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.14, ease }}
          className="mx-auto mt-5 max-w-[600px] text-[1.1875rem] leading-relaxed text-ink-500 sm:text-[1.3125rem]"
        >
          Les recettes de nos mamans, expliquées pas à pas. Cochez vos ingrédients, lancez le mode cuisine et laissez-vous guider.
        </motion.p>
      </header>

      {/* Tabs */}
      <div className="sticky top-12 z-30 flex justify-center bg-paper/80 px-4 py-3 backdrop-blur-xl">
        <LayoutGroup id="recipe-tabs">
          <div role="tablist" aria-label="Catégories de recettes" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-black/[0.05] p-1 [scrollbar-width:none]">
            {recipeCategories.map((c) => {
              const active = category === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    'group relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer',
                    active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="recipe-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative inline-block transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125">{c.emoji}</span>
                  <span className="relative">{c.name}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 pb-24 pt-8 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Featured recipe */}
            {featured && (
              <button
                onClick={() => setOpen(featured)}
                className="group relative grid w-full overflow-hidden rounded-[28px] bg-ink-900 text-left text-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-hover)] md:grid-cols-2 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px]">
                  <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-sm font-semibold text-gold-300">À la une</p>
                  <h2 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{featured.name}</h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">{featured.intro}</p>
                  <Meta recipe={featured} dark />
                  <span className="mt-8 inline-flex items-center gap-2 text-[1.0625rem] font-medium text-gold-300">
                    <ChefHat className="h-5 w-5 transition-transform group-hover:-rotate-12" /> Voir la recette ›
                  </span>
                </div>
              </button>
            )}

            {/* Grid */}
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((r, i) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                >
                  <button
                    onClick={() => setOpen(r)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-[18px] bg-white text-left shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream-50">
                      <img src={r.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                      <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                        {r.emoji}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-[-0.02em] text-ink-900">{r.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500 line-clamp-2">{r.intro}</p>
                      <div className="mt-auto">
                        <Meta recipe={r} />
                      </div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </section>

      <RecipeModal recipe={open} onClose={() => setOpen(null)} />
    </main>
  )
}

function Meta({ recipe, dark = false }: { recipe: Recipe; dark?: boolean }) {
  return (
    <div className={cn('mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm', dark ? 'text-white/70' : 'text-ink-500')}>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" aria-hidden /> {recipe.time}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Users className="h-4 w-4" aria-hidden /> {recipe.servings}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden>{recipe.difficulty === 'Facile' ? '👌' : '💪'}</span> {recipe.difficulty}
      </span>
    </div>
  )
}
