"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BarberShop, CityHub } from "@/lib/barberias";
import { getBarberiaUrl } from "@/lib/barberias";
import GoogleStars from "./GoogleStars";

interface BarberDirectoryExplorerProps {
  barberias: BarberShop[];
  cities: CityHub[];
  limaDistricts: { slug: string; name: string; count: number }[];
}

export default function BarberDirectoryExplorer({
  barberias,
  cities,
  limaDistricts,
}: BarberDirectoryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedLimaDistrict, setSelectedLimaDistrict] =
    useState<string>("all");
  const [sortBy, setSortBy] = useState<"rank" | "reviews" | "rating">("rank");
  const [visibleCount, setVisibleCount] = useState(24);

  const filteredBarberias = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = barberias.filter((b) => {
      if (selectedCity !== "all" && b.citySlug !== selectedCity) {
        return false;
      }
      if (
        selectedCity === "lima" &&
        selectedLimaDistrict !== "all" &&
        b.districtSlug !== selectedLimaDistrict
      ) {
        return false;
      }
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.district.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.styleTag.toLowerCase().includes(q) ||
        b.highlightReview.text.toLowerCase().includes(q)
      );
    });

    return list.sort((a, b) => {
      if (sortBy === "reviews") {
        return b.reviewCount - a.reviewCount;
      }
      if (sortBy === "rating") {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      }
      return a.id - b.id;
    });
  }, [barberias, searchQuery, selectedCity, selectedLimaDistrict, sortBy]);

  const displayedBarberias = filteredBarberias.slice(0, visibleCount);

  function handleCitySelect(citySlug: string) {
    setSelectedCity(citySlug);
    setSelectedLimaDistrict("all");
    setVisibleCount(24);
  }

  return (
    <div id="buscador-barberias" className="scroll-mt-24">
      {/* Interactive Search & Filter Control Box */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xl">
        {/* Search Input */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="Buscar por nombre de barbería, ciudad (Lima, Arequipa, Trujillo, Cusco...), distrito (Miraflores, Surco, San Isidro, Los Olivos...) o dirección..."
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 pl-12 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/15 transition"
              aria-label="Buscar barberías en el Perú"
            />
            <svg
              className="absolute left-4 top-4.5 h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-4 rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300 cursor-pointer"
              >
                Limpiar ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label
              htmlFor="sort-barberias"
              className="text-xs font-extrabold uppercase tracking-wider text-slate-500"
            >
              Ordenar:
            </label>
            <select
              id="sort-barberias"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "rank" | "reviews" | "rating")
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:border-primary focus:outline-none"
            >
              <option value="rank">🏆 Posición en el Ranking</option>
              <option value="rating">⭐ Mejor Calificación Google</option>
              <option value="reviews">💬 Más Reseñas en Google</option>
            </select>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              📍 Filtrar por Ciudad del Perú (Lima Principal):
            </span>
            <span className="text-xs font-bold text-primary">
              Mostrando {filteredBarberias.length} de {barberias.length}{" "}
              barberías verificadas
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCitySelect("all")}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition cursor-pointer ${
                selectedCity === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🇵🇪 Todo el Perú ({barberias.length})
            </button>
            {cities.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => handleCitySelect(c.slug)}
                className={`rounded-full px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  selectedCity === c.slug
                    ? "bg-slate-900 text-amber-400 shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c.slug === "lima" ? "👑 " : ""}
                {c.name} ({c.count})
              </button>
            ))}
          </div>
        </div>

        {/* Lima District Sub-Filter (Visible when All or Lima is selected) */}
        {(selectedCity === "all" || selectedCity === "lima") && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              🏙️ Distritos de Lima Metropolitana:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("lima");
                  setSelectedLimaDistrict("all");
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                  selectedCity === "lima" && selectedLimaDistrict === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                Todos los distritos de Lima
              </button>
              {limaDistricts.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => {
                    setSelectedCity("lima");
                    setSelectedLimaDistrict(d.slug);
                    setVisibleCount(24);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                    selectedCity === "lima" && selectedLimaDistrict === d.slug
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {d.name} ({d.count})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredBarberias.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-bold text-slate-800">
            No encontramos barberías para &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Prueba buscando por otra ciudad o distrito (ej. Miraflores, Surco,
            San Isidro, Arequipa, Trujillo, Cusco).
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCity("all");
              setSelectedLimaDistrict("all");
            }}
            className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-extrabold text-white cursor-pointer"
          >
            Ver todas las barberías ({barberias.length})
          </button>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedBarberias.map((barberia, index) => (
              <article
                key={barberia.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
              >
                {/* Real Photo + Badges */}
                <Link
                  href={getBarberiaUrl(barberia)}
                  className="aspect-[16/10] overflow-hidden bg-slate-900 relative block"
                >
                  <img
                    src={barberia.imageUrl}
                    alt={`${barberia.name} — Barbería en ${barberia.district}, ${barberia.city}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  {/* Ranking Pill */}
                  <span className="absolute top-3 left-3 rounded-full bg-slate-950/90 backdrop-blur-xs border border-amber-400/40 px-3 py-1 text-[11px] font-extrabold text-amber-300 shadow-md">
                    {barberia.badge}
                  </span>

                  {/* City & District Pill */}
                  <span className="absolute top-3 right-3 rounded-full bg-primary/95 backdrop-blur-xs px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
                    📍 {barberia.district}, {barberia.city}
                  </span>

                  {/* Price range on bottom image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      ✂️ {barberia.styleTag}
                    </span>
                    <span className="font-extrabold text-emerald-300 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      {barberia.priceRange}
                    </span>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Name + Google Stars right next to/below name */}
                  <div className="mb-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <Link
                        href={getBarberiaUrl(barberia)}
                        className="group-hover:text-primary transition-colors"
                      >
                        <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                          {barberia.name}
                        </h3>
                      </Link>
                    </div>
                    <div className="mt-2">
                      <GoogleStars
                        rating={barberia.rating}
                        reviewCount={barberia.reviewCount}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Exact Address */}
                  <p className="text-xs font-semibold text-slate-600 mb-3 flex items-start gap-1.5">
                    <span className="text-primary shrink-0">📍</span>
                    <span>{barberia.address}</span>
                  </p>

                  {/* Principal Google Review Highlight Box */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 mb-4 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1">
                        <span>💬</span> Reseña Destacada en Google:
                      </span>
                      <span className="text-[11px] font-bold text-amber-500">
                        ★★★★★
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                      &ldquo;{barberia.highlightReview.text}&rdquo;
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
                      — {barberia.highlightReview.author} ·{" "}
                      <span className="text-emerald-700">
                        {barberia.highlightReview.service}
                      </span>
                    </p>
                  </div>

                  {/* Quick Services & CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      Corte:{" "}
                      <strong className="text-slate-800">
                        {barberia.cutPrice}
                      </strong>{" "}
                      · Barba:{" "}
                      <strong className="text-slate-800">
                        {barberia.beardPrice}
                      </strong>
                    </div>
                    <Link
                      href={getBarberiaUrl(barberia)}
                      className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-extrabold text-white transition group-hover:bg-primary"
                    >
                      Ver Ficha y Reseñas
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button + Direct SEO Links */}
          {visibleCount < filteredBarberias.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark cursor-pointer"
              >
                Mostrar Más Barberías del Ranking (
                {filteredBarberias.length - visibleCount} restantes) ↓
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
