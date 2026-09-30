import { site } from "@/content/site";
import type { Faq } from "@/content/faq";
import type { Product } from "@/content/products";
import { getCategory, productHref } from "@/content/products";
import { photos } from "@/content/images";
import { materialName } from "@/content/materials";
import { absoluteUrl } from "./seo";

export type Crumb = { name: string; href: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    email: site.contact.email.display,
    telephone: site.contact.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.addressLines[0],
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    sameAs: site.social.map((s) => s.href).filter(Boolean),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function productSchema(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: getCategory(p.category)?.name,
    material: p.materials.map(materialName).join(", "),
    image: p.images.map((k) => photos[k].src),
    url: absoluteUrl(productHref(p)),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
