import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import BlogListClient from "./BlogListClient";
import { getAllBlogArticleSummaries } from "@/data/blog-posts";
import {
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
  getAllCities,
} from "@/lib/barberias";

export const metadata: Metadata = {
  title: `105 Guías de Barbería, Cortes Masculinos y Cuidado de Barba | ${SITE_NAME}`,
  description:
    "Explora nuestras 105 guías especializadas de cortes por tipo de rostro y cabello, fades, afeitado clásico, herramientas de barbería, negocio y cuidado de barba con You Minox.",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title: `Guías Oficiales de Barbería, Visagismo y Cuidado de Barba | ${SITE_NAME}`,
    description:
      "Consejos de barberos profesionales del Perú sobre cortes masculinos, fades, afeitado clásico y crecimiento de barba.",
    url: `${SITE_URL}/blog/`,
    type: "website",
    locale: "es_PE",
    siteName: SITE_NAME,
  },
};

export default function BlogIndexPage() {
  const articles = getAllBlogArticleSummaries();
  const cities = getAllCities().slice(0, 8);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Enciclopedia Editorial de Barbería de ${SITE_NAME}`,
    description:
      "Guías especializadas sobre fades, visagismo, cortes según tipo de cabello, afeitado clásico, herramientas de barbería y cuidado de barba.",
    url: `${SITE_URL}/blog/`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: articles.slice(0, 30).map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      url: `${SITE_URL}/blog/${a.slug}/`,
      datePublished: a.publishedAt,
      image: `${SITE_URL}${a.imageUrl}`,
      author: {
        "@type": "Person",
        name: a.author,
      },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="min-h-screen bg-slate-50 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Guías de Barbería & Barba" },
              ]}
            />
            <div className="mt-6 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-extrabold text-emerald-300 mb-4">
                💈 {articles.length} Guías de Barbería & Estilo Masculino • Impulsado por You Minox
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Enciclopedia de Barbería, Visagismo y Crecimiento de Barba
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Explora nuestras <strong>{articles.length} guías especializadas</strong> en 10 categorías: fades y visagismo, cortes según cabello y ocasión, afeitado clásico, herramientas de barbería y cuidado de barba con{" "}
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold underline hover:text-amber-300"
                >
                  You Minox al 5% en Crema-Gel
                </a>{" "}
                y qué corte pedir según tu tipo de rostro.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
          <AdBanner className="mb-10" />

          {/* Interactive 500-Article Explorer */}
          <BlogListClient articles={articles} />

          <div className="my-14">
            <YouMinoxSpotlight variant="home" />
          </div>

          {/* Internal Links to City Rankings */}
          <section className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Encuentra las Mejores Barberías del Perú por Ciudad
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pon en práctica estos consejos reservando cita en las barberías con mejor calificación en Google de tu ciudad:
            </p>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ciudad/${c.slug}/`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-extrabold text-slate-800 hover:border-primary hover:text-primary transition flex items-center justify-between"
                >
                  <span>💈 {c.name}</span>
                  <span className="text-xs text-amber-600">★ {c.avgRating}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
