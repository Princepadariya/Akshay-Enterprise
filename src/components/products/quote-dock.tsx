"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photos, type PhotoKey } from "@/content/images";
import { cn } from "@/lib/utils";

/**
 * Slim "quote this part" bar that slides up on large screens once the hero's quote button has
 * scrolled out of view, and hides again near the page's closing call to action and footer.
 * Small screens already have the site-wide sticky quote bar, so this one is large-screen only.
 */
export function QuoteDock({ name, sizes, image, href, anchorId }: { name: string; sizes: string; image: PhotoKey; href: string; anchorId: string }) {
  const [show, setShow] = useState(false);

  // Position check on scroll (rAF-throttled) rather than IntersectionObserver: a fast fling or jump
  // can skip the button entirely without crossing an observer threshold.
  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    const footer = document.querySelector("footer");
    let frame = 0;
    const check = () => {
      frame = 0;
      const passed = anchor ? anchor.getBoundingClientRect().bottom < 0 : false; // quote button is above the screen
      const atEnd = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(passed && !atEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [anchorId]);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-5 z-30 hidden justify-center px-4 transition-[transform,opacity] duration-500 lg:flex",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="flex items-center gap-4 rounded-full border border-border bg-background/90 py-2 pr-2 pl-2 shadow-[0_20px_50px_-20px_rgb(11_13_16/0.45)] backdrop-blur-md">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border">
          <Image src={photos[image].src} alt="" fill sizes="40px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block max-w-[22rem] truncate text-sm font-semibold">{name}</span>
          <span className="block max-w-[22rem] truncate font-mono text-[11px] text-muted-foreground">{sizes}</span>
        </span>
        <Button asChild size="sm" className="rounded-full">
          <Link href={href} tabIndex={show ? 0 : -1}>
            Request a Quote <ArrowRight strokeWidth={1.5} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
