import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";
import { finishes, finishingNote, materials } from "@/content/materials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Materials & Finishes",
  description:
    "Brass grades CW614N, CZ121, C36000, DZR brass CW602N, stainless steel 303/304/316, mild steel, aluminium and copper alloys, with nickel, tin, chrome, silver and zinc plating.",
  path: "/materials",
});

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Materials", href: "/materials" }]}
        title="Materials and finishes"
        lead="Grade selection drives machinability, conductivity, corrosion resistance and cost. We help you pick, and we certify what we use."
        image="barStock"
      />

      <section className="container-x grid gap-4 py-16 md:py-24">
        {materials.map((m, i) => (
          <Reveal
            key={m.key}
            id={m.key}
            className="grid scroll-mt-28 overflow-hidden rounded-sm border border-border bg-card md:grid-cols-12"
          >
            <div className={`relative min-h-56 md:col-span-4 ${i % 2 ? "md:order-2" : ""}`}>
              <Photo k={m.image} className="absolute inset-0" sizes="(min-width: 768px) 33vw, 100vw" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 z-[2] h-1.5" style={{ background: m.swatch }} />
            </div>
            <div className="grid gap-6 p-6 md:col-span-8 md:p-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{m.name}</h2>
                <p className="mt-2 font-mono text-[12px] text-brass-ink">{m.grades.join("  /  ")}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{m.summary}</p>
                <p className="mt-5 text-sm">
                  <span className="text-muted-foreground">Typical uses: </span>
                  {m.uses.join(", ")}
                </p>
              </div>
              <dl className="grid content-start gap-3 border-t border-border pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                {m.properties.map((p) => (
                  <div key={p.label} className="grid grid-cols-[8rem_1fr] gap-3">
                    <dt className="text-sm text-muted-foreground">{p.label}</dt>
                    <dd className="font-mono text-[13px]">{p.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-border pt-5 lg:col-span-2">
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  Nominal composition, % by weight: {m.composition.grade}, {m.composition.standard}
                </p>
                <dl className="mt-3 flex flex-wrap gap-2">
                  {m.composition.elements.map((e) => (
                    <div key={e.el} className="flex items-baseline gap-2 rounded-sm border border-border bg-surface px-3 py-2">
                      <dt className="font-display text-lg font-semibold">{e.el}</dt>
                      <dd className="font-mono text-[12px] text-muted-foreground">{e.range}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-border bg-surface py-16 md:py-24">
        <div className="container-x">
          <SectionHeader title="Finishes and plating" lead={finishingNote} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map((f) => (
              <li key={f.key} className="bg-card p-6">
                <p className="font-display text-lg font-semibold tracking-tight">{f.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Not sure which grade to specify?" body="Tell us the application and environment. We will recommend a grade and finish, with the trade-offs." />
    </>
  );
}
