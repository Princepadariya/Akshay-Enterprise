"use client";

import Image, { type ImageProps } from "next/image";
import { isUnsplash, unsplashLoader } from "@/lib/image-loader";

/** next/image that sends Unsplash photos through Unsplash's CDN and everything else through the built-in optimizer. */
export function SiteImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} loader={isUnsplash(props.src) ? unsplashLoader : undefined} />;
}
