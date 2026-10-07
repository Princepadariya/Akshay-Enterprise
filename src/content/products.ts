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
    image: "precisionPins",
    spec: "Ø 2 to 65 mm  ±0.02",
  },
  {
    slug: "electrical-parts",
    name: "Electrical Parts",
    short: "Electrical parts",
    description: "Terminals, connectors, contact pins and modular switch parts in brass and copper alloys.",
    image: "terminalBlocks",
    spec: "M3 to M10  Sn / Ni / Ag",
  },
  {
    slug: "inserts-anchors",
    name: "Inserts & Anchors",
    short: "Inserts",
    description: "Moulding, knurled, press-fit and heat-set inserts for plastics, plus brass anchors for masonry.",
    image: "brassParts",
    spec: "M2 to M12  diamond knurl",
  },
  {
    slug: "plumbing-pipe-fittings",
    name: "Plumbing & Pipe Fittings",
    short: "Pipe fittings",
    description: "Compression fittings and PPR / CPVC inserts in standard and DZR brass.",
    image: "brassFittingsRow",
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
    description: "Your drawing, your tolerances. Prototype lots through to repeat production, including cast and machined parts.",
    image: "partsOnDrawing",
    spec: "PDF  DWG  STEP",
  },
  {
    slug: "brass-rods-sheets-wire",
    name: "Brass Rods, Sheets & Wire",
    short: "Rods & wire",
    description: "Solid and hollow brass rods, brass sheet, and brass and copper wire supplied as stock or cut to length.",
    image: "barStock",
    spec: "Solid  Hollow  Sheet  Wire",
  },
];

/** raw stock is sold to size, not machined, so it carries no machining tolerance */
const STOCK_TOL = "Mill tolerance; cut lengths to order";

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
    images: ["machinedRings", "precisionPins"],
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
    images: ["precisionPins", "boltsSteel"],
    related: ["turned-bushes-spacers"],
  },
  {
    slug: "hex-turned-adaptors",
    name: "Hex Turned Adaptors",
    category: "precision-turned-components",
    summary: "Male, female and reducing adaptors turned from hex bar.",
    description:
      "Thread conversions between metric, BSP and NPT, with sealing faces machined for O-rings or bonded seals.",
    materials: ["brass", "stainless-steel"],
    sizes: 'M5 to M48, 1/8" to 2"',
    threads: ["Metric", "BSP", "NPT"],
    finishes: ["natural", "nickel", "passivated"],
    tolerance: T,
    applications: ["Instrumentation", "Pneumatics", "Fluid lines"],
    industries: ["general-engineering", "hvac-refrigeration", "gas-lpg"],
    images: ["brassNuts", "latheTurning"],
    related: ["compression-fittings", "turned-bushes-spacers"],
  },
  {
    slug: "mild-steel-machined-parts",
    name: "Mild Steel Machined Parts",
    category: "precision-turned-components",
    summary: "Turned and milled MS parts for load-bearing and structural duty.",
    description:
      "Machined from free-cutting and bright mild steel bar, then zinc plated or oiled so parts arrive protected against corrosion.",
    materials: ["mild-steel"],
    sizes: "Ø 3 to 65 mm from bar",
    threads: ["Metric", "BSP", "UNC / UNF"],
    finishes: ["zinc", "natural"],
    tolerance: T,
    applications: ["Machine parts", "Brackets and pins", "Vehicle components"],
    industries: ["general-engineering", "automotive", "agriculture"],
    images: ["boltsSteel", "latheDark"],
    related: ["ms-adaptors", "turned-bushes-spacers"],
  },
  {
    slug: "ms-adaptors",
    name: "MS Adaptors",
    category: "precision-turned-components",
    summary: "Mild steel thread adaptors, reducers and connectors.",
    description: "An economical alternative to brass where strength matters more than corrosion resistance, finished with zinc plating.",
    materials: ["mild-steel"],
    sizes: 'M8 to M48, 1/8" to 2"',
    threads: ["Metric", "BSP", "NPT"],
    finishes: ["zinc", "natural"],
    tolerance: T,
    applications: ["Hydraulic lines", "Machine tooling", "Fluid connections"],
    industries: ["general-engineering", "agriculture"],
    images: ["nutsOnBlack", "latheTurning"],
    related: ["hex-turned-adaptors", "mild-steel-machined-parts"],
  },
  {
    slug: "stainless-steel-turned-parts",
    name: "Stainless Steel Turned Parts",
    category: "precision-turned-components",
    summary: "SS 303, 304 and 316 parts for corrosive, hygienic and outdoor use.",
    description:
      "Fittings and turned components in stainless grades, passivated after machining to restore the protective surface.",
    materials: ["stainless-steel"],
    sizes: "Ø 2 to 50 mm from bar",
    threads: ["Metric", "BSP", "NPT", "UNC / UNF"],
    finishes: ["passivated", "natural"],
    tolerance: T,
    applications: ["Marine and outdoor hardware", "Food and pharma equipment", "Instrumentation"],
    industries: ["general-engineering", "automotive", "hvac-refrigeration"],
    images: ["machinedRings", "micrometerFlange"],
    related: ["hex-turned-adaptors", "turned-bushes-spacers"],
  },
  {
    slug: "copper-machined-parts",
    name: "Copper & Other Metal Parts",
    category: "precision-turned-components",
    summary: "Copper and copper-alloy parts where conductivity or heat transfer matters.",
    description:
      "Turned and drilled from ETP and free-cutting copper bar, with burr-free edges for current-carrying and thermal parts.",
    materials: ["copper"],
    sizes: "Ø 3 to 50 mm from bar",
    threads: ["Metric"],
    finishes: ["natural", "tin", "silver"],
    tolerance: T,
    applications: ["Busbar parts", "Earthing hardware", "Heat-transfer parts"],
    industries: ["electrical", "telecom-electronics", "energy"],
    images: ["copperParts", "copperDrilling"],
    related: ["terminal-connectors"],
  },

  // Electrical
  {
    slug: "terminal-connectors",
    name: "Terminal Connectors",
    category: "electrical-parts",
    summary: "Single and multi-way brass terminal blocks and connectors.",
    description:
      "Cross-drilled and tapped bodies with screws supplied loose or pre-assembled. Plating specified by thickness for stable contact resistance.",
    materials: ["brass", "copper"],
    sizes: "Conductor 1.5 to 95 sq mm, M3 to M10 screws",
    threads: ["Metric"],
    finishes: ["natural", "tin", "nickel"],
    tolerance: T,
    applications: ["Distribution boards", "Meter boxes", "Control panels"],
    industries: ["electrical", "energy"],
    images: ["terminalBlocks", "copperParts"],
    related: ["switch-contacts-terminals"],
  },
  {
    slug: "switch-contacts-terminals",
    name: "Modular Switch Contacts & Terminals",
    category: "electrical-parts",
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
    images: ["copperParts", "copperDrilling"],
    related: ["terminal-connectors", "pin-socket-contacts"],
  },
  {
    slug: "pin-socket-contacts",
    name: "Pin & Socket Contacts",
    category: "electrical-parts",
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
    images: ["copperDrilling", "precisionPins"],
    related: ["switch-contacts-terminals"],
  },

  {
    slug: "line-neutral-earth-plug-pins",
    name: "Line, Neutral & Earth Plug Pins",
    category: "electrical-parts",
    summary: "Matched L, N and E pin sets for 2- and 3-pin plug tops.",
    description:
      "Pin diameter, length and spacing held to the plug standard so each set seats correctly, with the earth pin made longer where required.",
    materials: ["brass"],
    sizes: "5 A, 6 A, 15 A and 16 A patterns",
    threads: ["Metric"],
    finishes: ["natural", "nickel", "tin"],
    tolerance: T,
    applications: ["Plug tops", "Moulded mains leads", "Adaptors"],
    industries: ["electrical"],
    images: ["precisionPins", "switchbox"],
    related: ["pin-socket-contacts", "switch-contacts-terminals"],
  },
  {
    slug: "automotive-contact-pins",
    name: "Automotive Contact Pins",
    category: "electrical-parts",
    summary: "Turned contact pins for vehicle connectors, sensors and switches.",
    description: "Small-diameter pins with controlled tip geometry and plating thickness for low contact resistance under vibration.",
    materials: ["brass", "copper"],
    sizes: "Ø 0.8 to 6 mm",
    threads: [],
    finishes: ["tin", "nickel", "silver"],
    tolerance: T,
    applications: ["Wiring connectors", "Sensors", "Switch assemblies"],
    industries: ["automotive", "electrical"],
    images: ["precisionPins", "engine"],
    related: ["pin-socket-contacts"],
  },
  {
    slug: "single-pole-camlock-connectors",
    name: "Single Pole Cam-Lok Connectors",
    category: "electrical-parts",
    summary: "Brass contacts with insulated boots for temporary high-current power.",
    description:
      "Machined brass male and female contacts that lock with a quarter turn, fitted in colour-coded rubber or plastic boots for phase identification.",
    materials: ["brass"],
    sizes: "Up to 400 A ratings",
    threads: [],
    finishes: ["natural", "nickel", "tin"],
    tolerance: T,
    applications: ["Temporary power", "Generators", "Events and stage power"],
    industries: ["electrical", "energy"],
    images: ["switchbox", "copperParts"],
    related: ["pin-socket-contacts", "terminal-connectors"],
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
    images: ["brassParts", "millingChips"],
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
    images: ["brassParts", "latheTurning"],
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
    images: ["brassParts", "brassNuts"],
    related: ["moulding-inserts"],
  },

  // Plumbing
  {
    slug: "compression-fittings",
    name: "Compression Fittings",
    category: "plumbing-pipe-fittings",
    summary: "Couplers, elbows, tees and adaptors with olive and nut.",
    description: "Bodies, nuts and olives machined to seal on copper, PEX and multilayer pipe.",
    materials: ["brass"],
    sizes: "8 to 54 mm pipe",
    threads: ["BSP", "NPT"],
    finishes: ["natural", "nickel", "chrome"],
    tolerance: T,
    applications: ["Water supply", "Heating circuits", "Gas lines"],
    industries: ["plumbing-sanitary", "hvac-refrigeration"],
    images: ["brassFittingsRow", "brassNuts"],
    related: ["ppr-cpvc-inserts", "hex-turned-adaptors"],
  },
  {
    slug: "ppr-cpvc-inserts",
    name: "PPR / CPVC Inserts",
    category: "plumbing-pipe-fittings",
    summary: "Threaded brass inserts for moulding into PPR and CPVC fittings.",
    description: "Knurl and groove profiles designed to anchor in the plastic and resist torque during installation.",
    materials: ["brass"],
    sizes: '1/2" to 2"',
    threads: ["BSP", "NPT"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["PPR fittings", "CPVC fittings", "Transition fittings"],
    industries: ["plumbing-sanitary"],
    images: ["brassFittingsRow", "brassParts"],
    related: ["compression-fittings", "moulding-inserts"],
  },

  {
    slug: "threaded-pipe-fittings",
    name: "Threaded Pipe Fittings",
    category: "plumbing-pipe-fittings",
    summary: "Elbows, tees, sockets, nipples, plugs and bushes in brass.",
    description: "Threaded fittings with clean, full-form threads for leak-free joints with tape or sealant.",
    materials: ["brass"],
    sizes: '1/8" to 2"',
    threads: ["BSP", "NPT"],
    finishes: ["natural", "nickel", "chrome"],
    tolerance: T,
    applications: ["Water supply", "Compressed air", "Gas lines"],
    industries: ["plumbing-sanitary", "gas-lpg", "general-engineering"],
    images: ["brassFittingsRow", "brassParts"],
    related: ["forged-brass-fittings", "hose-nipple-fittings"],
  },
  {
    slug: "forged-brass-fittings",
    name: "Forged Brass Fittings",
    category: "plumbing-pipe-fittings",
    summary: "Hot-forged bodies machined to finish for valves and fittings.",
    description: "Forging gives a dense, pressure-tight body; we then machine the threads, bores and seats to drawing.",
    materials: ["brass"],
    sizes: '1/4" to 2"',
    threads: ["BSP", "NPT", "Metric"],
    finishes: ["natural", "nickel", "chrome"],
    tolerance: T,
    applications: ["Valve bodies", "Multi-way connectors", "Gas and water fittings"],
    industries: ["plumbing-sanitary", "gas-lpg"],
    images: ["castParts", "brassFittingsRow"],
    related: ["brass-manifolds", "threaded-pipe-fittings"],
  },
  {
    slug: "brass-manifolds",
    name: "Brass Manifolds",
    category: "plumbing-pipe-fittings",
    summary: "Distribution manifolds for water, heating and gas circuits.",
    description: "Bar or forged bodies with multiple outlets drilled and threaded in one setting so every port lines up.",
    materials: ["brass"],
    sizes: '2 to 12 ways, 1/2" to 1 1/4" body',
    threads: ["BSP", "NPT"],
    finishes: ["natural", "nickel"],
    tolerance: T,
    applications: ["Underfloor heating", "Water distribution", "Gas distribution"],
    industries: ["plumbing-sanitary", "hvac-refrigeration", "gas-lpg"],
    images: ["brassParts", "brassFittingsRow"],
    related: ["forged-brass-fittings", "compression-fittings"],
  },
  {
    slug: "hose-nipple-fittings",
    name: "Hose Nipple Fittings",
    category: "plumbing-pipe-fittings",
    summary: "Barbed hose tails and nipples with threaded or plain ends.",
    description: "Barb profiles turned to grip the hose bore and hold under a clip, with a hex for easy installation.",
    materials: ["brass"],
    sizes: "Hose bore 6 to 32 mm",
    threads: ["BSP", "NPT", "Metric"],
    finishes: ["natural", "nickel"],
    tolerance: T,
    applications: ["Gas hoses", "Garden and irrigation", "Air lines"],
    industries: ["gas-lpg", "agriculture", "plumbing-sanitary"],
    images: ["brassFittingsRow", "brassNuts"],
    related: ["threaded-pipe-fittings"],
  },
  {
    slug: "transition-electrofusion-fittings",
    name: "Transition & Electrofusion Fittings",
    category: "plumbing-pipe-fittings",
    summary: "Brass inserts and terminals for joining PE pipe to metal systems.",
    description:
      "Threaded transition inserts moulded into PE fittings, and the brass terminal pins used in electrofusion couplers.",
    materials: ["brass"],
    sizes: "20 to 110 mm pipe",
    threads: ["BSP", "NPT"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["PE gas networks", "PE water mains", "Metal-to-plastic joints"],
    industries: ["gas-lpg", "plumbing-sanitary"],
    images: ["brassParts", "machinedRings"],
    related: ["ppr-cpvc-inserts", "moulding-inserts"],
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
    images: ["gauges", "latheDark"],
    related: ["gas-meter-parts", "cng-fittings"],
  },
  {
    slug: "gas-meter-parts",
    name: "BS 746 Gas Meter & Regulator Parts",
    category: "gas-fittings",
    summary: "BS 746 meter unions, regulator connectors and nuts for domestic and commercial meters.",
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
    images: ["gauges", "brassFittingsRow"],
    related: ["lpg-regulator-parts"],
  },

  {
    slug: "flare-fittings",
    name: "Flare Fittings",
    category: "gas-fittings",
    summary: "SAE 45° flare nuts, unions, elbows and tees for tube.",
    description: "Flare seats machined smooth and concentric so the tube flare seals metal to metal without a gasket.",
    materials: ["brass"],
    sizes: '1/4" to 3/4" tube',
    threads: ["UNC / UNF"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["Refrigeration lines", "LPG and fuel lines", "Instrument tubing"],
    industries: ["hvac-refrigeration", "gas-lpg", "automotive"],
    images: ["brassNuts", "hvac"],
    related: ["air-brake-fittings", "compression-fittings"],
  },
  {
    slug: "air-brake-fittings",
    name: "Air Brake Fittings",
    category: "gas-fittings",
    summary: "Fittings for air brake lines on trucks, buses and trailers.",
    description: "Compression and push-to-connect fittings for nylon and copper air brake tubing, made to hold pressure under vibration.",
    materials: ["brass"],
    sizes: '1/4" to 5/8" tube',
    threads: ["NPT"],
    finishes: ["natural"],
    tolerance: T,
    applications: ["Truck and trailer air brakes", "Pneumatic lines"],
    industries: ["automotive"],
    images: ["engine", "brassFittingsRow"],
    related: ["flare-fittings"],
  },

  // Sanitary
  {
    slug: "spindles-cartridge-parts",
    name: "Spindles & Cartridge Parts",
    category: "sanitary-bath-fitting-components",
    summary: "Spindles, headwork and cartridge components for faucets and valves.",
    description: "Splines, threads and O-ring grooves held to fit for smooth, drip-free operation.",
    materials: ["brass"],
    sizes: "To drawing",
    threads: ["Metric", "BSP"],
    finishes: ["natural", "chrome"],
    tolerance: T,
    applications: ["Faucets", "Concealed valves", "Diverters"],
    industries: ["plumbing-sanitary"],
    images: ["faucet", "latheTurning"],
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
    images: ["faucet", "brassFittingsRow"],
    related: ["spindles-cartridge-parts", "piping-sanitary-fittings"],
  },
  {
    slug: "piping-sanitary-fittings",
    name: "Piping & Sanitary Fittings",
    category: "sanitary-bath-fitting-components",
    summary: "Connectors, nipples, extensions and elbows for bathroom and kitchen piping.",
    description:
      "The concealed and visible fittings that link taps, mixers and showers to the supply: threads cut clean for leak-free joints, with cosmetic faces finished ready for chrome.",
    materials: ["brass"],
    sizes: '1/2" to 1"',
    threads: ["BSP"],
    finishes: ["natural", "chrome", "nickel"],
    tolerance: T,
    applications: ["Tap and mixer connections", "Shower piping", "Wall and concealed fittings"],
    industries: ["plumbing-sanitary"],
    images: ["faucet", "brassParts"],
    related: ["aerator-housings-adaptors", "threaded-pipe-fittings"],
  },

  // Custom
  {
    slug: "build-to-print-parts",
    name: "Build-to-Print Turned Parts",
    category: "custom-build-to-print",
    summary: "Any turned, drilled, threaded or knurled part made from your drawing.",
    description:
      "We review the drawing, flag anything that drives cost, agree critical dimensions and deliver a first-off with an inspection report before volume.",
    materials: ["brass", "stainless-steel", "mild-steel", "aluminium", "copper"],
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
    images: ["micrometerFlange", "caliperPart"],
    related: ["build-to-print-parts"],
  },
  {
    slug: "aluminium-machined-components",
    name: "Aluminium Machined Components",
    category: "custom-build-to-print",
    summary: "Light, machinable parts where weight matters.",
    description: "Turned and milled from aluminium bar, with anodising for wear and corrosion resistance.",
    materials: ["aluminium"],
    sizes: "Ø 3 to 65 mm from bar",
    threads: ["Metric", "UNC / UNF"],
    finishes: ["anodised", "natural"],
    tolerance: T,
    applications: ["Housings and covers", "Spacers and knobs", "Electronic enclosures"],
    industries: ["automotive", "telecom-electronics", "general-engineering"],
    images: ["millCutting", "machiningClose"],
    related: ["die-cast-parts", "build-to-print-parts"],
  },
  {
    slug: "die-cast-parts",
    name: "Die-Cast Parts",
    category: "custom-build-to-print",
    summary: "Pressure die-cast aluminium parts, machined to finish.",
    description: "Near-net castings for complex shapes in volume, with critical bores, faces and threads machined after casting.",
    materials: ["aluminium"],
    sizes: "To drawing",
    threads: ["Metric"],
    finishes: ["natural", "anodised"],
    tolerance: T,
    applications: ["Housings", "Brackets", "Covers"],
    industries: ["automotive", "electrical", "general-engineering"],
    images: ["castParts", "millCutting"],
    related: ["investment-cast-parts", "aluminium-machined-components"],
  },
  {
    slug: "investment-cast-parts",
    name: "Investment Casting Parts",
    category: "custom-build-to-print",
    summary: "Lost-wax castings for detailed shapes, machined where it counts.",
    description: "Fine detail and good surface finish straight from the mould, so less material is removed afterwards.",
    materials: ["stainless-steel", "brass", "aluminium"],
    sizes: "To drawing",
    threads: ["Metric", "BSP"],
    finishes: ["natural", "passivated"],
    tolerance: T,
    applications: ["Valve and pump parts", "Hardware", "Machine components"],
    industries: ["general-engineering", "plumbing-sanitary"],
    images: ["castParts", "caliperPart"],
    related: ["die-cast-parts", "build-to-print-parts"],
  },

  // Rods, sheets & wire (raw stock)
  {
    slug: "brass-solid-rods",
    name: "Brass Solid Rods",
    category: "brass-rods-sheets-wire",
    summary: "Round, hex and square brass bar for machining.",
    description: "Free-cutting brass bar for automatic lathes, supplied in standard lengths or cut to size.",
    materials: ["brass"],
    sizes: "Round, hex and square sections to order",
    threads: [],
    finishes: ["natural"],
    tolerance: STOCK_TOL,
    applications: ["Turned parts", "Forging stock", "Fabrication"],
    industries: ["general-engineering", "electrical", "plumbing-sanitary"],
    images: ["barStock", "brassMachining"],
    related: ["brass-hollow-rods", "brass-wire"],
  },
  {
    slug: "brass-hollow-rods",
    name: "Brass Hollow Rods",
    category: "brass-rods-sheets-wire",
    summary: "Hollow brass bar that saves drilling on bushes and fittings.",
    description: "Starting with the bore already formed cuts cycle time and material waste on hollow parts.",
    materials: ["brass"],
    sizes: "OD and bore to order",
    threads: [],
    finishes: ["natural"],
    tolerance: STOCK_TOL,
    applications: ["Bushes", "Pipe fittings", "Nozzles"],
    industries: ["plumbing-sanitary", "general-engineering"],
    images: ["barStock", "machinedRings"],
    related: ["brass-solid-rods"],
  },
  {
    slug: "brass-sheets",
    name: "Brass Sheets",
    category: "brass-rods-sheets-wire",
    summary: "Brass sheet and strip for pressing, stamping and fabrication.",
    description: "Supplied flat in standard sizes or sheared to size for press tools and fabrication.",
    materials: ["brass"],
    sizes: "Thickness and size to order",
    threads: [],
    finishes: ["natural"],
    tolerance: STOCK_TOL,
    applications: ["Pressed contacts", "Nameplates", "Fabrication"],
    industries: ["electrical", "general-engineering"],
    images: ["copperProfiles", "barStock"],
    related: ["brass-wire"],
  },
  {
    slug: "brass-wire",
    name: "Brass Wire",
    category: "brass-rods-sheets-wire",
    summary: "Brass wire in coils for pins, springs and cold heading.",
    description: "Drawn to diameter for pin making, cold heading and forming.",
    materials: ["brass"],
    sizes: "Diameter to order",
    threads: [],
    finishes: ["natural"],
    tolerance: STOCK_TOL,
    applications: ["Pins and rivets", "Springs", "Cold-headed parts"],
    industries: ["electrical", "general-engineering"],
    images: ["copperProfiles", "precisionPins"],
    related: ["copper-wire", "brass-solid-rods"],
  },
  {
    slug: "copper-wire",
    name: "Copper Wire",
    category: "brass-rods-sheets-wire",
    summary: "Bare copper wire for earthing, windings and conductors.",
    description: "High-conductivity copper drawn to diameter and supplied in coils.",
    materials: ["copper"],
    sizes: "Diameter to order",
    threads: [],
    finishes: ["natural", "tin"],
    tolerance: STOCK_TOL,
    applications: ["Earthing", "Conductors", "Braids and jumpers"],
    industries: ["electrical", "telecom-electronics"],
    images: ["copperProfiles", "copperParts"],
    related: ["brass-wire"],
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

/**
 * Material ranges: the top level of /products. Each groups every product line made in that
 * material, sub-grouped by category. Slugs share the /products/[slug] route with categories,
 * so they must never collide with a category slug.
 */
export type MaterialRange = {
  slug: string;
  name: string;
  materials: MaterialKey[];
  image: PhotoKey;
};

export const materialRanges: MaterialRange[] = [
  { slug: "brass-parts", name: "Brass Parts", materials: ["brass"], image: "brassParts" },
  { slug: "aluminium-parts", name: "Aluminium Parts", materials: ["aluminium"], image: "castParts" },
  { slug: "mild-steel-parts", name: "Mild Steel Parts", materials: ["mild-steel"], image: "barStock" },
  { slug: "stainless-steel-parts", name: "Stainless Steel Parts", materials: ["stainless-steel"], image: "boltsSteel" },
  { slug: "copper-and-other-metal-parts", name: "Copper & Other Metal Parts", materials: ["copper"], image: "copperProfiles" },
];

export function getMaterialRange(slug: string) {
  return materialRanges.find((m) => m.slug === slug);
}

/** products in a material range, grouped by category in catalogue order; empty categories are left out */
export function materialRangeGroups(range: MaterialRange) {
  return categories
    .map((c) => ({ key: c.slug, label: c.name, items: products.filter((p) => p.category === c.slug && p.materials.some((m) => range.materials.includes(m))) }))
    .filter((g) => g.items.length > 0);
}

export function findProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
