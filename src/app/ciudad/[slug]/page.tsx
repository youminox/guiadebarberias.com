import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clampDescription, fitTitle } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoogleStars from "@/components/GoogleStars";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import {
  getAllCities,
  getCityBySlug,
  getBarberiasByCity,
  getBarberiaUrl,
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
} from "@/lib/barberias";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCities().map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return { title: `Ciudad no encontrada | ${SITE_NAME}` };
  }

  const title = `Las ${city.count} Mejores Barberías en ${city.name} (${city.avgRating} ★)`;
  const canonicalUrl = `${SITE_URL}/ciudad/${city.slug}/`;
  const metaDescription = clampDescription(city.description);
  const ogImage = getBarberiasByCity(city.slug)[0]?.imageUrl;

  return {
    // Layout template appends "| SITE_NAME"; drop it if the full title would exceed ~65 chars
    title: fitTitle(title),
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: metaDescription,
      url: canonicalUrl,
      type: "website",
      locale: "es_PE",
      siteName: SITE_NAME,
      ...(ogImage ? { images: [{ url: `${SITE_URL}${ogImage}`, alt: `Barberías en ${city.name}` }] } : {}),
    },
  };
}

export default async function CityRankingPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const barberias = getBarberiasByCity(slug);
  const allCities = getAllCities();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Ranking de las Mejores Barberías en ${city.name}, Perú`,
    description: city.description,
    numberOfItems: barberias.length,
    itemListElement: barberias.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "LocalBusiness",
        name: b.name,
        url: `${SITE_URL}${getBarberiaUrl(b)}`,
        image: `${SITE_URL}${b.imageUrl}`,
        telephone: b.phone,
        priceRange: b.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: b.address,
          addressLocality: `${b.district}, ${b.city}`,
          addressRegion: b.city,
          addressCountry: "PE",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: b.rating.toFixed(1),
          reviewCount: b.reviewCount,
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="min-h-screen bg-slate-50 pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: `Barberías en ${city.name}` },
            ]}
          />

          {/* City Header Banner */}
          <div className="mt-4 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="rounded-full bg-emerald-400/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                📍 {city.regionLabel}
              </span>
              <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
                ★ {city.avgRating} Promedio en Google
              </span>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-xs font-bold text-white transition"
              >
                ✨ Creado por YouMinox.com ↗
              </a>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Las {city.count} Mejores Barberías en {city.name}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {city.description}
            </p>
          </div>

          <AdBanner className="my-8" />

          {/* City Barberias Ranking Grid */}
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {barberias.map((barberia, idx) => (
              <article
                key={barberia.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
              >
                <Link
                  href={getBarberiaUrl(barberia)}
                  className="aspect-[16/10] overflow-hidden bg-slate-900 relative block"
                >
                  <img
                    src={barberia.imageUrl}
                    alt={barberia.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={idx < 6 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-extrabold text-amber-300">
                    #{idx + 1} en {city.name} · {barberia.badge}
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-primary/95 px-3 py-1 text-[11px] font-extrabold text-white">
                    {barberia.district}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link
                    href={getBarberiaUrl(barberia)}
                    className="group-hover:text-primary transition-colors"
                  >
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {barberia.name}
                    </h2>
                  </Link>
                  <div className="mt-2 mb-3">
                    <GoogleStars
                      rating={barberia.rating}
                      reviewCount={barberia.reviewCount}
                      size="sm"
                    />
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mb-3">
                    📍 {barberia.address}
                  </p>
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 mb-4 flex-1">
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      &ldquo;{barberia.highlightReview.text}&rdquo;
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
                      — {barberia.highlightReview.author}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-700">
                      {barberia.priceRange}
                    </span>
                    <Link
                      href={getBarberiaUrl(barberia)}
                      className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-extrabold text-white group-hover:bg-primary transition"
                    >
                      Ver Reseñas y Mapa →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <YouMinoxSpotlight variant="article" />
          </div>

          {/* Other Cities Navigation */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">
              Explorar Ranking de Barberías en Otras Ciudades del Perú
            </h2>
            <div className="flex flex-wrap gap-2">
              {allCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ciudad/${c.slug}/`}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    c.slug === city.slug
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c.name} ({c.count})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
