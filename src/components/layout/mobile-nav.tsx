"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { categories } from "@/content/products";
import { companyNav, manufacturingNav, policyNav } from "@/content/navigation";
import { site } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  // Close the sheet when any link inside it is followed.
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  const groups = [
    { title: "Products", links: [{ label: "All products", href: "/products" }, ...categories.map((c) => ({ label: c.short, href: `/products/${c.slug}` }))] },
    { title: "Manufacturing", links: manufacturingNav },
    { title: "Company", links: companyNav },
    { title: "Policies", links: policyNav },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu">
          <Menu strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" onClick={closeOnLink} className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md">
        <SheetTitle className="border-b border-border px-5 py-5 font-display text-lg">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav className="flex-1 overflow-y-auto px-5" data-lenis-prevent>
          <Accordion type="single" collapsible>
            {groups.map((g) => (
              <AccordionItem key={g.title} value={g.title} className="border-border">
                <AccordionTrigger className="py-4 font-display text-xl font-semibold hover:no-underline">{g.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-1 pb-2">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="block rounded-sm py-2 text-[15px] text-muted-foreground hover:text-foreground">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <ul className="grid gap-1 py-4">
            <li>
              <Link href="/industries" className="block py-3 font-display text-xl font-semibold">
                Industries
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-3 font-display text-xl font-semibold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-border p-5">
          <Button asChild size="lg">
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
          <a href={site.contact.email.href} className="text-center font-mono text-xs text-muted-foreground">
            {site.contact.email.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
