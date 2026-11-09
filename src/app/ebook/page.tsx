import Link from 'next/link';
import { EbookForm } from '@/components/forms/EbookForm';
import { CheckItem, btn } from '@/components/ui';
import { EbookCover } from '@/components/sections/EbookCta';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: `Darmowy e-book: ${site.ebook.title.value}`,
  description: site.ebook.subtitle.value,
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
            <p className="mt-5 text-lg text-ink-200">{site.ebook.subtitle.value}</p>
            <ul className="mt-6 space-y-3 text-[17px] [&_li]:text-white">
              <CheckItem>Udział własny, limity i suma ubezpieczenia – bez marketingowego żargonu</CheckItem>
              <CheckItem>Karencje, wyłączenia i choroby wcześniejsze</CheckItem>
              <CheckItem>OC właściciela i ścieżka zgłoszenia szkody</CheckItem>
              <CheckItem>Linki do OWU partnerów z porównywarki + checklista 10 pytań</CheckItem>
            </ul>
            <EbookForm variant="dark" />
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.ebook.pdfPath.value} className={`${btn.secondary} border-white/30 bg-white/10 text-white hover:bg-white/20`} download>
                Pobierz PDF od razu
              </a>
              <Link href="/ebook/poradnik" className="inline-flex items-center font-semibold text-honey-400 underline underline-offset-4 hover:text-honey-100">
                Czytaj wersję online →
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-200">Po wysłaniu formularza dostaniesz e-mail z linkiem do PDF (i załącznikiem, jeśli się uda). Możesz też pobrać plik powyżej.</p>
          </div>
          <EbookCover className="mx-auto scale-110" />
        </div>
      </div>
    </section>
  );
}
