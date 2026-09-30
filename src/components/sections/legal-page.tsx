import { PageHero } from "@/components/sections/page-hero";
import { TodoMark } from "@/components/todo-mark";
import type { LegalDoc } from "@/content/legal";

export function LegalPage({ doc, href }: { doc: LegalDoc; href: string }) {
  return (
    <>
      <PageHero crumbs={[{ name: doc.title, href }]} title={doc.title} lead={doc.intro}>
        <p className="font-mono text-xs text-muted-foreground">
          Last updated: {doc.updated}
          <TodoMark />
        </p>
      </PageHero>
      <article className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 grid gap-2 text-sm">
            {doc.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s-${i}`} className="text-muted-foreground hover:text-foreground">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid gap-10 lg:col-span-8">
          {doc.sections.map((s, i) => (
            <section key={s.heading} id={`s-${i}`} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{s.heading}</h2>
              <div className="mt-4 grid gap-3 leading-relaxed text-muted-foreground">
                {s.body.map((p, j) => (
                  <p key={j} className="max-w-[68ch]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
