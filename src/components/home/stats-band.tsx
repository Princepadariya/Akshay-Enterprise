"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Odometer } from "@/components/motion/odometer";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TICKS = 25;

/** One row of instrument ticks: every sixth is a major graduation. */
function Scale({ style, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { "data-sweep"?: boolean }) {
  return (
    <span aria-hidden {...rest} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", ...style }}>
      {Array.from({ length: TICKS }, (_, i) => (
        <span key={i} style={{ width: 1, height: i % 6 === 0 ? 12 : 6, background: "currentColor" }} />
      ))}
    </span>
  );
}

/**
 * Company in numbers, read like a machine's counters: each figure spins in on mechanical digit
 * reels (Odometer) while a brass sweep runs along an instrument scale beneath it.
 */
export function StatsBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-sweep]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 2,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Company in numbers" className="container-x py-20 md:py-28">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
        {site.stats.map((s, i) => {
          const decimals = "decimals" in s ? s.decimals : 0;
          return (
            <div key={s.label} className={i > 0 ? "flex flex-col gap-4 lg:border-l lg:border-border lg:px-8" : "flex flex-col gap-4 lg:pr-8"}>
              <dt className="order-2 max-w-[18ch] text-sm leading-snug text-muted-foreground">
                {s.label}
                <TodoMark show={s.placeholder} />
              </dt>
              <dd className="order-1 flex flex-col gap-4">
                <Odometer
                  value={`${s.value.toFixed(decimals)}${s.suffix}`}
                  className="font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl"
                />
                <span className="relative block text-foreground/20">
                  <Scale />
                  <Scale className="text-brass" style={{ position: "absolute", inset: 0 }} data-sweep />
                </span>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
