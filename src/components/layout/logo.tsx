import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand mark in the style of the abc + brass badge: silver ring, glossy red-orange sphere, and a
 * white hex bar section with a cream turned bore.
 * TODO: replace with the official Akshay Enterprise logo when supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <defs>
        <radialGradient id="ae-sphere" cx="0.32" cy="0.26" r="0.85">
          <stop offset="0" stopColor="#f08a3c" />
          <stop offset="0.35" stopColor="#c13a10" />
          <stop offset="0.62" stopColor="#af2f0c" />
          <stop offset="1" stopColor="#4a0c03" />
        </radialGradient>
        <linearGradient id="ae-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f3f5" />
          <stop offset="0.5" stopColor="#a9adb3" />
          <stop offset="1" stopColor="#dfe1e4" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15.5" fill="url(#ae-ring)" />
      <circle cx="16" cy="16" r="13.4" fill="url(#ae-sphere)" />
      <path d="M16 7.6 23.3 11.8v8.4L16 24.4 8.7 20.2v-8.4z" fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3.1" fill="none" stroke="#f8d9b9" strokeWidth="1.6" />
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
