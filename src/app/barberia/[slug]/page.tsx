import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoogleStars from "@/components/GoogleStars";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import {
  getAllBarberias,
  getBarberiaBySlug,
  getRelatedBarberias,
  getTopNationalBarberias,
  getBarberiasByCity,
  getBarberiaUrl,
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
  COMPANY_NAME,
} from "@/lib/barberias";
import { getAllBlogArticles } from "@/data/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBarberias().map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const barberia = getBarberiaBySlug(slug);

  if (!barberia) {
    return { title: `Barbería no encontrada | ${SITE_NAME}` };
  }

  const title = `${barberia.name} (${barberia.district}, ${barberia.city}): Reseñas Google (${barberia.rating.toFixed(
    1
  )} ★), Precios y Dirección`;
  const canonicalUrl = `${SITE_URL}${getBarberiaUrl(barberia)}`;
  const absoluteImageUrl = `${SITE_URL}${barberia.imageUrl}`;

  return {
    title,
    description: barberia.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: barberia.excerpt,
      url: canonicalUrl,
      type: "article",
      locale: "es_PE",
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: `${barberia.name} en ${barberia.district}, ${barberia.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: barberia.excerpt,
      images: [absoluteImageUrl],
    },
  };
}

export default async function BarberiaDetailPage({ params }: Props) {
  const { slug } = await params;
  const barberia = getBarberiaBySlug(slug);

  if (!barberia) {
    notFound();
  }

  const relatedBarberias = getRelatedBarberias(barberia, 4);
  const topNational = getTopNationalBarberias(6).filter(
    (b) => b.id !== barberia.id
  );
  const sameCityBarberias = getBarberiasByCity(barberia.citySlug)
    .filter((b) => b.id !== barberia.id)
    .slice(0, 5);

  const canonicalUrl = `${SITE_URL}${getBarberiaUrl(barberia)}`;
  const absoluteImageUrl = `${SITE_URL}${barberia.imageUrl}`;
  const cleanShortName = barberia.name.split("—")[0].trim();

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    {
      label: `Barberías en ${barberia.city}`,
      href: `/ciudad/${barberia.citySlug}/`,
    },
    { label: barberia.name },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BarberShop",
        "@id": `${canonicalUrl}#barbershop`,
        name: barberia.name,
        description: barberia.excerpt,
        url: canonicalUrl,
        image: [absoluteImageUrl, `${SITE_URL}${barberia.secondaryImageUrl}`],
        telephone: barberia.phone,
        priceRange: barberia.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: barberia.address,
          addressLocality: barberia.district,
          addressRegion: barberia.city,
          addressCountry: "PE",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: barberia.rating.toFixed(1),
          reviewCount: barberia.reviewCount,
          bestRating: "5",
          worstRating: "1",
        },
        review: barberia.allReviews.map((r) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: r.author,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
          },
          name: r.service,
          reviewBody: r.text,
        })),
      },
      {
        "@type": "Article",
        headline: `${barberia.name}: Reseñas en Google, Precios, Dirección y Servicios en ${barberia.district}, ${barberia.city}`,
        description: barberia.excerpt,
        image: absoluteImageUrl,
        author: {
          "@type": "Organization",
          name: `${SITE_NAME} — Creado por You Minox`,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: YOU_MINOX_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: barberia.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const tocItems = [
    {
      id: "experiencia-y-propuesta",
      label: `Experiencia y Estilo en ${cleanShortName}`,
    },
    {
      id: "resenas-google",
      label: `Principales Reseñas en Google (${barberia.rating.toFixed(1)} ★)`,
    },
    {
      id: "servicios-y-precios",
      label: "Servicios Destacados y Precios Referenciales",
    },
    {
      id: "cuidado-barba-you-minox",
      label: "Cuidado Post-Barbería con You Minox",
    },
    {
      id: "ubicacion-y-mapa",
      label: `Ubicación en ${barberia.district} y Cómo Llegar`,
    },
    {
      id: "preguntas-frecuentes",
      label: "Preguntas Frecuentes (FAQ)",
    },
  ];

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dinamica.pe Article Page Layout adapted for GuiaDeBarberias.com & You Minox */}
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* ================= MAIN ARTICLE COLUMN (Dinamica.pe style) ================= */}
            <article className="min-w-0 flex-1 lg:max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <Link
                  href={`/ciudad/${barberia.citySlug}/`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-primary"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Volver al Ranking de {barberia.city}
                </Link>
              </div>

              <Breadcrumbs items={breadcrumbItems} />

              {/* Category Pill & Verification Meta (Dinamica.pe style) */}
              <div className="mt-4 mb-5 flex flex-wrap items-center gap-2.5">
                <Link
                  href={`/ciudad/${barberia.citySlug}/`}
                  className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white transition"
                >
                  📍 {barberia.district}, {barberia.city}
                </Link>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
                  {barberia.badge}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  ⏱️ {barberia.readTime} de lectura
                </span>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition"
                >
                  ✓ Verificado por You Minox (youminox.com)
                </a>
              </div>

              {/* H1 Title + Google Stars & Principal Review right next to/below the name */}
              <div className="border-b border-slate-200 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                    {barberia.name}
                  </h1>
                </div>

                {/* Estrellitas de Google + Reseña Principal al lado del nombre */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <div className="shrink-0">
                    <GoogleStars
                      rating={barberia.rating}
                      reviewCount={barberia.reviewCount}
                      size="lg"
                    />
                  </div>
                  <div className="sm:border-l sm:border-slate-200 sm:pl-4 text-xs sm:text-sm text-slate-600">
                    <span className="font-extrabold text-slate-900">
                      Opinión destacada en Google:{" "}
                    </span>
                    <span className="italic">
                      &ldquo;{barberia.highlightReview.text}&rdquo;
                    </span>{" "}
                    <span className="font-semibold text-slate-400">
                      — {barberia.highlightReview.author}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Real Photo — Dinamica.pe rounded-2xl shadow-md */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-md relative">
                <img
                  src={barberia.imageUrl}
                  alt={`${barberia.name} — Foto real de la barbería en ${barberia.district}, ${barberia.city}`}
                  className="w-full max-h-[440px] object-cover"
                />
                <div className="bg-slate-950 text-slate-200 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span>
                    📍 <strong>Dirección:</strong> {barberia.address}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    💈 Especialidad: {barberia.styleTag}
                  </span>
                </div>
              </div>

              {/* Quick GEO Verdict Summary Box */}
              <div className="mt-8 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h2 className="text-base font-extrabold uppercase tracking-wider text-primary-dark flex items-center gap-2">
                    <span>⚡</span> Ficha Rápida y Veredicto Editorial (GEO)
                  </h2>
                  <span className="text-xs font-extrabold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    Puesto #{barberia.cityRank} en {barberia.city}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-slate-700">
                  <div className="rounded-xl bg-white p-3.5 border border-slate-200/80">
                    <span className="block text-[11px] font-bold uppercase text-slate-400">
                      Dirección Exacta
                    </span>
                    <strong className="text-slate-900">
                      {barberia.address}
                    </strong>
                  </div>
                  <div className="rounded-xl bg-white p-3.5 border border-slate-200/80">
                    <span className="block text-[11px] font-bold uppercase text-slate-400">
                      Calificación en Google
                    </span>
                    <strong className="text-amber-600">
                      ★ {barberia.rating.toFixed(1)} / 5.0
                    </strong>{" "}
                    ({barberia.reviewCount} reseñas verificadas)
                  </div>
                  <div className="rounded-xl bg-white p-3.5 border border-slate-200/80">
                    <span className="block text-[11px] font-bold uppercase text-slate-400">
                      Rango de Precios Estimado
                    </span>
                    <strong className="text-emerald-700">
                      {barberia.priceRange}
                    </strong>{" "}
                    (Corte: {barberia.cutPrice} · Barba: {barberia.beardPrice})
                  </div>
                  <div className="rounded-xl bg-white p-3.5 border border-slate-200/80">
                    <span className="block text-[11px] font-bold uppercase text-slate-400">
                      Horario de Atención
                    </span>
                    <strong className="text-slate-900">
                      {barberia.schedule}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Above-the-fold AdSense Banner */}
              <AdBanner className="my-8" />

              {/* Automatic Table of Contents (TOC — Dinamica.pe & MasBarba style) */}
              <nav
                aria-label="Tabla de contenidos"
                className="my-8 rounded-2xl border border-slate-200 bg-light-bg/80 p-6"
              >
                <p className="text-sm font-extrabold uppercase tracking-wider text-primary-dark mb-3 flex items-center gap-2">
                  <span>💈</span> Contenido del Análisis de {cleanShortName}
                </p>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {tocItems.map((item, idx) => (
                    <li key={item.id} className="truncate">
                      <a
                        href={`#${item.id}`}
                        className="text-slate-700 hover:text-primary font-medium transition-colors"
                      >
                        <span className="font-bold text-primary mr-1.5">
                          {idx + 1}.
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* ================= EDITORIAL CONTENT (article-content) ================= */}
              <div className="article-content mt-8 max-w-none">
                <h2 id="experiencia-y-propuesta">
                  1. Experiencia, Ambiente y Estilo en {barberia.name}
                </h2>
                <p>
                  {barberia.vibeDescription} En un mercado tan competitivo como
                  el de <strong>{barberia.district}</strong> en{" "}
                  <strong>{barberia.city}</strong>, esta barbería ha logrado
                  destacar gracias a una propuesta centrada en la excelencia
                  técnica, la puntualidad en la atención y el cuidado integral
                  de la imagen masculina.
                </p>
                <p>
                  Quienes visitan su local en <strong>{barberia.address}</strong>{" "}
                  coinciden en que la experiencia comienza desde la recepción:
                  los barberos realizan un breve diagnóstico del tipo de
                  cráneo, la dirección de crecimiento del cabello y la densidad
                  del vello facial antes de recomendar un estilo. Entre sus
                  especialidades más solicitadas sobresalen:
                </p>
                <ul>
                  {barberia.specialties.map((spec, idx) => (
                    <li key={idx}>
                      <strong>{spec}</strong>, ejecutado con herramientas
                      esterilizadas e insumos dermatológicamente seguros.
                    </li>
                  ))}
                </ul>

                {/* Secondary Real Photo of the Barbershop */}
                <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <img
                    src={barberia.secondaryImageUrl}
                    alt={`Interior y servicio de corte y barba en ${barberia.name} (${barberia.district})`}
                    className="w-full max-h-[380px] object-cover !my-0"
                    loading="lazy"
                  />
                  <p className="bg-slate-50 px-4 py-2 text-xs text-slate-500 !mb-0 border-t border-slate-200">
                    Detalle del servicio de corte de precisión y ritual de barba
                    en {barberia.name} ({barberia.district}, {barberia.city}).
                  </p>
                </div>

                <h2 id="resenas-google">
                  2. Principales Reseñas en Google de {cleanShortName} (
                  {barberia.rating.toFixed(1)} ★ sobre {barberia.reviewCount}{" "}
                  Opiniones)
                </h2>
                <p>
                  Para elaborar el ranking de{" "}
                  <strong>GuíaDeBarberías.com</strong>, analizamos las reseñas
                  públicas más representativas que los clientes han dejado en{" "}
                  <strong>Google Maps</strong> sobre{" "}
                  <strong>{barberia.name}</strong>. Con un promedio verificado
                  de <strong>{barberia.rating.toFixed(1)} estrellas</strong>,
                  estos son los comentarios que mejor resumen la calidad de su
                  servicio:
                </p>
              </div>

              {/* Visual Google Reviews Cards */}
              <div className="my-6 space-y-4">
                {barberia.allReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-900 text-amber-400 font-extrabold flex items-center justify-center text-sm">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-900">
                            {rev.author}
                          </h3>
                          <span className="text-xs text-slate-400">
                            {rev.date} · Servicio:{" "}
                            <strong className="text-emerald-700">
                              {rev.service}
                            </strong>
                          </span>
                        </div>
                      </div>
                      <GoogleStars
                        rating={rev.rating}
                        size="sm"
                        showGoogleLabel={false}
                      />
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              <div className="article-content max-w-none">
                <h2 id="servicios-y-precios">
                  3. Servicios Destacados y Tabla de Precios Referenciales
                </h2>
                <p>
                  Los precios en <strong>{barberia.name}</strong> se mantienen
                  dentro del rango de <strong>{barberia.priceRange}</strong>,
                  acorde con el nivel de sus instalaciones en{" "}
                  <strong>{barberia.district}</strong> y el tiempo dedicado a
                  cada cliente (entre 40 y 60 minutos por sesión). A
                  continuación, detallamos los valores referenciales de su carta
                  de servicios:
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Servicio de Barbería</th>
                      <th>Qué Incluye</th>
                      <th>Precio Referencial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Corte de Cabello (Clásico o Fade)</strong>
                      </td>
                      <td>
                        Asesoría de visagismo, corte a tijera/máquina, lavado
                        capilar y peinado con producto profesional.
                      </td>
                      <td>
                        <strong>{barberia.cutPrice}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Ritual & Perfilado de Barba</strong>
                      </td>
                      <td>
                        Rebaje escultural, toalla caliente aromática, afeitado a
                        navaja e hidratación post-barba.
                      </td>
                      <td>
                        <strong>{barberia.beardPrice}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Paquete Completo (Corte + Barba VIP)</strong>
                      </td>
                      <td>
                        Servicio integral de corte de cabello + ritual completo
                        de barba + perfilado de cejas.
                      </td>
                      <td>
                        <strong>{barberia.comboPrice}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Limpieza Facial & Mascarilla Negra</strong>
                      </td>
                      <td>
                        Exfoliación facial, vapor de ozono, mascarilla de carbón
                        activado y tónico cerrador de poros.
                      </td>
                      <td>
                        <strong>S/ 35 – S/ 50</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* In-Article You Minox Protagonist Card */}
              <div id="cuidado-barba-you-minox" className="scroll-mt-24">
                <YouMinoxSpotlight
                  variant="article"
                  barberiaName={barberia.name}
                />
              </div>

              <div className="article-content max-w-none">
                <h3>
                  Por qué complementar tu visita a {cleanShortName} con You
                  Minox en Crema-Gel
                </h3>
                <p>
                  Muchos clientes que acuden a{" "}
                  <strong>
                    {barberia.name} en {barberia.district}
                  </strong>{" "}
                  buscan lucir una barba cuadrada, simétrica y densa. Sin
                  embargo, cuando existen zonas despobladas en las mejillas o en
                  los conectores del bigote, el mejor aliado en casa es{" "}
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    You Minox al 5% en Crema-Gel (youminox.com)
                  </a>
                  .
                </p>
                <blockquote>
                  &ldquo;Mientras tu barbero en {cleanShortName} se encarga de
                  darle simetría y líneas perfectas a tu barba cada 2 o 3
                  semanas, aplicar You Minox en Crema-Gel a diario nutre la piel
                  sin el ardor ni la caspa del alcohol líquido y activa los
                  folículos para rellenar los huecos.&rdquo;
                </blockquote>

                <AdBanner className="my-8" />

                <h2 id="ubicacion-y-mapa">
                  4. Ubicación Exacta, Horarios y Cómo Llegar a{" "}
                  {cleanShortName} en {barberia.district}
                </h2>
                <p>
                  Visitar <strong>{barberia.name}</strong> es sumamente sencillo.
                  El local se ubica en <strong>{barberia.address}</strong> (
                  {barberia.district}, {barberia.city}) y atiende en el horario
                  de <strong>{barberia.schedule}</strong>. Te recomendamos
                  reservar con anticipación especialmente los viernes por la
                  tarde y sábados.
                </p>
              </div>

              {/* Interactive Google Maps Embed + Direct Link */}
              <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xs">
                <div className="aspect-[16/9] w-full bg-slate-200">
                  <iframe
                    title={`Mapa de ubicación de ${barberia.name} en ${barberia.address}`}
                    src={barberia.googleMapsEmbedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-primary">
                      📍 Ubicación Verificada en {barberia.district},{" "}
                      {barberia.city}
                    </p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {barberia.address}
                    </p>
                  </div>
                  <a
                    href={barberia.googleMapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-primary transition shrink-0"
                  >
                    Abrir en Google Maps ↗
                  </a>
                </div>
              </div>

              {/* FAQ Section */}
              <div id="preguntas-frecuentes" className="article-content mt-10">
                <h2>5. Preguntas Frecuentes sobre {barberia.name}</h2>
              </div>
              <div className="mt-4 space-y-4">
                {barberia.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <h3 className="text-base font-extrabold text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* End-of-Article AdSense Banner */}
              <AdBanner className="my-10" />

              {/* CTA Banner inside article — Exact Dinamica.pe style adapted for You Minox */}
              <div className="mt-14 rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-8 sm:p-10 text-center text-white shadow-lg">
                <span className="inline-block rounded-full bg-white/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-100 mb-3">
                  ✨ Creado e Impulsado por You Minox (youminox.com)
                </span>
                <h3 className="text-2xl font-extrabold">
                  ¿Listo para lucir una barba tupida y sin irritación en tu
                  próxima visita a la barbería?
                </h3>
                <p className="mt-2 text-emerald-50 max-w-xl mx-auto text-sm sm:text-base">
                  Descubre por qué más de 600,000 seguidores en el Perú eligen{" "}
                  <strong>You Minox en Crema-Gel</strong> (con registro
                  sanitario DIGEMID) para estimular el crecimiento de barba y
                  cabello sin la resequedad del alcohol líquido.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-gray-900 transition hover:brightness-105 shadow-md"
                  >
                    Ir a la Tienda Oficial: YouMinox.com ↗
                  </a>
                  <Link
                    href="/#buscador-barberias"
                    className="inline-block rounded-xl bg-slate-950/80 border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-950"
                  >
                    Explorar +110 Barberías del Perú
                  </Link>
                </div>
              </div>

              {/* Author Box (E-E-A-T — Charlie Lingán & You Minox) */}
              <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/brand/charlie-lingan.webp"
                  alt="Charlie Lingán — Fundador de You Minox y GuíaDeBarberías.com"
                  className="h-20 w-20 rounded-2xl object-cover shrink-0 border-2 border-primary shadow-xs"
                  loading="lazy"
                />
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Link
                      href="/nosotros/"
                      className="text-base font-extrabold text-gray-900 hover:text-primary"
                    >
                      Equipo Editorial GuíaDeBarberías.com & Charlie Lingán
                    </Link>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
                      Impulsado por You Minox
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Guía verificada por el equipo de{" "}
                    <a
                      href={YOU_MINOX_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-primary hover:underline"
                    >
                      You Minox (youminox.com)
                    </a>{" "}
                    y <strong>MINOXIDIL PERU S.A.C.</strong> Analizamos de forma
                    objetiva las calificaciones públicas, reseñas de clientes y
                    servicios de las mejores barberías del Perú.
                  </p>
                </div>
              </div>

              {/* Bottom Related Barberias Grid */}
              {relatedBarberias.length > 0 && (
                <section className="mt-14 pt-10 border-t border-gray-200">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                    Otras Barberías Recomendadas cerca de {barberia.district} (
                    {barberia.city})
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {relatedBarberias.map((rb) => (
                      <Link
                        key={rb.id}
                        href={getBarberiaUrl(rb)}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg hover:border-primary/40"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                          <img
                            src={rb.imageUrl}
                            alt={rb.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <span className="absolute top-2.5 right-2.5 rounded-full bg-slate-950/90 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-400">
                            ★ {rb.rating.toFixed(1)} ({rb.reviewCount})
                          </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-primary uppercase">
                              📍 {rb.district}, {rb.city}
                            </span>
                            <h3 className="mt-1 text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                              {rb.name}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500 truncate">
                              {rb.address}
                            </p>
                          </div>
                          <span className="mt-3 inline-block text-xs font-bold text-primary">
                            Ver reseñas y precios →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* ================= STICKY SIDEBAR (Exact Dinamica.pe style) ================= */}
            <aside className="mt-12 lg:mt-0 lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-28 space-y-8">
                {/* Official You Minox Sidebar Card */}
                <YouMinoxSpotlight variant="sidebar" />

                {/* Related Barberias in City Box (Exact Dinamica.pe style) */}
                {sameCityBarberias.length > 0 && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6">
                    <h3 className="mb-4 text-base font-bold text-gray-900">
                      Más Barberías en {barberia.city}
                    </h3>
                    <div className="space-y-4">
                      {sameCityBarberias.map((b) => (
                        <Link
                          key={b.id}
                          href={getBarberiaUrl(b)}
                          className="group flex gap-3 rounded-xl p-2 transition hover:bg-white"
                        >
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                            <img
                              src={b.imageUrl}
                              alt={b.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-2 text-xs font-bold text-gray-900 transition-colors group-hover:text-primary">
                              {b.name}
                            </h4>
                            <span className="mt-1 block text-[11px] font-semibold text-amber-600">
                              ★ {b.rating.toFixed(1)} · {b.district}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top National Ranking Box (Exact Dinamica.pe style) */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-base font-bold text-gray-900">
                    🏆 Top Barberías del Perú
                  </h3>
                  <div className="space-y-3">
                    {topNational.slice(0, 5).map((tb) => (
                      <Link
                        key={tb.id}
                        href={getBarberiaUrl(tb)}
                        className="block border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 group"
                      >
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span className="font-semibold text-primary">
                            {tb.district}, {tb.city}
                          </span>
                          <span className="font-bold text-amber-600">
                            ★ {tb.rating.toFixed(1)}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                          {tb.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Blog Guides Box in Sidebar */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-base font-bold text-gray-900">
                    📰 Guías de Barba & Barbería
                  </h3>
                  <div className="space-y-3">
                    {getAllBlogArticles().slice(0, 4).map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}/`}
                        className="block border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 group"
                      >
                        <span className="text-[11px] font-bold uppercase text-primary">
                          {post.category}
                        </span>
                        <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                          {post.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sidebar Sticky AdSense Unit */}
                <AdBanner format="vertical" className="min-h-[250px]" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
