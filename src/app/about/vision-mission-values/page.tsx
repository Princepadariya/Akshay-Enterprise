import { PageHero } from "@/components/sections/page-hero";
import { SectionHeader } from "@/components/sections/section-header";
import { VmvStatements, VmvValues } from "@/components/sections/vmv-sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vision, Mission & Values",
  description: "The vision, mission and working values behind Akshay Enterprise's precision component manufacturing.",
  path: "/about/vision-mission-values",
});

export default function VmvPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About", href: "/about" },
          { name: "Vision, mission, values", href: "/about/vision-mission-values" },
        ]}
        title="Vision, mission and values"
      />

      <section className="container-x py-16 md:py-28">
        <VmvStatements />
      </section>

      <section className="border-t border-border bg-surface py-16 md:py-28">
        <div className="container-x">
          <SectionHeader title="Our values" lead="How we work on every order, from the first drawing review to dispatch." />
          <div className="mt-12">
            <VmvValues />
          </div>
        </div>
      </section>
    </>
  );
}
