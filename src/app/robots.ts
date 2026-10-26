import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/wycena/', '/api/', '/placeholdery'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
