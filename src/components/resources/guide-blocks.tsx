import type { Block, Section } from "@/content/resources";

/** Renders one guide section: heading plus its content blocks, styled like a technical document. */
export function GuideSection({ section, index }: { section: Section; index: number }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-h`} className="scroll-mt-28 border-t border-border pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${section.id}-h`} className="flex items-start gap-4 font-display text-2xl leading-tight font-semibold tracking-tight md:gap-5 md:text-3xl">
        {/* section number as a badge, aligned with the first line of the heading */}
        <span
          aria-hidden
          className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm border border-brass/60 bg-brass-soft font-mono text-[13px] font-medium tracking-normal text-brass-ink md:mt-0 md:size-10 md:text-sm"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0">{section.heading}</span>
      </h2>
      <div className="mt-6 grid gap-6">
        {section.blocks.map((b, i) => (
          <GuideBlock key={i} block={b} />
        ))}
      </div>
    </section>
  );
}

function GuideBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="max-w-[68ch] text-[17px] leading-[1.75] text-foreground/85">{block.text}</p>;

    case "list":
      return block.ordered ? (
        <ol className="grid max-w-[68ch] gap-3">
          {block.items.map((it, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 text-[17px] leading-[1.7] text-foreground/85">
              <span className="pt-0.5 font-mono text-sm text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
              {it}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="grid max-w-[68ch] gap-3">
          {block.items.map((it, i) => (
            <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-2 text-[17px] leading-[1.7] text-foreground/85">
              <span aria-hidden className="mt-[0.7em] size-1.5 rotate-45 bg-brass" />
              {it}
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <ul className="overflow-hidden rounded-sm border border-border bg-card">
          {block.items.map((it, i) => (
            <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-4 border-b border-dashed border-border px-5 py-4 last:border-b-0">
              {/* printable tick box */}
              <span aria-hidden className="mt-0.5 size-[18px] rounded-[3px] border-[1.5px] border-brass" />
              <span>
                <span className="block font-medium leading-snug">{it.label}</span>
                {it.detail ? <span className="mt-1 block text-[15px] leading-relaxed text-muted-foreground">{it.detail}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <figure className="grid gap-3">
          {/* tables scroll sideways inside their own frame on narrow screens */}
          <div className="overflow-x-auto rounded-sm border border-border bg-card">
            <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px]">
              <thead className="bg-surface-2/60">
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="border-b border-border px-4 py-3 font-mono text-[10.5px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-b border-dashed border-border transition-colors last:border-b-0 hover:bg-brass-soft">
                    {row.map((cell, c) => (
                      <td key={c} className={c === 0 ? "px-4 py-3 align-top font-medium" : "px-4 py-3 align-top text-foreground/85"}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? <figcaption className="font-mono text-[11.5px] leading-relaxed text-muted-foreground">{block.caption}</figcaption> : null}
        </figure>
      );

    case "note":
      return (
        <aside className="relative max-w-[68ch] rounded-sm border border-brass/40 bg-brass-soft px-5 py-4">
          <span className="block font-mono text-[10.5px] tracking-[0.14em] text-brass-ink uppercase">Note</span>
          <p className="mt-1.5 text-[15.5px] leading-relaxed">{block.text}</p>
        </aside>
      );
  }
}
