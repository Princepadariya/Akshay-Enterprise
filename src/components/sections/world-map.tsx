"use client";

import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { MapData } from "@/lib/world-map";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Export map, animated with GSAP when it scrolls into view.
 *
 * Performance design: the ~2,900 land dots are NOT DOM nodes. They live in one static SVG file
 * (/map-dots.svg) used as a CSS mask on a single div, so the browser rasterises them once and
 * never repaints them. Only the small overlay (routes, pins, labels) animates.
 *
 *  1. the land reveals as a circular wave expanding from the Gujarat plant (one clip-path tween),
 *  2. routes draw from the plant to each region, pins and labels settle in,
 *  3. loop: shipment pulses travel each route at staggered intervals, the plant beacon pulses,
 *     destinations echo. Loops pause whenever the map is off screen.
 * `active` highlights one region's route. Reduced motion: final state, no loops.
 */
export function WorldMap({
  data,
  className,
  active = null,
  onActiveChange,
}: {
  data: MapData;
  className?: string;
  active?: string | null;
  onActiveChange?: (region: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height, origin, pins } = data;
  const ox = ((origin.x / width) * 100).toFixed(2);
  const oy = ((origin.y / height) * 100).toFixed(2);

  const arcs = useMemo(
    () =>
      pins.map((p) => {
        const mx = (origin.x + p.x) / 2;
        const my = (origin.y + p.y) / 2;
        const lift = Math.min(18, Math.hypot(p.x - origin.x, p.y - origin.y) * 0.35);
        return { region: p.region, d: `M ${origin.x} ${origin.y} Q ${mx} ${my - lift} ${p.x} ${p.y}` };
      }),
    [pins, origin],
  );

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const land = root.querySelector("[data-land]");
        gsap.set(land, { clipPath: `circle(0% at ${ox}% ${oy}%)` });
        gsap.set("[data-route]", { strokeDashoffset: 1 });
        gsap.set("[data-pin], [data-label]", { autoAlpha: 0 });
        gsap.set("[data-pin]", { scale: 0, transformOrigin: "50% 50%" });

        const loops: gsap.core.Animation[] = [];
        const intro = gsap.timeline({ paused: true, onComplete: () => loops.forEach((l) => l.play()) });
        intro
          .to(land, { clipPath: `circle(120% at ${ox}% ${oy}%)`, duration: 1.8, ease: "power2.out" }, 0)
          .fromTo("[data-wave]", { attr: { r: 0 }, autoAlpha: 0.55 }, { attr: { r: width * 0.75 }, autoAlpha: 0, duration: 1.8, ease: "power2.out" }, 0)
          .to("[data-route]", { strokeDashoffset: 0, duration: 1.5, ease: "expo.inOut", stagger: 0.12 }, 0.45)
          .to("[data-pin]", { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.5)", stagger: 0.12 }, 1.2)
          .to("[data-label]", { autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 1.45);

        gsap.utils.toArray<SVGGElement>("[data-arc]").forEach((arc, i) => {
          const pulse = arc.querySelectorAll("[data-comet]");
          const duration = 2.6 + (i % 3) * 0.5;
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 + i * 0.35, delay: i * 0.45, paused: true });
          tl.set(pulse, { autoAlpha: 1 })
            .fromTo(pulse, { strokeDashoffset: 0.08 }, { strokeDashoffset: -1, duration, ease: "power1.inOut" }, 0)
            .set(pulse, { autoAlpha: 0 });
          loops.push(tl);
        });
        loops.push(
          gsap.fromTo("[data-beacon]", { attr: { r: 0.8 }, autoAlpha: 0.7 }, { attr: { r: 4.2 }, autoAlpha: 0, duration: 2.2, ease: "expo.out", repeat: -1, paused: true }),
        );
        gsap.utils.toArray<SVGCircleElement>("[data-echo]").forEach((e, i) => {
          loops.push(
            gsap.fromTo(e, { attr: { r: 0.6 }, autoAlpha: 0.6 }, { attr: { r: 2.6 }, autoAlpha: 0, duration: 2, ease: "expo.out", repeat: -1, repeatDelay: 1.8, delay: i * 0.4, paused: true }),
          );
        });

        ScrollTrigger.create({ trigger: root, start: "top 78%", once: true, onEnter: () => intro.play() });
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (intro.progress() < 1) return;
            loops.forEach((l) => (self.isActive ? l.play() : l.pause()));
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative", className)} onMouseLeave={() => onActiveChange?.(null)}>
      {/* Static land layer: one cached SVG used as a mask, tinted with the theme colour. */}
      <div
        data-land
        aria-hidden
        className="absolute inset-0 bg-foreground/[0.2] will-change-[clip-path]"
        style={{
          maskImage: "url(/map-dots.svg)",
          WebkitMaskImage: "url(/map-dots.svg)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      {/* Animated overlay: routes, pins, labels only. */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative block h-auto w-full overflow-visible"
        role="img"
        aria-label="World map showing export routes from Gujarat, India to each region served"
      >
        <defs>
          <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--blueprint)" />
            <stop offset="1" stopColor="var(--brass)" />
          </linearGradient>
        </defs>

        <circle data-wave cx={origin.x} cy={origin.y} r={0} fill="none" stroke="var(--blueprint)" strokeWidth={0.3} opacity={0} />

        <g fill="none" strokeLinecap="round">
          {arcs.map((a) => {
            const dim = active && active !== a.region;
            const on = active === a.region;
            return (
              <g key={a.region} data-arc className="transition-opacity duration-500" style={{ opacity: dim ? 0.18 : 1 }}>
                <path data-route d={a.d} pathLength={1} strokeDasharray="1" stroke="url(#route-grad)" strokeWidth={on ? 0.42 : 0.24} className="transition-[stroke-width] duration-300" />
                {/* shipment pulse: soft halo + bright core travelling along the route (no SVG filters) */}
                <path data-comet d={a.d} pathLength={1} strokeDasharray="0.07 1" stroke="var(--brass)" strokeOpacity={0.35} strokeWidth={1.1} opacity={0} />
                <path data-comet d={a.d} pathLength={1} strokeDasharray="0.035 1" stroke="#fff3d6" strokeWidth={0.38} opacity={0} />
              </g>
            );
          })}
        </g>

        {pins.map((p) => {
          const on = active === p.region;
          const dim = active && !on;
          const nearOriginOnLeft = p.x < origin.x && Math.hypot(p.x - origin.x, p.y - origin.y) < 14;
          const labelLeft = p.x > width * 0.72 || nearOriginOnLeft;
          return (
            <g
              key={p.region}
              className="cursor-pointer transition-opacity duration-500"
              style={{ opacity: dim ? 0.3 : 1 }}
              onMouseEnter={() => onActiveChange?.(p.region)}
              onFocus={() => onActiveChange?.(p.region)}
              tabIndex={onActiveChange ? 0 : undefined}
              role={onActiveChange ? "button" : undefined}
              aria-label={`${p.region}: ${p.countries.join(", ")}`}
            >
              <circle data-echo cx={p.x} cy={p.y} r={0.6} fill="none" stroke="var(--brass)" strokeWidth={0.18} opacity={0} />
              <g data-pin>
                <circle cx={p.x} cy={p.y} r={on ? 1.6 : 1.15} fill="var(--brass)" opacity={0.22} className="transition-all duration-300" />
                <circle cx={p.x} cy={p.y} r={0.55} fill="var(--brass)" />
              </g>
              <text
                data-label
                x={labelLeft ? p.x - 1.8 : p.x + 1.8}
                y={p.y + 0.6}
                textAnchor={labelLeft ? "end" : "start"}
                className="fill-foreground font-mono"
                style={{ fontSize: on ? 2 : 1.65, paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 0.7, transition: "font-size .3s" }}
              >
                {p.region.toUpperCase()}
              </text>
              <circle cx={p.x} cy={p.y} r={3.2} fill="transparent" />
            </g>
          );
        })}

        <g>
          <circle data-beacon cx={origin.x} cy={origin.y} r={0.8} fill="none" stroke="var(--blueprint)" strokeWidth={0.22} opacity={0} />
          <circle cx={origin.x} cy={origin.y} r={1.7} fill="var(--blueprint)" opacity={0.22} />
          <circle cx={origin.x} cy={origin.y} r={0.75} fill="var(--blueprint)" />
          <text
            data-label
            x={origin.x}
            y={origin.y + 3.6}
            textAnchor="middle"
            className="fill-blueprint font-mono"
            style={{ fontSize: 1.65, paintOrder: "stroke", stroke: "var(--surface)", strokeWidth: 0.7 }}
          >
            GUJARAT PLANT
          </text>
        </g>
      </svg>
    </div>
  );
}
