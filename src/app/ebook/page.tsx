import { EbookForm } from '@/components/forms/EbookForm';
import { CheckItem } from '@/components/ui';
import { EbookCover } from '@/components/sections/EbookCta';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: `Darmowy e-book: ${site.ebook.title.value}`,
  description: 'Pobierz bezpłatny poradnik z checklistą OWU: karencje, wyłączenia, sumy ubezpieczenia i koszty pierwszego roku z psem lub kotem.',
  path: '/ebook',
});

export default function EbookPage() {
  return (
    <section className="bg-ink-900">
      <div className="container-page py-10 lg:py-16">
        <div className="[&_a]:text-ink-200 [&_nav]:text-ink-200 [&_span]:text-ink-200">
          <Breadcrumbs items={[{ name: 'E-book', path: '/ebook' }]} />
        </div>
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-honey-400 uppercase">Darmowy poradnik PDF</p>
            <h1 className="mt-2 text-4xl leading-tight font-bold text-white md:text-5xl">{site.ebook.title.value}</h1>
            <p className="mt-5 text-lg text-ink-200">
              Krótki, konkretny poradnik, który pomoże Ci przeczytać warunki polisy ze zrozumieniem i nie przepłacić. Napisany przez agentkę, która na
              co dzień porównuje oferty.
            </p>
            <ul className="mt-6 space-y-3 text-[17px] [&_li]:text-white">
              <CheckItem>Checklista OWU – 12 pytań, które warto zadać przed zakupem</CheckItem>
              <CheckItem>Karencje, wyłączenia i limity – gdzie najczęściej kryją się niespodzianki</CheckItem>
              <CheckItem>Jak dobrać sumę ubezpieczenia do wieku i rasy pupila</CheckItem>
              <CheckItem>Koszty pierwszego roku ze szczeniakiem lub kociakiem</CheckItem>
            </ul>
            <EbookForm variant="dark" />
            <p className="mt-4 text-sm text-ink-200">Po zapisie dostaniesz e-mail z prośbą o potwierdzenie adresu. E-book przyjdzie zaraz potem.</p>
          </div>
          <EbookCover className="mx-auto scale-110" />
        </div>
      </div>
    </section>
  );
}
