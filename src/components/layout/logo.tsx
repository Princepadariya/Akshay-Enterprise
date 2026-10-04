import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand mark: a hex bar cross-section with a turned bore (the raw form of most of what we make).
 * TODO: replace with the official Akshay Enterprise logo when supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <defs>
        <linearGradient id="ae-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6e1d07" />
          <stop offset="0.4" stopColor="#e0603a" />
          <stop offset="0.7" stopColor="#af2f0c" />
          <stop offset="1" stopColor="#cc4a24" />
        </linearGradient>
      </defs>
      <path d="M16 1.5 28.6 8.75v14.5L16 30.5 3.4 23.25V8.75z" fill="url(#ae-accent)" />
      <circle cx="16" cy="16" r="6.2" fill="var(--background)" />
      <circle cx="16" cy="16" r="6.2" fill="none" stroke="#5a1806" strokeOpacity="0.6" strokeWidth="0.8" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[60deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display-wide text-[15px] font-semibold tracking-[-0.01em]">AKSHAY</span>
        <span className="sr-only"> </span>
        <span className="mt-0.5 font-mono text-[9.5px] tracking-[0.28em] text-muted-foreground">ENTERPRISE</span>
        {/* accessible name starts with the visible text ("AKSHAY ENTERPRISE"), then says where it goes */}
        <span className="sr-only">, home</span>
      </span>
    </Link>
  );
}
