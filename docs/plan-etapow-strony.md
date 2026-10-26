# Plan etapów tworzenia strony – Anita Grzenia Ubezpieczenia

Stan na 23.10.2026: research gotowy (research linków klienta (dokument roboczy, poza repo)), kolorystyka i makieta gotowe ([design-kolorystyka.md](design-kolorystyka.md)), makieta zacommitowana w `design/` w repo [`antosiowsky/pet-insurance-webside`](https://github.com/antosiowsky/pet-insurance-webside).

**Stan na 26.10.2026:** kod strony (etapy 2–7 w części programistycznej) jest w repo. Dane zależne od klientki są oznaczone jako placeholdery w `src/config/site.ts` (lista na stronie `/placeholdery`). Odhaczone punkty niżej oznaczają gotowy kod, nie akceptację klientki.

**Założenia techniczne:** Next.js (App Router, TypeScript) w trybie statycznym (`output: 'export'`), Tailwind z tokenami z `design/tailwind-config.js`, treści (oferty, blog) jako JSON/MDX w repo, deploy z Gita. Domyślnie Cloudflare Pages; wariant dla klasycznego hostingu opisany w sekcji „Hosting – dwa warianty”.

**Role:** **Ty** – decyzje, konta, kontakt z klientką, commity w GitHub Desktop. **Agent** – kod, treści robocze, testy. **Klientka** – materiały, dane, akceptacje.

**Zakres startu (MVP):** etapy 0–4 i 6–8. Blog startuje z 3–5 wpisami, rozbudowa w etapie 9.

---

## Etap 0. Decyzje i materiały od klientki

Bez tego nie ruszą treści i część prawna, więc zaczynamy równolegle z etapem 1.

- Akceptacja kierunku makiety (granat czy grafit, układ strony głównej).
- Dane agentki: forma działalności, numer w rejestrze KNF, zakłady/agencje, dla których działa, „informacja o agencie” (PDF lub treść).
- Potwierdzenie linków partnerskich (PZU/UBEstrefa, Generali, Bezpieczny.pl, PetHelp) i czy są linki dla kota; kody rabatowe.
- Orientacyjne ceny „od” do kart ofert, z datą.
- Logo w SVG (albo zgoda, że odtworzymy je wektorowo), zdjęcie agentki (najlepiej z pupilem), zgody na opinie klientów.
- Kontakt: telefon, e-mail, godziny, obszar (cała Polska / miasto do SEO lokalnego).
- E-book: temat, czy istnieje, czy piszemy go my; narzędzie newslettera (rekomendacja: MailerLite).
- Czy chce sama edytować treści (wtedy CMS w etapie 5).

**Wynik:** komplet odpowiedzi + folder z materiałami. Pytania są gotowe w sekcji 7 researchu i sekcji 9 dokumentu designu.

## Etap 1. Infrastruktura

- Domena `.pl` zarejestrowana **na klientkę**, Ty z dostępem. Sprawdzona cena odnowienia.
- DNS w Cloudflare (darmowy), HTTPS.
- Projekt produkcyjny Cloudflare Pages podpięty do repo (osobny od makiety `anita-grzenia-makieta`).
- Poczta na domenie: Cloudflare Email Routing (przekierowanie) albo Zoho/Google Workspace (pełna skrzynka). Rekordy SPF/DKIM/DMARC.
- Tymczasowa strona „Wkrótce” z telefonem i e-mailem (noindex), żeby domena już działała.

**Wynik:** domena działa, poczta działa, każdy push do `main` się wdraża.

## Etap 2. Szkielet aplikacji i system komponentów

- [x] Projekt Next.js w repo (makieta `design/` zostaje jako wzorzec).
- [x] Tokeny kolorów/fontów/cieni z makiety, fonty Montserrat + Inter przez `next/font` (self-hosting).
- [x] Layout: pasek górny, nagłówek z menu (desktop + mobilne), stopka, dolny pasek CTA na telefonie.
- [x] Komponenty: przycisk, karta, badge, przełącznik Pies/Kot, karta oferty, accordion FAQ, pola formularzy ze stanami błędu, breadcrumbs.
- [x] SEO bazowe: metadane i OG per strona, `sitemap.xml`, `robots.txt`, canonical, schema `InsuranceAgency` + `WebSite`, favicon i OG image.
- [ ] Kontrola jakości przy każdym pushu: lint, typecheck, build (GitHub Actions lub sam build w Cloudflare).

**Wynik:** pusta, ale kompletna „skorupa” strony online pod adresem podglądu.

## Etap 3. Porównywarka i oferty

- [x] Model danych ofert w JSON (pola z sekcji 6 researchu): gatunek, typ oferty, ceny „od”, warianty, zakres, karencje, OC, link partnerski, data aktualizacji.
- [x] Strona `/porownywarka`: lista renderowana statycznie (działa bez JS), filtry (gatunek, typ, wiek, budżet, OC, profilaktyka, zakup online), sortowanie, widok kart i tabeli, porównanie zaznaczonych.
- [x] Zajawka porównywarki na stronie głównej.
- [x] Przekierowania `/wycena/<partner>?src=…` przez plik `_redirects` (302 na link z ID klientki), linki z `rel="sponsored nofollow"`.
- [x] Nota o prowizji i art. 66 KC przy każdej liście ofert.

**Wynik:** działająca porównywarka z prawdziwymi linkami partnerskimi. **Akceptacja klientki:** dane i opisy ofert.

## Etap 4. Strony główne i treści sprzedażowe

- [x] Strona główna wg makiety (hero, zaufanie, porównywarka, „dlaczego warto”, o mnie, e-book, blog, FAQ, kontakt).
- [x] `/o-mnie`, `/kontakt`, `/ubezpieczenie-psa`, `/ubezpieczenie-kota` (huby SEO z tabelą, czynnikami ceny, FAQ).
- [x] Analizy produktów `/oferty/<slug>` (PZU, Generali, Bezpieczny.pl, PetHelp): zakres, warianty, karencja, wyłączenia, jak wygląda zwrot, plusy/minusy, link do OWU z wersją, CTA.
- [x] Strony prawne: `/informacja-o-agencie`, polityka prywatności, cookies, regulamin.
- [x] Schema `FAQPage`, `BreadcrumbList`, `Person` (agentka).

**Wynik:** komplet treści na start. **Akceptacja klientki:** teksty, zwłaszcza zapisy o produktach (zgodność z OWU).

## Etap 5. Blog

- [x] Wpisy w MDX w repo: lista, kategorie (pies, kot, koszty, OC, zdrowie, historie), szablon wpisu wg projektu (autor, spis treści, „W skrócie”, tabele, wstawka z ofertą, FAQ, powiązane wpisy), RSS.
- [x] Schema `BlogPosting` + `Person`, adresy bez daty (`/blog/<slug>`).
- [ ] Jeśli klientka chce edytować sama: CMS oparty na Gicie (Decap CMS lub TinaCMS) – bez opłat i bez WordPressa.
- [x] Pierwsze 3–5 wpisów z listy fraz w sekcji 8 researchu (np. „Ile kosztuje ubezpieczenie psa”, „Czy warto ubezpieczyć kota niewychodzącego”, „OC psa – kto płaci, gdy pies pogryzie”).

**Wynik:** blog z pierwszymi wpisami i szablonem do dalszego pisania.

## Etap 6. Formularze i e-book

- [x] Formularz „Poproś o kontakt”: Pages Function wysyłająca e-mail do klientki, ochrona antyspamowa Cloudflare Turnstile, zgody RODO, komunikat sukcesu/błędu.
- [ ] E-book: PDF w kolorystyce marki (treść od klientki albo przygotowana przez nas do akceptacji), landing `/ebook`, zapis przez MailerLite z podwójnym potwierdzeniem i automatyczną wysyłką PDF.

**Wynik:** leady z formularza trafiają do klientki, e-book wysyła się sam.

## Etap 7. Analityka, zgody, widoczność w Google

- [x] Baner cookies z Consent Mode v2; GA4 (lub lżejsza alternatywa, np. Plausible/Cloudflare Web Analytics bez cookies).
- [x] Zdarzenia: klik „Oblicz składkę” (z partnerem i miejscem), wysłanie formularza, zapis na e-book, klik w telefon.
- [ ] Google Search Console (domena + sitemap), Google Business Profile, jeśli klientka działa lokalnie.

**Wynik:** wiadomo, które oferty i strony przynoszą kliknięcia i leady.

## Etap 8. Testy i start

- [ ] Testy na telefonach i desktopie, Lighthouse/Core Web Vitals, dostępność (kontrast, klawiatura, etykiety pól).
- [ ] Sprawdzenie linków partnerskich i przekierowań, walidacja schema (Rich Results Test), 404, OG/podglądy w social mediach.
- [ ] Ostatnia akceptacja klientki, zdjęcie `noindex`, przepięcie domeny na wersję produkcyjną, zgłoszenie sitemap w Search Console.

**Wynik:** strona publicznie dostępna pod domeną.

## Etap 9. Po starcie (ciągle)

- Kalendarz treści (np. 2 wpisy miesięcznie): koszty leczenia, rasy, OC, historie z kosztami, strony „X czy Y” (np. PZU czy Generali).
- Aktualizacja cen i OWU co kwartał (data „Aktualizacja: …” na stronie).
- Przegląd analityki i Search Console, poprawki stron z dużą liczbą wyświetleń i małą liczbą kliknięć.
- Zbieranie opinii klientów, rozbudowa porównywarki o nowych partnerów.

---

## Hosting – dwa warianty

**A. Cloudflare Pages (rekomendowany).** Darmowy, deploy z Gita, podglądy gałęzi, `_redirects` i Pages Functions (formularze) w pakiecie. Kosztem stałym jest tylko domena i ewentualnie poczta.

**B. Klasyczny hosting (np. polska firma z FTP i pocztą).** Strona jest statyczna, więc też zadziała: GitHub Actions buduje stronę i wysyła folder `out/` przez FTP/SFTP przy każdym pushu. Różnice: przekierowania `/wycena/` przez `.htaccess`, formularz przez mały skrypt PHP albo zewnętrzną usługę, brak automatycznych podglądów gałęzi. Plus: poczta na domenie jest zwykle w cenie. Minus: sprawdź cenę odnowienia hostingu.

Jeśli kupujesz hosting z punktu B, daj znać, jaki (firma i plan) – dopasuję etapy 1 i 6.

## Kolejność i zależności

```
Etap 0 (materiały) ──────────────┐
Etap 1 (infrastruktura) ─> Etap 2 (szkielet) ─> Etap 3 (porównywarka) ─> Etap 4 (treści) ─> Etap 8 (start)
                                         └─> Etap 5 (blog) ───────────────┘          ▲
                                         └─> Etap 6 (formularze, e-book) ────────────┤
                                         └─> Etap 7 (analityka, zgody) ──────────────┘
Etap 9 – po starcie, w trybie ciągłym
```

Etapy 3–7 mogą iść równolegle po skończeniu szkieletu. Blokują je głównie materiały z etapu 0 (dane agentki, ceny, linki, e-book).
