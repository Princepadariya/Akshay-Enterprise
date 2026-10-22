/**
 * Helpers that keep continuous WebGL effects from straining older or low-power devices.
 * Effects start normally, and either skip animation up front (clear low-end signals) or
 * fall back to a still frame if the device cannot keep a smooth frame rate.
 */

type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/** Cheap, synchronous signals that a device should get still versions of heavy effects. */
export function prefersLightEffects(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Nav;
  if (nav.connection?.saveData) return true; // visitor asked to save data
  if ((nav.deviceMemory ?? 8) <= 2) return true; // 2 GB RAM or less (Chromium only)
  if ((nav.hardwareConcurrency ?? 8) <= 2) return true; // dual-core or less
  if (isSoftwareRenderer()) return true; // no GPU acceleration: WebGL runs on the CPU
  return false;
}

let softwareRenderer: boolean | undefined;

/**
 * True when WebGL is drawn on the CPU (no GPU, a blocklisted driver, remote desktops and VMs:
 * SwiftShader, llvmpipe, Microsoft Basic Render Driver). Continuous 3D there stalls scrolling for
 * hundreds of milliseconds at a time. Checked once per page load.
 */
export function isSoftwareRenderer(): boolean {
  if (typeof window === "undefined") return false;
  if (softwareRenderer !== undefined) return softwareRenderer;
  softwareRenderer = false;
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (gl) {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
      softwareRenderer = /swiftshader|llvmpipe|softpipe|basic render driver|software/i.test(name);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    softwareRenderer = false;
  }
  return softwareRenderer;
}

/**
 * Measures frame times for a short sample once an effect starts animating. If the average is
 * slower than `maxMs` (default ~24 fps), `onSlow` is called once so the effect can go still.
 * The first frames (shader compilation, image decode) and long gaps (tab switches) are ignored.
 */
export function createFrameWatchdog({ onSlow, samples = 45, warmup = 10, maxMs = 42 }: { onSlow: () => void; samples?: number; warmup?: number; maxMs?: number }) {
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
      if (total / counted > maxMs) onSlow();
    }
  };
}
