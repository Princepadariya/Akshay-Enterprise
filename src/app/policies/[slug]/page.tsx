import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { getPolicy, policies } from "@/content/policies";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: `${p.summary} ${p.intro}`.slice(0, 300), path: `/policies/${p.slug}` });
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) notFound();

  return (
    <LegalPage
      doc={p}
      href={`/policies/${p.slug}`}
      crumbs={[
        { name: "Policies", href: "/policies" },
        { name: p.short, href: `/policies/${p.slug}` },
      ]}
      approvedBy={p.approvedBy}
      related={policies.filter((o) => o.slug !== p.slug).map((o) => ({ title: o.title, href: `/policies/${o.slug}`, summary: o.summary }))}
    />
  );
}
