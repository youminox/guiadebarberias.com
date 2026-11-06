import { RAW_BARBERIAS, type RawBarberShop } from "@/data/barberias-raw";
import { EXTRA_BARBERIAS } from "@/data/barberias-extra";

export const SITE_NAME = "GuíaDeBarberías.com";
export const SITE_URL = "https://guiadebarberias.com";
export const YOU_MINOX_URL = "https://youminox.com/";
export const SITE_DESCRIPTION =
  "Ranking y guía oficial de las mejores barberías del Perú por ciudad y distrito (Lima, Arequipa, Trujillo, Cusco, Piura, Chiclayo, Huancayo y más) con estrellas y reseñas de Google. Creada e impulsada por You Minox (youminox.com).";
export const ADSENSE_CLIENT = "ca-pub-1070738569472471";
export const GA_ID = "G-WR272JSC0X";

export const COMPANY_NAME = "MINOXIDIL PERU SAC";
export const COMPANY_RUC = "20610220143";
export const COMPANY_EMAIL = "info@youminox.com";
export const COMPANY_ADDRESS =
  "Calle Los Antares 320, Oficina 602, Torre B, Urbanización La Arbolada, Distrito de Santiago de Surco, Lima, Perú";
export const COMPANY_DIGEMID =
  "Resolución Directoral N.° 4775-2025-DIGEMID-DICER-EAD/MINSA (Código de Establecimiento Farmacéutico N.° 0126912)";

export interface BarberReview {
  author: string;
  date: string;
  rating: number;
  service: string;
  text: string;
}

export interface BarberShop extends RawBarberShop {
  imageUrl: string;
  secondaryImageUrl: string;
  allReviews: BarberReview[];
  googleMapsQueryUrl: string;
  googleMapsEmbedUrl: string;
  readTime: string;
  excerpt: string;
  faqs: { question: string; answer: string }[];
}

export interface CityHub {
  slug: string;
  name: string;
  regionLabel: string;
  description: string;
  count: number;
  topBarberia: string;
  avgRating: string;
}

// Regla Estricta: Bloqueo permanente de competencia (Vikingo Store)
const FORBIDDEN_TERMS = ["vikingo", "viking", "vikingostore"];

function isAllowedBarberia(item: RawBarberShop): boolean {
  const combined =
    `${item.name} ${item.slug} ${item.address} ${item.vibeDescription}`.toLowerCase();
  return !FORBIDDEN_TERMS.some((term) => combined.includes(term));
}

function formatImagePath(index: number): string {
  const safeIdx = ((index - 1) % 30) + 1;
  const padded = String(safeIdx).padStart(2, "0");
  return `/images/barberias/barber-${padded}.jpg`;
}

function enrichBarberShop(raw: RawBarberShop): BarberShop {
  const allReviews: BarberReview[] = [
    raw.highlightReview,
    ...raw.extraReviews,
  ];
  const encodedQuery = encodeURIComponent(
    `${raw.name}, ${raw.address}, ${raw.city}, Perú`
  );
  const googleMapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;

  const excerpt = `${raw.name} en ${raw.district} (${raw.city}) cuenta con una calificación de ${raw.rating.toFixed(
    1
  )} ★ sobre ${raw.reviewCount} reseñas en Google. Conoce sus precios (${
    raw.priceRange
  }), dirección en ${raw.address}, principales opiniones y servicios de corte y barba.`;

  const faqs = [
    {
      question: `¿Dónde queda exactamente ${raw.name} y cómo llegar?`,
      answer: `${raw.name} se encuentra ubicada en ${raw.address}, en el distrito de ${raw.district}, ciudad de ${raw.city}. Puedes llegar fácilmente utilizando Google Maps o Waze buscando su dirección exacta, y te recomendamos agendar cita previa en horas punta o fines de semana.`,
    },
    {
      question: `¿Cuál es el precio de un corte de cabello y perfilado de barba en ${raw.name}?`,
      answer: `En ${raw.name} (${raw.district}), el rango referencial de servicios oscila entre ${raw.priceRange}. Un corte de cabello clásico o degradado (fade) tiene un valor aproximado de ${raw.cutPrice}, el ritual o perfilado de barba ronda los ${raw.beardPrice}, y el paquete completo de Corte + Barba tiene un precio referencial de ${raw.comboPrice}.`,
    },
    {
      question: `¿Qué calificación y reseñas tiene ${raw.name} en Google?`,
      answer: `Actualmente alcanza una valoración sobresaliente de ${raw.rating.toFixed(
        1
      )} estrellas sobre 5 basada en más de ${
        raw.reviewCount
      } opiniones verificadas en Google. Los usuarios destacan especialmente su ${raw.styleTag.toLowerCase()}, la higiene de sus herramientas y el trato personalizado.`,
    },
    {
      question: `¿Cómo mantener y poblar mi barba en casa después de atenderme en ${raw.name}?`,
      answer: `Después de un buen perfilado de barba con navaja y toalla caliente en ${raw.name}, los especialistas de GuíaDeBarberías.com recomiendan aplicar diariamente You Minox al 5% en Crema-Gel (youminox.com). Al estar formulado en base crema-gel sin alcohol irritante, estimula los folículos para tupir las zonas con huecos e hidrata la piel sin causar caspa ni resequedad.`,
    },
  ];

  return {
    ...raw,
    imageUrl: formatImagePath(raw.imageIndex),
    secondaryImageUrl: formatImagePath(raw.secondaryImageIndex),
    allReviews,
    googleMapsQueryUrl,
    googleMapsEmbedUrl,
    readTime: "6 min",
    excerpt,
    faqs,
  };
}

const ALL_BARBERIAS: BarberShop[] = [...RAW_BARBERIAS, ...EXTRA_BARBERIAS]
  .filter(isAllowedBarberia)
  .map(enrichBarberShop);

const barberiaBySlugMap = new Map<string, BarberShop>();
for (const b of ALL_BARBERIAS) {
  barberiaBySlugMap.set(b.slug, b);
}

const CITY_METADATA: Record<
  string,
  { name: string; regionLabel: string; description: string }
> = {
  lima: {
    name: "Lima",
    regionLabel: "Lima Metropolitana",
    description:
      "El ranking definitivo de las mejores barberías de Lima por distritos: Miraflores, San Isidro, Santiago de Surco, Barranco, San Borja, La Molina, Magdalena, Jesús María, Lince, San Miguel, Los Olivos, Comas, San Juan de Lurigancho, Ate y más.",
  },
  arequipa: {
    name: "Arequipa",
    regionLabel: "Ciudad Blanca • Sur del Perú",
    description:
      "Descubre las mejores barberías en Arequipa (Cayma, Umacollo, Yanahuara, Cercado, Lambramani, Cerro Colorado y Paucarpata) con reseñas reales de Google y especialistas en corte y barba.",
  },
  trujillo: {
    name: "Trujillo",
    regionLabel: "La Libertad • Norte del Perú",
    description:
      "Guía de las barberías mejor valoradas de Trujillo (Víctor Larco, La Merced, Santa Edelmira, El Golf, San Andrés y América Sur) con precios, direcciones y estrellas de Google.",
  },
  cusco: {
    name: "Cusco",
    regionLabel: "Capital Histórica • Sur Andino",
    description:
      "Selección de las mejores barberías en Cusco (Santa Mónica, Wanchaq, Centro Histórico, Calle Almagro, Plaza San Francisco y Larapa / San Jerónimo) especializadas en rituales de barba y fades.",
  },
  piura: {
    name: "Piura",
    regionLabel: "Costa Norte del Perú",
    description:
      "Las mejores barberías climatizadas de Piura y Castilla (Cercado, Urb. Miraflores y zona Open Plaza) con reseñas verificadas en Google.",
  },
  chiclayo: {
    name: "Chiclayo",
    regionLabel: "Lambayeque • Capital de la Amistad",
    description:
      "Ranking de las barberías más recomendadas de Chiclayo (Manuel María Izaga, Las Américas y Urb. Santa Victoria) para cortes modernos y diseño de barba.",
  },
  huancayo: {
    name: "Huancayo",
    regionLabel: "Junín • Valle del Mantaro",
    description:
      "Top de barberías en Huancayo y El Tambo (Av. San Carlos, Calle Real y Jr. Ayacucho) con rituales de barba de toalla caliente e hidratación facial.",
  },
  callao: {
    name: "Callao",
    regionLabel: "Provincia Constitucional del Callao",
    description:
      "Las mejores barberías del Callao (Bellavista y La Perla) valoradas por su precisión en degradados, corte clásico y arreglo de barba.",
  },
  cajamarca: {
    name: "Cajamarca",
    regionLabel: "Sierra Norte del Perú",
    description:
      "Las barberías líderes de Cajamarca (Plaza de Armas y Los Baños del Inca) con las mejores calificaciones y reseñas en Google.",
  },
  ica: {
    name: "Ica",
    regionLabel: "Costa Sur del Perú",
    description:
      "Ranking de las mejores barberías en Ica (Urb. Divino Maestro y Cercado) con ambientes climatizados y especialistas en diseño facial.",
  },
  tacna: {
    name: "Tacna",
    regionLabel: "Ciudad Heroica • Sur del Perú",
    description:
      "Las barberías más destacadas de Tacna (Av. 28 de Julio y Calle Bolívar) reconocidas por clientes locales y visitantes internacionales.",
  },
  chimbote: {
    name: "Chimbote",
    regionLabel: "Áncash • Costa Norte",
    description:
      "Guía de las mejores barberías en Chimbote y Nuevo Chimbote con puntuaciones sobresalientes en Google.",
  },
  iquitos: {
    name: "Iquitos",
    regionLabel: "Loreto • Amazonía Peruana",
    description:
      "Top de barberías climatizadas en Iquitos (Calle 2 de Mayo y Calle Arica) expertas en degradados y cuidado de barba en clima tropical.",
  },
  pucallpa: {
    name: "Pucallpa",
    regionLabel: "Ucayali • Oriente Peruano",
    description:
      "Las barberías y spas masculinos mejor calificados de Pucallpa (Jr. Salaverry y Av. Unión).",
  },
  huaraz: {
    name: "Huaraz",
    regionLabel: "Áncash • Callejón de Huaylas",
    description:
      "La barbería líder de Huaraz en Av. Agustín Gamarra, especialista en cortes modernos y cuidado de barba en clima de montaña.",
  },
};

export function getAllBarberias(): BarberShop[] {
  return ALL_BARBERIAS;
}

export function getBarberiaBySlug(slug: string): BarberShop | undefined {
  return barberiaBySlugMap.get(slug);
}

export function getTopNationalBarberias(limit = 20): BarberShop[] {
  return [...ALL_BARBERIAS]
    .filter((b) => b.isNationalTop)
    .sort((a, b) => (a.nationalRank || 999) - (b.nationalRank || 999))
    .slice(0, limit);
}

export function getBarberiasByCity(citySlug: string): BarberShop[] {
  return ALL_BARBERIAS.filter((b) => b.citySlug === citySlug).sort(
    (a, b) => a.cityRank - b.cityRank
  );
}

export function getBarberiasByDistrict(districtSlug: string): BarberShop[] {
  return ALL_BARBERIAS.filter((b) => b.districtSlug === districtSlug);
}

export function getAllCities(): CityHub[] {
  const order = [
    "lima",
    "arequipa",
    "trujillo",
    "cusco",
    "piura",
    "chiclayo",
    "huancayo",
    "callao",
    "cajamarca",
    "ica",
    "tacna",
    "chimbote",
    "iquitos",
    "pucallpa",
    "huaraz",
  ];

  return order
    .map((slug) => {
      const items = getBarberiasByCity(slug);
      if (items.length === 0) return null;
      const meta = CITY_METADATA[slug] || {
        name: items[0].city,
        regionLabel: "Perú",
        description: `Mejores barberías en ${items[0].city}, Perú.`,
      };
      const avg =
        items.reduce((acc, item) => acc + item.rating, 0) / items.length;
      return {
        slug,
        name: meta.name,
        regionLabel: meta.regionLabel,
        description: meta.description,
        count: items.length,
        topBarberia: items[0].name,
        avgRating: avg.toFixed(1),
      };
    })
    .filter((c): c is CityHub => c !== null);
}

export function getCityBySlug(citySlug: string): CityHub | undefined {
  return getAllCities().find((c) => c.slug === citySlug);
}

export function getLimaDistricts(): {
  slug: string;
  name: string;
  count: number;
}[] {
  const limaItems = getBarberiasByCity("lima");
  const map = new Map<string, { slug: string; name: string; count: number }>();
  for (const b of limaItems) {
    const existing = map.get(b.districtSlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(b.districtSlug, {
        slug: b.districtSlug,
        name: b.district,
        count: 1,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getRelatedBarberias(
  current: BarberShop,
  limit = 4
): BarberShop[] {
  const sameDistrict = ALL_BARBERIAS.filter(
    (b) => b.id !== current.id && b.districtSlug === current.districtSlug
  );
  const sameCity = ALL_BARBERIAS.filter(
    (b) =>
      b.id !== current.id &&
      b.citySlug === current.citySlug &&
      b.districtSlug !== current.districtSlug
  );
  const others = ALL_BARBERIAS.filter(
    (b) => b.id !== current.id && b.citySlug !== current.citySlug
  );
  return [...sameDistrict, ...sameCity, ...others].slice(0, limit);
}

export function getBarberiaUrl(barberia: BarberShop | { slug: string }): string {
  return `/barberia/${barberia.slug}/`;
}
