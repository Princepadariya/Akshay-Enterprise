import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { ExportMap } from "@/components/sections/export-map";
import { ExportRoute } from "@/components/sections/export-route";
import { Photo } from "@/components/photo";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";
import { getWorldMap } from "@/lib/world-map";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Global Presence & Export",
  description:
    "Brass components exporter from Gujarat, India. Export regions, packing, documentation and Incoterms for international OEM customers.",
  path: "/global-presence",
});

export default function GlobalPresencePage() {
  const map = getWorldMap();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Global presence", href: "/global-presence" }]}
        title="Global presence and export"
        lead="Parts packed, documented and shipped so they clear customs and go straight to assembly."
        image="containers"
      />

      <section className="container-x py-16 md:py-24">
        <SectionHeader title="Export regions" lead="Hover a region or its pin to trace the route from our plant." />
        <div className="mt-10">
          <ExportMap data={map} layout="below" />
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="Packing and export documentation" />
            <div className="mt-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                Incoterms supported
                <TodoMark show={site.incoterms.placeholder} />
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.incoterms.value.map((t) => (
                  <li key={t} className="rounded-sm border border-brass/50 bg-brass-soft px-3 py-1.5 font-mono text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm border border-border lg:block">
              <Photo k="warehouse" className="absolute inset-0" sizes="40vw" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ExportRoute />
          </div>
        </div>
      </section>

      <CtaBand title="Importing turned parts from India?" body="Tell us your destination and Incoterm preference. We will quote landed or FOB." />
    </>
  );
}
