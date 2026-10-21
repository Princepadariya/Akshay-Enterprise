import { useSyncExternalStore } from "react";

/**
 * Helpers that keep continuous WebGL effects from straining older or low-power devices.
 * Effects start normally, and either skip animation up front (clear low-end signals) or
 * fall back to a still frame if the device cannot keep a smooth frame rate.
 */

type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/** Cheap, synchronous signals that a device should get still versions of heavy effects. */
export function prefersLightEffects(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("lite")) return true; // decided before first paint (layout.tsx)
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return true; // visitor asked to save data
  if ((nav.deviceMemory ?? 8) <= 4) return true; // 4 GB RAM or less (Chromium only)
  if ((nav.hardwareConcurrency ?? 8) <= 4) return true; // quad-core or less
  // phones and tablets: GPU and battery budget is tight, so continuous WebGL animation runs still
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  return false;
}

/** Marks the page as running in light mode (CSS drops grain, glass blur, etc.) once a device proves slow. */
export function markLite() {
  if (typeof document !== "undefined") document.documentElement.classList.add("lite");
}

/**
 * Measures frame times for a short sample once an effect starts animating. If the average is
 * slower than `maxMs` (default ~24 fps), `onSlow` is called once so the effect can go still.
 * The first frames (shader compilation, image decode) and long gaps (tab switches) are ignored.
 */
export function createFrameWatchdog({ onSlow, samples = 45, warmup = 10, maxMs = 42 }: { onSlow: (avgMs: number) => void; samples?: number; warmup?: number; maxMs?: number }) {
  let seen = 0;
  let total = 0;
  let counted = 0;
  let done = false;
  return (dtMs: number) => {
    if (done) return;
    seen++;
    if (seen <= warmup || dtMs <= 0 || dtMs > 250) return;
    total += dtMs;
    counted++;
    if (counted >= samples) {
      done = true;
      if (total / counted > maxMs) onSlow(total / counted);
    }
  };
}

const noop = () => () => {};
/**
 * React hook form of prefersLightEffects(): false while server rendering / hydrating, then the real
 * value on the client, without a setState-in-effect re-render.
 */
export function useLightEffects(): boolean {
  return useSyncExternalStore(noop, prefersLightEffects, () => false);
}
