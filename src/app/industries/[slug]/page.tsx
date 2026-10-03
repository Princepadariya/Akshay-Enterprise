import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { ProductCard } from "@/components/sections/product-card";
import { CtaBand } from "@/components/sections/cta-band";
import { getIndustry, industries } from "@/content/industries";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/seo";
import { BatchReveal } from "@/components/motion/batch-reveal";
import { Reveal } from "@/components/motion/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({ title: `${ind.name} Components`, description: `${ind.summary} ${ind.description}`, path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const related = products.filter((p) => p.industries.includes(ind.slug)).slice(0, 6);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: ind.name, href: `/industries/${ind.slug}` },
        ]}
        title={ind.name}
        lead={ind.description}
        image={ind.image}
      />

      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader title="Typical parts" lead="Components we make for this sector. Others can be made to your drawing." />
          <ul className="mt-8 flex flex-wrap gap-2">
            {ind.parts.map((p) => (
              <li key={p} className="rounded-sm border border-border bg-card px-3 py-1.5 font-mono text-[12px] transition-colors hover:border-brass/60">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* what matters in this sector, laid out as a supplier brief */}
        <div className="min-w-0 lg:col-span-8">
          <div className="relative overflow-hidden rounded-sm border border-border bg-card">
            <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-50" />
            <div className="relative flex items-center justify-between gap-4 border-b border-border bg-surface-2/60 px-5 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
              <span className="min-w-0 truncate">Supplier brief / {ind.name}</span>
              <span className="shrink-0">{ind.priorities.length} requirements</span>
            </div>
            <ol className="relative">
              {ind.priorities.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 0.06}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-dashed border-border px-5 py-6 transition-colors duration-300 last:border-b-0 hover:bg-brass-soft md:grid-cols-[3rem_minmax(0,14rem)_1fr] md:gap-6 md:px-7"
                >
                  <span className="font-mono text-xs text-brass-ink">R{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">{p.title}</h3>
                  <p className="col-start-2 text-sm leading-relaxed text-muted-foreground md:col-start-3">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-border bg-surface py-16 md:py-24">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Products for {ind.name.toLowerCase()}</h2>
            <BatchReveal>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} className="h-full" />
                  </li>
                ))}
              </ul>
            </BatchReveal>
            <Link href={`/products?industry=${ind.slug}`} className="mt-8 inline-block text-sm font-medium text-brass-ink hover:underline">
              See all matching products
            </Link>
          </div>
        </section>
      ) : null}

      <CtaBand title={`Sourcing ${ind.name.toLowerCase()} parts?`} body="Share drawings and annual volumes. We will propose the most economical process." />
    </>
  );
}
