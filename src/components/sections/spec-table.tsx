import { cn } from "@/lib/utils";

export type SpecGroup = { title: string; rows: { label: string; value: React.ReactNode }[] };

/**
 * Technical spec sheet. Rows are grouped into clusters with one divider per cluster
 * (not a hairline under every row). Values are monospace for the engineering-drawing feel.
 */
export function SpecTable({ groups, className }: { groups: SpecGroup[]; className?: string }) {
  return (
    <div className={cn("grid gap-8", className)}>
      {groups.map((g) => (
        <section key={g.title} className="border-t border-border pt-4">
          <h3 className="mb-4 font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {g.title}
          </h3>
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,11rem)_1fr]">
            {g.rows.map((r) => (
              <div key={r.label} className="contents">
                <dt className="text-sm text-muted-foreground">{r.label}</dt>
                <dd className="font-mono text-[13px] leading-relaxed text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
