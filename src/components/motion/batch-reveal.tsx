"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Grid entrance via ScrollTrigger.batch: items that enter the viewport together rise in one
 * staggered group, so a long grid reveals row by row instead of all at once or one by one.
 * Wrap a grid (ul / div); its direct children are the items. Static under reduced motion.
 */
export function BatchReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = ref.current?.firstElementChild;
      if (!grid) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = Array.from(grid.children) as HTMLElement[];
        gsap.set(items, { autoAlpha: 0, y: 48 });
        const triggers = ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }),
        });
        return () => triggers.forEach((t) => t.kill());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
