import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Photo } from "@/components/photo";
import { ScrollScale } from "@/components/motion/scroll-scale";
import { TodoMark } from "@/components/todo-mark";
import { instruments, qualityIntro, toleranceHighlights } from "@/content/quality";
import { site } from "@/content/site";

export function QualityHighlight() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Tolerance visual */}
        <ScrollScale className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border sm:aspect-[5/4] lg:aspect-[4/5]">
            <Photo k="caliperPart" className="absolute inset-0" sizes="(min-width: 1024px) 45vw, 100vw" treatment="none" />
            {/* toned copy, faded out by ScrollScale as the image reaches full size */}
            <div data-tone className="absolute inset-0" style={{ opacity: 0, visibility: "hidden" }}>
              <Photo k="caliperPart" className="absolute inset-0" sizes="(min-width: 1024px) 45vw, 100vw" treatment="duotone" />
            </div>
            {/* bottom-only shade so the white figures stay readable on the original photo */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-[1]"
              style={{ height: "55%", background: "linear-gradient(to top, rgb(18 11 10 / 0.8), transparent)" }}
            />
            <div className="absolute inset-x-0 bottom-0 z-[2] p-6 md:p-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-steel-200 uppercase">
                Critical diameter tolerance
                <TodoMark />
              </p>
              <p className="mt-2 font-display-wide text-7xl leading-none font-bold tracking-[-0.04em] text-paper md:text-8xl">
                ±0.01<span className="ml-2 font-mono text-2xl font-normal text-steel-200">mm</span>
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-4">
                {toleranceHighlights.slice(1).map((t) => (
                  <div key={t.label}>
                    <p className="font-mono text-[10.5px] tracking-wider text-steel-300 uppercase">{t.label}</p>
                    <p className="mt-1 font-mono text-sm text-paper">
                      {t.value} <span className="text-steel-300">{t.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollScale>

        <div className="flex flex-col justify-center gap-10 lg:col-span-6">
          <div className="flex flex-col gap-5">
            <h2 className="max-w-[18ch] font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
              {qualityIntro.headline}
            </h2>
            <p className="max-w-[56ch] leading-relaxed text-muted-foreground md:text-lg">{qualityIntro.body}</p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">Inspection room</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {instruments.slice(0, 6).map((ins) => (
                <li key={ins.name} className="flex items-baseline gap-3 text-sm">
                  {ins.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {site.certifications.map((c) => (
              <span key={c.code} className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-sm">
                <BadgeCheck strokeWidth={1.5} className="size-4 text-brass" />
                <span className="font-medium">{c.code}</span>
                <TodoMark show={c.placeholder} className="ml-0" />
              </span>
            ))}
          </div>

          <Link href="/quality" className="inline-flex items-center gap-2 text-sm font-medium text-brass-ink hover:underline">
            How we inspect <ArrowRight strokeWidth={1.5} className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
