"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { processSteps } from "@/content/capabilities";
import { photos } from "@/content/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Manufacturing route as a pinned horizontal pan (storytelling: a part moving through the shop in order).
 * Every screen size: pinned, scrubbed pan driven by normal vertical scrolling, with a brass progress rule.
 * Reduced motion only: native horizontal scroll-snap, no pinning.
 * Operation numbers (OP 10, OP 20...) follow the convention of a real process routing sheet.
 */
export function ProcessScroll() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
            anticipatePin: 1,
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
      <div className="relative flex min-h-[100svh] flex-col justify-center motion-reduce:py-20">
        <div
          ref={track}
          className="flex w-max gap-4 px-4 md:px-8 lg:gap-6 lg:px-12 motion-reduce:w-auto motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:pb-4 motion-reduce:[scrollbar-width:none]"
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
              className="relative flex h-[30rem] w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-border bg-card sm:w-[46vw] lg:h-[32rem] lg:w-[22rem]"
            >
              <div className="relative h-44 shrink-0 overflow-hidden border-b border-border bg-surface lg:h-52">
                <Image src={photos[s.image].src} alt={photos[s.image].alt} fill sizes="(min-width: 1024px) 22rem, (min-width: 640px) 46vw, 78vw" className="object-cover" />
                <span className="absolute top-4 left-4 rounded-sm bg-background/90 px-2 py-1 font-mono text-xs tracking-widest text-brass-ink backdrop-blur-sm">
                  OP {(i + 1) * 10}
                </span>
              </div>
              <div className="relative flex flex-1 flex-col justify-between p-6 lg:p-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 bottom-2 font-display-wide text-[7rem] leading-none font-bold text-foreground/[0.05] select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                <span className="relative font-mono text-[11px] text-muted-foreground">{s.spec}</span>
              </div>
              <span aria-hidden className="metal-brass absolute bottom-0 left-0 h-[2px] w-12" />
            </article>
          ))}
          <div aria-hidden className="w-4 shrink-0 lg:w-[8vw]" />
        </div>
        <div aria-hidden className="absolute right-4 bottom-10 left-4 h-px bg-border motion-reduce:hidden md:right-8 md:left-8 lg:right-12 lg:left-12">
          <div ref={bar} className="metal-brass h-px origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}
