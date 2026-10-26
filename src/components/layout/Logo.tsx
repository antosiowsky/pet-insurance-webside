import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap" aria-label="Anita Grzenia Ubezpieczenia – strona główna">
      <Image src="/images/logo-znak.png" alt="" width={56} height={40} className="h-10 w-14 rounded-[4px]" priority />
      <span className="leading-tight">
        <span className="block font-heading text-lg font-bold text-charcoal">Anita Grzenia</span>
        <span className="block font-heading text-[11px] font-bold tracking-[0.18em] text-charcoal">UBEZPIECZENIA</span>
      </span>
    </Link>
  );
}
