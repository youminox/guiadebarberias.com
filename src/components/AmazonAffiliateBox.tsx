"use client";

import { useEffect, useState } from "react";
import {
  AMAZON_TAG_ES,
  AMAZON_TAG_US,
  AmazonProductRecommendation,
  AmazonStoreRegion,
  buildAmazonUrl,
  detectUserAmazonRegion,
} from "@/lib/amazon";

interface AmazonAffiliateBoxProps {
  variant: "verdict" | "vs" | "inline" | "showcase" | "sidebar";
  sectionTitle?: string;
  sectionSubtitle?: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
}

function CategoryIcon({
  type,
}: {
  type: AmazonProductRecommendation["categoryType"];
}) {
  if (type === "clipper" || type === "trimmer") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 border border-amber-300/70">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="8" y="6" width="8" height="14" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V3m2 3V3m2 3V3m2 3V3m2 3V3M12 11v4" />
        </svg>
      </div>
    );
  }
  if (type === "shaver") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 border border-amber-300/70">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="6" y="3" width="12" height="5" rx="1.5" />
          <rect x="7" y="8" width="10" height="13" rx="2" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
        </svg>
      </div>
    );
  }
  if (type === "scissors") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 border border-amber-300/70">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      </div>
    );
  }
  if (type === "razor" || type === "blade") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 border border-amber-300/70">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="4" y="4" width="16" height="5" rx="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v11m-3 0h6" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-400 border border-amber-500/40 shadow-2xs">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    </div>
  );
}

function StoreToggle({
  region,
  setRegion,
  dark = false,
}: {
  region: AmazonStoreRegion;
  setRegion: (r: AmazonStoreRegion) => void;
  dark?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
        dark
          ? "bg-white/10 border-white/15 text-slate-200"
          : "bg-white/95 border-slate-200 text-slate-600"
      }`}
    >
      <span>Tienda:</span>
      <button
        type="button"
        onClick={() => setRegion("US")}
        className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
          region === "US"
            ? "bg-amber-400 text-slate-950 font-extrabold"
            : dark
            ? "hover:text-white"
            : "hover:text-slate-950"
        }`}
        title={`Ver en Amazon.com (${AMAZON_TAG_US})`}
      >
        🇺🇸 US/Global
      </button>
      <span>/</span>
      <button
        type="button"
        onClick={() => setRegion("ES")}
        className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
          region === "ES"
            ? "bg-amber-400 text-slate-950 font-extrabold"
            : dark
            ? "hover:text-white"
            : "hover:text-slate-950"
        }`}
        title={`Ver en Amazon España (${AMAZON_TAG_ES})`}
      >
        🇪🇸 ES
      </button>
    </div>
  );
}

export default function AmazonAffiliateBox({
  variant,
  sectionTitle = "Equipamiento Profesional Recomendado en Amazon",
  sectionSubtitle = "Herramientas verificadas por barberos con envío internacional y garantía oficial.",
  products,
}: AmazonAffiliateBoxProps) {
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const primaryProduct = products[0];
  const secondaryProduct = products[1];
  const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
  const activeTag = region === "ES" ? AMAZON_TAG_ES : AMAZON_TAG_US;

  // 1. VERDICT VARIANT (Top product review card)
  if (variant === "verdict") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <section
        aria-label="Veredicto rápido de la herramienta en Amazon"
        className="my-8 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
              {primaryProduct.badge}
            </span>
            {primaryProduct.specHighlight && (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300">
                ⚙️ {primaryProduct.specHighlight}
              </span>
            )}
          </div>
          <StoreToggle region={region} setRegion={setRegion} dark />
        </div>

        <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3.5">
              <CategoryIcon type={primaryProduct.categoryType} />
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                  {primaryProduct.brand} · Veredicto Oficial GuíaDeBarberías.com
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {primaryProduct.title}
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {primaryProduct.subtitle}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
              {primaryProduct.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <span className="text-amber-400 font-black">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-64 shrink-0 rounded-xl bg-white/5 border border-white/15 p-4 text-center space-y-3">
            <div className="text-xs font-bold text-amber-400">
              ★★★★★ {primaryProduct.rating} / 5.0
            </div>
            <div className="text-[11px] text-slate-300">
              Basado en {primaryProduct.reviewsCount} reseñas verificadas
            </div>
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3.5 text-sm font-extrabold text-slate-950 shadow-md transition hover:from-amber-300 hover:to-amber-400"
            >
              <span>{primaryProduct.ctaLabel}</span>
              <span>↗</span>
            </a>
            <p className="text-[10px] text-emerald-300 font-semibold">
              ✓ Disponible hoy en {storeName}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 2. VS VARIANT (Head-to-Head Product A vs Product B comparison box)
  if (variant === "vs") {
    return (
      <section
        aria-label="Comparativa rápida Producto vs Producto en Amazon"
        className="my-8 rounded-2xl border-2 border-amber-400/90 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-xs font-extrabold text-amber-300">
            ⚔️ Comparativa Directa de Barbería · Precios y Stock en {storeName}
          </span>
          <StoreToggle region={region} setRegion={setRegion} dark />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[primaryProduct, secondaryProduct].map((prod, idx) => {
            const url = buildAmazonUrl(prod, region);
            return (
              <div
                key={prod.id}
                className={`rounded-2xl p-5 flex flex-col justify-between ${
                  idx === 0
                    ? "bg-white text-slate-900 border-2 border-amber-400 shadow-md"
                    : "bg-slate-900/90 text-white border border-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                        idx === 0
                          ? "bg-amber-400 text-slate-950"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                      }`}
                    >
                      {idx === 0 ? `🥇 Opción #1 · ${prod.badge}` : `🥈 Contendiente #2 · ${prod.badge}`}
                    </span>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <CategoryIcon type={prod.categoryType} />
                    <div>
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider ${
                          idx === 0 ? "text-emerald-700" : "text-amber-300"
                        }`}
                      >
                        {prod.brand}
                      </span>
                      <h3 className="text-base font-extrabold leading-snug">
                        {prod.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      idx === 0 ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {prod.subtitle}
                  </p>
                  <ul
                    className={`mt-3 space-y-1.5 border-t pt-3 text-xs ${
                      idx === 0
                        ? "border-slate-200 text-slate-700"
                        : "border-white/10 text-slate-200"
                    }`}
                  >
                    {prod.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-black">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/30">
                  <div className="mb-2.5 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-amber-500">
                      ★★★★★ {prod.rating}/5 ({prod.reviewsCount})
                    </span>
                    <span
                      className={`text-[11px] font-bold ${
                        idx === 0 ? "text-emerald-700" : "text-emerald-300"
                      }`}
                    >
                      ✓ {storeName}
                    </span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition ${
                      idx === 0
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400"
                        : "bg-amber-400 text-slate-950 hover:bg-amber-300"
                    }`}
                  >
                    <span>Ver {prod.brand} en {storeName}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 3. INLINE VARIANT (Appears mid-article for high mobile CTR)
  if (variant === "inline") {
    const url = buildAmazonUrl(primaryProduct, region);

    return (
      <aside
        aria-label="Recomendación destacada en Amazon"
        className="my-9 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-br from-[#fffdf9] via-[#fdf8ee] to-[#f8efe0] p-5 sm:p-6 shadow-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-950 border border-amber-400/50">
            {primaryProduct.badge}
          </span>
          <StoreToggle region={region} setRegion={setRegion} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <CategoryIcon type={primaryProduct.categoryType} />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {primaryProduct.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {primaryProduct.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-bold text-amber-600">
                  ★★★★★ {primaryProduct.rating}/5
                </span>
                <span className="text-slate-500 font-medium">
                  ({primaryProduct.reviewsCount} valoraciones)
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  ✓ Envío oficial desde {storeName}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:shrink-0">
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-sm transition hover:from-amber-400 hover:to-amber-500 hover:shadow-md"
            >
              <span>{primaryProduct.ctaLabel}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 4. SIDEBAR VARIANT (Sticky right column on desktop)
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border-2 border-amber-400/70 bg-gradient-to-b from-[#fffdf8] to-[#f9f1e2] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900">
            🛒 Top Barbería · {storeName}
          </span>
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => setRegion("US")}
              className={`cursor-pointer ${region === "US" ? "text-amber-700 font-extrabold underline" : ""}`}
            >
              🇺🇸 US
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setRegion("ES")}
              className={`cursor-pointer ${region === "ES" ? "text-amber-700 font-extrabold underline" : ""}`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          {products.slice(0, 2).map((prod) => {
            const url = buildAmazonUrl(prod, region);
            return (
              <div
                key={prod.id}
                className="rounded-xl border border-amber-200/80 bg-white p-3.5 shadow-2xs"
              >
                <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                  {prod.badge}
                </span>
                <h4 className="mt-1.5 text-xs font-extrabold text-slate-900 leading-snug">
                  {prod.title}
                </h4>
                <div className="mt-1 flex items-center gap-2 text-[11px]">
                  <span className="font-bold text-amber-600">★★★★★ {prod.rating}</span>
                  <span className="text-slate-400">({prod.reviewsCount})</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-extrabold text-slate-950 transition hover:bg-amber-400"
                >
                  <span>Ver en {storeName}</span>
                  <span>→</span>
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-tight text-center">
          Enlaces de afiliado oficial de Amazon ({activeTag}).
        </p>
      </div>
    );
  }

  // 5. SHOWCASE VARIANT (Full 3-product comparison grid at bottom of article or hub)
  return (
    <section
      aria-label="Selección de herramientas de barbería recomendadas en Amazon"
      className="my-12 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-extrabold text-amber-300">
            🛒 Selección Oficial GuíaDeBarberías.com · Disponible en {storeName}
          </span>
          <h2 className="mt-2.5 text-xl sm:text-2xl font-extrabold text-white">
            {sectionTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            {sectionSubtitle}
          </p>
        </div>

        <StoreToggle region={region} setRegion={setRegion} dark />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {products.map((product, index) => {
          const url = buildAmazonUrl(product, region);
          const isFeatured = index === 0;

          return (
            <div
              key={product.id}
              className={`flex flex-col justify-between rounded-2xl p-5 transition ${
                isFeatured
                  ? "bg-gradient-to-b from-amber-50 to-white text-slate-900 border-2 border-amber-400 shadow-lg"
                  : "bg-white/95 text-slate-900 border border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                      isFeatured
                        ? "bg-amber-500 text-slate-950"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <CategoryIcon type={product.categoryType} />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                      {product.brand}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {product.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {product.subtitle}
                </p>

                <ul className="mt-3.5 space-y-1.5 border-t border-slate-200/80 pt-3 text-xs text-slate-700">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-extrabold">✓</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="mb-2.5 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-600">
                    ★★★★★ {product.rating}/5
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    ✓ Disponible en {storeName}
                  </span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition shadow-xs ${
                    isFeatured
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <span>{product.ctaLabel}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[11px] text-slate-400">
        * En calidad de Afiliado de Amazon, GuíaDeBarberías.com obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables sin costo adicional para ti. Tienda activa: {storeName} ({activeTag}).
      </p>
    </section>
  );
}
