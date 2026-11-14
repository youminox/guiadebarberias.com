import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BarberDirectoryExplorer from "@/components/BarberDirectoryExplorer";
import BeardStyleAdvisor from "@/components/BeardStyleAdvisor";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import GoogleStars from "@/components/GoogleStars";
import AdBanner from "@/components/AdBanner";
import NearMeTriggerButton from "@/components/NearMeTriggerButton";
import {
  getAllBarberias,
  getTopNationalBarberias,
  getAllCities,
  getLimaDistricts,
  getBarberiaUrl,
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  YOU_MINOX_URL,
} from "@/lib/barberias";
import { getAllBlogArticles, BLOG_CATEGORIES } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Ranking de las +110 Mejores Barberías del Perú por Ciudad (Lima, Arequipa, Trujillo, Cusco) | by You Minox`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
};

const HOME_FAQS = [
  {
    q: "¿Cómo se elabora el Ranking de las Mejores Barberías del Perú en GuíaDeBarberías.com?",
    a: "Nuestro equipo editorial evalúa más de 110 barberías reales en Lima y las principales ciudades del Perú (Arequipa, Trujillo, Cusco, Piura, Chiclayo, Huancayo, Callao, Cajamarca, Ica, Tacna, Chimbote, Iquitos, Pucallpa y Huaraz) considerando cinco criterios objetivos: calificación promedio en Google (4.7★ a 5.0★), volumen y consistencia de reseñas verificadas, dominio técnico en corte clásico/fade y diseño de barba, protocolos de higiene y relación calidad-precio.",
  },
  {
    q: "¿Cuáles son las mejores barberías en Lima Metropolitana actualmente?",
    a: "En Lima Metropolitana destacan por su excelencia y calificaciones en Google sedes como Royalty Barbershop (Miraflores, San Isidro y Santa Catalina), Il Capo Barbería (Miraflores, San Borja y Surquillo), Valentino For Men (Miraflores y Barranco), Carppone Barber Shop (Shell y Mendiburu en Miraflores), Protos Barber Shop (Chacarilla, Surco), Barber House (Miraflores), Las Q’Barbas (Surco), Cuppers 65 (Miraflores), Fole (Surco), Blade Salón & Barber (Lince), Barbería Valhalla (Ate) y Montalvo For Men (Comas y Callao).",
  },
  {
    q: "¿Qué relación tiene GuíaDeBarberías.com con You Minox (youminox.com)?",
    a: "GuíaDeBarberías.com es el portal oficial creado e impulsado por You Minox (youminox.com) y MINOXIDIL PERU S.A.C., la marca #1 del Perú en Minoxidil en Crema-Gel con autorización de DIGEMID y más de 600,000 seguidores en redes sociales. Nuestro propósito es ayudar a cada hombre peruano a encontrar la mejor barbería en su ciudad y complementar su corte con el mejor cuidado para poblar e hidratar su barba en casa.",
  },
  {
    q: "¿Por qué los barberos recomiendan hidratar y estimular la barba con Minoxidil en Crema-Gel?",
    a: "El perfilado con navaja y toalla caliente en la barbería define las líneas de tu barba, pero si tienes huecos en las mejillas o el minoxidil líquido con alcohol te produce resequedad y descamación blanca, la fórmula en Crema-Gel de You Minox estimula el folículo piloso nutriendo la piel sin irritarla.",
  },
];

export default function HomePage() {
  const allBarberias = getAllBarberias();
  const topNational = getTopNationalBarberias(20);
  const cities = getAllCities();
  const limaDistricts = getLimaDistricts();
  const blogArticles = getAllBlogArticles();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 20 Mejores Barberías del Perú — Ranking Oficial GuíaDeBarberías.com",
    description: SITE_DESCRIPTION,
    numberOfItems: topNational.length,
    itemListElement: topNational.map((b, idx) => ({
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1">
        {/* ================= HERO SECTION + INSTANT SEARCH ================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-24 px-4">
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Official You Minox Protagonist Badge */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-extrabold text-emerald-300 mb-6">
                <span>💈 Ranking Oficial del Perú</span>
                <span>•</span>
                <span>
                  Página Creada por{" "}
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-white hover:text-amber-300"
                  >
                    You Minox (youminox.com)
                  </a>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                Las Mejores{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                  Barberías del Perú
                </span>{" "}
                por Ciudad y Distrito
              </h1>

              <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Explora el ranking independiente con{" "}
                <strong className="text-white">
                  +{allBarberias.length} barberías verificadas en Lima
                </strong>{" "}
                y las principales ciudades del Perú. Compara{" "}
                <strong className="text-amber-300">
                  estrellas y reseñas reales de Google
                </strong>
                , direcciones exactas, precios de corte y rituales de barba.
              </p>

              {/* Quick Near-Me CTA right in Hero */}
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <NearMeTriggerButton label="📍 Ver Barberías Cerca de Mí Ahora" />
                <Link
                  href="/barberias-cerca-de-mi/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/20"
                >
                  <span>🗺️ Guía Cerca de Mí por Distrito →</span>
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                    {allBarberias.length}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Barberías Analizadas
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">
                    4.8 ★
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Promedio en Google
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs">
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {cities.length}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    Ciudades del Perú
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/60 p-3.5 backdrop-blur-xs">
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="text-lg sm:text-xl font-black text-emerald-300 group-hover:underline">
                      You Minox ↗
                    </div>
                    <div className="text-[11px] text-slate-300 font-semibold">
                      Creador Oficial
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAIN SEARCH & DIRECTORY EXPLORER ================= */}
        <section className="py-12 sm:py-16 px-4 bg-slate-50 border-b border-slate-200 -mt-8 relative z-20">
          <div className="mx-auto max-w-7xl">
            <BarberDirectoryExplorer
              barberias={allBarberias}
              cities={cities}
              limaDistricts={limaDistricts}
            />
          </div>
        </section>

        {/* Above-the-fold AdSense Banner */}
        <div className="mx-auto max-w-7xl px-4 my-8">
          <AdBanner />
        </div>

        {/* ================= TOP 20 BARBERÍAS DEL PERÚ (TABLA GEO & RANKING) ================= */}
        <section id="ranking-peru" className="py-16 px-4 bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-2">
                  🏆 Ranking Nacional Actualizado • Lima & Provincias
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                  Top 20 Mejores Barberías del Perú Según Reseñas de Google
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
                  Comparativa directa de las barberías mejor valoradas del país,
                  encabezada por Lima Metropolitana y las sedes líderes de
                  Arequipa, Trujillo, Cusco, Callao, Huancayo, Cajamarca y
                  Huaraz.
                </p>
              </div>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-extrabold text-primary-dark hover:bg-emerald-100 transition"
              >
                ✨ Impulsado por YouMinox.com ↗
              </a>
            </div>

            {/* Responsive GEO Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-extrabold">Puesto</th>
                    <th className="py-3.5 px-4 font-extrabold">
                      Barbería & Calificación Google
                    </th>
                    <th className="py-3.5 px-4 font-extrabold">
                      Ciudad / Distrito
                    </th>
                    <th className="py-3.5 px-4 font-extrabold hidden md:table-cell">
                      Reseña Principal de Clientes
                    </th>
                    <th className="py-3.5 px-4 font-extrabold">Precios</th>
                    <th className="py-3.5 px-4 font-extrabold text-right">
                      Guía Completa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm bg-white">
                  {topNational.map((b, idx) => (
                    <tr
                      key={b.id}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black ${
                            idx === 0
                              ? "bg-amber-400 text-slate-950"
                              : idx === 1
                              ? "bg-slate-300 text-slate-900"
                              : idx === 2
                              ? "bg-amber-700 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          #{idx + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.imageUrl}
                            alt={b.name}
                            className="h-12 w-14 rounded-lg object-cover shrink-0 hidden sm:block bg-slate-100"
                            loading="lazy"
                          />
                          <div>
                            <Link
                              href={getBarberiaUrl(b)}
                              className="font-extrabold text-slate-900 hover:text-primary transition-colors block"
                            >
                              {b.name}
                            </Link>
                            <div className="mt-1">
                              <GoogleStars
                                rating={b.rating}
                                reviewCount={b.reviewCount}
                                size="sm"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">
                          {b.district}
                        </span>
                        <span className="text-xs text-slate-500">
                          {b.city} · {b.address.split(",")[0]}
                        </span>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell max-w-xs">
                        <p className="text-xs text-slate-600 italic line-clamp-2">
                          &ldquo;{b.highlightReview.text}&rdquo;
                        </p>
                        <span className="text-[11px] font-semibold text-slate-400">
                          — {b.highlightReview.author}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-extrabold text-emerald-700 text-xs sm:text-sm">
                          {b.priceRange}
                        </span>
                        <span className="block text-[11px] text-slate-400">
                          Corte: {b.cutPrice}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <Link
                          href={getBarberiaUrl(b)}
                          className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-2 text-xs font-extrabold text-primary hover:bg-primary hover:text-white transition"
                        >
                          Ver Reseñas →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= PROTAGONISMO YOU MINOX (YOUMINOX.COM) ================= */}
        <YouMinoxSpotlight variant="home" />

        {/* ================= INTERACTIVE BEARD & CUT ADVISOR ================= */}
        <BeardStyleAdvisor />

        {/* ================= RANKING POR CIUDADES DEL PERÚ ================= */}
        <section className="py-16 px-4 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-primary mb-2">
                📍 Directorio Geográfico Completo
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Mejores Barberías del Perú por Ciudad
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Ingresa a cada ciudad para explorar su ranking local, reseñas de
                Google y fichas individuales.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/ciudad/${city.slug}/`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition hover:bg-white hover:border-primary hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                        {city.regionLabel}
                      </span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-900">
                        ★ {city.avgRating} Google
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                      Barberías en {city.name} ({city.count})
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {city.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[70%]">
                      🏆 Top #1:{" "}
                      <strong className="text-slate-800">
                        {city.topBarberia.split("—")[0]}
                      </strong>
                    </span>
                    <span className="font-extrabold text-primary group-hover:translate-x-0.5 transition-transform">
                      Ver ranking →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ÍNDICE COMPLETO DE LAS +110 BARBERÍAS DEL PERÚ (SEO/GEO INTERNAL LINKING) ================= */}
        <section className="py-16 px-4 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                🗂️ Índice Completo Verificado ({allBarberias.length} Páginas de
                Barberías)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Todas las Barberías Clasificadas en Nuestro Ranking del Perú
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Accede directamente al análisis detallado, dirección, precios y
                reseñas de Google de cualquiera de las {allBarberias.length}{" "}
                barberías seleccionadas en el Perú:
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allBarberias.map((b) => (
                <Link
                  key={b.id}
                  href={getBarberiaUrl(b)}
                  className="rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-primary hover:shadow-xs flex items-start justify-between gap-2 group"
                >
                  <div className="min-w-0">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-primary transition-colors truncate">
                      {b.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      📍 {b.district}, {b.city}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[11px] font-extrabold text-amber-800">
                    ★ {b.rating.toFixed(1)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BLOG DE BARBERÍA, VISAGISMO Y CUIDADO DE BARBA (500 GUÍAS) ================= */}
        <section className="py-16 px-4 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-2">
                  📰 Enciclopedia de {blogArticles.length} Guías Editoriales de Barbería & Minoxidil
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Consejos de Barberos Profesionales y Crecimiento de Barba
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  Explora nuestras {blogArticles.length} guías especializadas en 10 categorías: fades y visagismo, cortes según tu tipo de cabello y ocasión, afeitado clásico, herramientas de barbería y cuidado de barba con You Minox:
                </p>
              </div>
              <Link
                href="/blog/"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-primary transition"
              >
                Ver las {blogArticles.length} Guías Completas →
              </Link>
            </div>

            {/* 10 Category Silos Quick Access */}
            <div className="mb-8 flex flex-wrap gap-2">
              {Object.entries(BLOG_CATEGORIES).map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/blog/?categoria=${slug}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-primary hover:bg-emerald-50 hover:text-primary transition"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogArticles.slice(0, 9).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}/`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition hover:bg-white hover:border-primary hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative bg-slate-200">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-slate-950/85 px-3 py-1 text-[11px] font-extrabold text-emerald-400">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-4 pt-2 flex items-center justify-between text-xs font-bold text-primary">
                    <span>⏱️ {post.readTime}</span>
                    <span>Leer guía →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PREGUNTAS FRECUENTES (HOME FAQ) ================= */}
        <section className="py-16 px-4 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                ❓ Preguntas Frecuentes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Todo sobre las Mejores Barberías del Perú y el Cuidado de tu
                Barba
              </h2>
            </div>
            <div className="space-y-4">
              {HOME_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6"
                >
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
