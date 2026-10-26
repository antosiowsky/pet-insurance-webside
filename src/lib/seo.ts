import type { Metadata } from 'next';
import { site } from '@/config/site';

export const absoluteUrl = (path = '/') => `${site.url}${path === '/' ? '' : path}`;

export function pageMetadata({
  title,
  description,
  path,
  image = '/images/og.png',
  type = 'website',
  noindex,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: noindex || !site.allowIndexing ? { index: false, follow: !noindex } : undefined,
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export const agencySchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  '@id': `${site.url}/#agency`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl('/images/logo.png'),
  image: absoluteUrl('/images/og.png'),
  telephone: site.contact.phone.value,
  email: site.contact.email.value,
  areaServed: 'PL',
  priceRange: 'bez dodatkowych opłat',
  founder: { '@id': `${site.url}/#agent` },
  ...(site.trust.googleRating.value && site.trust.googleReviewsCount.value
    ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: site.trust.googleRating.value, reviewCount: site.trust.googleReviewsCount.value } }
    : {}),
});

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#agent`,
  name: site.agent.name.value,
  jobTitle: 'Agentka ubezpieczeniowa',
  url: absoluteUrl('/o-mnie'),
  worksFor: { '@id': `${site.url}/#agency` },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: 'pl-PL',
  publisher: { '@id': `${site.url}/#agency` },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((i, idx) => ({ '@type': 'ListItem', position: idx + 1, name: i.name, item: absoluteUrl(i.path) })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
});
