"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type SpecGroup = { title: string; rows: { label: string; value: React.ReactNode }[] };

/**
 * Technical spec sheet styled like a printed specification: header strip, lettered groups (A, B, C)
 * on a faint drawing grid, dashed row rules and monospace values. Rows highlight on hover and are
 * revealed in reading order when the sheet scrolls into view (static under reduced motion).
 */
export function SpecTable({
  groups,
  className,
  title = "Specification sheet",
  note,
}: {
  groups: SpecGroup[];
  className?: string;
  title?: string;
  note?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-spec-row]",
          { autoAlpha: 0, x: -10 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative min-w-0 overflow-hidden rounded-sm border border-border bg-card", className)}>
      <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-50" />

      <div className="relative flex items-center justify-between gap-4 border-b border-border bg-surface-2/60 px-5 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
        <span className="min-w-0 truncate">{title}</span>
        {note ? <span className="shrink-0 normal-case tracking-normal">{note}</span> : null}
      </div>

      {groups.map((g, gi) => (
        <section key={g.title} className="relative border-b border-border last:border-b-0">
          <h3 className="flex items-center gap-3 px-5 pt-5 pb-2 font-mono text-[11px] font-medium tracking-[0.14em] text-brass-ink uppercase">
            <span className="grid size-5 place-items-center rounded-[2px] border border-brass/60 text-[10px]">{String.fromCharCode(65 + gi)}</span>
            {g.title}
          </h3>
          <dl className="px-2 pb-3">
            {g.rows.map((r) => (
              <div
                key={r.label}
                data-spec-row
                className="grid gap-1 rounded-sm border-b border-dashed border-border px-3 py-3 transition-colors duration-300 last:border-b-0 hover:bg-brass-soft sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-8"
              >
                <dt className="text-sm text-muted-foreground">{r.label}</dt>
                <dd className="font-mono text-[13px] leading-relaxed text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
