import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function decodeHeaderValue(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

export async function GET(request: NextRequest) {
  const headers = request.headers;

  const country = (
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    ""
  )
    .trim()
    .toUpperCase();

  const rawCity = decodeHeaderValue(
    headers.get("x-vercel-ip-city") || headers.get("cf-ipcity")
  );

  const latHeader =
    headers.get("x-vercel-ip-latitude") || headers.get("cf-iplatitude");
  const lngHeader =
    headers.get("x-vercel-ip-longitude") || headers.get("cf-iplongitude");

  const lat = latHeader ? Number.parseFloat(latHeader) : Number.NaN;
  const lng = lngHeader ? Number.parseFloat(lngHeader) : Number.NaN;

  const hasValidCoords =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -18.6 &&
    lat <= 0.1 &&
    lng >= -81.6 &&
    lng <= -68.4;

  const detected = hasValidCoords && (!country || country === "PE");

  return NextResponse.json(
    {
      detected,
      country: country || null,
      city: detected ? rawCity || "Perú" : rawCity,
      lat: detected ? Number(lat.toFixed(6)) : null,
      lng: detected ? Number(lng.toFixed(6)) : null,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
