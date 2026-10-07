import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand badge: the abc + brass logo (public/logo.png). */
export function LogoMark({ className }: { className?: string }) {
  return <Image src="/logo.png" alt="" width={40} height={40} priority className={cn("size-10 shrink-0", className)} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
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
