"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Odometer } from "@/components/motion/odometer";
import type { Milestone } from "@/content/timeline";
import { TodoMark } from "@/components/todo-mark";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Milestones with a sticky year counter. On large screens a big year sits pinned beside the list
 * and rolls on mechanical digit reels (Odometer) to each milestone's year as it crosses the middle
 * of the screen; the active milestone brightens and a brass rule tracks progress.
 * On small screens it is a plain vertical list with the year on each entry.
 */
export function Timeline({ items }: { items: Milestone[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = items[active];

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-list]", start: "top 55%", end: "bottom 55%", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* sticky year counter */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-32">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <div className="mt-4 flex items-start gap-3">
            <Odometer
              value={current.year}
              mode="change"
              className="font-display-wide text-[clamp(5rem,9vw,9rem)] font-bold tracking-[-0.05em] text-foreground"
            />
            <TodoMark show={current.placeholder} className="mt-4" />
          </div>
          <p className="mt-6 max-w-[24ch] font-display text-2xl leading-tight font-semibold tracking-tight">{current.title}</p>
        </div>
      </div>

      {/* milestones */}
      <ol data-list className="relative lg:col-span-7">
        <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-border" />
        <span aria-hidden data-progress className="metal-brass absolute top-0 bottom-0 left-0 hidden w-px origin-top lg:block" style={{ transform: "scaleY(0)" }} />
        {items.map((m, i) => (
          <li
            key={`${m.year}-${i}`}
            data-milestone
            className={cn(
              "relative pb-14 pl-8 transition-opacity duration-500 last:pb-0 md:pl-12 lg:flex lg:min-h-[42vh] lg:flex-col lg:justify-center lg:pb-0",
              i === active ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-2.5 left-0 size-2.5 -translate-x-1/2 rotate-45 border border-brass transition-colors duration-500 lg:top-1/2",
                i <= active ? "bg-brass" : "bg-background",
              )}
            />
            <p className="font-mono text-sm tracking-wide text-brass-ink">
              {m.year}
              <TodoMark show={m.placeholder} />
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-3xl">{m.title}</h3>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">{m.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
