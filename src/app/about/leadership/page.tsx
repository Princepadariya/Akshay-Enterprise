import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { TodoMark } from "@/components/todo-mark";
import { leadership } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Leadership",
  description: "The management team responsible for operations, quality and export at Akshay Enterprise.",
  path: "/about/leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About", href: "/about" },
          { name: "Leadership", href: "/about/leadership" },
        ]}
        title="Leadership"
        lead="A small leadership team that stays close to the shop floor and to customers."
      />
      <section className="container-x py-16 md:py-24">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((p) => (
            <li key={p.role} className="group overflow-hidden rounded-sm border border-border bg-card">
              {/* TODO: replace monogram with a portrait (next/image) once photos are supplied */}
              <div className="grid aspect-[4/5] place-items-center border-b border-dashed border-border bg-surface">
                <span className="font-mono text-[11px] text-muted-foreground">Portrait to follow</span>
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold tracking-tight">
                  {p.name}
                  <TodoMark show={p.placeholder} />
                </p>
                <p className="mt-1 text-sm text-brass-ink">{p.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.focus}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Talk to the team directly." body="Every enquiry is read by someone who can answer it." secondary={{ label: "Contact", href: "/contact" }} />
    </>
  );
}
