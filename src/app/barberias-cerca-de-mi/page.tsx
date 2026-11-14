import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BarberDirectoryExplorer from "@/components/BarberDirectoryExplorer";
import NearMeTriggerButton from "@/components/NearMeTriggerButton";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import AdBanner from "@/components/AdBanner";
import {
  getAllBarberias,
  getTopNationalBarberias,
  getAllCities,
  getLimaDistricts,
  getBarberiasByDistrict,
  getBarberiaUrl,
  SITE_NAME,
  SITE_URL,
  YOU_MINOX_URL,
} from "@/lib/barberias";

const CANONICAL_URL = `${SITE_URL}/barberias-cerca-de-mi/`;

const NEAR_ME_FAQS = [
  {
    q: "¿Cómo encuentro barberías recomendadas cerca de mi ubicación en Perú?",
    a: "Haz clic en el botón '📍 Cerca de mí' arriba del buscador y permite el acceso a tu ubicación GPS. En menos de un segundo calcularemos la distancia exacta en metros o kilómetros hacia las 112 barberías verificadas del Perú, ordenando primero las que están más cerca de ti con sus estrellas de Google, precios y reseñas reales.",
  },
  {
    q: "¿Qué pasa si no quiero activar el GPS en mi celular o computadora?",
    a: "Si prefieres no compartir tu GPS, puedes hacer clic directamente en cualquier distrito o ciudad en el selector rápido de zonas (Miraflores, San Isidro, Surco, San Borja, Barranco, Los Olivos, Arequipa, Trujillo, Cusco, Huancayo, etc.) y ordenaremos el ranking por distancia desde el corazón de esa zona.",
  },
  {
    q: "¿Cuánto cuesta un corte de cabello o arreglo de barba en una barbería cerca de mí?",
    a: "En el Perú, un corte clásico o degradado (fade) en una barbería recomendada cuesta entre S/ 25 y S/ 35 en distritos residenciales o ciudades de provincia, y entre S/ 40 y S/ 65 en barberías VIP de Miraflores, San Isidro, Chacarilla o Barranco. El combo de corte más ritual de barba con toalla caliente oscila entre S/ 50 y S/ 95.",
  },
  {
    q: "¿Cómo mantengo mi barba poblada y definida entre visitas a la barbería?",
    a: "Acudir a una barbería cercana cada 10 o 14 días mantiene los contornos limpios a navaja. Para rellenar zonas con menor densidad sin resecar el rostro, los barberos especialistas del directorio recomiendan aplicar diariamente You Minox al 5% en Crema-Gel (youminox.com), formulado con Minoxidil en emulsión hidratante sin alcohol irritante.",
  },
];

export const metadata: Metadata = {
  title: "Barberías Cerca de Mí en Perú: Distancia y Reseñas",
  description:
    "Encuentra las mejores barberías cerca de ti en Lima y todo el Perú: +110 barberías verificadas ordenadas por distancia, calificación en Google y precios.",
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: `Barberías Recomendadas Cerca de Mí en Perú | ${SITE_NAME}`,
    description:
      "Activa tu ubicación o elige tu distrito para ver las barberías mejor calificadas cerca de ti en Lima, Arequipa, Trujillo, Cusco, Huancayo y todo el Perú.",
    url: CANONICAL_URL,
    type: "website",
    locale: "es_PE",
    siteName: SITE_NAME,
  },
};

export default function BarberiasCercaDeMiPage() {
  const allBarberias = getAllBarberias();
  const topNational = getTopNationalBarberias(20);
  const cities = getAllCities();
  const limaDistricts = getLimaDistricts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Barberías Recomendadas Cerca de Mí en el Perú — Ranking Oficial",
    description:
      "Directorio geolocalizado de barberías mejor valoradas cerca de tu ubicación en Lima y provincias del Perú.",
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
    mainEntity: NEAR_ME_FAQS.map((f) => ({
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

      <main className="flex-1 bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white pt-8 pb-16 px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 [&_nav]:text-slate-400 [&_span.text-slate-800]:text-white [&_a]:text-slate-300 [&_a:hover]:text-emerald-400">
              <Breadcrumbs
                items={[
                  { label: "Inicio", href: "/" },
                  { label: "Barberías Cerca de Mí" },
                ]}
              />
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-extrabold text-emerald-300 mb-5">
                <span>📡 Localizador GPS en Tiempo Real</span>
                <span>•</span>
                <span>
                  Impulsado por{" "}
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

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12]">
                Barberías Recomendadas{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                  Cerca de Mí
                </span>{" "}
                en Perú
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Encuentra al instante cuál de nuestras{" "}
                <strong className="text-white">
                  {allBarberias.length} barberías verificadas
                </strong>{" "}
                está más cerca de ti ahora mismo. Calcula distancia exacta en
                metros, compara{" "}
                <strong className="text-amber-300">
                  estrellas y reseñas reales de Google
                </strong>
                , consulta precios de corte y abre la ruta directa en Google Maps.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <NearMeTriggerButton label="📍 Detectar Mi Ubicación GPS Ahora" />
                <Link
                  href="/#ranking-peru"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  🏆 Ver Top 20 Nacional →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Near-Me Directory */}
        <section className="py-10 sm:py-14 px-4 -mt-8 relative z-10">
          <div className="mx-auto max-w-7xl">
            <BarberDirectoryExplorer
              barberias={allBarberias}
              cities={cities}
              limaDistricts={limaDistricts}
              autoCheckGrantedGeo={true}
              showQuickPresetsByDefault={true}
            />
          </div>
        </section>

        {/* AdSense Banner */}
        <div className="mx-auto max-w-7xl px-4 my-6">
          <AdBanner />
        </div>

        {/* District & City Leader Index for "Cerca de mí" Discovery */}
        <section className="py-14 px-4 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                🏙️ Líderes por Distrito en Lima & Regiones del Perú
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                ¿En qué distrito estás buscando barbería hoy?
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-3xl">
                Si buscas una barbería recomendada sin activar el GPS, revisa
                la sede #1 mejor puntuada en cada distrito de Lima o ingresa al
                ranking completo de tu ciudad:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {limaDistricts.slice(0, 12).map((dist) => {
                const topInDist = getBarberiasByDistrict(dist.slug)[0];
                if (!topInDist) return null;
                return (
                  <Link
                    key={dist.slug}
                    href={getBarberiaUrl(topInDist)}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:bg-white hover:border-primary hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                        📍 {dist.name}, Lima ({dist.count}{" "}
                        {dist.count === 1 ? "sede" : "sedes"})
                      </span>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-extrabold text-amber-900">
                        ★ {topInDist.rating.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                      {topInDist.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 truncate">
                      {topInDist.address}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-700">
                        Corte {topInDist.cutPrice} · Combo{" "}
                        {topInDist.comboPrice}
                      </span>
                      <span className="font-extrabold text-primary">
                        Ver ficha →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Links to all 15 cities */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                🇵🇪 Rankings Completos por Ciudad del Perú:
              </h3>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/ciudad/${c.slug}/`}
                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:border-primary hover:text-primary transition"
                  >
                    {c.name} ({c.count}) →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Guide (dinamica.pe inspired clean reading column) */}
        <section className="py-14 px-4 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-3xl">
            <div className="article-content">
              <h2>
                Cómo elegir la mejor barbería cerca de ti según las reseñas de
                Google
              </h2>
              <p>
                Cuando buscas en tu celular{" "}
                <strong>&ldquo;barberías recomendadas cerca de mí&rdquo;</strong>
                , la cercanía en metros es importante, pero no debería ser el
                único criterio. Un mal degradado o una navaja sin desinfección
                adecuada arruinan tu imagen durante semanas.
              </p>
              <ul>
                <li>
                  <strong>Verifica la consistencia de estrellas (4.7★+):</strong>{" "}
                  en nuestro directorio priorizamos locales con alto volumen de
                  opiniones reales y comentarios recientes sobre puntualidad y
                  trato.
                </li>
                <li>
                  <strong>Observa la especialidad del barbero:</strong> algunos
                  locales destacan en <em>Skin Fade</em> urbano y diseño rápido,
                  mientras otros se enfocan en visagismo ejecutivo y ritual de
                  barba con toalla caliente.
                </li>
                <li>
                  <strong>Transparencia en precios:</strong> revisa en cada
                  ficha el costo aproximado del corte ({`S/ 25 a S/ 65`}), el
                  perfilado de barba y los paquetes combinados antes de reservar.
                </li>
                <li>
                  <strong>Cuidado diario en casa:</strong> entre visita y visita,
                  mantener la piel hidratada y el folículo nutrido marca la
                  diferencia en la densidad de tu barba.
                </li>
              </ul>
            </div>

            <YouMinoxSpotlight variant="article" />

            {/* FAQs */}
            <div className="mt-12">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-5">
                Preguntas frecuentes sobre barberías cerca de tu ubicación
              </h2>
              <div className="space-y-4">
                {NEAR_ME_FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
                  >
                    <h3 className="text-base font-extrabold text-slate-900">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
