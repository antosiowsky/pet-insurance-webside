import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { emailHref, site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Polityka prywatności',
  description: 'Jak przetwarzam dane osobowe przekazane przez formularz kontaktowy, zapis na e-book i newsletter oraz jakie prawa Ci przysługują.',
  path: '/polityka-prywatnosci',
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Polityka prywatności" path="/polityka-prywatnosci" updated="23.10.2026">
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem Twoich danych osobowych jest {site.agent.businessOwner.value} (biuro {site.agent.officeName.value}),{' '}
        {site.agent.address.value}, NIP {site.agent.nip.value} (dalej: „Administrator”). Kontakt w sprawach danych:{' '}
        <a href={emailHref}>{site.contact.email.value}</a> (agentka: {site.agent.name.value}).
      </p>
      <h2>2. Jakie dane i w jakim celu przetwarzam</h2>
      <ul>
        <li>
          <strong>Formularz „Poproś o kontakt”</strong> – imię, telefon, opcjonalnie e-mail i informacje o pupilu – w celu kontaktu i przedstawienia
          oferty (art. 6 ust. 1 lit. a i b RODO).
        </li>
        <li>
          <strong>E-book i newsletter</strong> – adres e-mail – w celu wysłania e-booka i newslettera na podstawie zgody (art. 6 ust. 1 lit. a RODO).
        </li>
        <li>
          <strong>Statystyki strony</strong> – dane o korzystaniu z serwisu zbierane w plikach cookies, wyłącznie po wyrażeniu zgody (art. 6 ust. 1 lit.
          a RODO).
        </li>
        <li>
          <strong>Obsługa umów i reklamacji</strong> – w zakresie wymaganym przepisami o dystrybucji ubezpieczeń (art. 6 ust. 1 lit. c RODO).
        </li>
        <li>
          <strong>Dochodzenie roszczeń i ochrona przed nimi</strong> – prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO).
        </li>
      </ul>
      <h2>3. Odbiorcy danych</h2>
      <p>Dane mogą być przekazywane podmiotom, które pomagają mi prowadzić serwis i kontaktować się z Tobą:</p>
      <ul>
        <li>Cloudflare, Inc. – hosting i bezpieczeństwo serwisu, ochrona formularzy przed spamem (Turnstile),</li>
        <li>dostawca wysyłki e-maili (np. Resend) – przekazanie zgłoszenia z formularza,</li>
        <li>MailerLite – wysyłka e-booka i newslettera,</li>
        <li>Google Ireland Ltd. – statystyki (Google Analytics), wyłącznie po wyrażeniu zgody,</li>
        <li>zakłady ubezpieczeń – wyłącznie gdy zdecydujesz się na zawarcie umowy.</li>
      </ul>
      <p>
        Część dostawców może przetwarzać dane poza Europejskim Obszarem Gospodarczym – na podstawie decyzji Komisji Europejskiej o odpowiednim stopniu
        ochrony (EU-US Data Privacy Framework) lub standardowych klauzul umownych.
      </p>
      <h2>4. Jak długo przechowuję dane</h2>
      <ul>
        <li>dane z formularza kontaktowego – do 12 miesięcy od ostatniego kontaktu, chyba że zawrzemy umowę,</li>
        <li>newsletter – do wycofania zgody,</li>
        <li>dokumentacja umów – przez okres wymagany przepisami.</li>
      </ul>
      <h2>5. Twoje prawa</h2>
      <p>
        Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz wycofania zgody w dowolnym
        momencie (bez wpływu na zgodność z prawem wcześniejszego przetwarzania). Przysługuje Ci też skarga do Prezesa Urzędu Ochrony Danych Osobowych.
      </p>
      <h2>6. Dobrowolność</h2>
      <p>Podanie danych jest dobrowolne, ale niezbędne do kontaktu, wysłania e-booka lub przygotowania oferty.</p>
      <h2>7. Linki partnerskie</h2>
      <p>
        Przyciski „Oblicz składkę” prowadzą do stron ubezpieczycieli i partnerów. Od momentu przejścia na ich stronę obowiązują ich zasady przetwarzania
        danych.
      </p>
      <h2>8. Pliki cookies</h2>
      <p>
        Szczegóły znajdziesz w <Link href="/cookies">polityce cookies</Link>.
      </p>
    </LegalPage>
  );
}
