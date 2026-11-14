#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const FORBIDDEN_PATTERNS = [/vikingo\s*store/i, /vikingostore/i];

const ALLOWED_V3_CATEGORIES = new Set([
  "experiencia-barberia",
  "cortes-por-ocasion-y-edad",
  "cortes-segun-tipo-cabello",
  "color-canas-y-estetica",
  "herramientas-de-barberia",
  "styling-y-productos",
  "fades-y-visagismo",
  "negocio-y-carrera-barberia",
  "afeitado-clasico-tradicional",
  "barba-y-minoxidil",
]);

function normalizeText(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordSet(str = "") {
  const stop = new Set(["de", "la", "el", "los", "las", "en", "y", "o", "para", "con", "sin", "un", "una", "por", "como", "que", "tu", "del", "al"]);
  return new Set(
    normalizeText(str)
      .split(" ")
      .filter((w) => w.length > 2 && !stop.has(w))
  );
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter);
}

function loadTsModule(relPath, customMocks = {}) {
  const cache = new Map();
  function requireLocal(spec, fromFile) {
    if (customMocks[spec]) return customMocks[spec];
    let resolved;
    if (spec.startsWith("@/")) {
      resolved = path.join(ROOT, "src", spec.slice(2));
    } else if (spec.startsWith(".")) {
      resolved = path.resolve(path.dirname(fromFile), spec);
    } else {
      throw new Error(`Unsupported import in blog data: ${spec} from ${fromFile}`);
    }
    if (!resolved.endsWith(".ts") && fs.existsSync(resolved + ".ts")) {
      resolved += ".ts";
    } else if (!resolved.endsWith(".tsx") && fs.existsSync(resolved + ".tsx")) {
      resolved += ".tsx";
    }
    return evalFile(resolved);
  }

  function evalFile(absPath) {
    if (cache.has(absPath)) return cache.get(absPath).exports;
    const source = fs.readFileSync(absPath, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
      fileName: absPath,
    }).outputText;

    const mod = { exports: {} };
    cache.set(absPath, mod);
    const fn = new Function("exports", "require", "module", "__filename", "__dirname", transpiled);
    fn(mod.exports, (s) => requireLocal(s, absPath), mod, absPath, path.dirname(absPath));
    return mod.exports;
  }

  return evalFile(path.join(ROOT, relPath));
}

function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const mocks = {
  "@/lib/barberias": {
    YOU_MINOX_URL: "https://youminox.com",
    SITE_URL: "https://guiadebarberias.com",
  },
  "@/data/blog-posts": {},
};

const { PILLAR_ARTICLES } = loadTsModule("src/data/blog-pillars.ts", mocks);
const { BLOG_V3_ARTICLES } = loadTsModule("src/data/blog-v3.ts", mocks);
const { getLegacyBlogRedirect } = loadTsModule("src/data/blog-legacy-redirects.ts", mocks);

const errors = [];
const warnings = [];

const allArticles = [
  ...PILLAR_ARTICLES.map((p, i) => ({
    ...p,
    isPillar: true,
    focusKeyword: p.seoTitle || p.title,
    categorySlug: i === 1 || i === 3 ? "fades-y-visagismo" : "barba-y-minoxidil",
  })),
  ...BLOG_V3_ARTICLES.map((a) => ({ ...a, isPillar: false })),
];

console.log(`Auditing ${PILLAR_ARTICLES.length} pillars + ${BLOG_V3_ARTICLES.length} new v3 articles = ${allArticles.length} total articles...`);

if (BLOG_V3_ARTICLES.length !== 100) {
  errors.push(`Expected exactly 100 BLOG_V3_ARTICLES, found ${BLOG_V3_ARTICLES.length}.`);
}
if (allArticles.length !== 105) {
  errors.push(`Expected 105 total articles (5 pillars + 100 new), found ${allArticles.length}.`);
}

const seenIds = new Map();
const seenSlugs = new Map();
const seenTitles = new Map();
const seenSeoTitles = new Map();
const seenKeywords = new Map();
const seenImages = new Map();
const categoryCounts = new Map();

for (const art of allArticles) {
  if (seenIds.has(art.id)) {
    errors.push(`Duplicate id ${art.id}: "${art.slug}" vs "${seenIds.get(art.id)}"`);
  }
  seenIds.set(art.id, art.slug);

  if (seenSlugs.has(art.slug)) {
    errors.push(`Duplicate slug "${art.slug}"`);
  }
  seenSlugs.set(art.slug, art.id);

  if (getLegacyBlogRedirect(art.slug)) {
    errors.push(`Slug "${art.slug}" collides with a legacy redirect slug!`);
  }

  const nt = normalizeText(art.title);
  if (seenTitles.has(nt)) {
    errors.push(`Duplicate normalized title "${art.title}" (matches "${seenTitles.get(nt)}")`);
  }
  seenTitles.set(nt, art.slug);

  const nst = normalizeText(art.seoTitle);
  if (seenSeoTitles.has(nst)) {
    errors.push(`Duplicate normalized seoTitle "${art.seoTitle}" (matches "${seenSeoTitles.get(nst)}")`);
  }
  seenSeoTitles.set(nst, art.slug);

  const nkw = normalizeText(art.focusKeyword);
  if (!nkw) {
    errors.push(`Missing focusKeyword on "${art.slug}"`);
  } else if (seenKeywords.has(nkw)) {
    errors.push(`Duplicate focusKeyword "${art.focusKeyword}" between "${art.slug}" and "${seenKeywords.get(nkw)}"`);
  }
  seenKeywords.set(nkw, art.slug);

  if (seenImages.has(art.imageUrl)) {
    errors.push(`Duplicate imageUrl "${art.imageUrl}" between "${art.slug}" and "${seenImages.get(art.imageUrl)}"`);
  }
  seenImages.set(art.imageUrl, art.slug);

  if (!art.isPillar) {
    if (!ALLOWED_V3_CATEGORIES.has(art.categorySlug)) {
      errors.push(`Invalid categorySlug "${art.categorySlug}" on "${art.slug}"`);
    }
    if (!art.imageUrl.startsWith("/images/blog-v3/") || !art.imageUrl.endsWith(".webp")) {
      errors.push(`Article "${art.slug}" imageUrl must be /images/blog-v3/<slug>.webp, got "${art.imageUrl}"`);
    }
    const plain = stripHtml(art.content);
    const words = plain.split(/\s+/).filter(Boolean).length;
    if (words < 380) {
      errors.push(`Article "${art.slug}" content too short (${words} words; min 380).`);
    }
    if (!Array.isArray(art.keyTakeaways) || art.keyTakeaways.length < 3) {
      errors.push(`Article "${art.slug}" must have >= 3 keyTakeaways.`);
    }
    if (!Array.isArray(art.toc) || art.toc.length < 3) {
      errors.push(`Article "${art.slug}" must have >= 3 toc items.`);
    }
    if (!Array.isArray(art.faqs) || art.faqs.length < 3) {
      errors.push(`Article "${art.slug}" must have >= 3 faqs.`);
    }
    if (!art.imageAlt || art.imageAlt.length < 20) {
      errors.push(`Article "${art.slug}" imageAlt too short.`);
    }
  }

  categoryCounts.set(art.categorySlug, (categoryCounts.get(art.categorySlug) || 0) + 1);

  const fullBlob = [
    art.title,
    art.seoTitle,
    art.excerpt,
    art.content,
    ...(art.keyTakeaways || []),
    ...(art.faqs || []).flatMap((f) => [f.question, f.answer]),
  ].join("\n");

  for (const pat of FORBIDDEN_PATTERNS) {
    if (pat.test(fullBlob)) {
      errors.push(`FORBIDDEN TERM matched (${pat}) inside article "${art.slug}"`);
    }
  }

  // Verify no internal blog links point to legacy redirected URLs
  const hrefMatches = [...(art.content || "").matchAll(/href="(\/blog\/([^"\/#]+)\/?)"/g)];
  const allValidSlugs = new Set([
    ...PILLAR_ARTICLES.map((p) => p.slug),
    ...BLOG_V3_ARTICLES.map((a) => a.slug),
  ]);
  for (const m of hrefMatches) {
    const linkedSlug = m[2];
    if (!allValidSlugs.has(linkedSlug)) {
      errors.push(`Broken internal blog link href="${m[1]}" in "${art.slug}"`);
    }
  }
}

// Check pairwise keyword & seoTitle similarity for cannibalization
for (let i = 0; i < allArticles.length; i++) {
  const aKw = wordSet(allArticles[i].focusKeyword);
  const aTitle = wordSet(allArticles[i].seoTitle);
  for (let j = i + 1; j < allArticles.length; j++) {
    const bKw = wordSet(allArticles[j].focusKeyword);
    const bTitle = wordSet(allArticles[j].seoTitle);
    const kwSim = jaccard(aKw, bKw);
    const tSim = jaccard(aTitle, bTitle);
    if (kwSim >= 0.85) {
      errors.push(`Keyword cannibalization (${(kwSim * 100).toFixed(0)}%): "${allArticles[i].slug}" vs "${allArticles[j].slug}"`);
    } else if (tSim >= 0.82) {
      warnings.push(`Similar SEO titles (${(tSim * 100).toFixed(0)}%): "${allArticles[i].slug}" vs "${allArticles[j].slug}"`);
    }
  }
}

console.log("\nCategory distribution:");
for (const [cat, count] of [...categoryCounts.entries()].sort()) {
  console.log(`  - ${cat}: ${count}`);
}

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings.slice(0, 20)) console.log(`  WARN: ${w}`);
}

if (errors.length) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 50)) console.error(`  ERR: ${e}`);
  process.exit(1);
}

console.log("\nPASS: 0 errors, 105 articles unique across slug/title/keyword/imageUrl, 0 forbidden terms.");
