import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,box-shadow,transform,color] duration-200 ease-out cursor-pointer select-none active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-brand-700 text-white hover:bg-brand-600',
        dark: 'bg-ink-900 text-white hover:bg-ink-700',
        gold: 'bg-gold-400 text-ink-900 hover:bg-gold-300',
        outline: 'border border-brand-700 text-brand-700 bg-transparent hover:bg-brand-700 hover:text-white',
        ghost: 'text-ink-900 hover:bg-black/5',
        glass: 'glass text-ink-900 hover:bg-white/90',
        'glass-dark': 'glass-dark text-white hover:bg-white/15',
        link: 'h-auto px-0 text-brand-600 hover:underline underline-offset-4 active:scale-100',
      },
      size: {
        sm: 'h-8 px-4 text-[0.8125rem]',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-6 text-[0.9375rem]',
        xl: 'h-[52px] px-7 text-[1.0625rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { buttonVariants }
