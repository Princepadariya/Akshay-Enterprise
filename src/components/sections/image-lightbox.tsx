"use client";

import { SiteImage as Image } from "@/components/site-image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { photos, type PhotoKey } from "@/content/images";

type Item = { image: PhotoKey; caption?: string };

/** Controlled lightbox. Arrow keys navigate; Escape closes (Radix). */
export function ImageLightbox({
  items,
  index,
  onIndexChange,
}: {
  items: Item[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
}) {
  const open = index !== null;
  const current = index !== null ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent className="max-w-[min(1200px,94vw)] gap-0 overflow-hidden border-border bg-background p-0 sm:max-w-[min(1200px,94vw)]">
        {current ? (
          <>
            <DialogTitle className="sr-only">{current.caption ?? photos[current.image].alt}</DialogTitle>
            <DialogDescription className="sr-only">{photos[current.image].alt}</DialogDescription>
            <div className="relative aspect-[3/2] w-full bg-surface-2">
              <Image
                src={photos[current.image].src}
                alt={photos[current.image].alt}
                fill
                sizes="94vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3">
              <p className="text-sm">
                {current.caption ?? photos[current.image].alt}
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  {(index ?? 0) + 1} / {items.length}
                </span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon-sm" onClick={() => go(-1)} aria-label="Previous image">
                  <ChevronLeft strokeWidth={1.5} />
                </Button>
                <Button variant="outline" size="icon-sm" onClick={() => go(1)} aria-label="Next image">
                  <ChevronRight strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
