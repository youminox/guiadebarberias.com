import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import HerramientasHubClient from "./HerramientasHubClient";
import {
  getAllHerramientasSummaries,
  HERRAMIENTA_CLUSTERS,
  type HerramientaCluster,
} from "@/data/herramientas";
import { BARBER_CATALOG } from "@/lib/amazon";
import { SITE_NAME, SITE_URL } from "@/lib/barberias";

export const metadata: Metadata = {
  title: "Herramientas de Barbería: Reseñas, Comparativas y Guías",
  description:
    "105 análisis técnicos, comparativas Producto vs Producto y guías de compra de máquinas cortapelos Wahl, BaBylissPRO, JRL, StyleCraft, Andis y afeitado clásico.",
  alternates: {
    canonical: `${SITE_URL}/herramientas/`,
  },
  openGraph: {
    title: `Herramientas de Barbería: 105 Reseñas, Comparativas VS y Guías | ${SITE_NAME}`,
    description:
      "Catálogo técnico y comparativas de las mejores máquinas de cortar pelo, patilleras, foil shavers, tijeras japonesas y equipos de estación en Amazon.",
    url: `${SITE_URL}/herramientas/`,
    type: "website",
    locale: "es_PE",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/images/blog-v3/mejores-cortapelos-maquinas-de-cortar-pelo-peru.webp`,
        width: 1200,
        height: 675,
        alt: "Herramientas profesionales de barbería: máquinas, patilleras y tijeras",
      },
    ],
  },
};

export default function HerramientasIndexPage() {
  const articles = getAllHerramientasSummaries();

  const topShowcaseProducts = [
    BARBER_CATALOG.WAHL_MAGIC_CLIP,
    BARBER_CATALOG.JRL_ONYX_CLIPPER,
    BARBER_CATALOG.BABYLISS_SKELETONFX,
  ] as [
    typeof BARBER_CATALOG.WAHL_MAGIC_CLIP,
    typeof BARBER_CATALOG.JRL_ONYX_CLIPPER,
    typeof BARBER_CATALOG.BABYLISS_SKELETONFX,
  ];

  const shaverShowcaseProducts = [
    BARBER_CATALOG.ANDIS_PROFOIL_TS2,
    BARBER_CATALOG.BABYLISS_FOILFX02,
    BARBER_CATALOG.MERKUR_34C_HD,
  ] as [
    typeof BARBER_CATALOG.ANDIS_PROFOIL_TS2,
    typeof BARBER_CATALOG.BABYLISS_FOILFX02,
    typeof BARBER_CATALOG.MERKUR_34C_HD,
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Laboratorio y Guías de Herramientas de Barbería — ${SITE_NAME}`,
    description:
      "105 reseñas técnicas, comparativas producto vs producto y guías de compra de máquinas cortapelos, patilleras, shavers y accesorios de barbería.",
    url: `${SITE_URL}/herramientas/`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: articles.slice(0, 35).map((a) => ({
      "@type": "TechArticle",
      headline: a.title,
      description: a.excerpt,
      url: `${SITE_URL}/herramientas/${a.slug}/`,
      datePublished: a.publishedAt,
      image: `${SITE_URL}${a.imageUrl}`,
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-slate-50 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 px-4 border-b border-amber-500/20">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Herramientas de Barbería" },
              ]}
            />
            <div className="mt-6 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-500/15 px-3.5 py-1 text-xs font-extrabold text-amber-300">
                  💈 {articles.length} Análisis Técnicos, Comparativas VS y Guías de Compra
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                  🛒 Selección Verificada en Amazon.com y Amazon.es
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Laboratorio de Herramientas de Barbería: Reseñas, Comparativas VS y Equipamiento Pro
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Compara especificaciones reales de motores (RPM y torque), tipos de cuchillas (Stagger-Tooth, Fade, Faper, DLC, Grafito y Cerámica), autonomía de batería y precios en Amazon para equipar tu estación de barbero o tu kit personal sin equivocarte.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <span className="text-amber-400 font-black text-lg block">32</span>
                  <span className="text-slate-300 font-semibold">Reseñas a Fondo de Modelos</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <span className="text-amber-400 font-black text-lg block">28</span>
                  <span className="text-slate-300 font-semibold">Duelos Producto vs Producto</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <span className="text-amber-400 font-black text-lg block">25</span>
                  <span className="text-slate-300 font-semibold">Rankings & Guías de Compra</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <span className="text-amber-400 font-black text-lg block">20</span>
                  <span className="text-slate-300 font-semibold">Manuales de Repuestos & Info</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          {/* Top 3 Best Sellers Showcase */}
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle="Las 3 Máquinas Más Vendidas en Barberías Profesionales"
            sectionSubtitle="El trío líder en ventas y valoraciones verificadas para degradados (Fades), desbaste y cerquillos de precisión."
            products={topShowcaseProducts}
          />

          {/* Interactive Filter & 105 Cards Grid */}
          <HerramientasHubClient articles={articles} />

          {/* Second Showcase: Shavers & Wet Shaving */}
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle="Top 3 en Afeitadoras Foil Shaver y Afeitado Clásico Tradicional"
            sectionSubtitle="Para terminar el Skin Fade al 0.0 mm sin irritación y perfilar barbas con precisión alemana."
            products={shaverShowcaseProducts}
          />

          {/* Full Crawlable Index of all 105 pages grouped by Cluster */}
          <section
            aria-labelledby="indice-herramientas"
            className="mt-14 rounded-2xl border border-slate-200 bg-white p-8"
          >
            <h2
              id="indice-herramientas"
              className="text-xl sm:text-2xl font-extrabold text-slate-900"
            >
              Índice Completo de las {articles.length} Páginas de Herramientas por Categoría
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Acceso directo a cada reseña de máquina, duelo comparativo Producto vs Producto, guía de compra y ficha técnica de mantenimiento:
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {(Object.keys(HERRAMIENTA_CLUSTERS) as HerramientaCluster[]).map(
                (clusterKey) => {
                  const inCluster = articles.filter(
                    (a) => a.cluster === clusterKey
                  );
                  return (
                    <div
                      key={clusterKey}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-5"
                    >
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-700 border-b border-slate-200 pb-2">
                        {HERRAMIENTA_CLUSTERS[clusterKey]} ({inCluster.length})
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
                        {inCluster.map((a) => (
                          <li key={a.id}>
                            <Link
                              href={`/herramientas/${a.slug}/`}
                              className="text-slate-700 hover:text-amber-600 hover:underline font-medium"
                            >
                              {a.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
