"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/content/capabilities";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Manufacturing route as a pinned horizontal pan (storytelling: a part moving through the shop in order).
 * Desktop + motion allowed: pinned, scrubbed pan with a brass progress rule.
 * Mobile or reduced motion: native horizontal scroll-snap, no pinning.
 * Operation numbers (OP 10, OP 20...) follow the convention of a real process routing sheet.
 */
export function ProcessScroll() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          bar.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${distance()}`, scrub: 1, invalidateOnRefresh: true },
          },
        );
        return () => tween.kill();
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} aria-labelledby="process-title" className="relative overflow-hidden border-t border-border">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="relative flex min-h-[100dvh] flex-col justify-center py-20 lg:py-0">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-8 lg:w-max lg:snap-none lg:overflow-visible lg:gap-6 lg:px-12 lg:pb-0"
        >
          <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center gap-6 pr-6 sm:w-[60vw] lg:w-[34vw] lg:pr-12">
            <h2 id="process-title" className="max-w-[16ch] font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-6xl">
              How an order moves through the shop
            </h2>
            <p className="max-w-[40ch] leading-relaxed text-muted-foreground">
              Every order follows the same routing, with an inspection gate before the part moves on.
            </p>
          </div>
          {processSteps.map((s, i) => (
            <article
              key={s.title}
              className="relative flex h-[26rem] w-[78vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-sm border border-border bg-card p-6 sm:w-[46vw] lg:h-[30rem] lg:w-[22rem] lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-brass-ink">OP {(i + 1) * 10}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{s.spec}</span>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-display-wide text-[10rem] leading-none font-bold text-foreground/[0.04] select-none"
              >
                {(i + 1) * 10}
              </span>
              <div className="relative min-h-[8.5rem]">
                <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
              <span aria-hidden className="metal-brass absolute bottom-0 left-0 h-[2px] w-12" />
            </article>
          ))}
          <div aria-hidden className="w-4 shrink-0 lg:w-[8vw]" />
        </div>
        <div aria-hidden className="absolute right-12 bottom-10 left-12 hidden h-px bg-border lg:block">
          <div ref={bar} className="metal-brass h-px origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}
