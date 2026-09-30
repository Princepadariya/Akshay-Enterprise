import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/content/products";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-lines mask-fade-b absolute inset-0 opacity-70" />
      <div className="container-x relative grid min-h-[80dvh] content-center gap-10 pt-32 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-sm text-brass-ink">Error 404</p>
          <h1 className="mt-4 font-display text-5xl leading-[1] font-semibold tracking-[-0.04em] md:text-7xl">Page not found.</h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
            This page does not exist or has moved. Search the product range, or pick a family below.
          </p>
          <form action="/products" method="get" className="mt-8 flex max-w-lg gap-2" role="search">
            <label htmlFor="nf-q" className="sr-only">
              Search products
            </label>
            <input
              id="nf-q"
              name="q"
              placeholder="Search products, e.g. terminal"
              className="h-11 flex-1 rounded-sm border border-input bg-background px-3 text-[15px] placeholder:text-muted-foreground focus-visible:border-brass focus-visible:outline-none"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <nav aria-label="Product families" className="lg:col-span-5">
          <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className="group flex items-center justify-between bg-card px-5 py-4 hover:bg-surface">
                  <span>{c.name}</span>
                  <ArrowRight strokeWidth={1.5} className="size-4 text-brass transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="flex items-center justify-between bg-card px-5 py-4 font-medium hover:bg-surface">
                Back to home <ArrowRight strokeWidth={1.5} className="size-4 text-brass" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
