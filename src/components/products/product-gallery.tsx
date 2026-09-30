"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import { ImageLightbox } from "@/components/sections/image-lightbox";
import { photos, type PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * Product images with hover-zoom (pointer sets transform-origin directly on the element,
 * no React state per move) and click-to-open lightbox.
 */
export function ProductGallery({ images, name }: { images: PhotoKey[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => setLightbox(current)}
        onPointerMove={(e) => {
          const el = imgWrap.current;
          if (!el || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          el.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
        }}
        className="group img-treat img-treat-soft relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-sm border border-border"
        aria-label={`Open ${name} image ${current + 1} in full screen`}
      >
        <div ref={imgWrap} className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.8]">
          <Image
            src={photos[images[current]].src}
            alt={`${name}: ${photos[images[current]].alt}`}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <span className="absolute right-3 bottom-3 z-[2] flex items-center gap-1.5 rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[11px] text-paper">
          <Expand strokeWidth={1.5} className="size-3.5" /> Zoom
        </span>
      </button>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((k, i) => (
            <button
              key={k}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === current}
              className={cn(
                "img-treat relative aspect-square overflow-hidden rounded-sm border transition-colors",
                i === current ? "border-brass" : "border-border hover:border-foreground/40",
              )}
            >
              <Image src={photos[k].src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
      <ImageLightbox items={images.map((image) => ({ image, caption: name }))} index={lightbox} onIndexChange={setLightbox} />
    </div>
  );
}
