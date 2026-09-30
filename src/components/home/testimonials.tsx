"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";

/** TODO: testimonials are placeholders until approved quotes are supplied (see CONTENT-TODO.md). */
export function Testimonials() {
  // Only approved quotes are shown. The section stays hidden until at least one real testimonial exists.
  const quotes = site.testimonials.filter((t) => !t.placeholder);
  if (quotes.length === 0) return null;
  return (
    <section aria-label="Client testimonials" className="border-t border-border bg-surface py-20 md:py-28">
      <div className="container-x">
        <Carousel opts={{ loop: true, align: "start" }} className="relative">
          <CarouselContent>
            {quotes.map((t, i) => (
              <CarouselItem key={i}>
                <figure className="grid gap-10 md:grid-cols-12">
                  <span aria-hidden className="font-display-wide text-8xl leading-none text-brass md:col-span-2 md:text-9xl">
                    “
                  </span>
                  <div className="md:col-span-10">
                    <blockquote className="max-w-[34ch] font-display text-2xl leading-[1.25] font-medium tracking-[-0.02em] md:text-4xl">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <span className="metal-brass h-px w-10" />
                      <span className="text-sm">
                        <span className="font-medium">{t.role}</span>
                        <span className="text-muted-foreground">, {t.company}</span>
                        <TodoMark show={t.placeholder} />
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex gap-2 md:absolute md:right-0 md:bottom-0 md:mt-0">
            <CarouselPrevious className="static translate-y-0 rounded-sm" />
            <CarouselNext className="static translate-y-0 rounded-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
