import { getTopNationalBarberias, type BarberShop } from "@/lib/barberias";
import { PILLAR_ARTICLES } from "./blog-pillars";
import {
  BLOG_V3_ARTICLES,
  BLOG_V3_CATEGORIES,
  BLOG_V3_CATEGORY_DESCRIPTIONS,
} from "./blog-v3";
import type { BlogV3ArticleSeed, BlogV3CategorySlug } from "./blog-v3-types";

export type CategorySlug = BlogV3CategorySlug;

export type ArticleLayoutVariant =
  | "geoperu"
  | "geomundo"
  | "comparativa"
  | "timeline"
  | "clinico"
  | "barberia"
  | "editorial";

export const BLOG_CATEGORIES: Record<CategorySlug, string> = BLOG_V3_CATEGORIES;

export const CATEGORY_DESCRIPTIONS: Record<CategorySlug, string> =
  BLOG_V3_CATEGORY_DESCRIPTIONS;

export interface GeoPeruInfo {
  locationName: string;
  regionLabel: string;
  climateNote: string;
  avenuesNote: string;
  deliveryTime: string;
}

export interface GeoMundoInfo {
  locationName: string;
  flag: string;
  regulator: string;
  currency: string;
  localBrands: string;
}

export interface BlogArticleSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: CategorySlug;
  publishedAt: string;
  readTime: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  layoutVariant: ArticleLayoutVariant;
  badgeLabel: string;
}

export interface BlogArticle extends BlogArticleSummary {
  seoTitle: string;
  updatedAt: string;
  authorRole: string;
  secondaryImageUrl?: string;
  keyTakeaways: string[];
  toc: { id: string; label: string }[];
  content: string;
  faqs: { question: string; answer: string }[];
  relatedCitySlugs: string[];
  geoPeruInfo?: GeoPeruInfo;
  geoMundoInfo?: GeoMundoInfo;
  localBarberias?: BarberShop[];
}

function buildV3Article(seed: BlogV3ArticleSeed): BlogArticle {
  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    seoTitle: seed.seoTitle,
    excerpt: seed.excerpt,
    category: BLOG_CATEGORIES[seed.categorySlug],
    categorySlug: seed.categorySlug,
    layoutVariant: seed.layoutVariant,
    badgeLabel: seed.badgeLabel,
    publishedAt: seed.publishedAt,
    updatedAt: seed.updatedAt,
    readTime: seed.readTime,
    author: seed.author,
    authorRole: seed.authorRole,
    imageUrl: seed.imageUrl,
    imageAlt: seed.imageAlt,
    keyTakeaways: seed.keyTakeaways,
    toc: seed.toc,
    content: seed.content,
    faqs: seed.faqs,
    relatedCitySlugs: seed.relatedCitySlugs,
  };
}

// Enrich the 5 pillar articles (IDs 1..5) using the unified 10 editorial categories
const ENRICHED_PILLARS: BlogArticle[] = PILLAR_ARTICLES.map((p, idx) => {
  const topBarbs = getTopNationalBarberias(4);
  const categorySlug: CategorySlug =
    idx === 1 || idx === 3 ? "fades-y-visagismo" : "barba-y-minoxidil";
  const variant: ArticleLayoutVariant =
    idx === 0
      ? "timeline"
      : idx === 1
      ? "barberia"
      : idx === 2
      ? "clinico"
      : idx === 3
      ? "barberia"
      : "comparativa";

  return {
    ...p,
    category: BLOG_CATEGORIES[categorySlug],
    categorySlug,
    layoutVariant: variant,
    badgeLabel: "💈 Guía Pilar Oficial",
    localBarberias: topBarbs,
  };
});

export const BLOG_ARTICLES: BlogArticle[] = [
  ...ENRICHED_PILLARS,
  ...BLOG_V3_ARTICLES.map(buildV3Article),
];

export const BLOG_SUMMARIES: BlogArticleSummary[] = BLOG_ARTICLES.map((a) => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  category: a.category,
  categorySlug: a.categorySlug,
  publishedAt: a.publishedAt,
  readTime: a.readTime,
  author: a.author,
  imageUrl: a.imageUrl,
  imageAlt: a.imageAlt,
  layoutVariant: a.layoutVariant,
  badgeLabel: a.badgeLabel,
}));

const articleBySlugMap = new Map<string, BlogArticle>();
for (const a of BLOG_ARTICLES) {
  articleBySlugMap.set(a.slug, a);
}

export function getAllBlogArticles(): BlogArticle[] {
  return BLOG_ARTICLES;
}

export function getAllBlogArticleSummaries(): BlogArticleSummary[] {
  return BLOG_SUMMARIES;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return articleBySlugMap.get(slug);
}

export function getRelatedBlogArticles(
  currentSlug: string,
  limit = 4
): BlogArticle[] {
  const current = articleBySlugMap.get(currentSlug);
  if (!current) return BLOG_ARTICLES.slice(0, limit);

  const sameCat = BLOG_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.categorySlug === current.categorySlug
  );
  if (sameCat.length >= limit) {
    const start = (current.id * 3) % sameCat.length;
    const picked: BlogArticle[] = [];
    for (let i = 0; i < sameCat.length && picked.length < limit; i++) {
      picked.push(sameCat[(start + i) % sameCat.length]);
    }
    return picked;
  }
  return [
    ...sameCat,
    ...BLOG_ARTICLES.filter((a) => a.slug !== currentSlug && !sameCat.includes(a)),
  ].slice(0, limit);
}
