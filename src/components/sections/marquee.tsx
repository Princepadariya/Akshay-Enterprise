import { cn } from "@/lib/utils";

/** CSS-only marquee (one per page maximum). Stops under reduced motion and on hover. */
export function Marquee({
  children,
  duration = 45,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("group mask-fade-x relative flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
