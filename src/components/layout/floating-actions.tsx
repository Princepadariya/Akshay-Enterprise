"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappHref } from "@/content/site";
import { cn } from "@/lib/utils";

/** WhatsApp click-to-chat (all viewports) + sticky quote bar (mobile only). */
export function FloatingActions() {
  const pathname = usePathname();
  const onQuote = pathname.startsWith("/request-quote");

  return (
    <>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat on WhatsApp with ${site.name}`}
        className={cn(
          "fixed right-4 z-[45] flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_8px_30px_rgb(11_13_16/0.18)] transition-transform hover:-translate-y-0.5 md:right-6 md:bottom-6",
          onQuote ? "bottom-4" : "bottom-20 md:bottom-6",
        )}
      >
        <MessageCircle strokeWidth={1.5} className="size-5 text-[#25D366]" />
      </a>
      {!onQuote ? (
        <div className="fixed inset-x-0 bottom-0 z-[45] border-t border-border bg-background/90 p-3 backdrop-blur-xl md:hidden">
          <Button asChild className="w-full">
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
        </div>
      ) : null}
    </>
  );
}
