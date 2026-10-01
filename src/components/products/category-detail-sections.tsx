import { BadgeCheck, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { RoutingList } from "./routing-list";
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
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Inspection plan</h2>
          <p className="mt-3 text-muted-foreground">Checks applied to every lot before release.</p>
          <ul className="mt-8 grid gap-3">
            {detail.checks.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-sm border border-border bg-card p-4">
                <BadgeCheck strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-brass" />
                <span className="text-[15px]">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Customisation options, standards and FAQs (with FAQPage JSON-LD). */
export function DetailOptions({ detail, withSchema = true }: { detail: CategoryDetail; withSchema?: boolean }) {
  return (
    <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className="grid content-start gap-10 lg:col-span-5">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Customisation options</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {detail.options.map((o) => (
              <li key={o} className="rounded-sm border border-border px-3 py-1.5 text-sm">
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Standards referenced
            <TodoMark />
          </h2>
          <ul className="mt-5 grid gap-2.5">
            {detail.standards.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm">
                <FileText strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-brass" />
                <span className="font-mono text-[12.5px] leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-7">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Common questions</h2>
        <Accordion type="multiple" className="mt-4">
          {detail.faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold tracking-tight hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {withSchema ? <JsonLd data={faqSchema(detail.faqs.map((f) => ({ ...f, group: "Product" })))} /> : null}
    </section>
  );
}
