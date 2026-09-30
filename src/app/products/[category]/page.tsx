import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ProductCard } from "@/components/sections/product-card";
import { CtaBand } from "@/components/sections/cta-band";
import { categories, getCategory, productsInCategory } from "@/content/products";
import { materialName } from "@/content/materials";
import { pageMetadata } from "@/lib/seo";
import { getCategoryDetail } from "@/content/category-details";
import { DetailOptions, DetailOverview, DetailRouting } from "@/components/products/category-detail-sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({ title: c.name, description: c.description, path: `/products/${c.slug}` });
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const items = productsInCategory(c.slug);
  const mats = Array.from(new Set(items.flatMap((p) => p.materials)));
  const detail = getCategoryDetail(c.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Products", href: "/products" },
          { name: c.short, href: `/products/${c.slug}` },
        ]}
        title={c.name}
        lead={c.description}
        image={c.image}
        dimension={c.spec}
      >
        <div className="flex flex-wrap gap-2">
          {mats.map((m) => (
            <span key={m} className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px]">
              {materialName(m)}
            </span>
          ))}
        </div>
      </PageHero>

      {detail ? <DetailOverview detail={detail} title={`About our ${c.short.toLowerCase()}`} /> : null}

      <section className={detail ? "container-x pb-16 md:pb-24" : "container-x py-14 md:py-20"}>
        <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">Product lines</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} className="h-full" />
            </li>
          ))}
        </ul>
      </section>

      {detail ? (
        <>
          <DetailRouting detail={detail} partName={c.short} />
          <DetailOptions detail={detail} />
        </>
      ) : null}

      <section className="container-x pb-8">
        <nav aria-label="Other categories" className="border-t border-border pt-10">
          <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Other product families</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {categories
              .filter((o) => o.slug !== c.slug)
              .map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/products/${o.slug}`}
                    className="inline-block rounded-sm border border-border px-3 py-1.5 text-sm transition-colors hover:border-brass/60 hover:text-brass-ink"
                  >
                    {o.short}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </section>

      <CtaBand
        title="Need a variant that is not listed?"
        body="Share the drawing or a sample with the material, finish and annual quantity."
      />
    </>
  );
}
