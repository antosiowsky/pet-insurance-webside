import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { AgentPhoto } from '@/components/AgentPhoto';
import { mdxComponents } from '@/components/blog/MdxComponents';
import { PostCard } from '@/components/blog/PostCard';
import { EbookCover, EbookCta } from '@/components/sections/EbookCta';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge, btn } from '@/components/ui';
import { site } from '@/config/site';
import { categories, formatDate, getAllPosts, getPost } from '@/lib/blog';
import { absoluteUrl, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    image: p.image,
    type: 'article',
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line bg-sand/60">
          <div className="container-page max-w-4xl py-10 lg:py-14">
            <Breadcrumbs
              items={[
                { name: 'Poradniki', path: '/blog' },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <Badge tone="brand" className="mt-6">
              {categories[post.category]}
            </Badge>
            <h1 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{post.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <AgentPhoto size={48} className="ring-4" />
              <div className="text-sm">
                <p className="font-semibold text-ink-900">
                  <Link href="/o-mnie" className="hover:text-brand-600">
                    {site.agent.name.value}
                  </Link>
                  , {site.agent.role}
                </p>
                <p className="text-ink-500">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.updated && <> · aktualizacja {formatDate(post.updated)}</>} · {post.readingMinutes} min czytania
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-14">
          <div className="mx-auto w-full max-w-[720px]">
            <Image src={post.image} alt={post.imageAlt} width={1200} height={675} priority className="aspect-video w-full rounded-xl2 object-cover" />
            {post.headings.length > 2 && (
              <details className="mt-8 rounded-card border border-line bg-white p-5 lg:hidden">
                <summary className="cursor-pointer font-heading font-bold text-ink-900">Spis treści</summary>
                <ol className="mt-3 space-y-2 text-[15px]">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-ink-600 hover:text-brand-600">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <div className="prose-article prose prose-lg mt-8 max-w-none prose-headings:font-bold prose-a:font-semibold">{content}</div>

            <div className="mt-12 flex flex-col gap-5 rounded-card bg-sand p-6 sm:flex-row sm:items-center">
              <AgentPhoto size={88} />
              <div>
                <p className="font-heading text-lg font-bold text-ink-900">{site.agent.name.value}</p>
                <p className="text-sm text-ink-500">
                  {site.agent.role[0].toUpperCase() + site.agent.role.slice(1)} · nr KNF {site.agent.knfNumber.value}
                </p>
                <p className="mt-2 text-ink-600">{site.agent.bio.value}</p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {post.headings.length > 0 && (
                <nav aria-label="Spis treści" className="rounded-card border border-line bg-white p-5">
                  <p className="font-heading font-bold text-ink-900">Spis treści</p>
                  <ol className="mt-3 space-y-2.5 text-sm">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-ink-600 hover:text-brand-600">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="rounded-card bg-ink-900 p-5 text-white">
                <p className="font-heading text-lg font-bold">Porównaj oferty</p>
                <p className="mt-1 text-sm text-ink-200">Ubezpieczenia i pakiety dla psa i kota w jednym miejscu.</p>
                <Link href="/porownywarka" className={`${btn.primary} mt-4 w-full py-2.5 text-sm`}>
                  Przejdź do porównywarki
                </Link>
              </div>
              <Link href="/ebook" className="block rounded-card border border-line bg-white p-5 text-center hover:border-brand-600">
                <EbookCover className="mx-auto w-40 rotate-0 shadow-card md:w-44" />
                <p className="mt-4 font-semibold text-ink-900">Pobierz darmowy e-book →</p>
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section className="container-page pb-16">
        <h2 className="text-2xl font-bold">Przeczytaj też</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <EbookCta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          image: absoluteUrl(post.image),
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: 'pl-PL',
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          author: { '@type': 'Person', '@id': `${site.url}/#agent`, name: site.agent.name.value, url: absoluteUrl('/o-mnie') },
          publisher: { '@id': `${site.url}/#agency` },
        }}
      />
    </>
  );
}
