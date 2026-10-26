import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from './JsonLd';

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: 'Strona główna', path: '/' }, ...items];
  return (
    <>
      <nav aria-label="Ścieżka" className="text-sm text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((i, idx) => (
            <li key={i.path} className="flex items-center gap-1.5">
              {idx > 0 && <span aria-hidden>/</span>}
              {idx === all.length - 1 ? (
                <span aria-current="page" className="text-ink-800">
                  {i.name}
                </span>
              ) : (
                <Link href={i.path} className="hover:text-brand-600">
                  {i.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
