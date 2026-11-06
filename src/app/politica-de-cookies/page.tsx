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
} from "@/lib/barberias";

export const metadata: Metadata = {
  title: `Política de Cookies — ${COMPANY_NAME}`,
  description: `Política de Cookies de ${SITE_NAME}, portal operado por ${COMPANY_NAME} (RUC: ${COMPANY_RUC}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function PoliticaCookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Política de Cookies" },
            ]}
          />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Política de Cookies
          </h1>
          <p className="mt-2 text-xs font-semibold text-slate-400">
            Titular Legal: {COMPANY_NAME} · RUC: {COMPANY_RUC} · Contacto:{" "}
            {COMPANY_EMAIL}
          </p>

          <div className="article-content mt-8 max-w-none">
            <p>
              En <strong>{SITE_NAME}</strong> (<code>https://guiadebarberias.com</code>),
              sitio web de propiedad de <strong>{COMPANY_NAME}</strong> (RUC N.°{" "}
              <strong>{COMPANY_RUC}</strong>, domicilio en {COMPANY_ADDRESS}),
              utilizamos cookies propias y de terceros para garantizar el
              correcto funcionamiento del portal, analizar el tráfico de
              navegación y mostrar publicidad relevante mediante{" "}
              <strong>Google AdSense</strong>.
            </p>

            <h2>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web
              almacenan en tu navegador o dispositivo móvil cuando los visitas.
              Permiten recordar tus preferencias y ofrecer una experiencia de
              navegación más rápida y segura.
            </p>

            <h2>2. Tipos de Cookies que Utilizamos</h2>
            <table>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Proveedor</th>
                  <th>Finalidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Cookies Técnicas</strong>
                  </td>
                  <td>{SITE_NAME}</td>
                  <td>
                    Funcionamiento del buscador instantáneo, filtros por ciudad
                    y preferencias de visualización.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Cookies Analíticas</strong>
                  </td>
                  <td>Google Analytics 4</td>
                  <td>
                    Medición estadística anónima de páginas vistas, ciudades más
                    consultadas y rendimiento del sitio.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Cookies Publicitarias</strong>
                  </td>
                  <td>Google AdSense / DoubleClick</td>
                  <td>
                    Presentación de anuncios relevantes, control de frecuencia y
                    medición de eficacia publicitaria.
                  </td>
                </tr>
              </tbody>
            </table>

            <h2>3. Cómo Administrar o Desactivar las Cookies</h2>
            <p>
              Puedes permitir, bloquear o eliminar las cookies instaladas en tu
              equipo mediante la configuración de las opciones de tu navegador
              (Google Chrome, Safari, Mozilla Firefox o Microsoft Edge). Para
              cualquier consulta adicional sobre nuestra Política de Cookies,
              escríbenos a{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
