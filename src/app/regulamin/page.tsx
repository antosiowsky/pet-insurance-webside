import Link from 'next/link';
import { LegalPage } from '@/components/LegalPage';
import { emailHref, site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Regulamin serwisu',
  description: 'Zasady korzystania z serwisu, porównywarki ofert, formularzy i newslettera.',
  path: '/regulamin',
});

export default function TermsPage() {
  return (
    <LegalPage title="Regulamin serwisu" path="/regulamin" updated="23.10.2026">
      <h2>§1. Postanowienia ogólne</h2>
      <p>
        Regulamin określa zasady korzystania z serwisu internetowego prowadzonego przez {site.agent.legalForm.value}, {site.agent.address.value} (dalej:
        „Usługodawca”), zgodnie z ustawą o świadczeniu usług drogą elektroniczną.
      </p>
      <h2>§2. Usługi</h2>
      <ul>
        <li>przeglądanie treści informacyjnych i poradników,</li>
        <li>porównywarka ofert z odnośnikami do kalkulatorów partnerów,</li>
        <li>formularz kontaktowy („Poproś o kontakt”),</li>
        <li>zapis na e-book i newsletter.</li>
      </ul>
      <h2>§3. Charakter informacji</h2>
      <p>
        Informacje o produktach są orientacyjne i mają charakter informacyjny. Nie stanowią oferty w rozumieniu art. 66 Kodeksu cywilnego. Wiążące są
        ogólne warunki ubezpieczenia i dokumenty ubezpieczycieli. Zakup za pośrednictwem linków partnerskich odbywa się na stronie i według zasad
        danego partnera.
      </p>
      <h2>§4. Wymagania techniczne</h2>
      <p>Do korzystania z serwisu wystarczy urządzenie z dostępem do internetu i aktualną przeglądarką. Do formularzy potrzebny jest adres e-mail lub numer telefonu.</p>
      <h2>§5. Zakazane działania</h2>
      <p>Zabronione jest przesyłanie treści o charakterze bezprawnym oraz działania zakłócające pracę serwisu, w tym automatyczne wysyłanie formularzy.</p>
      <h2>§6. Reklamacje</h2>
      <p>
        Reklamacje dotyczące działania serwisu można zgłaszać na adres <a href={emailHref}>{site.contact.email.value}</a>. Odpowiedź udzielana jest w
        terminie 14 dni.
      </p>
      <h2>§7. Dane osobowe</h2>
      <p>
        Zasady przetwarzania danych opisuje <Link href="/polityka-prywatnosci">polityka prywatności</Link>.
      </p>
      <h2>§8. Postanowienia końcowe</h2>
      <p>Usługodawca może zmienić regulamin z ważnych przyczyn, informując o tym w serwisie. Do spraw nieuregulowanych stosuje się prawo polskie.</p>
    </LegalPage>
  );
}
