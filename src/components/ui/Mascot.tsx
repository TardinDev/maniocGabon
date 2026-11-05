import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/utils'

type Props = {
  className?: string
  /** Opens the mouth (used while "talking"). */
  talking?: boolean
  /** Replays the little hop each time this value changes. */
  hop?: number
}

/**
 * "Mani" — the cassava mascot. Pure SVG, blinks on its own,
 * sways its leaves and hops when `hop` changes.
 */
export function Mascot({ className, talking = false, hop = 0 }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      key={hop}
      viewBox="0 0 160 200"
      role="img"
      aria-label="Mani, la mascotte manioc"
      className={cn('overflow-visible', className)}
      initial={hop && !reduce ? { y: 0, scaleY: 1 } : false}
      animate={hop && !reduce ? { y: [0, -26, 0, -6, 0], scaleY: [1, 1.04, 0.92, 1.02, 1] } : undefined}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ transformOrigin: '50% 100%' }}
    >
      {/* Shadow */}
      <ellipse cx="80" cy="192" rx="42" ry="6" fill="#1D1D1F" opacity="0.08" />

      {/* Leaves */}
      <motion.g
        style={{ transformOrigin: '80px 52px' }}
        animate={reduce ? undefined : { rotate: [0, 6, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M80 54 C70 30 52 18 38 14 C46 30 60 44 80 54Z" fill="#2F9A63" />
        <path d="M80 54 C78 28 82 10 92 0 C96 18 92 38 80 54Z" fill="#4FB97F" />
        <path d="M80 54 C94 34 112 26 128 26 C118 40 100 50 80 54Z" fill="#1F7A4C" />
        <path d="M80 54 C66 40 52 38 40 42 C52 52 66 56 80 54Z" fill="#84D4A5" />
      </motion.g>

      {/* Body (tuber) */}
      <path
        d="M80 48 C112 48 128 78 126 118 C124 158 104 186 80 186 C56 186 36 158 34 118 C32 78 48 48 80 48Z"
        fill="#8A5A3B"
      />
      {/* Bark texture */}
      <path d="M50 90 C56 92 60 90 64 86" stroke="#6B4129" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M104 140 C110 142 114 138 116 134" stroke="#6B4129" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M46 150 C50 154 56 154 58 150" stroke="#6B4129" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Face plate — the white flesh */}
      <ellipse cx="80" cy="116" rx="34" ry="36" fill="#FBF3E0" />

      {/* Eyes */}
      <g className={reduce ? undefined : 'animate-blink'}>
        <ellipse cx="68" cy="108" rx="5" ry="6.5" fill="#1D1D1F" />
        <ellipse cx="92" cy="108" rx="5" ry="6.5" fill="#1D1D1F" />
        <circle cx="69.6" cy="105.6" r="1.8" fill="#fff" />
        <circle cx="93.6" cy="105.6" r="1.8" fill="#fff" />
      </g>

      {/* Cheeks */}
      <ellipse cx="58" cy="124" rx="6" ry="3.5" fill="#E28968" opacity="0.55" />
      <ellipse cx="102" cy="124" rx="6" ry="3.5" fill="#E28968" opacity="0.55" />

      {/* Mouth */}
      {talking ? (
        <motion.ellipse
          cx="80"
          cy="128"
          rx="7"
          fill="#6B2E1E"
          animate={reduce ? { ry: 5 } : { ry: [3, 6, 3.5, 5.5, 3] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      ) : (
        <path d="M70 124 Q80 134 90 124" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" fill="none" />
      )}
    </motion.svg>
  )
}
