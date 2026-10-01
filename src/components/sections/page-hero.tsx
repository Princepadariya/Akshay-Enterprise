import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/content/images";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./breadcrumbs";
import { DimensionLine } from "./dimension-line";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";

/** CSS entrance (runs before hydration, so it never delays content). */
const enter = "animate-in fade-in slide-in-from-bottom-3 duration-700 [animation-fill-mode:both] ease-[cubic-bezier(0.16,1,0.3,1)]";

type Props = {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: PhotoKey;
  dimension?: string;
  children?: React.ReactNode;
};

/** Inner-page hero: breadcrumbs, title, lead and an optional framed photograph. */
export function PageHero({ crumbs, title, lead, image, dimension, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="grid-lines mask-fade-b absolute inset-0 opacity-70" />
      <div
        className={cn(
          "container-x relative grid gap-10 pt-28 pb-14 md:pt-36 md:pb-20",
          image && "lg:grid-cols-12 lg:items-end",
        )}
      >
        <div className={cn("flex flex-col gap-6", image && "lg:col-span-7")}>
          <Breadcrumbs items={crumbs} />
          <SplitReveal
            as="h1"
            trigger="load"
            className="max-w-[20ch] font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-6xl"
          >
            {title}
          </SplitReveal>
          {dimension ? <DimensionLine label={dimension} className="max-w-sm" /> : null}
          {lead ? <p className={cn(enter, "delay-300 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg")}>{lead}</p> : null}
          {children ? <div className={cn(enter, "delay-500")}>{children}</div> : null}
        </div>
        {image ? (
          <ClipReveal className="relative overflow-hidden rounded-sm border border-border lg:col-span-5">
            <Photo k={image} priority className="aspect-[4/3] w-full lg:aspect-[5/4]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </ClipReveal>
        ) : null}
      </div>
    </section>
  );
}
