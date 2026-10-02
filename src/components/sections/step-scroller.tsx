"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/sections/section-header";
import { photos, type PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = { title: string; body: string; image: PhotoKey };

/**
 * Sticky step scroller: the heading and a photo stay pinned on the left while steps scroll on the
 * right. The step crossing the middle of the screen becomes active; its photo cross-fades in
 * (GSAP) and a brass bar marks it, so the picture always matches the step being read.
 */
export function StepScroller({ title, lead, steps }: { title: string; lead: string; steps: Step[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Which step is active: one ScrollTrigger per step around the viewport midline.
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root },
  );

  // Cross-fade photos whenever the active step changes.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.utils.toArray<HTMLElement>("[data-shot]").forEach((shot, i) => {
        const on = i === active;
        gsap.to(shot, { autoAlpha: on ? 1 : 0, scale: on ? 1 : 1.08, duration: reduce ? 0 : 0.9, ease: "expo.out", overwrite: "auto" });
      });
      gsap.to("[data-step-bar]", { scaleY: 0, duration: reduce ? 0 : 0.4, ease: "expo.out", overwrite: "auto" });
      gsap.to(`[data-step-bar="${active}"]`, { scaleY: 1, duration: reduce ? 0 : 0.6, ease: "expo.out", overwrite: "auto" });
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <section ref={root} className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <SectionHeader title={title} lead={lead} />
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm border border-border lg:block">
            {steps.map((s, i) => (
              <div key={s.title} data-shot className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                <Image src={photos[s.image].src} alt={photos[s.image].alt} fill sizes="40vw" className="object-cover" />
              </div>
            ))}
            <span className="absolute bottom-3 left-3 z-[2] rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[11px] text-paper">
              {steps[active].title}
            </span>
          </div>
        </div>
      </div>
      <ol className="lg:col-span-7">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step
            className={cn(
              "relative grid grid-cols-[3.5rem_1fr] gap-4 border-t border-border py-10 transition-opacity duration-500 lg:py-14",
              i === active ? "lg:opacity-100" : "lg:opacity-40",
            )}
          >
            <span aria-hidden data-step-bar={i} className="metal-brass absolute top-0 left-0 hidden h-full w-[2px] origin-top scale-y-0 lg:block" />
            <span className="pl-4 font-mono text-sm text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-[52ch] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
