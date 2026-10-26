import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Analytics } from '@/components/consent/Analytics';
import { CookieConsent } from '@/components/consent/CookieConsent';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileCtaBar } from '@/components/layout/MobileCtaBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/config/site';
import { agencySchema, personSchema, websiteSchema } from '@/lib/seo';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['600', '700', '800'], variable: '--font-montserrat', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Ubezpieczenie psa i kota – porównanie ofert 2026 | Anita Grzenia', template: '%s | Anita Grzenia Ubezpieczenia' },
  description:
    'Porównaj ubezpieczenia dla psa i kota: PZU, Generali, Bezpieczny.pl i PetHelp. Zakres, ceny orientacyjne, karencje i pomoc agentki przy wyborze i szkodzie.',
  applicationName: site.name,
  authors: [{ name: site.agent.name.value }],
  robots: site.allowIndexing ? { index: true, follow: true } : { index: false, follow: true },
  openGraph: { siteName: site.name, locale: site.locale, type: 'website', images: ['/images/og.png'] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#162336', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a href="#tresc" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2">
          Przejdź do treści
        </a>
        <Header />
        <main id="tresc">{children}</main>
        <Footer />
        <MobileCtaBar />
        <CookieConsent />
        <Analytics />
        <JsonLd data={[agencySchema(), websiteSchema(), personSchema()]} />
      </body>
    </html>
  );
}
