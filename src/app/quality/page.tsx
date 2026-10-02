import Link from "next/link";
import { BadgeCheck, ChevronRight, FileText } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { InstrumentGrid } from "@/components/sections/instrument-grid";
import { ReadoutStrip } from "@/components/sections/readout-strip";
import { TodoMark } from "@/components/todo-mark";
import { Button } from "@/components/ui/button";
import { inspectionStages, instruments, qualityIntro, qualityPolicy, toleranceHighlights } from "@/content/quality";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality",
  description:
    "Incoming, in-process and final inspection of precision turned components. Measuring instruments, certifications and quality policy at Akshay Enterprise.",
  path: "/quality",
});

export default function QualityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Quality", href: "/quality" }]}
        title={qualityIntro.headline}
        lead={qualityIntro.body}
        image="inspector"
      />

      <section className="border-b border-border">
        <div className="container-x py-12 md:py-16">
          <ReadoutStrip items={toleranceHighlights} />
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHeader title="Inspection stages" lead="A part cannot move to the next stage until it passes the gate before it." />
        <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {inspectionStages.map((s, i) => (
            <Reveal as="li" key={s.stage} delay={i * 0.08} className="relative flex flex-col rounded-sm border border-border bg-card p-6 md:p-8">
              <span aria-hidden className="metal-brass absolute top-0 left-0 h-[2px] w-16" />
              {/* gate connector to the next stage: right on large screens, below on small */}
              {i < inspectionStages.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute -bottom-8 left-1/2 z-[1] grid size-8 -translate-x-1/2 rotate-90 place-items-center rounded-full border border-brass/60 bg-background text-brass-ink lg:top-1/2 lg:-right-7 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2 lg:rotate-0"
                >
                  <ChevronRight strokeWidth={1.75} className="size-4" />
                </span>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs tracking-widest text-brass-ink uppercase">{s.stage}</p>
                <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10.5px] tracking-wide text-muted-foreground">
                  Gate {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <ul className="mt-6 grid gap-3">
                {s.checks.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <BadgeCheck strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-brass" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeader title="Measuring instruments" lead="What each feature is checked with, from the machine to the inspection room." />
            </div>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <InstrumentGrid items={instruments} />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Certifications</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {site.certifications.map((c) => (
              <li key={c.code} className="flex items-start gap-3 rounded-sm border border-border p-5">
                <BadgeCheck strokeWidth={1.5} className="size-6 shrink-0 text-brass" />
                <div>
                  <p className="font-medium">
                    {c.code}
                    <TodoMark show={c.placeholder} />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-sm border border-border bg-surface p-8 md:p-10">
          <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">
              Quality policy
              <TodoMark show={qualityPolicy.placeholder} />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{qualityPolicy.text}</p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/policies/quality">
                <FileText strokeWidth={1.5} /> Read the full quality policy
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand title="Need inspection reports with every lot?" body="Tell us your documentation requirements when you request a quote." />
    </>
  );
}
