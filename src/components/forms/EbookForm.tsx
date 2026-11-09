'use client';

import Link from 'next/link';
import { site } from '@/config/site';
import { CheckIcon } from '../icons';
import { Turnstile } from './Turnstile';
import { useFormSubmit } from './useFormSubmit';

export function EbookForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { state, submit } = useFormSubmit('/api/ebook', 'lead_ebook');
  const dark = variant === 'dark';
  const muted = dark ? 'text-ink-200' : 'text-ink-600';

  if (state.status === 'ok') {
    return (
      <div className="mt-7 space-y-3 rounded-card bg-success-50 p-4 font-medium text-success-600" aria-live="polite">
        <p className="flex items-start gap-3">
          <CheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
          {state.message ?? 'Gotowe! Sprawdź skrzynkę i potwierdź zapis – e-book przyjdzie w kolejnej wiadomości.'}
        </p>
        {site.ebook.pdfReady.value && (
          <p className="pl-8 text-sm font-normal">
            Możesz też{' '}
            <a href={site.ebook.pdfPath.value} className="font-semibold underline underline-offset-2" download>
              pobrać PDF od razu
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      className="mt-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (e.currentTarget.reportValidity()) void submit(e.currentTarget);
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`ebook-email-${variant}`}>
          Adres e-mail
        </label>
        <input
          id={`ebook-email-${variant}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Twój adres e-mail"
          className={`h-12 flex-1 rounded-btn px-4 text-ink-900 placeholder:text-ink-500 focus:ring-4 focus:outline-none ${dark ? 'border-0 bg-white focus:ring-brand-300/50' : 'border border-ink-100 bg-cream focus:ring-ink-100'}`}
        />
        <button type="submit" disabled={state.status === 'sending'} className="h-12 rounded-btn bg-brand-600 px-6 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">
          {state.status === 'sending' ? 'Wysyłam…' : 'Wyślij mi e-book'}
        </button>
      </div>
      <label className="hidden" aria-hidden>
        Firma
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label className={`mt-4 flex items-start gap-3 text-sm ${muted}`}>
        <input type="checkbox" name="consent" value="tak" required className="mt-0.5 h-4 w-4 accent-brand-600" />
        <span>
          Chcę otrzymać e-book na podany adres e-mail. Zgodę mogę wycofać, kontaktując się z agentką.{' '}
          <Link href="/polityka-prywatnosci" className={`underline underline-offset-2 ${dark ? 'hover:text-white' : 'font-semibold text-brand-700'}`}>
            Polityka prywatności
          </Link>
        </span>
      </label>
      <Turnstile />
      {state.status === 'error' && (
        <p className="mt-3 rounded-btn bg-error-50 p-3 text-sm text-error-600" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}
