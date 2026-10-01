"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Routing sheet rows with scroll-linked progress: a brass rule runs down the operation column
 * as the reader scrolls, and each operation lights up and is ticked off when the rule reaches it,
 * mirroring how a job card is signed off op by op on the shop floor. Static under reduced motion.
 */
export function RoutingList({ route }: { route: { op: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);

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
          tl.fromTo(row, { opacity: 0.32 }, { opacity: 1, duration: 0.35 }, i + 0.15);
          tl.fromTo(row.querySelector("[data-tick]"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(2)" }, i + 0.4);
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative">
      {/* progress rail along the OP column */}
      <span aria-hidden className="absolute top-0 bottom-0 left-[1.15rem] w-px bg-border" />
      <span aria-hidden data-fill className="metal-brass absolute top-0 bottom-0 left-[1.15rem] w-px origin-top" />
      {route.map((r) => (
        <li
          key={r.op}
          data-row
          className="relative grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 border-b border-border/60 py-4 pr-5 pl-9 last:border-b-0"
        >
          <span aria-hidden className="absolute top-[1.45rem] left-[0.95rem] size-2 rotate-45 border border-brass bg-card" />
          <span className="font-mono text-sm font-medium text-brass-ink">{r.op}</span>
          <span className="text-[15px]">{r.body}</span>
          <span data-tick className="grid size-5 place-items-center rounded-full bg-brass-soft text-brass-ink">
            <Check strokeWidth={2} className="size-3" aria-label="Operation" />
          </span>
        </li>
      ))}
    </ol>
  );
}
