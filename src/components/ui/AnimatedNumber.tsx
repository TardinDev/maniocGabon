import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  locale?: string
  stiffness?: number
  damping?: number
}

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  locale = 'fr-FR',
  stiffness = 80,
  damping = 20,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? value : 0)
  const spring = useSpring(mv, { stiffness, damping })
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString(locale))

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  )
}

export default AnimatedNumber
