import type { MetadataRoute } from "next";
import {
  getAllBarberias,
  getAllCities,
  getBarberiaUrl,
  SITE_URL,
} from "@/lib/barberias";
import { getAllBlogArticles } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const barberias = getAllBarberias();
  const cities = getAllCities();
  const blogArticles = getAllBlogArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nosotros/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contacto/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/politica-de-privacidad/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/politica-de-cookies/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/aviso-legal/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/ciudad/${c.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: c.slug === "lima" ? 0.95 : 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.88,
  }));

  const barberiaPages: MetadataRoute.Sitemap = barberias.map((b) => ({
    url: `${SITE_URL}${getBarberiaUrl(b)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: b.isNationalTop ? 0.9 : 0.8,
  }));

  return [...staticPages, ...cityPages, ...blogPages, ...barberiaPages];
}
