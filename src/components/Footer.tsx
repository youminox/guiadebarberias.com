import Link from "next/link";
import {
  getAllCities,
   getTopNationalBarberias,
  SITE_NAME,
  YOU_MINOX_URL,
  COMPANY_NAME,
  COMPANY_RUC,
  COMPANY_EMAIL,
  getBarberiaUrl,
} from "@/lib/barberias";

export default function Footer() {
  const cities = getAllCities();
  const topBarberias = getTopNationalBarberias(6);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & You Minox Official Attribution */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-black">
                💈
              </div>
              <span className="text-xl font-extrabold text-white">
                GuíaDeBarberías<span className="text-emerald-400">.com</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              El directorio y ranking independiente de las{" "}
              <strong className="text-white">
                mejores barberías del Perú por ciudad y distrito
              </strong>{" "}
              con calificaciones y reseñas verificadas de Google. Página creada
              e impulsada oficialmente por{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-400 hover:underline"
              >
                You Minox (youminox.com)
              </a>
              .
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 text-xs text-slate-400 space-y-1">
              <p className="font-extrabold text-white">{COMPANY_NAME}</p>
              <p>RUC: {COMPANY_RUC}</p>
              <p>
                Contacto:{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-emerald-400 hover:underline"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
            </div>
            <div className="pt-1 flex flex-col gap-1.5">
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400 hover:text-amber-300"
              >
                ✨ Tienda Oficial: YouMinox.com ↗
              </a>
            </div>
          </div>

          {/* Column 2: Ciudades del Perú */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Barberías por Ciudad en Perú
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/ciudad/${city.slug}/`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <span>{city.name}</span>
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                      {city.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Barberías del Ranking */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Top Barberías Destacadas
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {topBarberias.map((b) => (
                <li key={b.id}>
                  <Link
                    href={getBarberiaUrl(b)}
                    className="hover:text-emerald-400 transition-colors flex items-start justify-between gap-2"
                  >
                    <span className="line-clamp-1 font-medium text-slate-300">
                      {b.name}
                    </span>
                    <span className="shrink-0 text-amber-400 font-bold text-xs">
                      ★ {b.rating.toFixed(1)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Protagonismo You Minox & Páginas Legales AdSense */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              You Minox & Legal (AdSense)
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-semibold text-emerald-300"
                >
                  ★ You Minox 5% en Crema-Gel (Tienda Oficial) ↗
                </a>
              </li>
              <li>
                <Link
                  href="/barberias-cerca-de-mi/"
                  className="hover:text-emerald-400 transition-colors font-semibold text-emerald-300"
                >
                  📍 Barberías Recomendadas Cerca de Mí
                </Link>
              </li>
              <li>
                <Link
                  href="/#asesor-estilo"
                  className="hover:text-emerald-400 transition-colors font-semibold text-amber-300"
                >
                  🧔 Asesor Interactivo de Corte y Barba
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  className="hover:text-emerald-400 transition-colors font-semibold text-white"
                >
                  📰 Blog de Barbería, Visagismo y Minoxidil
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link
                  href="/nosotros/"
                  className="hover:text-white transition-colors"
                >
                  Quiénes Somos y Metodología del Ranking
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto/"
                  className="hover:text-white transition-colors"
                >
                  Contacto Oficial ({COMPANY_EMAIL})
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad/"
                  className="hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies/"
                  className="hover:text-white transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal/"
                  className="hover:text-white transition-colors"
                >
                  Aviso Legal y Términos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_NAME} — Propiedad de{" "}
            <strong className="text-slate-300">
              {COMPANY_NAME} (RUC: {COMPANY_RUC})
            </strong>
            . Creada por{" "}
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:underline"
            >
              You Minox (youminox.com)
            </a>
            .
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Mapa del Sitio (XML)
            </Link>
            <span>·</span>
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300"
            >
              YouMinox.com
            </a>
            <span>·</span>
            <Link href="/aviso-legal/" className="hover:text-slate-300">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
