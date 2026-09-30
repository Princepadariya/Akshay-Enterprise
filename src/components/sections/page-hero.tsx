import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/content/images";
import type { Crumb } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./breadcrumbs";
import { DimensionLine } from "./dimension-line";

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
          <h1 className="max-w-[20ch] font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-6xl">
            {title}
          </h1>
          {dimension ? <DimensionLine label={dimension} className="max-w-sm" /> : null}
          {lead ? <p className="max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p> : null}
          {children}
        </div>
        {image ? (
          <div className="relative lg:col-span-5">
            <Photo
              k={image}
              priority
              className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-border lg:aspect-[5/4]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
