'use client';

import { OPEN_SETTINGS_EVENT } from '@/lib/consent';

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className="underline hover:text-white">
      Ustawienia cookies
    </button>
  );
}
