export type Consent = { analytics: boolean; marketing: boolean; ts: string };

const KEY = 'ag-consent-v1';
export const CONSENT_EVENT = 'ag-consent-change';
export const OPEN_SETTINGS_EVENT = 'ag-consent-open';

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(c: Omit<Consent, 'ts'>) {
  const value: Consent = { ...c, ts: new Date().toISOString() };
  window.localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Zdarzenie analityczne – wysyłane tylko, gdy GA zostało załadowane po zgodzie. */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, params);
}
