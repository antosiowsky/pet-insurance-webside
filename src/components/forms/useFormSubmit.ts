'use client';

import { useState } from 'react';
import { track } from '@/lib/consent';

export type FormState = { status: 'idle' | 'sending' | 'ok' | 'error'; message?: string };

export function useFormSubmit(endpoint: string, event: string) {
  const [state, setState] = useState<FormState>({ status: 'idle' });

  async function submit(form: HTMLFormElement) {
    setState({ status: 'sending' });
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message || 'Nie udało się wysłać formularza.');
      setState({ status: 'ok', message: json.message });
      track(event, { page: window.location.pathname });
      form.reset();
    } catch (e) {
      setState({ status: 'error', message: e instanceof Error ? e.message : 'Nie udało się wysłać formularza.' });
    }
  }

  return { state, submit };
}
