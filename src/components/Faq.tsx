import { faqSchema } from '@/lib/seo';
import { ChevronDownIcon } from './icons';
import { JsonLd } from './seo/JsonLd';

export type FaqItem = { q: string; a: string };

export function Faq({ items, title = 'Najczęstsze pytania', withSchema = true }: { items: FaqItem[]; title?: string; withSchema?: boolean }) {
  return (
    <div>
      <h2 className="text-center text-3xl font-bold">{title}</h2>
      <div className="mt-8 divide-y divide-line rounded-card border border-line bg-white">
        {items.map((i, idx) => (
          <details key={i.q} className="group p-5" open={idx === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
              {i.q}
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-ink-500 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-ink-600">{i.a}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqSchema(items)} />}
    </div>
  );
}
