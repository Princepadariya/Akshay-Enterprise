import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { MachineryTable } from "@/components/sections/machinery-table";
import { StatCounter } from "@/components/sections/stat-counter";
import { Photo } from "@/components/photo";
import { TodoMark } from "@/components/todo-mark";
import { machinery, plant } from "@/content/machinery";
import { site } from "@/content/site";
import type { PhotoKey } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Infrastructure",
  description: "Plant, machinery and capacity at Akshay Enterprise: CNC turning centres, cam automats, VMCs and secondary operation machines in Gujarat, India.",
  path: "/infrastructure",
});

const strip: PhotoKey[] = ["factoryLine", "lathe", "barStock", "operatorLathe", "cncCutting", "warehouse"];

export default function InfrastructurePage() {
  const capacity = site.stats.filter((s) => ["Parts per month capacity", "Machines on the shop floor", "Years of turning experience"].includes(s.label));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Infrastructure", href: "/infrastructure" }]}
        title="Plant and machinery"
        lead="Turning, milling and secondary machines grouped by process, with raw material, inspection and packing on the same site."
        image="factoryLine"
      />

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader title="Plant overview" />
          <ul className="mt-8 grid gap-3">
            {plant.utilities.map((u) => (
              <li key={u} className="flex items-baseline gap-3 text-muted-foreground">
                {u}
              </li>
            ))}
          </ul>
        </div>
        <dl className="grid gap-px self-start overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:col-span-7">
          {[
            { label: "Location", v: plant.location },
            { label: "Covered area", v: plant.area },
            { label: "Power", v: plant.power },
            { label: "Operation", v: plant.shifts },
          ].map((f) => (
            <div key={f.label} className="bg-card p-6">
              <dt className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{f.label}</dt>
              <dd className="mt-2 font-display text-xl font-semibold tracking-tight">
                {f.v.value}
                <TodoMark show={f.v.placeholder} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x grid gap-10">
          <SectionHeader title="Machinery" lead="Sort by any column or filter by process group." />
          <MachineryTable rows={machinery} />
        </div>
      </section>

      <section aria-label="Plant photographs" className="py-16 md:py-24">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:px-8">
          {strip.map((k) => (
            <div key={k} className="relative aspect-[4/3] w-[80vw] shrink-0 snap-start overflow-hidden rounded-sm border border-border sm:w-[46vw] lg:w-[30vw]">
              <Photo k={k} className="absolute inset-0" sizes="(min-width: 1024px) 30vw, 80vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-8">
        <dl className="grid gap-10 border-t border-border pt-12 sm:grid-cols-3">
          {capacity.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-muted-foreground">
                {s.label}
                <TodoMark show={s.placeholder} />
              </dt>
              <dd className="font-display text-5xl font-semibold tracking-[-0.04em] tabular md:text-6xl">
                <StatCounter value={s.value} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaBand title="Planning a long-running programme?" body="Share annual volumes and call-off patterns and we will reserve machine time against your schedule." />
    </>
  );
}
