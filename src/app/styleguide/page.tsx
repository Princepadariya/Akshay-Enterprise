import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { DimensionLine } from "@/components/sections/dimension-line";
import { SpecTable } from "@/components/sections/spec-table";
import { ProductCard } from "@/components/sections/product-card";
import { StatCounter } from "@/components/sections/stat-counter";
import { TodoMark } from "@/components/todo-mark";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Styleguide",
  description: "Design system reference for the Akshay Enterprise website.",
  path: "/styleguide",
  noIndex: true,
});

const swatches = [
  { name: "Background", v: "--background" },
  { name: "Surface", v: "--surface" },
  { name: "Surface 2", v: "--surface-2" },
  { name: "Card", v: "--card" },
  { name: "Foreground", v: "--foreground" },
  { name: "Muted text", v: "--muted-foreground" },
  { name: "Border", v: "--border" },
  { name: "Brass (fill)", v: "--brass" },
  { name: "Brass (ink)", v: "--brass-ink" },
  { name: "Blueprint", v: "--blueprint" },
];

export default function StyleguidePage() {
  return (
    <div className="container-x grid gap-20 pt-32 pb-24">
      <SectionHeader as="h1" size="lg" eyebrow="Design system" title="Engineered Luxury" dimension="v1" lead="Tokens, type, controls and motifs. This page is not indexed." />

      <section className="grid gap-6">
        <h2 className="font-display text-2xl font-semibold">Colour tokens</h2>
        <p className="text-sm text-muted-foreground">Toggle the theme in the header to inspect both modes.</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {swatches.map((s) => (
            <li key={s.v} className="overflow-hidden rounded-sm border border-border">
              <div className="h-20" style={{ background: `var(${s.v})` }} />
              <div className="p-3">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{s.v}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="metal-brass h-20 rounded-sm" />
          <div className="metal-steel h-20 rounded-sm" />
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="font-display text-2xl font-semibold">Typography</h2>
        <p className="font-display text-6xl font-semibold tracking-[-0.04em]">Archivo, display 112%</p>
        <p className="font-display-wide text-4xl font-bold tracking-[-0.02em]">Archivo, wide 125%</p>
        <p className="max-w-[65ch] text-lg leading-relaxed">
          Geist for body copy. Precision turned components in brass, stainless steel, mild steel, aluminium and copper.
        </p>
        <p className="font-mono text-sm">JetBrains Mono for data: Ø 12.00 ±0.01  M8 × 1.25 - 6g  Ra 0.8</p>
      </section>

      <section className="grid gap-6">
        <h2 className="font-display text-2xl font-semibold">Controls</h2>
        <div className="flex flex-wrap gap-3">
          <Button size="lg">
            Request a Quote <ArrowRight strokeWidth={1.5} />
          </Button>
          <Button size="lg" variant="secondary">
            Secondary
          </Button>
          <Button size="lg" variant="outline">
            Outline
          </Button>
          <Button size="lg" variant="ghost">
            Ghost
          </Button>
          <Button variant="link">Text link</Button>
        </div>
        <p>
          Placeholder marker <TodoMark />
        </p>
      </section>

      <section className="grid gap-6">
        <h2 className="font-display text-2xl font-semibold">Motifs</h2>
        <DimensionLine label="Ø 12.00 ±0.01" className="max-w-lg" />
        <div className="grid-lines h-40 rounded-sm border border-border" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <p className="font-display text-5xl font-semibold tabular">
            <StatCounter value={45} suffix="+" />
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ProductCard product={products[0]} />
        <SpecTable
          groups={[
            { title: "Geometry", rows: [{ label: "Size", value: "Ø 3 to 65 mm" }, { label: "Tolerance", value: "±0.02 mm" }] },
            { title: "Material", rows: [{ label: "Grade", value: "CW614N" }] },
          ]}
        />
      </section>
    </div>
  );
}
