"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/sections/product-card";
import { categories, products } from "@/content/products";
import { materials } from "@/content/materials";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";

type Filters = { q: string; category: string; material: string; industry: string };

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-3 py-1.5 text-[13px] whitespace-nowrap transition-colors duration-300",
        active ? "border-brass bg-brass text-brass-foreground" : "border-border text-foreground/80 hover:border-foreground/40",
      )}
    >
      {children}
    </button>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[7rem_1fr] md:items-start">
      <span className="pt-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</span>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        <Chip active={value === ""} onClick={() => onChange("")}>
          All
        </Chip>
        {options.map((o) => (
          <Chip key={o.value} active={value === o.value} onClick={() => onChange(value === o.value ? "" : o.value)}>
            {o.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export function ProductExplorer() {
  const params = useSearchParams();
  const [f, setF] = useState<Filters>({
    q: params.get("q") ?? "",
    category: params.get("category") ?? "",
    material: params.get("material") ?? "",
    industry: params.get("industry") ?? "",
  });

  const update = (patch: Partial<Filters>) => {
    const next = { ...f, ...patch };
    setF(next);
    const sp = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => v && sp.set(k, v));
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return products.filter((p) => {
      if (f.category && p.category !== f.category) return false;
      if (f.material && !p.materials.includes(f.material as never)) return false;
      if (f.industry && !p.industries.includes(f.industry as never)) return false;
      if (q) {
        const hay = [p.name, p.summary, p.description, ...p.applications, p.sizes, ...p.threads].join(" ").toLowerCase();
        if (!q.split(/\s+/).every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [f]);

  const active = f.q || f.category || f.material || f.industry;

  // results grouped by product family, in catalogue order; empty families are left out
  const groups = useMemo(
    () => categories.map((c) => ({ c, items: results.filter((p) => p.category === c.slug) })).filter((g) => g.items.length),
    [results],
  );

  // highlight the family currently in view in the side index
  const [current, setCurrent] = useState("");
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(`family-${g.c.slug}`)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setCurrent(top.target.id.replace("family-", ""));
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [groups]);

  return (
    <div className="grid gap-10">
      <div className="grid gap-5 rounded-sm border border-border bg-surface p-4 md:p-6">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search strokeWidth={1.5} className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={f.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search by part, application or thread, e.g. terminal, M8, BSP"
            className="h-12 rounded-sm border-border bg-background pl-10 text-[15px] placeholder:text-muted-foreground"
          />
        </label>
        <FilterRow
          label="Type"
          value={f.category}
          onChange={(v) => update({ category: v })}
          options={categories.map((c) => ({ value: c.slug, label: c.short }))}
        />
        <FilterRow
          label="Material"
          value={f.material}
          onChange={(v) => update({ material: v })}
          options={materials.map((m) => ({ value: m.key, label: m.short }))}
        />
        <FilterRow
          label="Industry"
          value={f.industry}
          onChange={(v) => update({ industry: v })}
          options={industries.map((i) => ({ value: i.slug, label: i.name }))}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {results.length} of {products.length} product lines
        </p>
        {active ? (
          <Button variant="ghost" size="sm" onClick={() => update({ q: "", category: "", material: "", industry: "" })}>
            <X strokeWidth={1.5} /> Clear filters
          </Button>
        ) : null}
      </div>

      {results.length ? (
        <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          {/* family index: jump to a family, current one highlighted (large screens) */}
          <nav aria-label="Product families" className="hidden lg:block">
            <ul className="sticky top-28 grid gap-0.5 border-l border-border">
              {groups.map(({ c, items }) => {
                const on = current === c.slug;
                return (
                  <li key={c.slug}>
                    <a
                      href={`#family-${c.slug}`}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "-ml-px flex items-baseline justify-between gap-3 border-l-2 py-1.5 pr-2 pl-4 text-[13.5px] leading-snug transition-colors duration-300",
                        on ? "border-brass text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono text-[11px] tabular text-muted-foreground">{items.length}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="grid min-w-0 gap-14 md:gap-16">
            {groups.map(({ c, items }) => (
              <section key={c.slug} id={`family-${c.slug}`} aria-labelledby={`family-title-${c.slug}`} className="scroll-mt-28">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
                  <div className="min-w-0">
                    <h3 id={`family-title-${c.slug}`} className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] md:text-[1.7rem]">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                  <Link
                    href={`/products/${c.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brass-ink hover:underline"
                  >
                    {items.length} {items.length === 1 ? "product" : "products"}, view family
                    <ArrowUpRight strokeWidth={1.5} className="size-4" />
                  </Link>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <ProductCard product={p} className="h-full" headingLevel={4} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid place-items-center gap-4 rounded-sm border border-dashed border-border px-6 py-20 text-center">
          <p className="font-display text-2xl font-semibold">No standard part matches that.</p>
          <p className="max-w-[46ch] text-muted-foreground">
            Most of our work is built to print, so we can probably still make it. Send the drawing and we will quote it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => update({ q: "", category: "", material: "", industry: "" })}>
              Clear filters
            </Button>
            <Button asChild>
              <a href="/request-quote">Request a Quote</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
