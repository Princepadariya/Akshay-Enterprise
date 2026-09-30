import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Visible review marker for unconfirmed content.
 * Renders nothing once `site.showPlaceholderMarkers` is switched off.
 */
export function TodoMark({ show = true, className }: { show?: boolean; className?: string }) {
  if (!site.showPlaceholderMarkers || !show) return null;
  return (
    <span
      title="Placeholder content. Confirm with client (see CONTENT-TODO.md)"
      className={cn(
        "ml-1.5 inline-flex translate-y-[-0.35em] items-center rounded-sm border border-dashed border-brass/70 px-1 font-mono text-[9px] leading-[14px] font-medium tracking-wider text-brass-ink uppercase align-baseline",
        className,
      )}
    >
      TBC
    </span>
  );
}
