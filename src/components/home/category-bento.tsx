import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/sections/section-header";
import { categories } from "@/content/products";
import { productsInCategory } from "@/content/products";
import { cn } from "@/lib/utils";

/**
 * 10 categories -> exactly 10 cells on a 4-column grid:
 *   [1 1 2 3]
 *   [1 1 4 5]
 *   [6 7 7 8]
 *   [6 9 10 10]
 * Cells alternate between photographic, brushed-steel and blueprint surfaces.
 */
const layout: { span: string; surface: "photo" | "steel" | "blueprint" | "brass" }[] = [
  { span: "sm:col-span-2 lg:col-span-2 lg:row-span-2", surface: "photo" },
  { span: "", surface: "photo" },
  { span: "", surface: "blueprint" },
  { span: "", surface: "steel" },
  { span: "", surface: "photo" },
  { span: "lg:row-span-2", surface: "photo" },
  { span: "sm:col-span-2 lg:col-span-2", surface: "photo" },
  { span: "", surface: "blueprint" },
  { span: "", surface: "photo" },
  { span: "sm:col-span-2 lg:col-span-2", surface: "brass" },
];

export function CategoryBento() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="mb-12 md:mb-16">
        <SectionHeader
          title="What we make"
          lead="Ten product families in brass and engineering metals. Anything not listed can be made to your drawing."
        />
      </div>
      <div className="grid grid-flow-dense auto-rows-[240px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[230px]">
        {categories.map((c, i) => {
          const l = layout[i] ?? { span: "", surface: "photo" as const };
          const count = productsInCategory(c.slug).length;
          const onDark = l.surface === "photo" || l.surface === "steel";
          return (
            <Reveal key={c.slug} delay={(i % 4) * 0.05} className={cn("relative", l.span)}>
              <Link
                href={`/products/${c.slug}`}
                data-fx="spotlight"
                className={cn(
                  "group relative flex h-full flex-col justify-end overflow-hidden rounded-sm border border-border p-5 transition-colors duration-500 hover:border-brass/60",
                  l.surface === "blueprint" && "bg-surface",
                  l.surface === "steel" && "metal-steel",
                  l.surface === "brass" && "badge-sphere border-transparent ring-1 ring-silver/45 ring-inset",
                )}
              >
                {l.surface === "photo" ? (
                  <Photo
                    k={c.image}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1.4s] group-hover:scale-105"
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  />
                ) : null}
                {/*
                  Shade so labels stay readable on any photo, including near-white ones and short cards
                  where the title sits mid-card: a light even dim, a tall dark gradient from the bottom,
                  and a top fade behind the arrow.
                */}
                {l.surface === "photo" ? (
                  <div
                    aria-hidden
                    className="absolute inset-0 z-[1]"
                    style={{
                      background:
                        "linear-gradient(to top, rgb(18 11 10 / 0.92) 0%, rgb(18 11 10 / 0.78) 30%, rgb(18 11 10 / 0.45) 60%, rgb(18 11 10 / 0) 90%), linear-gradient(to bottom, rgb(18 11 10 / 0.45) 0%, rgb(18 11 10 / 0) 30%), rgb(18 11 10 / 0.18)",
                    }}
                  />
                ) : null}
                {l.surface === "blueprint" ? <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-80" /> : null}

                <div
                  className="relative z-[2] flex items-start justify-between gap-4"
                  style={l.surface === "photo" ? { textShadow: "0 1px 14px rgb(0 0 0 / 0.55)" } : undefined}
                >
                  <div>
                    <h3
                      className={cn(
                        "font-display leading-tight font-semibold tracking-tight",
                        i === 0 ? "text-2xl md:text-3xl" : "text-lg",
                        onDark ? "text-paper" : l.surface === "brass" ? "text-paper" : "text-foreground",
                      )}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 font-mono text-[11px] tracking-wide",
                        onDark ? "text-steel-200" : l.surface === "brass" ? "text-cream" : "text-muted-foreground",
                      )}
                    >
                      {count} product {count === 1 ? "line" : "lines"}
                    </p>
                  </div>
                  <ArrowUpRight
                    strokeWidth={1.5}
                    className={cn(
                      "size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      onDark ? "text-paper" : l.surface === "brass" ? "text-paper" : "text-foreground",
                    )}
                  />
                </div>

                {/* hover spec reveal */}
                <div className="relative z-[2] grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "mt-3 max-w-[40ch] text-sm leading-relaxed",
                        onDark ? "text-steel-100" : l.surface === "brass" ? "text-paper/90" : "text-muted-foreground",
                      )}
                    >
                      {c.description}
                    </p>
                    <p
                      className={cn(
                        "mt-3 inline-block rounded-sm border px-2 py-1 font-mono text-[11px]",
                        onDark ? "border-white/20 text-paper" : l.surface === "brass" ? "border-white/25 text-paper" : "border-border text-foreground",
                      )}
                    >
                      {c.spec}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
