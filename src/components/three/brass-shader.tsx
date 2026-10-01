"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * "Liquid brass" WebGL background: domain-warped noise shaded like polished, brushed brass,
 * with a specular highlight that drifts toward the pointer. Plain WebGL (no three.js), one quad.
 *
 * Performance: renders at 55% resolution (upscaled by CSS, the effect is soft anyway),
 * pauses whenever off screen, and draws a single still frame under reduced motion.
 * Theme-aware: lighter "paper and brass" palette in light mode, graphite and brass in dark mode.
 * If WebGL is unavailable the canvas stays empty and the CSS background beneath shows through.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uDark;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 1.4;
  float t = uTime * 0.05;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 2.2 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.2 * r);

  // brushed-metal streaks: noise stretched hard along x, bent by the flow
  float brush = noise(vec2(p.x * 1.2, p.y * 48.0 + f * 6.0)) * 0.08;

  // specular highlight drifting toward the pointer
  float d = length((uv - uMouse) * vec2(uRes.x / uRes.y, 1.0));
  float spec = pow(clamp(f * 1.35 - d * 0.55, 0.0, 1.0), 3.0);
  float rim = smoothstep(0.62, 0.66, f) - smoothstep(0.66, 0.72, f);

  vec3 graphite = vec3(0.043, 0.051, 0.063);
  vec3 brassDeep = vec3(0.27, 0.19, 0.08);
  vec3 brass = vec3(0.80, 0.63, 0.34);
  vec3 brassHi = vec3(1.0, 0.90, 0.68);

  vec3 dark = mix(graphite, brassDeep, smoothstep(0.2, 0.7, f));
  dark = mix(dark, brass, smoothstep(0.55, 0.92, f + brush));
  dark += brassHi * (spec * 0.55 + rim * 0.18);

  vec3 paper = vec3(0.957, 0.953, 0.941);
  vec3 light = mix(paper, brass, smoothstep(0.38, 0.95, f + brush) * 0.8);
  light = mix(light, brassDeep, smoothstep(0.8, 1.0, f) * 0.35);
  light += brassHi * spec * 0.35;

  gl_FragColor = vec4(mix(light, dark, uDark), 1.0);
}
`;

const SCALE = 0.55;

export function BrassShader({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power", preserveDrawingBuffer: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uDark = gl.getUniformLocation(prog, "uDark");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    let dark = document.documentElement.classList.contains("dark") ? 1 : 0;
    let visible = false;
    let frame = 0;
    const start = performance.now();

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDark, dark);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible && !reduce ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => !frame && draw(performance.now()));
    ro.observe(canvas);

    // follow theme changes (next-themes toggles the .dark class on <html>)
    const mo = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark") ? 1 : 0;
      if (!frame) draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={cn("block size-full", className)} />;
}
