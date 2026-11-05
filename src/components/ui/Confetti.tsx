import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const COLORS = ['#2F9A63', '#E3BE52', '#C96A43', '#4FB97F', '#F2D77A', '#1D1D1F']
const SHAPES = ['🌿', '✦', '●', '■']

/** Lightweight confetti burst — no dependency. Re-mount (change `key`) to replay. */
export function Confetti({ count = 42 }: { count?: number }) {
  const reduce = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const distance = 140 + Math.random() * 220
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 80,
          rotate: Math.random() * 720 - 360,
          color: COLORS[i % COLORS.length],
          shape: SHAPES[i % SHAPES.length],
          size: 10 + Math.random() * 10,
          delay: Math.random() * 0.12,
        }
      }),
    [count],
  )

  if (reduce) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center overflow-visible">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute leading-none"
          style={{ color: p.color, fontSize: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 260], opacity: [1, 1, 0], scale: 1, rotate: p.rotate }}
          transition={{ duration: 1.6, delay: p.delay, ease: [0.2, 0.7, 0.4, 1] }}
        >
          {p.shape}
        </motion.span>
      ))}
    </div>
  )
}
