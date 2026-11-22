import {
  HERRAMIENTA_CLUSTERS,
  type HerramientaArticle,
  type HerramientaCluster,
  type HerramientaSeed,
  type HerramientaSummary,
} from "./herramientas-types";
import { HERRAMIENTAS_A } from "./herramientas-a";
import { HERRAMIENTAS_B } from "./herramientas-b";
import { HERRAMIENTAS_C } from "./herramientas-c";
import { HERRAMIENTAS_D } from "./herramientas-d";
import { HERRAMIENTAS_E } from "./herramientas-e";

export {
  HERRAMIENTA_CLUSTERS,
  type HerramientaArticle,
  type HerramientaCluster,
  type HerramientaSeed,
  type HerramientaSummary,
};

export const ALL_HERRAMIENTAS_SEEDS: HerramientaSeed[] = [
  ...HERRAMIENTAS_A,
  ...HERRAMIENTAS_B,
  ...HERRAMIENTAS_C,
  ...HERRAMIENTAS_D,
  ...HERRAMIENTAS_E,
];

function slugifyHeading(text: string, idx: number): string {
  const clean = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return clean || `seccion-${idx + 1}`;
}

function renderParagraphsHtml(paragraphs: string[]): string {
  return paragraphs
    .map((p) => {
      if (p.includes("\n")) {
        const lines = p
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        const listItems = lines.filter((l) => l.startsWith("•") || /^\d+\)/.test(l));
        if (listItems.length >= 2) {
          return `<ul>${lines
            .map((l) => `<li>${l.replace(/^(•|\d+\))\s*/, "")}</li>`)
            .join("")}</ul>`;
        }
      }
      return `<p>${p}</p>`;
    })
    .join("\n");
}

function hydrateHerramientaArticle(seed: HerramientaSeed): HerramientaArticle {
  const toc = seed.sections.map((sec, idx) => ({
    id: slugifyHeading(sec.heading, idx),
    label: sec.heading,
  }));

  const splitIndex = Math.max(1, Math.ceil(seed.sections.length / 2));

  const firstSections = seed.sections.slice(0, splitIndex);
  const secondSections = seed.sections.slice(splitIndex);

  const contentFirstHalf = firstSections
    .map((sec, idx) => {
      const id = toc[idx].id;
      return `<section id="${id}"><h2>${sec.heading}</h2>${renderParagraphsHtml(
        sec.paragraphs
      )}</section>`;
    })
    .join("\n");

  const contentSecondHalf = secondSections
    .map((sec, idx) => {
      const id = toc[splitIndex + idx].id;
      return `<section id="${id}"><h2>${sec.heading}</h2>${renderParagraphsHtml(
        sec.paragraphs
      )}</section>`;
    })
    .join("\n");

  return {
    ...seed,
    clusterLabel: HERRAMIENTA_CLUSTERS[seed.cluster],
    toc,
    contentFirstHalf,
    contentSecondHalf,
  };
}

let cachedArticles: HerramientaArticle[] | null = null;

export function getAllHerramientasArticles(): HerramientaArticle[] {
  if (!cachedArticles) {
    cachedArticles = ALL_HERRAMIENTAS_SEEDS.map(hydrateHerramientaArticle);
  }
  return cachedArticles;
}

export function getAllHerramientasSummaries(): HerramientaSummary[] {
  return getAllHerramientasArticles().map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    cluster: a.cluster,
    clusterLabel: a.clusterLabel,
    brand: a.brand,
    badgeLabel: a.badgeLabel,
    imageUrl: a.imageUrl,
    imageAlt: a.imageAlt,
    readTime: a.readTime,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
  }));
}

export function getHerramientaBySlug(slug: string): HerramientaArticle | undefined {
  return getAllHerramientasArticles().find((a) => a.slug === slug);
}

export function getRelatedHerramientas(
  currentSlug: string,
  limit = 4
): HerramientaSummary[] {
  const all = getAllHerramientasSummaries();
  const current = all.find((a) => a.slug === currentSlug);
  if (!current) return all.slice(0, limit);

  const sameCluster = all.filter(
    (a) => a.slug !== currentSlug && a.cluster === current.cluster
  );
  const others = all.filter(
    (a) => a.slug !== currentSlug && a.cluster !== current.cluster
  );

  const curIdx = sameCluster.findIndex((a) => a.id > current.id);
  const rotatedSame =
    curIdx >= 0
      ? [...sameCluster.slice(curIdx), ...sameCluster.slice(0, curIdx)]
      : sameCluster;

  return [...rotatedSame, ...others].slice(0, limit);
}
