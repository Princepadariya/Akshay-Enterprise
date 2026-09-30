import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { gallery } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photographs of the Akshay Enterprise factory, machines, precision brass components and inspection.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", href: "/gallery" }]}
        title="Gallery"
        lead="Factory, machines, finished parts and the inspection room."
      />
      <section className="container-x py-14 md:py-20">
        <GalleryGrid items={gallery} />
      </section>
    </>
  );
}
