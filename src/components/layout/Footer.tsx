import Image from 'next/image';
import Link from 'next/link';
import { footerNav } from '@/config/navigation';
import { emailHref, phoneHref, site } from '@/config/site';
import { CookieSettingsButton } from '../consent/CookieSettingsButton';

export function Footer() {
  return (
    <footer className="bg-ink-900 pb-24 text-ink-200 md:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-card bg-white p-3">
            <Image src="/images/logo.png" alt="Anita Grzenia Ubezpieczenia" width={188} height={99} className="h-auto w-[188px]" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            {site.agent.role[0].toUpperCase() + site.agent.role.slice(1)}. Porównanie ubezpieczeń dla psa i kota, pomoc w zakupie i przy
            zgłoszeniu szkody.
          </p>
        </div>
        {Object.entries(footerNav).map(([title, links]) => (
          <div key={title}>
            <p className="font-heading font-bold text-white">{title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-heading font-bold text-white">Kontakt</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={phoneHref} className="hover:text-white">
                {site.contact.phone.value}
              </a>
            </li>
            <li>
              <a href={emailHref} className="break-all hover:text-white">
                {site.contact.email.value}
              </a>
            </li>
            <li>Telefon: {site.contact.hours.value}</li>
            <li>
              {site.agent.officeName.value}, {site.agent.address.value}
            </li>
            {site.contact.facebook.value && (
              <li>
                <a href={site.contact.facebook.value} className="hover:text-white" rel="noopener" target="_blank">
                  Facebook
                </a>
              </li>
            )}
            {site.contact.instagram.value && (
              <li>
                <a href={site.contact.instagram.value} className="hover:text-white" rel="noopener" target="_blank">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-200/90 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · <CookieSettingsButton />
          </p>
          <p className="max-w-2xl">
            Serwis może otrzymywać wynagrodzenie (prowizję) od zakładów ubezpieczeń i partnerów – cena dla Ciebie się nie zmienia. Treści mają
            charakter informacyjny i nie stanowią oferty w rozumieniu art. 66 Kodeksu cywilnego.
          </p>
        </div>
      </div>
    </footer>
  );
}
