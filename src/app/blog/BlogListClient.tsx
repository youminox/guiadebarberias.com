"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BLOG_CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  type BlogArticleSummary,
  type CategorySlug,
} from "@/data/blog-posts";
import { YOU_MINOX_URL } from "@/lib/barberias";

const PAGE_SIZE = 24;

/**
 * Rendered on the server (no useSearchParams bailout) so the first grid of guides
 * is present in the static HTML; the ?categoria= filter is applied after hydration.
 */
function BlogListInner({ articles }: { articles: BlogArticleSummary[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("categoria");
    if (cat && BLOG_CATEGORIES[cat as CategorySlug]) {
      setSelectedCategory(cat);
      setVisibleCount(PAGE_SIZE);
    }
  }, []);

  const filtered = articles.filter((article) => {
    const matchesCat =
      selectedCategory === "all" || article.categorySlug === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.badgeLabel.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const displayed = filtered.slice(0, visibleCount);

  return (
    <div>
      {/* Search + Category Filters */}
      <div className="mb-10 space-y-6">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder={`Buscar entre las ${articles.length} guías (ej. Fade, Navaja, Barba, Cejas, Rostro, Herramientas, You Minox)...`}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pl-11 text-sm text-slate-900 shadow-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-2 text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-white border border-slate-200 text-slate-700 hover:border-primary"
            }`}
          >
            Todas las Guías ({articles.length})
          </button>
          {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => {
            const count = articles.filter((a) => a.categorySlug === slug).length;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => {
                  setSelectedCategory(slug);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`rounded-full px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === slug
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-primary"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Category Description Banner */}
        {selectedCategory !== "all" &&
          CATEGORY_DESCRIPTIONS[selectedCategory as CategorySlug] && (
            <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-center text-xs sm:text-sm text-emerald-950">
              <strong className="font-extrabold">
                {BLOG_CATEGORIES[selectedCategory as CategorySlug]}:
              </strong>{" "}
              {CATEGORY_DESCRIPTIONS[selectedCategory as CategorySlug]}{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-primary underline ml-1"
              >
                Visitar YouMinox.com ↗
              </a>
            </div>
          )}
      </div>

      {/* Results Counter */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
        <span>
          Mostrando <strong>{displayed.length}</strong> de{" "}
          <strong>{filtered.length}</strong> guías encontradas
        </span>
        {visibleCount < filtered.length && (
          <button
            type="button"
            onClick={() => setVisibleCount(filtered.length)}
            className="text-primary font-extrabold hover:underline cursor-pointer"
          >
            Desplegar las {filtered.length} guías completas ↓
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No se encontraron guías para tu búsqueda.
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayed.map((article) => (
              <article
                key={article.id}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition hover:shadow-lg hover:border-primary flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="block relative overflow-hidden"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.imageAlt}
                      width={1200}
                      height={675}
                      className="w-full h-52 object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-slate-950/90 backdrop-blur-xs px-3 py-1 text-[11px] font-extrabold text-emerald-400">
                        {article.category}
                      </span>
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800">
                        ⏱️ {article.readTime}
                      </span>
                    </div>
                    <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-slate-950/85 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-300">
                      {article.badgeLabel}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 rounded-lg bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-slate-900">
                      #{article.id}
                    </span>
                  </Link>

                  <div className="p-6">
                    <div className="text-xs text-slate-400 font-semibold mb-2">
                      Por{" "}
                      <strong className="text-slate-700">
                        {article.author}
                      </strong>{" "}
                      • Actualizado el {article.publishedAt}
                    </div>
                    <h2 className="font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-snug text-lg line-clamp-2">
                      <Link href={`/blog/${article.slug}/`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    ✓ Verificada por Barberos
                  </span>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3.5 py-2 text-xs font-extrabold text-primary group-hover:bg-primary group-hover:text-white transition"
                  >
                    Leer guía →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="rounded-xl bg-slate-900 px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md transition hover:bg-primary cursor-pointer"
              >
                Cargar 24 Guías Más ({filtered.length - visibleCount} restantes) ↓
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(filtered.length)}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs sm:text-sm font-extrabold text-slate-800 transition hover:border-primary hover:text-primary cursor-pointer"
              >
                Ver las {filtered.length} Guías Completas
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function BlogListClient({
  articles,
}: {
  articles: BlogArticleSummary[];
}) {
  return <BlogListInner articles={articles} />;
}
