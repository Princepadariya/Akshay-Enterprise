"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { categories } from "@/content/products";
import { companyNav, manufacturingNav, policyNav } from "@/content/navigation";
import { mainEmail } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  // Close the sheet when any link inside it is followed.
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  const groups = [
    { title: "Products", links: [{ label: "All products", href: "/products" }, ...categories.map((c) => ({ label: c.short, href: `/products/${c.slug}`, description: c.spec }))] },
    { title: "Manufacturing", links: manufacturingNav },
    { title: "Company", links: companyNav },
    { title: "Policies", links: policyNav },
  ];
  // open the group that contains the current page, so the visitor sees where they are
  const currentGroup = groups.find((g) => g.links.some((l) => l.href === pathname))?.title;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu">
          <Menu strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        onClick={closeOnLink}
        // focus the menu panel itself on open (not the first group title, which would look selected)
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          navRef.current?.focus();
        }}
        className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md">
        <SheetTitle className="border-b border-border px-5 py-5 font-display text-lg">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav ref={navRef} tabIndex={-1} aria-label="Site" className="flex-1 overflow-y-auto px-5 outline-none" data-lenis-prevent>
          <Accordion type="single" collapsible defaultValue={currentGroup}>
            {groups.map((g) => (
              <AccordionItem key={g.title} value={g.title} className="border-border">
                <AccordionTrigger
                  className={cn(
                    "rounded-none border-0 py-4 font-display text-xl font-semibold transition-colors hover:no-underline",
                    // open group and keyboard focus: brass title instead of a boxed focus ring
                    "aria-expanded:text-brass-ink focus-visible:border-0 focus-visible:text-brass-ink focus-visible:ring-0 focus-visible:after:border-0",
                    "**:data-[slot=accordion-trigger-icon]:size-5 aria-expanded:**:data-[slot=accordion-trigger-icon]:text-brass-ink",
                  )}
                >
                  {g.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4 [&_a]:no-underline">
                  <ul className="relative grid gap-0.5 border-l border-border pl-3">
                    {g.links.map((l) => {
                      const current = pathname === l.href;
                      return (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            aria-current={current ? "page" : undefined}
                            className={cn(
                              "group relative flex items-center justify-between gap-4 rounded-sm px-3 py-2.5 transition-colors",
                              current ? "bg-brass-soft" : "hover:bg-brass-soft active:bg-brass-soft",
                            )}
                          >
                            {/* brass marker on the rail for the page you are on */}
                            {current ? <span aria-hidden className="absolute top-2 bottom-2 -left-[13px] w-0.5 rounded-full bg-brass" /> : null}
                            <span className="min-w-0">
                              <span className={cn("block text-[15px] leading-snug font-medium", current ? "text-brass-ink" : "text-foreground")}>{l.label}</span>
                              {l.description ? <span className="mt-0.5 block truncate text-xs text-muted-foreground">{l.description}</span> : null}
                            </span>
                            <ArrowUpRight
                              strokeWidth={1.5}
                              className={cn(
                                "size-4 shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass-ink",
                                current ? "text-brass-ink" : "text-muted-foreground",
                              )}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <ul className="grid py-2">
            {[
              { label: "Industries", href: "/industries" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href} className="border-b border-border last:border-b-0">
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={cn(
                    "group flex items-center justify-between py-4 font-display text-xl font-semibold transition-colors",
                    pathname.startsWith(l.href) ? "text-brass-ink" : "hover:text-brass-ink",
                  )}
                >
                  {l.label}
                  <ArrowUpRight strokeWidth={1.5} className="size-5 text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-border p-5">
          <Button asChild size="lg">
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
          <a href={mainEmail.href} className="text-center font-mono text-xs text-muted-foreground">
            {mainEmail.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
