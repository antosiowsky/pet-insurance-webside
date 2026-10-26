import Link from 'next/link';
import { Suspense } from 'react';
import { Faq } from '@/components/Faq';
import { PhoneIcon } from '@/components/icons';
import { Comparison } from '@/components/offers/Comparison';
import { CommissionNote, OfferCard } from '@/components/offers/OfferCard';
import { PageHeader } from '@/components/PageHeader';
import { btn, Notice } from '@/components/ui';
import { phoneHref, site } from '@/config/site';
import { offersFor } from '@/data/offers';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Porównywarka ubezpieczeń dla psa i kota 2026',
  description:
    'Porównaj ubezpieczenia i pakiety weterynaryjne dla psa i kota: filtry po wieku, budżecie, OC i profilaktyce. Ceny orientacyjne i link do kalkulatora ubezpieczyciela.',
  path: '/porownywarka',
});

const faq = [
  {
    q: 'Skąd pochodzą ceny w porównywarce?',
    a: 'To orientacyjne ceny „od” dla podstawowych wariantów, aktualizowane ręcznie. Dokładna składka zależy od wieku, rasy i wybranego zakresu – policzysz ją w kalkulatorze ubezpieczyciela.',
  },
  {
    q: 'Dlaczego przycisk „Oblicz składkę” prowadzi na stronę ubezpieczyciela?',
    a: 'Zakup odbywa się bezpośrednio u ubezpieczyciela lub jego partnera sprzedażowego. Link zawiera mój identyfikator agentki, dzięki czemu mogę Ci pomóc przy polisie i szkodzie. Cena się nie zmienia.',
  },
  {
    q: 'Czym różni się ubezpieczenie od pakietu weterynaryjnego?',
    a: 'Ubezpieczenie zwraca koszty nieprzewidzianego leczenia (choroby, wypadki), a pakiet to abonament na profilaktykę w sieci placówek partnerskich. Można je łączyć.',
  },
];

function StaticList() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {offersFor().map((o) => (
        <OfferCard key={o.slug} offer={o} placement="porownywarka-karta" />
      ))}
    </div>
  );
}

export default function ComparisonPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Porównywarka', path: '/porownywarka' }]}
        title="Porównywarka ubezpieczeń dla psa i kota 2026"
        lead="Zestawienie ubezpieczeń i pakietów weterynaryjnych od moich partnerów. Zawęź wyniki filtrami, porównaj zakres w tabeli i policz składkę u ubezpieczyciela."
      >
        <div className="mt-6 max-w-3xl">
          <Notice>
            Aktualizacja danych: {new Date(site.dataUpdatedAt.value).toLocaleDateString('pl-PL')}. Parametry pochodzą z materiałów ubezpieczycieli i OWU –
            przed zakupem zawsze sprawdź dokumenty produktu.
          </Notice>
        </div>
      </PageHeader>
      <section className="container-page py-10 lg:py-14">
        <Suspense fallback={<StaticList />}>
          <Comparison />
        </Suspense>
        <CommissionNote className="mt-8" />
      </section>
      <section className="container-page pb-16">
        <div className="flex flex-col gap-6 rounded-xl2 bg-ink-900 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Nie wiesz, co wybrać?</h2>
            <p className="mt-2 text-ink-200">Zadzwoń lub zostaw numer – w kilka minut dobierzemy wariant do Twojego pupila.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={phoneHref} data-placement="porownywarka-baner" className={btn.light}>
              <PhoneIcon className="h-5 w-5" /> {site.contact.phone.value}
            </a>
            <Link href="/kontakt" className={btn.primary}>
              Zamów rozmowę
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <Faq items={faq} title="Pytania o porównywarkę" />
        </div>
      </section>
    </>
  );
}
