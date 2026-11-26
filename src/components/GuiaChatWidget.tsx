"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";

const CHAT_ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/guiadebarberias-chat";

const STORAGE_VISITOR_KEY = "gdb_chat_visitor_v1";
const STORAGE_SESSION_KEY = "gdb_chat_session_v1";
const STORAGE_MESSAGES_KEY = "gdb_chat_messages_v1";
const SITE_ORIGIN = "https://guiadebarberias.com";

interface OpenStatus {
  status: "open" | "closed" | "unknown";
  label: string;
}

export interface ChatBarberiaCard {
  slug: string;
  name: string;
  city: string;
  district: string;
  address: string | null;
  reviewCount: number | null;
  cutPrice: number | null;
  beardPrice: number | null;
  comboPrice: number | null;
  openStatus: OpenStatus;
  imageUrl: string | null;
  pageUrl: string;
  mapsUrl: string | null;
  phone: string | null;
  whatsappUrl: string | null;
  instagramUrl: string | null;
  distanceKm: number | null;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  barberias?: ChatBarberiaCard[];
  suggestedOptions?: string[];
  createdAt: string;
}

type ClickType = "ficha" | "mapa" | "llamar" | "whatsapp" | "instagram" | "link";

const NEAR_ME_OPTION = "📍 Barberías abiertas cerca de mí";
const INITIAL_QUICK_OPTIONS = [
  NEAR_ME_OPTION,
  "💸 Corte por menos de S/ 40 en Lima",
  "💈 Mejor barbería para fade en Miraflores",
  "🧔 Perfilado de barba en Arequipa",
  "✂️ ¿Qué corte me queda según mi rostro?",
];

const DEFAULT_WELCOME =
  "¡Hola! 👋 Soy tu Asesor IA de GuíaDeBarberías. Dime en qué ciudad o distrito estás (o usa \"cerca de mí\") y te recomiendo barberías con precios referenciales y si están abiertas ahora.";

function toRelativeIfInternal(url: string): { href: string; external: boolean } {
  if (url.startsWith(SITE_ORIGIN)) return { href: url.slice(SITE_ORIGIN.length) || "/", external: false };
  return { href: url, external: true };
}

export default function GuiaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showTeaser, setShowTeaser] = useState(true);
  const [visitorId, setVisitorId] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState(DEFAULT_WELCOME);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      let vid = localStorage.getItem(STORAGE_VISITOR_KEY);
      if (!vid) {
        vid = "gdb-" + Math.random().toString(36).slice(2, 10) + "-" + Date.now().toString(36);
        localStorage.setItem(STORAGE_VISITOR_KEY, vid);
      }
      setVisitorId(vid);
      const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (savedSession) setSessionId(savedSession);
      const savedMessages = localStorage.getItem(STORAGE_MESSAGES_KEY);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      // ignore storage errors
    }

    fetch(CHAT_ENDPOINT, { method: "GET" })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.is_enabled === "boolean") setIsEnabled(data.is_enabled);
        if (data?.welcome_message) setWelcomeMessage(data.welcome_message);
      })
      .catch(() => {
        // keep defaults
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [messages, isOpen, isLoading]);

  const persistMessages = (next: ChatMessage[], nextSessionId?: string | null) => {
    setMessages(next);
    try {
      localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(next.slice(-24)));
      if (nextSessionId) localStorage.setItem(STORAGE_SESSION_KEY, nextSessionId);
    } catch {
      // ignore
    }
  };

  const trackClick = (type: ClickType, targetUrl: string, barberia?: { slug?: string; name?: string }) => {
    try {
      fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "track_click",
          session_id: sessionId,
          visitor_id: visitorId,
          barberia_slug: barberia?.slug || null,
          barberia_name: barberia?.name || null,
          click_type: type,
          target_url: targetUrl,
          page_url: window.location.href,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  const requestLocation = (): Promise<{ lat: number; lng: number } | null> =>
    new Promise((resolve) => {
      if (location) return resolve(location);
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        setLocationNote("Tu navegador no permite ubicación. Escribe tu distrito.");
        return resolve(null);
      }
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            lat: Number(pos.coords.latitude.toFixed(4)),
            lng: Number(pos.coords.longitude.toFixed(4)),
          };
          setLocation(loc);
          setLocationNote("📍 Ubicación activada para esta conversación");
          setLocating(false);
          resolve(loc);
        },
        () => {
          setLocationNote("No se pudo obtener tu ubicación. Escribe tu distrito.");
          setLocating(false);
          resolve(null);
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
      );
    });

  const sendMessage = async (textToSend: string, forcedLocation?: { lat: number; lng: number } | null) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const updatedWithUser = [...messages, userMsg];
    persistMessages(updatedWithUser, sessionId);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chat",
          session_id: sessionId,
          visitor_id: visitorId,
          message: trimmed,
          location: forcedLocation ?? location,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });
      const data = await res.json();
      const newSessId = data.session_id || sessionId;
      if (newSessId && newSessId !== sessionId) setSessionId(newSessId);

      const assistantMsg: ChatMessage = {
        id: "a-" + Date.now(),
        role: "assistant",
        content: data.reply || "¿En qué ciudad o distrito buscas barbería?",
        barberias: Array.isArray(data.barberias) ? data.barberias : [],
        suggestedOptions: Array.isArray(data.suggested_options) ? data.suggested_options : [],
        createdAt: new Date().toISOString(),
      };
      persistMessages([...updatedWithUser, assistantMsg], newSessId);
    } catch {
      persistMessages(
        [
          ...updatedWithUser,
          {
            id: "a-err-" + Date.now(),
            role: "assistant",
            content:
              "Hubo una demora en la conexión. Puedes buscar por ciudad en el [ranking de barberías](https://guiadebarberias.com/) o intentar de nuevo.",
            suggestedOptions: ["Intentar de nuevo"],
            createdAt: new Date().toISOString(),
          },
        ],
        sessionId
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickOption = async (opt: string) => {
    if (opt === NEAR_ME_OPTION || /cerca de m[ií]/i.test(opt)) {
      const loc = await requestLocation();
      sendMessage(loc ? opt : "Busco barberías abiertas cerca de mí (no pude compartir mi ubicación)", loc);
      return;
    }
    sendMessage(opt);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleResetChat = () => {
    setMessages([]);
    setSessionId(null);
    try {
      localStorage.removeItem(STORAGE_MESSAGES_KEY);
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch {
      // ignore
    }
  };

  const renderFormattedContent = (text: string) =>
    text.split("\n").map((line, lineIdx) => {
      if (!line.trim()) return <div key={lineIdx} className="h-2" />;
      const tokenRegex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*)/g;
      const parts = line.split(tokenRegex);
      return (
        <p key={lineIdx} className="leading-relaxed mb-1.5 last:mb-0">
          {parts.map((part, i) => {
            const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
            if (linkMatch) {
              const [, label, url] = linkMatch;
              const { href, external } = toRelativeIfInternal(url);
              return (
                <a
                  key={i}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
                  onClick={() => trackClick("link", url)}
                  className="font-bold text-emerald-700 underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-emerald-900"
                >
                  {label}
                </a>
              );
            }
            const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
            if (boldMatch) {
              return (
                <strong key={i} className="font-bold text-slate-900">
                  {boldMatch[1]}
                </strong>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });

  if (!isEnabled) return null;

  const latestAssistantMsg =
    messages.length > 0 && messages[messages.length - 1].role === "assistant" ? messages[messages.length - 1] : null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[410px] h-[600px] max-h-[82vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Asesor IA de Barberías"
        >
          {/* Header */}
          <div className="px-4 py-3.5 text-white flex items-center justify-between gap-3 shrink-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full bg-white/10 border border-white/25 grid place-items-center shrink-0">
                <span className="text-xl" aria-hidden="true">
                  💈
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-extrabold text-[15px] leading-tight truncate">Asesor IA Barberías</p>
                  <span className="inline-flex items-center whitespace-nowrap shrink-0 leading-none text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-400/20 text-emerald-300">
                    En línea
                  </span>
                </div>
                <p className="text-xs text-slate-300 truncate mt-0.5">Precios referenciales · horarios · cerca de ti</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-xs"
                  title="Reiniciar conversación"
                  aria-label="Reiniciar conversación"
                >
                  ↺
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-sm font-bold"
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white grid place-items-center text-xs shrink-0 mt-0.5">
                💈
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 p-3.5 text-[13.5px] text-slate-800 max-w-[88%]">
                <p className="leading-relaxed">{welcomeMessage}</p>
              </div>
            </div>

            {messages.length === 0 && !isLoading && (
              <div className="pl-9 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">¿Qué buscas hoy?</p>
                <div className="flex flex-wrap gap-1.5">
                  {INITIAL_QUICK_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleQuickOption(opt)}
                      className="text-left text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2.5">
                {msg.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-emerald-600 text-white px-3.5 py-2.5 text-[13.5px] max-w-[85%]">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white grid place-items-center text-xs shrink-0 mt-0.5">
                      💈
                    </div>
                    <div className="space-y-2.5 max-w-[88%] min-w-0">
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 p-3.5 text-[13.5px] text-slate-700">
                        {renderFormattedContent(msg.content)}
                      </div>

                      {msg.barberias && msg.barberias.length > 0 && (
                                  <span
                                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                      b.openStatus.status === "open"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : b.openStatus.status === "closed"
                                        ? "bg-slate-100 text-slate-600"
                                        : "bg-amber-50 text-amber-700"
                                    }`}
                                    title="Según horario referencial; confirma antes de ir"
                                  >
                                    {b.openStatus.label}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                                <a
                                  href={toRelativeIfInternal(b.pageUrl).href}
                                  onClick={() => trackClick("ficha", b.pageUrl, b)}
                                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-2"
                                >
                                  Ver ficha
                                </a>
                                {b.mapsUrl ? (
                                  <a
                                    href={b.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    onClick={() => trackClick("mapa", b.mapsUrl || "", b)}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-emerald-500 text-slate-800 font-bold text-[11px] py-2"
                                  >
                                    Cómo llegar
                                  </a>
                                ) : (
                                  <span />
                                )}
                                {b.whatsappUrl ? (
                                  <a
                                    href={b.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    onClick={() => trackClick("whatsapp", b.whatsappUrl || "", b)}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-emerald-500 text-slate-800 font-bold text-[11px] py-2"
                                  >
                                    WhatsApp
                                  </a>
                                ) : b.phone ? (
                                  <a
                                    href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
                                    onClick={() => trackClick("llamar", b.phone || "", b)}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-emerald-500 text-slate-800 font-bold text-[11px] py-2"
                                  >
                                    Llamar
                                  </a>
                                ) : (
                                  <span />
                                )}
                              </div>
                            </div>
                          ))}
                          <p className="text-[10px] text-slate-400 px-1">
                            Precios y horarios referenciales del directorio. Confírmalos con el local antes de ir.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {latestAssistantMsg?.suggestedOptions && latestAssistantMsg.suggestedOptions.length > 0 && !isLoading && (
              <div className="pl-9 flex flex-wrap gap-1.5 pt-1">
                {latestAssistantMsg.suggestedOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickOption(opt)}
                    className="text-left text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white grid place-items-center text-xs shrink-0">💈</div>
                <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="ml-1 font-medium">Buscando barberías...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-slate-200 shrink-0">
            {(locationNote || !location) && (
              <div className="px-3 pt-2 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="truncate">{locationNote || "Activa tu ubicación para ver las más cercanas"}</span>
                {!location && (
                  <button
                    type="button"
                    onClick={() => requestLocation()}
                    disabled={locating}
                    className="shrink-0 font-bold text-emerald-700 hover:text-emerald-900 disabled:opacity-50 cursor-pointer"
                  >
                    {locating ? "Ubicando..." : "📍 Usar mi ubicación"}
                  </button>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit} className="p-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                maxLength={600}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ej. barbería abierta en Surco con fade..."
                disabled={isLoading}
                aria-label="Escribe tu consulta"
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-45 text-white grid place-items-center shrink-0 cursor-pointer"
                aria-label="Enviar consulta"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Teaser + trigger */}
      <div className="flex items-center gap-2.5">
        {!isOpen && showTeaser && (
          <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white border border-slate-200 shadow-lg px-3.5 py-2 text-xs font-semibold text-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setShowTeaser(false);
              }}
              className="flex items-center gap-2 text-left cursor-pointer"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                ¿Buscas barbería? <strong className="text-emerald-700">Pregúntale a la IA →</strong>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowTeaser(false)}
              className="text-slate-400 hover:text-slate-700 ml-1 text-[11px] cursor-pointer"
              aria-label="Ocultar aviso"
            >
              ✕
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTeaser(false);
          }}
          className="relative flex items-center gap-2.5 rounded-full px-4 py-3 sm:px-5 sm:py-3.5 text-white font-extrabold text-sm shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer bg-gradient-to-br from-slate-900 to-emerald-800"
          style={{ boxShadow: "0 12px 28px -6px rgba(5, 150, 105, 0.5)" }}
          aria-label={isOpen ? "Cerrar Asesor IA de Barberías" : "Abrir Asesor IA de Barberías"}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>
          <span>{isOpen ? "Cerrar Asesor IA" : "Asesor IA Barberías"}</span>
          <span className="text-base" aria-hidden="true">
            💬
          </span>
        </button>
      </div>
    </div>
  );
}
