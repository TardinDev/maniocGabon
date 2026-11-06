import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Où livrez-vous ?',
    a: 'À Libreville, Akanda et Owendo sous 24 à 48 h. Nous livrons aussi Port-Gentil, Franceville, Oyem, Moanda et Lambaréné : comptez 2 à 4 jours.',
  },
  {
    q: 'Combien coûte la livraison ?',
    a: 'La livraison coûte 2 000 FCFA. Elle est offerte dès 10 000 FCFA d’achat.',
  },
  {
    q: 'Comment payer ?',
    a: 'Par Airtel Money ou Moov Money, par virement, ou en espèces à la livraison. Nous vous appelons toujours pour confirmer la commande avant de livrer.',
  },
  {
    q: 'Combien de temps se conserve le manioc frais ?',
    a: 'Deux à trois jours à l’air libre. Épluché et immergé dans l’eau au réfrigérateur, il tient environ une semaine. Les bâtons se gardent quatre à cinq jours au frais.',
  },
  {
    q: 'Puis-je commander pour un restaurant ou un événement ?',
    a: 'Oui. Écrivez-nous via le formulaire ci-dessous ou sur WhatsApp : nous préparons des devis pour les professionnels et les grandes quantités.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section scroll-mt-12 bg-paper px-6">
      <div className="mx-auto max-w-[820px]">
        <h2 className="text-center text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900">
          Questions fréquentes.
        </h2>
        <ul className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.1875rem] sm:text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink-900 cursor-pointer"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/5 text-ink-700"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-[1.0625rem] leading-relaxed text-ink-500">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
