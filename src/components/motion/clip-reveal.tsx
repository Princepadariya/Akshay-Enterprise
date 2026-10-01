"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/**
 * Hero media reveal: the frame wipes open from the bottom edge (clip-path) while the
 * picture inside settles from a slight zoom, like a shutter lifting. Runs once on load.
 * The element is fully visible in the server HTML; GSAP only takes over after hydration,
 * and not at all under reduced motion.
 */
export function ClipReveal({ children, className, delay = 0.15 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay, defaults: { ease: "expo.inOut" } });
        tl.fromTo(ref.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 });
        tl.fromTo(ref.current!.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-[clip-path]", className)}>
      {children}
    </div>
  );
}
