import type { ReactNode } from 'react'

export type LegalKind = 'confidentialite' | 'cgu' | 'mentions'

const UPDATED = '5 novembre 2026'

type Doc = { title: string; intro: string; sections: { h: string; body: ReactNode }[] }

const docs: Record<LegalKind, Doc> = {
  confidentialite: {
    title: 'Politique de confidentialité',
    intro:
      'Vos données vous appartiennent. Cette page explique quelles informations nous collectons, pourquoi, et comment exercer vos droits.',
    sections: [
      {
        h: 'Responsable du traitement',
        body: 'Manioc Gabon, Montagne Sainte, Libreville, Gabon. Contact : contact@maniocgabon.ga.',
      },
      {
        h: 'Données collectées',
        body: (
          <ul className="list-disc space-y-1 pl-5">
            <li>Commande : nom, prénom, téléphone, e-mail (facultatif), adresse de livraison, ville, mode de paiement.</li>
            <li>Compte client : e-mail, nom complet et mot de passe chiffré (hébergé par Supabase).</li>
            <li>Newsletter : adresse e-mail.</li>
            <li>Contact : nom, e-mail ou téléphone, contenu du message.</li>
          </ul>
        ),
      },
      {
        h: 'Finalités',
        body: 'Traiter et livrer vos commandes, vous contacter pour les confirmer, gérer votre compte, vous envoyer la newsletter si vous l’avez demandée, et répondre à vos messages. Nous ne vendons jamais vos données.',
      },
      {
        h: 'Stockage local et cookies',
        body: 'Votre panier, vos favoris et votre choix de cookies sont enregistrés dans le stockage local de votre navigateur. Aucun cookie publicitaire n’est utilisé. La mesure d’audience n’est activée qu’avec votre accord, que vous pouvez modifier à tout moment via « Gérer les cookies » en bas de page.',
      },
      {
        h: 'Durée de conservation',
        body: 'Données de commande : 5 ans (obligations comptables). Compte : jusqu’à sa suppression. Newsletter : jusqu’à désinscription. Messages : 12 mois.',
      },
      {
        h: 'Vos droits',
        body: 'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité, conformément à la loi gabonaise n° 001/2011 relative à la protection des données personnelles et au RGPD pour les résidents européens. Écrivez à contact@maniocgabon.ga ; nous répondons sous 30 jours.',
      },
    ],
  },
  cgu: {
    title: 'Conditions générales d’utilisation et de vente',
    intro: 'Ces conditions encadrent l’utilisation du site et les commandes passées auprès de Manioc Gabon.',
    sections: [
      { h: 'Objet', body: 'Le site permet de découvrir et de commander des produits à base de manioc, livrés au Gabon.' },
      {
        h: 'Commandes',
        body: 'Toute commande est confirmée par téléphone avant préparation. Nous pouvons refuser une commande en cas d’indisponibilité ou d’informations de livraison incomplètes.',
      },
      {
        h: 'Prix et paiement',
        body: 'Les prix sont indiqués en francs CFA (FCFA), toutes taxes comprises. Paiement par Mobile Money, virement bancaire ou en espèces à la livraison.',
      },
      {
        h: 'Livraison',
        body: 'Libreville et environs : 24 à 48 h. Autres villes : 2 à 4 jours. Frais de 2 000 FCFA, offerts dès 10 000 FCFA d’achat.',
      },
      {
        h: 'Produits frais',
        body: 'Nos produits sont des denrées périssables. En cas de produit abîmé à la réception, signalez-le sous 24 h avec une photo : nous le remplaçons ou le remboursons.',
      },
      {
        h: 'Compte utilisateur',
        body: 'Vous êtes responsable de la confidentialité de vos identifiants. Tout usage frauduleux du site peut entraîner la suppression du compte.',
      },
      { h: 'Droit applicable', body: 'Ces conditions sont régies par le droit gabonais. Tout litige relève des tribunaux de Libreville.' },
    ],
  },
  mentions: {
    title: 'Mentions légales',
    intro: 'Informations sur l’éditeur et l’hébergeur du site.',
    sections: [
      {
        h: 'Éditeur',
        body: 'Manioc Gabon, Montagne Sainte, Libreville, Gabon. Téléphone : +241 01 23 45 67. E-mail : contact@maniocgabon.ga.',
      },
      { h: 'Hébergement', body: 'Site statique hébergé par un prestataire cloud. Données de compte hébergées par Supabase Inc.' },
      {
        h: 'Propriété intellectuelle',
        body: 'Textes, illustrations, logo et mascotte « Mani » sont la propriété de Manioc Gabon. Toute reproduction sans autorisation est interdite.',
      },
    ],
  },
}

export function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = docs[kind]
  return (
    <main className="bg-paper px-6 py-20 sm:py-28">
      <article className="mx-auto max-w-[720px]">
        <p className="eyebrow">Mis à jour le {UPDATED}</p>
        <h1 className="mt-2 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900">
          {doc.title}
        </h1>
        <p className="mt-5 text-[1.1875rem] leading-relaxed text-ink-500">{doc.intro}</p>
        <div className="mt-12 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink-900">{s.h}</h2>
              <div className="mt-3 text-[1.0625rem] leading-relaxed text-ink-700">{s.body}</div>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
