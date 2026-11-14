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
  COMPANY_DIGEMID,
  YOU_MINOX_URL,
} from "@/lib/barberias";

export const metadata: Metadata = {
  title: "Aviso Legal y Términos de Uso",
  description: `Aviso Legal, datos societarios de ${COMPANY_NAME} (RUC: ${COMPANY_RUC}) y condiciones de uso de ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Aviso Legal" }]}
          />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Aviso Legal y Términos de Uso
          </h1>
          <p className="mt-2 text-xs font-semibold text-slate-400">
            Información Legal Obligatoria · {COMPANY_NAME} (RUC: {COMPANY_RUC})
          </p>

          <div className="article-content mt-8 max-w-none">
            <h2>1. Datos Identificativos del Titular de la Web</h2>
            <p>
              En cumplimiento con la normativa peruana vigente sobre comercio
              electrónico, protección al consumidor y transparencia digital, se
              informa que el portal web <strong>{SITE_NAME}</strong> (
              <code>https://guiadebarberias.com</code>) es de titularidad de:
            </p>
            <ul>
              <li>
                <strong>Titular / Razón Social:</strong> {COMPANY_NAME}
              </li>
              <li>
                <strong>Número de RUC:</strong> {COMPANY_RUC}
              </li>
              <li>
                <strong>Domicilio Fiscal:</strong> {COMPANY_ADDRESS}
              </li>
              <li>
                <strong>Correo Electrónico Oficial:</strong>{" "}
                <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
              </li>
              <li>
                <strong>Marca Principal y Respaldo Sanitario:</strong>{" "}
                <a
                  href={YOU_MINOX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  You Minox (youminox.com)
                </a>{" "}
                — Droguería autorizada por DIGEMID mediante {COMPANY_DIGEMID}.
              </li>
            </ul>

            <h2>2. Objeto y Naturaleza Editorial del Directorio</h2>
            <p>
              <strong>{SITE_NAME}</strong> tiene como propósito brindar a los
              usuarios en el Perú una guía informativa, comparativa y editorial
              sobre las mejores barberías por ciudad y distrito, recopilando
              direcciones públicas, precios referenciales estimados y resúmenes
              de las calificaciones y opiniones públicas en Google.
            </p>
            <p>
              Los nombres comerciales de las barberías mencionadas pertenecen a
              sus respectivos propietarios y se citan con fines estrictamente
              informativos y de reseña periodística/editorial.
            </p>

            <h2>3. Propiedad Intelectual</h2>
            <p>
              El diseño del portal, código fuente, textos editoriales,
              herramientas interactivas de visagismo y elementos gráficos de la
              marca <strong>You Minox</strong> son propiedad exclusiva de{" "}
              <strong>{COMPANY_NAME}</strong>.
            </p>

            <h2>4. Contacto para Rectificaciones o Consultas Legales</h2>
            <p>
              Si eres propietario o representante de una barbería en el Perú y
              deseas actualizar la dirección, horario, precios o fotografías de
              tu establecimiento en nuestra guía, puedes escribirnos en
              cualquier momento a{" "}
              <strong>
                <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
              </strong>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
