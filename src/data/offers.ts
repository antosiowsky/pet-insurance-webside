import { site } from '@/config/site';

export type Species = 'pies' | 'kot';
export type OfferType = 'ubezpieczenie' | 'pakiet' | 'pakiet-ubezpieczenie';
export type Availability = 'w-cenie' | 'opcja' | 'brak';

export type Variant = { name: string; treatmentSum?: number; note: string };

export type Offer = {
  slug: string;
  partner: string;
  /** Ścieżka przekierowania na link partnerski (mapa w public/_redirects). */
  redirectPath: string;
  insurer: string;
  distributor?: string;
  productName: string;
  shortName: string;
  type: OfferType;
  species: Species[];
  badge?: string;
  purchase: ('online' | 'z-doradca')[];
  minAge: string;
  /** Maksymalny wiek przy zawarciu umowy, w latach (null = brak sztywnego limitu / do potwierdzenia). */
  maxEntryAgeYears: number | null;
  maxTreatmentSum: number | null;
  reimbursement: string;
  waitingIllness: string;
  waitingAccident: string;
  liability: Availability;
  liabilityNote?: string;
  prevention: Availability;
  death: Availability;
  legal: Availability;
  assistance: Availability;
  anyVet: boolean;
  chipRequired: string;
  breeds: string;
  variants: Variant[];
  highlights: string[];
  watchOuts: string[];
  forWhom: string;
  summary: string;
  claimSteps: string[];
  owu: string;
  sortOrder: number;
};

export const offers: Offer[] = [
  {
    slug: 'pzu-dla-psa-i-kota',
    partner: 'pzu',
    redirectPath: '/wycena/pzu',
    insurer: 'PZU SA',
    distributor: 'UBEstrefa (sprzedaż online PZU)',
    productName: 'PZU Dla Psa i Kota',
    shortName: 'PZU',
    type: 'ubezpieczenie',
    species: ['pies', 'kot'],
    badge: 'Polecane',
    purchase: ['online', 'z-doradca'],
    minAge: '8 tygodni',
    maxEntryAgeYears: 8,
    maxTreatmentSum: 50000,
    reimbursement: 'do 80% rachunku',
    waitingIllness: '60 dni',
    waitingAccident: 'od początku ochrony',
    liability: 'opcja',
    liabilityNote: 'OC właściciela jako rozszerzenie',
    prevention: 'opcja',
    death: 'opcja',
    legal: 'opcja',
    assistance: 'opcja',
    anyVet: true,
    chipRequired: 'książeczka zdrowia, paszport lub zarejestrowany chip',
    breeds: 'bez wykluczeń ras, także mieszańce i rasy uznawane za ryzykowne',
    variants: [
      { name: 'Standard', treatmentSum: 5000, note: 'podstawowy zakres leczenia' },
      { name: 'Plus', treatmentSum: 15000, note: 'wyższa suma, zaostrzenia chorób przewlekłych' },
      { name: 'Super', treatmentSum: 25000, note: 'szerszy zakres i wyższe limity' },
      { name: 'Premium', treatmentSum: 50000, note: 'najwyższa suma, rozbudowana ochrona prawna' },
    ],
    highlights: ['Zwrot do 80% kosztów leczenia', 'Pies i kot, bez wykluczeń ras', 'OC, ochrona prawna, assistance'],
    watchOuts: ['Karencja 60 dni na choroby', 'Przystąpienie do 8. roku życia'],
    forWhom:
      'Dla opiekunów, którzy chcą jednej polisy dla psa albo kota, z możliwością dobrania OC, pomocy prawnej i profilaktyki. Dobry wybór także dla ras, które u innych ubezpieczycieli bywają wyłączone.',
    summary:
      'Ubezpieczenie kosztów leczenia po chorobie lub wypadku, z kilkoma wariantami sum i szeroką listą rozszerzeń. Zwrot obejmuje większość rachunku, a wizyta może odbyć się w dowolnej lecznicy.',
    claimSteps: [
      'Idziesz z pupilem do wybranej lecznicy i płacisz rachunek.',
      'Zgłaszasz szkodę online lub telefonicznie, dołączając fakturę i dokumentację leczenia.',
      'Ubezpieczyciel weryfikuje zgłoszenie i zwraca należną część kosztów na konto.',
    ],
    owu: 'OWU UZ/183/2026 – numer i data do weryfikacji',
    sortOrder: 1,
  },
  {
    slug: 'generali-pies',
    partner: 'generali',
    redirectPath: '/wycena/generali',
    insurer: 'Generali T.U. S.A.',
    productName: 'Z myślą o Twoim psie',
    shortName: 'Generali',
    type: 'ubezpieczenie',
    species: ['pies'],
    purchase: ['online'],
    minAge: '8 tygodni',
    maxEntryAgeYears: null,
    maxTreatmentSum: null,
    reimbursement: 'wg wskaźnika zwrotu, z udziałem własnym',
    waitingIllness: 'wg OWU',
    waitingAccident: 'wg OWU',
    liability: 'opcja',
    liabilityNote: 'OC właściciela psa na terenie Europy',
    prevention: 'brak',
    death: 'opcja',
    legal: 'brak',
    assistance: 'brak',
    anyVet: true,
    chipRequired: 'wg OWU',
    breeds: 'wg OWU',
    variants: [{ name: 'Koszty leczenia (moduł podstawowy)', note: 'choroba, wypadek, eutanazja i kremacja zbiorowa' }],
    highlights: ['Leczenie po chorobie i wypadku', 'OC właściciela w całej Europie', 'Opcja: świadczenie za śmierć psa'],
    watchOuts: ['Tylko psy', 'Ortopedia na osobnych zasadach'],
    forWhom:
      'Dla właścicieli psów, którzy chcą prostego zakupu online i rozważają OC na wyjazdy po Europie. Moduł leczenia jest obowiązkowy, resztę dobierasz.',
    summary:
      'Polisa modułowa: podstawą są koszty leczenia psa, do których można dołożyć OC właściciela i świadczenie na wypadek śmierci zwierzęcia.',
    claimSteps: [
      'Leczysz psa w wybranej lecznicy i zachowujesz fakturę.',
      'Zgłaszasz szkodę przez formularz online ubezpieczyciela.',
      'Po weryfikacji otrzymujesz zwrot pomniejszony o udział własny.',
    ],
    owu: 'OWU – numer i data do weryfikacji',
    sortOrder: 2,
  },
  {
    slug: 'bezpieczny-pl-pies',
    partner: 'bezpieczny',
    redirectPath: '/wycena/bezpieczny',
    insurer: 'do potwierdzenia w OWU',
    distributor: 'Bezpieczny.pl',
    productName: 'Ubezpieczenie psa Bezpieczny.pl',
    shortName: 'Bezpieczny.pl',
    type: 'ubezpieczenie',
    species: ['pies'],
    purchase: ['z-doradca', 'online'],
    minAge: '8 tygodni',
    maxEntryAgeYears: null,
    maxTreatmentSum: 50000,
    reimbursement: 'do sumy ubezpieczenia w wybranym wariancie',
    waitingIllness: 'wg OWU',
    waitingAccident: 'wg OWU',
    liability: 'opcja',
    liabilityNote: 'OC 20–200 tys. zł, także przy rażącym niedbalstwie, teren Europy',
    prevention: 'brak',
    death: 'opcja',
    legal: 'brak',
    assistance: 'brak',
    anyVet: true,
    chipRequired: 'wg OWU',
    breeds: 'świadczenie za śmierć zależne od rasy',
    variants: [
      { name: 'Wariant 5 000 zł', treatmentSum: 5000, note: 'leki do domu do 500 zł' },
      { name: 'Wariant 20 000 zł', treatmentSum: 20000, note: 'leki do domu do 1 000 zł' },
      { name: 'Wariant 50 000 zł', treatmentSum: 50000, note: 'leki do domu do 2 500 zł' },
    ],
    highlights: ['Leczenie do 50 000 zł', 'OC do 200 tys. zł, też rażące niedbalstwo', 'Leki do domu i diagnostyka'],
    watchOuts: ['Tylko psy', 'Świadczenie za śmierć: przystąpienie do 3. roku życia'],
    forWhom:
      'Dla osób, które wolą porozmawiać z doradcą i chcą wysokiej sumy OC – np. przy dużym psie albo psie, który bywa bez smyczy.',
    summary:
      'Ubezpieczenie psa z trzema progami sum na leczenie (wizyty, leki, badania obrazowe, hospitalizacja, operacje) oraz rozbudowanym OC bez konsumpcji sumy.',
    claimSteps: [
      'Płacisz za leczenie w lecznicy i zbierasz dokumenty.',
      'Zgłaszasz szkodę przez doradcę lub online.',
      'Otrzymujesz zwrot do wysokości sumy w wybranym wariancie.',
    ],
    owu: 'OWU – ubezpieczyciel, numer i data do weryfikacji',
    sortOrder: 3,
  },
  {
    slug: 'pethelp',
    partner: 'pethelp',
    redirectPath: '/wycena/pethelp',
    insurer: 'PETHELP sp. z o.o.',
    productName: 'Pakiety weterynaryjne PetHelp',
    shortName: 'PetHelp',
    type: 'pakiet',
    species: ['pies', 'kot'],
    purchase: ['online'],
    minAge: 'wg regulaminu',
    maxEntryAgeYears: null,
    maxTreatmentSum: null,
    reimbursement: 'usługi w sieci placówek (bez refundacji)',
    waitingIllness: 'nie dotyczy',
    waitingAccident: 'nie dotyczy',
    liability: 'brak',
    liabilityNote: 'OC w wariancie PetHelp+ (pakiet + ubezpieczenie)',
    prevention: 'w-cenie',
    death: 'brak',
    legal: 'brak',
    assistance: 'brak',
    anyVet: false,
    chipRequired: 'wg regulaminu',
    breeds: 'bez ograniczeń',
    variants: [
      { name: 'Podstawowy', note: 'wizyty i podstawowa profilaktyka' },
      { name: 'Standard', note: 'więcej wizyt i badań' },
      { name: 'Premium', note: 'badania krwi, USG/RTG, szczepienia' },
      { name: 'Platinum / VIP', note: 'najszerszy pakiet profilaktyki' },
    ],
    highlights: ['Profilaktyka w sieci 900+ placówek', 'Szczepienia, badania, przeglądy', 'Płatność jednorazowa lub w ratach'],
    watchOuts: ['To pakiet usług, nie refundacja leczenia', 'Tylko placówki partnerskie'],
    forWhom:
      'Dla opiekunów, którzy chcą przewidywalnie opłacać profilaktykę: szczepienia, przeglądy, badania. Przy poważnym leczeniu warto połączyć z ubezpieczeniem (PetHelp+).',
    summary:
      'Abonament weterynaryjny: płacisz stałą kwotę, a w placówkach partnerskich masz wizyty, badania i szczepienia w ramach pakietu.',
    claimSteps: [
      'Umawiasz wizytę w placówce partnerskiej.',
      'Usługi z pakietu realizujesz bez dopłat (lub ze zniżką).',
      'Zakres i limity sprawdzasz w panelu klienta.',
    ],
    owu: 'Regulamin pakietów i cennik – data do weryfikacji',
    sortOrder: 4,
  },
];

export const typeLabel: Record<OfferType, string> = {
  ubezpieczenie: 'Ubezpieczenie',
  pakiet: 'Pakiet weterynaryjny',
  'pakiet-ubezpieczenie': 'Pakiet + ubezpieczenie',
};

export const availabilityLabel: Record<Availability, string> = {
  'w-cenie': 'w cenie',
  opcja: 'opcja',
  brak: 'brak',
};

export function priceFrom(o: Offer) {
  return site.prices[o.slug]?.value ?? null;
}

export function getOffer(slug: string) {
  return offers.find((o) => o.slug === slug);
}

export function offersFor(species?: Species) {
  return offers.filter((o) => !species || o.species.includes(species)).sort((a, b) => a.sortOrder - b.sortOrder);
}

export const formatPLN = (n: number) => `${n.toLocaleString('pl-PL')} zł`;
