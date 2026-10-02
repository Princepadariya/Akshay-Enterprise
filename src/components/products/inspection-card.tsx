"use client";

import { useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Inspection plan as a QC checklist card. When it comes into view each check is stamped in turn,
 * then a circular "Inspected" stamp lands in the corner. Shown fully stamped under reduced motion.
 */
export function InspectionCard({ checks, partName }: { checks: string[]; partName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ringId = useId();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } });
        tl.fromTo("[data-check]", { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "expo.out", stagger: 0.12 })
          .fromTo(
            "[data-stamp-tick]",
            { autoAlpha: 0, scale: 2, rotate: -30 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.35, ease: "back.out(2.2)", stagger: 0.18 },
            0.25,
          )
          .fromTo(
            "[data-stamp]",
            { autoAlpha: 0, scale: 1.7, rotate: 8 },
            { autoAlpha: 1, scale: 1, rotate: -12, duration: 0.45, ease: "back.out(1.6)" },
            ">-0.05",
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative overflow-hidden rounded-sm border border-border bg-graphite p-6 text-paper md:p-8">
      <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-25" />

      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-[10.5px] tracking-[0.14em] text-paper/55 uppercase">
        <span className="min-w-0 truncate">QC checklist / {partName}</span>
        <span className="shrink-0">Every lot</span>
      </div>

      <ol className="relative mt-2">
        {checks.map((c, i) => (
          <li key={c} data-check className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-dashed border-white/10 py-4 last:border-b-0">
            <span className="font-mono text-xs text-brass">C{i + 1}</span>
            <span className="text-[15px] leading-snug text-paper/90">{c}</span>
            <span className="relative grid size-6 place-items-center rounded-full border border-dashed border-white/25">
              <span data-stamp-tick className="absolute inset-0 grid place-items-center rounded-full border border-brass text-brass">
                <Check strokeWidth={2.5} className="size-3.5" aria-label="Checked" />
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
        <p className="max-w-[24ch] text-sm leading-relaxed text-paper/60">Applied to every lot before release.</p>
        {/* circular rubber stamp */}
        <svg data-stamp aria-hidden viewBox="0 0 100 100" className="size-24 shrink-0 text-brass" style={{ transform: "rotate(-12deg)" }}>
          <defs>
            <path id={ringId} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="1" />
          <text fill="currentColor" style={{ font: "600 9.5px var(--font-mono, monospace)", letterSpacing: "0.22em" }}>
            <textPath href={`#${ringId}`}>INSPECTED · LOT RELEASE ·</textPath>
          </text>
          <path d="M39 50 l8 8 l15 -16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
