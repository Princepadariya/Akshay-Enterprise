"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Loader } from "lucide-react";
import { TodoMark } from "@/components/todo-mark";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Item = { item: string; area: string; state: "in-place" | "evaluating" };

/** hatched brass, for items still under evaluation */
const HATCH = "repeating-linear-gradient(135deg, var(--brass) 0 2px, transparent 2px 6px)";

/**
 * Status board for sustainability practices: a segmented progress bar (one segment per practice,
 * solid when in place, hatched when under evaluation) above a list whose status tags stamp in as
 * the board scrolls into view. Counts are computed from the data. Static under reduced motion.
 */
export function StatusBoard({ items, placeholder }: { items: Item[]; placeholder?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const done = items.filter((i) => i.state === "in-place").length;
  const evaluating = items.length - done;
  // in-place first in the bar so it reads as progress from left to right
  const bar = [...items].sort((a, b) => (a.state === b.state ? 0 : a.state === "in-place" ? -1 : 1));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } });
        tl.fromTo("[data-seg]", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 })
          .fromTo("[data-status-row]", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "expo.out", stagger: 0.06 }, 0.2)
          .fromTo(
            "[data-tag]",
            { autoAlpha: 0, scale: 1.5, rotate: -8 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.35, ease: "back.out(2)", stagger: 0.06 },
            0.45,
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative overflow-hidden rounded-sm border border-border bg-card">
      <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-50" />

      {/* header strip with legend */}
      <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border bg-surface-2/60 px-5 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
        <span className="flex items-center">
          Status board
          <TodoMark show={placeholder} />
        </span>
        <span className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-[2px] bg-brass" />
            In place
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-[2px] border border-brass" style={{ background: HATCH }} />
            Under evaluation
          </span>
        </span>
      </div>

      {/* summary + segmented bar */}
      <div className="relative grid gap-5 border-b border-border px-5 py-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:px-7">
        <p className="flex items-baseline gap-3">
          <span className="font-display text-5xl font-semibold tracking-[-0.04em] tabular">{done}</span>
          <span className="text-sm text-muted-foreground">
            of {items.length} in place
            <br />
            {evaluating} under evaluation
          </span>
        </p>
        <div className="flex gap-1.5" role="img" aria-label={`${done} of ${items.length} practices in place, ${evaluating} under evaluation`}>
          {bar.map((s) => (
            <span
              key={s.item}
              data-seg
              className={cn("h-3 flex-1 origin-left rounded-[2px]", s.state === "in-place" ? "bg-brass" : "border border-brass")}
              style={s.state === "evaluating" ? { background: HATCH } : undefined}
            />
          ))}
        </div>
      </div>

      {/* practices */}
      <ul className="relative">
        {items.map((s) => {
          const ok = s.state === "in-place";
          return (
            <li
              key={s.item}
              data-status-row
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-dashed border-border px-5 py-4 transition-colors duration-300 last:border-b-0 hover:bg-brass-soft md:grid-cols-[10rem_1fr_auto] md:px-7"
            >
              <span className="col-span-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase md:col-span-1">{s.area}</span>
              <span className="text-[15px] leading-snug">{s.item}</span>
              <span
                data-tag
                className={cn(
                  "inline-flex items-center gap-1.5 justify-self-end rounded-full px-2.5 py-1 font-mono text-[10.5px] tracking-wide whitespace-nowrap uppercase",
                  ok ? "bg-brass text-graphite" : "border border-dashed border-brass text-brass-ink",
                )}
              >
                {ok ? <Check strokeWidth={2.5} className="size-3" aria-hidden /> : <Loader strokeWidth={2} className="size-3" aria-hidden />}
                {ok ? "In place" : "Under evaluation"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
