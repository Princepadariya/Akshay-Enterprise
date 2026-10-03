"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BadgeCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Stage = { stage: string; title: string; checks: string[] };

/**
 * Inspection stages as a gated process line. Large screens: a track runs above the stages from
 * "Bar in" to "Dispatch" with a gate over each stage; scrolling moves a part along the track, and
 * as it reaches each gate the gate turns brass, its stage card lights up and the checks tick off.
 * Small screens: a vertical rail beside the cards, each card lighting as it is reached.
 * Everything is shown cleared under reduced motion.
 */
export function InspectionFlow({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stage]", el);
      const gates = gsap.utils.toArray<HTMLElement>("[data-gate]", el);
      const setOn = (i: number, on: boolean) => {
        cards[i]?.toggleAttribute("data-on", on);
        gates[i]?.toggleAttribute("data-on", on);
      };
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        cards.forEach((_, i) => setOn(i, true));
      });

      // large screens: horizontal track with a travelling part
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = el.querySelector<HTMLElement>("[data-track]")!;
        let stops: number[] = [];
        const measure = () => {
          const t = track.getBoundingClientRect();
          stops = cards.map((c) => {
            const r = c.getBoundingClientRect();
            return (r.left + r.width / 2 - t.left) / t.width; // card centre as a fraction of the track
          });
          gates.forEach((g, i) => gsap.set(g, { left: `${stops[i] * 100}%` }));
        };
        measure();
        const update = (p: number) => {
          gsap.set("[data-fill]", { scaleX: p });
          gsap.set("[data-token]", { left: `${p * 100}%` });
          stops.forEach((s, i) => setOn(i, p >= s - 0.005));
        };
        update(0);
        ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
          onRefresh: (self) => {
            measure();
            update(self.progress);
          },
          onUpdate: (self) => update(self.progress),
        });
        return () => cards.forEach((_, i) => setOn(i, false));
      });

      // small screens: vertical rail, each card lit as it reaches the middle of the screen
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-vfill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 65%", scrub: 0.5 } });
        cards.forEach((c, i) =>
          ScrollTrigger.create({ trigger: c, start: "top 65%", onEnter: () => setOn(i, true), onLeaveBack: () => setOn(i, false) }),
        );
        return () => cards.forEach((_, i) => setOn(i, false));
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {/* process track (large screens) */}
      <div data-track aria-hidden className="relative mb-8 hidden h-16 lg:block">
        <span className="absolute top-0 left-0 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Bar in</span>
        <span className="absolute top-0 right-0 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Dispatch</span>
        <span className="absolute inset-x-0 bottom-5 h-px bg-border" />
        <span data-fill className="absolute inset-x-0 bottom-5 h-0.5 origin-left translate-y-px bg-brass" style={{ transform: "scaleX(0)" }} />
        {/* end stops */}
        <span className="absolute bottom-5 left-0 h-3 w-px translate-y-1/2 bg-foreground/40" />
        <span className="absolute right-0 bottom-5 h-3 w-px translate-y-1/2 bg-foreground/40" />
        {stages.map((s, i) => (
          <span
            key={s.stage}
            data-gate
            className="absolute bottom-5 grid size-9 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-border bg-background font-mono text-[11px] text-muted-foreground transition-[background-color,border-color,color,box-shadow] duration-500 data-[on]:border-brass data-[on]:bg-brass data-[on]:text-graphite data-[on]:shadow-[0_0_0_6px_rgb(207_165_96/0.18)]"
            style={{ left: `${((2 * i + 1) / (stages.length * 2)) * 100}%` }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
        {/* the part travelling the line */}
        <span data-token className="absolute bottom-5 z-[1] -translate-x-1/2 translate-y-1/2" style={{ left: "0%" }}>
          <svg viewBox="0 0 24 24" className="size-6 text-brass drop-shadow-[0_2px_6px_rgb(11_13_16/0.35)]">
            <path d="M12 2 20.7 7v10L12 22 3.3 17V7z" fill="var(--background)" stroke="currentColor" strokeWidth="1.75" />
            <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.75" />
          </svg>
        </span>
      </div>

      <ol className="relative grid gap-5 pl-9 lg:grid-cols-3 lg:gap-6 lg:pl-0">
        {/* vertical rail (small screens) */}
        <span aria-hidden className="absolute top-2 bottom-2 left-3 w-px bg-border lg:hidden">
          <span data-vfill className="absolute inset-0 origin-top bg-brass" style={{ transform: "scaleY(0)" }} />
        </span>

        {stages.map((s, i) => (
          <li
            key={s.stage}
            data-stage
            className="group/stage relative flex flex-col rounded-sm border border-border bg-card p-6 transition-[border-color,box-shadow,transform] duration-500 data-[on]:-translate-y-1 data-[on]:border-brass/60 data-[on]:shadow-[0_24px_50px_-28px_rgb(11_13_16/0.45)] md:p-8"
          >
            {/* rail node (small screens) */}
            <span
              aria-hidden
              className="absolute top-8 -left-[1.95rem] size-3 rotate-45 border border-brass bg-background transition-colors duration-500 group-data-[on]/stage:bg-brass lg:hidden"
            />
            <span aria-hidden className="absolute top-0 left-0 h-[2px] w-16 bg-brass/50 transition-[width,background-color] duration-700 group-data-[on]/stage:w-full group-data-[on]/stage:bg-brass" />

            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs tracking-widest text-brass-ink uppercase">{s.stage}</p>
              <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10.5px] tracking-wide text-muted-foreground">
                Gate {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>

            <ul className="mt-6 mb-7 grid gap-3">
              {s.checks.map((c, j) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <BadgeCheck
                    strokeWidth={1.5}
                    className="mt-0.5 size-4 shrink-0 text-foreground/25 transition-colors duration-300 group-data-[on]/stage:text-brass"
                    style={{ transitionDelay: `${j * 120}ms` }}
                  />
                  {c}
                </li>
              ))}
            </ul>

            {/* gate status */}
            <p className="mt-auto flex items-center gap-2 border-t border-dashed border-border pt-4 font-mono text-[10.5px] tracking-[0.14em] uppercase">
              <span className="size-1.5 rounded-full bg-foreground/25 transition-colors duration-500 group-data-[on]/stage:bg-brass" />
              <span className="text-muted-foreground group-data-[on]/stage:hidden">Awaiting part</span>
              <span className="hidden text-brass-ink group-data-[on]/stage:inline">
                {i < stages.length - 1 ? "Cleared, on to the next gate" : "Cleared, released for dispatch"}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
