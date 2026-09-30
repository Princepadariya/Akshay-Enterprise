import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/photo";
import { SectionHeader } from "@/components/sections/section-header";
import { industries } from "@/content/industries";
import { getIcon, ICON_STROKE } from "@/lib/icons";

/** Interactive industry index: hover / focus reveals the sector photograph and typical parts. */
export function IndustriesGrid() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-x">
        <div className="mb-12 md:mb-16">
          <SectionHeader title="Industries we supply" />
        </div>
        <ul className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => {
            const Icon = getIcon(ind.icon);
            return (
              <li key={ind.slug} className="border-r border-b border-border">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden p-6 outline-offset-[-2px]"
                >
                  <Photo
                    k={ind.image}
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="relative z-[2] flex items-start justify-between">
                    <Icon
                      strokeWidth={ICON_STROKE}
                      className="size-7 text-brass transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper"
                    />
                    <ArrowUpRight
                      strokeWidth={1.5}
                      className="size-5 text-muted-foreground transition-all duration-500 group-hover:text-paper group-focus-visible:text-paper"
                    />
                  </div>
                  <div className="relative z-[2]">
                    <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper">
                      {ind.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-steel-100 group-focus-visible:text-steel-100">
                      {ind.summary}
                    </p>
                    <p className="mt-4 hidden font-mono text-[11px] tracking-wide text-steel-200 group-hover:block group-focus-visible:block">
                      {ind.parts.slice(0, 3).join("  /  ")}
                    </p>
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
