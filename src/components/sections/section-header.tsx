import { cn } from "@/lib/utils";
import { DimensionLine } from "./dimension-line";

type Props = {
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Use sparingly: max one eyebrow per three sections on a page. */
  eyebrow?: string;
  /** Mono label written into the dimension line, e.g. "Ø 12.00 ±0.01" */
  dimension?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "md" | "lg";
};

export function SectionHeader({
  title,
  lead,
  eyebrow,
  dimension,
  align = "left",
  as: H = "h2",
  className,
  size = "md",
}: Props) {
  return (
    <header className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-brass-ink uppercase">{eyebrow}</p>
      ) : null}
      <H
        className={cn(
          "max-w-[22ch] font-display font-semibold tracking-[-0.03em] text-foreground",
          size === "lg" ? "text-4xl leading-[1.02] md:text-6xl" : "text-3xl leading-[1.05] md:text-5xl",
        )}
      >
        {title}
      </H>
      {dimension ? <DimensionLine label={dimension} className={cn("w-full max-w-md", align === "center" && "mx-auto")} /> : null}
      {lead ? <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p> : null}
    </header>
  );
}
