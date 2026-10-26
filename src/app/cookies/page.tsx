import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Polityka cookies',
  description: 'Jakie pliki cookies i podobne technologie wykorzystuje serwis, w jakim celu i jak zmienić ustawienia zgód.',
  path: '/cookies',
});

export default function CookiesPage() {
  return (
    <LegalPage title="Polityka cookies" path="/cookies" updated="23.10.2026">
      <p>
        Serwis korzysta z plików cookies i pamięci przeglądarki (localStorage). Niezbędne mechanizmy działają zawsze, pozostałe – wyłącznie po wyrażeniu
        zgody w banerze.
      </p>
      <h2>Rodzaje plików cookies</h2>
      <table>
        <thead>
          <tr>
            <th>Kategoria</th>
            <th>Cel</th>
            <th>Dostawca</th>
            <th>Okres</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Niezbędne</td>
            <td>zapamiętanie wyboru zgód (ag-consent-v1), ochrona formularzy przed spamem</td>
            <td>serwis, Cloudflare</td>
            <td>do 12 miesięcy / sesja</td>
          </tr>
          <tr>
            <td>Analityczne</td>
            <td>anonimowe statystyki odwiedzin i kliknięć (np. „Oblicz składkę”)</td>
            <td>Google Analytics 4</td>
            <td>do 14 miesięcy</td>
          </tr>
          <tr>
            <td>Marketingowe</td>
            <td>obecnie nieużywane</td>
            <td>—</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
      <h2>Jak zmienić ustawienia</h2>
      <p>
        Swoją decyzję możesz zmienić w dowolnej chwili: <CookieSettingsButton />. Możesz też usunąć cookies w ustawieniach przeglądarki.
      </p>
      <h2>Linki partnerskie</h2>
      <p>Po kliknięciu „Oblicz składkę” przechodzisz na stronę partnera, który może stosować własne pliki cookies zgodnie ze swoją polityką.</p>
    </LegalPage>
  );
}
