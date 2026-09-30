import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroVisual } from "@/components/three/hero-visual";

const enter = "animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-fill-mode:both] ease-[cubic-bezier(0.16,1,0.3,1)]";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="grid-lines mask-fade-b absolute inset-0 -z-10 opacity-70" />
      <div className="container-x grid min-h-[100dvh] items-center gap-12 pt-24 pb-16 md:grid-cols-12 md:gap-8 md:pt-28">
        <div className="flex flex-col gap-7 md:col-span-6">
          <p className={`${enter} font-mono text-[11px] font-medium tracking-[0.18em] text-brass-ink uppercase`}>
            Akshay Enterprise, Gujarat, India
          </p>
          <h1 className={`${enter} delay-75 font-display text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl md:text-5xl lg:text-[3.6rem] xl:text-[4.25rem]`}>
            <span className="relative inline-block pb-1 whitespace-nowrap">
              Precision turned
              {/* measured dimension under the words it describes */}
              <span aria-hidden className="absolute right-0 -bottom-2 left-0 flex items-center gap-2 text-brass">
                <span className="h-2.5 w-px bg-current" />
                <span className="animate-draw h-px flex-1 bg-current" />
                <span className="font-mono text-[11px] font-medium tracking-wider text-brass-ink">±0.01</span>
                <span className="animate-draw h-px w-4 bg-current" />
                <span className="h-2.5 w-px bg-current" />
              </span>
            </span>{" "}
            parts, made to <span className="text-brass-ink dark:text-brass">your drawing.</span>
          </h1>
          <p className={`${enter} delay-150 max-w-[44ch] text-lg leading-relaxed text-muted-foreground`}>
            Brass, stainless steel, aluminium and copper components for OEMs in India and abroad, from sample lots to volume
            production.
          </p>
          <div className={`${enter} delay-200 flex flex-wrap gap-3`}>
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/request-quote">
                  Request a Quote
                  <ArrowRight strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-0.5" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
        <div className="md:col-span-6">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
