import Image from 'next/image';
import Link from 'next/link';
import { categories, formatDate, type PostMeta } from '@/lib/blog';
import { Badge } from '../ui';

const tone = { koszty: 'brand', kot: 'ink', pies: 'ink', oc: 'honey', warunki: 'ink', porownania: 'success' } as const;

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group overflow-hidden rounded-card border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
      <Image src={post.image} alt={post.imageAlt} width={800} height={500} className="aspect-[16/10] w-full object-cover" />
      <div className="p-5">
        <Badge tone={tone[post.category]}>{categories[post.category]}</Badge>
        <h3 className="mt-3 text-lg leading-snug font-bold group-hover:text-brand-600">{post.title}</h3>
        <p className="mt-2 text-sm text-ink-500">
          {post.readingMinutes} min czytania · <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
    </Link>
  );
}
