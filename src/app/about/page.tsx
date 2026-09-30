import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";
import { TodoMark } from "@/components/todo-mark";
import { about } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Akshay Enterprise is a precision turned components manufacturer in Gujarat, India, making brass and multi-metal parts to drawing for OEMs in India and export markets.",
  path: "/about",
});

const sub = [
  { href: "/about/journey", title: "Journey", body: "Milestones from the first machine to export supply." },
  { href: "/about/vision-mission-values", title: "Vision, mission, values", body: "What we aim for and how we work." },
  { href: "/about/leadership", title: "Leadership", body: "The people accountable for your parts." },
];

export default function AboutPage() {
  const f = about.founderMessage;
  return (
    <>
      <PageHero crumbs={[{ name: "About", href: "/about" }]} title={about.headline} lead={about.intro} image="operatorLathe" />

      <section className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader title="Who we are and what we make." />
          <div className="mt-8 grid gap-5 text-lg leading-relaxed text-muted-foreground">
            {about.overview.map((p, i) => (
              <p key={i} className="max-w-[62ch]">
                {p}
              </p>
            ))}
          </div>
        </div>
        <dl className="grid content-start gap-px self-start overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {about.facts.map((fact) => (
            <div key={fact.label} className="bg-card p-6">
              <dt className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{fact.label}</dt>
              <dd className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {fact.value}
                <TodoMark show={"placeholder" in fact && fact.placeholder} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
              <Photo k="rulerParts" className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Reveal>
          <figure className="lg:col-span-7">
            <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-brass-ink uppercase">
              From the founder
              <TodoMark show={f.placeholder} />
            </p>
            <blockquote className="mt-6 grid gap-5">
              {f.paragraphs.map((p, i) => (
                <p key={i} className="max-w-[40ch] font-display text-2xl leading-[1.3] font-medium tracking-[-0.015em] md:text-3xl">
                  {p}
                </p>
              ))}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="metal-brass h-px w-10" />
              <span>
                <span className="font-medium">{f.name}</span>
                <span className="text-muted-foreground">, {f.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <ul className="grid gap-4 md:grid-cols-3">
          {sub.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex h-full flex-col justify-between gap-10 rounded-sm border border-border p-6 transition-colors hover:border-brass/60">
                <span>
                  <span className="block font-display text-xl font-semibold tracking-tight">{s.title}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{s.body}</span>
                </span>
                <ArrowRight strokeWidth={1.5} className="size-5 text-brass transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Have a part you need made?" body="Share a drawing or sample and we will come back with a process, a price and a lead time." />
    </>
  );
}
