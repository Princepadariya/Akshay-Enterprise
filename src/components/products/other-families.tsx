"use client";

import { SiteImage as Image } from "@/components/site-image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/content/images";
import type { Category } from "@/content/products";

gsap.registerPlugin(useGSAP);

/**
 * Index of the other product families. Large numbered rows in two columns; on devices with a
 * mouse, hovering a row shows that family's photo floating beside the cursor (GSAP quickTo, so
 * it trails smoothly). Touch screens get a small thumbnail on each row instead.
 */
export function OtherFamilies({ items }: { items: Category[] }) {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const box = preview.current!;
        const shots = gsap.utils.toArray<HTMLElement>("[data-shot]", box);
        const xTo = gsap.quickTo(box, "x", { duration: 0.55, ease: "power3" });
        const yTo = gsap.quickTo(box, "y", { duration: 0.55, ease: "power3" });
        const rows = gsap.utils.toArray<HTMLElement>("[data-family]");
        gsap.set(box, { autoAlpha: 0, scale: 0.85 });

        const move = (e: PointerEvent) => {
          const r = root.current!.getBoundingClientRect();
          xTo(e.clientX - r.left + 28);
          yTo(e.clientY - r.top - box.offsetHeight / 2);
        };
        const enter = (i: number) => () => {
          shots.forEach((s, j) => gsap.to(s, { autoAlpha: j === i ? 1 : 0, scale: j === i ? 1 : 1.08, duration: 0.45, ease: "power2.out", overwrite: true }));
          gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        };
        const leave = () => gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: "power2.in", overwrite: "auto" });

        const list = root.current!.querySelector<HTMLElement>("[data-list]")!;
        const handlers = rows.map((row, i) => {
          const h = enter(i);
          row.addEventListener("pointerenter", h);
          return h;
        });
        list.addEventListener("pointermove", move);
        list.addEventListener("pointerleave", leave);
        return () => {
          rows.forEach((row, i) => row.removeEventListener("pointerenter", handlers[i]));
          list.removeEventListener("pointermove", move);
          list.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="other-families" className="relative container-x pb-8">
      <div className="border-t border-border pt-12 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="other-families" className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-4xl">
            Explore other product families
          </h2>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
            All products <ArrowUpRight strokeWidth={1.5} className="size-4" />
          </Link>
        </div>

        <ul data-list className="mt-10 grid gap-x-12 border-b border-border lg:grid-cols-2">
          {items.map((c, i) => (
            <li key={c.slug} data-family className="border-t border-border">
              <Link
                href={`/products/${c.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:gap-6 md:py-6"
              >
                {/* touch screens: small thumbnail; mouse screens: index number */}
                <span className="relative size-12 overflow-hidden rounded-sm border border-border [@media(hover:hover)]:hidden">
                  <Image src={photos[c.image].src} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span className="hidden w-8 font-mono text-xs text-muted-foreground transition-colors group-hover:text-brass-ink [@media(hover:hover)]:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl leading-tight font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                    {c.name}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[11px] text-muted-foreground">{c.spec}</span>
                </span>
                <span className="grid size-10 place-items-center rounded-full border border-border transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:gloss group-hover:text-brass-foreground">
                  <ArrowUpRight strokeWidth={1.5} className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* cursor-following preview (mouse + large screens only) */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden overflow-hidden rounded-sm border border-border shadow-[0_30px_60px_-20px_rgb(18_11_10/0.5)] lg:block"
        style={{ width: 260, height: 180, opacity: 0, visibility: "hidden" }}
      >
        {items.map((c) => (
          <div key={c.slug} data-shot className="absolute inset-0" style={{ opacity: 0 }}>
            <Image src={photos[c.image].src} alt="" fill sizes="260px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
