import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';

export const categories = {
  koszty: 'Koszty',
  kot: 'Kot',
  pies: 'Pies',
  oc: 'OC psa',
  warunki: 'Warunki polis',
  porownania: 'Porównania',
} as const;
export type Category = keyof typeof categories;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: Category;
  image: string;
  imageAlt: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string; headings: { id: string; text: string }[] };

const DIR = path.join(process.cwd(), 'content', 'blog');

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const slugger = new GithubSlugger();
  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = m[1].trim();
    return { text, id: slugger.slug(text) };
  });
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    category: data.category,
    image: data.image,
    imageAlt: data.imageAlt ?? '',
    readingMinutes: Math.max(2, Math.round(words / 200)),
    content,
    headings,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export const formatDate = (d: string) => new Date(d).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
