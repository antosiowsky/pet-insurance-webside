'use client';

import Link from 'next/link';
import { useState } from 'react';
import { phoneHref, site } from '@/config/site';
import { CheckIcon, InfoIcon } from '../icons';
import { Turnstile } from './Turnstile';
import { useFormSubmit } from './useFormSubmit';

const field = 'mt-1.5 h-12 w-full rounded-btn border border-ink-100 bg-cream px-4 text-ink-900 focus:border-ink-900 focus:ring-4 focus:ring-ink-100 focus:outline-none';
const fieldError = 'mt-1.5 h-12 w-full rounded-btn border-2 border-error-600 bg-error-50 px-4 text-ink-900 focus:outline-none';

export function ContactForm({ title = 'Poproś o kontakt' }: { title?: string }) {
  const { state, submit } = useFormSubmit('/api/contact', 'lead_contact');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  return (
    <form
      noValidate
      className="rounded-xl2 border border-line bg-white p-6 shadow-lift md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const phone = String(new FormData(form).get('phone') ?? '').replace(/\D/g, '');
        if (phone.length < 9) {
          setPhoneError('Podaj 9-cyfrowy numer telefonu.');
          return;
        }
        setPhoneError(null);
        if (!form.reportValidity()) return;
        void submit(form);
      }}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">Oddzwonię, pomogę wybrać wariant i przeprowadzę Cię przez zakup.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink-800">
          Imię
          <input name="name" required autoComplete="given-name" className={field} />
        </label>
        <label className="block text-sm font-medium text-ink-800">
          Telefon
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? 'phone-error' : undefined}
            className={phoneError ? fieldError : field}
          />
          {phoneError && (
            <span id="phone-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-error-600">
              <InfoIcon className="h-4 w-4" />
              {phoneError}
            </span>
          )}
        </label>
        <label className="block text-sm font-medium text-ink-800">
          Pupil
          <select name="species" className={field} defaultValue="pies">
            <option value="pies">Pies</option>
            <option value="kot">Kot</option>
            <option value="pies-i-kot">Pies i kot</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink-800">
          Wiek pupila
          <select name="age" className={field} defaultValue="1-3">
            <option value="0-1">do 1 roku</option>
            <option value="1-3">1–3 lata</option>
            <option value="4-7">4–7 lat</option>
            <option value="8-10">8–10 lat</option>
            <option value="10+">ponad 10 lat</option>
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-ink-800">
        Wiadomość (opcjonalnie)
        <textarea name="message" rows={3} className={`${field} h-auto py-3`} placeholder="Np. rasa, choroby w przeszłości, preferowana godzina kontaktu" />
      </label>
      <label className="hidden" aria-hidden>
        Firma
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" name="consent" value="tak" required className="mt-0.5 h-4 w-4 accent-brand-600" />
        <span>
          Wyrażam zgodę na kontakt telefoniczny i e-mailowy w sprawie ubezpieczenia. Administratorem danych jest {site.name}.{' '}
          <Link href="/polityka-prywatnosci" className="font-semibold text-brand-700 underline">
            Polityka prywatności
          </Link>
        </span>
      </label>
      <Turnstile />
      <button type="submit" disabled={state.status === 'sending'} className="mt-6 h-12 w-full rounded-btn bg-brand-600 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">
        {state.status === 'sending' ? 'Wysyłam…' : 'Zamów rozmowę'}
      </button>
      <div aria-live="polite">
        {state.status === 'ok' && (
          <p className="mt-3 flex items-center justify-center gap-2 rounded-btn bg-success-50 p-3 text-sm font-medium text-success-600">
            <CheckIcon className="h-4 w-4" /> {state.message ?? 'Dziękuję! Oddzwonię najszybciej, jak to możliwe.'}
          </p>
        )}
        {state.status === 'error' && (
          <p className="mt-3 rounded-btn bg-error-50 p-3 text-sm text-error-600">
            {state.message} Możesz też zadzwonić:{' '}
            <a href={phoneHref} className="font-semibold underline">
              {site.contact.phone.value}
            </a>
          </p>
        )}
        {state.status === 'idle' && <p className="mt-3 text-center text-sm text-ink-500">Oddzwaniam zwykle tego samego dnia roboczego.</p>}
      </div>
    </form>
  );
}
