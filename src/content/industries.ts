import type { PhotoKey } from "./images";

export type IndustrySlug =
  | "electrical"
  | "plumbing-sanitary"
  | "gas-lpg"
  | "automotive"
  | "hvac-refrigeration"
  | "telecom-electronics"
  | "energy"
  | "agriculture"
  | "general-engineering";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  icon: string;
  summary: string;
  description: string;
  parts: string[];
  priorities: { title: string; body: string }[];
  image: PhotoKey;
};

export const industries: Industry[] = [
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    summary: "Sensor housings, fittings, bushes and contact pins for vehicle and aftermarket supply.",
    description:
      "Automotive buyers need repeatability across long runs. Our quality system is certified to IATF 16949, the automotive quality standard: we fix the process at first-off approval and hold it through every batch.",
    parts: ["Sensor housings", "Brake and fuel fittings", "Bushes", "Contact pins"],
    priorities: [
      { title: "IATF 16949 certified", body: "Automotive quality management system certified by TÜV SÜD." },
      { title: "Run-to-run consistency", body: "Process parameters locked after first-off approval, with inspection reports on request." },
      { title: "Volume capacity", body: "Multi-spindle and CNC capacity balanced for long programmes." },
    ],
    image: "engine",
  },
  {
    slug: "hvac-refrigeration",
    name: "HVAC & refrigeration",
    icon: "Snowflake",
    summary: "Flare nuts, service valve parts and connectors for refrigerant circuits.",
    description:
      "Refrigerant circuits are unforgiving of leaks. Flare angles, sealing seats and thread quality are controlled closely on every lot.",
    parts: ["Flare nuts", "Service valve cores", "Access fittings", "Unions"],
    priorities: [
      { title: "Flare geometry", body: "Cone angles and seats checked against the drawing on every batch." },
      { title: "Cleanliness", body: "Degreased and packed to keep oil and chips out of the circuit." },
      { title: "Brass and copper", body: "Material pairing chosen for brazing and thermal cycling." },
    ],
    image: "hvac",
  },
  {
    slug: "energy",
    name: "Energy",
    icon: "PlugZap",
    summary: "Terminals, busbar connectors and copper contact parts for power distribution and solar installations.",
    description:
      "Power equipment carries high current for decades. Contact faces, thread engagement and plating are controlled so joints stay tight and cool, whether in switchgear, transformers or solar balance-of-system hardware.",
    parts: ["Busbar and terminal connectors", "Cam-Lok power connectors", "Copper contact parts"],
    priorities: [
      { title: "Conductivity", body: "Brass and copper grades chosen for current rating, with tin or silver plating where specified." },
      { title: "Secure joints", body: "Thread form and seating faces checked so connections hold their torque in service." },
      { title: "Outdoor duty", body: "Plating and material options for corrosion resistance in substations and solar fields." },
    ],
    image: "solarRoof",
  },
  {
    slug: "telecom-electronics",
    name: "Telecom & electronics",
    icon: "RadioTower",
    summary: "RF connector parts, standoffs and small precision pins for electronic assemblies.",
    description:
      "Small parts, fine tolerances. Our turning cells handle miniature diameters and the plating these assemblies require.",
    parts: ["RF connector bodies", "Standoffs and spacers", "Contact pins", "Grounding hardware"],
    priorities: [
      { title: "Miniature turning", body: "Small diameters turned and inspected under magnification." },
      { title: "Plating options", body: "Gold-flash, silver or tin coordinated with finishing partners." },
      { title: "Packaging", body: "Anti-tarnish packing for plated contact surfaces." },
    ],
    image: "circuit",
  },
  {
    slug: "electrical",
    name: "Electrical & switchgear",
    icon: "Zap",
    summary: "Terminals, connectors, contact pins and plug pins that carry current reliably.",
    description:
      "Electrical parts fail at the contact face first. We control thread fit, surface finish and plating thickness so terminals clamp firmly and stay low-resistance through thermal cycling.",
    parts: ["Terminal connectors", "Switch contacts", "Pin and socket contacts", "Plug pins"],
    priorities: [
      { title: "Conductivity", body: "Brass and copper grades chosen for current rating, not just price." },
      { title: "Plating control", body: "Tin, nickel or silver plating specified by thickness and checked on return." },
      { title: "Thread fit", body: "Screw holes gauged so terminal screws seat without stripping." },
    ],
    image: "terminalBlocks",
  },
  {
    slug: "plumbing-sanitary",
    name: "Plumbing & sanitary",
    icon: "Droplets",
    summary: "Compression fittings, pipe inserts and bath fitting components that seal reliably at rated pressure.",
    description:
      "A fitting that weeps is a warranty claim. Sealing faces, thread forms and DZR material options are handled with water service in mind.",
    parts: ["Compression fittings", "PPR / CPVC inserts", "Cartridge parts", "Aerator housings", "Spindles"],
    priorities: [
      { title: "Sealing faces", body: "Seats and cones machined for a leak-free seal at rated pressure." },
      { title: "Water-safe grades", body: "DZR and low-lead brass options where standards demand them." },
      { title: "Cosmetic finish", body: "Chrome-ready surfaces free of tool marks on visible faces." },
    ],
    image: "faucet",
  },
  {
    slug: "gas-lpg",
    name: "Gas & LPG",
    icon: "Flame",
    summary: "Regulator, meter and CNG fitting components built for pressure and safety.",
    description:
      "Gas components sit in safety-critical assemblies. Dimensional consistency and clean internal passages matter as much as the outside diameter.",
    parts: ["Regulator bodies and nozzles", "Meter unions", "CNG adaptors", "Valve spindles"],
    priorities: [
      { title: "Burr-free bores", body: "Internal passages deburred and inspected so nothing restricts flow." },
      { title: "Traceability", body: "Heat and batch numbers carried through to the dispatch label." },
      { title: "Thread standards", body: "BSP, NPT and metric forms gauged to the specified class." },
    ],
    image: "gauges",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    icon: "Tractor",
    summary: "Sprayer nozzles, irrigation fittings and machine hardware for farm equipment.",
    description:
      "Farm equipment runs outdoors and gets little maintenance. Material and finish choices are made for field conditions.",
    parts: ["Sprayer nozzles", "Irrigation couplings", "Grease nipples", "Pins and bushes"],
    priorities: [
      { title: "Durability", body: "Brass and plated steel options for outdoor exposure." },
      { title: "Cost control", body: "Designs reviewed to remove operations that do not add function." },
      { title: "Seasonal supply", body: "Production planned ahead of peak agricultural seasons." },
    ],
    image: "tractor",
  },
  {
    slug: "general-engineering",
    name: "General engineering",
    icon: "Cog",
    summary: "Build-to-print turned and milled parts for machine builders and OEM assemblies.",
    description:
      "If it can be turned, drilled, threaded or knurled from bar, we can quote it. Most of our general engineering work arrives as a drawing.",
    parts: ["Shafts and spindles", "Bushes and spacers", "Adaptors", "Threaded studs and pins"],
    priorities: [
      { title: "Build-to-print", body: "We work from your drawing and your tolerances, not a catalogue." },
      { title: "Low to high volume", body: "From prototype lots to repeat production schedules." },
      { title: "Secondary operations", body: "Cross-drilling, milling and knurling handled in-house." },
    ],
    image: "gears",
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function industryName(slug: IndustrySlug) {
  return industries.find((i) => i.slug === slug)?.name ?? slug;
}
