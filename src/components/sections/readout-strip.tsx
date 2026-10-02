"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Odometer } from "@/components/motion/odometer";
import { InstrumentScale } from "@/components/sections/instrument-scale";
import { TodoMark } from "@/components/todo-mark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Key tolerances shown as instrument readouts: ruled cells, figures on digit reels and a brass
 * sweep along a tick scale, matching the home page counters. Static under reduced motion.
 */
export function ReadoutStrip({ items }: { items: { label: string; value: string; unit: string }[] }) {
  const ref = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-sweep]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <dl ref={ref} className="grid grid-cols-2 border-l border-border md:grid-cols-4">
      {items.map((t) => (
        <div key={t.label} className="flex flex-col gap-3 border-r border-b border-border p-5 md:border-b-0 md:p-6">
          <dt className="order-1 flex items-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {t.label}
            <TodoMark />
          </dt>
          <dd className="order-2 flex flex-col gap-4">
            <span className="flex items-baseline gap-2">
              <Odometer value={t.value} stagger={0.07} className="font-mono text-3xl font-medium tracking-tight md:text-4xl" />
              <span className="text-sm text-muted-foreground">{t.unit}</span>
            </span>
            <span className="relative block text-foreground/20">
              <InstrumentScale ticks={19} />
              <InstrumentScale ticks={19} className="text-brass" style={{ position: "absolute", inset: 0 }} data-sweep />
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
