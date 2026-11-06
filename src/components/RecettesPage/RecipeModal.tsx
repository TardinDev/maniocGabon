import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChefHat, ChevronLeft, ChevronRight, Clock, ShoppingBag, Users, X } from 'lucide-react'
import type { Recipe } from '../../data/recipes'
import { products } from '../../data'
import { useShop } from '../../hooks/useShop'
import { Button, Confetti } from '../ui'
import { cn } from '../../lib/utils'

export function RecipeModal({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void }) {
  return <AnimatePresence>{recipe && <Dialog key={recipe.id} recipe={recipe} onClose={onClose} />}</AnimatePresence>
}

function Dialog({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const { addToCart } = useShop()
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [cooking, setCooking] = useState(false)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const linked = recipe.productIds.map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (cooking && e.key === 'ArrowRight') setStep((s) => Math.min(recipe.steps.length - 1, s + 1))
      if (cooking && e.key === 'ArrowLeft') setStep((s) => Math.max(0, s - 1))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, cooking, recipe.steps.length])

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const allChecked = checked.size === recipe.ingredients.length
  const isLast = step === recipe.steps.length - 1

  return (
    <>
      <motion.div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <div className="pointer-events-none fixed inset-0 z-[61] grid place-items-end sm:place-items-center sm:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="recipe-title"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="pointer-events-auto relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-paper shadow-[var(--shadow-modal)] sm:rounded-[28px]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-700 shadow-sm backdrop-blur-md hover:bg-white cursor-pointer"
            aria-label="Fermer la recette"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="overflow-y-auto">
            {/* Header image */}
            <div className="relative h-56 sm:h-72">
              <img src={recipe.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <h2 id="recipe-title" className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">
                  {recipe.name}
                </h2>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {recipe.time}</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {recipe.servings}</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!cooking ? (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-8 p-6 sm:grid-cols-[1fr_1.2fr] sm:p-8">
                  {/* Ingredients checklist */}
                  <section>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink-900">Ingrédients</h3>
                      <span className="text-xs text-ink-500 tabular-nums">
                        {checked.size}/{recipe.ingredients.length}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {recipe.ingredients.map((ing, i) => {
                        const on = checked.has(i)
                        return (
                          <li key={ing}>
                            <button
                              onClick={() => toggle(i)}
                              aria-pressed={on}
                              className="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-black/[0.03] cursor-pointer"
                            >
                              <motion.span
                                animate={on ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                  'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors',
                                  on ? 'border-brand-600 bg-brand-600 text-white' : 'border-black/25',
                                )}
                              >
                                {on && <Check className="h-3 w-3" strokeWidth={3} />}
                              </motion.span>
                              <span className={cn('text-[0.9375rem] transition-colors', on ? 'text-ink-400 line-through' : 'text-ink-900')}>{ing}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                    <AnimatePresence>
                      {allChecked && (
                        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-medium text-brand-700">
                          🎉 Tout est prêt, en cuisine !
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {linked.length > 0 && (
                      <div className="mt-6 rounded-[18px] bg-white p-4 shadow-[var(--shadow-card)]">
                        <p className="text-sm font-semibold text-ink-900">Disponible dans la boutique</p>
                        <ul className="mt-3 space-y-2">
                          {linked.map((p) => (
                            <li key={p.id} className="flex items-center gap-3 text-sm">
                              <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                              <span className="flex-1 text-ink-700">{p.name}</span>
                              <span className="text-ink-500 tabular-nums">{p.priceValue.toLocaleString('fr-FR')} F</span>
                            </li>
                          ))}
                        </ul>
                        <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => linked.forEach((p) => addToCart(p))}>
                          <ShoppingBag className="h-4 w-4" /> Ajouter au panier
                        </Button>
                      </div>
                    )}
                  </section>

                  {/* Steps */}
                  <section>
                    <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink-900">Préparation</h3>
                    <ol className="mt-3 space-y-4">
                      {recipe.steps.map((s, i) => (
                        <li key={s} className="flex gap-3">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-900 text-xs font-semibold text-white tabular-nums">{i + 1}</span>
                          <p className="text-[0.9375rem] leading-relaxed text-ink-700">{s}</p>
                        </li>
                      ))}
                    </ol>
                    {recipe.tip && (
                      <p className="mt-6 rounded-[18px] bg-gold-400/15 p-4 text-sm leading-relaxed text-ink-700">
                        <span className="font-semibold text-gold-600">Astuce de Mani · </span>
                        {recipe.tip}
                      </p>
                    )}
                    <Button
                      size="lg"
                      className="mt-6 w-full"
                      onClick={() => {
                        setStep(0)
                        setDone(false)
                        setCooking(true)
                      }}
                    >
                      <ChefHat className="h-5 w-5" /> Lancer le mode cuisine
                    </Button>
                  </section>
                </motion.div>
              ) : (
                <motion.div key="cooking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative p-6 sm:p-10">
                  {done && <Confetti />}
                  <div className="flex items-center justify-between">
                    <button onClick={() => setCooking(false)} className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline cursor-pointer">
                      <ChevronLeft className="h-4 w-4" /> Vue d’ensemble
                    </button>
                    <span className="text-sm text-ink-500 tabular-nums">
                      Étape {step + 1} sur {recipe.steps.length}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-5 flex gap-1.5" aria-hidden>
                    {recipe.steps.map((_, i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 flex-1 rounded-full"
                        animate={{ backgroundColor: i <= step ? '#2F9A63' : 'rgba(0,0,0,0.1)' }}
                      />
                    ))}
                  </div>

                  <div className="relative mt-10 min-h-[160px]">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={done ? 'done' : step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                        className="text-center text-[clamp(1.375rem,3.5vw,2rem)] font-semibold leading-snug tracking-[-0.02em] text-ink-900"
                        aria-live="polite"
                      >
                        {done ? `${recipe.emoji} Bon appétit !` : recipe.steps[step]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Button variant="ghost" className="bg-black/5" disabled={step === 0 || done} onClick={() => setStep((s) => Math.max(0, s - 1))}>
                      <ChevronLeft className="h-4 w-4" /> Précédente
                    </Button>
                    {done ? (
                      <Button onClick={onClose}>Terminer</Button>
                    ) : isLast ? (
                      <Button onClick={() => setDone(true)}>
                        C’est prêt ! <Check className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => setStep((s) => s + 1)}>
                        Suivante <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="mt-4 hidden text-center text-xs text-ink-400 sm:block">Astuce : utilisez les flèches ← → du clavier.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  )
}
