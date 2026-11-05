import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../lib/utils'

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string | false
  type?: string
  inputMode?: 'tel' | 'email' | 'text'
  autoComplete?: string
  className?: string
}

/** Apple-style floating-label input. */
export function Field({ id, label, value, onChange, onBlur, error, type = 'text', inputMode, autoComplete, className }: FieldProps) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          placeholder=" "
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn(
            'peer h-14 w-full rounded-xl border bg-white px-4 pt-5 pb-1 text-[1.0625rem] text-ink-900 outline-none transition-colors',
            error
              ? 'border-clay-500 bg-clay-500/5 focus:ring-4 focus:ring-clay-500/15'
              : 'border-black/15 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15',
          )}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.0625rem] text-ink-400 transition-all duration-150 peer-focus:top-3.5 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', x: [0, -4, 4, -2, 0] }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 px-1 text-xs text-clay-500"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
