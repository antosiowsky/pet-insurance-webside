/**
 * Jedyne miejsce z danymi zależnymi od klientki.
 * Potwierdzone wartości: `ok(...)`. Nadal do uzupełnienia: `ph(...)`.
 * Lista kontrolna: `placeholderChecklist` / strona `/placeholdery`.
 */

export type Placeholder<T> = { value: T; placeholder: boolean; note?: string };

const ph = <T,>(value: T, note?: string): Placeholder<T> => ({ value, placeholder: true, note });
const ok = <T,>(value: T): Placeholder<T> => ({ value, placeholder: false });

export const site = {
  name: 'Anita Grzenia Ubezpieczenia',
  shortName: 'Anita Grzenia',
  tagline: 'Ubezpieczenia psa i kota – porównanie ofert i pomoc agentki',
  /** Ustaw NEXT_PUBLIC_SITE_URL w Cloudflare Pages (produkcja: https://zdrowyogonek.pl). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zdrowyogonek.pl').replace(/\/$/, ''),
  /** Indeksowanie włączamy dopiero po akceptacji: NEXT_PUBLIC_ALLOW_INDEXING=true. */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
  locale: 'pl_PL',
  dataUpdatedAt: ph('2026-10-23', 'data aktualizacji cen i warunków ofert'),

  agent: {
    name: ok('Anita Grzenia'),
    role: 'agentka ubezpieczeniowa',
    /** Numer Anity w rejestrze agentów KNF (RAU). */
    knfNumber: ok('11425397/P'),
    /**
     * Podmiot gospodarczy, w ramach którego działa (wujek).
     * Na stronach prawnych: administrator danych / firma ≠ osoba agentki.
     */
    businessOwner: ok('Sergiusz Grzenia'),
    officeName: ok('Bezpieczny-Klient'),
    /** Skrót do tekstów prawnych (administrator / firma). */
    legalForm: ok('Sergiusz Grzenia – Bezpieczny-Klient'),
    nip: ok('6472103644'),
    address: ok('ul. Obywatelska 26, 44-280 Rydułtowy'),
    /** Zakłady / partnerzy agencyjni potwierdzeni przez klientkę. */
    insurers: ok(['Generali T.U. S.A.', 'Bezpieczny.pl']),
    yearsOfExperience: ok('10+'),
    photo: ph<string | null>(null, 'zdjęcie agentki (najlepiej z pupilem), np. /images/agentka.webp'),
    bio: ph(
      'Od lat pomagam klientom dobrać ubezpieczenie do ich sytuacji, a w domu mam futrzanych domowników. Wiem, ile nerwów kosztuje nagła wizyta u weterynarza – dlatego porównuję oferty uczciwie, z plusami i minusami.',
      'krótkie bio w pierwszej osobie – do akceptacji klientki',
    ),
    area: ok('Cała Polska – online i telefonicznie'),
    /** Osobna wizytówka / oferta poza zdrowyogonek.pl */
    website: ok('https://anitagrzenia.pl'),
    /**
     * Informacja, że poza pupilami oferuje też inne ubezpieczenia.
     * Pokazywane na /o-mnie i w sekcji „O mnie”.
     */
    otherProducts: ok(
      'Poza ubezpieczeniami psa i kota pomagam też dobrać inne polisy – m.in. na dom i mieszkanie, OC, komunikacyjne oraz na życie. Jeśli potrzebujesz kompleksowej ochrony, napisz lub zadzwoń – ustalimy, co ma sens w Twojej sytuacji.',
    ),
  },

  contact: {
    phone: ok('+48 512 241 906'),
    email: ok('kontakt@zdrowyogonek.pl'),
    /** Godziny dostępności na linii telefonicznej (wizytówka). */
    hours: ok('8:00–20:00'),
    /** Godziny biura w Rydułtowach. */
    officeHours: ok('pn–pt 8:00–16:00'),
    facebook: ph<string | null>(null, 'profil Facebook'),
    instagram: ph<string | null>(null, 'profil Instagram'),
  },

  trust: {
    googleRating: ph<number | null>(null, 'ocena w Google (np. 4.9) – pokazujemy tylko prawdziwą'),
    googleReviewsCount: ph<number | null>(null, 'liczba opinii Google'),
    reviews: ph(
      [
        { author: 'Marta, opiekunka labradora', text: 'Pani Anita wytłumaczyła mi różnice między polisami w 15 minut. Wybrałam spokojnie, bez presji.' },
        { author: 'Tomasz, kot Filemon', text: 'Pomoc przy zgłoszeniu szkody po operacji kota – wszystko poszło sprawnie.' },
      ],
      'prawdziwe opinie za zgodą klientów – obecne są PRZYKŁADOWE i ukryte na stronie',
    ),
  },

  /**
   * Ceny „od” (zł/mies.) – tylko po potwierdzeniu u klientki.
   * Barkibu: brak ceny „od” (indywidualna wycena) – nie wymyślamy kwoty.
   */
  prices: {
    'pzu-dla-psa-i-kota': ph(32, 'orientacyjna cena od, zł/mies.'),
    'generali-pies': ph(30, 'orientacyjna cena od, zł/mies.'),
    'bezpieczny-pl-pies': ph(29, 'orientacyjna cena od, zł/mies.'),
    pethelp: ph(19, 'pakiet Podstawowy wg cennika PetHelp – do potwierdzenia'),
    barkibu: ph(0, 'Barkibu – cena z kalkulatora; nie publikujemy „od” bez potwierdzenia (0 = ukryj na karcie)'),
  } as Record<string, Placeholder<number>>,

  /**
   * Kody rabatowe. Barkibu: `zdrowyogonek` – program partnerski oparty o kod (nie o osobny URL ze śledzeniem).
   * Redirect `/wycena/barkibu` prowadzi na publiczną stronę barkibu.com/pl.
   */
  discounts: {
    'pzu-dla-psa-i-kota': ph<string | null>(null, 'kod rabatowy, jeśli klientka ma'),
    'generali-pies': ph<string | null>(null),
    'bezpieczny-pl-pies': ph<string | null>(null),
    pethelp: ph<string | null>(null),
    barkibu: ok('zdrowyogonek'),
  } as Record<string, Placeholder<string | null>>,

  /** Meta partnerów bez osobistego linku ref – dokumentacja dla /placeholdery i maintainerów. */
  partnerLinkNotes: {
    barkibu: ok(
      'Brak publicznego URL ze śledzeniem ID. Redirect → https://www.barkibu.com/pl/. Kod partnerski „zdrowyogonek” wpisuje się w polu „mam kod promocyjny” na końcu zakupu. Aby mieć panel afiliacyjny: affiliates.barkibu.com/pl',
    ),
  },

  legalReviewed: ph(false, 'polityka prywatności, cookies, regulamin, informacja o agencie – weryfikacja prawna'),

  ebook: {
    title: ok('Na co uważać przy ubezpieczeniu psa i kota'),
    subtitle: ok('Checklista OWU: udział własny, wyłączenia, karencje, suma, OC i zgłoszenie szkody'),
    /** Publiczny PDF – Function `/api/ebook` wysyła link (+ załącznik) przez Resend. */
    pdfPath: ok('/ebook/na-co-uwazac-ubezpieczenie-psa-i-kota.pdf'),
    pdfReady: ok(true),
  },

  integrations: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? null,
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null,
  },
  brand: ok({ primary: '#C11B18', ink: '#162336' }),
};

export const phoneHref = `tel:${site.contact.phone.value.replace(/\s/g, '')}`;
export const emailHref = `mailto:${site.contact.email.value}`;

/** Lista rzeczy do potwierdzenia – używana na stronie /placeholdery (noindex, poza sitemapą). */
export function placeholderChecklist() {
  const out: { key: string; value: unknown; note?: string }[] = [];
  const walk = (obj: unknown, path: string) => {
    if (obj && typeof obj === 'object') {
      const rec = obj as Record<string, unknown>;
      if ('placeholder' in rec && 'value' in rec) {
        if (rec.placeholder) out.push({ key: path, value: rec.value, note: rec.note as string | undefined });
        return;
      }
      for (const [k, v] of Object.entries(rec)) walk(v, path ? `${path}.${k}` : k);
    }
  };
  walk(site, '');
  return out;
}
