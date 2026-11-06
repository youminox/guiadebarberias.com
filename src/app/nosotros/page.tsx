import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouMinoxSpotlight from "@/components/YouMinoxSpotlight";
import {
  SITE_NAME,
  SITE_URL,
  COMPANY_NAME,
  COMPANY_RUC,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_DIGEMID,
  YOU_MINOX_URL,
  getAllBarberias,
  getAllCities,
} from "@/lib/barberias";

export const metadata: Metadata = {
  title: `Quiénes Somos y Metodología del Ranking — by You Minox (${COMPANY_NAME})`,
  description: `Conoce al equipo detrás de ${SITE_NAME}, iniciativa creada por You Minox (youminox.com) y ${COMPANY_NAME} (RUC: ${COMPANY_RUC}).`,
  alternates: { canonical: `${SITE_URL}/nosotros/` },
};

export default function NosotrosPage() {
  const totalBarberias = getAllBarberias().length;
  const totalCities = getAllCities().length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Quiénes Somos" }]}
          />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Sobre {SITE_NAME}: El Ranking Oficial de Barberías del Perú Creado
            por You Minox
          </h1>

          <div className="article-content mt-8 max-w-none">
            <p>
              <strong>{SITE_NAME}</strong> nació como una iniciativa de{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                You Minox (youminox.com)
              </a>{" "}
              y su empresa titular <strong>{COMPANY_NAME}</strong> (RUC:{" "}
              <strong>{COMPANY_RUC}</strong>) con una misión clara: ofrecer a
              todos los hombres del Perú el directorio más completo, honesto y
              actualizado de las mejores barberías del país.
            </p>

            <h2>Nuestra Metodología de Evaluación</h2>
            <p>
              Actualmente analizamos <strong>{totalBarberias} barberías</strong>{" "}
              distribuidas en <strong>{totalCities} ciudades del Perú</strong>{" "}
              (con especial énfasis en Lima Metropolitana y las principales
              capitales departamentales). Para clasificar cada barbería
              evaluamos:
            </p>
            <ol>
              <li>
                <strong>Calificación en Google Maps:</strong> Priorizamos
                establecimientos que sostienen promedios entre 4.7 y 5.0
                estrellas.
              </li>
              <li>
                <strong>Consistencia en Reseñas Verificadas:</strong> Analizamos
                lo que los clientes reales comentan sobre la puntualidad, el
                trato y el dominio de técnicas como el <em>fade</em>, el corte a
                tijera y el ritual de barba con toalla caliente.
              </li>
              <li>
                <strong>Higiene y Bioseguridad:</strong> Uso de navajas
                descartables, esterilización de peines/máquinas e insumos
                seguros para la piel.
              </li>
              <li>
                <strong>Transparencia de Ubicación y Precios:</strong>{" "}
                Direcciones exactas verificadas y rangos de precios claros para
                cada distrito.
              </li>
            </ol>

            <h2>Respaldo Corporativo y Farmacéutico</h2>
            <p>
              Detrás de <strong>{SITE_NAME}</strong> se encuentra{" "}
              <strong>{COMPANY_NAME}</strong> (RUC: {COMPANY_RUC}), con
              domicilio en {COMPANY_ADDRESS}, droguería autorizada por DIGEMID
              mediante {COMPANY_DIGEMID}.
            </p>
            <p>
              Para consultas editoriales, sugerencias o contacto comercial,
              escríbenos directamente a{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a> o visita
              nuestra{" "}
              <Link href="/contacto/">página de contacto oficial</Link>.
            </p>
          </div>

          <div className="mt-12">
            <YouMinoxSpotlight variant="article" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
