import { LegalPage } from '@/components/LegalPage';
import { emailHref, site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Informacja o agencie ubezpieczeniowym',
  description: 'Dane agentki ubezpieczeniowej, numer w rejestrze KNF, zakłady ubezpieczeń, wynagrodzenie i sposób składania reklamacji.',
  path: '/informacja-o-agencie',
});

export default function AgentInfoPage() {
  const a = site.agent;
  return (
    <LegalPage title="Informacja o agencie ubezpieczeniowym" path="/informacja-o-agencie" updated="27.10.2026">
      <p>
        Zgodnie z ustawą z dnia 15 grudnia 2017 r. o dystrybucji ubezpieczeń przekazuję informacje, które przysługują Ci przed zawarciem umowy
        ubezpieczenia.
      </p>
      <h2>Dane agenta</h2>
      <ul>
        <li>Imię i nazwisko agenta: {a.name.value}</li>
        <li>Numer wpisu w rejestrze pośredników ubezpieczeniowych (KNF / RAU): {a.knfNumber.value}</li>
        <li>
          Kontakt: {site.contact.phone.value}, <a href={emailHref}>{site.contact.email.value}</a>
        </li>
      </ul>
      <p>Wpis można zweryfikować w rejestrze pośredników ubezpieczeniowych prowadzonym przez Komisję Nadzoru Finansowego (rnu.knf.gov.pl).</p>
      <h2>Podmiot gospodarczy</h2>
      <p>
        Czynności agencyjne wykonuję w ramach działalności gospodarczej {a.businessOwner.value} (biuro {a.officeName.value}), NIP {a.nip.value}, adres:{' '}
        {a.address.value}.
      </p>
      <h2>W czyim imieniu działam</h2>
      <p>Wykonuję czynności agencyjne na rzecz następujących zakładów / partnerów: {a.insurers.value.join(', ')}.</p>
      <p>
        Część ofert prezentowanych w serwisie (m.in. PZU / UBEstrefa, pakiety weterynaryjne PetHelp) jest dostępna za pośrednictwem linków partnerskich.
        Zakup odbywa się bezpośrednio u danego podmiotu.
      </p>
      <h2>Wynagrodzenie</h2>
      <p>
        Za zawarcie umowy otrzymuję wynagrodzenie w formie prowizji, wliczonej w składkę ubezpieczeniową. Nie pobieram od klientów dodatkowych opłat.
      </p>
      <h2>Doradztwo</h2>
      <p>
        Przed zawarciem umowy ustalam Twoje wymagania i potrzeby oraz przekazuję informacje o produkcie (w tym dokument IPID). Treści w serwisie mają
        charakter informacyjny i nie stanowią oferty w rozumieniu art. 66 Kodeksu cywilnego.
      </p>
      <h2>Reklamacje i spory</h2>
      <p>
        Reklamację dotyczącą moich czynności możesz złożyć e-mailem, pisemnie na adres korespondencyjny ({a.address.value}) lub telefonicznie. Odpowiem w
        ciągu 30 dni. Masz też prawo zwrócić się do Rzecznika Finansowego (rf.gov.pl) oraz skorzystać z pozasądowego rozwiązywania sporów.
      </p>
      <p>Nie posiadam akcji ani udziałów w zakładach ubezpieczeń, a zakłady ubezpieczeń nie posiadają udziałów w tej działalności.</p>
    </LegalPage>
  );
}
