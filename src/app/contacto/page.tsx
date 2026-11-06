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
  title: `Contacto Oficial — ${COMPANY_NAME} (${COMPANY_EMAIL})`,
  description: `Comunícate con el equipo de ${SITE_NAME} y ${COMPANY_NAME} (RUC: ${COMPANY_RUC}) al correo ${COMPANY_EMAIL}.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-10 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
          />

          <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
            <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-primary-dark mb-3">
              📬 Canal Oficial de Atención
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Contacto Oficial — {SITE_NAME}
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              ¿Deseas sugerir una barbería para nuestro ranking del Perú,
              actualizar los datos de tu local o consultar sobre los productos
              oficiales de <strong>You Minox</strong>? Contáctanos directamente:
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-primary mb-2">
                  🏢 Datos Societarios del Titular
                </h2>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Razón Social:</strong> {COMPANY_NAME}
                  </li>
                  <li>
                    <strong>RUC:</strong> {COMPANY_RUC}
                  </li>
                  <li>
                    <strong>Dirección:</strong> {COMPANY_ADDRESS}
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950 text-white p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-400 mb-2">
                    ✉️ Correo Electrónico Directo
                  </h2>
                  <p className="text-xs text-slate-300 mb-4">
                    Atención a lectores, dueños de barberías, prensa y soporte
                    legal:
                  </p>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="text-lg sm:text-xl font-black text-amber-300 hover:underline break-all"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </div>
                <div className="mt-6 pt-4 border-t border-white/15">
                  <a
                    href={YOU_MINOX_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-300 hover:text-white"
                  >
                    Visitar Tienda Oficial YouMinox.com ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
