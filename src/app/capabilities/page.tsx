import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TodoMark } from "@/components/todo-mark";
import { capabilities, capabilityTable, developmentWorkflow, packagingPoints } from "@/content/capabilities";
import { StepScroller } from "@/components/sections/step-scroller";
import { getIcon, ICON_STROKE } from "@/lib/icons";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Capabilities & Custom Manufacturing",
  description:
    "CNC turning, cam auto machining, VMC, threading, knurling, drilling and secondary operations. Build-to-print, drawing and sample based development of custom brass and metal parts.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Capabilities", href: "/capabilities" }]}
        title="Capabilities and custom manufacturing"
        lead="Send a drawing or a sample. We choose the process that fits your volume and tolerance, and prove it with a first-off before production."
        image="latheTurret"
      />

      <section className="container-x py-16 md:py-24">
        <SectionHeader title="Machining and secondary operations" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => {
            const Icon = getIcon(c.icon);
            return (
              <Reveal as="li" key={c.slug} delay={(i % 4) * 0.05} className="flex flex-col gap-4 bg-card p-6">
                <Icon strokeWidth={ICON_STROKE} className="size-7 text-brass" />
                <h3 className="font-display text-lg font-semibold tracking-tight">{c.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <p className="mt-auto font-mono text-[11px] text-foreground/80">{c.spec}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Size and tolerance ranges
            <TodoMark />
          </h2>
          <p className="mt-3 max-w-[60ch] text-muted-foreground">Typical achievable values. Tighter limits are possible on specific features; ask us.</p>
          <div className="mt-10 overflow-x-auto rounded-sm border border-border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  <th scope="col" className="px-5 py-4 font-medium">Process</th>
                  <th scope="col" className="px-5 py-4 font-medium">Size range</th>
                  <th scope="col" className="px-5 py-4 font-medium">Tolerance</th>
                  <th scope="col" className="px-5 py-4 font-medium">Materials</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {capabilityTable.map((r, i) => (
                  <tr key={r.process} className={i % 2 ? "bg-surface/60" : undefined}>
                    <th scope="row" className="px-5 py-4 font-sans text-sm font-medium">{r.process}</th>
                    <td className="px-5 py-4">{r.size}</td>
                    <td className="px-5 py-4 text-brass-ink">{r.tolerance}</td>
                    <td className="px-5 py-4 text-muted-foreground">{r.materials}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <StepScroller
        title="Custom development process"
        lead="Drawing-based and sample-based development follow the same path, with an approval gate before volume."
        steps={developmentWorkflow}
      />

      <section className="border-t border-border bg-surface py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              title="From prototype to production"
              lead="Development lots run on CNC to prove fit and function. Once approved, the part moves to the most economical process (often a cam automat for brass) with the same inspection plan, so your approval carries over."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:col-span-2">Packaging and export documentation</h3>
            {packagingPoints.map((p) => (
              <div key={p.title} className="rounded-sm border border-border bg-card p-6">
                <h4 className="font-display text-lg font-semibold tracking-tight">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Have a drawing ready?" body="Upload it with the material and annual quantity. An engineer replies with a costed quote." />
    </>
  );
}
