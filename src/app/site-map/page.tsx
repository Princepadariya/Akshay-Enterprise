import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { categories, productsInCategory, productHref } from "@/content/products";
import { industries } from "@/content/industries";
import { companyNav, legalLinks, manufacturingNav, policyNav, type NavLink } from "@/content/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Site Map",
  description: "Every page on the Akshay Enterprise website: products, manufacturing, industries, company information and support.",
  path: "/site-map",
});

const keyPages: (NavLink & { description: string })[] = [
  { label: "Home", href: "/", description: "Overview of the company and what we make" },
  { label: "All products", href: "/products", description: "Search and filter the full product range" },
  { label: "Request a Quote", href: "/request-quote", description: "Send drawings and requirements for pricing" },
  { label: "Contact", href: "/contact", description: "Address, phone, email and enquiry form" },
];

const aboutPages = companyNav.filter((l) => l.href.startsWith("/about"));
const moreCompany = companyNav.filter((l) => !l.href.startsWith("/about"));

function PageLink({ link }: { link: NavLink }) {
  return (
    <li>
      <Link
        href={link.href}
        className="group -mx-3 flex flex-col gap-0.5 rounded-sm px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
      >
        <span className="text-[15px] text-foreground/90 group-hover:text-foreground">{link.label}</span>
        <span className="font-mono text-[11px] break-all text-muted-foreground transition-colors group-hover:text-brass-ink">{link.href}</span>
      </Link>
    </li>
  );
}

function Group({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <section className="rounded-sm border border-border bg-card p-6">
      <div className="flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        <span className="font-mono text-[11px] text-muted-foreground">{links.length} {links.length === 1 ? "page" : "pages"}</span>
      </div>
      <ul className="mt-3 grid">{links.map((l) => <PageLink key={l.href} link={l} />)}</ul>
    </section>
  );
}

export default function SiteMapPage() {
  const productCount = categories.reduce((n, c) => n + productsInCategory(c.slug).length, 0);
  const supportLinks: NavLink[] = [
    { label: "Request a Quote", href: "/request-quote" },
    { label: "Contact", href: "/contact" },
    ...legalLinks,
  ];
  // Unique pages listed on this map.
  const total = new Set([
    ...keyPages.map((l) => l.href),
    ...aboutPages.map((l) => l.href),
    ...manufacturingNav.map((l) => l.href),
    ...moreCompany.map((l) => l.href),
    ...supportLinks.map((l) => l.href),
    ...policyNav.map((l) => l.href),
    "/industries",
    ...industries.map((i) => `/industries/${i.slug}`),
    ...categories.map((c) => `/products/${c.slug}`),
    ...categories.flatMap((c) => productsInCategory(c.slug).map(productHref)),
  ]).size;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Site map", href: "/site-map" }]}
        title="Site map"
        lead="Every page on this website, grouped by section, with the web address of each page."
      >
        <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { k: "Pages", v: total },
            { k: "Product families", v: categories.length },
            { k: "Industries", v: industries.length },
          ].map((s) => (
            <div key={s.k} className="flex flex-col-reverse">
              <dt className="text-sm text-muted-foreground">{s.k}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight tabular">{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Key pages */}
      <section className="container-x py-12 md:py-16">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {keyPages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                data-fx="spotlight"
                className="group flex h-full flex-col justify-between gap-8 rounded-sm border border-border bg-surface p-6 transition-colors hover:border-brass/60"
              >
                <span>
                  <span className="block font-display text-xl font-semibold tracking-tight">{p.label}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{p.description}</span>
                </span>
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{p.href}</span>
                  <ArrowUpRight strokeWidth={1.5} className="size-5 text-brass transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Company, manufacturing, support */}
      <section className="container-x grid gap-4 pb-16 md:grid-cols-2 md:pb-24 lg:grid-cols-3 xl:grid-cols-5">
        <Group title="About us" links={aboutPages} />
        <Group title="Manufacturing" links={manufacturingNav} />
        <Group title="Company" links={moreCompany} />
        <Group title="Support" links={supportLinks} />
        <Group title="Policies" links={policyNav} />
      </section>

      {/* Products: every family with every product line */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Products</h2>
              <p className="mt-2 text-muted-foreground">
                {categories.length} product families and {productCount} product pages.
              </p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
              Search all products <ArrowRight strokeWidth={1.5} className="size-4" />
            </Link>
          </div>

          <div className="mt-10 columns-1 gap-4 md:columns-2 xl:columns-3">
            {categories.map((c) => {
              const items = productsInCategory(c.slug);
              return (
                <section key={c.slug} className="mb-4 break-inside-avoid rounded-sm border border-border bg-card p-6">
                  <Link href={`/products/${c.slug}`} className="group flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-display text-lg leading-tight font-semibold tracking-tight group-hover:text-brass-ink">
                        {c.name}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] text-muted-foreground">/products/{c.slug}</span>
                    </span>
                    <span className="shrink-0 rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {items.length}
                    </span>
                  </Link>
                  <ul className="mt-4 grid border-l border-brass/40 pl-4">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link href={productHref(p)} className="block py-1.5 text-sm text-foreground/80 transition-colors hover:text-brass-ink">
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-x py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">Industries</h2>
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
            All industries <ArrowRight strokeWidth={1.5} className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link href={`/industries/${i.slug}`} className="group flex h-full flex-col gap-2 bg-card p-5 transition-colors hover:bg-surface">
                <span className="font-display font-semibold tracking-tight group-hover:text-brass-ink">{i.name}</span>
                <span className="font-mono text-[11px] text-muted-foreground">/industries/{i.slug}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
