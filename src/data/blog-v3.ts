import { BLOG_V3_CLUSTER_A } from "./blog-v3-a";
import { BLOG_V3_CLUSTER_B } from "./blog-v3-b";
import { BLOG_V3_CLUSTER_C } from "./blog-v3-c";
import { BLOG_V3_CLUSTER_D } from "./blog-v3-d";
import { BLOG_V3_CLUSTER_E } from "./blog-v3-e";
import { BLOG_V3_CLUSTER_F } from "./blog-v3-f";
import { BLOG_V3_CLUSTER_G } from "./blog-v3-g";
import { BLOG_V3_CLUSTER_H } from "./blog-v3-h";
import { BLOG_V3_CLUSTER_I } from "./blog-v3-i";
import { BLOG_V3_CLUSTER_J } from "./blog-v3-j";
import type { BlogV3ArticleSeed, BlogV3CategorySlug } from "./blog-v3-types";

export const BLOG_V3_CATEGORIES: Record<BlogV3CategorySlug, string> = {
  "experiencia-barberia": "Experiencia en Barbería",
  "cortes-por-ocasion-y-edad": "Cortes por Ocasión y Edad",
  "cortes-segun-tipo-cabello": "Tipos de Cabello",
  "color-canas-y-estetica": "Color, Canas & Estética",
  "herramientas-de-barberia": "Herramientas Pro",
  "styling-y-productos": "Styling & Fijación",
  "fades-y-visagismo": "Fades & Visagismo",
  "negocio-y-carrera-barberia": "Negocio & Carrera",
  "afeitado-clasico-tradicional": "Afeitado Clásico",
  "barba-y-minoxidil": "Barba & Minoxidil",
};

export const BLOG_V3_CATEGORY_DESCRIPTIONS: Record<BlogV3CategorySlug, string> = {
  "experiencia-barberia":
    "Cómo prepararte antes de tu cita, traducir tus referencias al idioma real del barbero, higiene obligatoria y etiqueta en Perú.",
  "cortes-por-ocasion-y-edad":
    "Guías de imagen masculina para bodas, entrevistas de trabajo, graduaciones, fotos de DNI, niños, escolares y fiestas.",
  "cortes-segun-tipo-cabello":
    "Estrategias reales según tu textura capilar: lacio grueso, cabello fino sin volumen, rizado, afro, remolinos y melena en crecimiento.",
  "color-canas-y-estetica":
    "Camuflaje natural de canas, shampoo violeta, decoloración, tintes de barba, cejas masculinas y estética facial sin artificialidad.",
  "herramientas-de-barberia":
    "Comparativas técnicas de cortapelos, trimmers, foil shavers, calibración zero-gap segura, tijeras, difusores y cepillos.",
  "styling-y-productos":
    "Cuándo usar arcilla mate, pomada al agua, polvo texturizador, sea salt spray, shampoo sin sulfatos, aceites y bálsamos de barba.",
  "fades-y-visagismo":
    "Geometría exacta entre Low, Mid, High, Taper, Drop y Burst Fade, y cómo elegir corte según la forma exacta de tu rostro.",
  "negocio-y-carrera-barberia":
    "Todo para emprendedores y barberos en Perú: inversión real, licencias municipales e ITSE, sueldos, Google Maps, agenda y fidelización.",
  "afeitado-clasico-tradicional":
    "El arte del afeitado húmedo tradicional con safety razor, navaja, brochas, jabones, alumbre y prevención real de vellos encarnados.",
  "barba-y-minoxidil":
    "Protocolos de uso en crema-gel, tiempos de consolidación terminal, dermaroller 0.5 mm, shedding, cejas y nutrición folicular.",
};

export const BLOG_V3_ARTICLES: BlogV3ArticleSeed[] = [
  ...BLOG_V3_CLUSTER_A,
  ...BLOG_V3_CLUSTER_B,
  ...BLOG_V3_CLUSTER_C,
  ...BLOG_V3_CLUSTER_D,
  ...BLOG_V3_CLUSTER_E,
  ...BLOG_V3_CLUSTER_F,
  ...BLOG_V3_CLUSTER_G,
  ...BLOG_V3_CLUSTER_H,
  ...BLOG_V3_CLUSTER_I,
  ...BLOG_V3_CLUSTER_J,
];
