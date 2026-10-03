import Link from "next/link";
import { ArrowUpRight, BookOpen, ClipboardCheck, Library } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { BatchReveal } from "@/components/motion/batch-reveal";
import { guides } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technical Resources",
  description:
    "Guides for buyers and engineers sourcing turned components: an RFQ checklist, brass grades compared, thread standards, plating and finishes, cost drivers and a glossary.",
  path: "/resources",
});

const kindIcon = { checklist: ClipboardCheck, guide: BookOpen, glossary: Library };
const kindLabel = { checklist: "Checklist", guide: "Guide", glossary: "Reference" };

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Resources", href: "/resources" }]}
        title="Technical resources"
        lead="Practical guides for buyers and engineers sourcing turned components: what to put on a drawing, how materials and threads compare, and what drives the price."
      />

      <section className="container-x py-16 md:py-24">
        <BatchReveal>
          <ul className="border-b border-border">
            {guides.map((g, i) => {
              const Icon = kindIcon[g.kind];
              return (
                <li key={g.slug} className="border-t border-border">
                  <Link
                    href={`/resources/${g.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-8"
                  >
                    <span className="flex flex-col items-start gap-3 pt-1 md:pt-0">
                      <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-brass-ink uppercase">
                        <Icon strokeWidth={1.5} className="size-3.5" aria-hidden />
                        {kindLabel[g.kind]} · {g.topic} · {g.readMinutes} min
                      </span>
                      <span className="mt-2 block font-display text-xl leading-tight font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                        {g.title}
                      </span>
                    </span>
                    <span className="col-span-3 col-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-span-1 md:col-start-3">{g.summary}</span>
                    <span className="col-start-3 row-start-1 grid size-10 place-items-center rounded-full border border-border transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-graphite md:col-start-4">
                      <ArrowUpRight strokeWidth={1.5} className="size-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </BatchReveal>
        <p className="mt-8 max-w-[70ch] font-mono text-[11.5px] leading-relaxed text-muted-foreground">
          These guides describe general engineering practice and published standards. Always work to the current edition of the
          relevant standard and your own drawing requirements.
        </p>
      </section>

      <CtaBand title="Have a drawing ready?" body="Send it with the material, finish and quantity. An engineer reviews it and replies with a costed quote." />
    </>
  );
}
