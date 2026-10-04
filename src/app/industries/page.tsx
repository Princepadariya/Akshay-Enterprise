import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";
import { industries } from "@/content/industries";
import { getIcon, ICON_STROKE } from "@/lib/icons";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries Served",
  description:
    "Precision brass and metal components for electrical and switchgear, plumbing and sanitary, gas and LPG, automotive, HVAC, telecom, agriculture and general engineering.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }]}
        title="Industries served"
        lead="Components for eight sectors, each with its own requirements for material, finish and inspection."
      />
      <section className="container-x grid gap-4 py-16 md:grid-cols-2 md:py-24">
        {industries.map((ind, i) => {
          const Icon = getIcon(ind.icon);
          return (
            <Reveal key={ind.slug} delay={(i % 2) * 0.06}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group grid h-full overflow-hidden rounded-sm border border-border bg-card transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_24px_50px_-30px_rgb(11_13_16/0.45)] sm:grid-cols-[42%_1fr]"
              >
                <div className="relative min-h-52 overflow-hidden">
                  <Photo k={ind.image} className="absolute inset-0" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" sizes="(min-width: 768px) 22vw, 100vw" />
                  <span className="absolute top-3 left-3 rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[11px] text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <Icon strokeWidth={ICON_STROKE} className="size-6 text-brass" />
                    <span className="grid size-9 place-items-center rounded-full border border-border transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-brass-foreground">
                      <ArrowUpRight strokeWidth={1.5} className="size-4" />
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">{ind.name}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{ind.summary}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {ind.parts.slice(0, 3).map((part) => (
                      <li key={part} className="rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
      <CtaBand title="Your industry is not listed?" body="If the part is turned from bar, we can likely make it. Send the drawing." />
    </>
  );
}
