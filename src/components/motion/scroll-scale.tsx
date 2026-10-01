"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Image scale & fade on scroll: the wrapped media grows from 85% to full size as it enters,
 * then dims as it scrolls out, so attention passes to the next section. Static under reduced motion.
 */
export function ScrollScale({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { scale: 0.85, borderRadius: 24 },
          { scale: 1, borderRadius: 2, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "center 60%", scrub: true } },
        );
        gsap.to(ref.current, {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "bottom 45%", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("origin-center overflow-hidden will-change-transform", className)}>
      {children}
    </div>
  );
}
