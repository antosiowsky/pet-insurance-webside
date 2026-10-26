export type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  MAILERLITE_API_KEY?: string;
  MAILERLITE_GROUP_ID?: string;
  TURNSTILE_SECRET_KEY?: string;
};

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

export async function readBody(request: Request): Promise<Record<string, string>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v ?? '').slice(0, 2000)]));
  }
  const form = await request.formData();
  return Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v).slice(0, 2000)]));
}

/** Weryfikacja Turnstile – pomijana, gdy nie ustawiono TURNSTILE_SECRET_KEY. */
export async function verifyTurnstile(env: Env, token: string | undefined, ip: string | null) {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

export const MOCK_MESSAGE = 'Tryb testowy: formularz działa, ale wysyłka nie jest jeszcze skonfigurowana – zgłoszenie nie zostało przekazane.';
