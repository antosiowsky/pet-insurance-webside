import { isEmail, json, MOCK_MESSAGE, readBody, verifyTurnstile, type Env } from '../_shared/forms';

/**
 * Zapis na e-book przez MailerLite. W MailerLite: grupa „E-book” z podwójnym potwierdzeniem (double opt-in)
 * i automatyzacją, która po potwierdzeniu wysyła link do PDF.
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readBody(request);
  if (data.company) return json({ ok: true });

  const email = data.email?.trim().toLowerCase() ?? '';
  if (!isEmail(email)) return json({ ok: false, message: 'Podaj poprawny adres e-mail.' }, 400);
  if (data.consent !== 'tak') return json({ ok: false, message: 'Zaznacz zgodę, żebym mogła wysłać e-book.' }, 400);
  if (!(await verifyTurnstile(env, data['cf-turnstile-response'], request.headers.get('CF-Connecting-IP')))) {
    return json({ ok: false, message: 'Nie udało się potwierdzić, że nie jesteś robotem. Odśwież stronę i spróbuj ponownie.' }, 400);
  }

  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_GROUP_ID) {
    console.log('[ebook:mock]', email, data.page);
    return json({ ok: true, mock: true, message: MOCK_MESSAGE });
  }

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.MAILERLITE_API_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      groups: [env.MAILERLITE_GROUP_ID],
      status: 'unconfirmed',
      fields: { source: data.page || 'strona' },
      opted_in_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      optin_ip: request.headers.get('CF-Connecting-IP') ?? undefined,
    }),
  });
  if (!res.ok) {
    console.error('[ebook] mailerlite error', res.status, await res.text());
    return json({ ok: false, message: 'Nie udało się zapisać adresu. Spróbuj ponownie za chwilę.' }, 502);
  }
  return json({ ok: true, message: 'Gotowe! Sprawdź skrzynkę i potwierdź zapis – e-book przyjdzie w kolejnej wiadomości.' });
};

export const onRequest: PagesFunction<Env> = async () => json({ ok: false, message: 'Metoda niedozwolona.' }, 405);
