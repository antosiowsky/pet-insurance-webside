import Link from 'next/link';
import { PawIcon } from '@/components/icons';
import { btn } from '@/components/ui';

export const metadata = { title: 'Nie znaleziono strony', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <PawIcon className="h-16 w-16 text-brand-600" />
      <p className="mt-6 font-heading text-6xl font-extrabold text-ink-900">404</p>
      <h1 className="mt-4 text-3xl font-bold">Tej strony tu nie ma</h1>
      <p className="mt-3 max-w-md text-lg">Może pupil schował ją pod kanapą? Wróć na stronę główną albo przejdź do porównywarki.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={btn.secondary}>
          Strona główna
        </Link>
        <Link href="/porownywarka" className={btn.primary}>
          Porównaj oferty
        </Link>
      </div>
    </section>
  );
}
