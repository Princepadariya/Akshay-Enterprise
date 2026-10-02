"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TodoMark } from "@/components/todo-mark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Simplified technical line drawings (64x64), one per instrument, keyed by a word in its name. */
const DRAWINGS: { match: RegExp; paths: string[] }[] = [
  {
    match: /projector/i,
    paths: [
      "M32 10 a18 18 0 1 0 0.01 0",
      "M14 28 H50 M32 10 V46",
      "M22 34 V24 H30 V20 H40 V34",
      "M32 46 V51 M24 51 H40 M18 56 H46",
    ],
  },
  {
    match: /roughness/i,
    paths: [
      "M8 12 H36 V26 H8 Z",
      "M13 17 H29 M13 21 H22",
      "M36 19 H50 V31",
      "M6 40 l4 -3 l4 4 l4 -5 l4 4 l4 -3 l4 5 l4 -4 l4 3 l4 -4 l4 3 l4 -2",
      "M6 47 H58",
    ],
  },
  {
    match: /height/i,
    paths: ["M10 48 H40 V54 H10 Z", "M16 48 V8 H22 V48", "M14 24 H28 V32 H14 Z", "M28 28 H48 L52 31", "M17 27 H24"],
  },
  {
    match: /micrometer/i,
    paths: ["M14 20 V38 Q14 48 24 48 H36 V25", "M14 20 H20", "M24 20 H36", "M36 15 H46 V25 H36", "M46 14 H56 V26 H46 Z", "M49 17 V23 M52 17 V23"],
  },
  {
    match: /thread/i,
    paths: ["M8 28 H24 V36 H8 Z", "M24 26 H40 V38 H24", "M28 26 L26 38 M32 26 L30 38 M36 26 L34 38 M40 26 L38 38", "M50 22 a10 10 0 1 0 0.01 0", "M50 27 a5 5 0 1 0 0.01 0"],
  },
  {
    match: /pin|slip/i,
    paths: ["M8 34 H32 V40 H8 Z", "M10 28 H30 V34 H10 Z", "M12 22 H28 V28 H12 Z", "M40 14 V50 M46 18 V50 M52 22 V50", "M38 14 H42 M44 18 H48 M50 22 H54", "M6 52 H58"],
  },
  {
    match: /caliper|vernier/i,
    paths: ["M6 20 H58 V28 H6 Z", "M10 28 V46 L14 42 V28", "M24 16 H36 V32 H24 Z", "M26 32 V46 L30 42 V32", "M42 20 V24 M46 20 V24 M50 20 V24 M54 20 V24", "M10 20 V12 L13 14 V20"],
  },
  {
    match: /xrf|spectro/i,
    paths: ["M10 22 H40 L46 28 V32 H10 Z", "M18 32 L14 52 H22 L26 32", "M48 30 H53 M49 24 L54 21 M49 36 L54 39", "M57 16 V44"],
  },
];

const fallback = ["M12 32 H52", "M32 12 V52", "M32 18 a14 14 0 1 0 0.01 0"];
const drawingFor = (name: string) => DRAWINGS.find((d) => d.match.test(name))?.paths ?? fallback;

type Instrument = { name: string; use: string; placeholder?: boolean };

/**
 * Measuring instruments as cards, each with a small technical line drawing of the instrument that
 * draws itself in as the card scrolls into view. On mouse devices the card tilts slightly toward
 * the pointer. Drawings are shown complete and cards stay flat under reduced motion.
 */
export function InstrumentGrid({ items }: { items: Instrument[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-instrument]");
        cards.forEach((card) => {
          card.querySelectorAll<SVGPathElement>("path").forEach((p) => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          });
        });
        ScrollTrigger.batch(cards, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            batch.forEach((card, i) => {
              gsap.to(card.querySelectorAll("path"), { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.12, delay: i * 0.1 });
              gsap.fromTo(card, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out", delay: i * 0.1 });
            }),
        });
      });

      // pointer tilt, mouse devices only
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-instrument]");
        const off = cards.map((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
          gsap.set(card, { transformPerspective: 700 });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 8);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => off.forEach((f) => f());
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className="grid gap-3 sm:grid-cols-2">
      {items.map((ins) => (
        <li
          key={ins.name}
          data-instrument
          className="group flex items-center gap-5 rounded-sm border border-border bg-card p-4 transition-colors duration-300 will-change-transform hover:border-brass/50 md:p-5"
        >
          <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-[3px] border border-border bg-background">
            <span aria-hidden className="grid-lines-fine absolute inset-0 opacity-70" />
            <svg aria-hidden viewBox="0 0 64 64" className="relative size-16 text-brass">
              {drawingFor(ins.name).map((d, i) => (
                <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              ))}
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-medium leading-snug">
              {ins.name}
              <TodoMark show={ins.placeholder} />
            </span>
            <span className="mt-1 block font-mono text-[12px] leading-relaxed text-muted-foreground">{ins.use}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
