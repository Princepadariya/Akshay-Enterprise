"use client";

import Image from "next/image";
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
import { categories } from "@/content/products";
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
                <div className="grid w-[min(920px,calc(100vw-4rem))] grid-cols-[1fr_16rem] gap-0">
                  <ul className="grid grid-cols-2 gap-1 p-3">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <NavigationMenuLink asChild>
                          <Link href={`/products/${c.slug}`} className="group flex items-center gap-3 rounded-sm p-2 hover:bg-foreground/[0.05]">
                            <span className="relative size-11 shrink-0 overflow-hidden rounded-sm">
                              <Image src={photos[c.image].src} alt="" fill sizes="44px" className="object-cover" />
                            </span>
                            <span className="flex min-w-0 flex-col">
                              <span className="truncate text-[13.5px] font-medium">{c.short}</span>
                              <span className="truncate font-mono text-[10.5px] text-muted-foreground">{c.spec}</span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between gap-6 border-l border-border bg-surface p-5">
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
