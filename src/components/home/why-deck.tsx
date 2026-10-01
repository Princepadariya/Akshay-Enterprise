"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { TodoMark } from "@/components/todo-mark";
import { SectionHeader } from "@/components/sections/section-header";
import { site } from "@/content/site";
import { getIcon, ICON_STROKE } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "Why OEMs work with us" as a stacking deck.
 * Heading column stays pinned (CSS sticky) while cards scroll up and stack, each sticking a little
 * lower than the last so the edges of the deck stay visible. As a new card arrives, GSAP scrubs the
 * card beneath it back (scale + dim), so the reader always sees which reason is in front.
 * Below lg, or with reduced motion, cards render as a plain vertical list.
 */
export function WhyDeck() {
  const root = useRef<HTMLElement>(null);
  const items = site.differentiators;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        const slots = gsap.utils.toArray<HTMLElement>("[data-deck-slot]");
        cards.forEach((card, i) => {
          const next = slots[i + 1];
          if (!next) return;
          // explicit start values: GSAP cannot interpolate a filter from "none"
          gsap.fromTo(
            card,
            { scale: 1, filter: "brightness(1)" },
            {
              scale: 0.9 + i * 0.012,
              filter: "brightness(0.55)",
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
            },
          );
        });
        // the photo inside each card eases out of a slight zoom as the card arrives
        slots.forEach((slot) => {
          gsap.fromTo(
            slot.querySelector("[data-photo]"),
            { scale: 1.15 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: slot, start: "top bottom", end: "top 40%", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="border-t border-border py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <SectionHeader
              title="Why OEMs work with us"
              lead="Six reasons buyers give for staying with us after the first order."
            />
            <div>
              <Button asChild size="lg">
                <Link href="/request-quote">
                  Request a Quote <ArrowRight strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <ol className="grid gap-6 lg:col-span-8 lg:gap-[18vh]">
          {items.map((d, i) => {
            const Icon = getIcon(d.icon);
            return (
              <li key={d.title} data-deck-slot className="lg:sticky" style={{ top: `calc(8rem + ${i * 1.1}rem)` }}>
                <article
                  data-card
                  className="grid origin-top overflow-hidden rounded-sm border border-border bg-card shadow-[0_30px_60px_-30px_rgb(11_13_16/0.45)] will-change-transform sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                >
                  <div className="relative min-h-56 overflow-hidden sm:min-h-[22rem]">
                    <div data-photo className="absolute inset-0">
                      <Photo k={d.image} className="absolute inset-0" sizes="(min-width: 1024px) 28vw, 100vw" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
                    <div>
                      <Icon strokeWidth={ICON_STROKE} className="size-7 text-brass" />
                      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">{d.title}</h3>
                      <p className="mt-3 max-w-[42ch] leading-relaxed text-muted-foreground">{d.body}</p>
                    </div>
                    <p className="border-t border-border pt-4 font-mono text-[12px] text-foreground/85">
                      {d.proof}
                      <TodoMark show={"placeholder" in d && d.placeholder} />
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
