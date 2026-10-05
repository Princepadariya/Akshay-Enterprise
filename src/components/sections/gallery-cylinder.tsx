"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "./image-lightbox";
import { photos } from "@/content/images";
import type { GalleryItem } from "@/content/misc";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

/**
 * 3D cylinder showcase (CSS 3D transforms driven by GSAP).
 * Photos sit on the outside of a slowly turning cylinder. Drag or flick to spin it (Draggable +
 * Inertia, snapping to the nearest photo), use the arrow buttons or keyboard arrows, click a photo
 * to open it full size. Cards facing away are shaded and hidden, so depth reads clearly.
 * All per-frame work writes transforms/opacity directly (no React state), and the auto-turn stops
 * off screen, while dragging or hovering, and entirely under reduced motion.
 */
export function GalleryCylinder({ items }: { items: GalleryItem[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const n = items.length;
  const step = 360 / n;
  const api = useRef<{ go: (dir: 1 | -1) => void } | null>(null);

  useGSAP(
    () => {
      const root = stage.current!;
      const ring = root.querySelector<HTMLElement>("[data-ring]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card3d]", root);
      const proxy = document.createElement("div");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const K = 0.22; // degrees of rotation per pixel dragged
      const state = { auto: 0, radius: 500, hover: false, visible: true };
      let dragging = false;

      const layout = () => {
        const w = cards[0].offsetWidth;
        state.radius = Math.round(w / 2 / Math.tan(Math.PI / n) + w * 0.16);
        cards.forEach((c, i) => {
          c.style.transform = `rotateY(${i * step}deg) translateZ(${state.radius}px)`;
        });
      };

      const rotation = () => state.auto + (gsap.getProperty(proxy, "x") as number) * K;

      const render = () => {
        const rot = rotation();
        ring.style.transform = `translateZ(${-state.radius}px) rotateX(-7deg) rotateY(${rot}deg)`;
        cards.forEach((c, i) => {
          const a = ((((i * step + rot) % 360) + 540) % 360) - 180; // -180..180, 0 = facing viewer
          const facing = Math.cos((a * Math.PI) / 180);
          c.style.opacity = facing < -0.15 ? "0" : String(Math.min(1, 0.35 + facing));
          c.style.pointerEvents = facing > 0.55 ? "auto" : "none";
          (c.querySelector("[data-shade]") as HTMLElement).style.opacity = String(Math.max(0, 0.75 - facing * 0.85));
        });
      };

      const snapX = (x: number) => {
        const target = Math.round((state.auto + x * K) / step) * step;
        return (target - state.auto) / K;
      };

      layout();
      render();

      const [drag] = Draggable.create(proxy, {
        type: "x",
        trigger: root.querySelector("[data-drag]"),
        inertia: true,
        snap: snapX,
        onPress: () => {
          dragging = true;
        },
        onDrag: render,
        onThrowUpdate: render,
        onRelease: function () {
          if (!this.tween) dragging = false;
        },
        onThrowComplete: () => {
          dragging = false;
        },
        onClick: (e: PointerEvent) => {
          const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card3d]");
          if (card) setOpen(Number(card.dataset.index));
        },
      });

      api.current = {
        go: (dir) => {
          const x = gsap.getProperty(proxy, "x") as number;
          gsap.to(proxy, { x: snapX(x - (dir * step) / K), duration: reduce ? 0 : 0.9, ease: "expo.out", onUpdate: render });
        },
      };

      const tick = (_t: number, delta: number) => {
        if (reduce || dragging || state.hover || !state.visible) return;
        state.auto -= delta * 0.006;
        render();
      };
      gsap.ticker.add(tick);

      const io = new IntersectionObserver(([e]) => (state.visible = e.isIntersecting));
      io.observe(root);
      const ro = new ResizeObserver(() => {
        layout();
        render();
      });
      ro.observe(root);
      const enter = () => (state.hover = true);
      const leave = () => (state.hover = false);
      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);

      return () => {
        gsap.ticker.remove(tick);
        drag.kill();
        io.disconnect();
        ro.disconnect();
        root.removeEventListener("pointerenter", enter);
        root.removeEventListener("pointerleave", leave);
      };
    },
    { scope: stage },
  );

  return (
    <section aria-label="Photo showcase" className="relative overflow-hidden border-b border-border py-14 md:py-20">
      <div
        ref={stage}
        className="relative mx-auto h-[340px] [perspective:950px] [perspective-origin:50%_35%] md:h-[460px]"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") api.current?.go(1);
          if (e.key === "ArrowLeft") api.current?.go(-1);
        }}
      >
        <div data-drag className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing">
          <div data-ring className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
            {items.map((item, i) => {
              const p = photos[item.image];
              return (
                <figure
                  key={item.image}
                  data-card3d
                  data-index={i}
                  className="absolute top-0 left-0 -mt-[130px] -ml-[100px] h-[260px] w-[200px] overflow-hidden rounded-sm border border-border bg-surface-2 shadow-[0_30px_60px_-30px_rgb(18_11_10/0.5)] [backface-visibility:hidden] md:-mt-[180px] md:-ml-[135px] md:h-[360px] md:w-[270px]"
                >
                  <Image src={p.src} alt={p.alt} fill sizes="270px" className="object-cover" draggable={false} />
                  <div data-shade className="absolute inset-0 bg-graphite" style={{ opacity: 0 }} />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/90 to-transparent p-3 font-mono text-[11px] text-paper">
                    {item.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-x mt-8 flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <Move strokeWidth={1.5} className="size-4 text-brass" /> Drag to rotate, click a photo to enlarge
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="icon-sm" aria-label="Previous photo" onClick={() => api.current?.go(-1)}>
            <ChevronLeft strokeWidth={1.5} />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Next photo" onClick={() => api.current?.go(1)}>
            <ChevronRight strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <ImageLightbox items={items} index={open} onIndexChange={setOpen} />
    </section>
  );
}
