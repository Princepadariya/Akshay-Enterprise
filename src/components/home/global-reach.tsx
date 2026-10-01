import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExportMap } from "@/components/sections/export-map";
import { SectionHeader } from "@/components/sections/section-header";
import { getWorldMap } from "@/lib/world-map";

export function GlobalReach() {
  const map = getWorldMap();
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          title="Export markets"
          lead="Parts are packed and documented for sea and air freight from Gujarat. Hover a region to trace its route."
        />
        <div className="mt-12">
          <ExportMap data={map} layout="side" />
        </div>
        <Link href="/global-presence" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
          Export process and documentation <ArrowRight strokeWidth={1.5} className="size-4" />
        </Link>
      </div>
    </section>
  );
}
