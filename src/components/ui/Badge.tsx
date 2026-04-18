import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
  {
    variants: {
      variant: {
        brand: 'bg-brand-50 text-brand-800 border border-brand-200',
        gold:  'bg-gold-400/15 text-gold-600 border border-gold-400/40',
        glass: 'glass text-ink-900',
        outline: 'border border-white/25 text-white/90',
      },
    },
    defaultVariants: { variant: 'brand' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
