import { site } from '@/config/site';

/** Opinie pokazujemy dopiero, gdy w configu są prawdziwe (placeholder: false). */
export function Reviews() {
  const reviews = site.trust.reviews;
  if (reviews.placeholder || reviews.value.length === 0) return null;
  return (
    <section className="container-page pb-16 lg:pb-20">
      <h2 className="text-3xl font-bold">Co mówią klienci</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {reviews.value.map((r) => (
          <figure key={r.author} className="rounded-card border border-line bg-white p-6 shadow-card">
            <p className="text-honey-400" aria-label="5 na 5">
              ★★★★★
            </p>
            <blockquote className="mt-3 text-lg leading-relaxed text-ink-800">„{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-ink-500">{r.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
