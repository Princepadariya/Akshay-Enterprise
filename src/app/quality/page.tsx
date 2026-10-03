import Link from "next/link";
import { BadgeCheck, FileText } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { InstrumentGrid } from "@/components/sections/instrument-grid";
import { ReadoutStrip } from "@/components/sections/readout-strip";
import { InspectionFlow } from "@/components/sections/inspection-flow";
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
        <div className="mt-12">
          <InspectionFlow stages={inspectionStages} />
        </div>
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
