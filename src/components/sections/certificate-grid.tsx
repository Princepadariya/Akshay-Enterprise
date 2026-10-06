import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import type { Certificate } from "@/lib/certificates";
import { cn } from "@/lib/utils";

/**
 * Certificate files from /public/certificates as cards: images show a preview, PDFs a document
 * tile. Each card opens the file in a new tab so it can be viewed, printed or saved.
 */
export function CertificateGrid({ items, className }: { items: Certificate[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {items.map((c) => (
        <li key={c.file}>
          <a
            href={c.href}
            target="_blank"
            rel="noopener"
            className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-500 hover:border-brass/60"
          >
            <div className="relative aspect-[4/5] overflow-hidden border-b border-border bg-surface">
              {c.kind === "image" ? (
                <Image
                  src={c.href}
                  alt={`${c.title} certificate issued to Akshay Enterprise`}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                  className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-60" />
                  <span className="relative grid place-items-center gap-2">
                    <span className="grid size-14 place-items-center rounded-sm border border-border bg-background">
                      <FileText strokeWidth={1.5} className="size-7 text-brass" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">PDF document</span>
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-1 items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-medium leading-snug">{c.title}</p>
                {c.detail ? (
                  <>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{c.detail.label}</p>
                    <dl className="mt-3 grid gap-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
                      <div className="flex gap-2">
                        <dt className="sr-only">Issued by</dt>
                        <dd>{c.detail.issuer}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt>No.</dt>
                        <dd className="text-foreground">{c.detail.number}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground uppercase">
                    {c.kind === "pdf" ? "PDF" : c.file.split(".").pop()} {c.size}
                  </p>
                )}
              </div>
              <ArrowUpRight
                strokeWidth={1.5}
                className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
