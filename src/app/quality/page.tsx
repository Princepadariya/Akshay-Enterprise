import Link from "next/link";
import { BadgeCheck, FileText } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
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
        <dl className="container-x grid grid-cols-2 gap-px py-12 md:grid-cols-4">
          {toleranceHighlights.map((t) => (
            <div key={t.label} className="flex flex-col-reverse gap-1 py-4">
              <dt className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {t.label}
                <TodoMark />
              </dt>
              <dd className="font-mono text-3xl font-medium tracking-tight md:text-4xl">
                {t.value} <span className="text-base text-muted-foreground">{t.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHeader title="Inspection stages" lead="A part cannot move to the next stage until it passes the gate before it." />
        <ol className="mt-12 grid gap-4 lg:grid-cols-3">
          {inspectionStages.map((s, i) => (
            <Reveal as="li" key={s.stage} delay={i * 0.08} className="relative flex flex-col rounded-sm border border-border bg-card p-6 md:p-8">
              <span aria-hidden className="metal-brass absolute top-0 left-0 h-[2px] w-16" />
              <p className="font-mono text-xs tracking-widest text-brass-ink uppercase">{s.stage}</p>
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
            <SectionHeader title="Measuring instruments" />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:col-span-8">
            {instruments.map((ins) => (
              <li key={ins.name} className="bg-card p-5">
                <p className="font-medium">
                  {ins.name}
                  <TodoMark show={ins.placeholder} />
                </p>
                <p className="mt-1 font-mono text-[12px] text-muted-foreground">{ins.use}</p>
              </li>
            ))}
          </ul>
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
