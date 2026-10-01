"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Masked line-by-line heading reveal (GSAP SplitText).
 * trigger="scroll" (default): lines rise when the heading enters the viewport.
 * trigger="load": lines rise immediately after hydration (for above-the-fold page titles).
 * autoSplit re-splits on resize / font load so line breaks always match the layout.
 * Under reduced motion the text is never split and renders static.
 */
export function SplitReveal({
  as: Comp = "h2",
  className,
  children,
  id,
  trigger = "scroll",
  delay = 0,
}: {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  id?: string;
  trigger?: "scroll" | "load";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: trigger === "load" ? 1.2 : 1.1,
              ease: "expo.out",
              stagger: 0.08,
              delay,
              ...(trigger === "scroll" ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } } : {}),
            }),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Comp ref={ref} id={id} className={className}>
      {children}
    </Comp>
  );
}
