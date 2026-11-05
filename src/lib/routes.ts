export type Page =
  | 'accueil'
  | 'culture'
  | 'nutrition'
  | 'recettes'
  | 'contact'
  | 'profile'
  | 'orders'
  | 'settings'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-users'
  | 'admin-orders'
  | 'confidentialite'
  | 'cgu'
  | 'mentions'
  | 'not-found'

/** Anchors that live on the home page — navigating to them scrolls instead of switching page. */
export const HOME_SECTIONS = ['produits', 'contact', 'faq', 'fonctionnement', 'avantages', 'commander', 'apropos'] as const

const SECTION_ALIASES: Record<string, string> = { commander: 'produits', apropos: 'avantages' }

const PAGES: Page[] = [
  'accueil',
  'culture',
  'nutrition',
  'recettes',
  'profile',
  'orders',
  'settings',
  'admin-dashboard',
  'admin-products',
  'admin-users',
  'admin-orders',
  'confidentialite',
  'cgu',
  'mentions',
]

export const PAGE_TITLES: Record<Page, string> = {
  accueil: 'Manioc Gabon — Le manioc du terroir, livré en 48 h',
  culture: 'Culture du manioc — Manioc Gabon',
  nutrition: 'Valeurs nutritionnelles — Manioc Gabon',
  recettes: 'Recettes traditionnelles — Manioc Gabon',
  contact: 'Contact — Manioc Gabon',
  profile: 'Mon profil — Manioc Gabon',
  orders: 'Mes commandes — Manioc Gabon',
  settings: 'Paramètres — Manioc Gabon',
  'admin-dashboard': 'Tableau de bord — Admin Manioc Gabon',
  'admin-products': 'Produits — Admin Manioc Gabon',
  'admin-users': 'Utilisateurs — Admin Manioc Gabon',
  'admin-orders': 'Commandes — Admin Manioc Gabon',
  confidentialite: 'Politique de confidentialité — Manioc Gabon',
  cgu: 'Conditions générales — Manioc Gabon',
  mentions: 'Mentions légales — Manioc Gabon',
  'not-found': 'Page introuvable — Manioc Gabon',
}

/** Resolve the current URL (path + hash) into a page and an optional home-page section. */
export function resolveLocation(pathname: string, hash: string): { page: Page; section?: string } {
  if (pathname !== '/' && pathname !== '/index.html') return { page: 'not-found' }
  const key = decodeURIComponent(hash.replace(/^#\/?/, ''))
  if (!key) return { page: 'accueil' }
  if ((HOME_SECTIONS as readonly string[]).includes(key)) {
    return { page: key === 'contact' ? 'contact' : 'accueil', section: SECTION_ALIASES[key] ?? key }
  }
  if ((PAGES as string[]).includes(key)) return { page: key as Page }
  return { page: 'not-found' }
}
