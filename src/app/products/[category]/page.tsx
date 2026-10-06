import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getCategory,
  getMaterialRange,
  materialRangeGroups,
  materialRanges,
  productsInCategory,
} from "@/content/products";
import { materials } from "@/content/materials";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ProductTabs, type ProductGroup } from "@/components/products/category-product-grid";

export const dynamicParams = false;

/** /products/[slug] serves both material ranges (brass-parts, ...) and product categories. */
export function generateStaticParams() {
  return [...materialRanges.map((m) => ({ category: m.slug })), ...categories.map((c) => ({ category: c.slug }))];
}

/** full material name without the abbreviation, e.g. "Stainless Steel" */
const materialLabel = (key: string) => (materials.find((m) => m.key === key)?.name ?? key).replace(/ \(.*\)$/, "");
const materialSummary = (key: string) => materials.find((m) => m.key === key)?.summary ?? "";

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const range = getMaterialRange(category);
  if (range) return pageMetadata({ title: range.name, description: materialSummary(range.materials[0]), path: `/products/${range.slug}` });
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({ title: c.name, description: c.description, path: `/products/${c.slug}` });
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category } = await params;

  const range = getMaterialRange(category);
  if (range) {
    const groups: ProductGroup[] = materialRangeGroups(range).map((g) => ({ ...g, href: `/products/${g.key}` }));
    const total = new Set(groups.flatMap((g) => g.items.map((p) => p.slug))).size;
    return (
      <Layout
        crumb={{ name: range.name, href: `/products/${range.slug}` }}
        title={range.name}
        lead={materialSummary(range.materials[0])}
        image={range.image}
        stats={[`${total} products`, `${groups.length} product types`]}
        groups={groups}
        all="grouped"
      />
    );
  }

  const c = getCategory(category);
  if (!c) notFound();
  const items = productsInCategory(c.slug);
  const groups: ProductGroup[] = Array.from(new Set(items.flatMap((p) => p.materials))).map((m) => ({
    key: m,
    label: materialLabel(m),
    items: items.filter((p) => p.materials.includes(m)),
  }));

  return (
    <Layout
      crumb={{ name: c.short, href: `/products/${c.slug}` }}
      title={c.name}
      lead={c.description}
      image={c.image}
      stats={[`${items.length} products`, `${groups.length} material${groups.length === 1 ? "" : "s"}`]}
      groups={groups}
      all="flat"
    />
  );
}

function Layout({
  crumb,
  title,
  lead,
  image,
  stats,
  groups,
  all,
}: {
  crumb: { name: string; href: string };
  title: string;
  lead: string;
  image: React.ComponentProps<typeof PageHero>["image"];
  stats: string[];
  groups: ProductGroup[];
  all: "grouped" | "flat";
}) {
  return (
    <>
      <PageHero crumbs={[{ name: "Products", href: "/products" }, crumb]} title={title} lead={lead} image={image}>
        <ul className="flex flex-wrap gap-2">
          {stats.map((s) => (
            <li key={s} className="rounded-sm border border-border bg-card px-3 py-1.5 font-mono text-xs">
              {s}
            </li>
          ))}
        </ul>
      </PageHero>
      <div className="pb-6">
        <ProductTabs groups={groups} all={all} />
      </div>
      <CtaBand
        title="Can't find the exact part?"
        body="Send a drawing, a sample or a photo with the size and quantity. We make parts to your specification."
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
