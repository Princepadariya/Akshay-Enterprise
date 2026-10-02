import Link from "next/link";
import { ArrowRight, FileText, MessageSquareText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { RoutingList } from "./routing-list";
import { InspectionCard } from "./inspection-card";
import { TodoMark } from "@/components/todo-mark";
import type { CategoryDetail } from "@/content/category-details";
import { faqSchema } from "@/lib/schema";

/** Overview paragraphs + four feature tiles. */
export function DetailOverview({ detail, title }: { detail: CategoryDetail; title: string }) {
  return (
    <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        <h2 className="max-w-[18ch] font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-4xl">{title}</h2>
        <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
          {detail.overview.map((p, i) => (
            <p key={i} className="max-w-[62ch]">
              {p}
            </p>
          ))}
        </div>
      </div>
      <ul className="grid gap-px self-start overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:col-span-6">
        {detail.features.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.05} className="bg-card p-6">
            <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** Routing sheet + inspection plan, styled like the shop-floor document it represents. */
export function DetailRouting({ detail, partName }: { detail: CategoryDetail; partName: string }) {
  return (
    <section className="border-y border-border bg-surface py-16 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            How it is made
            <TodoMark />
          </h2>
          <p className="mt-3 max-w-[56ch] text-muted-foreground">The typical routing for this family. Your drawing may add or remove operations.</p>
          <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border bg-surface-2/60 px-5 py-3 font-mono text-[11px] tracking-wider text-muted-foreground">
              <span className="truncate">ROUTING SHEET  /  {partName.toUpperCase()}</span>
              <span className="hidden sm:inline">SHEET 1 OF 1</span>
            </div>
            <RoutingList route={detail.route} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Inspection plan</h2>
            <p className="mt-3 text-muted-foreground">Checks applied to every lot before release.</p>
            <div className="mt-8">
              <InspectionCard checks={detail.checks} partName={partName} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Customisation options and standards as one "drawing notes" sheet (numbered notes + referenced
 * documents on a drawing grid), beside numbered FAQs with the first one open and a contact card.
 * FAQPage JSON-LD included.
 */
export function DetailOptions({ detail, withSchema = true }: { detail: CategoryDetail; withSchema?: boolean }) {
  return (
    <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Options and standards</h2>
        <p className="mt-3 max-w-[48ch] text-muted-foreground">Call any of these out on your drawing or purchase order.</p>

        <Reveal className="relative mt-8 overflow-hidden rounded-sm border border-border bg-card">
          <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-60" />
          <div className="relative flex items-center justify-between gap-4 border-b border-border bg-surface-2/60 px-5 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
            <span>Drawing notes</span>
            <span>{detail.options.length + detail.standards.length} items</span>
          </div>

          <div className="relative px-5 py-5">
            <h3 className="font-mono text-[11px] font-medium tracking-[0.14em] text-brass-ink uppercase">Customisation options</h3>
            <ol className="mt-3 grid">
              {detail.options.map((o, i) => (
                <li
                  key={o}
                  className="group grid grid-cols-[2rem_1fr_auto] items-center gap-2 border-b border-dashed border-border py-2.5 text-[15px] last:border-b-0"
                >
                  <span className="font-mono text-xs text-muted-foreground">{i + 1}.</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{o}</span>
                  <Plus strokeWidth={1.5} className="size-4 text-brass opacity-0 transition-opacity group-hover:opacity-100" />
                </li>
              ))}
            </ol>
          </div>

          <div className="relative border-t border-border px-5 py-5">
            <h3 className="flex items-center font-mono text-[11px] font-medium tracking-[0.14em] text-brass-ink uppercase">
              Standards referenced
              <TodoMark />
            </h3>
            <ul className="mt-3 grid gap-2">
              {detail.standards.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-sm border border-border bg-background/70 px-3 py-2.5">
                  <FileText strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-brass" />
                  <span className="font-mono text-[12.5px] leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Common questions</h2>
        <Accordion type="single" collapsible defaultValue={detail.faqs[0]?.q} className="mt-4 border-b border-border">
          {detail.faqs.map((f, i) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="group/q gap-5 py-6 text-left font-display text-lg font-semibold tracking-tight hover:no-underline md:text-xl">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-normal text-brass-ink">Q.{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-colors group-hover/q:text-brass-ink">{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-[3.25rem] text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 flex flex-col gap-5 rounded-sm border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brass-soft text-brass-ink">
              <MessageSquareText strokeWidth={1.5} className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">Question not covered here?</p>
              <p className="mt-1 text-sm text-muted-foreground">Send it with your drawing and an engineer will reply.</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/faq">All FAQs</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/contact">
                Ask us <ArrowRight strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {withSchema ? <JsonLd data={faqSchema(detail.faqs.map((f) => ({ ...f, group: "Product" })))} /> : null}
    </section>
  );
}
