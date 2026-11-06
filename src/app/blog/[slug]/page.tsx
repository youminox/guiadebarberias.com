import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import {
  getAllBlogArticles,
  getBlogArticleBySlug,
  getRelatedBlogArticles,
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

  return {
    title: `${article.seoTitle} | ${SITE_NAME}`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | ${SITE_NAME}`,
      description: article.excerpt,
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
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.excerpt,
      images: [absoluteImageUrl],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedBlogArticles(article.slug, 4);
  const topBarberias = getTopNationalBarberias(5);
  const canonicalUrl = `${SITE_URL}/blog/${article.slug}/`;
  const absoluteImageUrl = `${SITE_URL}${article.imageUrl}`;

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog de Barbería & Barba", href: "/blog/" },
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
        image: [absoluteImageUrl, `${SITE_URL}${article.secondaryImageUrl}`],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          "@type": "Person",
          name: article.author,
          jobTitle: article.authorRole,
          url: YOU_MINOX_URL,
        },
        publisher: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: SITE_URL,
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
                  ← Volver al Blog de Barbería y Barba
                </Link>
              </div>

              <Breadcrumbs items={breadcrumbItems} />

              <div className="mt-4 mb-5 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold text-primary">
                  💈 {article.category}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  ⏱️ {article.readTime} de lectura
                </span>
                <span className="text-xs font-medium text-gray-400">
                  📅 Actualizado: {article.updatedAt}
                </span>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition"
                >
                  ✓ Respaldado por You Minox (youminox.com)
                </a>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl border-b border-slate-200 pb-6">
                {article.title}
              </h1>

              {/* Featured Image */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  className="w-full max-h-[420px] object-cover"
                />
                <div className="bg-slate-950 text-slate-200 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span>📸 {article.imageAlt}</span>
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    YouMinox.com ↗
                  </a>
                </div>
              </div>

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
              <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
                <img
                  src={article.secondaryImageUrl}
                  alt={`Cuidado y perfilado de barba profesional — ${article.title}`}
                  className="w-full max-h-[380px] object-cover"
                  loading="lazy"
                />
              </div>

              <div className="my-10">
                <YouMinoxSpotlight variant="article" />
              </div>

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
              <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/images/brand/charlie-lingan.webp"
                  alt={article.author}
                  className="h-20 w-20 rounded-full object-cover border-2 border-emerald-400 shrink-0"
                />
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Autor & Revisor Especialista
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-0.5">
                    {article.author} — {article.authorRole}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Creador de{" "}
                    <a
                      href={YOU_MINOX_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold underline"
                    >
                      You Minox (youminox.com)
                    </a>{" "}
                    y director de <strong>GuíaDeBarberías.com</strong>. Especialista en regeneración folicular, visagismo de barba y protocolos dermatológicos con Notificación Sanitaria DIGEMID en el Perú.
                  </p>
                </div>
              </div>

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
                <YouMinoxSpotlight variant="sidebar" />

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
