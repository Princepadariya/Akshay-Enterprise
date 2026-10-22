"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/utils";
import { isSoftwareRenderer } from "@/lib/device";
import type { HudFrame, HudSink } from "./turning-scene";
import { CALLOUT_LABELS } from "./callouts";

const loadScene = () => import("./turning-scene");
const TurningScene = dynamic(loadScene, { ssr: false });

// Start fetching the three.js scene as soon as this module runs on a desktop-width screen, in
// parallel with hydration, instead of waiting for the component to decide on 3D first.
if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) void loadScene();

function canRender3D() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const saveData = nav.connection?.saveData ?? false;
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webgl = false;
  }
  return wide && cores >= 4 && memory >= 4 && !saveData && webgl;
}

/**
 * Hero visual: a live turning cycle (bar -> finished part) inside an engineering-drawing frame,
 * with a CNC-style readout. Phones and low-power devices get a static photograph instead.
 * Without GPU acceleration the scene still runs, at 1x resolution; it only animates for one cycle.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"pending" | "3d" | "image">("pending");
  const [ready, setReady] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);
  // 1x resolution without GPU acceleration, or after the scene reports it is too slow
  const [lite, setLite] = useState(false);
  const goLite = useCallback(() => setLite(true), []);
  // fade the scene in once its first frame is on the canvas
  const onReady = useCallback(() => setReady(true), []);

  // HUD elements (found by data-hud attribute) are written directly each frame, never via React state.
  const hudRoot = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const hud = useRef<HudSink | null>(null);

  // Overlay size, measured on resize only: reading clientWidth inside the frame loop (right after
  // the text writes above it) would force a synchronous layout on every frame.
  const size = useRef({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      size.current = { w: entry.contentRect.width, h: entry.contentRect.height };
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const cache: Record<string, HTMLElement | null> = {};
    const get = (k: string) => {
      if (!cache[k] || !cache[k]!.isConnected) cache[k] = hudRoot.current?.querySelector<HTMLElement>(`[data-hud="${k}"]`) ?? null;
      return cache[k];
    };
    let labels: HTMLElement[] = [];
    // only touch the DOM when a value actually changes
    const last = new WeakMap<HTMLElement, string>();
    const text = (k: string, v: string) => {
      const el = get(k);
      if (!el || last.get(el) === v) return;
      last.set(el, v);
      el.textContent = v;
    };
    hud.current = (f: HudFrame) => {
      text("op", f.op);
      text("phase", f.phase);
      text("rpm", String(f.rpm).padStart(4, "0"));
      text("x", f.x.toFixed(2));
      text("z", f.z.toFixed(2));
      const bar = get("bar");
      if (bar) bar.style.transform = `scaleX(${f.progress.toFixed(3)})`;
      const led = get("led");
      if (led) led.dataset.state = f.done ? "done" : "run";
      if (!labels.length || !labels[0].isConnected) labels = Array.from(hudRoot.current?.querySelectorAll<HTMLElement>("[data-callout]") ?? []);
      const { w, h } = size.current;
      labels.forEach((el, i) => {
        const cs = f.callouts[i];
        if (!cs) return;
        el.style.transform = `translate(${(cs.x * w).toFixed(1)}px, ${(cs.y * h).toFixed(1)}px)`;
        const on = cs.on ? "1" : "0";
        if (el.dataset.on !== on) el.dataset.on = on;
      });
      if (f.done !== doneRef.current) {
        doneRef.current = f.done;
        setDone(f.done);
      }
    };
  }, []);

  // Decide right after hydration (not on idle, which can be seconds away while the page sets up).
  useEffect(() => {
    const t = window.setTimeout(() => {
      setLite(isSoftwareRenderer());
      setMode(canRender3D() ? "3d" : "image");
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // Once the cycle has finished and the spindle has wound down, stop rendering: the finished part
  // only reacts to the pointer, so frames are drawn while the visual is hovered or focused.
  const [settledRun, setSettledRun] = useState(-1);
  const [engaged, setEngaged] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setSettledRun(runId), 1800);
    return () => window.clearTimeout(t);
  }, [done, runId]);
  const settled = done && settledRun === runId;

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full md:aspect-square"
      onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setEngaged(false)}
    >
      <div ref={hudRoot} className="contents">
      {/* Drawing frame */}
      <div aria-hidden className="absolute inset-0 rounded-sm border border-border">
        <div className="grid-lines-fine absolute inset-0 opacity-70" />
        <span className="absolute top-1/2 right-6 left-6 h-px bg-blueprint/25" />
        <span className="absolute top-6 bottom-6 left-1/2 w-px bg-blueprint/25" />
        {/* corner ticks */}
        {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((c) => (
          <span key={c} className={cn("absolute size-3 border-brass/70", c)} />
        ))}
      </div>

      {/* Static image: mobile always; desktop when 3D is not suitable */}
      <Photo
        k="brassParts"
        priority
        sizes="(min-width: 768px) 45vw, 100vw"
        className={cn("absolute inset-4 overflow-hidden rounded-sm md:inset-6", mode !== "image" && "md:hidden")}
      />

      {/* Poster: the scene's exact first frame (same camera, transparent background), shown from the
          first paint on desktop so the part is there at once. The live scene fades in on top of it once
          its first frame is drawn, then the poster steps aside (the canvas itself is transparent). */}
      {mode !== "image" ? (
        <Image
          src="/textures/hero-poster.webp"
          alt=""
          aria-hidden
          fill
          priority
          unoptimized
          className={cn(
            "pointer-events-none hidden object-fill transition-opacity duration-300 md:block",
            ready ? "opacity-0 delay-500" : "opacity-100",
          )}
        />
      ) : null}

      {mode === "3d" ? (
        <div className={cn("absolute inset-0 hidden transition-opacity duration-500 md:block", ready ? "opacity-100" : "opacity-0")}>
          <TurningScene
            active={inView && (!settled || engaged)}
            reduceMotion={reduce}
            drawing={drawing}
            runId={runId}
            hud={hud}
            lite={lite}
            onSlow={goLite}
            onReady={onReady}
          />
          {/* feature callouts, positioned each frame from projected 3D anchors */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {CALLOUT_LABELS.map((label) => (
              <div
                key={label}
                data-callout=""
                data-on="0"
                className="absolute top-0 left-0 opacity-0 transition-opacity duration-500 will-change-transform data-[on=1]:opacity-100"
              >
                <div className="flex -translate-y-1/2 items-center gap-2 whitespace-nowrap">
                  <span className="size-1.5 rotate-45 border border-brass bg-background" />
                  <span className="h-px w-10 bg-brass" />
                  <span className="rounded-sm border border-border bg-background/90 px-2 py-1 font-mono text-[11px] tracking-wide text-foreground">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "3d" ? (
        <>
          {/* Title block, like the corner of a drawing sheet */}
          <div className="absolute top-4 left-4 hidden font-mono text-[10px] leading-relaxed tracking-wider text-muted-foreground md:block">
            <p className="text-foreground">DWG AE-0417 / REV C</p>
            <p>BRASS FITTING, CW614N</p>
            <p className="text-brass-ink">SIMULATION</p>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 hidden items-center gap-2 md:flex">
            <div role="group" aria-label="View mode" className="flex rounded-sm border border-border bg-background/90 p-0.5">
              {[
                { v: false, l: "Part" },
                { v: true, l: "Drawing" },
              ].map((o) => (
                <button
                  key={o.l}
                  type="button"
                  aria-pressed={drawing === o.v}
                  onClick={() => setDrawing(o.v)}
                  className={cn(
                    "rounded-[1px] px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors",
                    drawing === o.v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setDrawing(false);
                setRunId((r) => r + 1);
              }}
              disabled={!done}
              className="flex items-center gap-1.5 rounded-sm border border-border bg-background/90 px-2.5 py-1.5 font-mono text-[11px] tracking-wide text-foreground transition-colors hover:border-brass disabled:opacity-40"
            >
              <RotateCcw strokeWidth={1.5} className="size-3.5" /> Run cycle
            </button>
          </div>

          {/* CNC readout */}
          <div
            aria-live="off"
            className="absolute right-4 bottom-4 left-4 hidden overflow-hidden rounded-sm border border-border bg-background/90 font-mono text-[11px] md:block"
          >
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
              <span className="flex items-center gap-2">
                <span
                  data-hud="led"
                  data-state="run"
                  className="size-1.5 rounded-full bg-brass data-[state=done]:bg-[#3fbf7f] data-[state=run]:animate-pulse"
                />
                <span data-hud="op" className="text-brass-ink">
                  OP 10
                </span>
                <span data-hud="phase" className="tracking-wider text-foreground">
                  LOAD BAR / RAPID
                </span>
              </span>
              <span className="text-muted-foreground">SPINDLE 1  /  G96</span>
            </div>
            <dl className="grid grid-cols-4 gap-2 px-3 py-2">
              <div>
                <dt className="text-muted-foreground">S</dt>
                <dd className="text-foreground tabular">
                  <span data-hud="rpm">0000</span> <span className="text-muted-foreground">rpm</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">F</dt>
                <dd className="text-foreground tabular">
                  0.08 <span className="text-muted-foreground">mm/rev</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">X Ø</dt>
                <dd className="text-foreground tabular">
                  <span data-hud="x">16.00</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Z</dt>
                <dd className="text-foreground tabular">
                  <span data-hud="z">0.00</span>
                </dd>
              </div>
            </dl>
            <div className="h-[2px] w-full bg-border">
              <div data-hud="bar" className="metal-brass h-full origin-left" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </>
      ) : null}
      </div>
    </div>
  );
}
