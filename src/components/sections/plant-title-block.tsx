"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Field = { label: string; value: string; placeholder?: boolean };

/**
 * Plant facts laid out like the title block in the corner of an engineering drawing: heavy outer
 * frame, ruled cells with small caption labels, a utilities list and a sheet cell. The frame draws
 * itself edge by edge and the cells fill in when it scrolls into view (static under reduced motion).
 */
export function PlantTitleBlock({ fields, utilities }: { fields: Field[]; utilities: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.35 }, scrollTrigger: { trigger: ref.current, start: "top 78%", once: true } });
        // frame drawn clockwise: top, right, bottom, left
        tl.fromTo('[data-edge="t"]', { scaleX: 0 }, { scaleX: 1 })
          .fromTo('[data-edge="r"]', { scaleY: 0 }, { scaleY: 1 })
          .fromTo('[data-edge="b"]', { scaleX: 0 }, { scaleX: 1 })
          .fromTo('[data-edge="l"]', { scaleY: 0 }, { scaleY: 1 })
          .fromTo("[data-cell]", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "expo.out", stagger: 0.07 }, 0.3);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const cell = "relative border-border p-4 md:p-5";
  const caption = "font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase";

  return (
    <div ref={ref} className="relative bg-card">
      <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-50" />
      {/* heavy outer frame, drawn on scroll */}
      <span aria-hidden data-edge="t" className="absolute inset-x-0 top-0 z-[1] h-0.5 origin-left bg-foreground/70" />
      <span aria-hidden data-edge="r" className="absolute inset-y-0 right-0 z-[1] w-0.5 origin-top bg-foreground/70" />
      <span aria-hidden data-edge="b" className="absolute inset-x-0 bottom-0 z-[1] h-0.5 origin-right bg-foreground/70" />
      <span aria-hidden data-edge="l" className="absolute inset-y-0 left-0 z-[1] w-0.5 origin-bottom bg-foreground/70" />

      <div className="relative grid sm:grid-cols-2">
        {/* title row */}
        <div data-cell className={`${cell} border-b sm:col-span-2`}>
          <p className={caption}>Site</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">{site.legalName}</p>
          <p className="mt-1 font-mono text-[12px] text-muted-foreground">Turning, milling, inspection and packing</p>
        </div>

        {/* fact cells */}
        {fields.map((f, i) => (
          <div key={f.label} data-cell className={`${cell} border-b ${i % 2 === 0 ? "sm:border-r" : ""}`}>
            <p className={caption}>{f.label}</p>
            <p className="mt-1.5 font-display text-lg leading-snug font-semibold tracking-tight md:text-xl">
              {f.value}
              <TodoMark show={f.placeholder} />
            </p>
          </div>
        ))}

        {/* utilities */}
        <div data-cell className={`${cell} border-b sm:col-span-2`}>
          <p className={caption}>Services on site</p>
          <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {utilities.map((u, i) => (
              <li key={u} className="flex gap-3 text-[15px]">
                <span className="font-mono text-xs text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
                {u}
              </li>
            ))}
          </ol>
        </div>

        {/* maker cell */}
        <div data-cell className={`${cell} flex items-center justify-between gap-4 sm:col-span-2`}>
          <span className={caption}>Sheet 1 of 1</span>
          <svg aria-hidden viewBox="0 0 24 24" className="size-6 text-brass">
            <path d="M12 2 20.7 7v10L12 22 3.3 17V7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
