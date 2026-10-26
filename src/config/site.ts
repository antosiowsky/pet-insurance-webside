/**
 * Jedyne miejsce z danymi zależnymi od klientki.
 * Wszystko oznaczone `PLACEHOLDER` trzeba potwierdzić lub podmienić przed startem
 * (lista kontrolna: `placeholderChecklist` na dole pliku).
 */

export type Placeholder<T> = { value: T; placeholder: boolean; note?: string };

const ph = <T,>(value: T, note?: string): Placeholder<T> => ({ value, placeholder: true, note });
const ok = <T,>(value: T): Placeholder<T> => ({ value, placeholder: false });

export const site = {
  name: 'Anita Grzenia Ubezpieczenia',
  shortName: 'Anita Grzenia',
  tagline: 'Ubezpieczenia psa i kota – porównanie ofert i pomoc agentki',
  /** Ustaw NEXT_PUBLIC_SITE_URL w Cloudflare Pages (np. https://twojadomena.pl). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://twojadomena.pl').replace(/\/$/, ''),
  /** Indeksowanie włączamy dopiero po podmianie placeholderów: NEXT_PUBLIC_ALLOW_INDEXING=true. */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true',
  locale: 'pl_PL',
  dataUpdatedAt: ph('2026-10-23', 'data aktualizacji cen i warunków ofert'),

  agent: {
    name: ph('Anita Grzenia', 'potwierdzić, czy to dane klientki (widnieją pod linkiem Bezpieczny.pl)'),
    role: 'agentka ubezpieczeniowa',
    knfNumber: ph('11XXXXXX/A', 'numer w rejestrze agentów KNF (RAU)'),
    legalForm: ph('Anita Grzenia Ubezpieczenia (forma działalności do uzupełnienia)', 'firma, NIP, REGON, adres'),
    nip: ph('000-000-00-00', 'NIP'),
    address: ph('ul. Przykładowa 1, 00-000 Miasto', 'adres do korespondencji'),
    insurers: ph(['PZU SA', 'Generali T.U. S.A.'], 'zakłady/agencje, w imieniu których działa agentka'),
    yearsOfExperience: ph('10+', 'staż w branży'),
    photo: ph<string | null>(null, 'zdjęcie agentki (najlepiej z pupilem), np. /images/agentka.webp'),
    bio: ph(
      'Od lat pomagam klientom dobrać ubezpieczenie do ich sytuacji, a w domu mam futrzanych domowników. Wiem, ile nerwów kosztuje nagła wizyta u weterynarza – dlatego porównuję oferty uczciwie, z plusami i minusami.',
      'krótkie bio w pierwszej osobie',
    ),
    area: ph('Cała Polska – online i telefonicznie', 'obszar działania / miasto do SEO lokalnego'),
  },

  contact: {
    phone: ph('+48 512 241 906', 'numer z wizytówki Bezpieczny.pl – potwierdzić'),
    email: ph('kontakt@twojadomena.pl', 'adres na docelowej domenie'),
    hours: ph('pn–pt 9:00–18:00', 'godziny kontaktu'),
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
      'prawdziwe opinie za zgodą klientów – obecne są PRZYKŁADOWE',
    ),
  },

  /** Ceny „od” na kartach ofert (zł/mies.) – orientacyjne, do potwierdzenia u klientki. */
  prices: {
    'pzu-dla-psa-i-kota': ph(32, 'orientacyjna cena od, zł/mies.'),
    'generali-pies': ph(30, 'orientacyjna cena od, zł/mies.'),
    'bezpieczny-pl-pies': ph(29, 'orientacyjna cena od, zł/mies.'),
    pethelp: ph(19, 'pakiet Podstawowy wg cennika PetHelp od 01.05.2026'),
  } as Record<string, Placeholder<number>>,

  /** Kody rabatowe przy ofertach (null = brak). */
  discounts: {
    'pzu-dla-psa-i-kota': ph<string | null>(null, 'kod rabatowy, jeśli klientka ma'),
    'generali-pies': ph<string | null>(null),
    'bezpieczny-pl-pies': ph<string | null>(null),
    pethelp: ph<string | null>(null),
  } as Record<string, Placeholder<string | null>>,

  /** Dokumenty prawne to wzory – po weryfikacji przez prawnika ustaw placeholder na false (zniknie baner „wersja robocza”). */
  legalReviewed: ph(false, 'polityka prywatności, cookies, regulamin, informacja o agencie – weryfikacja prawna'),

  ebook: {
    title: ph('Jak wybrać ubezpieczenie dla psa i kota', 'tytuł e-booka'),
    pdfReady: ph(false, 'czy PDF jest gotowy (wysyłka przez MailerLite)'),
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
