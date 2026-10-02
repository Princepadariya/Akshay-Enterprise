"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Routing sheet rows with scroll-linked sign-off: a brass rule runs down the operation column as
 * the reader scrolls; when it reaches an operation, that op's diamond fills and its sign-off circle
 * is ticked, the way a job card is signed off op by op. Rows stay fully readable throughout.
 * Shown fully signed off under reduced motion.
 */
export function RoutingList({ route }: { route: { op: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 55%", scrub: 0.5 },
        });
        tl.fromTo("[data-fill]", { scaleY: 0 }, { scaleY: 1, duration: rows.length }, 0);
        rows.forEach((row, i) => {
          tl.fromTo(row.querySelector("[data-node]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.25 }, i + 0.2);
          tl.fromTo(
            row.querySelector("[data-tick]"),
            { autoAlpha: 0, scale: 1.8, rotate: -25 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2)" },
            i + 0.4,
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      {/* column headings, like the printed sheet */}
      <div className="grid grid-cols-[4.5rem_1fr_auto] gap-4 border-b border-border py-2.5 pr-5 pl-9 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
        <span>Op</span>
        <span>Operation</span>
        <span>Sign-off</span>
      </div>
      <ol className="relative">
        {/* progress rail along the OP column */}
        <span aria-hidden className="absolute top-0 bottom-0 left-[1.15rem] w-px bg-border" />
        <span aria-hidden data-fill className="metal-brass absolute top-0 bottom-0 left-[1.15rem] w-px origin-top" />
        {route.map((r) => (
          <li
            key={r.op}
            data-row
            className="relative grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-border/60 py-4 pr-5 pl-9 transition-colors duration-300 last:border-b-0 hover:bg-brass-soft md:py-5"
          >
            {/* diamond node: outline always, brass fill when signed off */}
            <span aria-hidden className="absolute top-1/2 left-[0.9rem] size-2.5 -translate-y-1/2 rotate-45 border border-brass bg-card">
              <span data-node className="absolute inset-0 bg-brass" />
            </span>
            <span className="font-mono text-sm font-medium text-brass-ink">{r.op}</span>
            <span className="text-[15px] leading-snug">{r.body}</span>
            {/* sign-off circle: dashed ring always, brass tick stamped in */}
            <span className="relative grid size-6 place-items-center rounded-full border border-dashed border-foreground/25">
              <span data-tick className="absolute inset-0 grid place-items-center rounded-full bg-brass text-graphite">
                <Check strokeWidth={2.5} className="size-3.5" aria-label="Signed off" />
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
