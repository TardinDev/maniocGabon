import { MapPin, Phone, Mail, Clock, ArrowRight, Leaf } from 'lucide-react'
import { footerLinks, socialNetworks } from '../../../data'
import { Button } from '../../ui'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-white noise"
      style={{
        background:
          'radial-gradient(800px 500px at 20% 0%, #15603C 0%, transparent 60%), radial-gradient(900px 500px at 85% 100%, #1F7A4C 0%, transparent 55%), linear-gradient(135deg, #041A10 0%, #082E1E 40%, #0E4A30 100%)',
      }}
    >
      {/* Top border glow */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(227,190,82,0.6), transparent)' }}
      />

      {/* Giant display watermark (awwwards-style) */}
      <div
        aria-hidden
        className="absolute -bottom-8 sm:-bottom-16 left-0 right-0 text-center pointer-events-none select-none"
      >
        <div className="font-display italic font-semibold text-white/[0.04] text-[22vw] leading-[0.85] whitespace-nowrap">
          Manioc Gabon
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        {/* Newsletter banner */}
        <div className="mb-16 p-8 lg:p-12 rounded-3xl glass-dark border border-white/10 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(227,190,82,0.6), transparent 70%)' }}
          />
          <div className="relative grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[0.65rem] uppercase tracking-[0.24em] text-white/80 mb-4">
                <Leaf className="w-3 h-3 text-gold-400" />
                Newsletter
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
                Rejoignez notre <span className="italic text-shimmer-gold">récolte</span>.
              </h3>
              <p className="text-white/70 mt-3 max-w-md">
                Recevez les nouveautés saisonnières, recettes exclusives et offres réservées à nos abonnés.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="votre@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/50 backdrop-blur-sm outline-none transition-colors focus:border-gold-400 focus:bg-white/15"
              />
              <Button type="submit" variant="gold" size="lg">
                S'inscrire
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          {/* About */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid place-items-center w-11 h-11 rounded-2xl bg-white/10 border border-white/10">
                <img src="/logo.png" alt="" className="w-7 h-7 object-contain" />
              </span>
              <div>
                <div className="font-display text-xl font-semibold leading-none">Manioc Gabon</div>
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-400 mt-1">Terroir · Gabon</div>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed text-[0.95rem] mb-6 max-w-sm">
              Producteur engagé, fournisseur de manioc frais, bio et transformé. Directement issu des meilleurs terroirs gabonais.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                <Leaf className="w-3 h-3 text-brand-300" />
                Bio certifié
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                <MapPin className="w-3 h-3 text-gold-400" />
                Made in Gabon
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.22em] text-gold-400 mb-5">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-gold-400 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.22em] text-gold-400 mb-5">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
                <span className="text-white/80 leading-relaxed">
                  Libreville, Gabon<br />
                  Quartier Montagne Sainte
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
                <a href="tel:+24101234567" className="text-white/80 hover:text-white transition-colors leading-relaxed">
                  +241 01 23 45 67<br />+241 07 89 01 23
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
                <a href="mailto:contact@maniocgabon.ga" className="text-white/80 hover:text-white transition-colors leading-relaxed">
                  contact@maniocgabon.ga<br />commandes@maniocgabon.ga
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" />
                <span className="text-white/80 leading-relaxed">
                  Lun – Ven : 8h – 18h<br />Sam : 8h – 14h
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.22em] text-gold-400 mb-5">Nous suivre</h3>
            <div className="flex gap-2.5 mb-6">
              {socialNetworks.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="grid place-items-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-lg hover:bg-white/15 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Plus de <span className="text-white font-semibold">12k</span> amoureux du manioc nous suivent déjà.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} Manioc Gabon. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
