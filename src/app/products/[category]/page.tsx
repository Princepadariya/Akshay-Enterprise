import Link from "next/link";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import { getCategoryDetail } from "@/content/category-details";
import { faqSchema } from "@/lib/schema";

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
      faqs={getCategoryDetail(c.slug)?.faqs}
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
  faqs = [],
}: {
  crumb: { name: string; href: string };
  title: string;
  lead: string;
  image: React.ComponentProps<typeof PageHero>["image"];
  stats: string[];
  groups: ProductGroup[];
  all: "grouped" | "flat";
  faqs?: { q: string; a: string }[];
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
      {faqs.length ? (
        <section aria-labelledby="faq" className="border-t border-border bg-surface py-14 md:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Common questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                About {title.toLowerCase()}. More answers on our{" "}
                <Link href="/faq" className="text-brass-ink underline-offset-4 hover:underline">
                  FAQ page
                </Link>
                .
              </p>
            </div>
            <Accordion type="single" collapsible defaultValue={faqs[0].q} className="lg:col-span-8">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-border">
                  <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold tracking-tight hover:no-underline md:text-xl">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[68ch] pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <JsonLd data={faqSchema(faqs)} />
        </section>
      ) : null}
      <CtaBand
        title="Can't find the exact part?"
        body="Send a drawing, a sample or a photo with the size and quantity. We make parts to your specification."
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
