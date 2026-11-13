import {
  QUICK_LOCATION_PRESETS,
  type LocationPreset,
} from "@/data/barberias-coords";

export { QUICK_LOCATION_PRESETS, type LocationPreset };

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Calcula la distancia geodésica real entre dos coordenadas usando la fórmula Haversine.
 */
export function calculateDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Formatea una distancia en kilómetros para tarjetas de UI ("320 m", "1.8 km", "24 km").
 */
export function formatDistanceLabel(km: number): string {
  if (!Number.isFinite(km) || km < 0) return "";
  if (km < 0.08) return "A menos de 80 m";
  if (km < 1) {
    const meters = Math.round((km * 1000) / 10) * 10;
    return `A ${meters} m`;
  }
  if (km < 10) {
    return `A ${km.toFixed(1)} km`;
  }
  return `A ${Math.round(km)} km`;
}

/**
 * Construye el enlace directo de ruta ("Cómo llegar") en Google Maps sin consumo de API Cloud.
 */
export function buildGoogleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/**
 * Encuentra el distrito o ciudad de referencia más cercano a una coordenada dada.
 */
export function findNearestPreset(
  lat: number,
  lng: number
): { preset: LocationPreset; distanceKm: number } | null {
  if (QUICK_LOCATION_PRESETS.length === 0) return null;
  let best = QUICK_LOCATION_PRESETS[0];
  let bestDist = calculateDistanceKm(lat, lng, best.lat, best.lng);
  for (let i = 1; i < QUICK_LOCATION_PRESETS.length; i++) {
    const candidate = QUICK_LOCATION_PRESETS[i];
    const d = calculateDistanceKm(lat, lng, candidate.lat, candidate.lng);
    if (d < bestDist) {
      best = candidate;
      bestDist = d;
    }
  }
  return { preset: best, distanceKm: bestDist };
}
