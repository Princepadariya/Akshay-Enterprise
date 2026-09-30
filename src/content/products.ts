import type { PhotoKey } from "./images";
import type { IndustrySlug } from "./industries";
import type { FinishKey, MaterialKey } from "./materials";

/**
 * Product catalogue.
 * TODO: confirm with client. Categories and products are typical for a brass / multi-metal
 * precision components maker. Adding, removing or reordering is a data-only change:
 * pages, filters, sitemap, mega-menu and static params are all generated from these arrays.
 * All sizes and tolerances are typical placeholder ranges; confirm with engineering.
 */

export type ThreadType = "Metric" | "BSP" | "NPT" | "UNC / UNF";

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: PhotoKey;
  /** decorative tolerance label shown on hover in the bento */
  spec: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  materials: MaterialKey[];
  sizes: string;
  threads: ThreadType[];
  finishes: FinishKey[];
  tolerance: string;
  applications: string[];
  industries: IndustrySlug[];
  images: PhotoKey[];
  related?: string[];
};

export const categories: Category[] = [
  {
    slug: "precision-turned-components",
    name: "Precision Turned Components",
    short: "Turned parts",
    description:
      "Bushes, spacers, studs, pins and adaptors turned from bar in brass, stainless, mild steel, aluminium and copper.",
    image: "brassParts",
    spec: "Ø 2 to 65 mm  ±0.02",
  },
  {
    slug: "electrical-switchgear-parts",
    name: "Electrical & Switchgear Parts",
    short: "Electrical parts",
    description: "Terminals, connectors, contact pins and modular switch parts in brass and copper alloys.",
    image: "terminalBlocks",
    spec: "M3 to M10  Sn / Ni / Ag",
  },
  {
    slug: "neutral-links-earth-bars",
    name: "Neutral Links & Earth Bars",
    short: "Neutral links",
    description: "Drilled and tapped links and bars for distribution boards, meter boxes and panels.",
    image: "switchbox",
    spec: "2 to 24 ways",
  },
  {
    slug: "cable-glands-accessories",
    name: "Cable Glands & Accessories",
    short: "Cable glands",
    description: "Single and double compression glands, lock nuts, earth tags, reducers and stopping plugs.",
    image: "brassNuts",
    spec: "M16 to M63  IP rated",
  },
  {
    slug: "fasteners",
    name: "Fasteners: Nuts, Bolts, Screws, Washers",
    short: "Fasteners",
    description: "Standard and special fasteners turned or cold-formed, including non-standard threads and heads.",
    image: "screwsPile",
    spec: "M2 to M20  6g / 6H",
  },
  {
    slug: "inserts-anchors",
    name: "Inserts & Anchors",
    short: "Inserts",
    description: "Moulding, knurled, press-fit and heat-set inserts for plastics, plus brass anchors for masonry.",
    image: "smallParts",
    spec: "M2 to M12  diamond knurl",
  },
  {
    slug: "plumbing-pipe-fittings",
    name: "Plumbing & Pipe Fittings",
    short: "Pipe fittings",
    description: "Compression fittings and PPR / CPVC inserts in standard and DZR brass.",
    image: "castParts",
    spec: '1/4" to 2"  BSP / NPT',
  },
  {
    slug: "gas-fittings",
    name: "Gas Fittings",
    short: "Gas fittings",
    description: "LPG regulator and meter parts, CNG fittings and valve components.",
    image: "gauges",
    spec: "Pressure rated  leak tested",
  },
  {
    slug: "sanitary-bath-fitting-components",
    name: "Sanitary & Bath Fitting Components",
    short: "Sanitary parts",
    description: "Spindles, cartridge parts, aerator housings and connectors for faucets and showers.",
    image: "faucet",
    spec: "Chrome-ready  Ra 0.4",
  },
  {
    slug: "custom-build-to-print",
    name: "Custom / Build-to-Print Components",
    short: "Build-to-print",
    description: "Your drawing, your tolerances. Prototype lots through to repeat production.",
    image: "partsOnDrawing",
    spec: "PDF  DWG  STEP",
  },
];

const T = "±0.02 mm typical, ±0.01 mm on critical diameters"; // TODO: confirm achievable tolerance

export const products: Product[] = [
  // Precision turned components
  {
    slug: "turned-bushes-spacers",
    name: "Turned Bushes & Spacers",
    category: "precision-turned-components",
    summary: "Plain, flanged and stepped bushes and spacers turned to drawing.",
    description:
      "Concentric bores and faces held square to the axis, with chamfers and edge breaks as specified. Supplied loose or bagged by count.",
    materials: ["brass", "stainless-steel", "mild-steel", "aluminium"],
    sizes: "OD 3 to 65 mm, length 2 to 120 mm",
    threads: [],
    finishes: ["natural", "nickel", "zinc", "passivated"],
    tolerance: T,
    applications: ["Bearing locations", "Panel spacing", "Pivot bushes"],
    industries: ["general-engineering", "automotive", "electrical"],
    images: ["brassParts", "smallParts"],
    related: ["threaded-studs-pins", "hex-turned-adaptors"],
  },
  {
    slug: "threaded-studs-pins",
    name: "Threaded Studs & Pins",
    category: "precision-turned-components",
    summary: "Double-end studs, dowel pins, grooved and headed pins.",
    description:
      "Threads rolled or cut to class, with undercut and point geometry controlled for automatic assembly.",
    materials: ["brass", "stainless-steel", "mild-steel"],
    sizes: "M2 to M16, length 5 to 150 mm",
    threads: ["Metric", "UNC / UNF", "BSP"],
    finishes: ["natural", "nickel", "zinc", "passivated"],
    tolerance: T,
    applications: ["Terminal studs", "Locating pins", "Assembly studs"],
    industries: ["electrical", "general-engineering", "automotive"],
    images: ["screwsPile", "boltsSteel"],
    related: ["turned-bushes-spacers", "machine-screws-bolts"],
  },
  {
    slug: "hex-turned-adaptors",
    name: "Hex Turned Adaptors",
    category: "precision-turned-components",
    summary: "Male, female and reducing adaptors turned from hex bar.",
    description:
      "Thread conversions between metric, BSP and NPT, with sealing faces machined for O-rings or bonded seals.",
    materials: ["brass", "dzr-brass", "stainless-steel"],
    sizes: 'M5 to M48, 1/8" to 2"',
    threads: ["Metric", "BSP", "NPT"],
    finishes: ["natural", "nickel", "passivated"],
    tolerance: T,
    applications: ["Instrumentation", "Pneumatics", "Fluid lines"],
    industries: ["general-engineering", "hvac-refrigeration", "gas-lpg"],
    images: ["brassNuts", "brassParts"],
    related: ["compression-fittings", "turned-bushes-spacers"],
  },

  // Electrical
  {
    slug: "terminal-connectors",
    name: "Terminal Connectors",
    category: "electrical-switchgear-parts",
    summary: "Single and multi-way brass terminal blocks and connectors.",
    description:
      "Cross-drilled and tapped bodies with screws supplied loose or pre-assembled. Plating specified by thickness for stable contact resistance.",
    materials: ["brass", "copper"],
    sizes: "Conductor 1.5 to 95 sq mm, M3 to M10 screws",
    threads: ["Metric"],
    finishes: ["natural", "tin", "nickel"],
    tolerance: T,
    applications: ["Distribution boards", "Meter boxes", "Control panels"],
    industries: ["electrical"],
    images: ["terminalBlocks", "brassParts"],
    related: ["neutral-links", "switch-contacts-terminals"],
  },
  {
    slug: "switch-contacts-terminals",
    name: "Modular Switch Contacts & Terminals",
    category: "electrical-switchgear-parts",
    summary: "Contact rivets, terminal bodies and pins for modular wiring devices.",
    description:
      "Small turned and cross-drilled parts produced in high volume, with dimensional checks tuned for automatic assembly lines.",
    materials: ["brass", "copper"],
    sizes: "Ø 2 to 12 mm",
    threads: ["Metric"],
    finishes: ["tin", "nickel", "silver"],
    tolerance: T,
    applications: ["Switches and sockets", "MCB terminals", "Plug tops"],
    industries: ["electrical"],
    images: ["smallParts", "brassParts"],
    related: ["terminal-connectors", "pin-socket-contacts"],
  },
  {
    slug: "pin-socket-contacts",
    name: "Pin & Socket Contacts",
    category: "electrical-switchgear-parts",
    summary: "Solid and split plug pins, socket contacts and crimp pins.",
    description:
      "Pin diameters and lengths controlled to plug standards, with slotting and crimp barrels formed on secondary operations.",
    materials: ["brass", "copper"],
    sizes: "Ø 1 to 8 mm",
    threads: [],
    finishes: ["nickel", "tin", "silver"],
    tolerance: T,
    applications: ["Plugs and sockets", "Industrial connectors", "Chargers"],
    industries: ["electrical", "telecom-electronics"],
    images: ["brassParts", "smallParts"],
    related: ["switch-contacts-terminals"],
  },

  // Neutral links & earth bars
  {
    slug: "neutral-links",
    name: "Neutral Links",
    category: "neutral-links-earth-bars",
    summary: "Drilled and tapped neutral bars with screws, for boards and panels.",
    description:
      "Supplied bare or on insulated mounts. Hole pitch, screw size and way count made to your board layout.",
    materials: ["brass", "copper"],
    sizes: "2 to 24 ways",
    threads: ["Metric"],
    finishes: ["natural", "tin", "nickel"],
    tolerance: T,
    applications: ["Consumer units", "Distribution boards", "Meter enclosures"],
    industries: ["electrical"],
    images: ["switchbox", "terminalBlocks"],
    related: ["earth-bars", "terminal-connectors"],
  },
  {
    slug: "earth-bars",
    name: "Earth Bars & Earthing Terminals",
    category: "neutral-links-earth-bars",
    summary: "Earth bars, earthing blocks and bonding terminals.",
    description: "Heavy-section brass or copper bars for protective earth connections, with clamp screws to suit conductor range.",
    materials: ["brass", "copper"],
    sizes: "2 to 20 ways, conductor up to 50 sq mm",
    threads: ["Metric"],
    finishes: ["natural", "tin"],
    tolerance: T,
    applications: ["Earthing systems", "Panels", "Lightning protection"],
    industries: ["electrical"],
    images: ["terminalBlocks", "switchbox"],
    related: ["neutral-links"],
  },

  // Cable glands
  {
    slug: "cable-glands",
    name: "Cable Glands",
    category: "cable-glands-accessories",
    summary: "Single and double compression glands for armoured and unarmoured cable.",
    description:
      "Gland bodies, domes and cones machined for consistent seal compression. Supplied with seals, lock nuts and earth tags as kits.",
    materials: ["brass", "stainless-steel"],
    sizes: "M16 to M63, PG and NPT on request",
    threads: ["Metric", "NPT"],
    finishes: ["natural", "nickel", "passivated"],
    tolerance: T,
    applications: ["Industrial enclosures", "Panels", "Outdoor installations"],
    industries: ["electrical", "general-engineering"],
    images: ["brassNuts", "brassParts"],
    related: ["gland-lock-nuts-earth-tags", "gland-reducers-plugs"],
  },
  {
    slug: "gland-lock-nuts-earth-tags",
    name: "Lock Nuts & Earth Tags",
    category: "cable-glands-accessories",
    summary: "Hex and serrated lock nuts, earth tags and sealing washers.",
    description: "Accessories matched to our gland threads so kits assemble without rework on site.",
    materials: ["brass", "stainless-steel"],
    sizes: "M16 to M63",
    threads: ["Metric"],
    finishes: ["natural", "nickel"],
    tolerance: T,
    applications: ["Gland termination", "Earth continuity"],
    industries: ["electrical"],
    images: ["brassNuts", "screwsPile"],
    related: ["cable-glands"],
  },
  {
    slug: "gland-reducers-plugs",
    name: "Reducers, Adaptors & Stopping Plugs",
    category: "cable-glands-accessories",
    summary: "Thread reducers, enlargers and blanking plugs for entries.",
    description: "Convert or close enclosure entries while keeping ingress protection intact.",
    materials: ["brass", "stainless-steel"],
    sizes: "M16 to M63",
    threads: ["Metric", "NPT"],
    finishes: ["natural", "nickel"],
    tolerance: T,
    applications: ["Enclosure entries", "Retrofit installations"],
    industries: ["electrical"],
    images: ["brassParts", "brassNuts"],
    related: ["cable-glands"],
  },

  // Fasteners
  {
    slug: "hex-special-nuts",
    name: "Hex & Special Nuts",
    category: "fasteners",
    summary: "Hex, dome, flange, knurled and thumb nuts.",
    description: "Standard forms plus non-standard heights, across-flats and thread pitches made from bar.",
    materials: ["brass", "stainless-steel", "mild-steel"],
    sizes: "M2 to M20",
    threads: ["Metric", "UNC / UNF", "BSP"],
    finishes: ["natural", "nickel", "zinc", "passivated"],
    tolerance: T,
    applications: ["Terminal fixing", "Assemblies", "Panel hardware"],
    industries: ["general-engineering", "electrical", "automotive"],
    images: ["brassNuts", "screwsPile"],
    related: ["machine-screws-bolts", "washers"],
  },
  {
    slug: "machine-screws-bolts",
    name: "Machine Screws & Bolts",
    category: "fasteners",
    summary: "Slotted, Phillips, combination and hex-head screws and bolts.",
    description: "Turned or headed, with thread rolling for strength. Special heads and captive features on request.",
    materials: ["brass", "stainless-steel", "mild-steel"],
    sizes: "M2 to M16, length 3 to 120 mm",
    threads: ["Metric", "UNC / UNF"],
    finishes: ["natural", "nickel", "zinc", "passivated"],
    tolerance: T,
    applications: ["Terminal screws", "Assembly", "Earthing"],
    industries: ["electrical", "general-engineering"],
    images: ["screwsPile", "boltsSteel"],
    related: ["hex-special-nuts", "threaded-studs-pins"],
  },
  {
    slug: "washers",
    name: "Washers",
    category: "fasteners",
    summary: "Plain, spring, serrated and special-profile washers.",
    description: "Turned washers for tight thickness tolerance and pressed washers for volume.",
    materials: ["brass", "stainless-steel", "copper"],
    sizes: "M2 to M24",
    threads: [],
    finishes: ["natural", "nickel", "tin"],
    tolerance: T,
    applications: ["Load spreading", "Sealing", "Earth contact"],
    industries: ["electrical", "general-engineering"],
    images: ["smallParts", "screwsPile"],
    related: ["hex-special-nuts"],
  },

  // Inserts & anchors
  {
    slug: "moulding-inserts",
    name: "Moulding Inserts",
    category: "inserts-anchors",
    summary: "Knurled brass inserts for moulding into thermoplastics and thermosets.",
    description:
      "Diamond, straight or helical knurls with undercuts for pull-out and torque resistance. Blind or through threads.",
    materials: ["brass"],
    sizes: "M2 to M12",
    threads: ["Metric", "UNC / UNF"],
    finishes: ["natural", "nickel"],
    tolerance: T,
    applications: ["Plastic housings", "Electrical accessories", "Appliance parts"],
    industries: ["electrical", "telecom-electronics", "automotive"],
    images: ["smallParts", "brassParts"],
    related: ["heat-set-press-fit-inserts", "brass-anchors"],
  },
  {
    slug: "heat-set-press-fit-inserts",
    name: "Heat-set & Press-fit Inserts",
    category: "inserts-anchors",
    summary: "Inserts for post-moulding installation by heat, ultrasound or press.",
    description: "Lead-in geometry designed for straight installation and consistent retention in printed and moulded parts.",
    materials: ["brass"],
    sizes: "M2 to M8",
    threads: ["Metric", "UNC / UNF"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["Electronics enclosures", "3D-printed parts"],
    industries: ["telecom-electronics", "general-engineering"],
    images: ["brassParts", "smallParts"],
    related: ["moulding-inserts"],
  },
  {
    slug: "brass-anchors",
    name: "Brass Anchors",
    category: "inserts-anchors",
    summary: "Expansion anchors and drop-in anchors for masonry and concrete.",
    description: "Split-body anchors that expand as the screw is driven, for fixtures and fittings.",
    materials: ["brass"],
    sizes: "M5 to M12",
    threads: ["Metric"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["Sanitary fixtures", "Electrical fixtures", "Light fixings"],
    industries: ["plumbing-sanitary", "electrical"],
    images: ["brassNuts", "brassParts"],
    related: ["moulding-inserts"],
  },

  // Plumbing
  {
    slug: "compression-fittings",
    name: "Compression Fittings",
    category: "plumbing-pipe-fittings",
    summary: "Couplers, elbows, tees and adaptors with olive and nut.",
    description: "Bodies, nuts and olives machined to seal on copper, PEX and multilayer pipe.",
    materials: ["brass", "dzr-brass"],
    sizes: "8 to 54 mm pipe",
    threads: ["BSP", "NPT"],
    finishes: ["natural", "nickel", "chrome"],
    tolerance: T,
    applications: ["Water supply", "Heating circuits", "Gas lines"],
    industries: ["plumbing-sanitary", "hvac-refrigeration"],
    images: ["castParts", "brassNuts"],
    related: ["ppr-cpvc-inserts", "hex-turned-adaptors"],
  },
  {
    slug: "ppr-cpvc-inserts",
    name: "PPR / CPVC Inserts",
    category: "plumbing-pipe-fittings",
    summary: "Threaded brass inserts for moulding into PPR and CPVC fittings.",
    description: "Knurl and groove profiles designed to anchor in the plastic and resist torque during installation.",
    materials: ["brass", "dzr-brass"],
    sizes: '1/2" to 2"',
    threads: ["BSP", "NPT"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["PPR fittings", "CPVC fittings", "Transition fittings"],
    industries: ["plumbing-sanitary"],
    images: ["brassNuts", "brassParts"],
    related: ["compression-fittings", "moulding-inserts"],
  },

  // Gas
  {
    slug: "lpg-regulator-parts",
    name: "LPG Regulator Components",
    category: "gas-fittings",
    summary: "Regulator bodies, nozzles, inlet adaptors and valve seats.",
    description: "Machined to drawing with clean bores and controlled seat geometry for consistent regulation.",
    materials: ["brass"],
    sizes: "To drawing",
    threads: ["BSP", "Metric"],
    finishes: ["natural", "nickel"],
    tolerance: T,
    applications: ["Domestic regulators", "Commercial regulators"],
    industries: ["gas-lpg"],
    images: ["gauges", "brassParts"],
    related: ["gas-meter-parts", "cng-fittings"],
  },
  {
    slug: "gas-meter-parts",
    name: "Gas Meter Unions & Parts",
    category: "gas-fittings",
    summary: "Meter unions, connectors and nuts for domestic and commercial meters.",
    description: "Thread and seal faces controlled for leak-tight meter connections.",
    materials: ["brass"],
    sizes: '3/4" to 1 1/4"',
    threads: ["BSP"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["Gas meters", "Service lines"],
    industries: ["gas-lpg"],
    images: ["brassNuts", "gauges"],
    related: ["lpg-regulator-parts"],
  },
  {
    slug: "cng-fittings",
    name: "CNG Fittings",
    category: "gas-fittings",
    summary: "High-pressure adaptors, fillers and unions for CNG systems.",
    description: "Made to drawing in brass or stainless steel, with pressure-rated thread forms.",
    materials: ["brass", "stainless-steel"],
    sizes: "To drawing",
    threads: ["Metric", "NPT"],
    finishes: ["natural", "nickel", "passivated"],
    tolerance: T,
    applications: ["Vehicle CNG kits", "Filling stations"],
    industries: ["gas-lpg", "automotive"],
    images: ["gauges", "brassParts"],
    related: ["lpg-regulator-parts"],
  },

  // Sanitary
  {
    slug: "spindles-cartridge-parts",
    name: "Spindles & Cartridge Parts",
    category: "sanitary-bath-fitting-components",
    summary: "Spindles, headwork and cartridge components for faucets and valves.",
    description: "Splines, threads and O-ring grooves held to fit for smooth, drip-free operation.",
    materials: ["brass", "dzr-brass"],
    sizes: "To drawing",
    threads: ["Metric", "BSP"],
    finishes: ["natural", "chrome"],
    tolerance: T,
    applications: ["Faucets", "Concealed valves", "Diverters"],
    industries: ["plumbing-sanitary"],
    images: ["faucet", "brassParts"],
    related: ["aerator-housings-adaptors"],
  },
  {
    slug: "aerator-housings-adaptors",
    name: "Aerator Housings & Adaptors",
    category: "sanitary-bath-fitting-components",
    summary: "Aerator housings, shower connectors and wall flanges.",
    description: "Visible parts machined for a chrome-ready surface with no tool marks on cosmetic faces.",
    materials: ["brass"],
    sizes: "M16 to M28, 1/2\" to 3/4\"",
    threads: ["Metric", "BSP"],
    finishes: ["chrome", "nickel"],
    tolerance: T,
    applications: ["Faucets", "Showers", "Bath fittings"],
    industries: ["plumbing-sanitary"],
    images: ["faucet", "castParts"],
    related: ["spindles-cartridge-parts"],
  },

  // Custom
  {
    slug: "build-to-print-parts",
    name: "Build-to-Print Turned Parts",
    category: "custom-build-to-print",
    summary: "Any turned, drilled, threaded or knurled part made from your drawing.",
    description:
      "We review the drawing, flag anything that drives cost, agree critical dimensions and deliver a first-off with an inspection report before volume.",
    materials: ["brass", "dzr-brass", "stainless-steel", "mild-steel", "aluminium", "copper"],
    sizes: "Ø 2 to 65 mm from bar",
    threads: ["Metric", "BSP", "NPT", "UNC / UNF"],
    finishes: ["natural", "nickel", "tin", "chrome", "silver", "zinc", "passivated", "anodised"],
    tolerance: T,
    applications: ["OEM assemblies", "Import substitution", "Second-source supply"],
    industries: ["general-engineering", "automotive", "electrical", "plumbing-sanitary"],
    images: ["partsOnDrawing", "rulerParts"],
    related: ["prototype-short-run", "turned-bushes-spacers"],
  },
  {
    slug: "prototype-short-run",
    name: "Prototype & Short-Run Components",
    category: "custom-build-to-print",
    summary: "Development lots for validation before production tooling is committed.",
    description: "Small lots on CNC to prove fit and function, then transferred to the most economical process for volume.",
    materials: ["brass", "stainless-steel", "mild-steel", "aluminium", "copper"],
    sizes: "To drawing",
    threads: ["Metric", "BSP", "NPT", "UNC / UNF"],
    finishes: ["natural", "nickel", "tin", "zinc", "passivated", "anodised"],
    tolerance: T,
    applications: ["New product development", "Validation builds"],
    industries: ["general-engineering", "telecom-electronics", "automotive"],
    images: ["drawingMeasure", "caliperPart"],
    related: ["build-to-print-parts"],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(category: string, slug: string) {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function productsInCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function productHref(p: Pick<Product, "category" | "slug">) {
  return `/products/${p.category}/${p.slug}`;
}

export function findProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
