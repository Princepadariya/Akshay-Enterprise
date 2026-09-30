import { StatCounter } from "@/components/sections/stat-counter";
import { TodoMark } from "@/components/todo-mark";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";

export function StatsBand() {
  return (
    <section aria-label="Company in numbers" className="container-x py-20 md:py-28">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="relative flex flex-col gap-3 pt-6">
            <span aria-hidden className="metal-brass absolute top-0 left-0 h-[2px] w-10" />
            <dt className="order-2 max-w-[18ch] text-sm leading-snug text-muted-foreground">
              {s.label}
              <TodoMark show={s.placeholder} />
            </dt>
            <dd className="order-1 font-display text-5xl font-semibold tracking-[-0.04em] tabular md:text-6xl">
              <StatCounter value={s.value} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
