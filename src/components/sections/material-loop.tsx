"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Stages of the brass loop, clockwise from the top (from the chip-recovery pillar text). */
const STAGES = [
  "Bar stock",
  "Turning",
  "Chips sorted by alloy",
  "De-oiled",
  "Remelted at the mill",
];
const R = 38; // ring radius as % of the square diagram (viewBox 0..100)

const point = (i: number, r = R) => {
  const a = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + Math.cos(a) * r,
    y: 50 + Math.sin(a) * r,
    cos: Math.cos(a),
    sin: Math.sin(a),
  };
};

/**
 * The brass loop as a circular flow diagram. Scrolling draws the ring and lights each stage as the
 * line reaches it; once drawn, a brass marker keeps travelling round the loop (only while on screen).
 * Shown complete and still under reduced motion.
 */
export function MaterialLoop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ring =
          root.current!.querySelector<SVGCircleElement>("[data-ring]")!;
        const len = 2 * Math.PI * R;
        gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set("[data-node]", {
          scale: 0.4,
          autoAlpha: 0.25,
          transformOrigin: "50% 50%",
        });
        gsap.set("[data-label]", { autoAlpha: 0.3 });
        gsap.set("[data-orbit]", { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.6,
          },
        });
        tl.to(ring, { strokeDashoffset: 0, duration: STAGES.length }, 0);
        STAGES.forEach((_, i) => {
          tl.to(
            `[data-node="${i}"]`,
            { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(2)" },
            i,
          );
          tl.to(`[data-label="${i}"]`, { autoAlpha: 1, duration: 0.3 }, i);
        });
        tl.to(
          "[data-orbit]",
          { autoAlpha: 1, duration: 0.3 },
          STAGES.length - 0.3,
        );

        // continuous orbit once the loop is drawn; paused off screen
        const spin = gsap.to("[data-orbit]", {
          rotation: 360,
          svgOrigin: "50 50",
          duration: 14,
          ease: "none",
          repeat: -1,
          paused: true,
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div ref={root} className="relative aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden
        >
          {/* base ring + drawn brass ring (starts at 12 o'clock, runs clockwise) */}
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            className="stroke-border"
            strokeWidth="0.35"
          />
          <circle
            data-ring
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--brass)"
            strokeWidth="0.7"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          {/* direction chevrons between stages */}
          {STAGES.map((_, i) => {
            const a = ((i + 0.5) / STAGES.length) * 360 - 90;
            return (
              <g key={`c${i}`} transform={`rotate(${a + 90} 50 50)`}>
                <path
                  d={`M48.9 ${50 - R - 0.9} L50.3 ${50 - R} L48.9 ${50 - R + 0.9}`}
                  fill="none"
                  stroke="var(--brass)"
                  strokeWidth="0.45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              </g>
            );
          })}
          {/* stage nodes */}
          {STAGES.map((_, i) => {
            const p = point(i);
            return (
              <g key={i} data-node={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="2.6"
                  className="fill-background"
                  stroke="var(--brass)"
                  strokeWidth="0.5"
                />
                <circle cx={p.x} cy={p.y} r="1.2" fill="var(--brass)" />
              </g>
            );
          })}
          {/* travelling marker */}
          <g data-orbit>
            <circle cx="50" cy={50 - R} r="1.6" fill="var(--brass)" />
            <circle
              cx="50"
              cy={50 - R}
              r="3.4"
              fill="none"
              stroke="var(--brass)"
              strokeWidth="0.3"
              opacity="0.5"
            />
          </g>
          {/* centre: hex bar end */}
          <path
            d="M50 37.5 L60.8 43.75 L60.8 56.25 L50 62.5 L39.2 56.25 L39.2 43.75 Z"
            fill="var(--brass-soft)"
            stroke="var(--brass)"
            strokeWidth="0.5"
          />
        </svg>

        {/* centre caption */}
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              Brass
            </p>
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              kept in the loop
            </p>
          </div>
        </div>

        {/* stage labels, placed just outside each node */}
        {STAGES.map((s, i) => {
          const p = point(i, R + 8);
          const align =
            Math.abs(p.cos) < 0.2 ? "center" : p.cos > 0 ? "left" : "right";
          return (
            <p
              key={s}
              data-label={i}
              className="absolute max-w-[8.5rem] font-mono text-[10.5px] leading-tight tracking-wide text-foreground uppercase md:text-[11px]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                textAlign: align,
                transform: `translate(${align === "center" ? "-50%" : align === "left" ? "0" : "-100%"}, ${p.sin < -0.5 ? "-100%" : p.sin > 0.5 ? "0" : "-50%"})`,
              }}
            >
              <span className="block text-brass-ink lg:mb-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* full label only where there is room beside the ring; small screens use the legend below */}
              <span className="hidden lg:inline">{s}</span>
            </p>
          );
        })}
      </div>

      {/* small screens: stage names as a legend under the ring */}
      <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 lg:hidden">
        {STAGES.map((s, i) => (
          <li
            key={s}
            className="flex gap-2 font-mono text-[11px] tracking-wide uppercase"
          >
            <span className="text-brass-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
