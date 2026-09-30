import "server-only";
import DottedMap from "dotted-map";
import { site } from "@/content/site";

export type MapData = {
  width: number;
  height: number;
  dots: { x: number; y: number }[];
  origin: { x: number; y: number; label: string };
  pins: { x: number; y: number; region: string; countries: readonly string[]; placeholder?: boolean }[];
};

let cache: MapData | null = null;

/** Build-time dotted world map (runs on the server only; ships as plain SVG coordinates). */
export function getWorldMap(): MapData {
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
  cache = {
    width: map.image.width,
    height: map.image.height,
    dots,
    origin: { x: origin.x, y: origin.y, label: site.origin.label },
    pins,
  };
  return cache;
}
