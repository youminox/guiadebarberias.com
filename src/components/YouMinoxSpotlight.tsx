import Link from "next/link";
import { YOU_MINOX_URL, COMPANY_DIGEMID } from "@/lib/barberias";

interface YouMinoxSpotlightProps {
  variant?: "home" | "article" | "sidebar";
  barberiaName?: string;
}

export default function YouMinoxSpotlight({
  variant = "home",
  barberiaName,
}: YouMinoxSpotlightProps) {
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-14 w-14 rounded-xl bg-white p-1.5 shrink-0 shadow-md">
            <img
              src="/images/brand/you-minox.webp"
              alt="You Minox Minoxidil en Crema-Gel"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
              Creador Oficial
            </span>
            <h3 className="text-base font-extrabold text-white leading-tight mt-0.5">
              You Minox
            </h3>
            <p className="text-[11px] text-slate-300">
              Minoxidil en Crema-Gel
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          ¿Sales de la barbería pero aún tienes huecos en la barba o entradas?{" "}
          <strong className="text-white">You Minox</strong> estimula los
          folículos en una fórmula{" "}
          <strong className="text-emerald-300">
            crema-gel dermo-hidratante sin alcohol ni resequedad
          </strong>
          .
        </p>
        <ul className="space-y-1.5 text-xs text-emerald-200 mb-5">
          <li>✓ Sin picazón, caspa ni goteo</li>
          <li>✓ Ideal para tupir barba, cejas y cabello</li>
          <li>✓ Autorizado por DIGEMID en Perú</li>
          <li>✓ +600,000 seguidores en redes</li>
        </ul>
        <a
          href={YOU_MINOX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl bg-emerald-400 py-3 text-center text-xs font-extrabold text-slate-950 shadow-md transition hover:bg-emerald-300"
        >
          Visitar Tienda Oficial YouMinox.com ↗
        </a>
      </div>
    );
  }

  if (variant === "article") {
    return (
      <div className="my-10 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white p-2.5 flex-shrink-0 shadow-lg">
            <img
              src="/images/brand/you-minox.webp"
              alt="You Minox Minoxidil en Crema-Gel"
              width={200}
              height={200}
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                ✨ Recomendación Oficial • YouMinox.com
              </span>
              <span className="text-xs font-semibold text-amber-300">
                ★ +600,000 seguidores en TikTok e Instagram
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              ¿Quieres una Barba Más Tupida para tu Próximo Perfilado
              {barberiaName ? ` en ${barberiaName.split("—")[0].trim()}` : ""}?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              Un gran barbero diseña el contorno perfecto, pero la densidad nace
              del folículo. Esta guía fue creada por el equipo de{" "}
              <strong className="text-white">You Minox (youminox.com)</strong>:
              a diferencia del minoxidil líquido tradicional con alcohol que
              reseca y descama el rostro,{" "}
              <strong className="text-emerald-300">
                You Minox en Crema-Gel
              </strong>{" "}
              nutre tu piel mientras estimula el crecimiento de barba y cabello.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-lg"
              >
                Conocer You Minox en YouMinox.com ↗
              </a>
              <Link
                href="/#asesor-estilo"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-3 text-xs sm:text-sm font-bold text-white transition"
              >
                Probar Asesor de Corte y Barba →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-950 via-[#042f2e] to-slate-950 text-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 mb-4">
            ✨ Página Creada e Impulsada por You Minox (youminox.com)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Conoce a <span className="text-emerald-400">You Minox</span>: El
            Aliado #1 del Crecimiento de Barba y Cabello en el Perú
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            <strong>GuíaDeBarberías.com</strong> es una iniciativa oficial de{" "}
            <a
              href={YOU_MINOX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 font-bold underline hover:text-white"
            >
              You Minox (youminox.com)
            </a>{" "}
            para conectar a los hombres peruanos con las mejores barberías del
            país y brindarles la solución definitiva para poblar su barba sin
            sufrir la irritación del minoxidil líquido tradicional.
          </p>
        </div>

        {/* 2-Column Showcase: You Minox Product + Charlie Lingan Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: You Minox Cream-Gel Advantage */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl bg-white p-3 flex-shrink-0 shadow-2xl">
                <img
                  src="/images/brand/you-minox.webp"
                  alt="You Minox Minoxidil en Crema-Gel"
                  width={300}
                  height={236}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2">
                  El Complemento Perfecto Después de tu Barbería
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  ¿Por Qué Elegir Minoxidil en Crema-Gel de You Minox?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  Después de un afeitado o perfilado con navaja, la piel del
                  rostro queda sensible. Las lociones líquidas convencionales
                  con alcohol y propilenglicol causan ardor, descamación blanca
                  y resequedad. <strong className="text-white">You Minox</strong>{" "}
                  desarrolló una fórmula en{" "}
                  <strong className="text-emerald-300">crema-gel</strong> que
                  hidrata la piel mientras activa los folículos de la barba,
                  entradas y cejas.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">
                    ✓ Cero Resequedad por Alcohol
                  </span>
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">
                    ✓ Respaldo Sanitario DIGEMID
                  </span>
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30">
                    ✓ Envío Gratis a Todo el Perú
                  </span>
                </div>
              </div>
            </div>

            {/* Social Proof Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 transition-all hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  🎵
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-tight">
                    +500K
                  </div>
                  <div className="text-xs text-slate-400">
                    TikTok @You_minox
                  </div>
                </div>
              </a>

              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 transition-all hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg">
                  📸
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-tight">
                    +100K
                  </div>
                  <div className="text-xs text-slate-400">
                    Instagram @youminox
                  </div>
                </div>
              </a>

              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 transition-all hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                  🏆
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-tight">
                    #1 en Perú
                  </div>
                  <div className="text-xs text-slate-400">
                    Droguería DIGEMID
                  </div>
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <span className="text-xs sm:text-sm text-slate-300">
                Conoce la tienda oficial, promociones y envíos a todo el Perú:
              </span>
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold px-7 py-3.5 rounded-xl text-sm shadow-lg transition-all hover:scale-[1.02]"
              >
                Ir a la Web Oficial: YouMinox.com ↗
              </a>
            </div>
          </div>

          {/* Right Card: Charlie Lingan & DIGEMID Backing */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-lg flex-shrink-0">
                  <img
                    src="/images/brand/charlie-lingan.webp"
                    alt="Charlie Lingán - Fundador de You Minox y GuíaDeBarberías.com"
                    width={160}
                    height={160}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Mensaje del Creador
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    <a
                      href="https://charlielingan.com/es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-300 transition-colors underline decoration-emerald-400/50"
                    >
                      Charlie Lingán ↗
                    </a>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fundador de You Minox (youminox.com) •{" "}
                    <a
                      href="https://charlielingan.com/es/estrategias/guiadebarberias-como-digitalizamos-las-mejores-barberias-del-peru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      Leer historia del proyecto
                    </a>
                  </p>
                </div>
              </div>

              <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed italic border-l-4 border-emerald-400 pl-4 py-1 mb-6">
                &ldquo;Creamos <strong>GuíaDeBarberías.com</strong> desde{" "}
                <strong>You Minox</strong> porque sabemos que una barba imponente
                y un buen corte cambian por completo la seguridad de un hombre.
                Aquí reunimos a las mejores barberías del Perú según sus reseñas
                reales en Google para que siempre elijas un lugar a la altura de
                tu estilo.&rdquo;
              </blockquote>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/10">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                  Respaldo Farmacéutico Oficial
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Comercializado por <strong>MINOXIDIL PERU S.A.C.</strong>,
                  droguería autorizada por DIGEMID mediante{" "}
                  <span className="text-white font-semibold">
                    {COMPANY_DIGEMID}
                  </span>
                  .
                </p>
              </div>
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    Tienda Oficial Online
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Compra Directa You Minox
                  </div>
                </div>
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 underline"
                >
                  https://youminox.com →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
