"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/content/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tile = { k: PhotoKey; label: string };

/** Order matters: [left-top, centre, right-top, left-bottom, right-bottom]. */
const tiles: Tile[] = [
  { k: "barStock", label: "Raw material store" },
  { k: "factoryLine", label: "Production hall" },
  { k: "lathe", label: "Turning" },
  { k: "operatorLathe", label: "Machine operators" },
  { k: "warehouse", label: "Packing and dispatch" },
];

/** grid placement on large screens (read by .tour-tile in globals.css): 4 columns x 2 rows, centre photo spans the middle 2x2 */
const AREA = ["1 / 1 / 2 / 2", "1 / 2 / 3 / 4", "1 / 4 / 2 / 5", "2 / 1 / 3 / 2", "2 / 4 / 3 / 5"];

/**
 * Plant tour: the section pins with the production hall filling the screen; scrolling zooms it out
 * into the centre of a mosaic while the surrounding photos slide in from the sides and the caption
 * appears. Large screens with motion only; otherwise a static captioned grid.
 */
export function PlantTour() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const hero = root.current!.querySelector<HTMLElement>("[data-hero]")!;
        const sides = gsap.utils.toArray<HTMLElement>("[data-side]");
        // scale that makes the centre photo cover the whole viewport, from the centre of the grid
        // layout sizes (offset*), so transforms applied by the tween never skew the measurement
        const cover = () => Math.max(window.innerWidth / hero.offsetWidth, window.innerHeight / hero.offsetHeight) * 1.02;
        const shift = () => {
          let top = 0;
          for (let el: HTMLElement | null = hero; el && el !== root.current; el = el.offsetParent as HTMLElement | null) top += el.offsetTop;
          return window.innerHeight / 2 - (top + hero.offsetHeight / 2);
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(hero, { scale: cover, y: shift, borderRadius: 0 }, { scale: 1, y: 0, borderRadius: 2, duration: 1 }, 0)
          .fromTo("[data-hero-shade]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.7)
          .fromTo(
            sides,
            { xPercent: (i) => (i % 2 === 0 ? -60 : 60), autoAlpha: 0, scale: 0.85 },
            { xPercent: 0, autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.06 },
            0.35,
          )
          .fromTo("[data-tour-head]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3 }, 0.7);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Plant tour" className="relative overflow-hidden py-16 md:py-24 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-12">
      <div className="container-x">
        <div data-tour-head className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">Inside the plant</h2>
          <p className="max-w-[40ch] text-muted-foreground">Raw material, machining, inspection and packing on one site.</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map((t, i) => {
            const isHero = i === 1;
            return (
              <li
                key={t.k}
                data-hero={isHero ? "" : undefined}
                data-side={isHero ? undefined : ""}
                className={
                  isHero
                    ? "tour-tile tour-hero relative col-span-2 overflow-hidden rounded-sm border border-border will-change-transform"
                    : "tour-tile relative overflow-hidden rounded-sm border border-border will-change-transform"
                }
                style={{ aspectRatio: isHero ? "16 / 10" : "4 / 3", ["--area" as string]: AREA[i] }}
              >
                <Photo k={t.k} className="absolute inset-0" treatment="none" sizes={isHero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
                <div
                  data-hero-shade={isHero ? "" : undefined}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0"
                  style={{ height: "45%", background: "linear-gradient(to top, rgb(11 13 16 / 0.7), transparent)" }}
                />
                <span className="absolute bottom-3 left-3 font-mono text-[11px] tracking-[0.12em] text-paper uppercase md:bottom-4 md:left-4">
                  {t.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
