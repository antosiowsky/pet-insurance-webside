import Image from 'next/image';
import Link from 'next/link';
import { PostCard } from '@/components/blog/PostCard';
import { Faq } from '@/components/Faq';
import { ArrowRightIcon, CheckIcon, ShieldIcon } from '@/components/icons';
import { CommissionNote, OfferCard } from '@/components/offers/OfferCard';
import { AgentSection } from '@/components/sections/AgentSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { CostAndReasons } from '@/components/sections/CostAndReasons';
import { EbookCta } from '@/components/sections/EbookCta';
import { Reviews } from '@/components/sections/Reviews';
import { btn, SectionHeading } from '@/components/ui';
import { site } from '@/config/site';
import { homeFaq } from '@/data/content';
import { getOffer, offers } from '@/data/offers';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ubezpieczenie psa i kota – porównanie ofert 2026 | Anita Grzenia',
  description:
    'Porównaj ubezpieczenia dla psa i kota: PZU, Generali, Bezpieczny.pl, PetHelp i Barkibu. Zakres, ceny orientacyjne, karencje i pomoc agentki przy wyborze i szkodzie.',
  path: '/',
});

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const featuredDog = getOffer('bezpieczny-pl-pies');
  const featuredCat = getOffer('pzu-dla-psa-i-kota');

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-sand lg:block" aria-hidden />
        <div className="container-page relative grid items-center gap-10 pt-10 pb-14 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-20">
          <div>
            <h1 className="text-4xl leading-[1.1] font-bold md:text-5xl lg:text-[3.4rem]">
              Ubezpieczenie psa i&nbsp;kota – <span className="text-brand-600">porównaj oferty</span> i&nbsp;wybierz spokojnie
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              Zestawiam polisy PZU, Generali, Bezpieczny.pl, Barkibu i&nbsp;pakiety PetHelp w&nbsp;jednym miejscu. Sprawdzisz zakres, ceny
              orientacyjne i&nbsp;policzysz składkę u&nbsp;ubezpieczyciela – a&nbsp;jeśli masz pytania, po prostu zadzwoń.
            </p>
            <div className="mt-7 rounded-card border border-line bg-white p-4 shadow-card sm:p-5">
              <p className="text-sm font-semibold text-ink-900">Kogo chcesz ubezpieczyć?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Link href="/porownywarka?gatunek=pies" className={btn.primary}>
                  Porównaj oferty dla psa <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link href="/porownywarka?gatunek=kot" className={btn.secondary}>
                  Porównaj oferty dla kota <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
              <p className="mt-3 text-sm text-ink-500">
                Albo zobacz{' '}
                <Link href="/porownywarka" className="font-semibold text-ink-800 underline underline-offset-2 hover:text-brand-700">
                  wszystkie oferty naraz
                </Link>
                .
              </p>
            </div>
            <ul className="mt-6 grid gap-3 text-[15px] text-ink-800 sm:grid-cols-3">
              {['Bez dodatkowych opłat', 'Zakup online w kilka minut', 'Pomoc przy szkodzie'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 shrink-0 text-success-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <Image
              src="/images/hero-pies-i-kot.webp"
              alt="Pies i kot odpoczywają razem na trawie"
              width={1200}
              height={1000}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-lift lg:aspect-[5/5.2]"
            />
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-card bg-white p-4 shadow-lift sm:left-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success-50 text-success-600">
                <ShieldIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-lg font-bold text-ink-900">do 80% zwrotu</p>
                <p className="text-sm text-ink-500">kosztów leczenia u weterynarza*</p>
              </div>
            </div>
            <div className="absolute -top-4 right-4 hidden items-center gap-3 rounded-card bg-white p-3 pr-5 shadow-lift sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 font-heading font-bold text-white">AG</span>
              <div className="leading-tight">
                <p className="font-semibold text-ink-900">{site.agent.name.value}</p>
                <p className="text-sm text-ink-500">Twoja agentka ubezpieczeniowa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">Porównuję oferty partnerów</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3 font-heading text-xl font-bold text-ink-500">
              {offers.map((o) => (
                <span key={o.slug}>{o.shortName}</span>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-10">
            <div>
              <dt className="text-sm text-ink-500">Partnerzy</dt>
              <dd className="font-heading text-2xl font-bold text-ink-900">{offers.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-500">Doświadczenie</dt>
              <dd className="font-heading text-2xl font-bold text-ink-900">{site.agent.yearsOfExperience.value} lat</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-500">Opłaty dla Ciebie</dt>
              <dd className="font-heading text-2xl font-bold text-ink-900">0 zł</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-500">{site.trust.googleRating.value ? 'Opinie Google' : 'Rejestr KNF'}</dt>
              <dd className="font-heading text-2xl font-bold text-ink-900">
                {site.trust.googleRating.value ? (
                  <>
                    {site.trust.googleRating.value.toLocaleString('pl-PL')} <span className="text-honey-400">★</span>
                  </>
                ) : (
                  <CheckIcon className="h-7 w-7 text-success-600" />
                )}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="porownanie" className="container-page py-16 lg:py-24">
        <SectionHeading
          eyebrow="Porównywarka"
          title="Wybrane oferty dla psa i kota"
          lead="Po jednej propozycji na start – dla psa Bezpieczny.pl, dla kota PZU. Pełną listę i filtry znajdziesz w porównywarce. Ceny są orientacyjne."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {featuredDog && (
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-heading text-xl font-bold text-ink-900">Dla psa</h3>
                <Link href="/porownywarka?gatunek=pies" className="text-sm font-semibold text-brand-700 underline underline-offset-2">
                  Więcej ofert dla psa →
                </Link>
              </div>
              <OfferCard offer={featuredDog} placement="home-karta-pies" />
            </div>
          )}
          {featuredCat && (
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-heading text-xl font-bold text-ink-900">Dla kota</h3>
                <Link href="/porownywarka?gatunek=kot" className="text-sm font-semibold text-brand-700 underline underline-offset-2">
                  Więcej ofert dla kota →
                </Link>
              </div>
              <OfferCard offer={featuredCat} placement="home-karta-kot" />
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 rounded-card bg-ink-50 p-5 md:flex-row md:items-center md:justify-between">
          <CommissionNote className="max-w-3xl text-ink-600" />
          <Link href="/porownywarka" className={`${btn.secondary} shrink-0`}>
            Pełna porównywarka →
          </Link>
        </div>
      </section>

      <CostAndReasons />
      <AgentSection />
      <Reviews />
      <EbookCta />

      <section className="container-page py-16 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Poradniki" title="Wiedza dla opiekunów" />
          <Link href="/blog" className={`${btn.link} hidden sm:inline`}>
            Wszystkie wpisy →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 lg:py-20">
          <Faq items={homeFaq} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
