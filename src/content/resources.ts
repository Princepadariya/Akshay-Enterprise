/**
 * Technical resources: buyer and engineer guides.
 * Content is general, published engineering practice (standards, alloy designations, thread forms).
 * It makes no claims about Akshay Enterprise's own capability, figures or customers; company-specific
 * facts live in the other content files and carry placeholder flags until confirmed.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; items: { label: string; detail?: string }[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export type Section = { id: string; heading: string; blocks: Block[] };

export type Guide = {
  slug: string;
  kind: "guide" | "checklist" | "glossary";
  title: string;
  /** shorter title for cards, menus and breadcrumbs */
  short: string;
  summary: string;
  readMinutes: number;
  topic: string;
  sections: Section[];
  /** glossary only */
  terms?: { term: string; definition: string }[];
  related: string[];
  /** in-site links that continue the reader's task */
  links: { label: string; href: string }[];
};

export const guides: Guide[] = [
  /* ------------------------------------------------------------------ checklist */
  {
    slug: "how-to-specify-a-turned-part",
    kind: "checklist",
    title: "How to specify a turned part: the RFQ checklist",
    short: "RFQ checklist",
    summary:
      "Everything a supplier needs to quote a turned component accurately the first time, from the drawing and material grade to threads, finish, quantities and documents.",
    readMinutes: 5,
    topic: "Buying",
    sections: [
      {
        id: "why",
        heading: "Why a complete RFQ matters",
        blocks: [
          {
            type: "p",
            text: "A quote is only as good as the information behind it. Missing details force the supplier to assume, and assumptions show up later as price changes, extra questions or parts that do not match what you needed. A complete request gets a faster, firmer price.",
          },
        ],
      },
      {
        id: "drawing",
        heading: "1. The drawing",
        blocks: [
          {
            type: "checklist",
            items: [
              { label: "2D drawing (PDF) with all dimensions and tolerances", detail: "The 2D drawing is the controlling document. Include the revision level." },
              { label: "3D model (STEP) if you have one", detail: "Useful for programming and checking features, but it does not replace the toleranced 2D drawing." },
              { label: "Critical dimensions clearly marked", detail: "Flag the features that affect fit or function so inspection can focus on them." },
              { label: "General tolerance standard", detail: "For example ISO 2768-m for all dimensions without an individual tolerance." },
            ],
          },
        ],
      },
      {
        id: "material",
        heading: "2. Material",
        blocks: [
          {
            type: "checklist",
            items: [
              { label: "Grade and standard", detail: "For example CW614N to EN 12164, or C36000 to ASTM B16. A designation alone can be ambiguous across standards." },
              { label: "Any restriction on lead content", detail: "Important for drinking-water fittings and for products sold under RoHS or similar rules." },
              { label: "Or describe the function", detail: "If you are unsure of the grade, describe the environment (water, outdoor, electrical, high temperature) and ask for a recommendation." },
            ],
          },
        ],
      },
      {
        id: "features",
        heading: "3. Threads, surfaces and finish",
        blocks: [
          {
            type: "checklist",
            items: [
              { label: "Thread standard, size and class", detail: "For example M8x1.25-6g, G 1/2 (BSPP), R 1/2 (BSPT) or 1/2-14 NPT. See the thread standards guide." },
              { label: "Surface roughness on functional faces", detail: "For example Ra 0.8 µm on a sealing face. Leave other faces to standard machined finish." },
              { label: "Plating or finish, with thickness", detail: "For example nickel 5 to 8 µm. State which surfaces may be left unplated or must be masked." },
              { label: "Edge condition", detail: "Deburred, chamfer sizes, and whether sharp edges are acceptable anywhere." },
            ],
          },
        ],
      },
      {
        id: "commercial",
        heading: "4. Quantities and delivery",
        blocks: [
          {
            type: "checklist",
            items: [
              { label: "Annual volume and batch (call-off) size", detail: "Both matter: annual volume decides the process and tooling, batch size decides set-up cost per part." },
              { label: "Sample quantity, if you need samples first" },
              { label: "Target date for samples and for first production" },
              { label: "Packing and labelling", detail: "Bulk, counted bags, part-number labels, specific cartons or pallets." },
              { label: "Delivery destination and Incoterm", detail: "For example FOB or DAP, and the destination port or address." },
            ],
          },
        ],
      },
      {
        id: "documents",
        heading: "5. Documents you need with the parts",
        blocks: [
          {
            type: "checklist",
            items: [
              { label: "Inspection report", detail: "Dimensional report on critical features, and how many samples per lot." },
              { label: "Material certificate", detail: "Mill test certificate showing the chemical composition of the bar used." },
              { label: "Compliance declarations", detail: "RoHS, REACH or conflict minerals (CMRT) if your customers require them." },
              { label: "First-article or approval documents", detail: "If your industry uses a formal approval process (for example PPAP in automotive), say so at RFQ stage." },
            ],
          },
          {
            type: "note",
            text: "Not everything has to be final. If some details are still open, send what you have and say what is undecided; a good supplier will tell you which choices affect the price most.",
          },
        ],
      },
    ],
    related: ["what-drives-the-cost-of-a-turned-part", "thread-standards-explained", "brass-grades-compared"],
    links: [
      { label: "Request a quote", href: "/request-quote" },
      { label: "Our materials", href: "/materials" },
    ],
  },

  /* ------------------------------------------------------------------ brass grades */
  {
    slug: "brass-grades-compared",
    kind: "guide",
    title: "Brass grades for turned parts compared",
    short: "Brass grades compared",
    summary:
      "How the common free-cutting, DZR and hot-stamping brasses differ in composition, machinability and corrosion behaviour, and which to choose for terminals, inserts and water fittings.",
    readMinutes: 6,
    topic: "Materials",
    sections: [
      {
        id: "why-brass",
        heading: "Why brass is used for turned parts",
        blocks: [
          {
            type: "p",
            text: "Brass is an alloy of copper and zinc. Free-cutting brasses add a small amount of lead, which forms fine particles in the metal and makes chips break into short pieces. That is why leaded brass can be machined at high speed on automatic lathes with good tool life, fine threads and a clean surface. Brass also conducts electricity well, resists corrosion in most indoor environments and takes plating easily.",
          },
        ],
      },
      {
        id: "grades",
        heading: "Common grades at a glance",
        blocks: [
          {
            type: "table",
            caption: "Nominal compositions per the named standard. Always check the current edition of the standard for exact limits.",
            head: ["Grade", "Standard", "Nominal composition (%)", "Machinability", "Typical uses"],
            rows: [
              ["CW614N (CuZn39Pb3)", "EN 12164", "Cu 57.0–59.0, Pb 2.5–3.5, Zn balance", "Excellent", "Terminals, inserts, fasteners, general turned parts"],
              ["CW603N (CuZn36Pb3)", "EN 12164", "Cu 60.0–62.0, Pb 2.5–3.5, Zn balance", "Excellent", "Turned parts that also need some cold forming, such as crimping"],
              ["C36000", "ASTM B16", "Cu 60.0–63.0, Pb 2.5–3.7, Zn balance", "Excellent (the US machinability reference)", "Free-cutting brass for the North American market"],
              ["CW602N (CuZn36Pb2As)", "EN 12164", "Cu 61.0–63.0, Pb 1.7–2.8, As 0.02–0.15, Zn balance", "Good", "Dezincification-resistant (DZR) fittings for water systems"],
              ["CW617N (CuZn40Pb2)", "EN 12164 / EN 12165", "Cu 57.0–59.0, Pb 1.6–2.5, Zn balance", "Very good", "Hot-stamped (forged) bodies that are then machined, such as valves"],
            ],
          },
          {
            type: "note",
            text: "Older British designations are still common on drawings: CZ121 is broadly equivalent to CW614N, and CZ132 to CW602N. In India, IS 319 covers free-cutting leaded brass rods in several types. If a drawing uses an older or local designation, confirm the intended equivalent when ordering.",
          },
        ],
      },
      {
        id: "dzr",
        heading: "Dezincification and DZR brass",
        blocks: [
          {
            type: "p",
            text: "In some waters, ordinary brass can lose zinc from its surface and leave behind a weak, porous copper layer. This is dezincification, and it can make fittings leak or fail over time. DZR (dezincification-resistant) brasses such as CW602N control the composition, with a small arsenic addition and a higher copper content, and are usually heat treated so the structure resists this attack.",
          },
          {
            type: "list",
            items: [
              "Use DZR brass for fittings in contact with potable or aggressive water.",
              "Free-cutting grades such as CW614N are fine for dry, indoor and electrical applications.",
              "Where drinking-water rules restrict lead, low-lead or lead-free brasses (for example CW511L or silicon brasses) are used instead; they machine differently and cost more.",
            ],
          },
        ],
      },
      {
        id: "choosing",
        heading: "How to choose",
        blocks: [
          {
            type: "table",
            head: ["If the part is…", "Consider"],
            rows: [
              ["An electrical terminal, insert or general turned part", "CW614N / C36000 (best machinability)"],
              ["Crimped, bent or flared after machining", "CW603N (higher copper, more ductile)"],
              ["A fitting in contact with water", "CW602N DZR, or a low-lead grade where regulations require it"],
              ["A forged body with machined features", "CW617N"],
              ["For a market with lead limits", "Confirm the applicable rule first, then a compliant low-lead grade"],
            ],
          },
        ],
      },
    ],
    related: ["plating-and-finishes", "how-to-specify-a-turned-part", "what-drives-the-cost-of-a-turned-part"],
    links: [
      { label: "Materials we machine", href: "/materials" },
      { label: "Request a quote", href: "/request-quote" },
    ],
  },

  /* ------------------------------------------------------------------ threads */
  {
    slug: "thread-standards-explained",
    kind: "guide",
    title: "Thread standards explained: metric, BSP, NPT and UNC / UNF",
    short: "Thread standards explained",
    summary:
      "How the four thread systems you will meet on turned parts differ, how to call them out correctly on a drawing, and how to tell them apart on a sample.",
    readMinutes: 7,
    topic: "Design",
    sections: [
      {
        id: "overview",
        heading: "The four systems at a glance",
        blocks: [
          {
            type: "table",
            head: ["System", "Standard", "Flank angle", "Form", "Seals on the thread?", "Example callout"],
            rows: [
              ["ISO metric", "ISO 68-1, ISO 261, ISO 965", "60°", "Parallel", "No", "M8x1.25-6g"],
              ["BSPP (parallel pipe)", "ISO 228-1", "55°", "Parallel", "No, seals on a washer or face", "G 1/2"],
              ["BSPT (taper pipe)", "ISO 7-1 / EN 10226", "55°", "Taper 1:16", "Yes, with sealant", "R 1/2 (external), Rp / Rc 1/2 (internal)"],
              ["NPT (taper pipe)", "ASME B1.20.1", "60°", "Taper 1:16", "Yes, with sealant", "1/2-14 NPT"],
              ["UNC / UNF (unified inch)", "ASME B1.1", "60°", "Parallel", "No", "1/4-20 UNC-2A"],
            ],
          },
        ],
      },
      {
        id: "metric",
        heading: "ISO metric threads",
        blocks: [
          {
            type: "p",
            text: "The default fastening thread worldwide. It is called out by diameter and pitch in millimetres; if the pitch is omitted (M8), the coarse pitch is meant. Tolerance classes follow ISO 965: 6g for external threads and 6H for internal threads is the common medium fit.",
          },
          {
            type: "table",
            caption: "ISO metric coarse pitches for common sizes",
            head: ["Size", "M3", "M4", "M5", "M6", "M8", "M10", "M12", "M16", "M20"],
            rows: [["Pitch (mm)", "0.5", "0.7", "0.8", "1.0", "1.25", "1.5", "1.75", "2.0", "2.5"]],
          },
        ],
      },
      {
        id: "pipe",
        heading: "Pipe threads: BSP and NPT",
        blocks: [
          {
            type: "p",
            text: "Pipe threads are named after a nominal pipe size, not the measured diameter, so a 1/2 inch pipe thread is roughly 21 mm across. Parallel threads (BSPP, marked G) seal on a washer, O-ring or face. Taper threads (BSPT and NPT) wedge tight and seal on the thread itself with tape or sealant.",
          },
          {
            type: "table",
            caption: "Threads per inch (TPI) by nominal size",
            head: ["Nominal size", "1/8", "1/4", "3/8", "1/2", "3/4", "1", "1-1/4 to 2"],
            rows: [
              ["BSP (BSPP / BSPT)", "28", "19", "19", "14", "14", "11", "11"],
              ["NPT", "27", "18", "18", "14", "14", "11.5", "11.5"],
            ],
          },
          {
            type: "note",
            text: "BSPT and NPT look similar but are not interchangeable: the flank angle differs (55° against 60°) and most sizes have a different pitch. Mixing them is a common cause of leaks.",
          },
        ],
      },
      {
        id: "unified",
        heading: "Unified inch threads: UNC and UNF",
        blocks: [
          {
            type: "p",
            text: "Used on equipment designed to inch standards, mainly for North America. The callout gives the diameter, threads per inch and series: 1/4-20 UNC is coarse, 1/4-28 UNF is fine. Classes 2A (external) and 2B (internal) are the usual general-purpose fit.",
          },
        ],
      },
      {
        id: "identify",
        heading: "How to identify a thread on a sample",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Measure the outside diameter of the external thread with a caliper.",
              "Check whether the diameter changes along the length. If it does, the thread is tapered (BSPT or NPT).",
              "Measure the pitch with a thread pitch gauge in both millimetres and threads per inch, and see which fits cleanly.",
              "Compare the flank angle: 55° points to BSP, 60° to metric, NPT or unified.",
              "Match diameter and pitch against the tables above, then confirm with a go / no-go gauge of that standard.",
            ],
          },
        ],
      },
    ],
    related: ["how-to-specify-a-turned-part", "glossary", "plating-and-finishes"],
    links: [
      { label: "Threading capability", href: "/capabilities" },
      { label: "Request a quote", href: "/request-quote" },
    ],
  },

  /* ------------------------------------------------------------------ finishes */
  {
    slug: "plating-and-finishes",
    kind: "guide",
    title: "Plating and finishes for brass and steel turned parts",
    short: "Plating and finishes",
    summary:
      "What nickel, tin, silver, chrome, zinc, passivation and anodising each do, where each is used, and what to state on the drawing so the finish is right first time.",
    readMinutes: 6,
    topic: "Finishing",
    sections: [
      {
        id: "overview",
        heading: "Finishes at a glance",
        blocks: [
          {
            type: "table",
            head: ["Finish", "Applied to", "Main purpose", "Typical uses"],
            rows: [
              ["Natural / bright", "Brass", "Clean, tumbled surface; no coating", "Internal parts, parts plated later by the customer"],
              ["Nickel", "Brass, steel", "Corrosion and wear resistance, prevents tarnish; base layer for chrome", "Inserts, connectors, fittings"],
              ["Tin", "Brass, copper", "Solderability and stable electrical contact", "Terminals, cable lugs, busbar parts"],
              ["Silver", "Brass, copper", "Lowest contact resistance for high-current joints", "Switchgear contacts, high-current connectors"],
              ["Chrome", "Brass (over nickel)", "Hard, bright decorative surface", "Bath and sanitary fittings"],
              ["Zinc with passivation", "Steel", "Sacrificial corrosion protection", "Steel fasteners and brackets"],
              ["Passivation", "Stainless steel", "Restores the protective oxide layer after machining", "Stainless turned parts"],
              ["Anodising", "Aluminium", "Hard, corrosion-resistant oxide layer, can be coloured", "Aluminium housings and spacers"],
            ],
          },
        ],
      },
      {
        id: "electrical",
        heading: "Finishes for electrical parts",
        blocks: [
          {
            type: "p",
            text: "Electrical parts are usually tin or silver plated. Tin is economical and easy to solder or crimp. Silver gives the lowest contact resistance but tarnishes in air containing sulphur, so it is often given an anti-tarnish treatment. In some electronic uses, pure tin can grow fine whiskers over time; a nickel underlayer or a matte tin deposit is commonly specified to reduce this risk.",
          },
        ],
      },
      {
        id: "compliance",
        heading: "Compliance points",
        blocks: [
          {
            type: "list",
            items: [
              "Hexavalent chromium is restricted under RoHS and REACH. Zinc plating is normally finished with a trivalent passivate instead.",
              "If a salt spray test is required (for example a minimum number of hours to white or red rust), state the test standard and duration on the drawing.",
              "Ask for a RoHS / REACH declaration with the parts if your market requires one.",
            ],
          },
        ],
      },
      {
        id: "specify",
        heading: "What to put on the drawing",
        blocks: [
          {
            type: "checklist",
            items: [
              { label: "Finish type and, for plating, the thickness range in µm" },
              { label: "Which surfaces are significant", detail: "Plating thickness is measured there; other surfaces may be thinner." },
              { label: "Areas to mask or leave unplated", detail: "Threads and tight bores often need allowance, since plating adds thickness on every surface." },
              { label: "Appearance", detail: "Bright, satin or matte." },
              { label: "Test requirements", detail: "Thickness measurement, adhesion and salt spray, with the standard named." },
            ],
          },
          {
            type: "note",
            text: "Plating adds thickness to threads and bores. For tight fits, say whether the tolerance applies before or after plating.",
          },
        ],
      },
    ],
    related: ["brass-grades-compared", "how-to-specify-a-turned-part", "glossary"],
    links: [
      { label: "Materials and finishes", href: "/materials" },
      { label: "Request a quote", href: "/request-quote" },
    ],
  },

  /* ------------------------------------------------------------------ cost */
  {
    slug: "what-drives-the-cost-of-a-turned-part",
    kind: "guide",
    title: "What drives the cost of a turned part",
    short: "What drives the cost",
    summary:
      "The five things that decide the price of a turned component, and practical design choices that lower cost without affecting how the part works.",
    readMinutes: 6,
    topic: "Buying",
    sections: [
      {
        id: "drivers",
        heading: "The five cost drivers",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Material: the alloy price (brass follows the copper market) and the bar size. The part is machined from the smallest standard bar that covers its largest diameter, so a single oversized collar can raise the cost of the whole part.",
              "Cycle time: how long each part spends on the machine. More features, deeper holes and slow materials take longer.",
              "Secondary operations: cross holes, flats, slots and knurls that cannot be finished in the main turning cycle need another set-up and handling.",
              "Tolerances and inspection: every tighter tolerance means slower cutting, more checking and more parts rejected.",
              "Quantity and set-up: set-up time is shared across the batch, so small batches carry more set-up cost per part. Very high volumes can justify dedicated tooling that makes each part cheaper.",
            ],
          },
        ],
      },
      {
        id: "tolerances",
        heading: "Tolerances: tight only where it matters",
        blocks: [
          {
            type: "p",
            text: "The single most effective way to reduce cost is to keep tight tolerances for the features that need them, such as a bearing fit, a sealing diameter or a thread, and apply a general tolerance such as ISO 2768-m to everything else.",
          },
        ],
      },
      {
        id: "design-tips",
        heading: "Design choices that lower cost",
        blocks: [
          {
            type: "list",
            items: [
              "Use standard thread sizes and classes rather than special pitches.",
              "Allow a small radius in internal corners; a perfectly sharp internal corner needs extra operations.",
              "Avoid very deep, small-diameter holes. Holes deeper than about 8 to 10 times their diameter slow production noticeably.",
              "Add chamfers on edges and thread starts; they speed assembly and reduce burrs.",
              "Design hex or flat sections to match standard hexagon bar sizes, so no milling is needed.",
              "Combine features so the part can be completed in one set-up where possible.",
              "Tell the supplier your annual volume; the right process for 5,000 parts is often different from the right process for 500,000.",
            ],
          },
          {
            type: "note",
            text: "A good supplier will review your drawing and suggest changes like these before quoting. Ask for this review; it often saves more than any price negotiation.",
          },
        ],
      },
    ],
    related: ["how-to-specify-a-turned-part", "brass-grades-compared", "thread-standards-explained"],
    links: [
      { label: "Our capabilities", href: "/capabilities" },
      { label: "Request a quote", href: "/request-quote" },
    ],
  },

  /* ------------------------------------------------------------------ glossary */
  {
    slug: "glossary",
    kind: "glossary",
    title: "Glossary of machining and quality terms",
    short: "Glossary",
    summary: "Plain-language definitions of the terms used in turned-part drawings, quotations and inspection reports.",
    readMinutes: 8,
    topic: "Reference",
    sections: [],
    terms: [
      { term: "Bar feeder", definition: "A device that pushes long bars of material into a lathe automatically, so parts can be produced continuously from the bar." },
      { term: "Burr", definition: "A small raised edge or sliver of metal left by machining. Removing it is called deburring." },
      { term: "Cam automat", definition: "A mechanical automatic lathe whose movements are controlled by cams. Very fast for long runs of simple to moderately complex parts once set up." },
      { term: "Chamfer", definition: "A small angled cut on an edge, usually 45°, to remove sharpness and help assembly." },
      { term: "CMRT", definition: "Conflict Minerals Reporting Template: a standard form used to report the smelters of tin, tantalum, tungsten and gold in a supply chain." },
      { term: "CNC turning centre", definition: "A computer-controlled lathe that rotates the bar while cutting tools shape it. Many also have live tools for drilling and milling off-centre features." },
      { term: "Cross-drilling", definition: "Drilling a hole at an angle (usually 90°) to the main axis of a turned part." },
      { term: "Cycle time", definition: "The time a machine takes to produce one part. A major driver of part cost." },
      { term: "Dezincification", definition: "Corrosion in which zinc is lost from brass, leaving weak, porous copper. DZR brass is formulated to resist it." },
      { term: "DZR brass", definition: "Dezincification-resistant brass, such as CW602N, used for fittings in contact with water." },
      { term: "First-off inspection", definition: "Full inspection of the first part(s) produced after a set-up, approved before the production run continues." },
      { term: "Free-cutting brass", definition: "Brass with a small lead addition that makes chips break short, allowing fast machining. CW614N and C36000 are examples." },
      { term: "General tolerance", definition: "A tolerance that applies to every dimension without its own tolerance, usually stated by a standard such as ISO 2768-m." },
      { term: "Go / no-go gauge", definition: "A fixed gauge with one end that must fit (go) and one that must not (no-go). Used to check threads, holes and diameters quickly." },
      { term: "Incoterms", definition: "International Chamber of Commerce rules defining who pays for and bears the risk of transport at each stage, for example EXW, FOB, CIF and DAP." },
      { term: "Knurling", definition: "Rolling a straight, diagonal or diamond pattern onto a surface to give grip or to help a part hold in plastic." },
      { term: "Mill certificate", definition: "A certificate from the bar producer stating the chemical composition (and sometimes mechanical properties) of a batch of material." },
      { term: "MOQ", definition: "Minimum order quantity: the smallest batch a supplier will produce for a given part." },
      { term: "Passivation", definition: "A chemical treatment for stainless steel that removes free iron from the surface and restores its corrosion-resistant oxide layer." },
      { term: "Patrol inspection", definition: "Checks made on parts at fixed intervals during a production run, to catch drift before it produces rejects." },
      { term: "PPAP", definition: "Production Part Approval Process: a formal set of documents and samples used, mainly in automotive, to approve a part before series production." },
      { term: "Profile projector", definition: "An optical instrument that projects a magnified silhouette of a part onto a screen to measure profiles, angles, radii and thread forms." },
      { term: "Ra (surface roughness)", definition: "The average roughness of a surface, in micrometres (µm). Lower is smoother; Ra 0.8 µm is a typical finish for a sealing face." },
      { term: "RoHS", definition: "EU directive restricting hazardous substances such as lead, cadmium, mercury and hexavalent chromium in electrical and electronic equipment." },
      { term: "Sliding-head lathe", definition: "Also called Swiss-type. The bar moves through a guide bush while the tools stay close to it, which suits long, slender, precise parts." },
      { term: "Thread class", definition: "The tolerance grade of a thread, for example 6g / 6H for metric or 2A / 2B for unified threads." },
      { term: "Thread rolling", definition: "Forming a thread by pressing hardened dies into the part instead of cutting it. Rolled threads are strong and smooth." },
      { term: "VMC", definition: "Vertical machining centre: a CNC milling machine with a vertical spindle, used for flats, pockets and holes." },
    ],
    related: ["thread-standards-explained", "brass-grades-compared", "how-to-specify-a-turned-part"],
    links: [{ label: "Request a quote", href: "/request-quote" }],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
