"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ImageLightbox } from "./image-lightbox";
import { photos } from "@/content/images";
import type { GalleryItem } from "@/content/misc";
import { cn } from "@/lib/utils";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const reduce = useReducedMotion();
  const groups = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.group)))], [items]);
  const [group, setGroup] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = group === "All" ? items : items.filter((i) => i.group === group);

  return (
    <div className="grid gap-8">
      <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroup(g)}
            aria-pressed={group === g}
            className={cn(
              "rounded-sm border px-3.5 py-1.5 text-sm transition-colors",
              group === g ? "border-brass bg-brass text-brass-foreground" : "border-border hover:border-foreground/40",
            )}
          >
            {g}
          </button>
        ))}
      </div>
      <motion.ul layout={!reduce} className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>li]:mb-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((item, i) => {
            const p = photos[item.image];
            return (
              <motion.li
                key={item.image}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-sm border border-border"
                  aria-label={`Open ${item.caption}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                  />
                </button>
                <p className="mt-2 flex justify-between text-sm">
                  <span>{item.caption}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{item.group}</span>
                </p>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      <ImageLightbox items={shown} index={open} onIndexChange={setOpen} />
    </div>
  );
}
