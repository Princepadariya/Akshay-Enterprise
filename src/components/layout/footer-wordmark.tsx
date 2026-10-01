"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Full-width brand wordmark that closes every page. As the visitor reaches the bottom,
 * the letters rise out of the footer edge one by one (scrubbed to scroll), so the page
 * "signs off" with the name. Static under reduced motion.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current?.querySelector("[data-word]");
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, { type: "chars", charsClass: "inline-block will-change-transform" });
        gsap.fromTo(
          split.chars,
          { yPercent: 105 },
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
          },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none overflow-hidden select-none">
      <p
        data-word
        className="font-display-wide text-center text-[clamp(3.25rem,15.5vw,15rem)] leading-[0.8] whitespace-nowrap font-bold tracking-[-0.045em] text-foreground/[0.07] dark:text-foreground/[0.06]"
      >
        AKSHAY
      </p>
    </div>
  );
}
