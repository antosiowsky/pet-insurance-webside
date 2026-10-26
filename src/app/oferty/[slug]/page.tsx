import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalIcon, PhoneIcon } from '@/components/icons';
import { CommissionNote } from '@/components/offers/OfferCard';
import { PageHeader } from '@/components/PageHeader';
import { ContactSection } from '@/components/sections/ContactSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge, btn, CheckItem, Notice } from '@/components/ui';
import { phoneHref, site } from '@/config/site';
import { availabilityLabel, formatPLN, getOffer, offers, priceFrom, typeLabel } from '@/data/offers';
import { absoluteUrl, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return offers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const o = getOffer((await params).slug);
  if (!o) return {};
  const species = o.species.map((s) => (s === 'pies' ? 'psa' : 'kota')).join(' i ');
  return pageMetadata({
    title: `${o.productName} – opinia, zakres i cena dla ${species}`,
    description: `${o.productName}: ${o.summary.slice(0, 120)} Sprawdź warianty, karencję i na co uważać.`,
    path: `/oferty/${o.slug}`,
  });
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const o = getOffer((await params).slug);
  if (!o) notFound();
  const price = priceFrom(o);
  const facts: [string, string][] = [
    ['Ubezpieczyciel / dostawca', o.insurer],
    ...(o.distributor ? ([['Kanał sprzedaży', o.distributor]] as [string, string][]) : []),
    ['Rodzaj', typeLabel[o.type]],
    ['Dla kogo', o.species.map((s) => (s === 'pies' ? 'pies' : 'kot')).join(', ')],
    ['Wiek przy zakupie', `od ${o.minAge}${o.maxEntryAgeYears ? ` do ${o.maxEntryAgeYears} lat` : ''}`],
    ['Maks. suma leczenia', o.maxTreatmentSum ? formatPLN(o.maxTreatmentSum) : 'wg wariantu'],
    ['Zwrot kosztów', o.reimbursement],
    ['Karencja – choroby', o.waitingIllness],
    ['Karencja – wypadki', o.waitingAccident],
    ['OC właściciela', `${availabilityLabel[o.liability]}${o.liabilityNote ? ` – ${o.liabilityNote}` : ''}`],
    ['Profilaktyka', availabilityLabel[o.prevention]],
    ['Ochrona prawna / assistance', `${availabilityLabel[o.legal]} / ${availabilityLabel[o.assistance]}`],
    ['Wybór lecznicy', o.anyVet ? 'dowolna lecznica' : 'placówki partnerskie'],
    ['Wymagania', o.chipRequired],
    ['Rasy', o.breeds],
    ['Dokumenty', o.owu],
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: 'Porównywarka', path: '/porownywarka' },
          { name: o.productName, path: `/oferty/${o.slug}` },
        ]}
        eyebrow={`Analiza oferty · ${o.shortName}`}
        title={`${o.productName} – zakres, warianty i na co uważać`}
        lead={o.summary}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href={o.redirectPath} data-placement="oferta-naglowek" rel="sponsored nofollow noopener" target="_blank" className={btn.primary}>
            Oblicz składkę <ExternalIcon className="h-4 w-4" />
          </a>
          {price && (
            <p className="text-ink-600">
              orientacyjnie od <strong className="font-heading text-2xl text-ink-900">{price} zł</strong> / mies.*
            </p>
          )}
        </div>
      </PageHeader>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold md:text-3xl">Najważniejsze parametry</h2>
            <dl className="mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr]">
                  <dt className="font-medium text-ink-800">{k}</dt>
                  <dd className="text-ink-600">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="text-2xl font-bold md:text-3xl">Warianty</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {o.variants.map((v) => (
                <div key={v.name} className="rounded-card border border-line bg-white p-5">
                  <p className="font-heading text-lg font-bold text-ink-900">{v.name}</p>
                  {v.treatmentSum && <p className="mt-1 font-semibold text-brand-700">leczenie do {formatPLN(v.treatmentSum)}</p>}
                  <p className="mt-1 text-ink-600">{v.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Mocne strony</h2>
              <ul className="mt-4 space-y-3">
                {o.highlights.map((h) => (
                  <CheckItem key={h}>{h}</CheckItem>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Na co uważać</h2>
              <ul className="mt-4 space-y-3">
                {o.watchOuts.map((w) => (
                  <CheckItem key={w} tone="warn">
                    {w}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold md:text-3xl">Dla kogo ta oferta?</h2>
            <p className="mt-4 text-lg leading-relaxed">{o.forWhom}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold md:text-3xl">{o.type === 'pakiet' ? 'Jak korzystać z pakietu' : 'Jak wygląda zwrot kosztów'}</h2>
            <ol className="mt-6 space-y-4">
              {o.claimSteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 font-heading font-bold text-white">{i + 1}</span>
                  <p className="pt-1.5 text-lg">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          <Notice tone="warning">
            Opis ma charakter informacyjny i jest skrótem warunków. Wiążące są OWU i dokument IPID ubezpieczyciela ({o.owu}). Przed zakupem sprawdź
            wyłączenia odpowiedzialności, limity i karencje.
          </Notice>
          <CommissionNote />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border-2 border-brand-100 bg-white p-6 shadow-card">
            <Badge tone="brand">{o.shortName}</Badge>
            <p className="mt-3 font-heading text-xl font-bold text-ink-900">{o.productName}</p>
            {price && (
              <p className="mt-2 text-ink-500">
                od <span className="font-heading text-3xl font-bold text-ink-900">{price} zł</span> / mies.*
              </p>
            )}
            <a href={o.redirectPath} data-placement="oferta-boks" rel="sponsored nofollow noopener" target="_blank" className={`${btn.primary} mt-5 w-full`}>
              Oblicz składkę <ExternalIcon className="h-4 w-4" />
            </a>
            <a href={phoneHref} data-placement="oferta-boks" className={`${btn.secondary} mt-3 w-full`}>
              <PhoneIcon className="h-4 w-4" /> Zapytaj agentkę
            </a>
            <Link href="/porownywarka" className="mt-4 block text-center text-sm font-semibold text-ink-800 underline underline-offset-4">
              ← Wróć do porównywarki
            </Link>
          </div>
        </aside>
      </div>
      <ContactSection />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${o.productName} – analiza oferty`,
          url: absoluteUrl(`/oferty/${o.slug}`),
          dateModified: site.dataUpdatedAt.value,
          about: {
            '@type': 'Service',
            serviceType: 'Ubezpieczenie zwierząt',
            name: o.productName,
            provider: { '@type': 'Organization', name: o.insurer.startsWith('do ') ? o.distributor : o.insurer },
          },
          author: { '@id': `${site.url}/#agent` },
        }}
      />
    </>
  );
}
