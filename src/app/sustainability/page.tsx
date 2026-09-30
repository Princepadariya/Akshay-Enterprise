import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";
import { TodoMark } from "@/components/todo-mark";
import { sustainability } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sustainability & CSR",
  description: "Brass chip recovery, coolant management, energy efficiency and community initiatives at Akshay Enterprise.",
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Sustainability", href: "/sustainability" }]}
        title="Sustainability and CSR"
        lead={sustainability.intro}
        image="chips"
      />
      <section className="container-x grid gap-16 py-16 md:py-24">
        {sustainability.pillars.map((p, i) => (
          <Reveal key={p.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-sm border border-border md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
              <Photo k={p.image} className="absolute inset-0" sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
            <div className="md:col-span-6">
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                {p.title}
                <TodoMark show={p.placeholder} />
              </h2>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <CtaBand title="Ask about our sustainability practices." body="We are happy to complete supplier sustainability questionnaires." primary={{ label: "Contact", href: "/contact" }} />
    </>
  );
}
