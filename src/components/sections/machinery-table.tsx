"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { Machine } from "@/content/machinery";
import { TodoMark } from "@/components/todo-mark";
import { cn } from "@/lib/utils";

type SortKey = "type" | "make" | "quantity" | "capacity";

export function MachineryTable({ rows }: { rows: Machine[] }) {
  const groups = useMemo(() => Array.from(new Set(rows.map((r) => r.group))), [rows]);
  const [group, setGroup] = useState<string>("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "type", dir: 1 });

  const data = useMemo(() => {
    const filtered = group ? rows.filter((r) => r.group === group) : rows;
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      return (typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv))) * sort.dir;
    });
  }, [rows, group, sort]);

  const total = data.reduce((s, r) => s + r.quantity, 0);

  const header = (key: SortKey, label: string, className?: string) => {
    const on = sort.key === key;
    const Icon = on ? (sort.dir === 1 ? ArrowUp : ArrowDown) : ArrowUpDown;
    return (
      <th scope="col" aria-sort={on ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className={cn("px-5 py-4 font-medium", className)}>
        <button
          type="button"
          onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((s.dir * -1) as 1 | -1) : 1 }))}
          className="inline-flex items-center gap-1.5 uppercase hover:text-foreground"
        >
          {label}
          <Icon strokeWidth={1.5} className={cn("size-3.5", on ? "text-brass" : "opacity-50")} />
        </button>
      </th>
    );
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter machines by group">
        {["", ...groups].map((g) => (
          <button
            key={g || "all"}
            type="button"
            onClick={() => setGroup(g)}
            aria-pressed={group === g}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-[13px] transition-colors",
              group === g ? "border-brass bg-brass text-brass-foreground" : "border-border hover:border-foreground/40",
            )}
          >
            {g || "All machines"}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-sm border border-border bg-card">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              {header("type", "Machine")}
              {header("make", "Make")}
              {header("quantity", "Qty", "text-right")}
              {header("capacity", "Capacity")}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={r.type} className={i % 2 ? "bg-surface/60" : undefined}>
                <th scope="row" className="px-5 py-3.5 font-medium">
                  {r.type}
                  <span className="ml-2 font-mono text-[10.5px] text-muted-foreground">{r.group}</span>
                </th>
                <td className="px-5 py-3.5 text-muted-foreground">{r.make}</td>
                <td className="px-5 py-3.5 text-right font-mono tabular">
                  {r.quantity}
                  <TodoMark show={r.placeholder} />
                </td>
                <td className="px-5 py-3.5 font-mono text-[13px]">{r.capacity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border">
              <th scope="row" colSpan={2} className="px-5 py-4 text-left font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Total shown
              </th>
              <td className="px-5 py-4 text-right font-mono font-medium tabular">{total}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
