import Link from 'next/link';
import type { ReactNode } from 'react';
import { availabilityLabel, formatPLN, priceFrom, type Availability, type Offer } from '@/data/offers';
import { CheckIcon, ExternalIcon } from '../icons';

function Avail({ v }: { v: Availability }) {
  if (v === 'brak') return <span className="text-ink-500">—</span>;
  if (v === 'opcja') return <span className="rounded-full bg-honey-100 px-2 py-0.5 text-xs font-semibold text-honey-700">opcja</span>;
  return (
    <span className="inline-flex items-center gap-1 font-medium text-success-600">
      <CheckIcon className="h-4 w-4" /> {availabilityLabel[v]}
    </span>
  );
}

const rows: { label: string; render: (o: Offer) => ReactNode }[] = [
  { label: 'Typ', render: (o) => (o.type === 'pakiet' ? 'Pakiet weterynaryjny' : 'Ubezpieczenie') },
  { label: 'Dla kogo', render: (o) => o.species.map((s) => (s === 'pies' ? 'pies' : 'kot')).join(', ') },
  { label: 'Cena od*', render: (o) => (priceFrom(o) ? <strong className="text-ink-900 tabular-nums">{priceFrom(o)} zł/mies.</strong> : '—') },
  { label: 'Maks. suma leczenia', render: (o) => (o.maxTreatmentSum ? formatPLN(o.maxTreatmentSum) : 'wg wariantu') },
  { label: 'Zwrot kosztów', render: (o) => o.reimbursement },
  { label: 'Karencja – choroby', render: (o) => o.waitingIllness },
  { label: 'Karencja – wypadki', render: (o) => o.waitingAccident },
  { label: 'OC właściciela', render: (o) => <Avail v={o.liability} /> },
  { label: 'Profilaktyka', render: (o) => <Avail v={o.prevention} /> },
  { label: 'Ochrona prawna', render: (o) => <Avail v={o.legal} /> },
  { label: 'Assistance', render: (o) => <Avail v={o.assistance} /> },
  { label: 'Dowolna lecznica', render: (o) => (o.anyVet ? <Avail v="w-cenie" /> : 'sieć partnerska') },
  { label: 'Wiek przy zakupie', render: (o) => `od ${o.minAge}${o.maxEntryAgeYears ? `, do ${o.maxEntryAgeYears} lat` : ''}` },
];

export function ComparisonTable({ offers, placement }: { offers: Offer[]; placement: string }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-ink-50">
            <th scope="col" className="sticky left-0 z-10 w-48 bg-ink-50 p-4 font-heading text-ink-900">
              Parametr
            </th>
            {offers.map((o) => (
              <th key={o.slug} scope="col" className="p-4 align-top">
                <span className="block text-xs font-semibold text-ink-500">{o.shortName}</span>
                <span className="font-heading text-base font-bold text-ink-900">{o.productName}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} className={i % 2 ? 'bg-cream' : 'bg-white'}>
              <th scope="row" className={`sticky left-0 z-10 p-4 font-medium text-ink-800 ${i % 2 ? 'bg-cream' : 'bg-white'}`}>
                {r.label}
              </th>
              {offers.map((o) => (
                <td key={o.slug} className="p-4 align-top text-ink-600">
                  {r.render(o)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="sticky left-0 bg-white p-4" />
            {offers.map((o) => (
              <td key={o.slug} className="p-4 align-top">
                <a
                  href={o.redirectPath}
                  data-placement={placement}
                  rel="sponsored nofollow noopener"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-btn bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
                >
                  Oblicz składkę <ExternalIcon className="h-4 w-4" />
                </a>
                <Link href={`/oferty/${o.slug}`} className="mt-2 block font-semibold text-ink-800 underline underline-offset-4">
                  Analiza
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
