import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { cn } from '../../lib/utils'

type Props = { active: boolean; onToggle: () => void; label: string; className?: string }

/** Heart toggle with a little particle burst when liked. */
export function FavoriteButton({ active, onToggle, label, className }: Props) {
  const [burst, setBurst] = useState(0)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        if (!active) setBurst((b) => b + 1)
        onToggle()
      }}
      aria-pressed={active}
      aria-label={active ? `Retirer ${label} des favoris` : `Ajouter ${label} aux favoris`}
      className={cn(
        'relative grid place-items-center w-9 h-9 rounded-full bg-white/85 backdrop-blur-md shadow-sm transition-colors cursor-pointer active:scale-90',
        active ? 'text-clay-500' : 'text-ink-500 hover:text-clay-500',
        className,
      )}
    >
      <motion.span key={burst} animate={burst ? { scale: [1, 1.4, 0.9, 1] } : undefined} transition={{ duration: 0.45 }}>
        <Heart className="w-[18px] h-[18px]" fill={active ? 'currentColor' : 'none'} strokeWidth={2} />
      </motion.span>
      <AnimatePresence>
        {burst > 0 && active && (
          <motion.span key={`b-${burst}`} className="pointer-events-none absolute inset-0" initial="a" animate="b" exit={{ opacity: 0 }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full"
                  style={{ background: i % 2 ? '#C96A43' : '#E3BE52' }}
                  variants={{
                    a: { x: 0, y: 0, opacity: 1, scale: 1 },
                    b: { x: Math.cos(a) * 22, y: Math.sin(a) * 22, opacity: 0, scale: 0.4 },
                  }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )
            })}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
