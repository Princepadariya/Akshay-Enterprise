import "server-only";
import DottedMap from "dotted-map";
import { site } from "@/content/site";

/** What the client map needs: only the few animated points, never the ~2,900 land dots. */
export type MapData = {
  width: number;
  height: number;
  origin: { x: number; y: number; label: string };
  pins: { x: number; y: number; region: string; countries: readonly string[]; placeholder?: boolean }[];
};

type Built = MapData & { dots: { x: number; y: number }[] };

let cache: Built | null = null;

function build(): Built {
  if (cache) return cache;
  const map = new DottedMap({ height: 58, grid: "diagonal" });
  const origin = map.addPin({ lat: site.origin.lat, lng: site.origin.lng });
  const pins = site.exportRegions.map((r) => {
    const p = map.addPin({ lat: r.lat, lng: r.lng });
    return { x: p.x, y: p.y, region: r.region, countries: r.countries, placeholder: r.placeholder };
  });
  const dots = map
    .getPoints()
    .filter((p) => !p.svgOptions)
    .map((p) => ({ x: +p.x.toFixed(2), y: +p.y.toFixed(2) }));
  cache = { width: map.image.width, height: map.image.height, dots, origin: { x: origin.x, y: origin.y, label: site.origin.label }, pins };
  return cache;
}

/** Build-time map geometry for the animated overlay (pins, origin, size). */
export function getWorldMap(): MapData {
  const { width, height, origin, pins } = build();
  return { width, height, origin, pins };
}

/**
 * The land dots as one static SVG (served at /map-dots.svg and used as a CSS mask).
 * The browser rasterises it once and caches it, so the animated layer above never repaints it.
 */
export function getDotsSvg(): string {
  const { width, height, dots } = build();
  const circles = dots.map((d) => `<circle cx="${d.x}" cy="${d.y}" r="0.24"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><g fill="#000">${circles}</g></svg>`;
}
