import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/photo";
import { productHref, type Product } from "@/content/products";
import { materialName } from "@/content/materials";
import { cn } from "@/lib/utils";

/** Product tile with a hover spec reveal (pure CSS, keyboard-focus aware). */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <Link
      href={productHref(product)}
      data-fx="spotlight"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-500 hover:border-brass/60 focus-visible:border-brass",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          k={product.images[0]}
          className="absolute inset-0"
          imgClassName="transition-transform duration-[1.2s] group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
        {/* hover spec reveal */}
        <div className="absolute inset-x-0 bottom-0 z-[2] translate-y-full bg-graphite/85 p-4 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px] text-steel-200">
            <dt className="text-steel-400">Size</dt>
            <dd className="truncate">{product.sizes}</dd>
            <dt className="text-steel-400">Material</dt>
            <dd className="truncate">{product.materials.slice(0, 3).map(materialName).join(", ")}</dd>
            {product.threads.length ? (
              <>
                <dt className="text-steel-400">Threads</dt>
                <dd className="truncate">{product.threads.join(", ")}</dd>
              </>
            ) : null}
          </dl>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg leading-tight font-semibold tracking-tight">{product.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
        </div>
        <ArrowUpRight
          strokeWidth={1.5}
          className="mt-1 size-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass"
        />
      </div>
    </Link>
  );
}
