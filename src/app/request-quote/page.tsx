import { Suspense } from "react";
import { Clock, FileCheck2, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { RfqForm } from "@/components/forms/rfq-form";
import { TodoMark } from "@/components/todo-mark";
import { site, mainEmail } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description: "Send drawings and requirements for custom brass and metal turned parts. Get a costed quotation from Akshay Enterprise.",
  path: "/request-quote",
});

export default function RequestQuotePage() {
  const h = site.quoteTurnaroundHours;
  return (
    <section className="relative">
      <div aria-hidden className="grid-lines mask-fade-b absolute inset-x-0 top-0 h-[520px] opacity-60" />
      <div className="container-x relative grid gap-12 pt-28 pb-20 md:pt-36 lg:grid-cols-12">
        <aside className="flex flex-col gap-6 lg:col-span-4">
          <Breadcrumbs items={[{ name: "Request a Quote", href: "/request-quote" }]} />
          <h1 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-5xl">Request a Quote</h1>
          <p className="leading-relaxed text-muted-foreground">
            Four short steps. Attach a drawing if you have one. Every request is reviewed by an engineer.
          </p>
          <ul className="mt-2 grid gap-4 text-sm">
            <li className="flex gap-3">
              <Clock strokeWidth={1.5} className="size-5 shrink-0 text-brass" />
              <span>
                Quote or questions within {h.value} hours
                <TodoMark show={h.placeholder} />
              </span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck strokeWidth={1.5} className="size-5 shrink-0 text-brass" />
              <span>Drawings kept confidential; NDA on request</span>
            </li>
            <li className="flex gap-3">
              <FileCheck2 strokeWidth={1.5} className="size-5 shrink-0 text-brass" />
              <span>First-off samples with an inspection report</span>
            </li>
          </ul>
          <p className="mt-4 border-t border-border pt-6 text-sm text-muted-foreground">
            Prefer email? Write to{" "}
            <a href={mainEmail.href} className="font-mono text-foreground underline underline-offset-2">
              {mainEmail.display}
            </a>
          </p>
        </aside>
        <div className="lg:col-span-8">
          <Suspense fallback={<div className="h-[560px] animate-pulse rounded-sm border border-border bg-card" />}>
            <RfqForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
