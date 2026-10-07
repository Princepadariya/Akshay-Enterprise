import Image from "next/image";
import { certifications } from "@/content/certificates";
import { cn } from "@/lib/utils";

/** Certifications as name + certifying-body logo tiles. */
export function CertificationList({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5", className)}>
      {certifications.map((c) => (
        <li key={c.code} className="flex flex-col items-center gap-5 rounded-sm border border-border bg-card px-3 py-8 text-center sm:px-4">
          <div className="relative h-20 w-full">
            <Image src={c.logo.src} alt={c.logo.alt} fill sizes="200px" className="object-contain" />
          </div>
          <p className="font-display text-[15px] font-semibold tracking-tight whitespace-nowrap sm:text-lg">{c.code}</p>
        </li>
      ))}
    </ul>
  );
}
