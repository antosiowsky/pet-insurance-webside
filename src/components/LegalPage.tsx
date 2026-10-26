import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { PageHeader } from './PageHeader';
import { Notice } from './ui';

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHeader crumbs={[{ name: title, path }]} title={title} lead={`Obowiązuje od: ${updated}`} />
      <section className="container-page max-w-4xl py-12">
        {site.legalReviewed.placeholder && (
          <div className="mb-8">
            <Notice tone="warning">Wersja robocza dokumentu – treść wymaga uzupełnienia danych i weryfikacji prawnej przed publikacją.</Notice>
          </div>
        )}
        <div className="prose-article prose prose-lg max-w-none prose-headings:font-bold">{children}</div>
      </section>
    </>
  );
}
