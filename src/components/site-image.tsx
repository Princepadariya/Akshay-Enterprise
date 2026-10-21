import Image, { type ImageProps } from "next/image";

/** next/image for site photography; every photo is a local file resized by the built-in optimizer. */
export function SiteImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} {...props} />;
}
