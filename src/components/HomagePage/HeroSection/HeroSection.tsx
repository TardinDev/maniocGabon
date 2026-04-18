import { motion } from 'motion/react'
import { ArrowRight, Leaf, Sparkles, MapPin } from 'lucide-react'
import { Button } from '../../ui'

export default function HeroSection() {
  const stats = [
    { value: '100%', label: 'Origine Gabon' },
    { value: '48h', label: 'Livraison' },
    { value: 'Bio', label: 'Certifié' },
  ]

  const marqueeItems = [
    'Tubercules frais',
    'Feuilles de manioc',
    'Bâtons de manioc',
    'Farines transformées',
    'Bio certifié',
    'Terroir gabonais',
  ]

  return (
    <section
      className="relative -mt-20 pt-20 min-h-[92vh] flex flex-col overflow-hidden text-white noise"
      style={{
        background:
          'radial-gradient(1200px 600px at 15% 10%, #15603C 0%, transparent 60%), radial-gradient(900px 500px at 85% 20%, #1F7A4C 0%, transparent 55%), linear-gradient(135deg, #041A10 0%, #082E1E 40%, #0E4A30 100%)',
      }}
    >
      {/* Animated blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-[120px] opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(79,185,127,0.55), transparent 70%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[620px] h-[620px] rounded-full blur-[140px] opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(227,190,82,0.4), transparent 70%)' }}
        animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Leaf decorations */}
      <motion.div
        aria-hidden
        className="absolute top-[22%] right-[6%] w-24 h-24 lg:w-32 lg:h-32 text-brand-300/20"
        animate={{ rotate: [0, 6, -4, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,8 C62,20 84,26 92,42 C86,54 70,58 60,68 C54,74 50,88 44,76 C38,60 32,54 22,48 C16,42 12,32 24,22 C36,18 46,14 50,8 Z" />
        </svg>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-[18%] left-[8%] w-20 h-20 lg:w-28 lg:h-28 text-gold-400/25"
        animate={{ rotate: [0, -8, 5, 0], y: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,8 C62,20 84,26 92,42 C86,54 70,58 60,68 C54,74 50,88 44,76 C38,60 32,54 22,48 C16,42 12,32 24,22 C36,18 46,14 50,8 Z" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-white/90 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Récolte 2026 · Saison Ouverte
          </motion.div>

          {/* Display title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold leading-[0.92] tracking-tight text-balance text-[clamp(2.75rem,8vw,6.5rem)]"
          >
            <span className="block">Le manioc,</span>
            <span className="block italic font-normal text-white/95">
              réinventé avec <span className="text-shimmer-gold">éclat</span>.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed font-light"
          >
            Du champ à votre table. Une sélection rigoureuse de tubercules,
            feuilles et farines issus des meilleurs terroirs gabonais —
            livrés frais, 48 h après récolte.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              variant="gold"
              size="xl"
              onClick={() => {
                document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group"
            >
              Découvrir les produits
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="glass-dark"
              size="xl"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Leaf className="w-4 h-4" />
              Notre histoire
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-white/55">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Location pill (awwwards-style floating label) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="hidden lg:flex absolute bottom-24 left-8 items-center gap-2 glass-dark rounded-full px-4 py-2 text-xs text-white/80"
      >
        <MapPin className="w-3.5 h-3.5 text-gold-400" />
        Libreville · Port-Gentil · Franceville
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden lg:flex absolute bottom-24 right-8 flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180">
          Défiler
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-[scroll-cue_2s_ease-in-out_infinite]" />
      </motion.div>

      {/* Marquee ticker at bottom */}
      <div
        aria-hidden
        className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm py-4 overflow-hidden"
      >
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_40s_linear_infinite] will-change-transform">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/75">
              <span className="font-display italic text-gold-400">✦</span>
              <span className="uppercase tracking-[0.18em]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
