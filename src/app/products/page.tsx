import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/photo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { categories, materialRangeGroups, materialRanges, productsInCategory } from "@/content/products";
import { materials } from "@/content/materials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Precision parts in brass, aluminium, mild steel, stainless steel and copper: turned components, electrical parts, cable glands, fasteners, inserts, plumbing, gas and sanitary fittings, and brass rods, sheet and wire.",
  path: "/products",
});

export default function ProductsPage() {
  const ranges = materialRanges.map((r) => {
    const groups = materialRangeGroups(r);
    const m = materials.find((x) => x.key === r.materials[0]);
    return {
      ...r,
      summary: m?.summary ?? "",
      swatch: m?.swatch,
      types: groups.map((g) => g.label),
      count: new Set(groups.flatMap((g) => g.items.map((p) => p.slug))).size,
    };
  });

  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", href: "/products" }]}
        title="Products"
        lead="Choose a material to see every part we make in it, or browse by product type below. Anything not listed can be made to your drawing."
        image="brassParts"
      />

      <section aria-labelledby="by-material" className="container-x py-14 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="by-material" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Shop by material
          </h2>
          <p className="text-sm text-muted-foreground">{ranges.length} material ranges</p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ranges.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/products/${r.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-500 hover:border-brass/60 focus-visible:border-brass"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Photo
                    k={r.image}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                  <span className="absolute top-3 left-3 rounded-sm bg-background/90 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
                    {r.count} products
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    {r.swatch ? (
                      <span aria-hidden className="size-3.5 shrink-0 rounded-full ring-1 ring-foreground/10" style={{ background: r.swatch }} />
                    ) : null}
                    <h3 className="font-display text-xl leading-tight font-semibold tracking-tight md:text-2xl">{r.name}</h3>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{r.types.length} product types</span>
                    {" · "}
                    {r.types.slice(0, 3).join(", ")}
                    {r.types.length > 3 ? "…" : ""}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brass-ink">
                    View {r.name.toLowerCase()}
                    <ArrowRight strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="by-type" className="border-y border-border bg-surface py-14 md:py-20">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="by-type" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Browse by product type
            </h2>
            <p className="text-sm text-muted-foreground">All materials included</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group flex h-full items-center gap-4 rounded-sm border border-border bg-card p-3 pr-4 transition-colors hover:border-brass/60"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-sm">
                    <Photo k={c.image} className="absolute inset-0" sizes="64px" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block leading-snug font-medium">{c.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{productsInCategory(c.slug).length} products</span>
                  </span>
                  <ArrowUpRight
                    strokeWidth={1.5}
                    className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not in the catalogue? Build it to print."
        body="Send a drawing, a 3D model or a sample. We review manufacturability and send a costed quote."
        secondary={{ label: "Custom manufacturing", href: "/capabilities" }}
      />
    </>
  );
}
