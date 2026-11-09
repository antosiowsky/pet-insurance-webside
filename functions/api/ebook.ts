import { escapeHtml, isEmail, json, MOCK_MESSAGE, readBody, verifyTurnstile, type Env } from '../_shared/forms';

const PDF_PATH = '/ebook/na-co-uwazac-ubezpieczenie-psa-i-kota.pdf';
const PDF_FILENAME = 'na-co-uwazac-ubezpieczenie-psa-i-kota.pdf';

/**
 * E-book: wysyłka PDF do odwiedzającego przez Resend (link + załącznik, jeśli uda się pobrać plik).
 * Opcjonalnie powiadomienie na CONTACT_TO_EMAIL. MailerLite nie jest wymagany.
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

  if (!env.RESEND_API_KEY) {
    console.log('[ebook:mock]', email, data.page);
    return json({ ok: true, mock: true, message: MOCK_MESSAGE });
  }

  const origin = new URL(request.url).origin;
  const pdfUrl = `${origin}${PDF_PATH}`;
  const from = env.CONTACT_FROM_EMAIL || 'kontakt@zdrowyogonek.pl';

  const attachments: { filename: string; content: string }[] = [];
  try {
    const pdfRes = await fetch(pdfUrl);
    if (pdfRes.ok) {
      const buf = new Uint8Array(await pdfRes.arrayBuffer());
      if (buf.byteLength > 0 && buf.byteLength < 5_000_000) {
        let binary = '';
        const chunk = 0x8000;
        for (let i = 0; i < buf.length; i += chunk) binary += String.fromCharCode(...buf.subarray(i, i + chunk));
        attachments.push({ filename: PDF_FILENAME, content: btoa(binary) });
      }
    }
  } catch (e) {
    console.warn('[ebook] pdf attach skipped', e);
  }

  const visitorHtml = `
    <p>Cześć!</p>
    <p>Dziękuję za zainteresowanie. Oto e-book <strong>„Na co uważać przy ubezpieczeniu psa i kota”</strong>.</p>
    <p><a href="${escapeHtml(pdfUrl)}">Pobierz PDF</a>${attachments.length ? ' (w załączeniu też jest kopia pliku)' : ''}.</p>
    <p>Wersja online: <a href="${escapeHtml(origin)}/ebook/poradnik">${escapeHtml(origin)}/ebook/poradnik</a></p>
    <p>Jeśli masz pytania o polisę – napisz lub zadzwoń. Pozdrawiam,<br/>Anita Grzenia</p>
  `;

  const sendVisitor = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      subject: 'Twój e-book: Na co uważać przy ubezpieczeniu psa i kota',
      html: visitorHtml,
      ...(attachments.length ? { attachments } : {}),
    }),
  });

  if (!sendVisitor.ok) {
    console.error('[ebook] resend visitor error', sendVisitor.status, await sendVisitor.text());
    return json({ ok: false, message: 'Nie udało się wysłać e-booka. Spróbuj ponownie za chwilę albo pobierz PDF ze strony.' }, 502);
  }

  if (env.CONTACT_TO_EMAIL) {
    const notify = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: env.CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
        subject: `Lead e-book: ${email}`,
        html: `<p>Nowy zapis na e-book.</p><p><strong>E-mail:</strong> ${escapeHtml(email)}</p><p><strong>Strona:</strong> ${escapeHtml(data.page || '—')}</p>`,
      }),
    });
    if (!notify.ok) console.error('[ebook] resend notify error', notify.status, await notify.text());
  }

  return json({
    ok: true,
    message: 'Gotowe! Sprawdź skrzynkę – wysłałam e-booka (oraz link do PDF). Jeśli nie widzisz wiadomości, zajrzyj do spamu.',
  });
};

export const onRequest: PagesFunction<Env> = async () => json({ ok: false, message: 'Metoda niedozwolona.' }, 405);
