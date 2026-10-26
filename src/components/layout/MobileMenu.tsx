'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mainNav } from '@/config/navigation';
import { phoneHref, site } from '@/config/site';
import { MenuIcon, PhoneIcon, XIcon } from '../icons';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line text-ink-900"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
      >
        {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-4.5rem)] border-t border-line overflow-y-auto bg-white px-4 pt-4 pb-28">
          <nav aria-label="Menu mobilne" className="flex flex-col">
            {mainNav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={`border-b border-line py-4 font-heading text-lg font-semibold ${pathname === i.href ? 'text-brand-600' : 'text-ink-900'}`}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <a href={phoneHref} className="mt-6 flex items-center gap-3 rounded-card bg-ink-50 p-4 font-semibold text-ink-900">
            <PhoneIcon className="h-5 w-5" /> {site.contact.phone.value}
            <span className="ml-auto text-sm font-normal text-ink-500">{site.contact.hours.value}</span>
          </a>
        </div>
      )}
    </div>
  );
}
