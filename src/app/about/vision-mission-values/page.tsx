import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/motion/reveal";
import { visionMissionValues as vmv } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vision, Mission & Values",
  description: "The vision, mission and working values behind Akshay Enterprise's precision component manufacturing.",
  path: "/about/vision-mission-values",
});

export default function VmvPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About", href: "/about" },
          { name: "Vision, mission, values", href: "/about/vision-mission-values" },
        ]}
        title="Vision, mission and values"
      />

      <section className="container-x grid gap-4 py-16 md:grid-cols-2 md:py-24">
        {[vmv.vision, vmv.mission].map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08} className="relative overflow-hidden rounded-sm border border-border bg-surface p-8 md:p-12">
            <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-70" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.18em] text-brass-ink uppercase">{b.title}</p>
              <p className="mt-6 font-display text-2xl leading-[1.25] font-medium tracking-[-0.02em] md:text-3xl">{b.body}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHeader title="Our values" />
        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {vmv.values.map((v, i) => {
            return (
              <Reveal as="li" key={v.title} delay={(i % 3) * 0.06} className="border-t border-border py-8">
                <h3 className="font-display text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{v.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>
    </>
  );
}
