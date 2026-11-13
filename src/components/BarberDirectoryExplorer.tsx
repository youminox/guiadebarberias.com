"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import type { BarberShop, CityHub } from "@/lib/barberias";
import {
  calculateDistanceKm,
  formatDistanceLabel,
  buildGoogleMapsDirectionsUrl,
  findNearestPreset,
  QUICK_LOCATION_PRESETS,
  type LocationPreset,
} from "@/lib/geo";
import GoogleStars from "./GoogleStars";

interface BarberDirectoryExplorerProps {
  barberias: BarberShop[];
  cities: CityHub[];
  limaDistricts: { slug: string; name: string; count: number }[];
  autoCheckGrantedGeo?: boolean;
  showQuickPresetsByDefault?: boolean;
}

interface UserLocationState {
  lat: number;
  lng: number;
  source: "gps" | "ip" | "preset";
  label: string;
}

type SortOption = "rank" | "reviews" | "rating" | "distance";
type RadiusFilter = "all" | "2" | "5" | "15";

export default function BarberDirectoryExplorer({
  barberias,
  cities,
  limaDistricts,
  autoCheckGrantedGeo = false,
  showQuickPresetsByDefault = false,
}: BarberDirectoryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedLimaDistrict, setSelectedLimaDistrict] =
    useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [visibleCount, setVisibleCount] = useState(24);

  const [userLocation, setUserLocation] = useState<UserLocationState | null>(
    null
  );
  const [isLocating, setIsLocating] = useState(false);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);
  const [showPresetPicker, setShowPresetPicker] = useState(
    showQuickPresetsByDefault
  );
  const [radiusFilter, setRadiusFilter] = useState<RadiusFilter>("all");
  const [prioritizeTopNearby, setPrioritizeTopNearby] = useState(false);

  const applyLocationAndResetFilters = useCallback(
    (loc: UserLocationState, notice: string | null = null) => {
      setUserLocation(loc);
      setGeoNotice(notice);
      setSelectedCity("all");
      setSelectedLimaDistrict("all");
      setSearchQuery("");
      setRadiusFilter("all");
      setSortBy("distance");
      setVisibleCount(24);
    },
    []
  );

  const fallbackToIpOrPreset = useCallback(
    async (deniedMessage: string) => {
      try {
        const res = await fetch("/api/geo/", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as {
            detected?: boolean;
            lat?: number | null;
            lng?: number | null;
            city?: string | null;
          };
          if (
            data.detected &&
            typeof data.lat === "number" &&
            typeof data.lng === "number"
          ) {
            const nearest = findNearestPreset(data.lat, data.lng);
            const approxLabel =
              data.city && data.city !== "Perú"
                ? data.city
                : nearest?.preset.label || "Perú";
            applyLocationAndResetFilters(
              {
                lat: data.lat,
                lng: data.lng,
                source: "ip",
                label: approxLabel,
              },
              `${deniedMessage} Usamos tu ubicación aproximada por red (${approxLabel}). Para calcular metros exactos, elige tu distrito abajo:`
            );
            setShowPresetPicker(true);
            setIsLocating(false);
            return;
          }
        }
      } catch {
        // Fallback silently to manual quick zone picker
      }

      setGeoNotice(
        `${deniedMessage} Elige tu distrito o ciudad abajo para calcular la distancia exacta al instante:`
      );
      setShowPresetPicker(true);
      setIsLocating(false);
    },
    [applyLocationAndResetFilters]
  );

  const handleLocateNearMe = useCallback(() => {
    setIsLocating(true);
    setGeoNotice(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      void fallbackToIpOrPreset(
        "Tu navegador no permite geolocalización automática."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestPreset(latitude, longitude);
        const zoneLabel =
          nearest && nearest.distanceKm <= 12
            ? `GPS cerca de ${nearest.preset.label}`
            : "Tu ubicación GPS actual";
        applyLocationAndResetFilters({
          lat: latitude,
          lng: longitude,
          source: "gps",
          label: zoneLabel,
        });
        setShowPresetPicker(false);
        setIsLocating(false);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Permiso de GPS desactivado en tu navegador."
            : "No pudimos obtener la señal GPS exacta.";
        void fallbackToIpOrPreset(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 180000,
      }
    );
  }, [applyLocationAndResetFilters, fallbackToIpOrPreset]);

  // Triggered when Hero "Cerca de mí" button is clicked
  useEffect(() => {
    const onLocateEvent = () => {
      handleLocateNearMe();
    };
    window.addEventListener("guiadebarberias:locate-near-me", onLocateEvent);
    return () => {
      window.removeEventListener(
        "guiadebarberias:locate-near-me",
        onLocateEvent
      );
    };
  }, [handleLocateNearMe]);

  // On dedicated /barberias-cerca-de-mi/ page, automatically sort if permission was already granted
  useEffect(() => {
    if (!autoCheckGrantedGeo) return;
    if (
      typeof navigator === "undefined" ||
      !navigator.permissions ||
      !navigator.permissions.query
    ) {
      return;
    }
    let cancelled = false;
    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (!cancelled && status.state === "granted") {
          handleLocateNearMe();
        }
      })
      .catch(() => {
        // Permissions API unsupported in older Safari
      });
    return () => {
      cancelled = true;
    };
  }, [autoCheckGrantedGeo, handleLocateNearMe]);

  function handleSelectPreset(preset: LocationPreset) {
    applyLocationAndResetFilters({
      lat: preset.lat,
      lng: preset.lng,
      source: "preset",
      label: preset.label,
    });
    setShowPresetPicker(false);
  }

  function clearNearMeMode() {
    setUserLocation(null);
    setGeoNotice(null);
    setRadiusFilter("all");
    setPrioritizeTopNearby(false);
    setSortBy("rank");
    setVisibleCount(24);
  }

  const distancesById = useMemo(() => {
    if (!userLocation) return null;
    const map = new Map<number, number>();
    for (const b of barberias) {
      map.set(
        b.id,
        calculateDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng)
      );
    }
    return map;
  }, [barberias, userLocation]);

  const radiusCounts = useMemo(() => {
    if (!distancesById) return { km2: 0, km5: 0, km15: 0 };
    let km2 = 0;
    let km5 = 0;
    let km15 = 0;
    for (const d of distancesById.values()) {
      if (d <= 2) km2++;
      if (d <= 5) km5++;
      if (d <= 15) km15++;
    }
    return { km2, km5, km15 };
  }, [distancesById]);

  const nearestOverall = useMemo(() => {
    if (!distancesById || barberias.length === 0) return null;
    let best = barberias[0];
    let bestDist = distancesById.get(best.id) ?? Infinity;
    for (let i = 1; i < barberias.length; i++) {
      const candidate = barberias[i];
      const d = distancesById.get(candidate.id) ?? Infinity;
      if (d < bestDist) {
        best = candidate;
        bestDist = d;
      }
    }
    return { barberia: best, distanceKm: bestDist };
  }, [barberias, distancesById]);

  const filteredBarberias = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = barberias.filter((b) => {
      if (selectedCity !== "all" && b.citySlug !== selectedCity) {
        return false;
      }
      if (
        selectedCity === "lima" &&
        selectedLimaDistrict !== "all" &&
        b.districtSlug !== selectedLimaDistrict
      ) {
        return false;
      }
      if (distancesById && radiusFilter !== "all") {
        const limit = Number(radiusFilter);
        const dist = distancesById.get(b.id) ?? Infinity;
        if (dist > limit) return false;
      }
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.district.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.styleTag.toLowerCase().includes(q) ||
        b.highlightReview.text.toLowerCase().includes(q)
      );
    });

    return list.sort((a, b) => {
      if (sortBy === "distance" && distancesById) {
        const dA = distancesById.get(a.id) ?? Infinity;
        const dB = distancesById.get(b.id) ?? Infinity;

        if (prioritizeTopNearby) {
          const inLocalA = dA <= 3 ? 0 : 1;
          const inLocalB = dB <= 3 ? 0 : 1;
          if (inLocalA !== inLocalB) return inLocalA - inLocalB;
          if (inLocalA === 0) {
            const topA = a.isNationalTop ? 0 : a.cityRank <= 3 ? 1 : 2;
            const topB = b.isNationalTop ? 0 : b.cityRank <= 3 ? 1 : 2;
            if (topA !== topB) return topA - topB;
            if (b.rating !== a.rating) return b.rating - a.rating;
          }
        }

        if (Math.abs(dA - dB) > 0.001) return dA - dB;
        return a.id - b.id;
      }
      if (sortBy === "reviews") {
        return b.reviewCount - a.reviewCount;
      }
      if (sortBy === "rating") {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      }
      return a.id - b.id;
    });
  }, [
    barberias,
    searchQuery,
    selectedCity,
    selectedLimaDistrict,
    sortBy,
    distancesById,
    radiusFilter,
    prioritizeTopNearby,
  ]);

  const displayedBarberias = filteredBarberias.slice(0, visibleCount);

  function handleCitySelect(citySlug: string) {
    setSelectedCity(citySlug);
    setSelectedLimaDistrict("all");
    setVisibleCount(24);
  }

  return (
    <div id="buscador-barberias" className="scroll-mt-24">
      {/* Interactive Search & Filter Control Box */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xl">
        {/* Search Input + Near Me CTA + Sort Selector */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="Buscar por nombre de barbería, ciudad (Lima, Arequipa, Trujillo...), distrito (Miraflores, Surco...) o dirección..."
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 pl-12 pr-24 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/15 transition"
              aria-label="Buscar barberías en el Perú"
            />
            <svg
              className="absolute left-4 top-4.5 h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-4 rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300 cursor-pointer"
              >
                Limpiar ✕
              </button>
            )}
          </div>

          {/* Primary "Cerca de mí" Button right beside the search bar */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleLocateNearMe}
              disabled={isLocating}
              className={`inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-2xl px-5 py-4 text-xs sm:text-sm font-extrabold transition shadow-md cursor-pointer disabled:opacity-70 ${
                userLocation
                  ? "bg-slate-900 text-emerald-400 border-2 border-emerald-500 hover:bg-slate-800"
                  : "bg-primary text-white hover:bg-primary-dark shadow-primary/25"
              }`}
            >
              {isLocating ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Ubicando...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>
                    {userLocation ? "📍 Actualizar GPS" : "📍 Cerca de mí"}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowPresetPicker((prev) => !prev)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-4 text-xs font-extrabold text-slate-700 hover:border-primary hover:text-primary transition cursor-pointer"
              title="Elegir distrito o ciudad manualmente sin usar GPS"
            >
              🗺️ Elegir zona
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label
                htmlFor="sort-barberias"
                className="text-xs font-extrabold uppercase tracking-wider text-slate-500 sr-only xl:not-sr-only"
              >
                Ordenar:
              </label>
              <select
                id="sort-barberias"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-4 text-xs sm:text-sm font-bold text-slate-800 focus:border-primary focus:outline-none cursor-pointer"
              >
                {userLocation && (
                  <option value="distance">📍 Más cercanas a ti</option>
                )}
                <option value="rank">🏆 Posición en el Ranking</option>
                <option value="rating">⭐ Mejor Calificación Google</option>
                <option value="reviews">💬 Más Reseñas en Google</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Nearby Status Banner */}
        {(userLocation || geoNotice) && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 sm:p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                {userLocation ? (
                  <p className="text-xs sm:text-sm font-extrabold text-emerald-950 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-extrabold text-white">
                      {userLocation.source === "gps"
                        ? "📡 GPS Activo"
                        : userLocation.source === "ip"
                        ? "🌐 Zona Aprox."
                        : "📍 Zona Elegida"}
                    </span>
                    <span>{userLocation.label}</span>
                    {nearestOverall && (
                      <span className="font-semibold text-emerald-800">
                        · La más cercana:{" "}
                        <strong className="underline">
                          {nearestOverall.barberia.name.split("—")[0].trim()}
                        </strong>{" "}
                        ({formatDistanceLabel(nearestOverall.distanceKm)})
                      </span>
                    )}
                  </p>
                ) : null}
                {geoNotice && (
                  <p className="mt-1 text-xs font-semibold text-amber-900 bg-amber-100/80 border border-amber-200 rounded-xl px-3 py-2">
                    💡 {geoNotice}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {userLocation && (
                  <button
                    type="button"
                    onClick={() =>
                      setPrioritizeTopNearby((prev) => {
                        const next = !prev;
                        setSortBy("distance");
                        return next;
                      })
                    }
                    className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                      prioritizeTopNearby
                        ? "bg-amber-400 text-slate-950 shadow-xs"
                        : "bg-white text-slate-700 border border-emerald-200 hover:border-emerald-400"
                    }`}
                  >
                    ⭐{" "}
                    {prioritizeTopNearby
                      ? "Priorizando Top (< 3 km)"
                      : "Priorizar Top cerca"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearNearMeMode}
                  className="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Restablecer ✕
                </button>
              </div>
            </div>

            {/* Radius Filter Pills when location is active */}
            {userLocation && (
              <div className="mt-3 pt-3 border-t border-emerald-200/70 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900">
                  Radio de distancia:
                </span>
                {(
                  [
                    {
                      key: "all" as const,
                      label: `Todas por cercanía (${barberias.length})`,
                    },
                    {
                      key: "2" as const,
                      label: `< 2 km (${radiusCounts.km2})`,
                    },
                    {
                      key: "5" as const,
                      label: `< 5 km (${radiusCounts.km5})`,
                    },
                    {
                      key: "15" as const,
                      label: `< 15 km (${radiusCounts.km15})`,
                    },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setRadiusFilter(item.key);
                      setVisibleCount(24);
                    }}
                    className={`rounded-full px-3 py-1 text-[11px] font-extrabold transition cursor-pointer ${
                      radiusFilter === item.key
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Zone / District Centroid Picker (Fallback without GPS or manual jump) */}
        {showPresetPicker && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                📍 Calcular distancias desde un distrito o ciudad (sin GPS):
              </span>
              <button
                type="button"
                onClick={() => setShowPresetPicker(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Ocultar ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_LOCATION_PRESETS.map((preset) => {
                const isSelected =
                  userLocation?.source === "preset" &&
                  userLocation.label === preset.label;
                return (
                  <button
                    key={preset.slug}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* City Filter Pills */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              📍 Filtrar por Ciudad del Perú (Lima Principal):
            </span>
            <span className="text-xs font-bold text-primary">
              Mostrando {filteredBarberias.length} de {barberias.length}{" "}
              barberías verificadas
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCitySelect("all")}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition cursor-pointer ${
                selectedCity === "all"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🇵🇪 Todo el Perú ({barberias.length})
            </button>
            {cities.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => handleCitySelect(c.slug)}
                className={`rounded-full px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  selectedCity === c.slug
                    ? "bg-slate-900 text-amber-400 shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c.slug === "lima" ? "👑 " : ""}
                {c.name} ({c.count})
              </button>
            ))}
          </div>
        </div>

        {/* Lima District Sub-Filter (Visible when All or Lima is selected) */}
        {(selectedCity === "all" || selectedCity === "lima") && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              🏙️ Distritos de Lima Metropolitana:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("lima");
                  setSelectedLimaDistrict("all");
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                  selectedCity === "lima" && selectedLimaDistrict === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                Todos los distritos de Lima
              </button>
              {limaDistricts.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => {
                    setSelectedCity("lima");
                    setSelectedLimaDistrict(d.slug);
                    setVisibleCount(24);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                    selectedCity === "lima" && selectedLimaDistrict === d.slug
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {d.name} ({d.count})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredBarberias.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 sm:p-12 text-center">
          {userLocation && radiusFilter !== "all" && nearestOverall ? (
            <>
              <p className="text-lg font-extrabold text-slate-900">
                No hay barberías dentro de {radiusFilter} km de tu ubicación
              </p>
              <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
                La barbería verificada más cercana en nuestro ranking está{" "}
                <strong className="text-primary">
                  {formatDistanceLabel(nearestOverall.distanceKm).toLowerCase()}
                </strong>{" "}
                ({nearestOverall.barberia.name} en{" "}
                {nearestOverall.barberia.district},{" "}
                {nearestOverall.barberia.city}).
              </p>
              <button
                type="button"
                onClick={() => setRadiusFilter("all")}
                className="mt-5 rounded-xl bg-primary px-6 py-3 text-xs font-extrabold text-white shadow-md cursor-pointer hover:bg-primary-dark"
              >
                Ver las más cercanas sin límite de radio →
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-slate-800">
                No encontramos barberías para &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Prueba buscando por otra ciudad o distrito (ej. Miraflores,
                Surco, San Isidro, Arequipa, Trujillo, Cusco).
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("all");
                  setSelectedLimaDistrict("all");
                  setRadiusFilter("all");
                }}
                className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-xs font-extrabold text-white cursor-pointer"
              >
                Ver todas las barberías ({barberias.length})
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedBarberias.map((barberia, index) => {
              const barberiaHref = `/barberia/${barberia.slug}/`;
              const distanceKm = distancesById?.get(barberia.id);
              const isLocalTopRecommended =
                typeof distanceKm === "number" &&
                distanceKm <= 3 &&
                (barberia.isNationalTop || barberia.cityRank <= 3);

              return (
                <article
                  key={barberia.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
                >
                  {/* Real Photo + Badges */}
                  <Link
                    href={barberiaHref}
                    className="aspect-[16/10] overflow-hidden bg-slate-900 relative block"
                  >
                    <img
                      src={barberia.imageUrl}
                      alt={`${barberia.name} — Barbería en ${barberia.district}, ${barberia.city}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                    {/* Ranking Pill */}
                    <span className="absolute top-3 left-3 rounded-full bg-slate-950/90 backdrop-blur-xs border border-amber-400/40 px-3 py-1 text-[11px] font-extrabold text-amber-300 shadow-md">
                      {barberia.badge}
                    </span>

                    {/* Distance Pill (when active) OR City & District Pill */}
                    {typeof distanceKm === "number" ? (
                      <span className="absolute top-3 right-3 rounded-full bg-emerald-600/95 backdrop-blur-xs px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
                        📍 {formatDistanceLabel(distanceKm)}
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 rounded-full bg-primary/95 backdrop-blur-xs px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
                        📍 {barberia.district}, {barberia.city}
                      </span>
                    )}

                    {/* Price range on bottom image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        ✂️ {barberia.styleTag}
                      </span>
                      <span className="font-extrabold text-emerald-300 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        {barberia.priceRange}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Distance & Recommended Strip when Near Me is Active */}
                    {typeof distanceKm === "number" && (
                      <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800">
                          📍 {formatDistanceLabel(distanceKm)} de ti ·{" "}
                          {barberia.district}
                        </span>
                        {isLocalTopRecommended && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-2 py-1 text-[11px] font-extrabold text-amber-800">
                            ⭐ Top cerca de ti
                          </span>
                        )}
                      </div>
                    )}

                    {/* Name + Google Stars right next to/below name */}
                    <div className="mb-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <Link
                          href={barberiaHref}
                          className="group-hover:text-primary transition-colors"
                        >
                          <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                            {barberia.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="mt-2">
                        <GoogleStars
                          rating={barberia.rating}
                          reviewCount={barberia.reviewCount}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Exact Address */}
                    <p className="text-xs font-semibold text-slate-600 mb-3 flex items-start gap-1.5">
                      <span className="text-primary shrink-0">📍</span>
                      <span>{barberia.address}</span>
                    </p>

                    {/* Principal Google Review Highlight Box */}
                    <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 mb-4 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1">
                          <span>💬</span> Reseña Destacada en Google:
                        </span>
                        <span className="text-[11px] font-bold text-amber-500">
                          ★★★★★
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                        &ldquo;{barberia.highlightReview.text}&rdquo;
                      </p>
                      <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
                        — {barberia.highlightReview.author} ·{" "}
                        <span className="text-emerald-700">
                          {barberia.highlightReview.service}
                        </span>
                      </p>
                    </div>

                    {/* Quick Services & CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500">
                        Corte:{" "}
                        <strong className="text-slate-800">
                          {barberia.cutPrice}
                        </strong>{" "}
                        · Barba:{" "}
                        <strong className="text-slate-800">
                          {barberia.beardPrice}
                        </strong>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {typeof distanceKm === "number" && (
                          <a
                            href={buildGoogleMapsDirectionsUrl(
                              barberia.lat,
                              barberia.lng
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] font-extrabold text-slate-700 hover:border-primary hover:text-primary transition"
                            title={`Cómo llegar a ${barberia.name} en Google Maps`}
                          >
                            Ir ↗
                          </a>
                        )}
                        <Link
                          href={barberiaHref}
                          className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-extrabold text-white transition group-hover:bg-primary"
                        >
                          Ver Ficha y Reseñas
                          <svg
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More Button + Direct SEO Links */}
          {visibleCount < filteredBarberias.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark cursor-pointer"
              >
                Mostrar Más Barberías del Ranking (
                {filteredBarberias.length - visibleCount} restantes) ↓
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
