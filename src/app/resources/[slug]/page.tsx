import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { GuideSection } from "@/components/resources/guide-blocks";
import { GuideToc } from "@/components/resources/guide-toc";
import { PrintButton } from "@/components/resources/print-button";
import { Button } from "@/components/ui/button";
import { getGuide, guides } from "@/content/resources";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.summary, path: `/resources/${g.slug}` });
}

export default async function GuidePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const related = g.related.map(getGuide).filter((x) => x !== undefined);
  const isGlossary = g.kind === "glossary";
  const terms = [...(g.terms ?? [])].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];
  const toc = isGlossary ? letters.map((l) => ({ id: `letter-${l}`, heading: l })) : g.sections.map((s) => ({ id: s.id, heading: s.heading }));

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Resources", href: "/resources" },
          { name: g.short, href: `/resources/${g.slug}` },
        ]}
        title={g.title}
        lead={g.summary}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            <span className="rounded-sm border border-brass/50 bg-brass-soft px-2 py-0.5 text-brass-ink">{g.topic}</span>
            <Clock strokeWidth={1.5} className="size-3.5" aria-hidden />
            {g.readMinutes} min read
          </span>
          {g.kind === "checklist" ? <PrintButton /> : null}
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            {isGlossary ? (
              <nav aria-label="Jump to letter" className="print-hide">
                <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">Jump to letter</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {letters.map((l) => (
                    <li key={l}>
                      <a href={`#letter-${l}`} className="grid size-9 place-items-center rounded-sm border border-border font-mono text-sm transition-colors hover:border-brass hover:bg-brass hover:text-graphite">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <GuideToc items={toc} />
            )}
          </div>
        </aside>

        <article className="min-w-0 lg:col-span-9 xl:col-span-8">
          {isGlossary ? (
            <div className="grid gap-12">
              {letters.map((l) => (
                <section key={l} id={`letter-${l}`} aria-label={l} className="scroll-mt-28">
                  <h2 className="flex items-center gap-4 font-display text-3xl font-semibold">
                    {l}
                    <span aria-hidden className="h-px flex-1 bg-border" />
                  </h2>
                  <dl className="mt-4">
                    {terms
                      .filter((t) => t.term[0].toUpperCase() === l)
                      .map((t) => (
                        <div key={t.term} className="grid gap-1 border-b border-dashed border-border py-4 last:border-b-0 md:grid-cols-[14rem_1fr] md:gap-8">
                          <dt className="font-medium">{t.term}</dt>
                          <dd className="leading-relaxed text-foreground/85">{t.definition}</dd>
                        </div>
                      ))}
                  </dl>
                </section>
              ))}
            </div>
          ) : (
            <div className="grid gap-12">
              {g.sections.map((s, i) => (
                <GuideSection key={s.id} section={s} index={i} />
              ))}
            </div>
          )}

          {/* next steps */}
          <div className="print-hide mt-16 flex flex-col gap-5 rounded-sm border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">Ready to send a drawing?</p>
              <p className="mt-1 text-sm text-muted-foreground">An engineer reviews every request and replies with a costed quote.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {g.links
                .filter((l) => l.href !== "/request-quote")
                .map((l) => (
                  <Button key={l.href} asChild variant="outline" size="sm">
                    <Link href={l.href}>{l.label}</Link>
                  </Button>
                ))}
              <Button asChild size="sm">
                <Link href="/request-quote">
                  Request a quote <ArrowRight strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </div>

      {related.length ? (
        <section className="print-hide border-t border-border bg-surface py-14 md:py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Related guides</h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/resources/${r.slug}`}
                    className="group flex h-full flex-col justify-between gap-8 rounded-sm border border-border bg-card p-6 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-brass/60"
                  >
                    <span>
                      <span className="font-mono text-[10.5px] tracking-[0.14em] text-brass-ink uppercase">
                        {r.topic} · {r.readMinutes} min
                      </span>
                      <span className="mt-2 block font-display text-lg leading-snug font-semibold tracking-tight">{r.title}</span>
                    </span>
                    <span className="grid size-9 place-items-center self-end rounded-full border border-border transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-graphite">
                      <ArrowUpRight strokeWidth={1.5} className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <div className="print-hide">
        <CtaBand title="Have a part you need made?" body="Share the drawing, material and quantity. We will come back with a process, a price and a lead time." />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": isGlossary ? "DefinedTermSet" : "TechArticle",
          name: g.title,
          headline: g.title,
          description: g.summary,
          url: absoluteUrl(`/resources/${g.slug}`),
          publisher: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
          ...(isGlossary
            ? { hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.definition })) }
            : {}),
        }}
      />
    </>
  );
}
