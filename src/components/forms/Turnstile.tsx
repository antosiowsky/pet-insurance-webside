'use client';

import { useEffect } from 'react';
import { site } from '@/config/site';

/** Widżet Cloudflare Turnstile – renderuje się tylko, gdy ustawiono NEXT_PUBLIC_TURNSTILE_SITE_KEY. */
export function Turnstile() {
  const key = site.integrations.turnstileSiteKey;
  useEffect(() => {
    if (!key || document.querySelector('script[data-turnstile]')) return;
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    s.dataset.turnstile = '1';
    document.head.appendChild(s);
  }, [key]);
  if (!key) return null;
  return <div className="cf-turnstile mt-4" data-sitekey={key} data-language="pl" />;
}
