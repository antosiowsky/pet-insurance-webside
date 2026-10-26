'use client';

import { useEffect } from 'react';
import { site } from '@/config/site';
import { CONSENT_EVENT, readConsent, track, type Consent } from '@/lib/consent';

/** Ładuje GA4 dopiero po zgodzie analitycznej (Consent Mode v2: domyślnie wszystko „denied”). */
export function Analytics() {
  const gaId = site.integrations.gaId;

  useEffect(() => {
    if (!gaId) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });

    let loaded = false;
    const apply = (c: Consent | null) => {
      if (!c) return;
      window.gtag!('consent', 'update', {
        analytics_storage: c.analytics ? 'granted' : 'denied',
        ad_storage: c.marketing ? 'granted' : 'denied',
        ad_user_data: c.marketing ? 'granted' : 'denied',
        ad_personalization: c.marketing ? 'granted' : 'denied',
      });
      if (c.analytics && !loaded) {
        loaded = true;
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(s);
        window.gtag!('js', new Date());
        window.gtag!('config', gaId, { anonymize_ip: true });
      }
    };
    apply(readConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<Consent>).detail);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      const href = a?.getAttribute('href') ?? '';
      if (href.startsWith('/wycena/')) {
        track('affiliate_click', { partner: href.split('/')[2]?.split('?')[0], placement: a?.dataset.placement });
      } else if (href.startsWith('tel:')) {
        track('phone_click', { placement: a?.dataset.placement });
      }
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      document.removeEventListener('click', onClick);
    };
  }, [gaId]);

  return null;
}
