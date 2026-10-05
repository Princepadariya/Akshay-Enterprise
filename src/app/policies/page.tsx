import Link from "next/link";
import { ArrowUpRight, BadgeCheck, HardHat, Pickaxe, ScanSearch, ShieldCheck, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { BatchReveal } from "@/components/motion/batch-reveal";
import { TodoMark } from "@/components/todo-mark";
import { policies, type Policy } from "@/content/policies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Policies",
  description:
    "Akshay Enterprise company policies: environment, health and safety, quality, cyber security, conflict minerals and counterfeit parts prevention.",
  path: "/policies",
});

const icons: Record<Policy["icon"], LucideIcon> = { HardHat, BadgeCheck, ShieldCheck, Pickaxe, ScanSearch };

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Policies", href: "/policies" }]}
        title="Company policies"
        lead="The commitments behind how we run the plant, protect your information and source our materials. Copies are available on request for supplier audits."
      />
      <section className="container-x py-14 md:py-20">
        <BatchReveal>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((p) => {
              const Icon = icons[p.icon];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/policies/${p.slug}`}
                    data-fx="spotlight"
                    className="group flex h-full flex-col justify-between gap-10 rounded-sm border border-border bg-card p-7 transition-colors hover:border-brass/60"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="grid size-12 place-items-center rounded-sm border border-border bg-surface">
                          <Icon strokeWidth={1.5} className="size-6 text-brass" />
                        </span>
                        <ArrowUpRight
                          strokeWidth={1.5}
                          className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
                        />
                      </div>
                      <h2 className="mt-6 font-display text-xl font-semibold tracking-tight">{p.title}</h2>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{p.summary}</p>
                    </div>
                    <p className="border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
                      {p.sections.length} sections{p.updated ? `, last updated ${p.updated}` : ""}
                      <TodoMark show={p.placeholder} />
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </BatchReveal>
      </section>
    </>
  );
}
