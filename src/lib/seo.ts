import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

/** Search results show about 60 characters of a title and about 160 of a description. */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

/** Shorten long text at a word boundary so search snippets never cut mid-word. */
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.-]+$/, "")}…`;
}

export function pageMetadata({ title, description, path, noIndex }: PageMeta): Metadata {
  const branded = `${title} | ${site.name}`;
  // Long titles drop the brand suffix rather than being truncated by the search engine.
  const fullTitle = branded.length <= TITLE_MAX ? branded : title;
  const desc = clamp(description, DESCRIPTION_MAX);
  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      // Setting openGraph on a page replaces the inherited object, so the site share image is
      // restated here. Routes with their own opengraph-image file (product pages) still override it.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: precision turned components manufacturer` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: ["/opengraph-image"] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
