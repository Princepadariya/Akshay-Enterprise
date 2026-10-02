import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { MachineryTable } from "@/components/sections/machinery-table";
import { PlantTour } from "@/components/sections/plant-tour";
import { Odometer } from "@/components/motion/odometer";
import { PlantTitleBlock } from "@/components/sections/plant-title-block";
import { TodoMark } from "@/components/todo-mark";
import { machinery, plant } from "@/content/machinery";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Infrastructure",
  description: "Plant, machinery and capacity at Akshay Enterprise: CNC turning centres, cam automats, VMCs and secondary operation machines in Gujarat, India.",
  path: "/infrastructure",
});

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

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader title="Plant overview" lead="The site at a glance: where it is, how it is powered and how it runs." />
        </div>
        <div className="min-w-0 lg:col-span-8">
          <PlantTitleBlock
            fields={[
              { label: "Location", value: plant.location.value, placeholder: plant.location.placeholder },
              { label: "Covered area", value: plant.area.value, placeholder: plant.area.placeholder },
              { label: "Power", value: plant.power.value, placeholder: plant.power.placeholder },
              { label: "Operation", value: plant.shifts.value, placeholder: plant.shifts.placeholder },
            ]}
            utilities={plant.utilities}
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x grid gap-10">
          <SectionHeader title="Machinery" lead="Sort by any column or filter by process group." />
          <MachineryTable rows={machinery} />
        </div>
      </section>

      <PlantTour />

      <section className="container-x pb-8">
        <dl className="grid gap-10 border-t border-border pt-12 sm:grid-cols-3">
          {capacity.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-muted-foreground">
                {s.label}
                <TodoMark show={s.placeholder} />
              </dt>
              <dd>
                <Odometer
                  value={`${s.value.toFixed("decimals" in s ? s.decimals : 0)}${s.suffix}`}
                  className="font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl"
                />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaBand title="Planning a long-running programme?" body="Share annual volumes and call-off patterns and we will reserve machine time against your schedule." />
    </>
  );
}
