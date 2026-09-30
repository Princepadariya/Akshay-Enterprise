"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { TodoMark } from "@/components/todo-mark";
import { cn } from "@/lib/utils";

/**
 * "Tolerance, in perspective": the tolerance band drawn to true scale next to everyday references.
 * Reference sizes are typical values (hair roughly 50 to 100 µm, 80 gsm paper roughly 100 µm).
 */
const HAIR = 70;
const PAPER = 100;
const PX_PER_UM = 2.6;

const classes = [
  { label: "±0.05", um: 50, note: "General turned features" },
  { label: "±0.02", um: 20, note: "Typical production diameters" },
  { label: "±0.01", um: 10, note: "Critical diameters", placeholder: true },
];

export function TolerancePerspective() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(2);
  const band = classes[idx].um * 2;
  const ratio = HAIR / band;

  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 20 };

  return (
    <section aria-labelledby="tol-title" className="border-t border-border py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <h2 id="tol-title" className="max-w-[16ch] font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
            How small is ±0.01 mm?
          </h2>
          <p className="max-w-[48ch] leading-relaxed text-muted-foreground md:text-lg">
            Hundredths of a millimetre are hard to picture. Here is the full tolerance band drawn to true scale next to things
            you can hold in your hand.
          </p>

          <div role="radiogroup" aria-label="Tolerance class" className="grid grid-cols-3 gap-2">
            {classes.map((c, i) => (
              <button
                key={c.label}
                type="button"
                role="radio"
                aria-checked={i === idx}
                onClick={() => setIdx(i)}
                className={cn(
                  "rounded-sm border p-3 text-left transition-colors duration-300",
                  i === idx ? "border-brass bg-brass-soft" : "border-border hover:border-foreground/40",
                )}
              >
                <span className="block font-mono text-lg font-medium">
                  {c.label}
                  <span className="text-xs text-muted-foreground"> mm</span>
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">{c.note}</span>
              </button>
            ))}
          </div>

          <p className="font-display text-xl leading-snug font-medium tracking-tight md:text-2xl">
            A {band} µm band is{" "}
            <span className="text-brass-ink">
              {ratio >= 1 ? `${ratio.toFixed(1)}× narrower than` : `${(1 / ratio).toFixed(1)}× the width of`}
            </span>{" "}
            a human hair.
            <TodoMark show={classes[idx].placeholder} />
          </p>
        </div>

        {/* True-scale field */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-sm border border-border bg-surface p-6 md:p-10">
            <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-80" />
            <div className="relative flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>Magnified view, all shapes to the same scale</span>
              <span className="flex items-center gap-2">
                <span className="h-px bg-foreground/60" style={{ width: 20 * PX_PER_UM }} />
                20 µm
              </span>
            </div>

            <div className="relative mt-8 grid h-[340px] grid-cols-3 items-end gap-6">
              {/* paper */}
              <figure className="flex h-full flex-col items-center justify-end gap-3">
                <div
                  className="w-full max-w-36 rounded-[1px] border border-foreground/15 bg-[linear-gradient(180deg,#f7f5ef,#e7e3d8)]"
                  style={{ height: PAPER * PX_PER_UM }}
                />
                <figcaption className="text-center">
                  <span className="block text-sm">Sheet of paper</span>
                  <span className="font-mono text-[11px] text-muted-foreground">~{PAPER} µm</span>
                </figcaption>
              </figure>

              {/* hair cross-section */}
              <figure className="flex h-full flex-col items-center justify-end gap-3">
                <div
                  className="rounded-full bg-[radial-gradient(circle_at_35%_30%,#6b5a48,#2e241b_70%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"
                  style={{ width: HAIR * PX_PER_UM, height: HAIR * PX_PER_UM }}
                />
                <figcaption className="text-center">
                  <span className="block text-sm">Human hair</span>
                  <span className="font-mono text-[11px] text-muted-foreground">~{HAIR} µm</span>
                </figcaption>
              </figure>

              {/* tolerance band */}
              <figure className="flex h-full flex-col items-center justify-end gap-3">
                <div className="relative flex w-full max-w-36 items-end" style={{ height: PAPER * PX_PER_UM }}>
                  <motion.div
                    className="metal-brass w-full origin-bottom rounded-[1px]"
                    style={{ height: PAPER * PX_PER_UM }}
                    initial={false}
                    animate={{ scaleY: band / PAPER }}
                    transition={spring}
                  />
                  <motion.span
                    className="absolute left-full ml-2 font-mono text-[11px] whitespace-nowrap text-brass-ink"
                    initial={false}
                    animate={{ bottom: band * PX_PER_UM - 8 }}
                    transition={spring}
                  >
                    {classes[idx].label}
                  </motion.span>
                </div>
                <figcaption className="text-center">
                  <span className="block text-sm">Our band</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{band} µm total</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
