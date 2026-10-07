"use client";

import { SiteImage as Image } from "@/components/site-image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { categories, materialRanges, productsInCategory } from "@/content/products";
import { photos } from "@/content/images";
import { companyNav, manufacturingNav, policyNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

const trigger = cn(
  navigationMenuTriggerStyle(),
  "h-9 rounded-sm bg-transparent px-3 text-[13.5px] font-medium text-foreground/80 hover:bg-foreground/[0.05] hover:text-foreground focus:bg-foreground/[0.05] data-[state=open]:bg-foreground/[0.05] data-[state=open]:text-foreground",
);

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  // Boolean threshold only: re-renders once when crossing 24px, not per frame.
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-sm focus:bg-brass focus:px-3 focus:py-2 focus:text-brass-foreground"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Logo />

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(trigger, isActive("/products") && "text-foreground")}>
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(920px,calc(100vw-20rem))] grid-cols-[1fr_15rem] gap-0 xl:grid-cols-[1fr_16rem]">
                  <div className="flex flex-col p-4">
                    <div className="flex items-baseline justify-between px-2 pb-3">
                      <p className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                        Product range · {categories.length} families
                      </p>
                      <NavigationMenuLink asChild>
                        <Link href="/products" className="inline-flex items-center gap-1 text-xs font-medium text-brass-ink hover:underline">
                          View all <ArrowRight strokeWidth={1.5} className="size-3.5" />
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    {/* content-start: rows keep their own height instead of stretching to the side panel */}
                    <ul className="grid grid-cols-2 content-start gap-2">
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/products/${c.slug}`}
                              className="group flex items-center gap-3 rounded-sm border border-transparent p-2 transition-colors hover:border-brass/40 hover:bg-brass-soft/60"
                            >
                              <span className="relative size-14 shrink-0 overflow-hidden rounded-sm border border-border">
                                <Image src={photos[c.image].src} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                              </span>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className="truncate text-[14px] font-semibold">{c.short}</span>
                                <span className="truncate font-mono text-[10.5px] text-muted-foreground">{c.spec}</span>
                                <span className="text-[11px] text-brass-ink">
                                  {productsInCategory(c.slug).length} products
                                </span>
                              </span>
                              <ArrowRight
                                strokeWidth={1.5}
                                aria-hidden
                                className="size-4 shrink-0 -translate-x-1 text-brass-ink opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-between gap-6 border-l border-border bg-surface p-5">
                    <div>
                      <p className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">By material</p>
                      <ul className="mt-2 grid gap-0.5">
                        {materialRanges.map((m) => (
                          <li key={m.slug}>
                            <NavigationMenuLink asChild>
                              <Link href={`/products/${m.slug}`} className="block rounded-sm px-2 py-1.5 text-[13.5px] font-medium hover:bg-foreground/[0.05]">
                                {m.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-display text-lg leading-tight font-semibold">Have a drawing?</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Most of what we make is built to print. Send the file and get a costed quote.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <NavigationMenuLink asChild>
                        <Link href="/products" className="flex items-center justify-between rounded-sm border border-border px-3 py-2 text-sm hover:border-brass/60">
                          All products <ArrowRight strokeWidth={1.5} className="size-4" />
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/capabilities" className="flex items-center justify-between rounded-sm border border-border px-3 py-2 text-sm hover:border-brass/60">
                          Custom manufacturing <ArrowRight strokeWidth={1.5} className="size-4" />
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={trigger}>Manufacturing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[30rem] grid-cols-2 gap-1 p-3">
                  {manufacturingNav.map((l) => (
                    <li key={l.href}>
                      <NavigationMenuLink asChild>
                        <Link href={l.href} className="flex flex-col items-start gap-1 rounded-sm p-3 hover:bg-foreground/[0.05]">
                          <span className="text-[13.5px] font-medium">{l.label}</span>
                          <span className="text-xs leading-snug text-muted-foreground">{l.description}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(trigger, isActive("/industries") && "text-foreground")}>
                <Link href="/industries">Industries</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={trigger}>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[34rem] grid-cols-3 gap-1 p-3">
                  {companyNav.map((l) => (
                    <li key={l.href}>
                      <NavigationMenuLink asChild>
                        <Link href={l.href} className="block rounded-sm px-3 py-2.5 text-[13.5px] hover:bg-foreground/[0.05]">
                          {l.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(trigger, isActive("/policies") && "text-foreground")}>Policies</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[30rem]">
                  <ul className="grid grid-cols-2 gap-1 p-3">
                    {policyNav.slice(1).map((l) => (
                      <li key={l.href}>
                        <NavigationMenuLink asChild>
                          <Link href={l.href} className="flex flex-col items-start gap-1 rounded-sm p-3 hover:bg-foreground/[0.05]">
                            <span className="text-[13.5px] font-medium">{l.label}</span>
                            <span className="text-xs leading-snug text-muted-foreground">{l.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border bg-surface p-3">
                    <NavigationMenuLink asChild>
                      <Link href="/policies" className="flex items-center justify-between rounded-sm border border-border px-3 py-2 text-sm hover:border-brass/60">
                        All policies <ArrowRight strokeWidth={1.5} className="size-4" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(trigger, isActive("/contact") && "text-foreground")}>
                <Link href="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1.5">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
