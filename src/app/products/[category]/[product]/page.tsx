import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowDown, FileText, Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { ProductCard } from "@/components/sections/product-card";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInquiryForm } from "@/components/forms/product-inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { findProductBySlug, getCategory, getProduct, products, productsInCategory } from "@/content/products";
import { finishName, materialName } from "@/content/materials";
import { hasPhone, hasWhatsapp, mainEmail, mainPhone, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { productSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) return {};
  return pageMetadata({
    title: p.name,
    description: `${p.summary} Available in ${p.materials.map(materialName).join(", ")}. ${p.sizes}.`,
    path: `/products/${p.category}/${p.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  const c = getCategory(category);
  if (!p || !c) notFound();

  // explicit related parts first, topped up from the same category
  const related = [
    ...(p.related ?? []).map(findProductBySlug).filter((x) => x !== undefined),
    ...productsInCategory(c.slug).filter((x) => x.slug !== p.slug),
  ]
    .filter((x, i, arr) => arr.findIndex((y) => y.slug === x.slug) === i)
    .slice(0, 3);

  const specs = [
    { label: "Material", value: p.materials.map(materialName).join(", ") },
    { label: "Size range", value: p.sizes },
    { label: "Threads", value: p.threads.length ? p.threads.join(", ") : "Plain / as per drawing" },
    { label: "Finish", value: p.finishes.map(finishName).join(", ") },
    { label: "Tolerance", value: p.tolerance },
  ];

  return (
    <>
      <section className="border-b border-border">
        <div className="container-x grid gap-10 pt-28 pb-14 md:pt-32 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery images={p.images} name={p.name} />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <Breadcrumbs
              items={[
                { name: "Products", href: "/products" },
                { name: c.short, href: `/products/${c.slug}` },
                { name: p.name, href: `/products/${c.slug}/${p.slug}` },
              ]}
            />
            <div>
              <Link href={`/products/${c.slug}`} className="font-mono text-[11px] tracking-[0.16em] text-brass-ink uppercase hover:underline">
                {c.name}
              </Link>
              <h1 className="mt-3 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">{p.name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{p.summary}</p>
            </div>

            <dl className="divide-y divide-border rounded-sm border border-border bg-card text-sm">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[7.5rem_1fr] gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#enquire">
                  Enquire about this part <ArrowDown strokeWidth={1.5} />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/request-quote?category=${p.category}&product=${p.slug}`}>
                  <FileText strokeWidth={1.5} /> Have a drawing? Upload it
                </Link>
              </Button>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {hasPhone ? (
                <li>
                  <a href={mainPhone.href} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Phone strokeWidth={1.5} className="size-4 text-brass" /> {mainPhone.display}
                  </a>
                </li>
              ) : null}
              {hasWhatsapp ? (
                <li>
                  <a
                    href={whatsappHref(`Hello Akshay Enterprise, I would like to enquire about ${p.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <MessageCircle strokeWidth={1.5} className="size-4 text-[#25D366]" /> WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <a href={mainEmail.href} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Mail strokeWidth={1.5} className="size-4 text-brass" /> {mainEmail.display}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="enquire" className="container-x grid scroll-mt-24 gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">About this part</h2>
          <p className="text-base leading-relaxed md:text-lg">{p.description}</p>
          <p className="leading-relaxed text-muted-foreground">
            Every part is made to order. Tell us the material grade, size, thread and finish you need, or attach your own
            drawing, and we will make it to your specification.
          </p>
          {p.applications.length ? (
            <div className="mt-2">
              <h3 className="font-display text-lg font-semibold">Typical uses</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.applications.map((a) => (
                  <li key={a} className="rounded-sm border border-border bg-card px-3 py-1.5 text-sm">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-sm border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Enquire about {p.name}</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              Fill in your details and we will reply by email within one working day.
            </p>
            <ProductInquiryForm slug={p.slug} name={p.name} />
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-border bg-surface py-14 md:py-20">
          <div className="container-x">
            <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">You may also need</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard product={r} className="h-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JsonLd data={productSchema(p)} />
    </>
  );
}
