export type HerramientaCluster =
  | "resena"
  | "comparativa"
  | "guia-compra"
  | "info-tecnica";

export const HERRAMIENTA_CLUSTERS: Record<HerramientaCluster, string> = {
  resena: "Reseñas de Máquinas & Herramientas",
  comparativa: "Comparativas Producto vs Producto",
  "guia-compra": "Guías de Compra & Rankings Pro",
  "info-tecnica": "Info Técnica, Repuestos & Mantenimiento",
};

export interface HerramientaSeed {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  cluster: HerramientaCluster;
  brand: string;
  badgeLabel: string;
  imageUrl: string;
  imageAlt: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  /** 3 keys from BARBER_CATALOG in src/lib/amazon.ts */
  amazonProductKeys: [string, string, string];
  /** Technical specs table rows */
  specs: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  keyTakeaways: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
}

export interface HerramientaArticle extends HerramientaSeed {
  clusterLabel: string;
  toc: { id: string; label: string }[];
  contentFirstHalf: string;
  contentSecondHalf: string;
}

export interface HerramientaSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cluster: HerramientaCluster;
  clusterLabel: string;
  brand: string;
  badgeLabel: string;
  imageUrl: string;
  imageAlt: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
}
