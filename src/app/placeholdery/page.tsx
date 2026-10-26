import { PageHeader } from '@/components/PageHeader';
import { placeholderChecklist } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Dane do uzupełnienia', description: 'Robocza lista danych do potwierdzenia.', path: '/placeholdery', noindex: true });

export default function PlaceholdersPage() {
  const items = placeholderChecklist();
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Dane do uzupełnienia', path: '/placeholdery' }]}
        title="Dane do uzupełnienia przed startem"
        lead="Robocza lista z pliku src/config/site.ts. Strona nie jest indeksowana i nie ma jej w menu ani w sitemapie."
      />
      <section className="container-page py-12">
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-ink-50">
              <tr>
                <th className="p-3">Klucz</th>
                <th className="p-3">Obecna wartość</th>
                <th className="p-3">Do potwierdzenia</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={i.key} className={idx % 2 ? 'bg-cream' : ''}>
                  <td className="p-3 font-mono text-xs text-ink-800">{i.key}</td>
                  <td className="p-3">{typeof i.value === 'string' ? i.value : JSON.stringify(i.value)}</td>
                  <td className="p-3 text-ink-500">{i.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
