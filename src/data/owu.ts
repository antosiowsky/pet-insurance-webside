/**
 * Oficjalne (lub najlepsze dostępne) linki do OWU / regulaminów partnerów.
 * `url: null` = TODO – do uzupełnienia, gdy klientka / partner poda aktualny dokument.
 */
export type OwuDoc = {
  partner: string;
  product: string;
  url: string | null;
  label: string;
  note?: string;
};

export const owuDocuments: OwuDoc[] = [
  {
    partner: 'PZU',
    product: 'PZU Dla Psa i Kota',
    url: 'https://www.pzu.pl/_fileserver/item/1574099',
    label: 'OWU PZU Dla Psa i Kota (UZ/183/2026)',
    note: 'Oficjalny PDF z pzu.pl',
  },
  {
    partner: 'Generali',
    product: 'Z myślą o Twoim psie',
    url: 'https://www.generali.pl/media/Ogolne_Warunki_Ubezpieczenia_Generali_z_mysla_o_Twoim_psie_obowiazujace_od_21_05_2026_f7477cf88c.pdf',
    label: 'OWU Generali Z myślą o Twoim Psie (od 21.05.2026)',
    note: 'Oficjalny PDF z generali.pl – kanał własny Generali',
  },
  {
    partner: 'Bezpieczny.pl',
    product: 'Ubezpieczenie psa (kanał bezpieczny.pl)',
    url: 'https://www.generali.pl/media/OWU_Generali_z_mysla_o_Twoim_psie_13_02_2026_efcdf515b9.pdf',
    label: 'OWU Generali Z myślą o Twoim Psie, bezpieczny.pl (od 13.02.2026)',
    note: 'Oficjalny PDF Generali dla kanału bezpieczny.pl',
  },
  {
    partner: 'PetHelp',
    product: 'Pakiety / bony weterynaryjne',
    url: 'https://pethelp.pl/wp-content/uploads/2025/09/Regulamin-Bonow-Pethelp-02.09.2025.pdf',
    label: 'Regulamin bonów PetHelp (od 02.09.2025)',
    note: 'To regulamin pakietu usług, nie klasyczne OWU ubezpieczenia',
  },
  {
    partner: 'Barkibu',
    product: 'Ubezpieczenie zdrowia zwierząt',
    url: 'https://www.swiatpupila.pl/wp-content/uploads/2026/07/OWU_Barkibu_pl.pdf',
    label: 'OWU Barkibu – zdrowie zwierząt (wersja 06/2026)',
    note: 'TODO: potwierdzić oficjalny URL na barkibu.com – obecnie kopia PDF z serwisu partnerskiego',
  },
];
