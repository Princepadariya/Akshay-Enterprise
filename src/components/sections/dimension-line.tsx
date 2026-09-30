import { cn } from "@/lib/utils";

/**
 * Engineering-drawing dimension line: end ticks, arrow heads and a mono measurement label.
 * Used under section titles as the brand's structural accent.
 */
export function DimensionLine({
  label,
  className,
  tone = "brass",
}: {
  label?: string;
  className?: string;
  tone?: "brass" | "muted";
}) {
  const color = tone === "brass" ? "text-brass" : "text-muted-foreground/60";
  return (
    <div aria-hidden className={cn("flex items-center gap-3", color, className)}>
      <span className="h-3 w-px bg-current" />
      <span className="dim-draw relative h-px flex-1 bg-current opacity-70">
        <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rotate-45 border-b border-l border-current" />
        <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rotate-45 border-t border-r border-current" />
      </span>
      {label ? <span className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground">{label}</span> : null}
      {label ? <span className="relative h-px w-10 bg-current opacity-70 md:w-16" /> : null}
      <span className="h-3 w-px bg-current" />
    </div>
  );
}
