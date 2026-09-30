import Link from "next/link";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/motion/reveal";
import { materials } from "@/content/materials";

/** Bar-stock sample rack. Each swatch catches a specular highlight that follows the cursor. */
export function MaterialRack() {
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          title="Materials we machine"
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {materials.map((m, i) => (
            <Reveal as="li" key={m.key} delay={i * 0.05}>
              <Link
                href={`/materials#${m.key}`}
                data-fx="spotlight"
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card"
              >
                <div data-fx="sheen" className="metal-sheen relative h-44 md:h-56" style={{ background: m.swatch }}>
                  {/* brushed grain */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-60 mix-blend-overlay"
                    style={{ background: "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 3px)" }}
                  />
                  {/* bar end: hex with a centre drill mark */}
                  <svg aria-hidden viewBox="0 0 40 40" className="absolute right-3 bottom-3 size-9 opacity-70">
                    <path d="M20 2 35.6 11v18L20 38 4.4 29V11z" fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1" />
                    <circle cx="20" cy="20" r="2" fill="rgb(0 0 0 / 0.35)" />
                  </svg>
                  <span className="absolute top-3 left-3 rounded-sm bg-graphite/70 px-1.5 py-0.5 font-mono text-[10px] text-paper">{m.grades[0]}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="font-display text-base leading-tight font-semibold tracking-tight">{m.name}</p>
                  <p className="font-mono text-[10.5px] leading-relaxed text-muted-foreground">{m.grades.slice(1).join(" / ")}</p>
                  <p className="mt-auto pt-2 text-xs text-foreground/80">{m.properties[0].value}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
