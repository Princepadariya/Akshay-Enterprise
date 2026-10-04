import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
          <SectionHeader title="Who we are and what we make" />
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
        <h2 className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-4xl">More about us</h2>
        <ul className="mt-10 border-b border-border">
          {sub.map((s, i) => (
            <li key={s.href} className="border-t border-border">
              <Link href={s.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 md:grid-cols-[4rem_minmax(0,18rem)_1fr_auto] md:gap-8 md:py-7">
                <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl leading-tight font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                  {s.title}
                </span>
                <span className="hidden text-muted-foreground md:block">{s.body}</span>
                <span className="grid size-10 place-items-center rounded-full border border-border transition-[background-color,border-color,color,transform] duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-brass-foreground">
                  <ArrowUpRight strokeWidth={1.5} className="size-4" />
                </span>
                <span className="col-span-3 -mt-3 text-sm text-muted-foreground md:hidden">{s.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Have a part you need made?" body="Share a drawing or sample and we will come back with a process, a price and a lead time." />
    </>
  );
}
