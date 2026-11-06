"use client";

import { useState } from "react";
import { YOU_MINOX_URL } from "@/lib/barberias";

const FACE_SHAPES = [
  {
    id: "redondo",
    label: "Rostro Redondo",
    icon: "🟢",
    desc: "Pómulos anchos y mentón curvo",
    recommendedCut:
      "High Fade o Mid Fade con volumen en la parte superior (Pompadour, Quiff o Crop Texturizado) para alargar visualmente las facciones.",
    recommendedBeard:
      "Barba angulosa o cuadrada en el mentón (Boxed Beard) y más rebajada en las mejillas para estilizar el rostro.",
  },
  {
    id: "ovalado",
    label: "Rostro Ovalado",
    icon: "🔵",
    desc: "Proporciones equilibradas y simétricas",
    recommendedCut:
      "Te favorecen casi todos los estilos: desde un Taper Fade clásico a tijera hasta un French Crop o Mullet moderno.",
    recommendedBeard:
      "Barba corporativa de 3 a 5 mm bien delineada en pómulos y cuello, manteniendo simetría natural.",
  },
  {
    id: "cuadrado",
    label: "Rostro Cuadrado",
    icon: "🟦",
    desc: "Mandíbula marcada y frente amplia",
    recommendedCut:
      "Low Fade, Buzz Cut o Corte Clásico Ejecutivo con caída natural en la corona para suavizar ángulos rígidos.",
    recommendedBeard:
      "Barba circular o perfilado con líneas ligeramente curvas en los pómulos y mayor densidad en el candado y bigote.",
  },
  {
    id: "alargado",
    label: "Rostro Alargado / Rectangular",
    icon: "🟣",
    desc: "Frente alta y mentón pronunciado",
    recommendedCut:
      "Corte clásico a tijera en los laterales o Low Taper sin excesivo volumen arriba (flequillo texturizado hacia adelante).",
    recommendedBeard:
      "Barba completa en las mejillas y patillas (Full Beard) y más corta en la barbilla para equilibrar la proporción horizontal.",
  },
];

const BEARD_GOALS = [
  {
    id: "huecos",
    label: "Tengo huecos o poca barba en las mejillas",
    tip: "Pídele a tu barbero un rebaje uniforme a 3 mm mientras estimulas los folículos inactivos diariamente con You Minox en Crema-Gel para cerrar los espacios vacíos sin irritar tu piel.",
  },
  {
    id: "candado",
    label: "Solo me crece en el bigote y mentón",
    tip: "Luce un estilo Anchor Beard o Van Dyke impecablemente perfilado a navaja mientras aplicas You Minox en las zonas laterales para activar el vello facial de las mejillas.",
  },
  {
    id: "tupida",
    label: "Tengo barba poblada y quiero definirla",
    tip: "Solicita en la barbería un Ritual de Barba con Toalla Caliente y perfilado a navaja dos dedos por encima de la nuez de Adán, hidratando la piel a diario.",
  },
];

export default function BeardStyleAdvisor() {
  const [selectedFace, setSelectedFace] = useState(FACE_SHAPES[0].id);
  const [selectedGoal, setSelectedGoal] = useState(BEARD_GOALS[0].id);

  const faceObj =
    FACE_SHAPES.find((f) => f.id === selectedFace) || FACE_SHAPES[0];
  const goalObj =
    BEARD_GOALS.find((g) => g.id === selectedGoal) || BEARD_GOALS[0];

  return (
    <section
      id="asesor-estilo"
      className="py-16 px-4 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-slate-100 border-y border-slate-200"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-primary-dark mb-3">
            🧔 Herramienta Interactiva de Visagismo • by You Minox
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            ¿Qué Corte y Estilo de Barba Pedirle a tu Barbero según tu Rostro?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Selecciona tu tipo de rostro y el estado actual de tu barba para
            obtener la recomendación exacta antes de visitar cualquiera de las{" "}
            <strong>+110 barberías de nuestro ranking</strong>.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                1. Elige la forma de tu rostro:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FACE_SHAPES.map((face) => (
                  <button
                    key={face.id}
                    type="button"
                    onClick={() => setSelectedFace(face.id)}
                    className={`text-left rounded-2xl border p-4 transition cursor-pointer ${
                      selectedFace === face.id
                        ? "border-primary bg-emerald-50/70 ring-2 ring-primary/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                      <span>{face.icon}</span>
                      <span>{face.label}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{face.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                2. ¿Cómo está tu barba actualmente?
              </h3>
              <div className="space-y-2.5">
                {BEARD_GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full text-left rounded-xl border px-4 py-3 text-xs sm:text-sm font-bold transition cursor-pointer flex items-center justify-between ${
                      selectedGoal === goal.id
                        ? "border-primary bg-slate-900 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{goal.label}</span>
                    <span className="text-emerald-400">
                      {selectedGoal === goal.id ? "✓ Seleccionado" : "Elegir"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-extrabold text-emerald-300">
              ✨ Diagnóstico de Visagismo Listo
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Tu Ficha para el Barbero ({faceObj.label})
            </h3>

            <div className="space-y-4 text-sm">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-1">
                  ✂️ Corte de Cabello Recomendado:
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {faceObj.recommendedCut}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                  🧔 Diseño de Barba Ideal:
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {faceObj.recommendedBeard}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-950/80 border border-emerald-500/30 p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 mb-1">
                  💡 Consejo Experto You Minox:
                </p>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  {goalObj.tip}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={YOU_MINOX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-emerald-400 py-3 px-4 text-center text-xs font-extrabold text-slate-950 transition hover:bg-emerald-300"
              >
                Ver You Minox en Crema-Gel ↗
              </a>
              <a
                href="#ranking-peru"
                className="rounded-xl border border-white/20 bg-white/10 py-3 px-4 text-center text-xs font-bold text-white transition hover:bg-white/20"
              >
                Elegir Barbería ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
