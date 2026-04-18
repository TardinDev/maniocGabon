import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-700 text-white hover:bg-brand-800 shadow-[0_6px_20px_-8px_rgba(21,96,60,0.55)] hover:shadow-[0_10px_30px_-6px_rgba(21,96,60,0.6)] hover:-translate-y-0.5',
        gold:
          'bg-gradient-to-br from-gold-400 to-gold-600 text-brand-950 hover:from-gold-500 hover:to-gold-600 shadow-[0_6px_20px_-6px_rgba(202,158,46,0.55)] hover:-translate-y-0.5',
        outline:
          'border border-brand-700/25 bg-white/70 text-brand-800 backdrop-blur-sm hover:bg-white hover:border-brand-700/40',
        ghost:
          'text-ink-900 hover:bg-brand-50',
        glass:
          'glass text-ink-900 hover:bg-white/85',
        'glass-dark':
          'glass-dark text-white hover:bg-brand-900/70',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'

export { buttonVariants }
