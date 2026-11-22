"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HERRAMIENTA_CLUSTERS,
  type HerramientaCluster,
  type HerramientaSummary,
} from "@/data/herramientas";

interface Props {
  articles: HerramientaSummary[];
}

const BRAND_FILTERS = [
  { id: "ALL", label: "Todas las Marcas" },
  { id: "wahl", label: "Wahl" },
  { id: "babyliss", label: "BaBylissPRO" },
  { id: "jrl", label: "JRL" },
  { id: "stylecraft", label: "StyleCraft / Gamma+" },
  { id: "andis", label: "Andis" },
  { id: "clasico", label: "Afeitado Clásico" },
  { id: "tijeras", label: "Tijeras & Estación" },
];

export default function HerramientasHubClient({ articles }: Props) {
  const [selectedCluster, setSelectedCluster] = useState<
    HerramientaCluster | "ALL"
  >("ALL");
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (selectedCluster !== "ALL" && a.cluster !== selectedCluster) {
        return false;
      }
      if (selectedBrand !== "ALL") {
        const hay = `${a.slug} ${a.title} ${a.brand}`.toLowerCase();
        if (selectedBrand === "clasico") {
          if (
            !hay.includes("merkur") &&
            !hay.includes("muhle") &&
            !hay.includes("rockwell") &&
            !hay.includes("parker") &&
            !hay.includes("astra") &&
            !hay.includes("feather") &&
            !hay.includes("alumbre") &&
            !hay.includes("espuma") &&
            !hay.includes("toalla")
          ) {
            return false;
          }
        } else if (selectedBrand === "tijeras") {
          if (
            !hay.includes("tijera") &&
            !hay.includes("peine") &&
            !hay.includes("tapete") &&
            !hay.includes("jarra") &&
            !hay.includes("capa") &&
            !hay.includes("mandil") &&
            !hay.includes("maletin") &&
            !hay.includes("bledo") &&
            !hay.includes("estacion")
          ) {
            return false;
          }
        } else if (!hay.includes(selectedBrand)) {
          return false;
        }
      }
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.brand.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q)
      );
    });
  }, [articles, selectedCluster, selectedBrand, query]);

  const countsByCluster = useMemo(() => {
    const map: Record<string, number> = { ALL: articles.length };
    for (const a of articles) {
      map[a.cluster] = (map[a.cluster] || 0) + 1;
    }
    return map;
  }, [articles]);

  return (
    <div className="space-y-8">
      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 block">
              🔍 Buscador Técnico de Equipamiento
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Explora las {articles.length} Guías, Reseñas y Comparativas VS
            </h2>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar modelo (ej: Magic Clip, JRL Onyx, ProFoil, Merkur)..."
              aria-label="Buscar herramientas de barbería"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Cluster Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCluster("ALL")}
            className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition cursor-pointer ${
              selectedCluster === "ALL"
                ? "bg-slate-950 text-amber-400 shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Todas ({countsByCluster.ALL})
          </button>
          {(Object.keys(HERRAMIENTA_CLUSTERS) as HerramientaCluster[]).map(
            (cl) => (
              <button
                key={cl}
                type="button"
                onClick={() => setSelectedCluster(cl)}
                className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition cursor-pointer ${
                  selectedCluster === cl
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {HERRAMIENTA_CLUSTERS[cl]} ({countsByCluster[cl] || 0})
              </button>
            )
          )}
        </div>

        {/* Brand Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 mr-1">
            Marca / Línea:
          </span>
          {BRAND_FILTERS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBrand(b.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-bold transition cursor-pointer ${
                selectedBrand === b.id
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid (Renders all 105 links server-side by default when unfiltered) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/herramientas/${item.slug}/`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  width={600}
                  height={338}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-extrabold text-amber-300 backdrop-blur-xs">
                    {item.badgeLabel}
                  </span>
                  <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-extrabold text-slate-900">
                    {item.brand}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 mb-1.5">
                  <span>{item.clusterLabel}</span>
                  <span className="text-slate-400">⏱️ {item.readTime}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold">
              <span className="text-slate-600">
                🛒 Ficha Técnica + Amazon
              </span>
              <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform">
                Ver análisis →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-base font-extrabold text-slate-900">
            No encontramos herramientas que coincidan con &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCluster("ALL");
              setSelectedBrand("ALL");
            }}
            className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-extrabold text-slate-950"
          >
            Restablecer filtros ({articles.length} páginas)
          </button>
        </div>
      )}
    </div>
  );
}
