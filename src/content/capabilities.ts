import type { PhotoKey } from "./images";

/**
 * Manufacturing capabilities, process flow and custom-development workflow.
 * TODO: size ranges and tolerances are typical PLACEHOLDERS; confirm against the machine register.
 */

export type Capability = {
  slug: string;
  name: string;
  body: string;
  spec: string;
  icon: string;
  image?: PhotoKey;
};

export const capabilities: Capability[] = [
  {
    slug: "cnc-turning",
    name: "CNC turning",
    body: "Turning centres for tight tolerances, complex profiles and fast changeovers between part numbers.",
    spec: "Ø 6 to 65 mm  ±0.01",
    icon: "Disc3",
    image: "lathe",
  },
  {
    slug: "cam-auto",
    name: "Traub / cam auto machining",
    body: "Cam-driven automats for high-volume brass parts at the lowest cost per piece.",
    spec: "Ø 3 to 42 mm  high volume",
    icon: "Cog",
    image: "latheTurret",
  },
  {
    slug: "vmc",
    name: "VMC machining",
    body: "Vertical machining centres for flats, pockets, cross holes and milled features.",
    spec: "600 x 400 x 400 mm",
    icon: "Box",
    image: "millCutting",
  },
  {
    slug: "threading",
    name: "Threading",
    body: "Thread cutting, tapping and rolling in metric, BSP, NPT and unified forms, gauged to class.",
    spec: "M2 to M48  6g / 6H",
    icon: "Spline",
  },
  {
    slug: "knurling",
    name: "Knurling",
    body: "Straight, diamond and helical knurls for inserts, thumb nuts and grip surfaces.",
    spec: "0.5 to 1.2 mm pitch",
    icon: "Grid3x3",
  },
  {
    slug: "drilling",
    name: "Drilling & cross-drilling",
    body: "Axial and cross holes, counterbores and tapped holes on dedicated secondary machines.",
    spec: "Ø 0.8 mm upward",
    icon: "Drill",
  },
  {
    slug: "secondary",
    name: "Secondary operations",
    body: "Slotting, grinding, deburring, tumbling and assembly of multi-part components.",
    spec: "In-house",
    icon: "Wrench",
  },
  {
    slug: "finishing",
    name: "Plating & finishing coordination",
    body: "Nickel, tin, chrome, silver, zinc, passivation and anodising through qualified partners, inspected on return.",
    spec: "Thickness verified",
    icon: "Sparkles",
  },
];

/** Capability table on /capabilities. TODO: confirm every row. */
export const capabilityTable = [
  { process: "CNC turning", size: "Ø 6 to 65 mm", tolerance: "±0.01 mm", materials: "All" },
  { process: "Sliding-head turning", size: "Ø 2 to 20 mm", tolerance: "±0.01 mm", materials: "Brass, SS, Cu" },
  { process: "Cam automat turning", size: "Ø 3 to 42 mm", tolerance: "±0.03 mm", materials: "Brass, MS, Al" },
  { process: "VMC milling", size: "600 x 400 x 400 mm", tolerance: "±0.02 mm", materials: "All" },
  { process: "Thread rolling", size: "M2 to M16", tolerance: "Class 6g", materials: "Brass, MS, SS" },
  { process: "Cross-drilling / tapping", size: "Ø 0.8 mm up, to M12", tolerance: "±0.05 mm position", materials: "All" },
];

export const processSteps = [
  { title: "Drawing / sample", body: "Receive drawing, 3D model or physical sample with quantity and target price.", spec: "PDF  DWG  STEP" },
  { title: "Engineering review", body: "Check tolerances, threads and material; flag cost drivers; propose process.", spec: "DFM notes" },
  { title: "Raw material", body: "Bar stock procured to grade with mill certificate, checked on receipt.", spec: "CW614N  SS303" },
  { title: "Machining", body: "Turning, milling and secondary operations on the process chosen for volume.", spec: "CNC  cam auto" },
  { title: "In-process inspection", body: "First-off approval, then patrol checks at a fixed frequency on every machine.", spec: "FPA  patrol" },
  { title: "Finishing", body: "Deburring, cleaning and plating as specified, with thickness checked on return.", spec: "Ni  Sn  Cr" },
  { title: "Final inspection", body: "Sampling plan against drawing, thread gauging and visual checks before release.", spec: "AQL sampling" },
  { title: "Packing & dispatch", body: "Counted, labelled and packed for the route, with export documents prepared.", spec: "FOB  CIF" },
];

export const developmentWorkflow = [
  { title: "Share your drawing or sample", image: "drawingMeasure" as PhotoKey, body: "Upload files through the RFQ form or send a physical sample to the factory." },
  { title: "Feasibility and quotation", image: "partsOnDrawing" as PhotoKey, body: "Engineering review with a clear quote, notes on tolerances and suggested alternatives." },
  { title: "First-off samples", image: "caliperPart" as PhotoKey, body: "Samples produced on the intended process, supplied with a dimensional report." },
  { title: "Approval and PPAP-style documentation", image: "inspector" as PhotoKey, body: "You approve the sample; we freeze the process and inspection plan." },
  { title: "Volume production", image: "factoryLine" as PhotoKey, body: "Scheduled against your call-offs with dispatch dates confirmed per order." },
];

export const packagingPoints = [
  { title: "Part-wise packing", body: "Poly bags or boxes by count, labelled with part number, lot and quantity." },
  { title: "Moisture and tarnish protection", body: "VCI bags and desiccant for sea freight and plated parts." },
  { title: "Palletisation", body: "Heat-treated wooden pallets or cartons strapped and wrapped for export." },
  { title: "Export documents", body: "Commercial invoice, packing list, certificate of origin and inspection reports." },
];
