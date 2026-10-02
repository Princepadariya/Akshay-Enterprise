import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { StatsBand } from "@/components/home/stats-band";
import { CategoryBento } from "@/components/home/category-bento";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { ProcessScroll } from "@/components/home/process-scroll";
import { QualityHighlight } from "@/components/home/quality-highlight";
import { TolerancePerspective } from "@/components/home/tolerance-perspective";
import { MaterialRack } from "@/components/home/material-rack";
import { IndustriesAccordion } from "@/components/home/industries-accordion";
import { WhyDeck } from "@/components/home/why-deck";
import { Manifesto } from "@/components/home/manifesto";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Precision Turned Components Manufacturer, India` },
  description:
    "Precision turned and CNC machined components in brass, stainless steel, mild steel, aluminium and copper. Build-to-print manufacturer and brass components exporter from Gujarat, India.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StatsBand />
      <Manifesto />
      <CategoryBento />
      <CapabilitiesSection />
      <ProcessScroll />
      <TolerancePerspective />
      <QualityHighlight />
      <MaterialRack />
      <IndustriesAccordion />
      <WhyDeck />
      <Testimonials />
      <FinalCta />
    </>
  );
}
