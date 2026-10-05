import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { TodoMark } from "@/components/todo-mark";
import type { LegalDoc } from "@/content/legal";
import type { Crumb } from "@/lib/schema";

/**
 * Long-form document page (legal pages and company policies).
 * Sticky "on this page" index, numbered sections, optional approval line and related documents.
 */
export function LegalPage({
  doc,
  href,
  crumbs,
  approvedBy,
  related,
}: {
  doc: LegalDoc;
  href: string;
  crumbs?: Crumb[];
  approvedBy?: string;
  related?: { title: string; href: string; summary?: string }[];
}) {
  return (
    <>
      <PageHero crumbs={crumbs ?? [{ name: doc.title, href }]} title={doc.title} lead={doc.intro}>
        <dl className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted-foreground">
          {doc.updated ? (
            <div className="flex gap-2">
              <dt>Last updated:</dt>
              <dd className="text-foreground">
                {doc.updated}
                <TodoMark />
              </dd>
            </div>
          ) : null}
          {approvedBy ? (
            <div className="flex gap-2">
              <dt>Approved by:</dt>
              <dd className="text-foreground">
                {approvedBy}
                <TodoMark />
              </dd>
            </div>
          ) : null}
        </dl>
      </PageHero>
      <article className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 grid gap-2 text-sm">
            {doc.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s-${i}`} className="flex gap-3 text-muted-foreground hover:text-foreground">
                  <span className="font-mono text-[11px] text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid gap-12 lg:col-span-8">
          {doc.sections.map((s, i) => (
            <section key={s.heading} id={`s-${i}`} className="scroll-mt-28 border-t border-border pt-8 first:border-t-0 first:pt-0">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                <span className="mr-3 font-mono text-sm font-normal text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              <div className="mt-4 grid gap-3 leading-relaxed text-muted-foreground">
                {s.body.map((p, j) => (
                  <p key={j} className="max-w-[68ch]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {related && related.length ? (
        <section className="border-t border-border bg-surface py-14 md:py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Other policies</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    data-fx="spotlight"
                    className="group flex h-full flex-col justify-between gap-6 rounded-sm border border-border bg-card p-5 transition-colors hover:border-brass/60"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold tracking-tight">{r.title}</span>
                      {r.summary ? <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{r.summary}</span> : null}
                    </span>
                    <ArrowRight strokeWidth={1.5} className="size-4 text-brass transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
