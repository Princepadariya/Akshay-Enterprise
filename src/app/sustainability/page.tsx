import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeader } from "@/components/sections/section-header";
import { MaterialLoop } from "@/components/sections/material-loop";
import { StepScroller } from "@/components/sections/step-scroller";
import { StatusBoard } from "@/components/sections/status-board";
import { ScrollStatement } from "@/components/sections/scroll-statement";
import { TodoMark } from "@/components/todo-mark";
import { sustainability } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sustainability & CSR",
  description: "Brass chip recovery, coolant management, energy efficiency and community initiatives at Akshay Enterprise.",
  path: "/sustainability",
});

const chips = sustainability.pillars[0];

const related = [
  { label: "EHS policy", href: "/policies/ehs", note: "Environment, health and safety at the plant" },
  { label: "Conflict minerals", href: "/policies/conflict-minerals", note: "Responsible sourcing of tin, tantalum, tungsten and gold" },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Sustainability", href: "/sustainability" }]} title="Sustainability and CSR" image="chips" />

      {/* opening statement, read at scroll speed */}
      <section className="container-x py-16 md:py-24">
        <ScrollStatement text={sustainability.intro} />
      </section>

      {/* the brass loop */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader title="The brass loop" />
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
              {chips.body}
              <TodoMark show={chips.placeholder} />
            </p>
          </div>
          <div className="lg:col-span-7">
            <MaterialLoop />
          </div>
        </div>
      </section>

      {/* pillars: sticky photo, text scrolls */}
      <StepScroller
        title="What we do"
        lead="Four areas we work on at the plant and with the community around it."
        steps={sustainability.pillars}
      />

      {/* where each practice stands */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader title="Where we stand" lead="The status of each practice described above, including what is still being evaluated." />
          </div>
          <div className="min-w-0 lg:col-span-8">
            <StatusBoard items={sustainability.status.items} placeholder={sustainability.status.placeholder} />
          </div>
        </div>
      </section>

      {/* related policies */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-3 sm:grid-cols-2">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-center justify-between gap-6 rounded-sm border border-border bg-card p-6 transition-colors duration-300 hover:border-brass/60"
            >
              <span>
                <span className="block font-mono text-[11px] tracking-[0.14em] text-brass-ink uppercase">Related policy</span>
                <span className="mt-2 block font-display text-xl font-semibold tracking-tight">{r.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{r.note}</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-graphite">
                <ArrowUpRight strokeWidth={1.5} className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title="Ask about our sustainability practices." body="We are happy to complete supplier sustainability questionnaires." primary={{ label: "Contact", href: "/contact" }} />
    </>
  );
}
