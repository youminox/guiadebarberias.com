import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

/**
 * guiadebarberias-chat — Asesor IA de barberías para https://guiadebarberias.com
 * - mode "config" (GET): estado público del chat (activado + mensaje de bienvenida)
 * - mode "track_click": registra clics en tarjetas (ficha / mapa / llamar / whatsapp / instagram)
 * - mode "chat": búsqueda previa en gdb_barberias (tool calling) + respuesta del modelo elegido en el admin
 * Todas las tablas gdb_* están cerradas por RLS: solo esta función (service role) las usa.
 */

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://guiadebarberias.com";
const ALLOWED_ORIGINS = [
  "https://guiadebarberias.com",
  "https://www.guiadebarberias.com",
  "http://localhost:3000",
  "http://localhost:3199",
];
const CLICK_TYPES = ["ficha", "mapa", "llamar", "whatsapp", "instagram", "link"];
const MAX_MESSAGE_CHARS = 600;

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    Vary: "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

function calculateCostUsd(model: string, promptTokens: number, completionTokens: number): number {
  if (model.includes("mini")) {
    return Number((promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6));
  }
  return Number((promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6));
}

// ---------------------------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------------------------
interface Barberia {
  slug: string;
  name: string;
  city: string;
  city_slug: string;
  district: string;
  district_slug: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  rating: number | null;
  review_count: number | null;
  price_range: string | null;
  cut_price_pen: number | null;
  beard_price_pen: number | null;
  combo_price_pen: number | null;
  schedule: string | null;
  phone: string | null;
  instagram: string | null;
  badge: string | null;
  style_tag: string | null;
  image_url: string | null;
  page_url: string | null;
  maps_url: string | null;
  highlight_review: string | null;
  city_rank: number | null;
  is_national_top: boolean | null;
}

let catalogCache: { at: number; rows: Barberia[] } | null = null;

async function loadCatalog(): Promise<Barberia[]> {
  if (catalogCache && Date.now() - catalogCache.at < 5 * 60 * 1000) return catalogCache.rows;
  const { data, error } = await supabase.from("gdb_barberias").select("*").eq("active", true);
  if (error) throw new Error("catalog: " + error.message);
  catalogCache = { at: Date.now(), rows: (data || []) as Barberia[] };
  return catalogCache.rows;
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ---------------------------------------------------------------------------------------------
// Opening hours ("Lun a Sáb: 10:00 am – 8:30 pm | Dom: Cerrado") evaluated in Lima time
// ---------------------------------------------------------------------------------------------
const DAY_INDEX: Record<string, number> = { dom: 0, lun: 1, mar: 2, mie: 3, jue: 4, vie: 5, sab: 6 };
const DAY_LABEL = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

interface DayHours { open: number; close: number }

function parseTime(t: string): number | null {
  const m = t.trim().toLowerCase().match(/(\d{1,2}):(\d{2})\s*(am|pm)/);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3] === "pm") h += 12;
  return h * 60 + Number(m[2]);
}

function fmtTime(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function parseSchedule(schedule: string | null): Map<number, DayHours | null> | null {
  if (!schedule) return null;
  const week = new Map<number, DayHours | null>();
  for (const seg of schedule.split("|")) {
    const [dayPart, ...rest] = seg.split(":");
    const hoursPart = rest.join(":").trim();
    const days = norm(dayPart).split(" a ").map((d) => DAY_INDEX[d.slice(0, 3)]);
    if (days.some((d) => d === undefined)) continue;
    const range: number[] = [];
    if (days.length === 1) range.push(days[0]);
    else {
      for (let d = days[0], i = 0; i < 7; i++, d = (d + 1) % 7) {
        range.push(d);
        if (d === days[1]) break;
      }
    }
    let hours: DayHours | null = null;
    if (!/cerrado/i.test(hoursPart)) {
      const [a, b] = hoursPart.split(/[–-]/);
      const open = a ? parseTime(a) : null;
      const close = b ? parseTime(b) : null;
      if (open === null || close === null) continue;
      hours = { open, close };
    }
    for (const d of range) week.set(d, hours);
  }
  return week.size ? week : null;
}

function limaNow(): { day: number; minutes: number; label: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === "weekday")?.value || "Mon";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const h = Number(parts.find((p) => p.type === "hour")?.value || 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value || 0);
  return { day, minutes: h * 60 + m, label: `${DAY_LABEL[day]} ${fmtTime(h * 60 + m)}` };
}

interface OpenStatus { status: "open" | "closed" | "unknown"; label: string }

function openStatus(schedule: string | null): OpenStatus {
  const week = parseSchedule(schedule);
  if (!week) return { status: "unknown", label: "Horario no disponible" };
  const now = limaNow();
  const today = week.get(now.day);
  if (today && now.minutes >= today.open && now.minutes < today.close) {
    return { status: "open", label: `Abierto ahora · cierra ${fmtTime(today.close)}` };
  }
  if (today && now.minutes < today.open) {
    return { status: "closed", label: `Cerrado · abre hoy ${fmtTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    const h = week.get(d);
    if (h) {
      const when = i === 1 ? "mañana" : `el ${DAY_LABEL[d]}`;
      return { status: "closed", label: `Cerrado · abre ${when} ${fmtTime(h.open)}` };
    }
  }
  return { status: "closed", label: "Cerrado" };
}

// ---------------------------------------------------------------------------------------------
// Search helpers
// ---------------------------------------------------------------------------------------------
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function whatsappUrl(phone: string | null): string | null {
  const digits = (phone || "").replace(/\D/g, "");
  const local = digits.startsWith("51") ? digits.slice(2) : digits;
  return /^9\d{8}$/.test(local) ? `https://wa.me/51${local}` : null;
}

function instagramUrl(handle: string | null): string | null {
  const h = (handle || "").trim().replace(/^@/, "");
  return h && /^[a-z0-9._]+$/i.test(h) ? `https://www.instagram.com/${h}/` : null;
}

interface UserLocation { lat: number; lng: number }

function toCard(b: Barberia, loc: UserLocation | null) {
  const st = openStatus(b.schedule);
  return {
    slug: b.slug,
    name: b.name,
    city: b.city,
    district: b.district,
    address: b.address,
    rating: b.rating,
    reviewCount: b.review_count,
    cutPrice: b.cut_price_pen,
    beardPrice: b.beard_price_pen,
    comboPrice: b.combo_price_pen,
    schedule: b.schedule,
    openStatus: st,
    imageUrl: b.image_url,
    pageUrl: b.page_url || `${SITE}/barberia/${b.slug}/`,
    mapsUrl: b.maps_url,
    phone: b.phone,
    whatsappUrl: whatsappUrl(b.phone),
    instagramUrl: instagramUrl(b.instagram),
    distanceKm:
      loc && b.lat !== null && b.lng !== null
        ? Number(distanceKm(loc.lat, loc.lng, b.lat, b.lng).toFixed(1))
        : null,
  };
}

function searchBarberias(catalog: Barberia[], args: any, loc: UserLocation | null) {
  const ciudad = norm(args?.ciudad || "");
  const distrito = norm(args?.distrito || "");
  const estilo = norm(args?.estilo || "");
  const precioMax = Number(args?.precio_max_corte) || null;
  const soloAbiertas = Boolean(args?.solo_abiertas);
  const usarUbicacion = Boolean(args?.usar_ubicacion) && !!loc;
  const limite = Math.min(Math.max(Number(args?.limite) || 4, 1), 6);

  const matchCity = (b: Barberia) =>
    !ciudad || norm(b.city).includes(ciudad) || norm(b.city_slug.replace(/-/g, " ")).includes(ciudad);
  const matchDistrict = (b: Barberia) =>
    !distrito ||
    norm(b.district).includes(distrito) ||
    norm(b.district_slug.replace(/-/g, " ")).includes(distrito) ||
    norm(b.address || "").includes(distrito);

  let notes: string[] = [];
  let pool = catalog.filter((b) => matchCity(b) && matchDistrict(b));
  if (pool.length === 0 && distrito) {
    pool = catalog.filter((b) => matchCity(b));
    notes.push(`No hay barberías registradas en "${args.distrito}"; se muestran otras de la misma ciudad.`);
  }
  if (pool.length === 0 && ciudad) {
    notes.push(`No hay barberías registradas en "${args.ciudad}" en el directorio.`);
  }
  if (estilo) {
    const styled = pool.filter((b) => norm(`${b.style_tag} ${b.badge} ${b.name}`).includes(estilo));
    if (styled.length) pool = styled;
  }
  if (precioMax) {
    const cheap = pool.filter((b) => b.cut_price_pen !== null && b.cut_price_pen <= precioMax);
    if (cheap.length) pool = cheap;
    else notes.push(`Ninguna tiene corte referencial de S/ ${precioMax} o menos; se muestran las más económicas.`);
  }

  let cards = pool.map((b) => toCard(b, loc));
  if (soloAbiertas) {
    const open = cards.filter((c) => c.openStatus.status === "open");
    if (open.length) cards = open;
    else notes.push("Ninguna aparece abierta en este momento según su horario referencial.");
  }

  const orden = args?.orden || (usarUbicacion ? "distancia" : precioMax ? "precio" : "rating");
  cards.sort((a, b) => {
    if (orden === "distancia" && a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm;
    if (orden === "precio") return (a.cutPrice ?? 9999) - (b.cutPrice ?? 9999);
    return (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
  });

  return {
    total_coincidencias: cards.length,
    notas: notes,
    resultados: cards.slice(0, limite).map((c) => ({
      slug: c.slug,
      nombre: c.name,
      ciudad: c.city,
      distrito: c.district,
      direccion: c.address,
      rating: c.rating,
      resenas: c.reviewCount,
      precio_corte_referencial: c.cutPrice !== null ? `S/ ${c.cutPrice}` : null,
      precio_barba_referencial: c.beardPrice !== null ? `S/ ${c.beardPrice}` : null,
      precio_combo_referencial: c.comboPrice !== null ? `S/ ${c.comboPrice}` : null,
      horario_referencial: c.schedule,
      estado_ahora: c.openStatus.label,
      distancia_km: c.distanceKm,
      url_ficha: c.pageUrl,
    })),
  };
}

function listCities(catalog: Barberia[]) {
  const map = new Map<string, { ciudad: string; url: string; total: number; distritos: Set<string> }>();
  for (const b of catalog) {
    const e = map.get(b.city_slug) || { ciudad: b.city, url: `${SITE}/ciudad/${b.city_slug}/`, total: 0, distritos: new Set() };
    e.total++;
    e.distritos.add(b.district);
    map.set(b.city_slug, e);
  }
  return [...map.values()]
    .sort((a, b) => b.total - a.total)
    .map((e) => ({ ciudad: e.ciudad, url: e.url, barberias: e.total, distritos: [...e.distritos].slice(0, 25) }));
}

const TOOLS = [
  {
    type: "function",
    function: {
      name: "buscar_barberias",
      description:
        "Busca barberías del directorio GuíaDeBarberías.com. Úsala SIEMPRE antes de recomendar locales, precios u horarios.",
      parameters: {
        type: "object",
        properties: {
          ciudad: { type: "string", description: "Ciudad del Perú, ej. Lima, Arequipa, Trujillo, Cusco" },
          distrito: { type: "string", description: "Distrito o zona, ej. Miraflores, Surco, Cayma" },
          usar_ubicacion: { type: "boolean", description: "true si el usuario pide 'cerca de mí' y compartió su ubicación" },
          precio_max_corte: { type: "number", description: "Precio máximo del corte en soles" },
          solo_abiertas: { type: "boolean", description: "true si pide locales abiertos ahora" },
          estilo: { type: "string", description: "Servicio o estilo, ej. fade, barba, navaja, clásico" },
          orden: { type: "string", enum: ["rating", "precio", "distancia"] },
          limite: { type: "number", description: "Cantidad de resultados (1 a 6)" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "detalle_barberia",
      description: "Devuelve el detalle de una barbería por su slug (teléfono, Instagram, reseña destacada, horario).",
      parameters: {
        type: "object",
        properties: { slug: { type: "string" } },
        required: ["slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "listar_ciudades",
      description: "Lista las ciudades y distritos con barberías en el directorio.",
      parameters: { type: "object", properties: {} },
    },
  },
];

const GUIDES = [
  ["Cortes para cara redonda", "cortes-para-cara-redonda-como-alargar-rostro"],
  ["Cortes para cara alargada", "cortes-para-cara-alargada-o-rectangular"],
  ["Cortes para cara cuadrada o diamante", "cortes-para-cara-cuadrada-y-diamante"],
  ["Cortes según tipo de cabello", "cortes-segun-tipo-cabello-lacio-ondulado-rizado"],
  ["Low, mid y high fade", "low-fade-vs-mid-fade-vs-high-fade-guia"],
  ["Taper fade", "taper-fade-clasico-vs-blowout-taper"],
  ["Cortes para disimular entradas", "cortes-de-cabello-para-disimular-entradas-y-coronilla"],
  ["Cómo explicarle tu corte al barbero", "como-explicar-corte-al-barbero"],
  ["Números de máquina", "numeros-de-maquina-corte-de-pelo"],
  ["Cada cuánto cortarse el pelo", "cada-cuanto-cortarse-el-pelo"],
  ["Diseños de barba (candado, ancla, Van Dyke)", "barba-candado-van-dyke-vs-ancla-diseno"],
  ["Propina al barbero en Perú", "propina-barbero-peru-etiqueta"],
]
  .map(([t, s]) => `- ${t}: ${SITE}/blog/${s}/`)
  .join("\n");

// ---------------------------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------------------------
Deno.serve(async (req: Request) => {
  const cors = corsHeaders(req);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    const { data: configRow } = await supabase.from("gdb_chat_config").select("*").eq("id", "default").maybeSingle();
    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o",
      temperature: 0.4,
      max_messages_per_session: 20,
      daily_budget_usd: 5,
      welcome_message: "¡Hola! 👋 Soy tu Asesor IA de GuíaDeBarberías.",
      custom_instructions: "",
    };

    if (mode === "config") {
      return json({ is_enabled: config.is_enabled, welcome_message: config.welcome_message });
    }

    if (mode === "track_click") {
      const clickType = String(body.click_type || "");
      if (!CLICK_TYPES.includes(clickType)) return json({ error: "click_type inválido" }, 400);
      const sessionId = typeof body.session_id === "string" ? body.session_id : null;
      await supabase.from("gdb_chat_clicks").insert({
        session_id: sessionId,
        visitor_id: String(body.visitor_id || "anon").slice(0, 80),
        barberia_slug: body.barberia_slug ? String(body.barberia_slug).slice(0, 120) : null,
        barberia_name: body.barberia_name ? String(body.barberia_name).slice(0, 160) : null,
        click_type: clickType,
        target_url: body.target_url ? String(body.target_url).slice(0, 500) : null,
        page_url: body.page_url ? String(body.page_url).slice(0, 500) : null,
      });
      if (sessionId) {
        const { data: sess } = await supabase.from("gdb_chat_sessions").select("clicks_count").eq("id", sessionId).maybeSingle();
        if (sess) {
          await supabase.from("gdb_chat_sessions").update({ clicks_count: (sess.clicks_count || 0) + 1 }).eq("id", sessionId);
        }
      }
      return json({ success: true });
    }

    // ------------------------------ chat ------------------------------
    if (!config.is_enabled) {
      return json({
        reply: `El asistente está en mantenimiento por unos minutos. Mientras tanto puedes ver las barberías por ciudad en [GuíaDeBarberías.com](${SITE}/) o usar [Barberías cerca de mí](${SITE}/barberias-cerca-de-mi/).`,
        barberias: [],
        suggested_options: [],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, MAX_MESSAGE_CHARS);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(body.visitor_id || "visitor-" + crypto.randomUUID().slice(0, 8)).slice(0, 80);
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(body.user_agent || req.headers.get("user-agent") || "").slice(0, 300);
    const loc: UserLocation | null =
      body.location && Number.isFinite(Number(body.location.lat)) && Number.isFinite(Number(body.location.lng))
        ? { lat: Number(body.location.lat), lng: Number(body.location.lng) }
        : null;
    let sessionId: string | null = typeof body.session_id === "string" ? body.session_id : null;

    // Daily budget (sum of today's assistant message costs, UTC day)
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const { data: todayCosts } = await supabase
      .from("gdb_chat_messages")
      .select("cost_usd")
      .eq("role", "assistant")
      .gte("created_at", startOfDay.toISOString());
    const spentToday = (todayCosts || []).reduce((acc: number, r: any) => acc + Number(r.cost_usd || 0), 0);
    if (spentToday >= Number(config.daily_budget_usd || 5)) {
      return json({
        reply: `Por hoy alcanzamos el límite de consultas automáticas. Encuentra barberías por ciudad en [GuíaDeBarberías.com](${SITE}/) o abre [Barberías cerca de mí](${SITE}/barberias-cerca-de-mi/).`,
        barberias: [],
        suggested_options: [],
      });
    }

    let session: any = null;
    if (sessionId) {
      const { data: s } = await supabase.from("gdb_chat_sessions").select("*").eq("id", sessionId).maybeSingle();
      session = s;
    }
    if (session && session.messages_count >= (config.max_messages_per_session || 20) * 2) {
      return json({
        session_id: session.id,
        reply: `Llegamos al máximo de mensajes de esta conversación. Puedes seguir explorando en [GuíaDeBarberías.com](${SITE}/) o iniciar un chat nuevo más tarde.`,
        barberias: [],
        suggested_options: [],
      });
    }
    if (!session) {
      const { data: created } = await supabase
        .from("gdb_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          has_location: !!loc,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 0,
          model_used: config.ai_model,
        })
        .select("*")
        .single();
      session = created;
      sessionId = created?.id ?? null;
    }

    // History from DB (never trust client-provided history)
    let history: { role: string; content: string }[] = [];
    if (sessionId) {
      const { data: prev } = await supabase
        .from("gdb_chat_messages")
        .select("role, content")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: false })
        .limit(8);
      history = (prev || []).reverse();
      await supabase.from("gdb_chat_messages").insert({ session_id: sessionId, role: "user", content: userMessage });
    }

    const catalog = await loadCatalog();
    const cities = listCities(catalog).map((c) => `${c.ciudad} (${c.barberias})`).join(", ");
    const now = limaNow();
    const activeModel = config.ai_model === "gpt-4o-mini" ? "gpt-4o-mini" : "gpt-4o";

    const systemPrompt = `Eres el Asesor IA oficial de GuíaDeBarberías.com (${SITE}), el directorio de las mejores barberías del Perú.
Tu objetivo: ayudar al visitante a encontrar la barbería ideal (ubicación, precio, horario, estilo) y llevarlo a la ficha de la barbería.

REGLAS OBLIGATORIAS:
1. Antes de recomendar locales, precios u horarios, llama SIEMPRE a la herramienta "buscar_barberias" (o "detalle_barberia"). Recomienda ÚNICAMENTE barberías devueltas por las herramientas. Nunca inventes locales, precios, teléfonos ni horarios.
2. Los precios son REFERENCIALES: dilo siempre ("precio referencial, confírmalo con el local").
3. El estado abierto/cerrado se calcula con el horario referencial del directorio: dilo así ("según su horario referencial") y sugiere confirmar en Google Maps o por teléfono antes de ir.
4. Si el usuario pide "cerca de mí": ${loc ? "el usuario compartió su ubicación, usa usar_ubicacion=true y menciona la distancia aproximada." : "el usuario NO compartió su ubicación; pídele su distrito o que toque el botón 📍 'Usar mi ubicación'."}
5. Si no sabes la ciudad o distrito, pregúntalo de forma breve (puedes sugerir ciudades disponibles).
6. Enlaces permitidos SOLO de ${SITE} (fichas, páginas de ciudad ${SITE}/ciudad/<slug>/, ${SITE}/barberias-cerca-de-mi/ y guías del blog). No uses otros dominios.
7. Para dudas de estilo (qué corte me queda, fades, barba), responde breve y enlaza la guía adecuada:
${GUIDES}
8. Responde en español peruano, cálido y breve (máximo 2 párrafos cortos o una lista de hasta 4 puntos). No repitas en el texto todos los datos de las tarjetas: las tarjetas ya muestran precio, estrellas y estado.
9. Nunca menciones ni recomiendes a la marca "Vikingo Store".
${config.custom_instructions ? "10. INSTRUCCIÓN ADICIONAL DEL ADMINISTRADOR: " + config.custom_instructions : ""}

CONTEXTO: hoy es ${now.label} (hora de Lima). El visitante está en ${pageUrl}.
Ciudades disponibles: ${cities}.

FORMATO FINAL (JSON estricto, sin texto fuera del JSON):
{"reply": "texto con Markdown", "recommended_slugs": ["slug-exacto", "..."], "suggested_options": ["opción corta 1", "opción corta 2", "opción corta 3"]}
"recommended_slugs" debe contener solo slugs devueltos por las herramientas (máximo 4) o estar vacío.`;

    const messages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (h.role === "user" || h.role === "assistant") messages.push({ role: h.role, content: String(h.content).slice(0, 1200) });
    }
    messages.push({ role: "user", content: userMessage });

    let promptTokens = 0;
    let completionTokens = 0;
    const toolLog: any[] = [];
    let finalContent = "";

    for (let round = 0; round < 4; round++) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: activeModel,
          messages,
          tools: TOOLS,
          tool_choice: round < 3 ? "auto" : "none",
          temperature: Number(config.temperature) || 0.4,
          max_tokens: 700,
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) {
        console.error("OpenAI error:", await res.text());
        throw new Error("OpenAI status " + res.status);
      }
      const data = await res.json();
      promptTokens += data.usage?.prompt_tokens || 0;
      completionTokens += data.usage?.completion_tokens || 0;
      const msg = data.choices?.[0]?.message;
      if (msg?.tool_calls?.length) {
        messages.push(msg);
        for (const call of msg.tool_calls) {
          let args: any = {};
          try {
            args = JSON.parse(call.function?.arguments || "{}");
          } catch {
            args = {};
          }
          let result: unknown;
          if (call.function?.name === "buscar_barberias") result = searchBarberias(catalog, args, loc);
          else if (call.function?.name === "detalle_barberia") {
            const b = catalog.find((x) => x.slug === args.slug);
            result = b
              ? { ...toCard(b, loc), resena_destacada: b.highlight_review, estilo: b.style_tag, rango_precios: b.price_range }
              : { error: "No existe esa barbería en el directorio" };
          } else if (call.function?.name === "listar_ciudades") result = listCities(catalog);
          else result = { error: "herramienta desconocida" };
          toolLog.push({ name: call.function?.name, args });
          messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
        }
        continue;
      }
      finalContent = msg?.content || "";
      break;
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(finalContent || "{}");
    } catch {
      parsed = { reply: finalContent };
    }
    const replyText: string =
      typeof parsed.reply === "string" && parsed.reply.trim()
        ? parsed.reply
        : `Te ayudo a encontrar barbería. ¿En qué ciudad o distrito estás? También puedes ver el [ranking por ciudad](${SITE}/).`;
    const slugs: string[] = Array.isArray(parsed.recommended_slugs) ? parsed.recommended_slugs.slice(0, 4) : [];
    const cards = slugs
      .map((s) => catalog.find((b) => b.slug === s))
      .filter((b): b is Barberia => !!b)
      .map((b) => toCard(b, loc));
    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options.filter((o: unknown) => typeof o === "string").slice(0, 3)
      : [];

    const totalTokens = promptTokens + completionTokens;
    const costUsd = calculateCostUsd(activeModel, promptTokens, completionTokens);

    if (sessionId && session) {
      await supabase.from("gdb_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_barberias: cards.map((c) => ({ slug: c.slug, name: c.name, city: c.city })),
        suggested_options: suggestedOptions,
        tool_calls: toolLog,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });
      const prevRecs: string[] = Array.isArray(session.recommended_barberias) ? session.recommended_barberias : [];
      for (const c of cards) if (!prevRecs.includes(c.name)) prevRecs.push(c.name);
      const cityHint = toolLog.find((t) => t.name === "buscar_barberias" && t.args?.ciudad)?.args?.ciudad || session.city_hint;
      await supabase
        .from("gdb_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (session.messages_count || 0) + 2,
          recommended_barberias: prevRecs.slice(0, 30),
          city_hint: cityHint ? String(cityHint).slice(0, 60) : null,
          has_location: session.has_location || !!loc,
          prompt_tokens: (session.prompt_tokens || 0) + promptTokens,
          completion_tokens: (session.completion_tokens || 0) + completionTokens,
          total_tokens: (session.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number((Number(session.estimated_cost_usd || 0) + costUsd).toFixed(6)),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "guiadebarberias.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      barberias: cards,
      suggested_options: suggestedOptions,
    });
  } catch (err: any) {
    console.error("guiadebarberias-chat error:", err);
    return json(
      {
        error: "internal",
        reply: `Tuvimos un inconveniente momentáneo. Puedes buscar barberías por ciudad en [GuíaDeBarberías.com](${SITE}/) mientras lo resolvemos.`,
        barberias: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
