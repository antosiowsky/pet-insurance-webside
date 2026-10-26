import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { offers } from '@/data/offers';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = site.dataUpdatedAt.value;
  const pages: [string, number][] = [
    ['/', 1],
    ['/porownywarka', 0.9],
    ['/ubezpieczenie-psa', 0.9],
    ['/ubezpieczenie-kota', 0.9],
    ['/blog', 0.7],
    ['/ebook', 0.6],
    ['/o-mnie', 0.6],
    ['/kontakt', 0.6],
    ['/informacja-o-agencie', 0.3],
    ['/polityka-prywatnosci', 0.2],
    ['/cookies', 0.2],
    ['/regulamin', 0.2],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: updated, priority })),
    ...offers.map((o) => ({ url: absoluteUrl(`/oferty/${o.slug}`), lastModified: updated, priority: 0.8 })),
    ...getAllPosts().map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.updated ?? p.date, priority: 0.7 })),
  ];
}
