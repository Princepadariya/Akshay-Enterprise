"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
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
  const reduce = useReducedMotion();
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
        <motion.ul layout={!reduce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} className="h-full" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
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
