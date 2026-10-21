"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Loader for Unsplash placeholder photos: Unsplash's own image CDN resizes each photo to exactly
 * the width the screen asks for, instead of the Next server downloading a 2400px original and
 * resizing it (slow, and it timed out on some photos). Photos are always delivered as WebP.
 * Local files keep the built-in optimizer (which serves AVIF / WebP, see next.config.ts).
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  // always WebP: small, decodes fast and supported by every current browser
  url.searchParams.delete("auto");
  url.searchParams.set("fm", "webp");
  url.searchParams.set("fit", "crop");
  return url.toString();
}

export const isUnsplash = (src: unknown): src is string => typeof src === "string" && src.startsWith("https://images.unsplash.com/");
