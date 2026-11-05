export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Gabonese numbers: optional +241 / 00241 prefix, then 8 or 9 digits (spaces, dots, dashes allowed). */
export function isGabonPhone(value: string) {
  const digits = value.replace(/[\s.-]/g, '').replace(/^(\+241|00241)/, '')
  return /^0?\d{7,8}$/.test(digits) && digits.length >= 8
}

export function isEmail(value: string) {
  return EMAIL_RE.test(value.trim())
}

/**
 * Basic anti-spam: a honeypot field must stay empty and the form must not be
 * submitted faster than a human could fill it.
 */
export function looksLikeSpam(honeypot: string, startedAt: number, minMs = 2500) {
  return honeypot.trim() !== '' || Date.now() - startedAt < minMs
}
