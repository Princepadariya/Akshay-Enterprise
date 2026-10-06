"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/products";
import { ProductCard } from "@/components/sections/product-card";
import { getLenis } from "@/components/layout/smooth-scroll";
import { cn } from "@/lib/utils";

const ALL = "all";

export type ProductGroup = { key: string; label: string; items: Product[]; href?: string };

/**
 * Sticky, horizontally scrolling filter chips (All + one per group, with counts) above
 * product cards. "grouped": All shows each group as its own section (material ranges).
 * "flat": All shows every product once (category pages, where a product can be in
 * several material groups).
 */
export function ProductTabs({ groups, all }: { groups: ProductGroup[]; all: "grouped" | "flat" }) {
  const [tab, setTab] = useState<string>(ALL);
  const top = useRef<HTMLDivElement>(null);

  const unique = (() => {
    const seen = new Set<string>();
    return groups.flatMap((g) => g.items).filter((p) => !seen.has(p.slug) && !!seen.add(p.slug));
  })();

  let sections: ProductGroup[];
  if (tab !== ALL) sections = groups.filter((g) => g.key === tab);
  else if (all === "grouped") sections = groups;
  else sections = [{ key: ALL, label: "", items: unique }];

  const count = sections.reduce((n, s) => n + s.items.length, 0);

  const pick = (key: string, chip?: HTMLElement) => {
    setTab(key);
    // keep the chosen chip visible in the horizontally scrolling bar
    const row = chip?.parentElement;
    if (chip && row) row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
    // if the visitor has scrolled into the list, bring the new results into view
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) {
      const target = window.scrollY + el.getBoundingClientRect().top - 80;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target);
      else window.scrollTo({ top: target, behavior: "instant" });
    }
  };

  return (
    <div ref={top}>
      {groups.length > 1 ? (
        <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl lg:top-[72px]">
          <div
            role="tablist"
            aria-label="Filter products"
            className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[{ key: ALL, label: "All", items: unique }, ...groups].map((g) => {
              const on = tab === g.key;
              return (
                <button
                  key={g.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={(e) => pick(g.key, e.currentTarget)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground/80 hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {g.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 font-mono text-[11px] tabular-nums",
                      on ? "bg-background/15 text-background" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {g.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="container-x pb-4">
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          Showing {count} product{count === 1 ? "" : "s"}
          {tab !== ALL ? (
            <>
              {" "}
              in <span className="font-medium text-foreground">{sections[0]?.label}</span>
              <button type="button" onClick={() => pick(ALL)} className="ml-3 text-brass-ink underline-offset-4 hover:underline">
                Clear filter
              </button>
            </>
          ) : null}
        </p>
  
        <div className="mt-8 grid gap-16 md:gap-20">
          {sections.map((s) => (
            <section key={s.key} aria-label={s.label || "All products"}>
              {s.label ? (
                <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
                  <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {s.label}
                    <span className="ml-3 align-middle font-mono text-sm font-normal text-muted-foreground">{s.items.length}</span>
                  </h2>
                  {s.href ? (
                    <Link href={s.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-brass-ink hover:underline">
                      View category <ArrowRight strokeWidth={1.5} className="size-4" />
                    </Link>
                  ) : null}
                </div>
              ) : null}
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {s.items.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} className="h-full" />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
