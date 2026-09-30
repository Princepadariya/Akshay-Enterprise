import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/sections/section-header";
import { site } from "@/content/site";

/** Differentiators as an editorial two-column index (not three equal cards). */
export function WhyAkshay() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader title="Why OEMs work with us" />
          </div>
        </div>
        <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
          {site.differentiators.map((d, i) => {
            return (
              <Reveal as="li" key={d.title} delay={(i % 2) * 0.08} className="border-t border-border py-8">
                <h3 className="font-display text-xl font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 max-w-[40ch] leading-relaxed text-muted-foreground">{d.body}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
