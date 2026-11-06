import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 px-4 bg-slate-50">
        <div className="max-w-lg text-center bg-white rounded-3xl border border-slate-200 p-10 shadow-sm">
          <span className="text-4xl">💈</span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900">
            Página no encontrada
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            La barbería o página que buscas no existe o cambió de dirección.
            Explora nuestro ranking completo de las mejores barberías del Perú.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-primary px-6 py-3 text-xs font-extrabold text-white hover:bg-primary-dark transition"
            >
              Ir al Ranking Principal →
            </Link>
            <Link
              href="/ciudad/lima/"
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
            >
              Ver Barberías en Lima
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
