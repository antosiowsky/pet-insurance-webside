import Link from 'next/link';
import { site } from '@/config/site';
import { formatPLN, priceFrom, typeLabel, type Offer } from '@/data/offers';
import { ExternalIcon } from '../icons';
import { Badge, CheckItem, btn } from '../ui';

export function OfferCard({ offer, placement, compact }: { offer: Offer; placement: string; compact?: boolean }) {
  const price = priceFrom(offer);
  const featured = Boolean(offer.badge);
  const discount = site.discounts[offer.slug]?.value;
  return (
    <article
      className={`relative flex flex-col rounded-card bg-white p-6 ${featured ? 'border-2 border-brand-600 shadow-lift' : 'border border-line shadow-card'}`}
    >
      {offer.badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">{offer.badge}</span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink-500">{offer.distributor && offer.insurer.startsWith('do ') ? offer.distributor : offer.shortName}</p>
          <h3 className="text-xl font-bold">{offer.productName}</h3>
        </div>
        {offer.purchase.includes('online') ? <Badge tone="success">Zakup online</Badge> : <Badge tone="honey">Z doradcą</Badge>}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone="ink">{typeLabel[offer.type]}</Badge>
        <Badge tone="ink">{offer.species.map((s) => (s === 'pies' ? 'Pies' : 'Kot')).join(' i ')}</Badge>
      </div>
      <p className="mt-4 text-sm text-ink-500">
        {price ? (
          <>
            od <span className="font-heading text-3xl font-bold text-ink-900 tabular-nums">{price} zł</span> / mies.*
          </>
        ) : (
          <span className="font-semibold text-ink-800">Cena w kalkulatorze</span>
        )}
      </p>
      {!compact && offer.maxTreatmentSum && (
        <p className="mt-1 text-sm text-ink-500">Leczenie do {formatPLN(offer.maxTreatmentSum)}</p>
      )}
      {discount && <p className="mt-2 rounded-btn bg-honey-100 px-3 py-2 text-sm font-semibold text-honey-700">Kod rabatowy: {discount}</p>}
      <ul className="mt-5 space-y-2.5 text-[15px]">
        {offer.highlights.map((h) => (
          <CheckItem key={h}>{h}</CheckItem>
        ))}
        {offer.watchOuts.slice(0, compact ? 1 : 2).map((w) => (
          <CheckItem key={w} tone="warn">
            {w}
          </CheckItem>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <a href={offer.redirectPath} data-placement={placement} rel="sponsored nofollow noopener" target="_blank" className={`${btn.primary} w-full`}>
          Oblicz składkę <ExternalIcon className="h-4 w-4" />
          <span className="sr-only">(otwiera stronę partnera w nowej karcie)</span>
        </a>
        <Link href={`/oferty/${offer.slug}`} className="mt-3 block text-center text-sm font-semibold text-ink-800 underline decoration-ink-200 underline-offset-4 hover:text-brand-600">
          Pełna analiza oferty →
        </Link>
      </div>
    </article>
  );
}

export function CommissionNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-sm text-ink-500 ${className}`}>
      *Ceny i parametry orientacyjne, aktualizacja: {new Date(site.dataUpdatedAt.value).toLocaleDateString('pl-PL')}. Zakres zależy od OWU i wybranego
      wariantu – sprawdź dokumenty przed zakupem. Serwis może otrzymać prowizję od ubezpieczyciela; cena dla Ciebie się nie zmienia. Treść nie
      stanowi oferty w rozumieniu art. 66 KC.
    </p>
  );
}
