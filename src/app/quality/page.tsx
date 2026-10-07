import Link from "next/link";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { InstrumentGrid } from "@/components/sections/instrument-grid";
import { ReadoutStrip } from "@/components/sections/readout-strip";
import { InspectionFlow } from "@/components/sections/inspection-flow";
import { TodoMark } from "@/components/todo-mark";
import { Button } from "@/components/ui/button";
import { inspectionStages, instruments, qualityIntro, qualityPolicy, toleranceHighlights } from "@/content/quality";
import { CertificationList } from "@/components/sections/certification-list";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality",
  description:
    "IATF 16949, ISO 9001, ISO 14001, ISO 45001 and RoHS certified. Incoming, in-process and final inspection of precision turned components.",
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

      <section id="certifications" className="container-x scroll-mt-28 pt-16 md:pt-24">
        <SectionHeader
          title="Certifications"
          lead="Our management systems are independently audited and certified."
        />
        <CertificationList className="mt-10" />
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="relative overflow-hidden rounded-sm border border-border bg-surface p-8 md:p-12">
          <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-60" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">
                Quality policy
                <TodoMark show={qualityPolicy.placeholder} />
              </h2>
              <p className="mt-6 max-w-[70ch] text-lg leading-relaxed text-muted-foreground">{qualityPolicy.text}</p>
            </div>
            <Button asChild variant="outline">
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
