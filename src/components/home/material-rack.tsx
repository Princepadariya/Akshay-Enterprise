"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { materials, type MaterialKey } from "@/content/materials";
import type { BarLook } from "@/components/three/bar-stock-scene";
import { prefersLightEffects } from "@/lib/device";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const loadScene = () => import("@/components/three/bar-stock-scene");
const BarStockScene = dynamic(loadScene, { ssr: false });

/** Appearance of each bar in the viewer: colour, polish and the stock section it is drawn with. */
const LOOKS: Record<MaterialKey, BarLook> = {
  brass: { color: "#d4ac5c", roughness: 0.26, sides: 6 },
  "stainless-steel": { color: "#c9ced3", roughness: 0.16, sides: 64 },
  "mild-steel": { color: "#8d9298", roughness: 0.42, sides: 4 },
  copper: { color: "#cf7a4a", roughness: 0.24, sides: 64 },
  aluminium: { color: "#d9dde0", roughness: 0.34, sides: 6 },
};
const looks = materials.map((m) => LOOKS[m.key]);
const AUTO_MS = 5000;

/**
 * Materials as a 3D bar-stock viewer. A real-time metal bar of the selected material (raw stock
 * turned down to a shoulder, thread and chamfer) feeds in like stock through a bar feeder;
 * the readout shows the reference grade, standard and nominal composition from the content.
 * Cycles on its own while in view until the visitor picks a material.
 */
export function MaterialRack() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  // The three.js bundle stays out of the initial page load, but is fetched in the background once
  // the page is idle and the scene is mounted well before the section scrolls into view, so it is
  // ready (and fades in) by the time the visitor gets here.
  const [mounted, setMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  // still 3D (no continuous animation) on low-power devices, or after the scene reports it is too slow
  const [lite, setLite] = useState(() => prefersLightEffects());
  const goLite = useCallback(() => setLite(true), []);
  const reduce = useReducedMotion() ?? false;
  const [userPicked, setUserPicked] = useState(false);
  const m = materials[active];

  // background preload after the page has loaded; once the code is in, mount the scene straight away
  // (it only draws a few frames while off screen) so the bar is already rendered when the section arrives.
  // Desktop only: on phones and low-power devices the ~1 MB three.js bundle would tie up the CPU right
  // after load, so there it is fetched by the "near" observer below, a couple of screens ahead.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches || prefersLightEffects()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let idle = 0;
    let cancelled = false;
    const load = () => void loadScene().then(() => !cancelled && setMounted(true));
    const preload = () => {
      idle = w.requestIdleCallback ? w.requestIdleCallback(load, { timeout: 3000 }) : window.setTimeout(load, 1500);
    };
    if (document.readyState === "complete") preload();
    else window.addEventListener("load", preload, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", preload);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  // mount the scene well ahead of the viewport (if the idle preload has not already); animate only while (nearly) visible
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setMounted(true), { rootMargin: "1800px 0px" });
    const visible = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px 0px" });
    near.observe(el);
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, []);

  // auto-advance while visible, until the visitor takes over
  useEffect(() => {
    if (!inView || userPicked || reduce) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % materials.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, inView, userPicked, reduce]);

  // readout text rises in on every change
  useGSAP(
    () => {
      if (reduce) return;
      gsap.fromTo("[data-readout] > *", { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out", stagger: 0.05 });
    },
    { scope: root, dependencies: [active, reduce] },
  );

  const pick = (i: number) => {
    setUserPicked(true);
    setActive(i);
  };

  return (
    <section ref={root} className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          title="Materials we machine"
          lead="Brass, stainless steel, mild steel, copper and aluminium, run from bar on the same machines. Pick a material to load its bar."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* stage */}
          <div className="lg:order-2 lg:col-span-7">
            <div
              ref={stage}
              className="relative overflow-hidden rounded-sm border border-border bg-graphite text-paper"
              style={{ height: "clamp(360px, 42vw, 560px)" }}
            >
              <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-40" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "radial-gradient(60% 50% at 50% 55%, rgb(175 47 12 / 0.14), transparent 70%)" }}
              />
              <div className="absolute inset-0">
                {mounted ? (
                  <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: sceneReady ? 1 : 0 }}>
                    <BarStockScene looks={looks} active={active} running={inView} reduceMotion={reduce} still={lite || reduce} onSlow={goLite} onReady={() => setSceneReady(true)} />
                  </div>
                ) : null}
              </div>

              {/* readout */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 font-mono text-[11px] md:p-6">
                <div data-readout className="overflow-hidden">
                  <p className="text-brass">{m.composition.grade}</p>
                  <p className="mt-1 text-paper/60">{m.composition.standard}</p>
                </div>
                <p className="text-paper/60 tabular">
                  {String(active + 1).padStart(2, "0")} / {String(materials.length).padStart(2, "0")}
                </p>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-6">
                <p className="font-mono text-[10.5px] tracking-[0.16em] text-paper/50 uppercase">Nominal composition, % by weight</p>
                <dl data-readout className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[12px]">
                  {m.composition.elements.map((e) => (
                    <div key={e.el} className="flex gap-2">
                      <dt className="text-brass">{e.el}</dt>
                      <dd className="text-paper/85">{e.range}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {/* auto-advance progress */}
              {!userPicked && !reduce && (
                <span
                  key={active}
                  aria-hidden
                  className="metal-brass absolute bottom-0 left-0 h-[2px] origin-left"
                  style={{ width: "100%", animation: inView ? `rack-progress ${AUTO_MS}ms linear forwards` : "none", transform: "scaleX(0)" }}
                />
              )}
            </div>
          </div>

          {/* material list */}
          <ul aria-label="Materials" className="lg:order-1 lg:col-span-5">
            {materials.map((mat, i) => {
              const on = i === active;
              return (
                <li key={mat.key} className="border-t border-border last:border-b">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(i)}
                    className="group grid w-full grid-cols-[1.25rem_1fr_auto] items-center gap-4 py-4 text-left"
                  >
                    <span
                      aria-hidden
                      className="size-3 rounded-full border transition-transform duration-500"
                      style={{ background: LOOKS[mat.key].color, borderColor: "rgb(0 0 0 / 0.15)", transform: on ? "scale(1.35)" : "scale(1)" }}
                    />
                    <span className="min-w-0">
                      <span className={cn("block font-display text-lg font-semibold tracking-tight transition-colors md:text-xl", on ? "text-foreground" : "text-foreground/70 group-hover:text-foreground")}>
                        {mat.name}
                      </span>
                      <span
                        className="grid transition-[grid-template-rows] duration-500"
                        style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-sm leading-relaxed text-muted-foreground">{mat.summary}</span>
                        </span>
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">{mat.grades[0]}</span>
                  </button>
                </li>
              );
            })}
            <li className="pt-6">
              <Link href="/materials" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
                Grades, properties and finishes <ArrowRight strokeWidth={1.5} className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
