import { PostCard } from '@/components/blog/PostCard';
import { PageHeader } from '@/components/PageHeader';
import { EbookCta } from '@/components/sections/EbookCta';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Poradniki o ubezpieczeniu psa i kota',
  description: 'Praktyczne poradniki: ile kosztuje ubezpieczenie psa, karencja, OC psa, ubezpieczenie kota domowego i pakiety weterynaryjne.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Poradniki', path: '/blog' }]}
        title="Poradniki dla opiekunów psów i kotów"
        lead="Piszę prosto o tym, co ważne przy wyborze ubezpieczenia: kosztach leczenia, karencjach, OC i pułapkach w warunkach polis."
      />
      <section className="container-page py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <EbookCta />
    </>
  );
}
