"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A large statement read at scroll speed: each word brightens in order as the block moves through
 * the viewport, with a brass rule drawing underneath. Static under reduced motion.
 */
export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: ref.current, start: "top 78%", end: "bottom 50%", scrub: 0.6 };
        gsap.fromTo("[data-w]", { opacity: 0.12 }, { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: st });
        gsap.fromTo("[data-rule]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <p className="font-display text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
        {text.split(" ").map((w, i) => (
          <span key={i} data-w>
            {w}{" "}
          </span>
        ))}
      </p>
      <div className="mt-10 h-px bg-border">
        <div data-rule className="metal-brass h-px origin-left" />
      </div>
    </div>
  );
}
