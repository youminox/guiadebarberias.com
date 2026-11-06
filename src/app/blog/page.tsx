import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import { getAllBlogArticles } from "@/data/blog-posts";
import {
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
  getAllCities,
} from "@/lib/barberias";

export const metadata: Metadata = {
  title: `Blog de Barbería, Diseño de Barba y Minoxidil | ${SITE_NAME}`,
  description:
    "Guías especializadas de visagismo masculino, cuándo perfilar tu barba usando Minoxidil, ritual de toalla caliente y navaja, cortes para entradas y cuidado post-barbería en el Perú.",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title: `Blog Oficial de Barbería, Visagismo y Cuidado de Barba | ${SITE_NAME}`,
    description:
      "Consejos de maestros barberos del Perú y especialistas en crecimiento folicular con You Minox en Crema-Gel.",
    url: `${SITE_URL}/blog/`,
    type: "website",
    locale: "es_PE",
    siteName: SITE_NAME,
  },
};

export default function BlogIndexPage() {
  const articles = getAllBlogArticles();
  const cities = getAllCities().slice(0, 8);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog Oficial de ${SITE_NAME}`,
    description:
      "Guías clínicas y de barbería sobre diseño de barba, visagismo, cortes masculinos y aplicación de Minoxidil en Crema-Gel.",
    url: `${SITE_URL}/blog/`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: articles.map((a) => ({
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
                { label: "Blog de Barbería & Barba" },
              ]}
            />
            <div className="mt-6 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-extrabold text-emerald-300 mb-4">
                💈 Guías de Barberos & Especialistas en Barba • Impulsado por You Minox
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Blog de Barbería, Visagismo y Crecimiento de Barba
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Aprende cuándo y cómo perfilar tu barba en la barbería mientras usas{" "}
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold underline hover:text-amber-300"
                >
                  You Minox al 5% en Crema-Gel
                </a>
                , qué corte pedir para disimular entradas o huecos en las mejillas y cómo cuidar tu piel después de la navaja.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
          <AdBanner className="mb-10" />

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, idx) => (
              <article
                key={article.id}
                className={`group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition hover:shadow-lg hover:border-primary flex flex-col justify-between ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <Link href={`/blog/${article.slug}/`} className="block relative overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.imageAlt}
                      className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                        idx === 0 ? "h-64 sm:h-80" : "h-52"
                      }`}
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-950/85 backdrop-blur-xs px-3 py-1 text-xs font-extrabold text-emerald-400">
                        {article.category}
                      </span>
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">
                        ⏱️ {article.readTime}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="text-xs text-slate-400 font-semibold mb-2">
                      Por <strong className="text-slate-700">{article.author}</strong> • Actualizado el {article.publishedAt}
                    </div>
                    <h2
                      className={`font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-snug ${
                        idx === 0 ? "text-xl sm:text-2xl" : "text-lg"
                      }`}
                    >
                      <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    ✓ Guía Verificada por Barberos
                  </span>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3.5 py-2 text-xs font-extrabold text-primary group-hover:bg-primary group-hover:text-white transition"
                  >
                    Leer artículo →
                  </Link>
                </div>
              </article>
            ))}
          </div>

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
