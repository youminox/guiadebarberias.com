import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clampDescription, fitTitle } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import {
  getAllHerramientasArticles,
  getHerramientaBySlug,
  getRelatedHerramientas,
} from "@/data/herramientas";
import { resolveBarberAmazonProducts } from "@/lib/amazon";
import {
  getTopNationalBarberias,
  getBarberiaUrl,
  SITE_NAME,
  SITE_URL,
} from "@/lib/barberias";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllHerramientasArticles().map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHerramientaBySlug(slug);

  if (!article) {
    return { title: `Herramienta no encontrada | ${SITE_NAME}` };
  }

  const canonicalUrl = `${SITE_URL}/herramientas/${article.slug}/`;
  const absoluteImageUrl = `${SITE_URL}${article.imageUrl}`;
  const metaDescription = clampDescription(article.excerpt);

  return {
    title: fitTitle(article.seoTitle),
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

export default async function HerramientaDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getHerramientaBySlug(slug);

  if (!article) {
    notFound();
  }

  const amazonProducts = resolveBarberAmazonProducts(
    article.amazonProductKeys,
    article.slug,
    article.title
  );
  const relatedTools = getRelatedHerramientas(article.slug, 4);
  const topBarberias = getTopNationalBarberias(4);
  const canonicalUrl = `${SITE_URL}/herramientas/${article.slug}/`;
  const absoluteImageUrl = `${SITE_URL}${article.imageUrl}`;

  const allInCluster = getAllHerramientasArticles()
    .filter((a) => a.cluster === article.cluster)
    .sort((a, b) => a.id - b.id);
  const idxInCluster = allInCluster.findIndex((a) => a.slug === article.slug);
  const clusterNav =
    allInCluster.length > 2
      ? {
          prev: allInCluster[
            (idxInCluster - 1 + allInCluster.length) % allInCluster.length
          ],
          next: allInCluster[(idxInCluster + 1) % allInCluster.length],
        }
      : null;

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Herramientas de Barbería", href: "/herramientas/" },
    { label: article.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${canonicalUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        image: [absoluteImageUrl],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "es-PE",
        articleSection: article.clusterLabel,
        author: {
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
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Herramientas de Barbería",
            item: `${SITE_URL}/herramientas/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
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
                  href="/herramientas/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-amber-600"
                >
                  ← Volver al Laboratorio de Herramientas (105 Guías)
                </Link>
              </div>

              <Breadcrumbs items={breadcrumbItems} />

              <div className="mt-4 mb-5 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-amber-500/15 border border-amber-400/50 px-3.5 py-1 text-xs font-extrabold text-amber-900">
                  {article.clusterLabel}
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-amber-300">
                  {article.badgeLabel}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  🏷️ {article.brand}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  ⏱️ {article.readTime} de lectura
                </span>
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
                  className="w-full h-auto max-h-[400px] object-cover"
                />
                <div className="bg-slate-950 text-slate-200 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span>📸 {article.imageAlt}</span>
                  <span className="text-amber-400 font-bold">
                    Laboratorio Técnico GuíaDeBarberías.com
                  </span>
                </div>
              </div>

              {/* Top Amazon Affiliate Box: VS Card for comparativas, Verdict Card for reviews/guides */}
              <AmazonAffiliateBox
                variant={article.cluster === "comparativa" ? "vs" : "verdict"}
                products={amazonProducts}
              />

              {/* Technical Specifications Table */}
              <section
                aria-label="Ficha de especificaciones técnicas"
                className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs"
              >
                <div className="bg-slate-900 px-5 py-3.5 text-white flex items-center justify-between">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                    ⚙️ Ficha Técnica & Especificaciones Verificadas
                  </h2>
                  <span className="text-xs font-bold text-slate-300">
                    {article.brand}
                  </span>
                </div>
                <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {article.specs.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3 odd:bg-slate-50/70"
                    >
                      <span className="font-extrabold text-slate-900">
                        {row.label}
                      </span>
                      <span className="sm:col-span-2 text-slate-700 font-medium">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pros & Cons Grid */}
              <section
                aria-label="Ventajas y puntos a considerar"
                className="my-8 grid gap-5 sm:grid-cols-2"
              >
                <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/50 p-5">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                    <span>✅</span> Lo Mejor (Ventajas Reales)
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-800">
                    {article.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-black mt-0.5">
                          ✓
                        </span>
                        <span className="leading-relaxed">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-50/40 p-5">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                    <span>⚠️</span> Puntos a Tener en Cuenta
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-800">
                    {article.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-black mt-0.5">
                          •
                        </span>
                        <span className="leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Key Takeaways Box */}
              <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <span>⚡</span> Conclusiones Rápidas para el Barbero
                </h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-600 font-black mt-0.5">★</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Table of Contents */}
              {article.toc.length > 1 && (
                <nav
                  aria-label="Tabla de contenidos"
                  className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
                >
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
                    📋 Índice del Análisis
                  </p>
                  <ol className="space-y-1.5 text-sm">
                    {article.toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-slate-700 hover:text-amber-600 font-semibold transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="#preguntas-frecuentes"
                        className="text-slate-700 hover:text-amber-600 font-semibold transition-colors"
                      >
                        Preguntas Frecuentes (FAQ)
                      </a>
                    </li>
                  </ol>
                </nav>
              )}

              {/* First Half of Editorial Content */}
              <div
                className="article-content mt-8 max-w-none"
                dangerouslySetInnerHTML={{ __html: article.contentFirstHalf }}
              />

              {/* Mid-Article Inline Amazon Affiliate Card */}
              <AmazonAffiliateBox variant="inline" products={amazonProducts} />

              {/* Second Half of Editorial Content */}
              {article.contentSecondHalf && (
                <div
                  className="article-content mt-8 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: article.contentSecondHalf,
                  }}
                />
              )}

              {/* Bottom 3-Product Showcase */}
              <AmazonAffiliateBox
                variant="showcase"
                sectionTitle={`Equipamiento y Repuestos Recomendados para ${article.brand}`}
                sectionSubtitle="Compara disponibilidad y ofertas actuales en tu tienda Amazon con envío directo."
                products={amazonProducts}
              />

              {/* FAQ Section */}
              <section
                id="preguntas-frecuentes"
                className="mt-12 pt-8 border-t border-slate-200"
              >
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                  Preguntas Frecuentes
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

              {/* Cluster Prev / Next Navigation Ring */}
              {clusterNav && (
                <nav
                  aria-label="Navegación en la misma categoría de herramientas"
                  className="mt-10 grid gap-4 sm:grid-cols-2 pt-8 border-t border-slate-200"
                >
                  <Link
                    href={`/herramientas/${clusterNav.prev.slug}/`}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-amber-400 hover:bg-white"
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      ← Anterior en {article.clusterLabel}
                    </span>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 group-hover:text-amber-600">
                      {clusterNav.prev.title}
                    </p>
                  </Link>
                  <Link
                    href={`/herramientas/${clusterNav.next.slug}/`}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-amber-400 hover:bg-white"
                  >
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Siguiente en {article.clusterLabel} →
                    </span>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 group-hover:text-amber-600">
                      {clusterNav.next.title}
                    </p>
                  </Link>
                </nav>
              )}

              {/* Related Tools Grid */}
              <section className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Más Análisis y Comparativas Relacionadas
                  </h2>
                  <Link
                    href="/herramientas/"
                    className="text-xs font-extrabold text-amber-600 hover:underline"
                  >
                    Ver las 105 herramientas →
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {relatedTools.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/herramientas/${rel.slug}/`}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-amber-400 hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-900">
                          {rel.badgeLabel}
                        </span>
                        <h3 className="mt-2 text-sm font-extrabold text-slate-900 group-hover:text-amber-600 leading-snug">
                          {rel.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                      <span className="mt-3 text-xs font-extrabold text-amber-600">
                        Leer análisis técnico →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </article>

            {/* ================= STICKY RIGHT SIDEBAR ================= */}
            <aside className="mt-12 lg:mt-0 lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-6">
                <AmazonAffiliateBox
                  variant="sidebar"
                  products={amazonProducts}
                />

                {/* Quick Cluster Navigation Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    💈 Categorías de Herramientas
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs font-bold text-slate-700">
                    <li>
                      <Link
                        href="/herramientas/"
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-slate-200 hover:border-amber-400"
                      >
                        <span>🏆 Reseñas de Máquinas</span>
                        <span className="text-amber-600">32</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/herramientas/"
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-slate-200 hover:border-amber-400"
                      >
                        <span>⚔️ Producto vs Producto</span>
                        <span className="text-amber-600">28</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/herramientas/"
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-slate-200 hover:border-amber-400"
                      >
                        <span>🛒 Rankings & Guías Compra</span>
                        <span className="text-amber-600">25</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/herramientas/"
                        className="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-slate-200 hover:border-amber-400"
                      >
                        <span>🔩 Repuestos & Info Técnica</span>
                        <span className="text-amber-600">20</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Top National Barbershops Widget */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                    🇵🇪 Directorio Verificado
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                    Top Barberías del Perú
                  </h3>
                  <ul className="mt-3 space-y-2.5 text-xs">
                    {topBarberias.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={getBarberiaUrl(b)}
                          className="group flex items-center justify-between gap-2 text-slate-700 hover:text-primary"
                        >
                          <span className="font-bold truncate group-hover:underline">
                            {b.name}
                          </span>
                          <span className="shrink-0 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-black text-amber-900">
                            ★ {b.rating.toFixed(1)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
