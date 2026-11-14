import type { CategorySlug, ArticleLayoutVariant } from "@/data/blog-posts";

export type BlogV3CategorySlug =
  | "experiencia-barberia"
  | "cortes-por-ocasion-y-edad"
  | "cortes-segun-tipo-cabello"
  | "color-canas-y-estetica"
  | "herramientas-de-barberia"
  | "styling-y-productos"
  | "fades-y-visagismo"
  | "negocio-y-carrera-barberia"
  | "afeitado-clasico-tradicional"
  | "barba-y-minoxidil";

export interface BlogV3ArticleSeed {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  focusKeyword: string;
  excerpt: string;
  categorySlug: BlogV3CategorySlug;
  layoutVariant: ArticleLayoutVariant | "editorial";
  badgeLabel: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  author: string;
  authorRole: string;
  imageUrl: string;
  imageAlt: string;
  imagePrompt: string;
  keyTakeaways: string[];
  toc: { id: string; label: string }[];
  content: string;
  faqs: { question: string; answer: string }[];
  relatedCitySlugs: string[];
  /** Slugs of sibling/hub articles used by contextual links inside content */
  hubSlug?: string;
}

export type LegacyOrNewCategorySlug = CategorySlug | BlogV3CategorySlug;
