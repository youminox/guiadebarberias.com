import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  SITE_NAME,
  SITE_URL,
  COMPANY_NAME,
  COMPANY_RUC,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  YOU_MINOX_URL,
} from "@/lib/barberias";

export const metadata: Metadata = {
  title: `Política de Privacidad — ${COMPANY_NAME}`,
  description: `Política de Privacidad y Protección de Datos Personales de ${SITE_NAME}, propiedad de ${COMPANY_NAME} (RUC: ${COMPANY_RUC}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Política de Privacidad" },
            ]}
          />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Política de Privacidad y Protección de Datos Personales
          </h1>
          <p className="mt-2 text-xs font-semibold text-slate-400">
            Última actualización: Noviembre 2026 · Titular: {COMPANY_NAME} (RUC:{" "}
            {COMPANY_RUC})
          </p>

          <div className="article-content mt-8 max-w-none">
            <p>
              El presente sitio web, <strong>{SITE_NAME}</strong> (
              <code>https://guiadebarberias.com</code>), es propiedad y está
              operado oficialmente por <strong>{COMPANY_NAME}</strong>,
              identificada con <strong>RUC N.° {COMPANY_RUC}</strong>, con
              domicilio fiscal en {COMPANY_ADDRESS}, y correo electrónico oficial
              de contacto{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>, titular
              asimismo de la marca{" "}
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                You Minox (youminox.com)
              </a>
              .
            </p>

            <h2>1. Identificación del Titular y Responsable del Tratamiento</h2>
            <ul>
              <li>
                <strong>Razón Social:</strong> {COMPANY_NAME}
              </li>
              <li>
                <strong>RUC:</strong> {COMPANY_RUC}
              </li>
              <li>
                <strong>Domicilio Fiscal:</strong> {COMPANY_ADDRESS}
              </li>
              <li>
                <strong>Correo Electrónico de Contacto y Privacidad:</strong>{" "}
                <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
              </li>
              <li>
                <strong>Sitio Web Principal de la Marca:</strong>{" "}
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://youminox.com
                </a>
              </li>
            </ul>

            <h2>2. Marco Normativo Aplicable</h2>
            <p>
              Esta Política de Privacidad se rige por las disposiciones de la{" "}
              <strong>
                Ley N.° 29733 — Ley de Protección de Datos Personales del Perú
              </strong>{" "}
              y su Reglamento aprobado por Decreto Supremo N.° 003-2013-JUS, así
              como por los estándares internacionales de privacidad y las
              políticas de programa de <strong>Google AdSense</strong>.
            </p>

            <h2>3. Información que Recopilamos</h2>
            <p>
              <strong>{SITE_NAME}</strong> es un portal informativo y directorio
              de consulta gratuita que no exige registro de usuario para
              navegar. Únicamente podemos recopilar:
            </p>
            <ul>
              <li>
                <strong>Datos proporcionados voluntariamente:</strong> Cuando un
                usuario o representante de una barbería nos escribe al correo{" "}
                <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a> (nombre,
                dirección de correo electrónico y mensaje).
              </li>
              <li>
                <strong>Datos de navegación y cookies:</strong> Dirección IP
                anonimizada, tipo de navegador, sistema operativo, páginas
                visitadas y tiempo de permanencia mediante herramientas
                analíticas (Google Analytics 4) y publicitarias (Google
                AdSense).
              </li>
            </ul>

            <h2>
              4. Uso de Google AdSense y Cookies Publicitarias de Terceros
            </h2>
            <p>
              En cumplimiento estricto de las políticas de{" "}
              <strong>Google AdSense</strong>, informamos de manera transparente
              a nuestros visitantes que:
            </p>
            <ul>
              <li>
                Proveedores terceros, incluido <strong>Google</strong>, utilizan
                cookies para mostrar anuncios relevantes basados en las visitas
                anteriores del usuario a <strong>{SITE_NAME}</strong> o a otros
                sitios web en Internet.
              </li>
              <li>
                El uso de cookies publicitarias por parte de Google (como la
                cookie de <strong>DoubleClick DART</strong>) permite a Google y
                a sus socios mostrar anuncios a los usuarios en función de su
                navegación en nuestro portal y en otros sitios de Internet.
              </li>
              <li>
                Los usuarios pueden inhabilitar el uso de la publicidad
                personalizada en cualquier momento accediendo a la{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Configuración de Anuncios de Google
                </a>{" "}
                o visitando{" "}
                <a
                  href="https://www.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.aboutads.info
                </a>
                .
              </li>
            </ul>

            <h2>5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
            <p>
              Todo usuario o titular de negocio listado en nuestro directorio
              puede ejercer de forma gratuita sus derechos de Acceso,
              Rectificación, Cancelación y Oposición (Derechos ARCO), así como
              solicitar la actualización de datos de una barbería, enviando una
              comunicación a{" "}
              <strong>
                <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
              </strong>{" "}
              dirigida a <strong>{COMPANY_NAME}</strong> (RUC: {COMPANY_RUC}).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
