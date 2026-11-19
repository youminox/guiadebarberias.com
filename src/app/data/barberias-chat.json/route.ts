import { getAllBarberias, SITE_URL } from "@/lib/barberias";

export const dynamic = "force-static";

function toNumber(price: string): number | null {
  const m = String(price || "").match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

/**
 * Public, static catalog consumed by the AI chat backend (Supabase edge function) to sync
 * the `gdb_barberias` table. Contains only data already published on the site.
 */
export function GET() {
  const barberias = getAllBarberias().map((b) => ({
    slug: b.slug,
    name: b.name,
    city: b.city,
    city_slug: b.citySlug,
    district: b.district,
    district_slug: b.districtSlug,
    address: b.address,
    lat: b.lat,
    lng: b.lng,
    rating: b.rating,
    review_count: b.reviewCount,
    price_range: b.priceRange,
    cut_price_pen: toNumber(b.cutPrice),
    beard_price_pen: toNumber(b.beardPrice),
    combo_price_pen: toNumber(b.comboPrice),
    schedule: b.schedule,
    phone: b.phone,
    instagram: b.instagram,
    badge: b.badge,
    style_tag: b.styleTag,
    image_url: `${SITE_URL}${b.imageUrl}`,
    page_url: `${SITE_URL}/barberia/${b.slug}/`,
    maps_url: b.googleMapsQueryUrl,
    highlight_review: b.highlightReview?.text?.slice(0, 300) ?? null,
    city_rank: b.cityRank,
    is_national_top: Boolean(b.isNationalTop),
  }));

  return Response.json(
    { generated_at: new Date().toISOString(), count: barberias.length, barberias },
    { headers: { "X-Robots-Tag": "noindex" } }
  );
}
