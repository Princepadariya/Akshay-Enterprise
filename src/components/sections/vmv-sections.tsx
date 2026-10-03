"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { visionMissionValues as vmv } from "@/content/company";
import { getIcon, ICON_STROKE } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Vision and mission as statements read at scroll speed: each word brightens in order as the
 * block moves through the viewport (same treatment as the home page manifesto), with a brass
 * rule drawing underneath. Static under reduced motion.
 */
export function VmvStatements() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-statement]").forEach((block) => {
          const st = { trigger: block, start: "top 78%", end: "bottom 50%", scrub: 0.6 };
          gsap.fromTo(block.querySelectorAll("[data-w]"), { "--p": 0 }, { "--p": 1, ease: "none", stagger: 0.05, scrollTrigger: st });
          gsap.fromTo(block.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-16 md:gap-24">
      {[vmv.vision, vmv.mission].map((b, i) => (
        <article key={b.title} data-statement className="grid gap-6 md:grid-cols-12 md:gap-10">
          <p className="flex items-baseline gap-3 font-mono text-[11px] tracking-[0.18em] text-brass-ink uppercase md:col-span-3 md:pt-4">
            <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            {b.title}
          </p>
          <div className="md:col-span-9">
            <p className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
              {b.body.split(" ").map((w, j) => (
                <span key={j} data-w className="reveal-word">
                  {w}{" "}
                </span>
              ))}
            </p>
            <div className="mt-10 h-px bg-border">
              <div data-rule className="metal-brass h-px origin-left" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Values as a list of engraved plates. As each plate reaches the middle of the screen a brass
 * line runs along its top edge, the outlined number fills with brass and the title rises in.
 * Hover lifts the plate's tint. Everything is shown filled under reduced motion.
 */
export function VmvValues() {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const plates = gsap.utils.toArray<HTMLElement>("[data-plate]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        plates.forEach((plate) => {
          const num = plate.querySelector("[data-num]");
          const title = plate.querySelector("[data-title]");
          const body = plate.querySelector("[data-body]");
          gsap.set(num, { color: "transparent" });
          gsap.set(title, { yPercent: 110 });
          gsap.set(body, { autoAlpha: 0, y: 12 });

          gsap.fromTo(
            plate.querySelector("[data-engrave]"),
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: plate, start: "top 85%", end: "top 55%", scrub: 0.5 } },
          );

          ScrollTrigger.create({
            trigger: plate,
            start: "top 62%",
            once: true,
            onEnter: () => {
              gsap.to(num, { color: "var(--brass)", duration: 0.8, ease: "power2.out" });
              gsap.to(title, { yPercent: 0, duration: 0.9, ease: "expo.out" });
              gsap.to(body, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.1, ease: "expo.out" });
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-num]", { color: "var(--brass)" });
        gsap.set("[data-engrave]", { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="grid border-b border-border">
      {vmv.values.map((v, i) => {
        const Icon = getIcon(v.icon);
        return (
          <li
            key={v.title}
            data-plate
            className="group relative grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 py-10 transition-colors duration-500 hover:bg-brass-soft md:grid-cols-[9rem_1fr_minmax(0,1.1fr)] md:items-center md:gap-x-10 md:px-6 md:py-12"
          >
            {/* plate edge: hairline with a brass engraving line drawn over it */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
            <span aria-hidden data-engrave className="metal-brass absolute inset-x-0 top-0 h-px origin-left" style={{ transform: "scaleX(0)" }} />

            <span
              data-num
              aria-hidden
              className="row-span-2 font-display-wide text-[clamp(3rem,7vw,5.5rem)] leading-none font-bold tracking-[-0.04em] text-brass md:row-span-1"
              style={{ WebkitTextStroke: "1px var(--brass)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-4">
              <Icon strokeWidth={ICON_STROKE} className="size-6 shrink-0 text-brass transition-transform duration-500 group-hover:rotate-[-8deg]" />
              <span className="block overflow-hidden pb-1">
                <h3 data-title className="font-display text-2xl leading-tight font-semibold tracking-tight md:text-3xl">
                  {v.title}
                </h3>
              </span>
            </div>

            <p data-body className="col-start-2 max-w-[46ch] leading-relaxed text-muted-foreground md:col-start-3">
              {v.body}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
