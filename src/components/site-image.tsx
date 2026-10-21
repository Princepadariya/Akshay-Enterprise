"use client";

import Image, { type ImageProps } from "next/image";
import { isUnsplash, unsplashLoader } from "@/lib/image-loader";

/**
 * next/image that sends Unsplash photos through Unsplash's CDN and everything else through the built-in optimizer.
 * `maxWidth` caps the downloaded width for photos that never need to be shown large (keeps files small on 2x screens).
 */
export function SiteImage({ alt, maxWidth, ...props }: ImageProps & { maxWidth?: number }) {
  const loader = isUnsplash(props.src)
    ? maxWidth
      ? (o: Parameters<typeof unsplashLoader>[0]) => unsplashLoader({ ...o, width: Math.min(o.width, maxWidth) })
      : unsplashLoader
    : undefined;
  return <Image alt={alt} {...props} loader={loader} />;
}
