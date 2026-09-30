import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { DimensionLine } from "@/components/sections/dimension-line";
import { ProductCard } from "@/components/sections/product-card";
import { SpecTable } from "@/components/sections/spec-table";
import { ProductGallery } from "@/components/products/product-gallery";
import { JsonLd } from "@/components/json-ld";
import { TodoMark } from "@/components/todo-mark";
import { Button } from "@/components/ui/button";
import { findProductBySlug, getCategory, getProduct, products } from "@/content/products";
import { finishName, materialName } from "@/content/materials";
import { industryName } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";
import { productSchema } from "@/lib/schema";
import { getCategoryDetail } from "@/content/category-details";
import { DetailOptions, DetailRouting } from "@/components/products/category-detail-sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) return {};
  return pageMetadata({
    title: p.name,
    description: `${p.summary} Available in ${p.materials.map(materialName).join(", ")}. ${p.sizes}.`,
    path: `/products/${p.category}/${p.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  const c = getCategory(category);
  if (!p || !c) notFound();

  const related = (p.related ?? []).map(findProductBySlug).filter((x) => x !== undefined);
  const detail = getCategoryDetail(c.slug);
  const rfqHref =`/request-quote?category=${p.category}&product=${p.slug}`;

  return (
    <>
      <section className="relative border-b border-border">
        <div aria-hidden className="grid-lines mask-fade-b absolute inset-0 opacity-60" />
        <div className="container-x relative grid gap-12 pt-28 pb-16 md:pt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery images={p.images} name={p.name} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Breadcrumbs
              items={[
                { name: "Products", href: "/products" },
                { name: c.short, href: `/products/${c.slug}` },
                { name: p.name, href: `/products/${c.slug}/${p.slug}` },
              ]}
            />
            <h1 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-5xl">{p.name}</h1>
            <DimensionLine label={p.sizes} className="max-w-md" />
            <p className="text-lg leading-relaxed text-muted-foreground">{p.description}</p>

            <div className="grid gap-4">
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Materials</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {p.materials.map((m) => (
                    <li key={m}>
                      <Link
                        href={`/materials#${m}`}
                        className="inline-block rounded-sm border border-brass/50 bg-brass-soft px-2.5 py-1 font-mono text-[12px] text-foreground hover:border-brass"
                      >
                        {materialName(m)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Finishes</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {p.finishes.map((f) => (
                    <li key={f} className="rounded-sm border border-border px-2.5 py-1 font-mono text-[12px]">
                      {finishName(f)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg">
                <Link href={rfqHref}>
                  Request a Quote for this part <ArrowRight strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Specifications</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Typical ranges. Your drawing always takes precedence.
            <TodoMark />
          </p>
          <SpecTable
            className="mt-8"
            groups={[
              {
                title: "Geometry",
                rows: [
                  { label: "Size range", value: p.sizes },
                  { label: "Threads", value: p.threads.length ? p.threads.join(", ") : "Plain / as drawing" },
                  { label: "Tolerance", value: p.tolerance },
                ],
              },
              {
                title: "Material & finish",
                rows: [
                  { label: "Materials", value: p.materials.map(materialName).join(", ") },
                  { label: "Finishes", value: p.finishes.map(finishName).join(", ") },
                ],
              },
              {
                title: "Supply",
                rows: [
                  { label: "Category", value: c.name },
                  { label: "Packing", value: "Bulk, counted bags or customer-specified" },
                  { label: "Documents", value: "Inspection report and material certificate on request" },
                ],
              },
            ]}
          />
        </div>
        <div className="grid content-start gap-10 lg:col-span-5">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Applications</h2>
            <ul className="mt-5 grid gap-3">
              {p.applications.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <Check strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-brass" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Industries</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.industries.map((i) => (
                <li key={i}>
                  <Link href={`/industries/${i}`} className="inline-block rounded-sm border border-border px-3 py-1.5 text-sm hover:border-brass/60">
                    {industryName(i)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-border bg-surface p-6">
            <p className="font-display text-lg font-semibold">Have your own drawing for this part?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Attach it to the quote request and we will price your version, not the catalogue one.
            </p>
            <Link href={rfqHref} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
              Continue to quote form <ArrowRight strokeWidth={1.5} className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {detail ? (
        <>
          <DetailRouting detail={detail} partName={p.name} />
          <DetailOptions detail={detail} />
        </>
      ) : null}

      {related.length ? (
        <section className="border-t border-border bg-surface py-16 md:py-24">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Related products</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard product={r} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JsonLd data={productSchema(p)} />
    </>
  );
}
