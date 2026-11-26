export const AMAZON_TAG_US = "guiadebarberias-20";
export const AMAZON_TAG_ES = "guiadebarberias.com-21";

export type AmazonStoreRegion = "US" | "ES";

export type BarberProductCategory =
  | "clipper"
  | "trimmer"
  | "shaver"
  | "razor"
  | "scissors"
  | "blade"
  | "maintenance"
  | "accessory";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  brand: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType: BarberProductCategory;
  /** Direct ASIN on Amazon.com when verified */
  asinUS?: string;
  /** Direct ASIN on Amazon.es when verified */
  asinES?: string;
  /** Optimized search query on Amazon.com */
  queryUS: string;
  /** Optimized search query on Amazon.es */
  queryES: string;
  ctaLabel: string;
  specHighlight?: string;
}

/**
 * Generates an official Amazon Affiliate link with automatic geolocation store support:
 * - USA, Peru & Latin America (US): amazon.com with tag=guiadebarberias-20
 * - Spain & Europe (ES): amazon.es with tag=guiadebarberias.com-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detects whether the user is browsing from Spain/Europe or Americas
 * based on browser timezone and language locale.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US"; // Default SSR fallback for Peru/LatAm/USA (guiadebarberias-20)
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();

    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      lang === "es-es" ||
      tz.startsWith("Europe/")
    ) {
      return "ES";
    }

    return "US";
  } catch {
    return "US";
  }
}

// ============================================================================
// CURATED BARBER HARDWARE & ACCESSORY CATALOG (AMAZON.COM & AMAZON.ES)
// ============================================================================

export const BARBER_CATALOG: Record<string, AmazonProductRecommendation> = {
  // --- CLIPPERS ---
  WAHL_MAGIC_CLIP: {
    id: "wahl-magic-clip",
    badge: "🏆 #1 Más Vendida para Fades",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Cordless Magic Clip — Máquina Cortapelos Inalámbrica",
    subtitle:
      "La máquina reina del degradado en barberías de todo el mundo con cuchilla Stagger-Tooth de tecnología Crunch.",
    features: [
      "Cuchilla 2161 Stagger-Tooth que difumina líneas de fade con sonido 'crunch' audible",
      "Motor rotativo de 5.500 RPM + Batería de litio de 100 minutos de autonomía",
      "Peso ultraligero (290 g) e incluye los 8 peines guía Premium con clip metálico (#0.5 y #1.5)",
    ],
    categoryType: "clipper",
    asinUS: "B00UK8WFQO",
    queryUS: "Wahl Professional 5 Star Cordless Magic Clip 8148",
    queryES: "Wahl Professional 5 Star Cordless Magic Clip cortapelos",
    ctaLabel: "Ver precio en Amazon",
    specHighlight: "5.500 RPM · Cuchilla Stagger-Tooth · 100 min",
  },

  WAHL_SENIOR_CORDLESS: {
    id: "wahl-senior-cordless",
    badge: "💪 Máximo Torque y Carcasa Metálica",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Cordless Senior — Clipper Profesional de Alto Torque",
    subtitle:
      "El motor más potente de la línea clásica 5 Star de Wahl con base de aluminio para cabello grueso y fades al ras.",
    features: [
      "Motor rotativo de alto par (6.500–6.700 RPM) que no se frena en cabello denso o húmedo",
      "Cuchilla quirúrgica plana 2191 ajustable a Zero-Gap para Skin Fades impecables",
      "Chasis inferior de aluminio resistente al calor e impactos + 80 min de batería",
    ],
    categoryType: "clipper",
    asinUS: "B0786PLW3N",
    queryUS: "Wahl Professional 5 Star Cordless Senior Clipper 8504",
    queryES: "Wahl 5 Star Cordless Senior cortapelos profesional",
    ctaLabel: "Ver oferta en Amazon",
    specHighlight: "6.700 RPM · Cuchilla Plana 2191 · Carcasa Metal",
  },

  WAHL_LEGEND_CORDLESS: {
    id: "wahl-legend-cordless",
    badge: "📐 Especialista en Fades Largos",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Cordless Legend — Clipper con Cuchilla Wedge",
    subtitle:
      "Rango de palanca extendido (0.7 mm a 1.7 mm) para transiciones suaves y desvanecidos sin escalones.",
    features: [
      "Cuchilla Wedge 2228 de dientes profundos con tecnología Crunch Blade",
      "Palanca metálica de recorrido ancho ideal para borrar líneas entre peine #1 y #2",
      "Batería de iones de litio mejorada de 100 minutos de uso continuo + 8 peines Premium",
    ],
    categoryType: "clipper",
    queryUS: "Wahl Professional 5 Star Cordless Legend Clipper 8594",
    queryES: "Wahl 5 Star Cordless Legend cortapelos",
    ctaLabel: "Ver precio en Amazon",
    specHighlight: "Cuchilla Wedge · Palanca Extendida · 100 min",
  },

  WAHL_SUPER_TAPER_CORDLESS: {
    id: "wahl-super-taper-cordless",
    badge: "💈 Clásico Todoterreno de Barbería",
    brand: "Wahl Professional",
    title: "Wahl Cordless Super Taper — Cortapelos Profesional Inalámbrico",
    subtitle:
      "El caballo de batalla histórico de las barberías ahora sin cable, con cuchilla Taper estriada para quitar volumen.",
    features: [
      "Cuchilla cromada Taper con surcos que cucharea el cabello de forma natural",
      "Ergonomía clásica balanceada ideal para técnica de máquina sobre peine",
      "Funciona con o sin cable (100–240V voltaje dual) con 90 minutos de autonomía",
    ],
    categoryType: "clipper",
    queryUS: "Wahl Professional Cordless Super Taper Clipper",
    queryES: "Wahl Super Taper Cordless cortapelos profesional",
    ctaLabel: "Ver en Amazon",
    specHighlight: "5.500 RPM · Cuchilla Taper · Voltaje Dual",
  },

  WAHL_1919_100YEAR: {
    id: "wahl-1919-100year",
    badge: "🏛️ Edición Centenario 100% Metal",
    brand: "Wahl Professional",
    title: "Wahl 1919 100 Year Cordless Clipper — Cuerpo Metálico Vintage",
    subtitle:
      "Construcción íntegra en acero pulido con el motor de mayor torque de Wahl para cortes clásicos y tapering.",
    features: [
      "Cuerpo 100% metálico de inspiración vintage 1919 con palanca y switch de acero",
      "Motor rotativo de 6.400–6.900 RPM de alto torque para desbaste en bloque (bulk removal)",
      "Cuchilla tradicional 1006 de acero al carbono de alta precisión",
    ],
    categoryType: "clipper",
    queryUS: "Wahl Professional 100 Year Cordless Clipper 1919",
    queryES: "Wahl 1919 100 Year Cordless cortapelos metal",
    ctaLabel: "Ver edición 1919 en Amazon",
    specHighlight: "6.900 RPM · 100% Acero · Alto Torque",
  },

  WAHL_VAPOR_CORDLESS: {
    id: "wahl-vapor-cordless",
    badge: "⚡ Nuevo Motor Brushless + F32",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Vapor Cordless — Clipper con Cuchilla F32 FadeOut",
    subtitle:
      "La nueva generación de Wahl: motor sin escobillas de 8.000 RPM con control adaptativo de velocidad y cuchilla de 32 dientes.",
    features: [
      "Nueva cuchilla F32 FadeOut con 32 dientes de punta esférica para pasar de calvo a fade sin enganches",
      "Motor Brushless de 8.000 RPM con Adaptive Speed Control (mantiene potencia constante)",
      "Ultrarpida y ligera (280 g) con 150 minutos de batería de litio",
    ],
    categoryType: "clipper",
    queryUS: "Wahl Professional 5 Star Vapor Cordless Clipper F32",
    queryES: "Wahl 5 Star Vapor Cordless Clipper cortapelos",
    ctaLabel: "Ver nueva Wahl Vapor en Amazon",
    specHighlight: "8.000 RPM Brushless · Cuchilla F32 · 150 min",
  },

  BABYLISS_GOLDFX_CLIPPER: {
    id: "babyliss-goldfx-clipper",
    badge: "✨ Motor Brushless Ferrari",
    brand: "BaBylissPRO",
    title: "BaBylissPRO Barberology GoldFX Clipper (FX870G)",
    subtitle:
      "El icono dorado de las barberías modernas: motor sin escobillas diseñado con Ferrari, cuerpo metálico y palanca de 5 clics.",
    features: [
      "Motor digital Brushless de alto torque (6.300 RPM) y hasta 2 horas de batería",
      "Cuchilla Fade de titanio dorado (FX802G) ajustable a Zero-Gap",
      "Palanca lateral con 5 posiciones fijas por clic (detent lever) para fades exactos",
    ],
    categoryType: "clipper",
    asinUS: "B07T2L4V3V",
    queryUS: "BaBylissPRO Barberology GoldFX Clipper FX870G",
    queryES: "BaBylissPRO GoldFX FX870E cortapelos profesional",
    ctaLabel: "Ver GoldFX en Amazon",
    specHighlight: "6.300 RPM Brushless · 5 Clics · 120 min",
  },

  BABYLISS_BOOST_PLUS_CLIPPER: {
    id: "babyliss-boost-plus-clipper",
    badge: "🚀 Versión Mejorada 6.800 RPM",
    brand: "BaBylissPRO",
    title: "BaBylissPRO GoldFX+ Boost+ Clipper (FX870GBP)",
    subtitle:
      "La evolución de la GoldFX con motor más rápido, empuñadura de goma texturizada de diamante y cuchilla DLC negra.",
    features: [
      "Nuevo motor sin escobillas de 6.800 RPM con batería de 3.300 mAh (+2 horas reales)",
      "Cuchilla Wedge de recubrimiento DLC (Diamond-Like Carbon) que se mantiene fría",
      "Grip de goma antideslizante que reduce la fatiga de muñeca en jornadas largas",
    ],
    categoryType: "clipper",
    queryUS: "BaBylissPRO GoldFX Boost+ Clipper FX870GBP",
    queryES: "BaBylissPRO Boost+ GoldFX cortapelos",
    ctaLabel: "Ver Boost+ en Amazon",
    specHighlight: "6.800 RPM · Cuchilla DLC · Grip Diamante",
  },

  BABYLISS_LOPROFX_CLIPPER: {
    id: "babyliss-loprofx-clipper",
    badge: "🖤 Mejor Ergonomía Perfil Bajo",
    brand: "BaBylissPRO",
    title: "BaBylissPRO Lo-PROFX Cordless Clipper (FX825)",
    subtitle:
      "Diseño plano de perfil ultrabajo con hendidura para el pulgar y cuchilla de grafito de fricción cero.",
    features: [
      "Cubierta metálica de perfil bajo (Low-Profile) que se siente como una extensión de la mano",
      "Motor digital Brushless de 6.800 RPM (13.600 SPM) de velocidad constante",
      "Cuchilla Fade de grafito negro de 45 mm que no se calienta tras múltiples cortes",
    ],
    categoryType: "clipper",
    queryUS: "BaBylissPRO Lo-PROFX Clipper FX825",
    queryES: "BaBylissPRO Lo-PROFX cortapelos profesional",
    ctaLabel: "Ver Lo-PROFX en Amazon",
    specHighlight: "6.800 RPM · Cuchilla Grafito · Low-Profile",
  },

  JRL_ONYX_CLIPPER: {
    id: "jrl-onyx-clipper",
    badge: "🥇 Mejor Clipper Silenciosa 5 Horas",
    brand: "JRL Professional",
    title: "JRL FreshFade 2020C-B Onyx Clipper con Base Reset IQ",
    subtitle:
      "La máquina favorita de los barberos actuales: 5 horas de batería, cuchilla fría Cool Blade y doble velocidad (6.000 y 7.500 RPM).",
    features: [
      "Batería récord de 5 horas con base de carga inteligente Reset IQ incluida",
      "Tecnología patentada Cool Blade (mantiene la cuchilla 7 °C más fría que la competencia)",
      "2 velocidades (6.000 y 7.500 RPM) con tecnología Smart-Clip que sube potencia en pelo grueso",
    ],
    categoryType: "clipper",
    queryUS: "JRL Onyx Ghost 2020C-B Cordless Hair Clipper Reset IQ",
    queryES: "JRL FreshFade 2020C-B Onyx cortapelos profesional",
    ctaLabel: "Ver JRL Onyx en Amazon",
    specHighlight: "6.000/7.500 RPM · 5h Batería · Cool Blade",
  },

  JRL_2020C_GOLD: {
    id: "jrl-2020c-gold",
    badge: "🔇 Ultra Silenciosa + 4h Batería",
    brand: "JRL Professional",
    title: "JRL FreshFade 2020C Gold / Silver Clipper Profesional",
    subtitle:
      "La clipper con pantalla LED de autonomía, cuchilla escalonada fría y palanca con 5 niveles de bloqueo.",
    features: [
      "4 horas de batería continua con indicador LED digital de tiempo restante",
      "Doble velocidad (6.000 y 7.200 RPM) y motor ultra silencioso (<60 dB)",
      "Incluye 10 peines guía completos, protector y herramienta de ajuste Zero-Gap",
    ],
    categoryType: "clipper",
    queryUS: "JRL FreshFade 2020C Cordless Clipper Gold",
    queryES: "JRL FreshFade 2020C cortapelos profesional",
    ctaLabel: "Ver JRL 2020C en Amazon",
    specHighlight: "6.000/7.200 RPM · 4h Batería · Pantalla LED",
  },

  STYLECRAFT_INSTINCT_CLIPPER: {
    id: "stylecraft-instinct-clipper",
    badge: "⚡ Motor Vectorial 11.500 RPM",
    brand: "StyleCraft / Gamma+",
    title: "StyleCraft Instinct Cordless Vector Motor Clipper",
    subtitle:
      "Tamaño micro compacto con el motor vectorial más rápido del mercado que detecta resistencia y acelera solo.",
    features: [
      "Motor Vectorial IN2 de 11.500 RPM con control intuitivo de torque (Intuitive Torque Control)",
      "Cuchilla fija Faper Black Diamond Carbon + Cuchilla móvil Deep Slim DLC",
      "Incluye 3 carcasas intercambiables (negra, roja y azul), soporte de carga y 8 peines magnéticos",
    ],
    categoryType: "clipper",
    queryUS: "StyleCraft Instinct Cordless Vector Clipper",
    queryES: "StyleCraft Gamma+ Boosted Instinct cortapelos",
    ctaLabel: "Ver StyleCraft Instinct en Amazon",
    specHighlight: "11.500 RPM Vector · Cuchilla Faper DLC · 4h",
  },

  STYLECRAFT_REBEL_CLIPPER: {
    id: "stylecraft-rebel-clipper",
    badge: "🔥 Super-Torque 7.200 RPM + 3h",
    brand: "StyleCraft",
    title: "StyleCraft Rebel Professional Super-Torque Modular Clipper",
    subtitle:
      "Potencia bruta con cuchilla Fusion Faper DLC, 3 horas de autonomía y carcasas personalizables.",
    features: [
      "Motor rotativo Super-Torque de 7.200 RPM que atraviesa cualquier volumen sin esfuerzo",
      "Cuchilla Faper (híbrido entre Fade y Taper) en carbono Black Diamond inoxidable",
      "3 horas de batería inalámbrica + 3 tapas intercambiables y 8 peines guía magnéticos Dub",
    ],
    categoryType: "clipper",
    queryUS: "StyleCraft Rebel Super-Torque Modular Cordless Clipper",
    queryES: "StyleCraft Rebel Gamma+ cortapelos profesional",
    ctaLabel: "Ver StyleCraft Rebel en Amazon",
    specHighlight: "7.200 RPM · Cuchilla Faper DLC · 180 min",
  },

  GAMMA_X_ERGO_CLIPPER: {
    id: "gamma-x-ergo-clipper",
    badge: "🧲 Motor Magnético 10.000 RPM",
    brand: "Gamma+ / StyleCraft",
    title: "Gamma+ X-Ergo Magnetic Motor Cordless Clipper",
    subtitle:
      "Motor magnético microchip de 10.000 RPM con 3 palancas personalizables (clic o flotante) y cuchilla Taper DLC.",
    features: [
      "Motor magnético lineal de 10.000 RPM de larga vida útil sin pérdida de velocidad",
      "Cuchilla Black Diamond Carbon de 45 mm para desvanecidos ultra suaves",
      "Incluye 3 carcasas metálicas/modulares (oro, oro rosa y cromo) y base de carga pesada",
    ],
    categoryType: "clipper",
    queryUS: "Gamma+ X-Ergo Magnetic Clipper",
    queryES: "Gamma+ X-Ergo cortapelos motor magnetico",
    ctaLabel: "Ver Gamma+ X-Ergo en Amazon",
    specHighlight: "10.000 RPM Magnético · 3 Carcasas · 120 min",
  },

  ANDIS_MASTER_CORDLESS: {
    id: "andis-master-cordless",
    badge: "🦅 Leyenda Americana en Aluminio",
    brand: "Andis",
    title: "Andis Master Cordless Lithium-Ion Clipper (MLC)",
    subtitle:
      "La máquina legendaria de aluminio irrompible de Andis en versión inalámbrica con velocidad constante de 7.200 SPM.",
    features: [
      "Carcasa de aluminio aeronáutico indestructible con palanca de ajuste de 000 a 1",
      "Motor rotativo de 7.200 SPM con tecnología de velocidad constante (Constant Speed)",
      "Cuchilla Master de acero al carbono de 22 dientes perfecta para tapering clásico y graduaciones",
    ],
    categoryType: "clipper",
    queryUS: "Andis Master Cordless Lithium Ion Clipper 12470",
    queryES: "Andis Master Cordless cortapelos aluminio",
    ctaLabel: "Ver Andis Master en Amazon",
    specHighlight: "7.200 SPM · Aluminio Macizo · Cuchilla 000-1",
  },

  OSTER_FAST_FEED: {
    id: "oster-fast-feed",
    badge: "🤫 Motor Pivotante Whisper-Quiet",
    brand: "Oster Professional",
    title: "Oster Fast Feed Adjustable Pivot Motor Clipper",
    subtitle:
      "El secreto de los barberos veteranos: motor pivotante con el doble de fuerza de corte que un motor magnético para cabello mojado o grueso.",
    features: [
      "Motor pivotante Whisper-Quiet silencioso con altísimo torque a bajas revoluciones",
      "Cuchilla Cryogen-X ajustable de #000 a #1 (compatible con cuchilla cerámica Andis/Oster)",
      "Ideal para desbaste rápido, cabello húmedo y fades oscuros sin recalentar",
    ],
    categoryType: "clipper",
    asinUS: "B001JJBC9Y",
    queryUS: "Oster Fast Feed Adjustable Pivot Motor Clipper 76023-510",
    queryES: "Oster Fast Feed cortapelos profesional",
    ctaLabel: "Ver Oster Fast Feed en Amazon",
    specHighlight: "Motor Pivotante · Cryogen-X · Ultra Torque",
  },

  // --- TRIMMERS / PATILLERAS ---
  WAHL_DETAILER_LI: {
    id: "wahl-detailer-li",
    badge: "🎯 Cuchilla T-Wide #1 en Precisión",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Cordless Detailer Li — Patillera Profesional T-Wide",
    subtitle:
      "La patillera de referencia de Wahl con cuchilla en T extra ancha revestida en titanio y carbono DLC.",
    features: [
      "Cuchilla T-Wide #2215 (6 mm más ancha que una T estándar) ajustable a Zero-Overlap",
      "Motor rotativo de 6.800 RPM para marcar contornos, cerquillos y diseños sin repasar",
      "100 minutos de autonomía con base de carga pesada giratoria Swivel Cord",
    ],
    categoryType: "trimmer",
    asinUS: "B07R623W7P",
    queryUS: "Wahl Professional 5 Star Cordless Detailer Li Trimmer 8171",
    queryES: "Wahl 5 Star Cordless Detailer Li patillera",
    ctaLabel: "Ver Detailer Li en Amazon",
    specHighlight: "6.800 RPM · Cuchilla T-Wide · 100 min",
  },

  WAHL_HIVIZ_TRIMMER: {
    id: "wahl-hiviz-trimmer",
    badge: "👁️ Cuello Ultrafino Visión 360°",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Hi-Viz Cordless Trimmer — Patillera Metálica DLC",
    subtitle:
      "La patillera más avanzada de Wahl: cuello estrecho de alta visibilidad, cuerpo metálico y cuchilla T-Wide DLC.",
    features: [
      "Diseño de cuello delgado (High-Visibility) para ver cada milímetro detrás de la oreja y bigote",
      "Motor de 7.200 RPM con Adaptive Speed Control y cuchilla revestida en diamante DLC",
      "135 minutos de batería, carga por USB-C o base pesada e incluye herramienta Pro-Set Zero-Gap",
    ],
    categoryType: "trimmer",
    queryUS: "Wahl Professional 5 Star Hi-Viz Trimmer 3023709",
    queryES: "Wahl 5 Star Hi-Viz Trimmer patillera",
    ctaLabel: "Ver Wahl Hi-Viz en Amazon",
    specHighlight: "7.200 RPM · Cuello Hi-Viz · Cuchilla DLC",
  },

  BABYLISS_SKELETONFX: {
    id: "babyliss-skeletonfx",
    badge: "👑 #1 Mundial en Contornos y Diseños",
    brand: "BaBylissPRO",
    title: "BaBylissPRO GoldFX Outlining Trimmer Skeleton (FX787G)",
    subtitle:
      "La patillera esqueleto con cuchilla en T expuesta 360° que revolucionó los cerquillos (line-ups) y el hair tattoo.",
    features: [
      "Cuchilla T de 360° totalmente expuesta para visibilidad total en cualquier ángulo y menor temperatura",
      "Motor digital Brushless Ferrari de 7.200 RPM de torque constante",
      "Cuchilla Deep-Tooth de 2.0 mm en titanio dorado DLC + 2 horas de batería de litio",
    ],
    categoryType: "trimmer",
    asinUS: "B07T2L4V3W",
    queryUS: "BaBylissPRO GoldFX Outlining Trimmer FX787G",
    queryES: "BaBylissPRO SkeletonFX FX7870GE patillera profesional",
    ctaLabel: "Ver SkeletonFX en Amazon",
    specHighlight: "7.200 RPM · Cuchilla 360° DLC · 120 min",
  },

  JRL_ONYX_TRIMMER: {
    id: "jrl-onyx-trimmer",
    badge: "❄️ Cuchilla EZ-Gap que No Quema",
    brand: "JRL Professional",
    title: "JRL FreshFade 2020T-B Onyx Cordless Trimmer + Base Carga",
    subtitle:
      "Patillera ultra silenciosa de 8.200 RPM con cuchilla EZ-Gap 360° que marca nítido sin morder ni enrojecer pieles sensibles.",
    features: [
      "Motor de 8.200 RPM con tecnología Smart-Clip y 3.5 horas de batería continua",
      "Cuchilla EZ-Gap expuesta 360° con tecnología Cool Blade (no calienta ni irrita)",
      "Incluye base de carga oficial JRL, 5 peines guía para barba y ajustador Zero-Gap",
    ],
    categoryType: "trimmer",
    queryUS: "JRL Onyx 2020T-B Cordless Hair Trimmer",
    queryES: "JRL FreshFade 2020T-B Onyx Trimmer patillera",
    ctaLabel: "Ver JRL Onyx Trimmer en Amazon",
    specHighlight: "8.200 RPM · 3.5h Batería · EZ-Gap Cool Blade",
  },

  STYLECRAFT_SABER_TRIMMER: {
    id: "stylecraft-saber-trimmer",
    badge: "🗡️ Cuerpo Metálico Ultrafino",
    brand: "StyleCraft / Gamma+",
    title: "StyleCraft Saber Professional Digital Brushless Metal Trimmer",
    subtitle:
      "Cuerpo cilíndrico 100% metálico ultra delgado, motor sin escobillas de 7.500 RPM y 4 horas de autonomía.",
    features: [
      "Motor Digital Brushless de 7.500 RPM con vibración mínima y 4 horas de batería",
      "Combinación de cuchilla fija X-Pro Wide + cuchilla móvil 'The One' Black Diamond DLC",
      "Corte quirúrgico ultra suave que no rasguña el cuello de niños ni pieles delicadas",
    ],
    categoryType: "trimmer",
    queryUS: "StyleCraft Saber Cordless Digital Brushless Trimmer",
    queryES: "StyleCraft Saber Gamma+ Trimmer patillera",
    ctaLabel: "Ver StyleCraft Saber en Amazon",
    specHighlight: "7.500 RPM Brushless · 4h Batería · Cuchilla X-Pro",
  },

  ANDIS_SLIMLINE_PRO_LI: {
    id: "andis-slimline-pro-li",
    badge: "🪶 La Mejor Calidad/Precio Ligera",
    brand: "Andis",
    title: "Andis Slimline Pro Li T-Blade Trimmer (D-8)",
    subtitle:
      "Con solo 140 gramos de peso y más de 38.000 reseñas positivas, es la patillera más cómoda para detalles y uso diario.",
    features: [
      "Peso pluma (140 g) y cuerpo ergonómico delgado para perfilar barba, nuca y patillas",
      "Motor rotativo de 6.000 SPM + Batería de litio de 2 horas con base de carga incluida",
      "Cuchilla en T de acero al carbono #32105 fácilmente ajustable a Zero-Gap",
    ],
    categoryType: "trimmer",
    asinUS: "B00FDZMC9Y",
    queryUS: "Andis Slimline Pro Li T-Blade Trimmer 32400",
    queryES: "Andis Slimline Pro Li patillera profesional",
    ctaLabel: "Ver Andis Slimline en Amazon",
    specHighlight: "6.000 SPM · 140 g Ultraligera · 120 min",
  },

  ANDIS_GTX_EXO: {
    id: "andis-gtx-exo",
    badge: "🦷 Cuchilla GTX-Z Deep-Tooth 360°",
    brand: "Andis",
    title: "Andis GTX-EXO Cordless Li T-Outliner Trimmer",
    subtitle:
      "Toda la pegada de la legendaria Andis T-Outliner en formato esqueleto 360° con cuchilla GTX-Z preajustada.",
    features: [
      "Cabezal recortado EXO para visión 360° al trazar contornos y líneas de barba",
      "Cuchilla GTX-Z de dientes profundos recubierta en oro anticorrosión con gap cerrado de fábrica",
      "Motor rotativo de 7.200 SPM con velocidad constante y base de carga premium",
    ],
    categoryType: "trimmer",
    queryUS: "Andis GTX-EXO Cordless Trimmer 74100",
    queryES: "Andis GTX-EXO Cordless Trimmer patillera",
    ctaLabel: "Ver Andis GTX-EXO en Amazon",
    specHighlight: "7.200 SPM · Cuchilla GTX-Z · Visión 360°",
  },

  ANDIS_T_OUTLINER_CORDLESS: {
    id: "andis-t-outliner-cordless",
    badge: "💈 El Clásico de los Cerquillos",
    brand: "Andis",
    title: "Andis Cordless T-Outliner Lithium-Ion Trimmer (ORL)",
    subtitle:
      "La patillera más famosa de la historia de la barbería norteamericana ahora con batería de litio y 7.200 SPM.",
    features: [
      "Cuchilla T-Outliner de acero al carbono templado para líneas ultra marcadas en seco",
      "Motor rotativo de 7.200 SPM con tecnología Constant Speed que no pierde fuerza",
      "100 minutos de autonomía y base de carga con indicador LED",
    ],
    categoryType: "trimmer",
    queryUS: "Andis Cordless T-Outliner Li Trimmer 74000",
    queryES: "Andis T-Outliner Cordless patillera",
    ctaLabel: "Ver T-Outliner en Amazon",
    specHighlight: "7.200 SPM · Acero al Carbono · 100 min",
  },

  // --- FOIL SHAVERS & ELECTRIC SHAVERS ---
  ANDIS_PROFOIL_TS2: {
    id: "andis-profoil-ts2",
    badge: "🥇 #1 Foil Shaver Hipoalergénica",
    brand: "Andis",
    title: "Andis ProFoil Lithium Plus Titanium Foil Shaver (TS-2)",
    subtitle:
      "La afeitadora de láminas más usada en barberías para dejar el Skin Fade a ras de piel sin irritación ni vellos encarnados.",
    features: [
      "Doble lámina escalonada de titanio dorado hipoalergénico para un afeitado al 0.0 mm sin ardor",
      "Motor rotativo silencioso de 9.000 SPM y peso ultraligero (140 g)",
      "80 minutos de autonomía con base de carga vertical incluida (modelo Plus TS-2)",
    ],
    categoryType: "shaver",
    asinUS: "B074F13H6P",
    queryUS: "Andis ProFoil Lithium Plus Titanium Foil Shaver TS-2 17200",
    queryES: "Andis ProFoil Lithium Plus TS-2 afeitadora barberia",
    ctaLabel: "Ver Andis ProFoil en Amazon",
    specHighlight: "9.000 SPM · Lámina Titanio Oro · 140 g",
  },

  BABYLISS_FOILFX02: {
    id: "babyliss-foilfx02",
    badge: "⚡ Máxima Potencia 11.000 RPM",
    brand: "BaBylissPRO",
    title: "BaBylissPRO FoilFX02 Cordless Metal Double Foil Shaver",
    subtitle:
      "Cuerpo 100% metálico pesado y motor de 11.000 RPM que devora el cabello corto de la nuca en la mitad de pasadas.",
    features: [
      "Motor rotativo de alta velocidad (11.000 RPM) y hasta 3 horas de batería inalámbrica",
      "Doble cabezal flotante con láminas de oro hipoalergénico de 44 mm",
      "Carcasa metálica con apagado automático al colocar la tapa protectora",
    ],
    categoryType: "shaver",
    asinUS: "B077bfd73X",
    queryUS: "BaBylissPRO Barberology FoilFX02 Cordless Metal Double Foil Shaver",
    queryES: "BaBylissPRO FoilFX02 afeitadora metalica doble lamina",
    ctaLabel: "Ver FoilFX02 en Amazon",
    specHighlight: "11.000 RPM · 3h Batería · Cuerpo Metal",
  },

  BABYLISS_UV_FOIL: {
    id: "babyliss-uv-foil",
    badge: "🦠 Desinfección UV Automática",
    brand: "BaBylissPRO",
    title: "BaBylissPRO UV Foil Double-Foil Metal Shaver (FXX3SBE)",
    subtitle:
      "La primera shaver de barbería con luz ultravioleta UV-C en la tapa que elimina el 99.9% de bacterias entre clientes.",
    features: [
      "Ciclo automático de esterilización UV de 3 minutos al cerrar la tapa metálica",
      "Láminas de titanio negro de alta precisión + Motor de 10.000 RPM",
      "5.5 horas de batería con puerto de carga rápida USB-C y estándar",
    ],
    categoryType: "shaver",
    queryUS: "BaBylissPRO UV Foil Double Foil Shaver",
    queryES: "BaBylissPRO UV Foil Shaver afeitadora",
    ctaLabel: "Ver UV Foil en Amazon",
    specHighlight: "10.000 RPM · Luz UV-C 99.9% · 5.5h Batería",
  },

  WAHL_VANISH_SHAVER: {
    id: "wahl-vanish-shaver",
    badge: "☁️ Cabezales con Suspensión Independiente",
    brand: "Wahl Professional",
    title: "Wahl 5 Star Vanish Foil Shaver — Afeitadora de Láminas Independientes",
    subtitle:
      "Barras de corte con suspensión individual que se adaptan a la mandíbula y nuca, con láminas que se cambian por separado.",
    features: [
      "Sistema de suspensión independiente que abraza cada contorno del cuello y cráneo",
      "Láminas de micro-oro extraíbles individualmente (ahorras reemplazando solo la lámina gastada)",
      "Motor de 9.000+ RPM, 100 minutos de batería con pantalla LED de combustible y bloqueo de viaje",
    ],
    categoryType: "shaver",
    queryUS: "Wahl Professional 5 Star Vanish Shaver 3022905",
    queryES: "Wahl 5 Star Vanish Shaver afeitadora barberia",
    ctaLabel: "Ver Wahl Vanish en Amazon",
    specHighlight: "9.000 RPM · Láminas Individuales · LED",
  },

  PHILIPS_ONEBLADE_PRO_360: {
    id: "philips-oneblade-pro-360",
    badge: "🧔 #1 para Perfilar Barba en Casa",
    brand: "Philips Norelco",
    title: "Philips Norelco OneBlade Pro 360 Face + Body Hybrid Trimmer",
    subtitle:
      "La herramienta híbrida ideal para clientes de barbería que quieren mantener sus mejillas, cuello y largo de barba entre citas.",
    features: [
      "Cuchilla 360 flexible de doble cara (12.000 movimientos/min) que corta el pelo sin tocar la piel",
      "Peine de precisión con dial de 14 longitudes bloqueables (0.4 mm a 10 mm)",
      "100% resistente al agua (Wet & Dry) con 120 minutos de batería Li-Ion y pantalla LED",
    ],
    categoryType: "shaver",
    queryUS: "Philips Norelco OneBlade Pro 360 Hybrid Electric Trimmer Shaver",
    queryES: "Philips OneBlade Pro 360 recortadora barba",
    ctaLabel: "Ver OneBlade Pro 360 en Amazon",
    specHighlight: "Cuchilla 360° · Dial 14 Niveles · 120 min",
  },

  BRAUN_SERIES_9_PRO: {
    id: "braun-series-9-pro",
    badge: "🇩🇪 Ingeniería Alemana Premium",
    brand: "Braun",
    title: "Braun Series 9 PRO+ Electric Shaver con Estación SmartCare",
    subtitle:
      "La afeitadora eléctrica de láminas más avanzada de fabricación alemana para barbas de 1, 3 o 7 días sin tirones.",
    features: [
      "5 elementos de afeitado sincronizados con recortadora ProLift recubierta en titanio",
      "Tecnología AutoSense (10.000 microvibraciones sónicas) que adapta la potencia a la densidad de tu barba",
      "Incluye estación de limpieza y lubricación 6 en 1 + Estuche de carga portátil PowerCase",
    ],
    categoryType: "shaver",
    queryUS: "Braun Series 9 PRO+ Electric Shaver SmartCare",
    queryES: "Braun Series 9 PRO+ afeitadora electrica hombre",
    ctaLabel: "Ver Braun Series 9 Pro en Amazon",
    specHighlight: "5 Elementos ProLift · Sónica · 100% Waterproof",
  },

  // --- CLASSIC WET SHAVING / RAZORS & BLADES ---
  MERKUR_34C_HD: {
    id: "merkur-34c-hd",
    badge: "🇩🇪 La Maquinilla Clásica #1 del Mundo",
    brand: "Merkur Solingen",
    title: "Merkur 34C Heavy Duty (HD) Classic Safety Razor — Solingen",
    subtitle:
      "Fabricada en Solingen (Alemania): el estándar de oro en maquinillas de doble filo por su peso equilibrado y ángulo intuitivo.",
    features: [
      "Diseño de 2 piezas con mango corto moleteado antideslizante y cabezal de peine cerrado",
      "Agresividad media-suave perfecta tanto para principiantes como para afeitado diario sin irritación",
      "Acabado cromado de alta durabilidad compatible con cualquier hoja Double Edge (DE)",
    ],
    categoryType: "razor",
    asinUS: "B000QYEK88",
    queryUS: "Merkur Mk34c Double Edge Safety Razor Heavy Duty",
    queryES: "Merkur 34C Heavy Duty maquinilla afeitar clasica",
    ctaLabel: "Ver Merkur 34C en Amazon",
    specHighlight: "Hecha en Solingen · 2 Piezas · Peine Cerrado",
  },

  MUHLE_R89_RAZOR: {
    id: "muhle-r89-razor",
    badge: "✨ Acabado Cromado de Lujo Alemán",
    brand: "MÜHLE",
    title: "MÜHLE R89 Traditional Safety Razor — Peine Cerrado Cromado",
    subtitle:
      "Geometría de cabezal ultra precisa que desliza sobre el rostro con suavidad quirúrgica y cero riesgo de cortes.",
    features: [
      "Cabezal R89 de peine cerrado reconocido por expertos como el más equilibrado del afeitado clásico",
      "Cromado artesanal anticorrosión con grabado de alta adherencia en húmedo",
      "Diseño de 3 piezas fácil de desmontar y desinfectar",
    ],
    categoryType: "razor",
    queryUS: "MUHLE R89 Traditional Double Edge Safety Razor Closed Comb",
    queryES: "Muhle R89 maquinilla afeitar clasica peine cerrado",
    ctaLabel: "Ver Mühle R89 en Amazon",
    specHighlight: "Peine Cerrado R89 · 3 Piezas · Hecha en Alemania",
  },

  ROCKWELL_6S_RAZOR: {
    id: "rockwell-6s-razor",
    badge: "⚙️ 6 Niveles en Acero Inoxidable 316L",
    brand: "Rockwell Razors",
    title: "Rockwell 6S Adjustable Stainless Steel Safety Razor",
    subtitle:
      "Una maquinilla para toda la vida: 100% acero inoxidable 316L con 3 placas reversibles (ajustes R1 a R6) para personalizar el apurado.",
    features: [
      "6 ángulos de exposición de hoja (desde R1 ultra suave para piel sensible hasta R6 para barba cerrada de varios días)",
      "Forjada por inyección metálica en acero inoxidable marino 316L indestructible",
      "Elimina por completo los vellos encarnados y el ardor de las cuchillas desechables",
    ],
    categoryType: "razor",
    queryUS: "Rockwell 6S Adjustable Stainless Steel Safety Razor",
    queryES: "Rockwell 6S maquinilla afeitar acero inoxidable ajustable",
    ctaLabel: "Ver Rockwell 6S en Amazon",
    specHighlight: "Acero Inox 316L · 6 Ajustes (R1-R6) · De por vida",
  },

  PARKER_SRX_SHAVETTE: {
    id: "parker-srx-shavette",
    badge: "💈 El Portanavajas #1 de los Barberos",
    brand: "Parker Safety Razor",
    title: "Parker SRX Heavy Duty 100% Stainless Steel Barber Shavette",
    subtitle:
      "Navaja barbero de media hoja construida íntegramente en acero inoxidable quirúrgico con mecanismo Clip-to-Close seguro.",
    features: [
      "Mango y brazo 100% de acero inoxidable pesado (sin piezas plásticas que se oxiden en desinfectante)",
      "Sistema de bloqueo por clic que fija la media cuchilla con alineación milimétrica",
      "Punta redondeada de seguridad ideal para perfilar mejillas, patillas y nuca en barbería",
    ],
    categoryType: "razor",
    asinUS: "B01D82X7M6",
    queryUS: "Parker SRX Heavy Duty Stainless Steel Straight Edge Barber Razor",
    queryES: "Parker SRX navaja barbero shavette acero inoxidable",
    ctaLabel: "Ver Parker SRX en Amazon",
    specHighlight: "100% Acero Inox · Clip-Lock · Media Hoja",
  },

  ASTRA_PLATINUM_100: {
    id: "astra-platinum-100",
    badge: "💚 Pack x100 #1 Más Vendido",
    brand: "Astra",
    title: "Astra Superior Platinum Double Edge Razor Blades (Pack 100 Hojas)",
    subtitle:
      "El equilibrio perfecto entre filo y suavidad recubierta en platino: las cuchillas favoritas de las barberías y del afeitado clásico.",
    features: [
      "Acero inoxidable recubierto en platino que perdura afilado sin raspar la epidermis",
      "Se pueden partir a la mitad dentro de su envoltorio de cera para usar en navaja Shavette (200 servicios)",
      "Compatibles con todas las maquinillas clásicas (Merkur, Mühle, Rockwell, King C. Gillette)",
    ],
    categoryType: "blade",
    asinUS: "B001QY8QXM",
    queryUS: "Astra Superior Platinum Double Edge Safety Razor Blades 100 Count",
    queryES: "Astra Superior Platinum cuchillas doble filo 100",
    ctaLabel: "Ver Pack de 100 en Amazon",
    specHighlight: "100 Hojas Doble Filo · Recubrimiento Platino",
  },

  FEATHER_BLADES_100: {
    id: "feather-blades-100",
    badge: "🇯🇵 Las Hojas Más Afiladas del Mundo",
    brand: "Feather Japan",
    title: "Feather New Hi-Stainless Double Edge Blades (Fabricadas en Japón)",
    subtitle:
      "Filo quirúrgico japonés recubierto en platino para barbas extremadamente duras y trazos limpios de un solo toque.",
    features: [
      "Fabricadas en Seki (Japón) con el afilado láser de mayor precisión de la industria",
      "Ideales para combinar con maquinillas suaves (Merkur 34C, Mühle R89) o perfilado experto",
      "Estuche dispensador con ranura trasera segura para desechar hojas usadas",
    ],
    categoryType: "blade",
    queryUS: "Feather Hi-Stainless Platinum Double Edge Razor Blades",
    queryES: "Feather Hi-Stainless cuchillas afeitar japonesas",
    ctaLabel: "Ver Cuchillas Feather en Amazon",
    specHighlight: "Acero Japonés Seki · Filo Quirúrgico Extremo",
  },

  // --- SCISSORS & REPLACEMENT BLADES ---
  VG10_JAPANESE_SHEARS: {
    id: "vg10-japanese-shears",
    badge: "✂️ Acero Japonés 440C / VG-10 Filo Navaja",
    brand: "Equinox / Kasho / Kamisori Style",
    title: "Tijeras Profesionales de Barbería 6.0\"/6.5\" Acero Japonés Filo Convexo",
    subtitle:
      "Mango ergonómico Offset antitúnel carpiano, tornillo de tensión micrométrico y hojas convexas para corte en seco, mojado y slide cutting.",
    features: [
      "Acero inoxidable japonés templado en frío (dureza 60-62 HRC) que mantiene el filo por meses",
      "Geometría ergonómica Offset con apoyadedos anatómico que relaja hombro y muñeca",
      "Ideales para técnica de tijera sobre peine (Scissor Over Comb) y texturizado de coronilla",
    ],
    categoryType: "scissors",
    queryUS: "Japanese Steel Professional Barber Hair Cutting Shears 6.5 inch Offset",
    queryES: "tijeras barberia profesional acero japones 6.5 pulgadas",
    ctaLabel: "Ver Tijeras Profesionales en Amazon",
    specHighlight: "Acero Japonés 60-62 HRC · Mango Offset · Filo Convexo",
  },

  WAHL_REPLACEMENT_BLADE_2161: {
    id: "wahl-replacement-blade-2161",
    badge: "🔩 Repuesto Oficial Wahl USA",
    brand: "Wahl Professional",
    title: "Wahl 2161 Stagger-Tooth / 2191 Fade Replacement Blade (2 Agujeros)",
    subtitle:
      "Devuelve a tu Wahl Magic Clip o Senior el filo original del primer día con la cuchilla oficial de 2 agujeros.",
    features: [
      "Acero al carbono de alta precisión con tratamiento anticorrosión original Wahl",
      "Incluye cuchilla fija inferior, cuchilla móvil superior, 2 tornillos y aceite Wahl",
      "Compatible con Magic Clip, Senior, Super Taper, Legend y Sterling (estándar 2-Hole)",
    ],
    categoryType: "blade",
    queryUS: "Wahl Professional 2161 Stagger Tooth Clipper Blade Replacement",
    queryES: "cuchilla repuesto original Wahl 2161 Magic Clip",
    ctaLabel: "Ver Cuchilla Oficial Wahl en Amazon",
    specHighlight: "Original Wahl 2-Agujeros · Incluye Tornillos y Aceite",
  },

  CERAMIC_CUTTER_BLADE_PACK: {
    id: "ceramic-cutter-blade-pack",
    badge: "❄️ Reduce 75% el Calor de tu Clipper",
    brand: "Ceramic Barber Upgrade",
    title: "Cuchillas Móviles de Cerámica de Circonio Stagger-Tooth (Pack x2)",
    subtitle:
      "La mejora favorita de los barberos para Wahl, BaByliss y Andis: no conduce calor, pesa menos y mantiene el filo hasta 5 veces más.",
    features: [
      "Cerámica de óxido de circonio avanzada con 75% menos fricción térmica que el acero",
      "Reemplazo directo de la cuchilla pequeña móvil en menos de 3 minutos",
      "Mantiene la máquina fría durante jornadas continuas de fades",
    ],
    categoryType: "blade",
    queryUS: "Ceramic Replacement Cutter Blade for Wahl Magic Clip Senior 2-Pack",
    queryES: "cuchilla ceramica repuesto Wahl Magic Clip Senior",
    ctaLabel: "Ver Cuchillas Cerámicas en Amazon",
    specHighlight: "Cerámica Fría · 5x Durabilidad · Instalación 3 min",
  },

  ANDIS_PROFOIL_REPLACEMENT_HEAD: {
    id: "andis-profoil-replacement-head",
    badge: "🔄 Repuesto Oficial Lámina + Cuchillas",
    brand: "Andis",
    title: "Andis ProFoil Titanium Foil & Cutters Replacement Assembly (#17155)",
    subtitle:
      "Conjunto completo original de cabezal con doble lámina de titanio dorado y 2 barras de corte internas para TS-1 y TS-2.",
    features: [
      "Restaura al 100% la potencia y suavidad de tu Andis ProFoil sin tener que comprar otra máquina",
      "Incluye el cabezal de doble malla hipoalergénica + el par de cuchillas internas nuevas",
      "Se instala a presión en 5 segundos sin necesidad de destornillador",
    ],
    categoryType: "blade",
    queryUS: "Andis ProFoil Foil and Cutter Replacement Pack 17155",
    queryES: "Andis ProFoil cabezal lamina y cuchillas repuesto 17155",
    ctaLabel: "Ver Cabezal Oficial en Amazon",
    specHighlight: "Original Andis #17155 · Lámina + 2 Cuchillas",
  },

  // --- MAINTENANCE, HYGIENE & STATION ACCESSORIES ---
  ANDIS_COOL_CARE_PLUS: {
    id: "andis-cool-care-plus",
    badge: "❄️ Spray 5 en 1 #1 en Barberías",
    brand: "Andis",
    title: "Andis Cool Care Plus 5-in-1 Clipper Spray (Enfriador y Desinfectante)",
    subtitle:
      "El spray imprescindible en toda estación de barbero: enfría, desinfecta, lubrica, limpia y previene el óxido en 10 segundos.",
    features: [
      "Fórmula 5 en 1 (Virucida, Fungicida, Bactericida, Enfriador instantáneo y Lubricante)",
      "Boquilla de alta presión que expulsa los pelos atrapados entre las cuchillas sin desmontarlas",
      "Aroma fresco clásico de barbería y protección antioxidante",
    ],
    categoryType: "maintenance",
    asinUS: "B000LNB8HK",
    queryUS: "Andis Cool Care Plus Clipper Blade Spray 15.5 oz",
    queryES: "Andis Cool Care Plus spray 5 en 1 cuchillas barberia",
    ctaLabel: "Ver Andis Cool Care en Amazon",
    specHighlight: "Fórmula 5-en-1 · Enfría al Instante · 439 g",
  },

  WAHL_PREMIUM_GUARDS_SET: {
    id: "wahl-premium-guards-set",
    badge: "📎 Clip Metálico (#0.5 a #8)",
    brand: "Wahl Professional",
    title: "Set Oficial de Peines Guía Wahl Premium con Clip Metálico + Organizador",
    subtitle:
      "Olvídate de las peinetas plásticas que se doblan o saltan a mitad del fade: fibra de vidrio con ingeniería mineral y seguro de acero.",
    features: [
      "Incluye los peines trampa indispensables #1/2 (1.5 mm) y #1 1/2 (4.5 mm) para borrar líneas",
      "Lengüeta metálica reforzada que abraza la cuchilla con firmeza total sin soltarse",
      "Plástico deslizable de bordes redondeados que no raspa el cuero cabelludo del cliente",
    ],
    categoryType: "accessory",
    queryUS: "Wahl Professional Premium Cutting Guides Metal Clip Set with Tray",
    queryES: "Wahl peines guia premium clip metalico set",
    ctaLabel: "Ver Peines Wahl Premium en Amazon",
    specHighlight: "Clip de Acero · Incluye #0.5 y #1.5 · Bandeja",
  },

  BARBICIDE_DISINFECTANT_JAR: {
    id: "barbicide-disinfectant-jar",
    badge: "🧪 Símbolo Mundial de Higiene en Barbería",
    brand: "Barbicide / Marvy",
    title: "Jarra de Vidrio Desinfectante de Barbería con Canastilla Inox + Concentrado",
    subtitle:
      "La clásica jarra de vidrio grueso con tapa y cesta elevadora de acero inoxidable para sumergir peines y tijeras sin tocar el líquido.",
    features: [
      "Vidrio templado de alta resistencia con base antideslizante de goma y tapa de acero pulido",
      "Canastilla interna de inmersión para retirar peines y clips sin contacto con las manos",
      "Cumple con las inspecciones sanitarias municipales para barberías y salones",
    ],
    categoryType: "maintenance",
    queryUS: "Barber Disinfectant Glass Jar Stainless Steel Basket Barbicide",
    queryES: "jarra desinfectante barberia vidrio acero inoxidable Barbicide",
    ctaLabel: "Ver Jarra Desinfectante en Amazon",
    specHighlight: "Vidrio Grueso + Acero Inox · Cesta Elevadora",
  },

  HOT_TOWEL_CABINET_UV: {
    id: "hot-towel-cabinet-uv",
    badge: "♨️ Ritual de Barba Toalla Caliente + UV",
    brand: "Hot Towel Warmer Pro",
    title: "Calentador de Toallas Profesional 2 en 1 con Esterilizador UV para Barbería",
    subtitle:
      "Mantiene hasta 24 toallas faciales a 70–80 °C constantes listas para el ritual de afeitado tradicional y limpieza facial.",
    features: [
      "Calefacción interna uniforme a 75 °C con termostato automático que evita sobrecocinar las toallas",
      "Lámpara germicida UV integrada para mantener las toallas húmedas libres de bacterias y moho",
      "Interior de aluminio antioxidante con doble rejilla extraíble y bandeja recolectora de condensación",
    ],
    categoryType: "accessory",
    queryUS: "Hot Towel Warmer Cabinet UV Sterilizer Barber Facial Spa",
    queryES: "calentador de toallas barberia esterilizador UV",
    ctaLabel: "Ver Calentador de Toallas en Amazon",
    specHighlight: "70-80 °C Constantes · Lámpara UV · 24 Toallas",
  },

  BARBER_TRAVEL_BACKPACK_CASE: {
    id: "barber-travel-backpack-case",
    badge: "🎒 Estación Portátil para Barberos",
    brand: "Barber Travel Pro",
    title: "Mochila / Maletín Organizador Impermeable para Herramientas de Barbero",
    subtitle:
      "Diseñada con compartimentos acolchados para 4 máquinas, 3 patilleras, tijeras, shavers, secador, peines y capa.",
    features: [
      "Bandas elásticas reforzadas a medida para sujetar Clippers y Trimmers sin que choquen entre sí",
      "Bolsillos térmicos y divisiones acolchadas de acceso rápido tipo estación desplegable",
      "Ideal para barberos a domicilio VIP, academias de barbería y eventos",
    ],
    categoryType: "accessory",
    queryUS: "Barber Backpack Case Organizer Clippers Supplies Travel Bag",
    queryES: "mochila maletin barbero organizador maquinas herramientas",
    ctaLabel: "Ver Maletín de Barbero en Amazon",
    specHighlight: "Capacidad Completa · Acolchado Antiimpacto",
  },

  BARBER_MAGNETIC_MAT_CAPE_PRO: {
    id: "barber-magnetic-mat-cape-pro",
    badge: "🧲 Estación Ordenada y Anticaídas",
    brand: "Barber Station Pro",
    title: "Tapete Magnético Antideslizante para Estación de Barbería (45×30 cm)",
    subtitle:
      "4 plazas magnéticas de neodimio que sostienen tus máquinas firmes sobre el tocador y evitan caídas accidentales.",
    features: [
      "Imanes de alta potencia integrados para fijar hasta 4 clippers/trimmers verticalmente",
      "Goma PVC resistente al calor de hasta 150 °C, fácil de lavar y a prueba de aceites y sprays",
      "Ranuras organizadoras para peines guía, tijeras, navaja y cepillos de fade",
    ],
    categoryType: "accessory",
    queryUS: "Magnetic Barber Mat Station Organizer Heat Resistant Clippers",
    queryES: "tapete magnetico barberia alfombrilla antideslizante maquinas",
    ctaLabel: "Ver Tapete Magnético en Amazon",
    specHighlight: "4 Imanes de Neodimio · Resistente al Calor",
  },
};

export type BarberProductKey = keyof typeof BARBER_CATALOG;

/**
 * Resolves 3 Amazon product recommendations from an explicit tuple of catalog keys
 * or falls back dynamically based on slug/title keywords.
 */
export function resolveBarberAmazonProducts(
  productKeys?: [string, string, string],
  slug = "",
  title = ""
): [
  AmazonProductRecommendation,
  AmazonProductRecommendation,
  AmazonProductRecommendation,
] {
  if (
    productKeys &&
    BARBER_CATALOG[productKeys[0]] &&
    BARBER_CATALOG[productKeys[1]] &&
    BARBER_CATALOG[productKeys[2]]
  ) {
    return [
      BARBER_CATALOG[productKeys[0]],
      BARBER_CATALOG[productKeys[1]],
      BARBER_CATALOG[productKeys[2]],
    ];
  }

  const text = `${slug} ${title}`.toLowerCase();

  if (text.includes("shaver") || text.includes("profoil") || text.includes("foilfx") || text.includes("vanish")) {
    return [
      BARBER_CATALOG.ANDIS_PROFOIL_TS2,
      BARBER_CATALOG.BABYLISS_FOILFX02,
      BARBER_CATALOG.ANDIS_PROFOIL_REPLACEMENT_HEAD,
    ];
  }

  if (text.includes("trimmer") || text.includes("patillera") || text.includes("detailer") || text.includes("skeleton") || text.includes("slimline") || text.includes("saber")) {
    return [
      BARBER_CATALOG.BABYLISS_SKELETONFX,
      BARBER_CATALOG.WAHL_DETAILER_LI,
      BARBER_CATALOG.JRL_ONYX_TRIMMER,
    ];
  }

  if (text.includes("merkur") || text.includes("muhle") || text.includes("rockwell") || text.includes("shavette") || text.includes("parker") || text.includes("astra") || text.includes("feather")) {
    return [
      BARBER_CATALOG.MERKUR_34C_HD,
      BARBER_CATALOG.PARKER_SRX_SHAVETTE,
      BARBER_CATALOG.ASTRA_PLATINUM_100,
    ];
  }

  if (text.includes("tijera")) {
    return [
      BARBER_CATALOG.VG10_JAPANESE_SHEARS,
      BARBER_CATALOG.BARBICIDE_DISINFECTANT_JAR,
      BARBER_CATALOG.BARBER_TRAVEL_BACKPACK_CASE,
    ];
  }

  return [
    BARBER_CATALOG.WAHL_MAGIC_CLIP,
    BARBER_CATALOG.JRL_ONYX_CLIPPER,
    BARBER_CATALOG.ANDIS_COOL_CARE_PLUS,
  ];
}
