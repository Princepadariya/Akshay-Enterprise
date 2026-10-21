"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/utils";
import { markLite } from "@/lib/device";
import type { HudFrame, HudSink } from "./turning-scene";
import { CALLOUT_LABELS } from "./callouts";

const TurningScene = dynamic(() => import("./turning-scene"), { ssr: false });

type Check = { ok: boolean; reason: string; facts: [string, string][] };

/** Whether this device gets the live 3D scene, with the reason (shown by `?hero-debug`). */
function check3D(): Check {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const width = window.innerWidth;
  const wide = window.matchMedia("(min-width: 768px)").matches;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const saveData = nav.connection?.saveData ?? false;
  let webgl = false;
  let renderer = "unknown";
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    webgl = !!gl;
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    if (gl && ext) renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL));
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webgl = false;
  }
  const software = /swiftshader|llvmpipe|basic render|software/i.test(renderer);
  const facts: [string, string][] = [
    ["Window width", `${width}px (needs 768+)`],
    ["CPU cores", `${cores} (needs 4+)`],
    ["Memory", `${nav.deviceMemory ? `${memory} GB` : "not reported"} (needs 4+)`],
    ["Data saver", saveData ? "on" : "off"],
    ["WebGL", webgl ? "yes" : "no"],
    ["Graphics", software ? `${renderer} (hardware acceleration is OFF)` : renderer],
  ];
  // same rule as before the performance pass: any tablet / laptop / desktop with 4+ cores and 4+ GB
  const reason = !wide
    ? "window narrower than 768px"
    : cores < 4
      ? "fewer than 4 CPU cores"
      : memory < 4
        ? "browser reports under 4 GB memory"
        : saveData
          ? "data saver is on"
          : !webgl
            ? "WebGL unavailable (hardware acceleration may be off)"
            : "all checks passed";
  return { ok: wide && cores >= 4 && memory >= 4 && !saveData && webgl, reason, facts };
}

/**
 * Hero visual: a live turning cycle (bar -> finished part) inside an engineering-drawing frame,
 * with a CNC-style readout. Phones and low-power devices get a static photograph instead.
 *
 * Loading: the photograph is always painted first (it is the hero's LCP image), the three.js bundle
 * is only fetched after the page has loaded and gone idle, and the scene replaces the photo only once
 * it has drawn a real frame. If the frame rate then drops, the photo comes back and the scene unmounts.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"pending" | "3d" | "image">("pending");
  const [ready, setReady] = useState(false);
  const [check, setCheck] = useState<Check | null>(null);
  // `?hero-debug` in the address shows why this device gets the 3D model or the photo
  const debug = check !== null && new URLSearchParams(window.location.search).has("hero-debug");
  const [slowFps, setSlowFps] = useState<number | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);

  // HUD elements (found by data-hud attribute) are written directly each frame, never via React state.
  const hudRoot = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const hud = useRef<HudSink | null>(null);

  useEffect(() => {
    const cache: Record<string, HTMLElement | null> = {};
    const get = (k: string) => {
      if (!cache[k] || !cache[k]!.isConnected) cache[k] = hudRoot.current?.querySelector<HTMLElement>(`[data-hud="${k}"]`) ?? null;
      return cache[k];
    };
    hud.current = (f: HudFrame) => {
      const e = { op: get("op"), phase: get("phase"), rpm: get("rpm"), x: get("x"), z: get("z"), bar: get("bar"), led: get("led") };
      if (e.op) e.op.textContent = f.op;
      if (e.phase) e.phase.textContent = f.phase;
      if (e.rpm) e.rpm.textContent = String(f.rpm).padStart(4, "0");
      if (e.x) e.x.textContent = f.x.toFixed(2);
      if (e.z) e.z.textContent = f.z.toFixed(2);
      if (e.bar) e.bar.style.transform = `scaleX(${f.progress})`;
      if (e.led) e.led.dataset.state = f.done ? "done" : "run";
      const labels = hudRoot.current?.querySelectorAll<HTMLElement>("[data-callout]");
      labels?.forEach((el, i) => {
        const cs = f.callouts[i];
        if (!cs) return;
        el.style.transform = `translate(${cs.x * el.parentElement!.clientWidth}px, ${cs.y * el.parentElement!.clientHeight}px)`;
        el.dataset.on = cs.on ? "1" : "0";
      });
      if (f.done !== doneRef.current) {
        doneRef.current = f.done;
        setDone(f.done);
      }
    };
  }, []);

  // decide after the page has loaded and the main thread is idle, so text and photo paint first
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let idle = 0;
    const decide = () => {
      const c = check3D();
      setCheck(c);
      setMode(c.ok ? "3d" : "image");
    };
    const schedule = () => {
      idle = w.requestIdleCallback ? w.requestIdleCallback(decide, { timeout: 2500 }) : window.setTimeout(decide, 600);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const onSlow = useCallback((ms: number) => {
    setSlowFps(Math.round(1000 / ms));
    markLite();
    setReady(false);
    setMode("image");
  }, []);

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full md:aspect-square">
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

      {/* Static image: painted immediately everywhere; fades out only once the 3D scene is drawing */}
      <Photo
        k="brassParts"
        priority
        sizes="(min-width: 768px) 45vw, 100vw"
        className={cn("absolute inset-4 overflow-hidden rounded-sm transition-opacity duration-700 md:inset-6", ready && "md:opacity-0")}
      />

      {mode === "3d" ? (
        <div className={cn("absolute inset-0 hidden transition-opacity duration-1000 md:block", ready ? "opacity-100" : "opacity-0")}>
          <TurningScene active={inView} reduceMotion={reduce} drawing={drawing} runId={runId} hud={hud} onReady={onReady} onSlow={onSlow} />
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
                  <span className="rounded-sm border border-border bg-background/85 px-2 py-1 font-mono text-[11px] tracking-wide text-foreground backdrop-blur-sm">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "3d" && ready ? (
        <>
          {/* Title block, like the corner of a drawing sheet */}
          <div className="absolute top-4 left-4 hidden font-mono text-[10px] leading-relaxed tracking-wider text-muted-foreground md:block">
            <p className="text-foreground">DWG AE-0417 / REV C</p>
            <p>BRASS FITTING, CW614N</p>
            <p className="text-brass-ink">SIMULATION</p>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 hidden items-center gap-2 md:flex">
            <div role="group" aria-label="View mode" className="flex rounded-sm border border-border bg-background/80 p-0.5 backdrop-blur-sm">
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
              className="flex items-center gap-1.5 rounded-sm border border-border bg-background/80 px-2.5 py-1.5 font-mono text-[11px] tracking-wide text-foreground backdrop-blur-sm transition-colors hover:border-brass disabled:opacity-40"
            >
              <RotateCcw strokeWidth={1.5} className="size-3.5" /> Run cycle
            </button>
          </div>

          {/* CNC readout */}
          <div
            aria-live="off"
            className="absolute right-4 bottom-4 left-4 hidden overflow-hidden rounded-sm border border-border bg-background/85 font-mono text-[11px] backdrop-blur-md md:block"
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
      {check && debug ? (
        <div className="absolute top-2 left-2 z-20 max-w-[min(26rem,90%)] rounded-sm border border-brass bg-background/95 p-3 font-mono text-[11px] leading-relaxed text-foreground shadow-lg">
          <p className="font-semibold text-brass-ink">
            Hero: {mode === "3d" ? "3D model" : "photo"}
            {slowFps !== null ? ` (switched to photo: only ${slowFps} fps)` : mode === "image" ? ` (${check.reason})` : ""}
          </p>
          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3">
            {check.facts.map(([k, v]) => (
              <Fragment key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="break-words">{v}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
