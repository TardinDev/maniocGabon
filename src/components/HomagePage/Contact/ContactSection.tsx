import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button, Field } from '../../ui'
import { WHATSAPP_NUMBER } from '../../../lib/format'
import { isEmail, isGabonPhone, looksLikeSpam } from '../../../lib/validation'

const CONTACT_EMAIL = 'contact@maniocgabon.ga'

const infos: { Icon: LucideIcon; label: string; value: string; href?: string; tint: string }[] = [
  { Icon: Phone, label: 'Téléphone', value: '+241 01 23 45 67', href: 'tel:+24101234567', tint: 'bg-brand-50 text-brand-600' },
  { Icon: MessageCircle, label: 'WhatsApp', value: 'Écrivez-nous', href: `https://wa.me/${WHATSAPP_NUMBER}`, tint: 'bg-[#25D366]/10 text-[#1DA851]' },
  { Icon: Mail, label: 'E-mail', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, tint: 'bg-gold-400/15 text-gold-600' },
  { Icon: MapPin, label: 'Adresse', value: 'Montagne Sainte, Libreville', tint: 'bg-clay-500/10 text-clay-500' },
  { Icon: Clock, label: 'Horaires', value: 'Lun–Ven 8 h–18 h · Sam 8 h–14 h', tint: 'bg-black/5 text-ink-700' },
]

type Form = { name: string; contact: string; message: string }
const empty: Form = { name: '', contact: '', message: '' }

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Indiquez votre nom.'
  if (!isEmail(f.contact) && !isGabonPhone(f.contact)) e.contact = 'Un e-mail ou un numéro gabonais valide.'
  if (f.message.trim().length < 10) e.message = 'Votre message doit faire au moins 10 caractères.'
  return e
}

export default function ContactSection() {
  const [form, setForm] = useState<Form>(empty)
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(Date.now())

  const errors = validate(form)
  const err = (k: keyof Form) => (touched[k] || submitted) && errors[k]

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length) return
    if (looksLikeSpam(honeypot, startedAt.current)) return

    const subject = `Message de ${form.name} via maniocgabon.ga`
    const body = `${form.message}\n\n— ${form.name} (${form.contact})`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast.success('Votre messagerie s’ouvre pour envoyer le message.')
    setForm(empty)
    setTouched({})
    setSubmitted(false)
  }

  return (
    <section id="contact" className="section scroll-mt-12 bg-cream-50 px-4 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900">
            Parlons manioc.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.1875rem] text-ink-500">
            Une question, une commande pour un événement ? Nous répondons en moins de 24 h.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <ul className="grid gap-3 self-start">
            {infos.map(({ Icon, label, value, href, tint }, i) => {
              const content = (
                <>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${tint}`}>
                    <Icon className="wiggle-target h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-500">{label}</span>
                    <span className="block text-[0.9375rem] font-medium text-ink-900">{value}</span>
                  </span>
                </>
              )
              return (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="hover-wiggle flex items-center gap-4 rounded-[18px] bg-white p-4 shadow-[var(--shadow-card)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="hover-wiggle flex items-center gap-4 rounded-[18px] bg-white p-4 shadow-[var(--shadow-card)]">{content}</div>
                  )}
                </motion.li>
              )
            })}
          </ul>

          <form noValidate onSubmit={onSubmit} className="relative rounded-[28px] bg-white p-6 sm:p-10 shadow-[var(--shadow-card)]">
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Ne pas remplir
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>
            <div className="grid gap-3">
              <Field id="ct-name" label="Votre nom" autoComplete="name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} onBlur={() => setTouched((t) => ({ ...t, name: true }))} error={err('name')} />
              <Field id="ct-contact" label="E-mail ou téléphone" autoComplete="email" value={form.contact} onChange={(v) => setForm((f) => ({ ...f, contact: v }))} onBlur={() => setTouched((t) => ({ ...t, contact: true }))} error={err('contact')} />
              <div>
                <label htmlFor="ct-message" className="sr-only">Message</label>
                <textarea
                  id="ct-message"
                  rows={5}
                  placeholder="Votre message"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  aria-invalid={!!err('message')}
                  className={`w-full resize-y rounded-xl border bg-white px-4 py-3.5 text-[1.0625rem] text-ink-900 outline-none placeholder:text-ink-400 transition-colors ${
                    err('message') ? 'border-clay-500 bg-clay-500/5' : 'border-black/15 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15'
                  }`}
                />
                {err('message') && <p role="alert" className="mt-1.5 px-1 text-xs text-clay-500">{errors.message}</p>}
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-400">
                Vos données servent uniquement à vous répondre.{' '}
                <a href="#confidentialite" className="underline">En savoir plus</a>
              </p>
              <Button type="submit" size="lg">Envoyer le message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
