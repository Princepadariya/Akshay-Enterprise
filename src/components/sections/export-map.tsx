"use client";

import { useState } from "react";
import { WorldMap } from "@/components/sections/world-map";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";
import type { MapData } from "@/lib/world-map";
import { cn } from "@/lib/utils";

/**
 * Export map + region list, linked: hovering or focusing a region in the list (or its pin on the map)
 * highlights that route and fades the rest.
 * layout="side": list beside the map (home page). layout="below": list as cards under the map.
 */
export function ExportMap({ data, layout = "side" }: { data: MapData; layout?: "side" | "below" }) {
  const [active, setActive] = useState<string | null>(null);

  const list = (
    <ul
      className={cn("grid gap-3", layout === "side" ? "sm:grid-cols-2 lg:grid-cols-1" : "mt-8 sm:grid-cols-2 lg:grid-cols-3")}
      onMouseLeave={() => setActive(null)}
    >
      {site.exportRegions.map((r) => {
        const on = active === r.region;
        return (
          <li key={r.region}>
            <button
              type="button"
              onMouseEnter={() => setActive(r.region)}
              onFocus={() => setActive(r.region)}
              onBlur={() => setActive(null)}
              aria-pressed={on}
              className={cn(
                "w-full rounded-sm border-l-2 py-2 pr-3 pl-4 text-left transition-all duration-300",
                layout === "below" && "border border-l-2 p-5",
                on ? "border-brass bg-brass-soft" : "border-brass/40 hover:border-brass",
                active && !on && "opacity-50",
              )}
            >
              <span className="block font-display font-semibold tracking-tight">
                {r.region}
                <TodoMark show={r.placeholder} />
              </span>
              <span className="mt-1 block font-mono text-[12px] text-muted-foreground">{r.countries.join(", ")}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const map = (
    <figure className="relative">
      <WorldMap data={data} active={active} onActiveChange={setActive} className="h-auto w-full" />
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-blueprint" /> Plant, Gujarat
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-brass" /> Export region
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-6 bg-gradient-to-r from-blueprint to-brass" /> Shipment route
        </span>
      </figcaption>
    </figure>
  );

  if (layout === "below") {
    return (
      <>
        <div className="rounded-sm border border-border bg-surface p-4 md:p-8">{map}</div>
        {list}
      </>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-8">{map}</div>
      <div className="lg:col-span-4">{list}</div>
    </div>
  );
}
