# Anita Grzenia Ubezpieczenia – strona www

Strona wizytówka agentki ubezpieczeniowej (ubezpieczenia psa i kota): porównywarka ofert, analizy produktów, blog, e-book, formularz kontaktowy.

Next.js (App Router, statyczny eksport) + Tailwind CSS 4, hosting na Cloudflare Pages z Pages Functions dla formularzy.

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statyczna strona w folderze out/
npm run typecheck
npm run preview    # out/ + Pages Functions lokalnie (wrangler), http://localhost:8788
```

## Struktura

- `src/config/site.ts` – **jedno miejsce na dane klientki** (KNF, NIP, telefon, ceny „od”, opinie, zdjęcie). Wartości oznaczone `ph(...)` to placeholdery; ich lista jest na stronie `/placeholdery` (noindex).
- `src/data/offers.ts` – oferty do porównywarki i stron `/oferty/<slug>`.
- `content/blog/*.mdx` – wpisy na blogu (frontmatter: title, description, date, category, image).
- `public/_redirects` – przekierowania `/wycena/<partner>` na linki partnerskie.
- `functions/api/contact.ts`, `functions/api/ebook.ts` – formularze. Bez kluczy API działają w trybie testowym i wyraźnie informują, że zgłoszenie nie zostało wysłane.
- `design/` – makieta HTML (wzorzec wyglądu, osobny projekt podglądu).

## Zmienne środowiskowe (Cloudflare Pages → Settings → Variables and secrets)

Zobacz `.env.example`. Zmienne `NEXT_PUBLIC_*` są wbudowywane w czasie builda – po zmianie trzeba zrobić nowy deploy.

Strona jest domyślnie ukryta przed wyszukiwarkami (`noindex`, `robots.txt` blokuje wszystko). Indeksowanie włącza `NEXT_PUBLIC_ALLOW_INDEXING=true` – dopiero po akceptacji treści i danych przez klientkę.
