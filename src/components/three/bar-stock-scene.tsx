"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createFrameWatchdog } from "@/lib/device";
import { Environment, Lightformer } from "@react-three/drei";

export type BarLook = {
  color: string;
  roughness: number;
  /** cross-section of the raw stock: 6 = hex, 4 = square, 64 = round */
  sides: 4 | 6 | 64;
};

const STOCK_R = 0.5;
const STOCK_LEN = 2.4;
const OFF = 9; // x position outside the frame
const CAM_Z = 6.4;

/**
 * One bar: raw stock on the left, then the turned features a part made from it would have
 * (shoulder, thread, chamfered end), so each material reads as "bar in, component out".
 * Built along the y axis, then laid horizontally by the parent group.
 */
function Bar({ look }: { look: BarLook }) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: look.color, metalness: 1, roughness: look.roughness, envMapIntensity: 1.7 }),
    [look.color, look.roughness],
  );
  const turned = useMemo(
    () => new THREE.MeshStandardMaterial({ color: look.color, metalness: 1, roughness: Math.max(0.08, look.roughness - 0.12), envMapIntensity: 2 }),
    [look.color, look.roughness],
  );
  useEffect(
    () => () => {
      mat.dispose();
      turned.dispose();
    },
    [mat, turned],
  );

  const threads = Array.from({ length: 9 }, (_, i) => i);
  // square stock is a 4-sided cylinder turned 45deg so a flat faces the camera
  const stockRot = look.sides === 4 ? Math.PI / 4 : look.sides === 6 ? Math.PI / 6 : 0;

  return (
    <group>
      <mesh material={mat} position={[0, -STOCK_LEN / 2 + 0.2, 0]} rotation={[0, stockRot, 0]}>
        <cylinderGeometry args={[STOCK_R, STOCK_R, STOCK_LEN, look.sides, 1]} />
      </mesh>
      {/* turned shoulder */}
      <mesh material={turned} position={[0, 0.2 + 0.35, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.7, 64]} />
      </mesh>
      {/* undercut groove */}
      <mesh material={turned} position={[0, 0.2 + 0.75, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 48]} />
      </mesh>
      {/* threaded section: core plus crest rings */}
      <mesh material={turned} position={[0, 0.2 + 1.12, 0]}>
        <cylinderGeometry args={[0.215, 0.215, 0.64, 48]} />
      </mesh>
      {threads.map((i) => (
        <mesh key={i} material={turned} position={[0, 0.2 + 0.84 + i * 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.026, 8, 48]} />
        </mesh>
      ))}
      {/* chamfered end */}
      <mesh material={turned} position={[0, 0.2 + 1.48, 0]}>
        <cylinderGeometry args={[0.16, 0.215, 0.08, 48]} />
      </mesh>
    </group>
  );
}

function Rack({ looks, active, reduceMotion, still, onSlow, onReady }: { looks: BarLook[]; active: number; reduceMotion: boolean; still: boolean; onSlow?: () => void; onReady?: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  // live frame-rate check: if this device cannot animate the scene smoothly, the parent switches to still mode
  const watchdog = useMemo(() => createFrameWatchdog({ onSlow: () => onSlow?.() }), [onSlow]);
  // off screen (and in still mode) frames are only drawn on demand; draw a few up front so the bar and
  // its environment lighting are already rendered before the section scrolls into view
  useEffect(() => {
    invalidate();
    const t = [250, 1000].map((ms) => window.setTimeout(() => invalidate(), ms));
    return () => t.forEach((id) => window.clearTimeout(id));
  }, [still, invalidate]);
  // tell the parent once a real frame has been drawn, so it never fades in an empty canvas
  const drawn = useRef(false);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const target = useRef<number[]>(looks.map((_, i) => (i === active ? 0 : -OFF)));
  const prev = useRef(active);
  const pointer = useRef({ x: 0, y: 0 });

  // new bar feeds in from the left, the previous one exits to the right
  useEffect(() => {
    if (prev.current === active) return;
    const instant = reduceMotion || still;
    const g = groups.current[active];
    if (g) g.position.x = instant ? 0 : -OFF;
    target.current[prev.current] = OFF;
    target.current[active] = 0;
    const old = groups.current[prev.current];
    if (old && instant) old.position.x = OFF;
    prev.current = active;
    if (still) invalidate(); // swap the bar with a single frame
  }, [active, reduceMotion, still, invalidate]);

  useFrame((state, dt) => {
    if (!drawn.current) {
      drawn.current = true;
      requestAnimationFrame(() => onReady?.());
    }
    if (!still) watchdog(dt * 1000);
    // fov is vertical: on a narrow stage pull the camera back so the full bar length stays in frame
    const aspect = state.size.width / Math.max(1, state.size.height);
    const z = CAM_Z * Math.max(1, 1.5 / aspect);
    state.camera.position.z = still ? z : state.camera.position.z + (z - state.camera.position.z) * 0.2;
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;
    const k = 1 - Math.exp(-dt * 3.2);
    groups.current.forEach((g, i) => {
      if (!g) return;
      const tx = target.current[i];
      const before = g.position.x;
      g.position.x += (tx - g.position.x) * k;
      const speed = Math.abs(g.position.x - before) / Math.max(dt, 1e-3);
      g.visible = Math.abs(g.position.x) < OFF - 0.5;
      if (!g.visible) return;
      // bars spin about their own axis: slow idle turn, faster while being fed
      const spin = g.children[0].children[0] as THREE.Group;
      if (!reduceMotion && !still) spin.rotation.y += dt * (0.35 + speed * 0.9);
      // gentle tilt toward the pointer
      g.rotation.x = pointer.current.y * 0.18;
      g.rotation.y = -0.3 + pointer.current.x * 0.2;
    });
  });

  return (
    <group position={[-0.1, 0, 0]}>
      {looks.map((look, i) => (
        <group key={i} ref={(el) => void (groups.current[i] = el)} position={[i === active ? 0 : -OFF, 0, 0]} visible={i === active}>
          {/* outer group lays the bar horizontally; the inner group spins about the bar's own axis */}
          <group rotation={[0, 0, -Math.PI / 2]} position={[0.24, 0, 0]}>
            <group>
              <Bar look={look} />
            </group>
          </group>
        </group>
      ))}
    </group>
  );
}

export default function BarStockScene({
  looks,
  active,
  running,
  reduceMotion,
  still = false,
  onSlow,
  onReady,
}: {
  looks: BarLook[];
  active: number;
  running: boolean;
  reduceMotion: boolean;
  /** draw only on demand at 1x resolution (low-power devices or a failed frame-rate check) */
  still?: boolean;
  /** called once if the device cannot keep a smooth frame rate */
  onSlow?: () => void;
  /** called once the first frame has been drawn, so the parent can fade the scene in */
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={still ? 1 : [1, 1.75]}
      frameloop={still || !running ? "demand" : "always"}
      camera={{ position: [0, 0.8, CAM_Z], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Rack looks={looks} active={active} reduceMotion={reduceMotion} still={still} onSlow={onSlow} onReady={onReady} />
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
