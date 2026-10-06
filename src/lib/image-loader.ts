"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Loader for Unsplash placeholder photos: Unsplash's own image CDN resizes each photo to exactly
 * the width the screen asks for, instead of the Next server downloading a 2400px original and
 * resizing it (slow, and it timed out on some photos). Local files keep the built-in optimizer.
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
}

export const isUnsplash = (src: unknown): src is string => typeof src === "string" && src.startsWith("https://images.unsplash.com/");
