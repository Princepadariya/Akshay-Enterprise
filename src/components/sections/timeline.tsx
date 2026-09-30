"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { Milestone } from "@/content/timeline";
import { TodoMark } from "@/components/todo-mark";
import { cn } from "@/lib/utils";

/** Vertical milestone timeline; the brass spine fills as the reader scrolls (storytelling: progress through years). */
export function Timeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-2 md:ml-0">
      <span aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-border md:left-[11rem]" />
      <motion.span
        aria-hidden
        className="metal-brass absolute top-0 bottom-0 left-0 w-px origin-top md:left-[11rem]"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      {items.map((m, i) => (
        <motion.li
          key={`${m.year}-${i}`}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid gap-2 pb-14 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0"
        >
          <span
            aria-hidden
            className="absolute top-2.5 left-0 size-2.5 -translate-x-1/2 rotate-45 border border-brass bg-background md:left-[11rem]"
          />
          <div className="font-mono text-sm tracking-wide text-brass-ink md:pr-10 md:text-right">
            {m.year}
            <TodoMark show={m.placeholder} />
          </div>
          <div className={cn("md:pl-12")}>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{m.title}</h3>
            <p className="mt-2 max-w-[56ch] leading-relaxed text-muted-foreground">{m.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
