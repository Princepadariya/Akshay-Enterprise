import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorldMap } from "@/components/sections/world-map";
import { SectionHeader } from "@/components/sections/section-header";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";
import { getWorldMap } from "@/lib/world-map";

export function GlobalReach() {
  const map = getWorldMap();
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          title="Export markets"
          lead="Parts are packed and documented for sea and air freight from Gujarat."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative lg:col-span-8">
            <WorldMap data={map} className="h-auto w-full" />
          </div>
          <div className="lg:col-span-4">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {site.exportRegions.map((r) => (
                <li key={r.region} className="border-l-2 border-brass/60 pl-4">
                  <p className="font-display font-semibold tracking-tight">
                    {r.region}
                    <TodoMark show={r.placeholder} />
                  </p>
                  <p className="mt-1 font-mono text-[12px] text-muted-foreground">{r.countries.join(", ")}</p>
                </li>
              ))}
            </ul>
            <Link href="/global-presence" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
              Export process and documentation <ArrowRight strokeWidth={1.5} className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
