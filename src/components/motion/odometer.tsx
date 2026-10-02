"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Row height of one digit on a reel, in em. A little over 1 so glyph tops never clip. */
const ROW = 1.15;
/** Each reel holds the digits 0-9 three times; values sit on the last cycle so a roll-in passes two full turns. */
const CYCLES = 3;
const DIGITS = Array.from({ length: 10 * CYCLES }, (_, i) => i % 10);
const target = (d: number) => -(d + 10 * (CYCLES - 1)) * ROW;

/**
 * Mechanical counter: every digit of `value` is a vertical reel that spins and lands, like the
 * cycle counter on a machine. Non-digit characters (".", "+", "M") stay static.
 *
 * mode "scroll": spins in once when it enters the viewport (stats).
 * mode "change": rolls to the new value whenever `value` changes (timeline year).
 * Server render already shows the final value, so it reads correctly without JS or with reduced motion.
 */
export function Odometer({
  value,
  mode = "scroll",
  className,
  stagger = 0.09,
}: {
  value: string;
  mode?: "scroll" | "change";
  className?: string;
  stagger?: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  const chars = value.split("");
  // inline start position comes from the FIRST value only, so React never re-sets it and GSAP owns the reel afterwards
  const [initial] = useState(value);

  useGSAP(
    () => {
      const reels = gsap.utils.toArray<HTMLElement>("[data-reel]", root.current);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const to = (el: HTMLElement) => `${target(Number(el.dataset.reel))}em`;

      if (reduce) {
        reels.forEach((el) => gsap.set(el, { y: to(el) }));
        return;
      }

      if (mode === "scroll") {
        gsap.fromTo(
          reels,
          { y: 0 },
          {
            y: (_i, el: HTMLElement) => to(el),
            duration: 2.1,
            ease: "expo.out",
            stagger: { each: stagger, from: "end" },
            scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
          },
        );
        return;
      }

      // "change": roll from wherever each reel is now to the new digit
      gsap.to(reels, {
        y: (_i, el: HTMLElement) => to(el),
        duration: first.current ? 0 : 0.9,
        ease: "power3.inOut",
        stagger: { each: 0.05, from: "end" },
        overwrite: true,
      });
      first.current = false;
    },
    { scope: root, dependencies: mode === "change" ? [value] : [] },
  );

  return (
    <span ref={root} className={cn("inline-flex items-start tabular", className)} style={{ lineHeight: ROW }}>
      <span className="sr-only">{value}</span>
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} aria-hidden className="relative inline-block overflow-hidden" style={{ height: `${ROW}em` }}>
            <span data-reel={c} className="flex flex-col will-change-transform" style={{ transform: `translateY(${target(Number(/\d/.test(initial[i] ?? "") ? initial[i] : c))}em)` }}>
              {DIGITS.map((d, j) => (
                <span key={j} className="block text-center" style={{ height: `${ROW}em` }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="inline-block" style={{ whiteSpace: "pre" }}>
            {c}
          </span>
        ),
      )}
    </span>
  );
}
