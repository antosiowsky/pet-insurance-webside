import { site } from '@/config/site';
import { PawIcon } from '../icons';
import { EbookForm } from '../forms/EbookForm';

export function EbookCover({ className = '' }: { className?: string }) {
  return (
    <div className={`w-56 rotate-[-4deg] rounded-xl bg-cream p-5 shadow-2xl ring-1 ring-white/10 md:w-64 ${className}`}>
      <div className="rounded-lg bg-brand-600 p-4 text-white">
        <p className="text-xs font-semibold tracking-widest text-brand-100 uppercase">Darmowy e-book</p>
        <p className="mt-2 font-heading text-xl leading-tight font-bold">{site.ebook.title.value}</p>
      </div>
      <ul className="mt-4 space-y-2 text-xs text-ink-600">
        <li>✓ Checklista OWU – 12 pytań</li>
        <li>✓ Karencje i wyłączenia</li>
        <li>✓ Koszty pierwszego roku z pupilem</li>
      </ul>
      <p className="mt-4 font-heading text-xs font-bold tracking-[0.18em] text-charcoal">ANITA GRZENIA</p>
    </div>
  );
}

export function EbookCta() {
  return (
    <section id="ebook" className="relative overflow-hidden bg-ink-900">
      <PawIcon className="absolute -top-10 -right-10 h-72 w-72 text-white/5" />
      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[auto_1fr] lg:py-20">
        <EbookCover className="mx-auto" />
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-honey-400 uppercase">E-book za darmo</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Nie wiesz, na co zwrócić uwagę w polisie?</h2>
          <p className="mt-4 text-lg text-ink-200">
            Pobierz poradnik z checklistą OWU. Wyślę go na Twój e-mail razem z krótkim newsletterem o zdrowiu pupila. Bez spamu – wypiszesz się
            jednym kliknięciem.
          </p>
          <EbookForm variant="dark" />
        </div>
      </div>
    </section>
  );
}
