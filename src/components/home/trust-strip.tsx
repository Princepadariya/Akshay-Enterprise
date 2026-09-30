import { Marquee } from "@/components/sections/marquee";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";

const countries = site.stats.find((s) => s.label === "Export countries");

export function TrustStrip() {
  return (
    <section aria-label="Standards and export reach" className="border-y border-border bg-surface">
      <div className="container-x grid items-center gap-6 py-6 md:grid-cols-[auto_1fr] md:gap-10">
        <p className="text-sm text-muted-foreground">
          Exporting to{" "}
          <span className="font-mono text-foreground">
            {countries?.value}
            {countries?.suffix}
          </span>{" "}
          countries
          <TodoMark show={countries?.placeholder} />
        </p>
        <Marquee duration={50}>
          {site.standards.map((s) => (
            <span key={s} className="flex items-center gap-10 pr-10 font-mono text-[12px] tracking-wide whitespace-nowrap text-foreground/75">
              {s}
              <span aria-hidden className="h-3 w-px bg-border" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
