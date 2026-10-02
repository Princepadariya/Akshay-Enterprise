"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FileText, Package, Ship, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    icon: Package,
    stage: "At the factory",
    title: "Export packing",
    body: "VCI bags, desiccant, cartons and heat-treated pallets suited to sea or air freight.",
    items: ["VCI bags", "Desiccant", "Cartons", "Heat-treated pallets"],
  },
  {
    icon: FileText,
    stage: "Before dispatch",
    title: "Documentation",
    body: "Commercial invoice, packing list, certificate of origin, inspection reports and material certificates.",
    items: ["Commercial invoice", "Packing list", "Certificate of origin", "Inspection report", "Material certificate"],
  },
  {
    icon: Truck,
    stage: "Factory to port",
    title: "Inland logistics",
    body: "Factory to port handled with our forwarding partners, with container stuffing supervised.",
    items: ["Forwarding partners", "Supervised stuffing"],
  },
  {
    icon: Ship,
    stage: "Port to your door",
    title: "Shipping",
    body: "Consolidated or full-container shipments from Gujarat's ports, tracked to your door on request.",
    items: ["Consolidated (LCL)", "Full container (FCL)", "Door tracking on request"],
  },
];

/**
 * Export steps read like a shipment being tracked. A route rail runs down beside the four stages;
 * it fills with brass as you scroll and a parcel marker rides it, lighting each stage node as it
 * arrives. The items each stage covers drop in as chips. Static and fully filled under reduced motion.
 */
export function ExportRoute() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const rail = el.querySelector<HTMLElement>("[data-rail]")!;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", el);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // node centres along the rail, as a 0..1 fraction of its height
        const stops = () => {
          const r = rail.getBoundingClientRect();
          return nodes.map((n) => {
            const b = n.getBoundingClientRect();
            return (b.top + b.height / 2 - r.top) / r.height;
          });
        };
        let marks = stops();

        const light = (p: number) =>
          nodes.forEach((n, i) => n.toggleAttribute("data-on", p >= marks[i] - 0.01));

        gsap.set("[data-fill]", { scaleY: 0 });
        gsap.set("[data-parcel]", { top: "0%", autoAlpha: 1 });
        light(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: () => (marks = stops()),
            onUpdate: (self) => light(self.progress),
          },
        });
        tl.to("[data-fill]", { scaleY: 1, ease: "none" }, 0).to("[data-parcel]", { top: "100%", ease: "none" }, 0);

        ScrollTrigger.batch("[data-chip]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.fromTo(batch, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out", stagger: 0.04 }),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        nodes.forEach((n) => n.setAttribute("data-on", ""));
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {/* route rail through the node centres (nodes are 3.5rem wide, so the rail sits at 1.75rem) */}
      <div data-rail aria-hidden className="absolute top-7 bottom-7" style={{ left: "1.75rem", width: 1 }}>
        <div className="absolute inset-0 bg-border" />
        <div
          data-fill
          className="absolute inset-0 origin-top"
          style={{ background: "linear-gradient(180deg, var(--brass), var(--brass-ink, var(--brass)))" }}
        />
        <span
          data-parcel
          className="absolute left-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[3px] border border-brass bg-background shadow-[0_0_0_4px_rgb(207_165_96/0.15)]"
          style={{ top: "100%", opacity: 0 }}
        >
          <Package strokeWidth={1.75} className="size-3 text-brass" />
        </span>
      </div>

      <ol className="relative grid gap-4">
        {steps.map((s, i) => (
          <li key={s.title} className="group grid grid-cols-[3.5rem_1fr] items-start gap-4 sm:gap-6">
            <span
              data-node
              data-on=""
              className="relative z-[1] mt-5 grid size-14 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-[background-color,color,border-color,box-shadow] duration-500 data-[on]:border-brass data-[on]:bg-brass data-[on]:text-graphite data-[on]:shadow-[0_0_0_6px_rgb(207_165_96/0.18)]"
            >
              <s.icon strokeWidth={1.5} className="size-6" />
            </span>

            <article className="relative overflow-hidden rounded-sm border border-border bg-card p-6 transition-[border-color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:border-brass/50 md:p-7">
              {/* faint oversized stage number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-3 font-display-wide text-[5.5rem] leading-none font-bold text-foreground/[0.04] select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-mono text-[11px] tracking-[0.14em] text-brass-ink uppercase">
                Stage {String(i + 1).padStart(2, "0")} · {s.stage}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    data-chip
                    className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
