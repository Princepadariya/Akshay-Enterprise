"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/photo";
import { SectionHeader } from "@/components/sections/section-header";
import { capabilities } from "@/content/capabilities";
import type { PhotoKey } from "@/content/images";
import { getIcon, ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";

const fallbackImages: PhotoKey[] = ["lathe", "latheTurret", "millCutting", "brassNuts", "latheTurning", "cncCutting", "machiningClose", "brassParts"];

/** Capability index: hover or focus a row to swap the sticky photograph (state transition, not decoration). */
export function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const image = capabilities[active].image ?? fallbackImages[active % fallbackImages.length];

  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              title="Machining capabilities"
              lead="From bar to finished component: turning, milling, threading and secondary work, with finishing coordinated and inspected."
            />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-sm border border-border lg:block">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={image}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Photo k={image} className="absolute inset-0" sizes="40vw" treatment="none" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-3 left-3 z-[2] rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[11px] text-paper">
                {capabilities[active].spec}
              </span>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {capabilities.map((c, i) => {
            const Icon = getIcon(c.icon);
            const on = i === active;
            return (
              <li key={c.slug} className="border-t border-border first:border-t-0 lg:first:border-t">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className="group grid w-full grid-cols-[2.5rem_1fr] items-start gap-4 py-6 text-left md:grid-cols-[2.5rem_1fr_auto] md:gap-6"
                >
                  <Icon
                    strokeWidth={ICON_STROKE}
                    className={cn("mt-1 size-6 transition-colors duration-300", on ? "text-brass" : "text-muted-foreground")}
                  />
                  <span>
                    <span
                      className={cn(
                        "block font-display text-xl font-semibold tracking-tight transition-colors md:text-2xl",
                        on ? "text-foreground" : "text-foreground/70",
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-sm leading-relaxed text-muted-foreground">{c.body}</span>
                  </span>
                  <span className="col-start-2 font-mono text-[11px] tracking-wide text-muted-foreground md:col-start-3 md:mt-2 md:text-right">
                    {c.spec}
                  </span>
                </button>
              </li>
            );
          })}
          <li className="border-t border-border pt-8">
            <Link href="/capabilities" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
              Capability details and size ranges <ArrowRight strokeWidth={1.5} className="size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
