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
          <SectionHeader title="Key requirements" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {ind.parts.map((p) => (
              <li key={p} className="rounded-sm border border-border px-3 py-1.5 font-mono text-[12px]">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
          {ind.priorities.map((p) => (
            <li key={p.title} className="relative rounded-sm border border-border bg-card p-6">
              <span aria-hidden className="metal-brass absolute top-0 left-0 h-[2px] w-12" />
              <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {related.length ? (
        <section className="border-t border-border bg-surface py-16 md:py-24">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Products for {ind.name.toLowerCase()}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} className="h-full" />
                </li>
              ))}
            </ul>
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
