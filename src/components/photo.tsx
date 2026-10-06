import { SiteImage as Image } from "@/components/site-image";
import { photos, type PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

type Props = {
  k: PhotoKey;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  treatment?: "duotone" | "soft" | "none";
  alt?: string;
};

/** Fills its (positioned, sized) parent with a photograph. Original colours by default; "duotone" / "soft" add the brass-toned treatment. */
export function Photo({ k, className, imgClassName, sizes = "100vw", priority, treatment = "none", alt }: Props) {
  const p = photos[k];
  return (
    <div
      className={cn(
        "relative",
        treatment !== "none" && "img-treat",
        treatment === "soft" && "img-treat-soft",
        className,
      )}
    >
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
