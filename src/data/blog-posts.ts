import {
  YOU_MINOX_URL,
  getAllBarberias,
  getTopNationalBarberias,
  type BarberShop,
} from "@/lib/barberias";
import { PILLAR_ARTICLES } from "./blog-pillars";
import { EXTRA_GB_SEEDS, type GBArticleSeed } from "./blog-seeds";
import { PHASE2_GB_SEEDS } from "./blog-seeds-phase2";

export type CategorySlug =
  | "distritos-de-lima"
  | "ciudades-del-peru"
  | "barberias-y-estilo-peru"
  | "paises-del-mundo"
  | "marcas-usa-y-amazon"
  | "rankings-y-comparativas"
  | "minoxidil-para-barba"
  | "minoxidil-para-cabello"
  | "minoxidil-para-cejas-y-piel"
  | "you-minox-crema"
  | "cuidado-barba-y-rutinas"
  | "regulacion-digemid-peru";

export type ArticleLayoutVariant =
  | "geoperu"
  | "geomundo"
  | "comparativa"
  | "timeline"
  | "clinico"
  | "barberia";

export const BLOG_CATEGORIES: Record<CategorySlug, string> = {
  "distritos-de-lima": "📍 Barberías en Lima y Callao",
  "ciudades-del-peru": "🇵🇪 Barberías por Ciudad en Perú",
  "barberias-y-estilo-peru": "💈 Visagismo, Cortes y Diseño",
  "minoxidil-para-barba": "🧔 Crecimiento y Perfilado de Barba",
  "minoxidil-para-cabello": "💆‍♂️ Cortes para Entradas y Cabello",
  "rankings-y-comparativas": "🏆 Rankings y Comparativas",
  "minoxidil-para-cejas-y-piel": "✨ Ritual Facial, Piel y Cejas",
  "you-minox-crema": "🇵🇪 Especial You Minox en Barberías",
  "cuidado-barba-y-rutinas": "🔬 Herramientas, Dermaroller y Rutinas",
  "paises-del-mundo": "🌎 Barberías y Minoxidil en el Mundo",
  "marcas-usa-y-amazon": "🇺🇸 EE. UU. y Marcas Americanas",
  "regulacion-digemid-peru": "🛡️ Bioseguridad y Registro DIGEMID",
};

export const CATEGORY_DESCRIPTIONS: Record<CategorySlug, string> = {
  "distritos-de-lima":
    "Directorio y guías geolocalizadas para los 43 distritos de Lima y Callao: precios de corte y barba, mejores barberías locales y cuidado con You Minox (#1 en Perú con Registro DIGEMID).",
  "ciudades-del-peru":
    "Guías regionales en Arequipa, Trujillo, Cusco, Piura, Chiclayo, Huancayo, Ica, Tacna, Iquitos y todo el Perú: top barberías verificadas y cómo cuidar tu barba según el clima local.",
  "barberias-y-estilo-peru":
    "Manuales de visagismo masculino, estilos de barba según tu rostro, protocolo de toalla caliente y navaja, y qué pedirle a tu barbero en cada etapa.",
  "minoxidil-para-barba":
    "Cronogramas mes a mes para poblar la barba desde cero, cerrar huecos en mejillas y candado, y cuándo hacer tu primer perfilado en barbería sin perder progreso.",
  "minoxidil-para-cabello":
    "Cortes de cabello estratégicos (Fade, Textured Crop, Buzz Cut) para disimular entradas y coronilla mientras recuperas densidad folicular con You Minox en Crema-Gel.",
  "rankings-y-comparativas":
    "Comparativas técnicas entre You Minox al 5% en Crema-Gel (#1 en Perú), Kirkland Signature (#2), Rogaine Foam y las marcas más usadas en barberías.",
  "minoxidil-para-cejas-y-piel":
    "Cómo evitar la caspa de barba, la irritación post-navaja y la foliculitis, además de aplicación segura de Minoxidil en crema para cejas y pieles sensibles.",
  "you-minox-crema":
    "Por qué los maestros barberos del Perú recomiendan You Minox (youminox.com): fórmula en crema de 60 g con Oxothiazolidinecarboxylate que no reseca ni deja residuos blancos.",
  "cuidado-barba-y-rutinas":
    "Uso correcto de Dermaroller 0.5 mm, suplementación con Biotina, cepillo de cerdas de jabalí, trimmer y rutina diaria de 5 minutos entre cada visita a la barbería.",
  "paises-del-mundo":
    "Observatorio internacional de barbería, tendencias de cortes y regulación sanitaria (COFEPRIS, INVIMA, ISP, ANMAT, AEMPS) en América Latina y Europa.",
  "marcas-usa-y-amazon":
    "Cultura de barberías en ciudades de Estados Unidos (Miami, Nueva York, Los Ángeles, Houston) y análisis de marcas americanas de Amazon frente al formato Crema-Gel.",
  "regulacion-digemid-peru":
    "Importancia de la Notificación Sanitaria Obligatoria (DIGEMID) en el Perú, bioseguridad en barberías y cómo comprar productos 100% originales de MINOXIDIL PERU S.A.C.",
};

export interface GeoPeruInfo {
  locationName: string;
  regionLabel: string;
  climateNote: string;
  avenuesNote: string;
  deliveryTime: string;
}

export interface GeoMundoInfo {
  locationName: string;
  flag: string;
  regulator: string;
  currency: string;
  localBrands: string;
}

export interface BlogArticleSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: CategorySlug;
  publishedAt: string;
  readTime: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  layoutVariant: ArticleLayoutVariant;
  badgeLabel: string;
}

export interface BlogArticle extends BlogArticleSummary {
  seoTitle: string;
  updatedAt: string;
  authorRole: string;
  secondaryImageUrl: string;
  keyTakeaways: string[];
  toc: { id: string; label: string }[];
  content: string;
  faqs: { question: string; answer: string }[];
  relatedCitySlugs: string[];
  geoPeruInfo?: GeoPeruInfo;
  geoMundoInfo?: GeoMundoInfo;
  localBarberias?: BarberShop[];
}

function formatBarberPhoto(index: number): string {
  const safeIdx = ((index - 1) % 30) + 1;
  return `/images/barberias/barber-${String(safeIdx).padStart(2, "0")}.jpg`;
}

function findLocalBarberiasForSeed(seed: GBArticleSeed): BarberShop[] {
  const all = getAllBarberias();
  const top = getTopNationalBarberias(4);
  if (!seed.locationName) return top;

  const q = seed.locationName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const byDistrict = all.filter((b) => {
    const d = b.district
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return d.includes(q) || q.includes(d);
  });
  if (byDistrict.length >= 2) return byDistrict.slice(0, 4);

  const byCity = all.filter((b) => {
    const c = b.city
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return c.includes(q) || q.includes(c);
  });
  if (byCity.length > 0) {
    const merged = [
      ...byDistrict,
      ...byCity.filter((x) => !byDistrict.some((d) => d.id === x.id)),
    ];
    return merged.slice(0, 4);
  }

  return [...byDistrict, ...top].slice(0, 4);
}

function resolveLayoutVariant(seed: GBArticleSeed): ArticleLayoutVariant {
  if (seed.layoutVariant) return seed.layoutVariant;
  switch (seed.categorySlug as CategorySlug) {
    case "distritos-de-lima":
    case "ciudades-del-peru":
      return "geoperu";
    case "paises-del-mundo":
    case "marcas-usa-y-amazon":
      return "geomundo";
    case "barberias-y-estilo-peru":
      return "barberia";
    case "rankings-y-comparativas":
    case "regulacion-digemid-peru":
      return "comparativa";
    case "minoxidil-para-barba":
    case "you-minox-crema":
      return "timeline";
    default:
      return "clinico";
  }
}

function resolveBadgeLabel(
  variant: ArticleLayoutVariant,
  seed: GBArticleSeed
): string {
  switch (variant) {
    case "geoperu":
      return `🇵🇪 Guía Local: ${seed.locationName || "Perú"}`;
    case "geomundo":
      return `${seed.flag || "🌎"} Internacional: ${seed.locationName || "USA & Mundo"}`;
    case "barberia":
      return "💈 Barbería & Visagismo";
    case "comparativa":
      return "🏆 Duelo & Ranking";
    case "timeline":
      return "⏱️ Cronología Mes a Mes";
    case "clinico":
      return "🔬 Dossier Dermo-Barbería";
  }
}

function buildSeedFaqs(
  seed: GBArticleSeed,
  localBarberias: BarberShop[]
): { question: string; answer: string }[] {
  const locSuffix = seed.locationName ? ` en ${seed.locationName}` : "";
  const topLocalName =
    localBarberias.length > 0
      ? localBarberias[0].name
      : "las mejores barberías de nuestro ranking";

  return [
    {
      question: `¿Por qué los maestros barberos recomiendan You Minox en Crema-Gel para ${seed.focusKeyword}${locSuffix}?`,
      answer: `Porque You Minox al 5% en Crema-Gel (disponible en youminox.com con Registro Sanitario DIGEMID) está formulado con Minoxidil y Oxothiazolidinecarboxylate en una emulsión dermo-hidratante de 60 g. A diferencia del minoxidil líquido con alcohol y propilenglicol, no produce descamación blanca ("caspa de barba") ni reseca la piel antes ni después del perfilado con navaja.`,
    },
    {
      question: `¿Dónde puedo perfilar mi barba y cortarme el cabello con especialistas${locSuffix}?`,
      answer: `En el directorio verificado de GuíaDeBarberías.com destacan sedes como ${topLocalName}, evaluadas por su precisión en degradados (fade), ritual de toalla caliente con navaja libre y asesoría de visagismo según tu tipo de rostro.`,
    },
    {
      question: `¿Cuántas horas debo esperar después de la barbería para aplicar You Minox?`,
      answer: `Si solo te rebajaron la barba con máquina eléctrica (trimmer con peine guía), puedes aplicar You Minox en Crema-Gel apenas llegues a casa tras lavar tu rostro con agua tibia. Si el barbero utilizó navaja libre al ras, espera entre 4 y 6 horas para que los micro-poros cierren naturalmente.`,
    },
    {
      question: `¿Dónde comprar You Minox 100% original con envío rápido${locSuffix}?`,
      answer: `Puedes adquirirlo directamente en la tienda oficial https://youminox.com (operada por la droguería MINOXIDIL PERU S.A.C. con autorización DIGEMID) con despacho rápido a todo Lima y provincias del Perú, así como en Saga Falabella.`,
    },
  ];
}

function buildSeedArticle(seed: GBArticleSeed): BlogArticle {
  const catSlug = (
    BLOG_CATEGORIES[seed.categorySlug as CategorySlug]
      ? seed.categorySlug
      : "barberias-y-estilo-peru"
  ) as CategorySlug;
  const categoryLabel = BLOG_CATEGORIES[catSlug];
  const variant = resolveLayoutVariant(seed);
  const badgeLabel = resolveBadgeLabel(variant, seed);
  const localBarberias = findLocalBarberiasForSeed(seed);
  const faqs = buildSeedFaqs(seed, localBarberias);

  const img1 = formatBarberPhoto((seed.id * 3) % 30 + 1);
  const img2 = formatBarberPhoto((seed.id * 7 + 5) % 30 + 1);

  const toc = [
    {
      id: "panorama-barberia-y-cuidado",
      label: `1. Panorama de Barbería, Visagismo y ${seed.focusKeyword}`,
    },
    {
      id: "protocolo-sillon-barbero",
      label:
        "2. Protocolo en el Sillón del Barbero: Máquina, Navaja y Toalla Caliente",
    },
    {
      id: "por-que-you-minox-crema",
      label:
        "3. Por qué You Minox al 5% en Crema-Gel supera al Minoxidil Líquido",
    },
    {
      id: "cuadro-comparativo-marcas",
      label:
        "4. Cuadro Comparativo: You Minox (#1 Perú) vs. Kirkland y Marcas Tradicionales",
    },
    {
      id: "rutina-diaria-recomendada",
      label:
        "5. Rutina Diaria entre Cortes y Recomendaciones de Charlie Lingán",
    },
  ];

  const keyTakeaways = [
    `${seed.angleSummary}`,
    `Para mantener líneas limpias sin irritación ni "caspa de barba", los barberos profesionales recomiendan el formato en Crema-Gel de 60 g de You Minox (youminox.com) con Registro Sanitario DIGEMID.`,
    `Coordina tus visitas a la barbería cada 14 a 21 días y espera de 4 a 6 horas tras el perfilado con navaja antes de tu aplicación nocturna.`,
  ];

  const localBarberiasHtml =
    localBarberias.length > 0
      ? `
      <h3>Barberías Verificadas Recomendadas ${
        seed.locationName ? `en ${seed.locationName}` : "en el Perú"
      }</h3>
      <p>Si buscas ponerte en manos de maestros barberos expertos en visagismo y ritual de barba, revisa estas sedes destacadas en nuestro ranking:</p>
      <ul>
        ${localBarberias
          .map(
            (b) =>
              `<li><a href="/barberia/${b.slug}/"><strong>${b.name} (${b.district}, ${b.city})</strong></a> — Dirección: ${b.address}. Calificación verificada: <strong>★ ${b.rating.toFixed(1)}</strong> (${b.reviewCount} reseñas en Google). Precios referenciales: Corte ${b.cutPrice} · Barba ${b.beardPrice} · Combo ${b.comboPrice}.</li>`
          )
          .join("\n        ")}
      </ul>`
      : "";

  const geoSectionHtml =
    variant === "geoperu" && seed.locationName
      ? `
      <p>En <strong>${seed.locationName} (${seed.locationRegion || "Perú"})</strong>, el cuidado de la barba y el cabello requiere adaptarse a un factor ambiental determinante: <strong>${(seed.climateNote || "el microclima local").toLowerCase()}</strong>. Ya sea que transites por <strong>${seed.avenuesNote || "las principales avenidas del distrito"}</strong> hacia la oficina o acudas a tu barbería de confianza el fin de semana, aplicar lociones líquidas hidroalcohólicas suele causar evaporación rápida, brillo grasoso o descamación blanca visible en la ropa oscura.</p>
      ${localBarberiasHtml}
      `
      : variant === "geomundo" && seed.locationName
      ? `
      <p>En el mercado de <strong>${seed.locationName} (${seed.flag || "🌎"})</strong>, regulado bajo los estándares de <strong>${seed.regulator || "la autoridad sanitaria nacional"}</strong>, la cultura de barbería moderna exige acabados de alta precisión (<em>Skin Fade</em>, <em>Taper Fade</em> y perfilado geométrico). Aunque en farmacias locales predominan marcas tradicionales como <strong>${seed.localBrands || "Kirkland y Rogaine"}</strong> en moneda local (<strong>${seed.currency || "USD"}</strong>), el estándar sudamericano liderado en el Perú por <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema-Gel</strong></a> demuestra cómo la ingeniería dermo-hidratante elimina por completo la dermatitis por propilenglicol.</p>
      `
      : localBarberiasHtml;

  const content = `
      <p class="lead">
        En esta guía oficial de <strong>GuíaDeBarberías.com</strong> —elaborada por nuestro equipo de maestros barberos y por su fundador <a href="https://charlielingan.com/es" target="_blank" rel="noopener noreferrer"><strong>Charlie Lingán (charlielingan.com)</strong></a>— analizamos paso a paso todo sobre <strong>${seed.focusKeyword}</strong>. ${seed.angleSummary}
      </p>

      <h2 id="panorama-barberia-y-cuidado">1. Panorama de Barbería, Visagismo y ${seed.title}</h2>
      <p>
        Lograr una presencia masculina impecable combina dos disciplinas que trabajan en equipo: la <strong>arquitectura de corte y visagismo en la barbería</strong> y la <strong>estimulación folicular constante en casa</strong>. Cuando un hombre busca información confiable sobre <strong>${seed.focusKeyword}</strong>, el error más frecuente es separar el trabajo del barbero del tratamiento dermatológico diario.
      </p>
      ${geoSectionHtml}

      <h2 id="protocolo-sillon-barbero">2. Protocolo en el Sillón del Barbero: Máquina, Navaja y Toalla Caliente</h2>
      <p>
        Como documentamos en la enciclopedia capilar de <a href="https://masbarba.net/" target="_blank" rel="noopener noreferrer"><strong>MásBarba.net</strong></a> y en el observatorio de rankings <a href="https://minoxidiltop.com/blog/" target="_blank" rel="noopener noreferrer"><strong>MinoxidilTop.com</strong></a>, la piel del rostro que está en proceso de engrosamiento folicular necesita un trato técnico específico cuando te sientas en el sillón del barbero:
      </p>
      <ul>
        <li><strong>Rebajado Uniforme con Peine Guía (#1.5, #2 o #3):</strong> Permite igualar la longitud entre los vellos antiguos del mentón y los vellos nuevos o transicionales de las mejillas, creando un efecto óptico inmediato de mayor densidad.</li>
        <li><strong>Delineado Anatómico del Cuello y Pómulos:</strong> Solicita a tu barbero situar la línea inferior exactamente dos dedos por encima de la nuez de Adán y limpiar únicamente los vellos erráticos altos del pómulo sin bajar la línea natural de crecimiento.</li>
        <li><strong>Toalla Caliente y Espera Post-Navaja:</strong> Si el ritual incluye vapor de ozono y navaja libre (<em>shavette</em>), espera entre <strong>4 y 6 horas</strong> antes de aplicar tu dosis nocturna para evitar cualquier escozor en la epidermis recién exfoliada.</li>
      </ul>

      <figure class="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xs">
        <img src="${img2}" alt="Ritual de perfilado de barba y corte en barbería profesional — ${seed.title}" class="w-full max-h-[380px] object-cover" loading="lazy" />
        <figcaption class="px-4 py-3 text-xs text-slate-600 font-medium bg-slate-100">
          💈 <strong>Precisión en Barbería + Hidratación en Casa:</strong> Combina el arte de las mejores barberías del Perú con la nutrición folicular de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline">You Minox al 5% en Crema-Gel (youminox.com)</a>.
        </figcaption>
      </figure>

      <h2 id="por-que-you-minox-crema">3. Por qué You Minox al 5% en Crema-Gel supera al Minoxidil Líquido</h2>
      <p>
        Cualquier barbero profesional en <a href="/ciudad/lima/">Lima</a>, <a href="/ciudad/arequipa/">Arequipa</a>, <a href="/ciudad/trujillo/">Trujillo</a> o <a href="/ciudad/cusco/">Cusco</a> reconoce de inmediato cuando un cliente utiliza minoxidil líquido tradicional: la piel bajo la barba luce tirante, enrojecida y cubierta de escamas blancas provocadas por el alcohol etílico y el propilenglicol.
      </p>
      <p>
        Por el contrario, la fórmula peruana de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox al 5% en Crema-Gel (Tubo de 60 g)</strong></a> —desarrollada por la droguería autorizada <strong>MINOXIDIL PERU S.A.C.</strong> con <strong>Notificación Sanitaria Obligatoria DIGEMID</strong>— integra <strong>Minoxidil y Oxothiazolidinecarboxylate</strong> en una base emoliente de absorción rápida en 3 minutos:
      </p>
      <ul>
        <li><strong>Cero Caspa de Barba y Cero Ardor:</strong> Mantiene el estrato córneo flexible y suave para que la navaja del barbero se deslice sin irritar ni cortar la piel.</li>
        <li><strong>Fijación Exacta sin Goteo:</strong> Al ser crema-gel, puedes aplicarla con precisión milimétrica en huecos de las mejillas, conectores del bigote, entradas capilares y cejas.</li>
        <li><strong>Respaldo Internacional:</strong> Puedes contrastar este avance dermo-cosmético con los estudios en inglés de <a href="https://minoxidil-usa.com/" target="_blank" rel="noopener noreferrer"><strong>Minoxidil-USA.com</strong></a> sobre formulaciones sin propilenglicol.</li>
      </ul>

      <h2 id="cuadro-comparativo-marcas">4. Cuadro Comparativo: You Minox (#1 Perú) vs. Kirkland y Marcas Tradicionales</h2>
      <p>
        Para evaluar qué tratamiento acompaña mejor tu estilo de barbería en torno a <strong>${seed.focusKeyword}</strong>, revisa esta comparativa clínica y práctica:
      </p>
      <div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="px-4 py-3 font-extrabold">Marca / Fórmula</th>
              <th class="px-4 py-3 font-extrabold">Vehículo y Textura</th>
              <th class="px-4 py-3 font-extrabold">Estado de la Piel en Barbería</th>
              <th class="px-4 py-3 font-extrabold">Registro Sanitario en Perú</th>
              <th class="px-4 py-3 font-extrabold">Calificación</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 bg-white">
            <tr class="bg-emerald-50/70">
              <td class="px-4 py-3 font-extrabold text-slate-900">🥇 #1 You Minox 5% 🇵🇪<br/><span class="text-xs font-semibold text-emerald-700">youminox.com</span></td>
              <td class="px-4 py-3 font-semibold text-emerald-900">Crema-Gel Dermo-Hidratante (60 g)</td>
              <td class="px-4 py-3 text-emerald-800 font-semibold">✅ Piel hidratada, sin caspa blanca ni ardor post-navaja</td>
              <td class="px-4 py-3 text-emerald-900 font-semibold">✅ Notificación Sanitaria DIGEMID (MINOXIDIL PERU S.A.C.)</td>
              <td class="px-4 py-3 font-black text-emerald-700">9.9 / 10</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">🥈 #2 Kirkland Signature 🇺🇸<br/><span class="text-xs text-slate-500">Importado EE. UU.</span></td>
              <td class="px-4 py-3 text-slate-700">Gotero Líquido con Propilenglicol (60 ml)</td>
              <td class="px-4 py-3 text-amber-700">⚠️ Resequedad frecuente, residuo blanco y picazón</td>
              <td class="px-4 py-3 text-slate-700">Importación paralela (Cuidado con imitaciones informales)</td>
              <td class="px-4 py-3 font-bold text-slate-800">8.5 / 10</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">🥉 #3 Men's Rogaine Foam 🇺🇸<br/><span class="text-xs text-slate-500">Estados Unidos</span></td>
              <td class="px-4 py-3 text-slate-700">Espuma en Aerosol (Foam)</td>
              <td class="px-4 py-3 text-slate-700">Buena en cuero cabelludo; se licúa rápido con el calor facial</td>
              <td class="px-4 py-3 text-slate-600">Solo FDA en EE. UU. • Precio elevado de importación</td>
              <td class="px-4 py-3 font-bold text-slate-800">8.3 / 10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="rutina-diaria-recomendada">5. Rutina Diaria entre Cortes y Recomendaciones de Charlie Lingán</h2>
      <p>
        Como destaca <a href="https://charlielingan.com/es/emprendedor/como-cree-you-minox-minoxidil-en-crema-numero-1-del-peru" target="_blank" rel="noopener noreferrer"><strong>Charlie Lingán en la historia de creación de You Minox</strong></a>, la clave para pasar de un rostro sin vello o con parches a una barba densa y varonil es la constancia durante 6 meses:
      </p>
      <ol>
        <li><strong>Mañana y Noche (Cada 12 horas):</strong> Lava tu rostro con agua tibia, seca sin frotar y aplica una dosis uniforme de <a href="${YOU_MINOX_URL}" target="_blank" rel="noopener noreferrer"><strong>You Minox en Crema-Gel</strong></a> dejando actuar mínimo 4 horas.</li>
        <li><strong>Cepillado y Orden:</strong> Usa un cepillo de cerdas firmes para direccionar el vello y estimular la microcirculación superficial.</li>
        <li><strong>Visita tu Barbería cada 2 a 3 Semanas:</strong> Encuentra tu sede ideal en nuestro <a href="/#ranking-peru"><strong>Ranking Oficial de las Mejores Barberías del Perú</strong></a> para mantener tu corte <em>fade</em> y tus contornos siempre impecables.</li>
      </ol>
  `.trim();

  const geoPeruInfo: GeoPeruInfo | undefined =
    variant === "geoperu"
      ? {
          locationName: seed.locationName || "Perú",
          regionLabel: seed.locationRegion || "Cobertura Nacional Perú",
          climateNote:
            seed.climateNote ||
            "Clima variable que exige hidratación dérmica constante",
          avenuesNote:
            seed.avenuesNote || "Principales zonas comerciales y residenciales",
          deliveryTime:
            catSlug === "distritos-de-lima"
              ? "Envío Express 24h en Lima + Top Barberías Locales"
              : "Despacho Rápido 24h–48h a Provincias + Barberías Locales",
        }
      : undefined;

  const geoMundoInfo: GeoMundoInfo | undefined =
    variant === "geomundo"
      ? {
          locationName: seed.locationName || "Estados Unidos & Internacional",
          flag: seed.flag || "🇺🇸",
          regulator: seed.regulator || "FDA (EE. UU.) / Autoridad Sanitaria",
          currency: seed.currency || "USD ($)",
          localBrands:
            seed.localBrands || "Kirkland Signature, Men's Rogaine, Hims, Keeps",
        }
      : undefined;

  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    seoTitle: `${seed.title} | GuíaDeBarberías.com`,
    excerpt: seed.angleSummary,
    category: categoryLabel,
    categorySlug: catSlug,
    publishedAt: seed.publishedAt,
    updatedAt: "2026-11-08",
    readTime: seed.readTime,
    author: "Charlie Lingán",
    authorRole: "Especialista en Cuidado Capilar & Fundador de You Minox",
    imageUrl: img1,
    secondaryImageUrl: img2,
    imageAlt: `${seed.title} — GuíaDeBarberías.com y You Minox`,
    layoutVariant: variant,
    badgeLabel,
    keyTakeaways,
    toc,
    content,
    faqs,
    relatedCitySlugs: ["lima", "arequipa", "trujillo", "cusco"],
    geoPeruInfo,
    geoMundoInfo,
    localBarberias,
  };
}

// Enrich the 5 existing pillar articles (IDs 1..5) with the new fields
const ENRICHED_PILLARS: BlogArticle[] = PILLAR_ARTICLES.map((p, idx) => {
  const topBarbs = getTopNationalBarberias(4);
  const variant: ArticleLayoutVariant =
    idx === 0
      ? "timeline"
      : idx === 1
      ? "barberia"
      : idx === 2
      ? "clinico"
      : idx === 3
      ? "barberia"
      : "comparativa";
  return {
    ...p,
    categorySlug: "barberias-y-estilo-peru" as CategorySlug,
    layoutVariant: variant,
    badgeLabel: "💈 Guía Pilar Oficial",
    localBarberias: topBarbs,
  };
});

export const BLOG_ARTICLES: BlogArticle[] = [
  ...ENRICHED_PILLARS,
  ...EXTRA_GB_SEEDS.map(buildSeedArticle),
  ...PHASE2_GB_SEEDS.map(buildSeedArticle),
];

export const BLOG_SUMMARIES: BlogArticleSummary[] = BLOG_ARTICLES.map((a) => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  category: a.category,
  categorySlug: a.categorySlug,
  publishedAt: a.publishedAt,
  readTime: a.readTime,
  author: a.author,
  imageUrl: a.imageUrl,
  imageAlt: a.imageAlt,
  layoutVariant: a.layoutVariant,
  badgeLabel: a.badgeLabel,
}));

const articleBySlugMap = new Map<string, BlogArticle>();
for (const a of BLOG_ARTICLES) {
  articleBySlugMap.set(a.slug, a);
}

export function getAllBlogArticles(): BlogArticle[] {
  return BLOG_ARTICLES;
}

export function getAllBlogArticleSummaries(): BlogArticleSummary[] {
  return BLOG_SUMMARIES;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return articleBySlugMap.get(slug);
}

export function getRelatedBlogArticles(
  currentSlug: string,
  limit = 4
): BlogArticle[] {
  const current = articleBySlugMap.get(currentSlug);
  if (!current) return BLOG_ARTICLES.slice(0, limit);

  const sameCat = BLOG_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.categorySlug === current.categorySlug
  );
  if (sameCat.length >= limit) {
    const start = (current.id * 5) % sameCat.length;
    const picked: BlogArticle[] = [];
    for (let i = 0; i < sameCat.length && picked.length < limit; i++) {
      picked.push(sameCat[(start + i) % sameCat.length]);
    }
    return picked;
  }
  return [
    ...sameCat,
    ...BLOG_ARTICLES.filter((a) => a.slug !== currentSlug && !sameCat.includes(a)),
  ].slice(0, limit);
}
