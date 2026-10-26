import Link from 'next/link';
import { mainNav } from '@/config/navigation';
import { phoneHref, site } from '@/config/site';
import { PhoneIcon } from '../icons';
import { btn } from '../ui';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <>
      <div className="hidden bg-ink-900 text-sm text-ink-200 md:block">
        <div className="container-page flex items-center justify-between py-2">
          <p>Licencjonowana agentka ubezpieczeniowa · porównanie i pomoc bez dodatkowych opłat</p>
          <div className="flex items-center gap-6">
            <a href={phoneHref} className="flex items-center gap-2 font-medium text-white hover:text-brand-100">
              <PhoneIcon className="h-4 w-4" />
              {site.contact.phone.value}
            </a>
            <span>{site.contact.hours.value}</span>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-page flex items-center justify-between gap-6 py-3">
          <Logo />
          <nav aria-label="Główne menu" className="hidden items-center gap-6 text-[15px] font-medium text-ink-800 xl:flex">
            {mainNav.map((i) => (
              <Link key={i.href} href={i.href} className="hover:text-brand-600">
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/porownywarka" className={`${btn.primary} px-5 py-2.5 text-sm max-sm:hidden`}>
              Porównaj oferty
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
