import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { CheckIcon, InfoIcon } from './icons';

export const btn = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-btn bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-btn border-2 border-ink-900 px-5 py-2.5 font-semibold text-ink-900 transition hover:bg-ink-900 hover:text-white',
  light:
    'inline-flex items-center justify-center gap-2 rounded-btn bg-white px-6 py-3 font-semibold text-ink-900 transition hover:bg-ink-50',
  link: 'font-semibold text-ink-900 underline decoration-brand-600 decoration-2 underline-offset-4 hover:text-brand-600',
};

const badgeTone = {
  brand: 'bg-brand-50 text-brand-700',
  ink: 'bg-ink-50 text-ink-800',
  honey: 'bg-honey-100 text-honey-700',
  success: 'bg-success-50 text-success-600',
};

export function Badge({ tone = 'ink', children, className = '' }: { tone?: keyof typeof badgeTone; children: ReactNode; className?: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeTone[tone]} ${className}`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, lead, center }: { eyebrow?: string; title: string; lead?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
      {lead && <p className="mt-3 text-lg text-ink-600">{lead}</p>}
    </div>
  );
}

export function CheckItem({ children, tone = 'ok' }: { children: ReactNode; tone?: 'ok' | 'warn' }) {
  return (
    <li className={`flex gap-2 ${tone === 'warn' ? 'text-ink-500' : 'text-ink-800'}`}>
      {tone === 'ok' ? (
        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success-600" />
      ) : (
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-warning-700" />
      )}
      <span>{children}</span>
    </li>
  );
}

export function Notice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warning' }) {
  const cls = tone === 'info' ? 'bg-info-50 text-ink-800' : 'bg-warning-50 text-warning-800';
  return (
    <div className={`flex gap-3 rounded-card p-4 text-sm ${cls}`}>
      <InfoIcon className={`mt-0.5 h-5 w-5 shrink-0 ${tone === 'info' ? 'text-info-600' : 'text-warning-700'}`} />
      <div>{children}</div>
    </div>
  );
}

export function TextLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} className={`${btn.link} ${props.className ?? ''}`} />;
}
