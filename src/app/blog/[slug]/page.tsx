import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getLegacyBlogRedirect } from "@/data/blog-legacy-redirects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import {
  getAllBlogArticles,
  getBlogArticleBySlug,
  getRelatedBlogArticles,
  type BlogArticle,
} from "@/data/blog-posts";
import {
  getTopNationalBarberias,
  getBarberiaUrl,
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
  COMPANY_NAME,
} from "@/lib/barberias";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogArticles().map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return { title: `Artículo no encontrado | ${SITE_NAME}` };
  }

  const canonicalUrl = `${SITE_URL}/blog/${article.slug}/`;
  const absoluteImageUrl = `${SITE_URL}${article.imageUrl}`;
  const metaDescription = clampDescription(article.excerpt);

  return {
    // The root layout template already appends "| SITE_NAME"; skip it when the title would exceed ~65 chars
    title: buildSeoTitle(article.seoTitle),
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.seoTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: "article",
      locale: "es_PE",
      siteName: SITE_NAME,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 675,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: metaDescription,
      images: [absoluteImageUrl],
    },
  };
}

const TITLE_SUFFIX_LENGTH = ` | ${SITE_NAME}`.length;
const MAX_TITLE_LENGTH = 65;

function buildSeoTitle(seoTitle: string): Metadata["title"] {
  return seoTitle.length + TITLE_SUFFIX_LENGTH <= MAX_TITLE_LENGTH
    ? seoTitle
    : { absolute: seoTitle };
}

/** Keeps meta descriptions within ~160 chars, cutting at a word boundary. */
function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : cut.length).replace(/[\s,;:.—-]+$/, "")}…`;
}

/** Only beard/minoxidil guides (and the founder's pillar guides) carry the You Minox promotion. */
function showsProductPromo(article: BlogArticle): boolean {
  return article.categorySlug === "barba-y-minoxidil" || isFounderAuthored(article);
}

function isFounderAuthored(article: BlogArticle): boolean {
  return article.author.includes("Charlie");
}

/**
 * 6 Plantillas Dinámicas (Layouts A–F) estilo Dinamica.pe para eliminar
 * cualquier huella repetitiva entre las 500 guías de barbería y barba.
 */
function VariantTopModule({ article }: { article: BlogArticle }) {
  switch (article.layoutVariant) {
    case "geoperu": {
      const geo = article.geoPeruInfo;
      return (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-extrabold text-emerald-300">
                📍 Guía Oficial de Barberías en {geo?.locationName || "Perú"}
              </span>
              <span className="text-xs font-bold text-amber-300">
                🇵🇪 Cobertura: GuíaDeBarberías.com + YouMinox.com
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Zona / Región
                </span>
                <p className="mt-1 text-sm font-extrabold text-white">
                  {geo?.locationName}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {geo?.regionLabel}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Factor Climático en Barba
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-200 leading-relaxed">
                  {geo?.climateNote}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Zonas de Barberías
                </span>
                <p className="mt-1 text-xs font-semibold text-slate-200 leading-relaxed">
                  {geo?.avenuesNote}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/15 p-3.5 border border-emerald-400/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                  #1 Recomendado por Barberos
                </span>
                <p className="mt-1 text-xs font-extrabold text-white">
                  You Minox Crema-Gel 60g (DIGEMID)
                </p>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  {geo?.deliveryTime}
                </p>
              </div>
            </div>
          </div>

          {article.localBarberias && article.localBarberias.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                    💈 Sedes Verificadas con Estrellas de Google
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Top Barberías Recomendadas en{" "}
                    {geo?.locationName || "Perú"}
                  </h2>
                </div>
                <Link
                  href="/#ranking-peru"
                  className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-primary transition"
                >
                  Ver Ranking Nacional →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.localBarberias.map((b) => (
                  <Link
                    key={b.id}
                    href={`/barberia/${b.slug}/`}
                    className="group rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-primary hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          {b.badge}
                        </span>
                        <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-900">
                          ★ {b.rating.toFixed(1)} ({b.reviewCount})
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-extrabold text-slate-900 group-hover:text-primary">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        📍 {b.address}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-700 mt-2">
                        ✂️ {b.styleTag}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                      <span>
                        Corte: {b.cutPrice} · Barba: {b.beardPrice}
                      </span>
                      <span className="text-primary font-extrabold group-hover:underline">
                        Ver ficha →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    case "geomundo": {
      const world = article.geoMundoInfo;
      return (
        <div className="mt-8 rounded-2xl border-2 border-blue-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{world?.flag || "🌎"}</span>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Observatorio Internacional de Barbería y Barba
                </span>
                <h2 className="text-lg font-extrabold text-white">
                  Mercado Analizado: {world?.locationName}
                </h2>
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300">
              Regulador Oficial: {world?.regulator}
            </span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
              <span className="text-[11px] font-bold uppercase text-blue-300 block">
                Marcas Locales Comercializadas
              </span>
              <p className="mt-1 text-xs font-bold text-white leading-relaxed">
                {world?.localBrands}
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
              <span className="text-[11px] font-bold uppercase text-blue-300 block">
                Moneda y Entorno Regulatorio
              </span>
              <p className="mt-1 text-xs font-bold text-white">
                {world?.currency} · Normativa {world?.regulator}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/20 p-3.5 border border-emerald-400/40">
              <span className="text-[11px] font-bold uppercase text-emerald-300 block">
                Referente en Formato Crema-Gel (Perú 🇵🇪)
              </span>
              <p className="mt-1 text-xs font-extrabold text-white">
                #1 You Minox Crema 60g (9.9/10)
              </p>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-emerald-300 underline mt-0.5 inline-block"
              >
                Conocer fórmula en YouMinox.com ↗
              </a>
            </div>
          </div>
        </div>
      );
    }

    case "comparativa": {
      return (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
              🏆 Evaluación de Barberos Profesionales • GuíaDeBarberías.com
            </span>
            <span className="text-xs font-bold text-slate-500">
              Puntaje de Tolerancia en Piel y Barba
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/70 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-emerald-900">
                  🥇 #1 Recomendado en Barberías 🇵🇪
                </span>
                <span className="rounded-lg bg-emerald-700 px-2.5 py-1 text-xs font-black text-white">
                  9.9 / 10
                </span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">
                You Minox al 5% en Crema-Gel (60 g)
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-xs text-emerald-950 font-medium">
                <li>✓ Cero caspa de barba y piel hidratada lista para la navaja</li>
                <li>✓ Enriquecido con Oxothiazolidinecarboxylate sin goteo</li>
                <li>✓ Notificación Sanitaria DIGEMID (MINOXIDIL PERU S.A.C.)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-slate-600">
                  🥈 #2 Lociones Líquidas con Alcohol 🇺🇸
                </span>
                <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-black text-white">
                  8.5 / 10
                </span>
              </div>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">
                Kirkland Signature / Goteros Tradicionales
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 font-medium">
                <li>• Efectivo pero contiene alto propilenglicol y alcohol</li>
                <li>• Genera descamación blanca que dificulta el perfilado</li>
                <li>• Se escurre hacia los labios y tarda 60 min en secar</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    case "timeline": {
      const stages = [
        {
          step: "Etapa 1 (Mes 1–2)",
          title: "Despertar Vellus",
          pct: "25%",
          desc: "Mantén largo de 3 mm; evita navaja en mejillas mientras brotan vellos finos.",
        },
        {
          step: "Etapa 2 (Mes 3)",
          title: "Primer Perfilado",
          pct: "55%",
          desc: "Define línea del cuello y pómulo alto en barbería e iguala con peine #2.",
        },
        {
          step: "Etapa 3 (Mes 4–5)",
          title: "Cierre de Huecos",
          pct: "85%",
          desc: "Conexión de bigote y candado con recambio hacia fibras oscuras y gruesas.",
        },
        {
          step: "Etapa 4 (Mes 6+)",
          title: "Beard Fade Completo",
          pct: "100%",
          desc: "Barba terminal definitiva lista para degradado lateral y ritual de toalla caliente.",
        },
      ];
      return (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
              <span>⏱️</span> Cronograma de Barbería y Crecimiento Folicular (Mes 1 a Mes 6)
            </h2>
            <span className="text-xs font-bold text-primary">
              You Minox Crema-Gel: 2 veces al día
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-emerald-200/80 bg-white p-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between text-[11px] font-extrabold text-primary">
                  <span>{s.step}</span>
                  <span>{s.pct}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-emerald-100 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: s.pct }}
                  />
                </div>
                <h3 className="mt-2 text-xs font-extrabold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "barberia": {
      const faces = [
        {
          shape: "Rostro Redondo",
          tip: "Perfila pómulos en diagonal y deja mayor longitud en el mentón para estilizar y alargar el rostro.",
        },
        {
          shape: "Rostro Cuadrado",
          tip: "Suaviza los ángulos mandibulares con un degradado lateral (Beard Fade) y contornos limpios.",
        },
        {
          shape: "Rostro Ovalado",
          tip: "Proporción equilibrada que admite barba corporativa cerrada, estilo leñador o barba de 3 días.",
        },
        {
          shape: "Rostro Alargado",
          tip: "Mantén mayor densidad en patillas y mejillas con You Minox y recorta la base del mentón.",
        },
      ];
      return (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block">
                ✂️ Ficha Técnica de Visagismo & Sillón de Barbería
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Geometría Facial y Diseño de Barba según tu Rostro
              </h2>
            </div>
            <Link
              href="/#ranking-peru"
              className="rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400 transition"
            >
              Top Barberías Perú →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {faces.map((f) => (
              <div
                key={f.shape}
                className="rounded-xl bg-white/5 border border-white/10 p-3.5"
              >
                <h3 className="text-xs font-extrabold text-emerald-300">
                  🧔 {f.shape}
                </h3>
                <p className="mt-1.5 text-[11px] text-slate-300 leading-relaxed">
                  {f.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "editorial": {
      return null;
    }

    default: {
      return (
        <div className="mt-8 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/50 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-teal-200/70">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-900">
              🔬 Protocolo Dermo-Facial para Clientes de Barbería
            </span>
            <span className="rounded-full bg-teal-900 px-3 py-0.5 text-[11px] font-bold text-teal-100">
              Respaldo DIGEMID • MINOXIDIL PERU S.A.C.
            </span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-3.5 border border-teal-100">
              <span className="text-[11px] font-bold uppercase text-teal-700 block">
                Sinergia Molecular Activa
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900">
                Minoxidil 5% + Oxothiazolidinecarboxylate
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                Estimula el bulbo piloso y protege la piel recién perfilada.
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 border border-teal-100">
              <span className="text-[11px] font-bold uppercase text-teal-700 block">
                Vehículo Dermo-Compatible
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900">
                Crema-Gel 60 g (Absorción en 3 min)
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                Evita la foliculitis y la caspa de barba antes de tu corte.
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 border border-teal-100">
              <span className="text-[11px] font-bold uppercase text-teal-700 block">
                Triple Zona de Precisión
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900">
                Barba, Entradas Capilares y Cejas
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                No se licúa ni mancha el cuello de las camisas.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    const legacyTarget = getLegacyBlogRedirect(slug);
    if (legacyTarget) {
      permanentRedirect(legacyTarget);
    }
    notFound();
  }

  const relatedArticles = getRelatedBlogArticles(article.slug, 4);
  const topBarberias = getTopNationalBarberias(5);
  const canonicalUrl = `${SITE_URL}/blog/${article.slug}/`;
  const absoluteImageUrl = `${SITE_URL}${article.imageUrl}`;
  const productPromo = showsProductPromo(article);
  const founderAuthored = isFounderAuthored(article);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Guías de Barbería & Barba", href: "/blog/" },
    { label: article.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        image: article.secondaryImageUrl
          ? [absoluteImageUrl, `${SITE_URL}${article.secondaryImageUrl}`]
          : [absoluteImageUrl],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "es-PE",
        articleSection: article.category,
        author: founderAuthored
          ? {
              "@type": "Person",
              name: article.author,
              jobTitle: article.authorRole,
              url: "https://charlielingan.com/es",
              sameAs: [
                "https://charlielingan.com/es",
                "https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru",
                YOU_MINOX_URL,
              ],
            }
          : {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: `${SITE_URL}/nosotros/`,
            },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/brand/logo-guiadebarberias.png`,
            width: 512,
            height: 512,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: article.faqs.map((faq) => ({
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

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* ================= MAIN ARTICLE COLUMN ================= */}
            <article className="min-w-0 flex-1 lg:max-w-3xl">
              <div className="mb-4">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-primary"
                >
                  ← Volver a todas las Guías de Barbería
                </Link>
              </div>

              <Breadcrumbs items={breadcrumbItems} />

              <div className="mt-4 mb-5 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold text-primary">
                  {article.category}
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-amber-300">
                  {article.badgeLabel}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  ⏱️ {article.readTime} de lectura
                </span>
                <span className="text-xs font-medium text-gray-400">
                  📅 Actualizado: {article.updatedAt}
                </span>
                {productPromo && (
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition"
                  >
                    ✓ Respaldado por You Minox (youminox.com)
                  </a>
                )}
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl border-b border-slate-200 pb-6">
                {article.title}
              </h1>

              {/* Featured Image */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  width={1200}
                  height={675}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto max-h-[420px] object-cover"
                />
                <div className="bg-slate-950 text-slate-200 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span>📸 {article.imageAlt}</span>
                  {productPromo && (
                    <a
                      href={YOU_MINOX_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      YouMinox.com ↗
                    </a>
                  )}
                </div>
              </div>

              {/* 6 Dynamic Layout Top Module (Designs A–F) */}
              <VariantTopModule article={article} />

              {/* Key Takeaways Box */}
              <div className="mt-8 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 p-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-primary-dark mb-3 flex items-center gap-2">
                  <span>⚡</span> Puntos Clave de esta Guía para tu Barba y Corte
                </h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-black mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <AdBanner className="my-8" />

              {/* Table of Contents */}
              <nav
                aria-label="Tabla de contenidos"
                className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                  📋 Índice de Contenidos
                </p>
                <ol className="space-y-2 text-sm">
                  {article.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-700 hover:text-primary font-semibold transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Editorial HTML Body */}
              <div
                className="article-content mt-8 max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Secondary Image */}
              {article.secondaryImageUrl && (
                <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                  <img
                    src={article.secondaryImageUrl}
                    alt={`Cuidado y perfilado de barba profesional — ${article.title}`}
                    className="w-full max-h-[380px] object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {productPromo && (
                <div className="my-10">
                  <YouMinoxSpotlight variant="article" />
                </div>
              )}

              {/* FAQ Section */}
              <section id="preguntas-frecuentes" className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                  Preguntas Frecuentes sobre {article.category}
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
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
              </section>

              {/* E-E-A-T Author Box */}
              {founderAuthored ? (
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/brand/charlie-lingan.webp"
                  alt={article.author}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-20 w-20 rounded-full object-cover border-2 border-emerald-400 shrink-0"
                />
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Autor & Revisor Especialista
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">
                    <a
                      href="https://charlielingan.com/es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 underline decoration-emerald-400/50"
                    >
                      {article.author}
                    </a>{" "}
                    — {article.authorRole}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Creador y fundador de{" "}
                    <a
                      href={YOU_MINOX_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold underline"
                    >
                      You Minox (youminox.com)
                    </a>{" "}
                    y director de <strong>GuíaDeBarberías.com</strong>. Conoce la historia completa de cómo fundó la marca en su portal oficial{" "}
                    <a
                      href="https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 font-bold underline"
                    >
                      CharlieLingán.com ↗
                    </a>
                    .
                  </p>
                </div>
              </div>
              ) : (
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/brand/logo-guiadebarberias.png"
                  alt={`Logo de ${SITE_NAME}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-20 w-20 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Equipo Editorial
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">
                    {article.author} — {article.authorRole}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Guía elaborada por el equipo editorial de{" "}
                    <strong>{SITE_NAME}</strong>, sitio de {COMPANY_NAME} (empresa
                    detrás de la marca You Minox). Revisamos y actualizamos cada guía
                    con criterios de barbería profesional.{" "}
                    <Link
                      href="/nosotros/"
                      className="text-emerald-400 font-bold underline"
                    >
                      Conoce quiénes somos y nuestra metodología
                    </Link>
                    .
                  </p>
                </div>
              </div>
              )}

              {/* Related Articles */}
              <section className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-xl font-extrabold text-slate-900 mb-5">
                  Más Guías de Barbería y Barba Recomendadas
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}/`}
                      className="group rounded-2xl border border-slate-200 p-4 hover:border-primary hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-extrabold uppercase text-primary">
                          {rel.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-primary mt-1 line-clamp-2">
                          {rel.title}
                        </h3>
                      </div>
                      <span className="mt-3 text-xs font-bold text-emerald-700">
                        Leer guía completa →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </article>

            {/* ================= STICKY SIDEBAR ================= */}
            <aside className="mt-12 lg:mt-0 lg:w-80 xl:w-96 shrink-0">
              <div className="sticky top-24 space-y-6">
                {productPromo && <YouMinoxSpotlight variant="sidebar" />}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                    🏆 Top Barberías del Perú
                  </h3>
                  <ul className="space-y-3">
                    {topBarberias.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={getBarberiaUrl(b)}
                          className="group flex items-center justify-between gap-2 text-xs sm:text-sm"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-slate-800 group-hover:text-primary block truncate">
                              {b.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              📍 {b.district}, {b.city}
                            </span>
                          </div>
                          <span className="shrink-0 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-extrabold text-amber-900">
                            ★ {b.rating.toFixed(1)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#ranking-peru"
                    className="mt-4 block rounded-xl bg-slate-900 py-2.5 text-center text-xs font-extrabold text-white hover:bg-primary transition"
                  >
                    Ver Ranking Completo (+110) →
                  </Link>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                    📍 Ranking por Ciudad
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.relatedCitySlugs.map((citySlug) => (
                      <Link
                        key={citySlug}
                        href={`/ciudad/${citySlug}/`}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-primary hover:text-primary capitalize"
                      >
                        💈 Barberías en {citySlug}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
