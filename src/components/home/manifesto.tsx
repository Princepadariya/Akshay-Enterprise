"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Statement band with a scroll-scrubbed word reveal: every word starts at 12% opacity and
 * brightens in reading order as the band moves through the viewport, so the sentence is
 * literally read at the speed the visitor scrolls. Brass words mark the materials.
 */
const STATEMENT: { t: string; brass?: boolean }[] = [
  { t: "We" }, { t: "turn" }, { t: "brass,", brass: true }, { t: "stainless", brass: true }, { t: "steel,", brass: true },
  { t: "aluminium", brass: true }, { t: "and" }, { t: "copper", brass: true }, { t: "bar" }, { t: "into" }, { t: "finished" },
  { t: "components." }, { t: "Turned," }, { t: "threaded," }, { t: "knurled," }, { t: "plated," }, { t: "inspected" },
  { t: "and" }, { t: "packed" }, { t: "for" }, { t: "your" }, { t: "assembly" }, { t: "line," }, { t: "from" }, { t: "one" },
  { t: "plant" }, { t: "in" }, { t: "Gujarat." },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word]");
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          "[data-rule]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: 0.6 } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="What we do" className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-[60%] -translate-y-1/2 bg-[radial-gradient(closest-side,var(--brass-soft),transparent)]" />
      <div className="container-x">
        <p className="font-display text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
          {STATEMENT.map((w, i) => (
            <span key={i} data-word className={w.brass ? "text-brass-ink dark:text-brass" : undefined}>
              {w.t}{" "}
            </span>
          ))}
        </p>
        <div className="mt-10 h-px bg-border">
          <div data-rule className="metal-brass h-px origin-left" />
        </div>
      </div>
    </section>
  );
}
