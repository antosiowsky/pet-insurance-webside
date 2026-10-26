import { escapeHtml, isEmail, json, MOCK_MESSAGE, readBody, verifyTurnstile, type Env } from '../_shared/forms';

const AGE: Record<string, string> = { '0-1': 'do 1 roku', '1-3': '1–3 lata', '4-7': '4–7 lat', '8-10': '8–10 lat', '10+': 'ponad 10 lat' };

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readBody(request);
  if (data.company) return json({ ok: true });

  const name = data.name?.trim() ?? '';
  const phone = (data.phone ?? '').replace(/[^\d+ ]/g, '').trim();
  if (!name || phone.replace(/\D/g, '').length < 9) return json({ ok: false, message: 'Uzupełnij imię i poprawny numer telefonu.' }, 400);
  if (data.consent !== 'tak') return json({ ok: false, message: 'Potrzebna jest zgoda na kontakt.' }, 400);
  if (data.email && !isEmail(data.email)) return json({ ok: false, message: 'Nieprawidłowy adres e-mail.' }, 400);
  if (!(await verifyTurnstile(env, data['cf-turnstile-response'], request.headers.get('CF-Connecting-IP')))) {
    return json({ ok: false, message: 'Nie udało się potwierdzić, że nie jesteś robotem. Odśwież stronę i spróbuj ponownie.' }, 400);
  }

  const rows: [string, string][] = [
    ['Imię', name],
    ['Telefon', phone],
    ['E-mail', data.email || '—'],
    ['Pupil', data.species || '—'],
    ['Wiek pupila', AGE[data.age] ?? (data.age || '—')],
    ['Wiadomość', data.message || '—'],
    ['Strona', data.page || '—'],
    ['Zgoda na kontakt', 'tak'],
  ];

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.log('[contact:mock]', JSON.stringify(Object.fromEntries(rows)));
    return json({ ok: true, mock: true, message: MOCK_MESSAGE });
  }

  const html = `<h2>Nowa prośba o kontakt</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || 'Formularz <onboarding@resend.dev>',
      to: env.CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
      reply_to: data.email && isEmail(data.email) ? data.email : undefined,
      subject: `Prośba o kontakt: ${name} (${data.species || 'pupil'})`,
      html,
    }),
  });
  if (!res.ok) {
    console.error('[contact] resend error', res.status, await res.text());
    return json({ ok: false, message: 'Nie udało się wysłać zgłoszenia.' }, 502);
  }
  return json({ ok: true, message: 'Dziękuję! Oddzwonię najszybciej, jak to możliwe.' });
};

export const onRequest: PagesFunction<Env> = async () => json({ ok: false, message: 'Metoda niedozwolona.' }, 405);
