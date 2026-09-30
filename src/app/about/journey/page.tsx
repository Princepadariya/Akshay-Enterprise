import { PageHero } from "@/components/sections/page-hero";
import { Timeline } from "@/components/sections/timeline";
import { CtaBand } from "@/components/sections/cta-band";
import { timeline } from "@/content/timeline";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Journey",
  description: "Milestones in the growth of Akshay Enterprise, from the first cam automats to multi-metal export supply.",
  path: "/about/journey",
});

export default function JourneyPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About", href: "/about" },
          { name: "Journey", href: "/about/journey" },
        ]}
        title="Our journey"
        lead="The milestones that took the shop from local electrical parts to export supply across materials."
      />
      <section className="container-x py-16 md:py-28">
        <Timeline items={timeline} />
      </section>
      <CtaBand title="Have a new part in development?" body="Send the drawing and we will review it for manufacturability and cost." />
    </>
  );
}
