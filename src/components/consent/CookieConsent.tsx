'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent, type Consent } from '@/lib/consent';
import { site } from '@/config/site';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (!c) setVisible(true);
    else {
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    }
    const open = () => {
      setDetails(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const decide = (c: Omit<Consent, 'ts'>) => {
    saveConsent(c);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-3 bottom-20 z-[60] md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <div className="rounded-card border border-line bg-white p-5 shadow-lift">
        <p id="cookie-title" className="font-heading text-lg font-bold text-ink-900">
          Pliki cookies
        </p>
        <p className="mt-2 text-sm text-ink-600">
          Używamy niezbędnych plików cookies do działania strony. Za Twoją zgodą także analitycznych{site.integrations.gaId ? ' (Google Analytics)' : ''}, żeby
          sprawdzać, które treści są pomocne. Szczegóły w{' '}
          <Link href="/cookies" className="font-semibold text-brand-700 underline">
            polityce cookies
          </Link>
          .
        </p>
        {details && (
          <div className="mt-4 space-y-3 rounded-btn bg-cream p-4 text-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4" />
              <span>
                <strong className="text-ink-900">Niezbędne</strong> – zapamiętanie Twojego wyboru, bezpieczeństwo formularzy.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-600" />
              <span>
                <strong className="text-ink-900">Analityczne</strong> – anonimowe statystyki odwiedzin i kliknięć.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-600" />
              <span>
                <strong className="text-ink-900">Marketingowe</strong> – obecnie nie używamy; zgoda na przyszłe narzędzia reklamowe.
              </span>
            </label>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className="rounded-btn bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            Akceptuję wszystkie
          </button>
          <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className="rounded-btn border-2 border-ink-900 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-ink-50">
            Tylko niezbędne
          </button>
          {details ? (
            <button type="button" onClick={() => decide({ analytics, marketing })} className="rounded-btn px-3 py-2.5 text-sm font-semibold text-ink-800 underline underline-offset-4">
              Zapisz wybór
            </button>
          ) : (
            <button type="button" onClick={() => setDetails(true)} className="rounded-btn px-3 py-2.5 text-sm font-semibold text-ink-800 underline underline-offset-4">
              Ustawienia
            </button>
          )}
        </div>
      </div>
    </div>
  );
}