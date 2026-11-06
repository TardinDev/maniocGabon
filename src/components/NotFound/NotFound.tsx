import { useState } from 'react'
import { motion } from 'motion/react'
import { Button, Mascot } from '../ui'

/** 404 — Mani runs away when you try to catch it. */
export function NotFound({ onHome }: { onHome: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [escapes, setEscapes] = useState(0)

  const flee = () => {
    if (escapes >= 6) return
    setPos({ x: (Math.random() - 0.5) * 360, y: (Math.random() - 0.5) * 120 })
    setEscapes((e) => e + 1)
  }

  return (
    <main className="grid min-h-[80vh] place-items-center overflow-hidden bg-paper px-6 py-20 text-center">
      <div>
        <p className="text-[clamp(5rem,18vw,10rem)] font-bold leading-none tracking-[-0.06em] text-ink-900">
          4<span className="text-brand-600">0</span>4
        </p>
        <motion.div
          className="mx-auto mt-2 w-32"
          animate={{ x: pos.x, y: pos.y, rotate: pos.x / 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
          onHoverStart={flee}
          onTap={flee}
        >
          <Mascot hop={escapes} talking={escapes >= 6} />
        </motion.div>
        <h1 className="mt-6 text-[1.75rem] font-semibold tracking-[-0.025em] text-ink-900">
          {escapes >= 6 ? 'D’accord, vous m’avez eu !' : 'Cette page s’est enterrée.'}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[1.0625rem] text-ink-500">
          {escapes === 0
            ? 'Comme un bon manioc, elle reste introuvable. Essayez d’attraper Mani en attendant.'
            : escapes >= 6
              ? 'Retournons à la boutique, il y a de vrais tubercules là-bas.'
              : `Raté ! (${escapes}/6)`}
        </p>
        <Button size="lg" className="mt-8" onClick={onHome}>
          Retour à l’accueil
        </Button>
      </div>
    </main>
  )
}
