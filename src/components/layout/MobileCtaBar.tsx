import Link from 'next/link';
import { phoneHref } from '@/config/site';
import { PhoneIcon } from '../icons';

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <a href={phoneHref} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn border-2 border-ink-900 text-ink-900" aria-label="Zadzwoń">
        <PhoneIcon className="h-5 w-5" />
      </a>
      <Link href="/porownywarka" className="flex h-12 flex-1 items-center justify-center rounded-btn bg-brand-600 font-semibold text-white">
        Porównaj oferty
      </Link>
    </div>
  );
}
