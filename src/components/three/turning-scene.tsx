/* eslint-disable react-hooks/immutability -- three.js geometries, materials and particle buffers are intentionally mutated inside the R3F frame loop (the documented R3F pattern; no React state is touched per frame). */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { CALLOUT_Y } from "./callouts";

/**
 * Live turning simulation (illustrative, not a real machining program).
 * A hex brass bar held in a chuck is turned to profile, threaded and parted off.
 * Two meshes share one moving clipping plane: finished part above the tool, raw hex bar below it.
 * Everything per-frame (plane, tool, chips, HUD text, callouts) is mutated through refs, never React state.
 */

export type HudFrame = {
  phase: string;
  op: string;
  rpm: number;
  x: number;
  z: number;
  progress: number;
  done: boolean;
  /** screen-space anchor (0..1 of the canvas) and visibility for each callout */
  callouts: { x: number; y: number; on: boolean }[];
};
export type HudSink = (f: HudFrame) => void;

const MM_PER_UNIT = 11.27; // hex 0.82 circumradius -> 16 mm across flats
const BORE = 0.2;
const TOP = 1.58;
const BOTTOM = -1.62;
const HEX_R = 0.82;
const FLANGE: [number, number] = [-0.38, 0.08];

// Timeline (seconds)
const T_APPROACH = 0.7;
const T_TURN_END = 3.7;
const T_THREAD_END = 5.1;
const T_PART_END = 5.9;
const T_DONE = 6.8;

const PROFILE: [number, number][] = [
  [BORE, BOTTOM],
  [0.36, BOTTOM],
  [0.4, -1.58],
  [0.4, -0.52],
  [0.36, -0.46],
  [0.36, -0.4],
  [0.5, -0.4],
  [0.5, -0.38],
  [0.5, 0.08],
  [0.62, 0.1],
  [0.62, 0.24],
  [0.46, 0.3],
  [0.46, 0.44],
  [0.56, 0.5],
  [0.56, 0.7],
  [0.5, 0.74],
  [0.56, 0.78],
  [0.56, 0.98],
  [0.5, 1.02],
  [0.56, 1.06],
  [0.56, 1.46],
  [0.48, 1.56],
  [0.34, TOP],
  [0.28, 1.54],
  [BORE, 1.46],
  [BORE, BOTTOM],
];

/** Outer radius of the finished part at height y (linear interpolation over the outer profile). */
function radiusAt(y: number) {
  if (y >= FLANGE[0] && y <= FLANGE[1]) return HEX_R;
  const outer = PROFILE.slice(1, 23);
  for (let i = 0; i < outer.length - 1; i++) {
    const [x0, y0] = outer[i];
    const [x1, y1] = outer[i + 1];
    if (y >= Math.min(y0, y1) && y <= Math.max(y0, y1)) {
      if (y1 === y0) return Math.max(x0, x1);
      return x0 + ((y - y0) / (y1 - y0)) * (x1 - x0);
    }
  }
  return 0.4;
}

class Helix extends THREE.Curve<THREE.Vector3> {
  constructor(
    private radius: number,
    private y0: number,
    private y1: number,
    private turns: number,
  ) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * this.turns * Math.PI * 2;
    return target.set(Math.cos(a) * this.radius, this.y0 + (this.y1 - this.y0) * t, Math.sin(a) * this.radius);
  }
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
const smooth = (t: number) => {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
};

const CALLOUT_SHOW: ((s: { toolY: number; thread: number }) => boolean)[] = [
  (s) => s.toolY < 1.0,
  (s) => s.toolY < 0.65,
  (s) => s.toolY < 0.25,
  (s) => s.toolY < -0.45,
  (s) => s.thread > 0.95,
];

function Machine({
  runId,
  reduceMotion,
  drawing,
  hud,
}: {
  runId: number;
  reduceMotion: boolean;
  drawing: boolean;
  hud: React.RefObject<HudSink | null>;
}) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const chuck = useRef<THREE.Group>(null);
  const tool = useRef<THREE.Group>(null);
  const partTool = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Mesh>(null);
  const chipsRef = useRef<THREE.Points>(null);
  const anchor = useRef(new THREE.Vector3());
  const calloutState = useRef(CALLOUT_Y.map(() => ({ x: 0, y: 0, on: false })));
  const clock = useRef({ t: 0, spinSpeed: 0 });
  const chipCursor = useRef(0);

  // Restart the cycle whenever runId changes.
  useEffect(() => {
    clock.current.t = reduceMotion ? T_DONE : 0;
  }, [runId, reduceMotion]);

  const profile = useMemo(() => PROFILE.map(([x, y]) => new THREE.Vector2(x, y)), []);
  const lathe = useMemo(() => new THREE.LatheGeometry(profile, 160), [profile]);
  const latheEdges = useMemo(() => new THREE.EdgesGeometry(lathe, 20), [lathe]);
  const thread = useMemo(() => new THREE.TubeGeometry(new Helix(0.405, -1.52, -0.56, 13), 900, 0.022, 8, false), []);
  const threadLine = useMemo(() => new THREE.BufferGeometry().setFromPoints(new Helix(0.42, -1.52, -0.56, 13).getPoints(700)), []);
  const hex = useMemo(() => {
    const g = new THREE.CylinderGeometry(HEX_R, HEX_R, FLANGE[1] - FLANGE[0], 6, 1);
    g.translate(0, (FLANGE[0] + FLANGE[1]) / 2, 0);
    return g;
  }, []);
  const hexEdges = useMemo(() => new THREE.EdgesGeometry(hex), [hex]);
  const rawBar = useMemo(() => {
    const g = new THREE.CylinderGeometry(HEX_R + 0.004, HEX_R + 0.004, 4.4, 6, 1);
    g.translate(0, TOP - 2.2 + 0.02, 0); // spans y from ~-2.8 to TOP
    return g;
  }, []);
  const capGeo = useMemo(() => new THREE.CircleGeometry(HEX_R + 0.004, 6), []);

  // clipping planes (world space, recomputed from local every frame)
  const planes = useMemo(
    () => ({
      keepAbove: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
      keepBelow: new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
      keepAboveLocal: new THREE.Plane(),
      keepBelowLocal: new THREE.Plane(),
    }),
    [],
  );

  const mats = useMemo(() => {
    const brass = new THREE.MeshPhysicalMaterial({
      color: "#c99b50",
      metalness: 1,
      roughness: 0.2,
      clearcoat: 0.35,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
      clippingPlanes: [planes.keepAbove],
    });
    const threadMat = new THREE.MeshPhysicalMaterial({ color: "#d1a55c", metalness: 1, roughness: 0.22 });
    const flange = new THREE.MeshPhysicalMaterial({ color: "#b88a44", metalness: 1, roughness: 0.32 });
    const raw = new THREE.MeshStandardMaterial({
      color: "#9c7a3f",
      metalness: 0.9,
      roughness: 0.55,
      clippingPlanes: [planes.keepBelow],
      transparent: true,
    });
    const capMat = new THREE.MeshStandardMaterial({ color: "#d9b06a", metalness: 1, roughness: 0.18, side: THREE.DoubleSide });
    const steel = new THREE.MeshStandardMaterial({ color: "#3a3f47", metalness: 0.85, roughness: 0.38, transparent: true });
    const steelDark = new THREE.MeshStandardMaterial({ color: "#23272d", metalness: 0.7, roughness: 0.45, transparent: true });
    const insert = new THREE.MeshStandardMaterial({ color: "#c8ccd2", metalness: 1, roughness: 0.25 });
    const line = new THREE.LineBasicMaterial({ color: "#5cbad6", transparent: true, opacity: 0.9 });
    return { brass, threadMat, flange, raw, capMat, steel, steelDark, insert, line };
  }, [planes]);

  const threadLineObj = useMemo(() => new THREE.Line(threadLine, mats.line), [threadLine, mats]);

  // Chips: a small recycled particle pool.
  const CHIPS = 180;
  const chips = useMemo(() => {
    const pos = new Float32Array(CHIPS * 3);
    const vel = new Float32Array(CHIPS * 3);
    const life = new Float32Array(CHIPS);
    for (let i = 0; i < CHIPS; i++) pos[i * 3 + 1] = -99;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { pos, vel, life, geo };
  }, []);

  useFrame((state, dRaw) => {
    const d = Math.min(dRaw, 1 / 30);
    const c = clock.current;
    c.t += d;
    const t = c.t;

    // ---- timeline ----
    const approach = ease(t / T_APPROACH);
    const turn = smooth((t - T_APPROACH) / (T_TURN_END - T_APPROACH));
    const threadP = smooth((t - T_TURN_END) / (T_THREAD_END - T_TURN_END));
    const part = smooth((t - T_THREAD_END) / (T_PART_END - T_THREAD_END));
    const release = ease((t - T_PART_END) / (T_DONE - T_PART_END));
    const done = t >= T_DONE;
    const cutting = t > T_APPROACH && t < T_TURN_END;
    const threading = t >= T_TURN_END && t < T_THREAD_END;

    const toolY = t < T_APPROACH ? TOP + 0.05 : t < T_TURN_END ? THREE.MathUtils.lerp(TOP + 0.05, BOTTOM, turn) : BOTTOM - 0.3;

    // ---- spindle ----
    const targetSpin = done ? 0.28 : t < T_PART_END ? 14 : 3;
    c.spinSpeed = THREE.MathUtils.lerp(c.spinSpeed, reduceMotion ? 0 : targetSpin, 0.05);
    if (spin.current) spin.current.rotation.y += d * c.spinSpeed;

    // ---- presentation tilt + pointer ----
    if (tilt.current) {
      const px = done && !reduceMotion ? state.pointer.y * 0.1 : 0;
      const pz = done && !reduceMotion ? -state.pointer.x * 0.07 : 0;
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -0.22 + px, 0.05);
      tilt.current.rotation.z = THREE.MathUtils.lerp(tilt.current.rotation.z, 0.18 + pz, 0.05);
      // lift the finished part once parted off
      tilt.current.position.y = THREE.MathUtils.lerp(0.2, 0.02, release);
      tilt.current.updateMatrixWorld();
    }

    // ---- clipping plane follows the tool (local y -> world) ----
    const cutY = done ? BOTTOM - 1 : toolY;
    if (spin.current) {
      planes.keepAboveLocal.set(new THREE.Vector3(0, 1, 0), -cutY);
      planes.keepBelowLocal.set(new THREE.Vector3(0, -1, 0), cutY);
      planes.keepAbove.copy(planes.keepAboveLocal).applyMatrix4(spin.current.matrixWorld);
      planes.keepBelow.copy(planes.keepBelowLocal).applyMatrix4(spin.current.matrixWorld);
    }

    // raw hex cap at the cut face
    if (cap.current) {
      cap.current.visible = cutting && !drawing;
      cap.current.position.y = toolY;
    }

    // raw stock + chuck leave after part-off
    mats.raw.opacity = 1 - release;
    mats.steel.opacity = 1 - release;
    mats.steelDark.opacity = 1 - release;
    if (chuck.current) {
      chuck.current.position.y = -release * 1.4;
      chuck.current.visible = release < 0.999 && !drawing;
    }

    // ---- thread grows in during OP 30 ----
    const threadCount = thread.index ? thread.index.count : 0;
    thread.setDrawRange(0, Math.floor(threadCount * (t < T_TURN_END ? 0 : threadP)));
    threadLine.setDrawRange(0, Math.floor(700 * (t < T_TURN_END ? 0 : threadP)));

    // ---- turning tool ----
    const r = t < T_TURN_END ? radiusAt(Math.min(toolY, TOP)) : 0.4;
    if (tool.current) {
      const inX = cutting || threading ? r + 0.02 : 1.9;
      const x = THREE.MathUtils.lerp(2.6, inX, approach) + (t > T_THREAD_END ? (t - T_THREAD_END) * 3 : 0);
      const y = threading ? THREE.MathUtils.lerp(-0.56, -1.52, threadP) : Math.max(toolY, -1.55);
      tool.current.position.set(x, y, 0);
      tool.current.visible = !drawing && t < T_PART_END + 0.4;
    }
    // ---- parting tool (OP 40) ----
    if (partTool.current) {
      const pIn = t < T_THREAD_END ? 0 : t < T_PART_END ? part : 1 - release;
      partTool.current.position.set(-THREE.MathUtils.lerp(2.4, BORE + 0.02, pIn), BOTTOM - 0.02, 0);
      partTool.current.visible = !drawing && t > T_THREAD_END - 0.2 && t < T_DONE;
    }

    // ---- chips ----
    const emitting = !reduceMotion && !drawing && (cutting || threading || (t > T_THREAD_END && t < T_PART_END));
    const { pos, vel, life, geo } = chips;
    if (emitting) {
      const ey = threading ? THREE.MathUtils.lerp(-0.56, -1.52, threadP) : t > T_THREAD_END ? BOTTOM : toolY;
      const ex = threading ? 0.42 : t > T_THREAD_END ? -0.3 : r;
      for (let k = 0; k < 4; k++) {
        const i = chipCursor.current;
        chipCursor.current = (i + 1) % CHIPS;
        pos[i * 3] = ex;
        pos[i * 3 + 1] = ey;
        pos[i * 3 + 2] = 0.02;
        vel[i * 3] = (ex >= 0 ? 1 : -1) * (0.6 + Math.random() * 1.2);
        vel[i * 3 + 1] = 0.4 + Math.random() * 1.4;
        vel[i * 3 + 2] = 1.2 + Math.random() * 1.8; // flung tangentially by the spindle
        life[i] = 0.6 + Math.random() * 0.5;
      }
    }
    for (let i = 0; i < CHIPS; i++) {
      if (life[i] <= 0) continue;
      life[i] -= d;
      vel[i * 3 + 1] -= 6 * d;
      pos[i * 3] += vel[i * 3] * d;
      pos[i * 3 + 1] += vel[i * 3 + 1] * d;
      pos[i * 3 + 2] += vel[i * 3 + 2] * d;
      if (life[i] <= 0) pos[i * 3 + 1] = -99;
    }
    geo.attributes.position.needsUpdate = true;

    // ---- callouts: project surface anchors to screen; reveal as each feature is finished ----
    const s = { toolY, thread: t < T_TURN_END ? 0 : threadP };
    if (tilt.current) {
      CALLOUT_Y.forEach((y, i) => {
        const v = anchor.current.set(radiusAt(y), y, 0);
        tilt.current!.localToWorld(v);
        v.project(state.camera);
        const cs = calloutState.current[i];
        cs.x = (v.x + 1) / 2;
        cs.y = (1 - v.y) / 2;
        cs.on = drawing || done || CALLOUT_SHOW[i](s);
      });
    }

    // ---- HUD ----
    const sink = hud.current;
    if (sink) {
      const phase = done
        ? "CYCLE COMPLETE"
        : t < T_APPROACH
          ? "LOAD BAR / RAPID"
          : cutting
            ? "PROFILE TURN"
            : threading
              ? "THREAD CUT"
              : "PART OFF";
      const op = done ? "OP 50" : t < T_APPROACH ? "OP 10" : cutting ? "OP 20" : threading ? "OP 30" : "OP 40";
      sink({
        phase,
        op,
        rpm: done ? 0 : Math.round(c.spinSpeed * 171),
        x: (cutting ? r * 2 : threading ? 0.8 : t > T_THREAD_END && !done ? BORE * 2 : HEX_R * 2 * Math.cos(Math.PI / 6)) * MM_PER_UNIT,
        z: ((cutting ? toolY : threading ? THREE.MathUtils.lerp(-0.56, -1.52, threadP) : BOTTOM) - TOP) * MM_PER_UNIT,
        progress: Math.min(t / T_DONE, 1),
        done,
        callouts: calloutState.current,
      });
    }
  });

  return (
    <group ref={tilt} rotation={[-0.22, 0, 0.18]} position={[0, 0.2, 0]}>
      <group ref={spin}>
        {drawing ? (
          <>
            <lineSegments geometry={latheEdges} material={mats.line} />
            <lineSegments geometry={hexEdges} material={mats.line} rotation={[0, Math.PI / 6, 0]} />
            <primitive object={threadLineObj} />
          </>
        ) : (
          <>
            <mesh geometry={lathe} material={mats.brass} />
            <mesh geometry={thread} material={mats.threadMat} />
            <mesh geometry={hex} material={mats.flange} rotation={[0, Math.PI / 6, 0]} />
            <mesh geometry={rawBar} material={mats.raw} rotation={[0, Math.PI / 6, 0]} />
            <mesh ref={cap} geometry={capGeo} material={mats.capMat} rotation={[-Math.PI / 2, 0, Math.PI / 6]} />
          </>
        )}
      </group>

      {/* chuck with three jaws, below the part */}
      <group ref={chuck}>
        <mesh position={[0, -2.55, 0]} material={mats.steel}>
          <cylinderGeometry args={[1.45, 1.45, 0.5, 64]} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI * 2) / 3) * 1.02, -2.2, Math.sin((i * Math.PI * 2) / 3) * 1.02]} rotation={[0, -(i * Math.PI * 2) / 3, 0]} material={mats.steelDark}>
            <boxGeometry args={[0.45, 0.32, 0.3]} />
          </mesh>
        ))}
      </group>

      {/* turning tool: holder + carbide insert */}
      <group ref={tool} position={[2.6, TOP, 0]}>
        <mesh position={[0.62, 0, 0]} material={mats.steelDark}>
          <boxGeometry args={[1.1, 0.16, 0.22]} />
        </mesh>
        <mesh position={[0.06, 0, 0]} rotation={[0, Math.PI / 4, 0]} material={mats.insert}>
          <boxGeometry args={[0.13, 0.05, 0.13]} />
        </mesh>
      </group>

      {/* parting tool: thin blade from the other side */}
      <group ref={partTool} position={[-2.4, BOTTOM, 0]} visible={false}>
        <mesh position={[-0.7, 0, 0]} material={mats.steelDark}>
          <boxGeometry args={[1.4, 0.05, 0.3]} />
        </mesh>
      </group>

      <points ref={chipsRef} geometry={chips.geo}>
        <pointsMaterial color="#e2b86c" size={0.035} sizeAttenuation />
      </points>

    </group>
  );
}

export default function TurningScene({
  active = true,
  reduceMotion = false,
  drawing = false,
  runId = 0,
  hud,
}: {
  active?: boolean;
  reduceMotion?: boolean;
  drawing?: boolean;
  runId?: number;
  hud: React.RefObject<HudSink | null>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      // Camera sits slightly below centre and further back so the whole part clears the readout panel.
      camera={{ position: [0, -0.5, 9.8], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
      }}
      aria-hidden
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Machine runId={runId} reduceMotion={reduceMotion} drawing={drawing} hud={hud} />
      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="rect" intensity={3} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.6, 1]} />
          <Lightformer form="rect" intensity={1.4} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.4, 1]} />
          <Lightformer form="rect" intensity={2.4} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1.2, 1]} />
          <Lightformer form="ring" color="#ffd9a0" intensity={1.6} position={[2, 2, 4]} scale={2} />
        </group>
      </Environment>
    </Canvas>
  );
}
