import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { TodoMark } from "@/components/todo-mark";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/faq";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "MOQ, lead times, sample development, drawing formats, payment terms, export shipping and plating options for precision turned components.",
  path: "/faq",
});

export default function FaqPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.group)));
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", href: "/faq" }]}
        title="Frequently asked questions"
        lead="If yours is not here, ask us directly. We answer the same working day."
      />
      <section className="container-x grid gap-14 py-14 md:py-20">
        {groups.map((g) => (
          <div key={g} className="grid gap-6 lg:grid-cols-12">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-brass-ink uppercase lg:col-span-3 lg:pt-5">{g}</h2>
            <Accordion type="multiple" className="lg:col-span-9">
              {faqs
                .filter((f) => f.group === g)
                .map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="border-border">
                    <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold tracking-tight hover:no-underline md:text-xl">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[68ch] pb-6 text-base leading-relaxed text-muted-foreground">
                      {f.a}
                      <TodoMark show={f.placeholder} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        ))}
      </section>
      <CtaBand title="Still have a question?" body="Send it with your drawing and we will answer both." secondary={{ label: "Contact", href: "/contact" }} />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
