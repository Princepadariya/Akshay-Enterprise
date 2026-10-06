"use client";

import { SiteImage as Image } from "@/components/site-image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { industries } from "@/content/industries";
import { photos } from "@/content/images";
import { getIcon, ICON_STROKE } from "@/lib/icons";

/**
 * Industries as a horizontal image accordion (desktop) / stacked list (mobile).
 * Hover or keyboard focus opens a panel: GSAP tweens every panel's flex-grow together so the
 * strip re-balances as one motion, while the open panel's copy rises in and its photo eases out of zoom.
 */
const OPEN = 7;
const CLOSED = 1;

export function IndustriesAccordion() {
  const root = useRef<HTMLDivElement>(null);
  const active = useRef(0);
  // Plain event handler: one-shot tweens on hover/focus, nothing to clean up on unmount.
  // No React state on hover: the active index lives in a ref and GSAP does all visual changes,
  // so moving the pointer across panels never re-renders the eight panels.
  const open = (index: number) => {
    if (index === active.current) return;
    active.current = index;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root.current);
    panels.forEach((panel, i) => {
      const on = i === index;
      gsap.to(panel, { flexGrow: on ? OPEN : CLOSED, duration: reduce ? 0 : 0.8, ease: "expo.out", overwrite: "auto" });
      gsap.to(panel.querySelector("[data-img]"), { scale: on ? 1 : 1.12, duration: reduce ? 0 : 1.2, ease: "expo.out", overwrite: "auto" });
      gsap.to(panel.querySelector("[data-closed]"), { autoAlpha: on ? 0 : 1, duration: reduce ? 0 : 0.3, overwrite: "auto" });
      // Open panel shows the photo in original colour: fade out the grey layer and the dark wash
      // (opacity-only tweens on composited layers, so this stays cheap).
      gsap.to(panel.querySelectorAll("[data-gray], [data-wash]"), { autoAlpha: on ? 0 : 1, duration: reduce ? 0 : 0.6, ease: "power2.out", overwrite: "auto" });
      const body = panel.querySelector("[data-body]");
      if (on) {
        gsap.fromTo(
          body,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.18, ease: "expo.out", overwrite: "auto" },
        );
      } else {
        gsap.to(body, { autoAlpha: 0, y: 12, duration: reduce ? 0 : 0.25, overwrite: "auto" });
      }
    });
  };

  return (
    <section className="border-t border-border py-24 md:py-36">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <SectionHeader title="Industries we supply" lead="Hover a sector to see the parts we make for it." />
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
            All industries <ArrowUpRight strokeWidth={1.5} className="size-4" />
          </Link>
        </div>

        {/* Desktop: horizontal accordion */}
        <div ref={root} className="hidden h-[560px] gap-2 md:flex">
          {industries.map((ind, i) => {
            const Icon = getIcon(ind.icon);
            const on = i === 0; // initial render only
            const p = photos[ind.image];
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                data-panel
                onMouseEnter={() => open(i)}
                onFocus={() => open(i)}
                aria-label={`${ind.name}: ${ind.summary}`}
                className="group relative isolate min-w-0 overflow-hidden rounded-sm border border-border bg-surface-2 outline-offset-2 [contain:layout_paint]"
                style={{ flexGrow: i === 0 ? OPEN : CLOSED, flexBasis: 0 }} /* initial only; GSAP owns it afterwards */
              >
                {/*
                  Photo is a FIXED size (the open panel's width), centred, and only clipped by the panel.
                  It never resizes while panels animate, and sits on its own GPU layer, so the filter
                  is rasterised once instead of every frame.
                */}
                <div className="absolute inset-y-0 left-1/2 -z-10 w-[min(1000px,72vw)] -translate-x-1/2">
                  <div data-img className="absolute inset-0 will-change-transform" style={{ transform: `scale(${i === 0 ? 1 : 1.12})` }}>
                    {/* original colour photo */}
                    <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 1000px, 72vw" className="object-cover" />
                    {/* grey, brass-toned copy on top (same file, cached): visible on closed panels only */}
                    <Image
                      data-gray
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 1000px, 72vw"
                      className="object-cover will-change-[opacity] [filter:grayscale(1)_sepia(0.22)_contrast(1.08)_brightness(0.82)]"
                      style={{ opacity: on ? 0 : 1, visibility: on ? "hidden" : "visible" }}
                    />
                  </div>
                </div>
                {/* dark wash for the closed panels' vertical labels; faded out on the open panel */}
                <div
                  data-wash
                  aria-hidden
                  className="absolute inset-0 -z-[5] bg-gradient-to-t from-graphite via-graphite/45 to-graphite/15 will-change-[opacity]"
                  style={{ opacity: on ? 0 : 1, visibility: on ? "hidden" : "visible" }}
                />

                {/* closed state: icon + vertical label */}
                <div
                  data-closed
                  className="absolute inset-0 flex flex-col items-center justify-between py-6"
                  style={{ opacity: on ? 0 : 1 }}
                >
                  <Icon strokeWidth={ICON_STROKE} className="size-6 text-brass" />
                  <span className="font-display text-base font-semibold whitespace-nowrap text-paper [writing-mode:vertical-rl] rotate-180">
                    {ind.name}
                  </span>
                </div>

                {/* open state */}
                <div
                  data-body
                  className="absolute bottom-5 left-5 w-[min(560px,48vw)] rounded-sm border border-white/10 bg-graphite/85 p-7 shadow-[0_20px_50px_-20px_rgb(18_11_10/0.6)]" /* fixed width: text never re-wraps mid-animation; solid card keeps text readable over the full-colour photo */
                  style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                >
                  <Icon strokeWidth={ICON_STROKE} className="size-8 text-brass" />
                  <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-paper">{ind.name}</h3>
                  <p className="mt-3 max-w-[46ch] leading-relaxed text-steel-100">{ind.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {ind.parts.slice(0, 4).map((part) => (
                      <li key={part} className="rounded-sm border border-white/20 bg-graphite/70 px-2.5 py-1 font-mono text-[11px] text-paper">
                        {part}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brass">
                    View sector <ArrowUpRight strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile: stacked list */}
        <ul className="grid gap-3 md:hidden">
          {industries.map((ind) => {
            const Icon = getIcon(ind.icon);
            const p = photos[ind.image];
            return (
              <li key={ind.slug}>
                <Link href={`/industries/${ind.slug}`} className="relative isolate flex min-h-72 flex-col justify-end overflow-hidden rounded-sm border border-border p-5 sm:min-h-80">
                  <div className="absolute inset-0 -z-10">
                    <Image src={p.src} alt="" fill sizes="(min-width: 768px) 1px, 100vw" className="object-cover" />
                  </div>
                  {/* shade sized for the text block: a light even dim plus a tall dark fade, so light photos stay readable */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-[5]"
                    style={{
                      background:
                        "linear-gradient(to top, rgb(18 11 10 / 0.94) 0%, rgb(18 11 10 / 0.82) 32%, rgb(18 11 10 / 0.4) 62%, rgb(18 11 10 / 0) 88%), rgb(18 11 10 / 0.15)",
                    }}
                  />
                  <span className="grid size-10 place-items-center rounded-full border border-white/15 bg-graphite/60 backdrop-blur-sm">
                    <Icon strokeWidth={ICON_STROKE} className="size-5 text-cream" />
                  </span>
                  <div style={{ textShadow: "0 1px 12px rgb(0 0 0 / 0.5)" }}>
                    <h3 className="mt-3 font-display text-xl font-semibold text-paper">{ind.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-steel-100">{ind.summary}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
