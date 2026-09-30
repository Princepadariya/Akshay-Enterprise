"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { MapData } from "@/lib/world-map";

/**
 * Export map. Arcs draw from the Gujarat origin to each region when the map enters view
 * (storytelling: shipments leaving one plant for many markets).
 * Visibility is observed once on the <svg> root; children animate from that single signal.
 */
export function WorldMap({ data, className }: { data: MapData; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const show = reduce || inView;
  const { width, height, dots, origin, pins } = data;

  const arc = (x: number, y: number) => {
    const mx = (origin.x + x) / 2;
    const my = (origin.y + y) / 2;
    const lift = Math.min(18, Math.hypot(x - origin.x, y - origin.y) * 0.35);
    return `M ${origin.x} ${origin.y} Q ${mx} ${my - lift} ${x} ${y}`;
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="World map showing export regions served from Gujarat, India"
    >
      <g fill="currentColor" className="text-foreground/[0.16]">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.24} />
        ))}
      </g>
      <g fill="none" stroke="var(--brass)" strokeWidth={0.22} strokeLinecap="round">
        {pins.map((p, i) => (
          <motion.path
            key={p.region}
            d={arc(p.x, p.y)}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 0.9 } : undefined}
            transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </g>
      {pins.map((p, i) => (
        <motion.g
          key={`pin-${p.region}`}
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: "view-box" }}
        >
          <circle cx={p.x} cy={p.y} r={1.2} fill="var(--brass)" opacity={0.22} />
          <circle cx={p.x} cy={p.y} r={0.55} fill="var(--brass)" />
          <title>{`${p.region}: ${p.countries.join(", ")}`}</title>
        </motion.g>
      ))}
      <g>
        <circle cx={origin.x} cy={origin.y} r={1.6} fill="var(--blueprint)" opacity={0.22} />
        <circle cx={origin.x} cy={origin.y} r={0.7} fill="var(--blueprint)" />
      </g>
    </svg>
  );
}
