import type { ReactNode } from 'react';
import { Breadcrumbs } from './seo/Breadcrumbs';

export function PageHeader({
  title,
  lead,
  crumbs,
  eyebrow,
  children,
}: {
  title: string;
  lead?: ReactNode;
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-sand/60">
      <div className="container-page py-10 lg:py-14">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className={`${eyebrow ? 'mt-2' : 'mt-6'} max-w-4xl text-4xl leading-tight font-bold md:text-5xl`}>{title}</h1>
        {lead && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
