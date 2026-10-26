import Link from 'next/link';
import type { ReactNode } from 'react';
import { getOffer, priceFrom } from '@/data/offers';
import { ExternalIcon, InfoIcon } from '../icons';
import { btn } from '../ui';

function Tldr({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-card bg-ink-50 p-5 text-ink-800">
      <p className="font-heading font-bold text-ink-900">W skrócie</p>
      <div className="mt-2 space-y-2 leading-relaxed [&_li]:ml-5 [&_li]:list-disc">{children}</div>
    </div>
  );
}

function Tip({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 rounded-r-card border-l-4 border-brand-600 bg-white p-5 leading-relaxed text-ink-800 shadow-card">{children}</div>;
}

function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-card bg-warning-50 p-5 leading-relaxed text-warning-800">
      <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-warning-700" />
      <div>{children}</div>
    </div>
  );
}

function OfferInline({ slug }: { slug: string }) {
  const o = getOffer(slug);
  if (!o) return null;
  const price = priceFrom(o);
  return (
    <div className="not-prose my-8 flex flex-col gap-4 rounded-card border-2 border-brand-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-ink-500">Oferta wspomniana w tekście</p>
        <p className="font-heading text-lg font-bold text-ink-900">{o.productName}</p>
        <p className="text-sm text-ink-600">
          {o.highlights[0]}
          {price ? ` · od ${price} zł/mies. (orientacyjnie)` : ''}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
        <a href={o.redirectPath} data-placement="blog-wstawka" rel="sponsored nofollow noopener" target="_blank" className={`${btn.primary} py-2.5 text-sm`}>
          Oblicz składkę <ExternalIcon className="h-4 w-4" />
        </a>
        <Link href={`/oferty/${o.slug}`} className="text-sm font-semibold text-ink-800 underline underline-offset-4">
          Analiza oferty
        </Link>
      </div>
    </div>
  );
}

function CompareCta() {
  return (
    <div className="not-prose my-8 rounded-card bg-ink-900 p-6 text-white">
      <p className="font-heading text-xl font-bold">Porównaj oferty dla swojego pupila</p>
      <p className="mt-1 text-ink-200">Filtruj po gatunku, wieku, budżecie i zakresie – i policz składkę u ubezpieczyciela.</p>
      <Link href="/porownywarka" className={`${btn.primary} mt-4`}>
        Przejdź do porównywarki
      </Link>
    </div>
  );
}

export const mdxComponents = { Tldr, Tip, Warning, OfferInline, CompareCta };
