import { Suspense } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { ProductExplorer } from "@/components/products/product-explorer";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Turned components, electrical parts, cable glands, fasteners, inserts, plumbing, gas and sanitary fittings, castings, and brass rods, sheet and wire.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", href: "/products" }]}
        title="Products"
        lead="Search the standard range or filter by what matters to your assembly. Anything not listed can be made to your drawing."
      />
      <section aria-labelledby="catalogue" className="container-x py-14 md:py-20">
        <h2 id="catalogue" className="sr-only">
          Product catalogue
        </h2>
        <Suspense fallback={<div className="h-96 animate-pulse rounded-sm bg-surface" />}>
          <ProductExplorer />
        </Suspense>
      </section>
      <CtaBand
        title="Not in the catalogue? Build it to print."
        body="Send a drawing, a 3D model or a sample. We review manufacturability and send a costed quote."
        secondary={{ label: "Custom manufacturing", href: "/capabilities" }}
      />
    </>
  );
}
