import { site } from '@/config/site';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${absoluteUrl(`/blog/${p.slug}`)}</link><guid>${absoluteUrl(`/blog/${p.slug}`)}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)} – poradniki</title><link>${site.url}</link><description>Poradniki o ubezpieczeniu psa i kota</description><language>pl</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
