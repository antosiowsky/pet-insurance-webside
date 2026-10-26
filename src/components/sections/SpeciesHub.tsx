import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { PostCard } from '@/components/blog/PostCard';
import { Faq, type FaqItem } from '@/components/Faq';
import { ComparisonTable } from '@/components/offers/ComparisonTable';
import { CommissionNote, OfferCard } from '@/components/offers/OfferCard';
import { PageHeader } from '@/components/PageHeader';
import { ContactSection } from '@/components/sections/ContactSection';
import { EbookCta } from '@/components/sections/EbookCta';
import { btn, CheckItem } from '@/components/ui';
import { offersFor, type Species } from '@/data/offers';
import type { PostMeta } from '@/lib/blog';

export function SpeciesHub({
  species,
  title,
  lead,
  image,
  imageAlt,
  priceFactors,
  covers,
  intro,
  faq,
  posts,
}: {
  species: Species;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  priceFactors: { title: string; text: string }[];
  covers: string[];
  intro: ReactNode;
  faq: FaqItem[];
  posts: PostMeta[];
}) {
  const list = offersFor(species);
  const name = species === 'pies' ? 'psa' : 'kota';
  const path = species === 'pies' ? '/ubezpieczenie-psa' : '/ubezpieczenie-kota';
  return (
    <>
      <PageHeader crumbs={[{ name: `Ubezpieczenie ${name}`, path }]} title={title} lead={lead}>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/porownywarka?gatunek=${species}`} className={btn.primary}>
            Porównaj oferty dla {name}
          </Link>
          <a href="#szybkie-porownanie" className={btn.secondary}>
            Szybkie porównanie
          </a>
        </div>
      </PageHeader>

      <section className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16">
        <div className="prose-article prose prose-lg max-w-none">{intro}</div>
        <Image src={image} alt={imageAlt} width={1200} height={900} className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-lift" />
      </section>

      <section id="szybkie-porownanie" className="container-page pb-14">
        <h2 className="text-3xl font-bold">Szybkie porównanie ubezpieczeń dla {name}</h2>
        <p className="mt-3 max-w-3xl text-lg">Najważniejsze parametry w jednej tabeli. Na telefonie przewiń tabelę w bok.</p>
        <div className="mt-8">
          <ComparisonTable offers={list} placement={`hub-${species}-tabela`} />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 3).map((o) => (
            <OfferCard key={o.slug} offer={o} placement={`hub-${species}-karta`} compact />
          ))}
        </div>
        <CommissionNote className="mt-6" />
      </section>

      <section className="bg-white">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Od czego zależy cena ubezpieczenia {name}?</h2>
            <div className="mt-6 space-y-4">
              {priceFactors.map((f) => (
                <div key={f.title} className="rounded-card border border-line p-5">
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="mt-1.5 text-ink-600">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Co zwykle obejmuje polisa</h2>
            <ul className="mt-6 space-y-3 text-[17px]">
              {covers.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
              <CheckItem tone="warn">Zwykle wyłączone: choroby sprzed zawarcia umowy, zabiegi planowe (np. sterylizacja) bez dodatkowego rozszerzenia.</CheckItem>
            </ul>
            <div className="mt-8 rounded-card bg-sand p-6">
              <p className="font-heading text-lg font-bold text-ink-900">Kto przygotowuje porównanie?</p>
              <p className="mt-2 text-ink-600">
                Zestawienie przygotowuje i aktualizuje licencjonowana agentka ubezpieczeniowa na podstawie OWU i materiałów ubezpieczycieli.{' '}
                <Link href="/o-mnie" className="font-semibold text-brand-700 underline">
                  Poznaj mnie
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="container-page py-16">
          <h2 className="text-3xl font-bold">Poradniki dla opiekunów {species === 'pies' ? 'psów' : 'kotów'}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <Faq items={faq} title={`Ubezpieczenie ${name} – pytania i odpowiedzi`} />
        </div>
      </section>
      <EbookCta />
      <ContactSection />
    </>
  );
}
