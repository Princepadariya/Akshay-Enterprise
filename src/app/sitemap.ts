import type { MetadataRoute } from "next";
import { categories, products } from "@/content/products";
import { industries } from "@/content/industries";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/about",
  "/about/journey",
  "/about/vision-mission-values",
  "/about/leadership",
  "/products",
  "/capabilities",
  "/infrastructure",
  "/quality",
  "/materials",
  "/industries",
  "/global-presence",
  "/gallery",
  "/downloads",
  "/sustainability",
  "/faq",
  "/contact",
  "/request-quote",
  "/privacy-policy",
  "/terms",
  "/site-map",
  "/policies",
  "/policies/ehs",
  "/policies/quality",
  "/policies/cyber-security",
  "/policies/conflict-minerals",
  "/policies/counterfeit-parts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p === "/products" || p === "/request-quote" ? 0.9 : 0.7,
    })),
    ...categories.map((c) => ({ url: absoluteUrl(`/products/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.category}/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...industries.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
