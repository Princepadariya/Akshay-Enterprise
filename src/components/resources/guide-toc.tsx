"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * "On this page" list for a guide. Highlights the section currently being read (the last heading
 * that has passed the upper third of the screen) and fills a brass rail to show progress.
 */
export function GuideToc({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      let current = items[0]?.id ?? "";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const activeIndex = Math.max(0, items.findIndex((i) => i.id === active));

  return (
    <nav aria-label="On this page" className="print-hide">
      <p className="font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">On this page</p>
      <ol className="relative mt-4 grid gap-1 border-l border-border">
        <span
          aria-hidden
          className="absolute top-0 -left-px w-px bg-brass transition-[height] duration-500"
          style={{ height: `${((activeIndex + 1) / items.length) * 100}%` }}
        />
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={it.id === active ? "location" : undefined}
              className={cn(
                "grid grid-cols-[1.75rem_1fr] py-1.5 pl-4 text-sm leading-snug transition-colors",
                it.id === active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="font-mono text-[11px] text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
              {it.heading.replace(/^\d+\.\s*/, "")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
