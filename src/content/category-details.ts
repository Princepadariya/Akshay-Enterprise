/**
 * Long-form detail for each product family: overview, features, manufacturing route,
 * inspection checks, customisation options, applicable standards.
 * Used on category pages and on every product page in that family.
 * TODO: confirm with engineering (routes, checks and standards describe typical practice).
 */

export type CategoryDetail = {
  overview: string[];
  features: { title: string; body: string }[];
  route: { op: string; body: string }[];
  checks: string[];
  options: string[];
  standards: string[];
};

export const categoryDetails: Record<string, CategoryDetail> = {
  "precision-turned-components": {
    overview: [
      "Turned components are the core of what we make: bushes, spacers, studs, pins and adaptors machined from round, hex or square bar. Short, simple parts run on cam automats at the lowest cost per piece; parts with tight tolerances, complex profiles or frequent changeovers run on CNC turning centres.",
      "Most turned parts arrive as a customer drawing. We review it for manufacturability, confirm the critical dimensions with you, and then lock the process and inspection plan after first-off approval so every later batch matches the approved sample.",
    ],
    features: [
      { title: "Concentric by design", body: "Outside diameter, bore and faces produced in one clamping wherever the part allows, so runout stays within the drawing." },
      { title: "Any bar section", body: "Round, hex and square bar in brass, stainless, mild steel, aluminium and copper from Ø 2 mm upward." },
      { title: "Complete in-house", body: "Cross-holes, flats, knurls, slots and threads added on secondary machines so the part ships finished." },
      { title: "Repeatable batches", body: "Setting sheets, tool offsets and gauges are recorded per part number and reused for repeat orders." },
    ],
    route: [
      { op: "OP 10", body: "Bar stock issued by grade and heat number" },
      { op: "OP 20", body: "Turn, face, drill and part off on CNC or cam automat" },
      { op: "OP 30", body: "Secondary operations: cross-drill, mill flats, knurl" },
      { op: "OP 40", body: "Deburr, clean and tumble" },
      { op: "OP 50", body: "Plating or passivation if specified" },
      { op: "OP 60", body: "Final inspection, count and pack" },
    ],
    checks: [
      "First-piece approval against every drawing dimension",
      "Patrol checks on critical diameters at a fixed frequency",
      "Runout and concentricity on bores where specified",
      "Visual check for burrs, chatter marks and tool marks",
    ],
    options: ["Special chamfers and edge breaks", "Laser or stamp marking", "Custom lengths and bar sizes", "Selective plating", "Bagging by count with part-number labels"],
    standards: ["ISO 2768-m general tolerances (unless the drawing states otherwise)", "BS EN 12164 / IS 319 brass bar", "ASTM A582 free-machining stainless bar"],
  },

  "electrical-parts": {
    overview: [
      "Electrical parts carry current, so they are judged at the contact face: thread fit, surface finish and plating all affect resistance and heating. We make terminals, connectors, contact pins and modular switch parts in free-cutting brass and copper alloys for panel builders, switchgear makers and wiring-device brands.",
      "Plating is specified by type and thickness, checked when parts return from the finishing line, and recorded on the inspection report so you can show compliance to your own customers.",
    ],
    features: [
      { title: "Current-rated materials", body: "Brass and copper grades selected for conductivity and strength at the rated current." },
      { title: "Clean threads", body: "Tapped holes gauged go / no-go so terminal screws seat fully without stripping." },
      { title: "Plating control", body: "Tin, nickel or silver plating with thickness verified on each lot." },
      { title: "High-volume ready", body: "Cam automats and dedicated cross-drilling set-ups for long production runs." },
    ],
    route: [
      { op: "OP 10", body: "Brass or copper bar issued with mill certificate" },
      { op: "OP 20", body: "Turn body and part off" },
      { op: "OP 30", body: "Cross-drill and tap conductor and screw holes" },
      { op: "OP 40", body: "Deburr internal holes and clean" },
      { op: "OP 50", body: "Plate (tin / nickel / silver) and verify thickness" },
      { op: "OP 60", body: "Assemble screws if required, inspect, pack" },
    ],
    checks: [
      "Thread gauging on every tapped hole",
      "Conductor hole diameter and position",
      "Plating thickness per lot",
      "Visual check for burrs inside conductor holes",
    ],
    options: ["Screws supplied loose or pre-assembled", "Captive washers", "Custom way counts and pitches", "Lead-free brass grades", "Anti-tarnish packing"],
    standards: ["IEC 60947-7-1 terminal blocks (design reference)", "IS 13947 low-voltage switchgear (design reference)", "RoHS compliant materials on request"],
  },




  "inserts-anchors": {
    overview: [
      "Threaded brass inserts give plastic parts a durable metal thread. Pull-out strength and torque resistance come from the knurl pattern and undercut, so those features are controlled as closely as the thread itself.",
      "We produce moulding inserts for placement in the tool, inserts for heat-set or ultrasonic installation after moulding, and brass anchors for fixing into masonry.",
    ],
    features: [
      { title: "Engineered knurls", body: "Diamond, straight or helical knurls sized for the plastic and wall thickness." },
      { title: "Moulding-ready", body: "Blind ends and sealing features stop plastic flowing into the thread." },
      { title: "Clean threads", body: "Chip-free, degreased threads ready for assembly." },
      { title: "Brass anchors", body: "Split-body expansion anchors for sanitary and electrical fixtures." },
    ],
    route: [
      { op: "OP 10", body: "Free-cutting brass bar issued" },
      { op: "OP 20", body: "Turn, knurl, drill and tap in one cycle" },
      { op: "OP 30", body: "Slot anchors where required" },
      { op: "OP 40", body: "Degrease and tumble to remove chips" },
      { op: "OP 50", body: "Inspect and pack by count" },
    ],
    checks: ["Thread gauging", "Knurl diameter and pattern", "Overall length and undercut", "Chip-free check on internal threads"],
    options: ["Blind or through threads", "Custom knurl patterns", "Flanged and headed inserts", "Nickel plating"],
    standards: ["ISO 965 metric threads", "ASME B1.1 unified threads"],
  },

  "plumbing-pipe-fittings": {
    overview: [
      "A plumbing fitting has to seal when it is installed and stay sealed in service. Seats, cones, olives and threads are machined for that, in standard brass for general service and DZR brass where fittings are in contact with potable water.",
      "We make compression fittings and threaded brass inserts for PPR and CPVC fittings, supplied natural, nickel or chrome finished.",
    ],
    features: [
      { title: "Leak-tight seats", body: "Seats and cones machined to seal at the rated pressure." },
      { title: "Water-safe grades", body: "DZR brass for potable water; low-lead grades on request." },
      { title: "Insert anchoring", body: "Knurl and groove profiles that lock inserts into PPR and CPVC." },
      { title: "Cosmetic finish", body: "Chrome-ready surfaces on visible fittings." },
    ],
    route: [
      { op: "OP 10", body: "Brass or DZR bar issued" },
      { op: "OP 20", body: "Turn body, seat and bore" },
      { op: "OP 30", body: "Cut BSP or NPT threads" },
      { op: "OP 40", body: "Deburr and clean" },
      { op: "OP 50", body: "Nickel or chrome plate if specified" },
      { op: "OP 60", body: "Pressure or leak test if specified, inspect, pack" },
    ],
    checks: ["Thread gauging (BSP / NPT)", "Seat and cone geometry", "Surface finish on sealing faces", "Leak test on sample basis if specified"],
    options: ["Olive material choice", "Custom thread combinations", "Branded marking", "Individual poly-bag packing"],
    standards: ["BS EN ISO 228-1 and ISO 7-1 BSP threads", "ASME B1.20.1 NPT", "BS EN 12165 / 12164 brass (CW617N, CW614N, CW602N)"],
  },

  "gas-fittings": {
    overview: [
      "Gas fittings sit in safety-critical assemblies: regulators, meters and CNG systems. Clean internal passages, correct seat geometry and consistent threads matter as much as the outside diameter.",
      "We machine LPG regulator components, gas meter unions and CNG fittings to customer drawings, with traceability carried from raw material to dispatch label.",
    ],
    features: [
      { title: "Burr-free passages", body: "Internal bores deburred and inspected so nothing restricts flow or damages seals." },
      { title: "Seat geometry", body: "Valve seats and orifices held to drawing for consistent regulation." },
      { title: "Traceability", body: "Heat and batch numbers recorded on every lot." },
      { title: "Pressure-rated threads", body: "BSP, NPT and metric forms gauged to class." },
    ],
    route: [
      { op: "OP 10", body: "Brass bar issued with mill certificate" },
      { op: "OP 20", body: "Turn body, drill passages" },
      { op: "OP 30", body: "Machine seats and orifices" },
      { op: "OP 40", body: "Thread, deburr internal passages" },
      { op: "OP 50", body: "Clean and dry" },
      { op: "OP 60", body: "Inspect, leak test if specified, pack" },
    ],
    checks: ["Orifice diameter", "Seat geometry and finish", "Thread gauging", "Internal burr inspection"],
    options: ["Customer-specified leak test", "Nickel plating", "Laser marking of batch codes"],
    standards: ["IS 8737 / EN 16129 regulators (design reference)", "BS EN ISO 228-1 BSP threads"],
  },

  "sanitary-bath-fitting-components": {
    overview: [
      "Bath and faucet components have two jobs: work smoothly for years, and look perfect after chrome plating. Spindles, cartridge parts and housings are machined with fit and surface finish controlled on functional and cosmetic faces.",
      "We supply faucet and shower makers with machined components ready for their plating line or fully plated.",
    ],
    features: [
      { title: "Smooth operation", body: "Splines, threads and O-ring grooves held to fit for drip-free, smooth handles." },
      { title: "Chrome-ready surfaces", body: "Cosmetic faces free of tool marks before plating." },
      { title: "Water-safe options", body: "DZR and low-lead brass grades." },
      { title: "Plated or ready to plate", body: "Supplied bright-turned or finished in nickel and chrome." },
    ],
    route: [
      { op: "OP 10", body: "Brass bar issued" },
      { op: "OP 20", body: "Turn profile and cosmetic faces" },
      { op: "OP 30", body: "Thread, spline or groove" },
      { op: "OP 40", body: "Polish or buff cosmetic faces" },
      { op: "OP 50", body: "Nickel and chrome plate if specified" },
      { op: "OP 60", body: "Inspect, protective pack" },
    ],
    checks: ["Spline and thread fit", "O-ring groove dimensions", "Surface finish on cosmetic faces", "Plating appearance"],
    options: ["Bright-turned or polished", "Chrome, satin nickel or PVD-ready", "Individual protective packing"],
    standards: ["BS EN 200 / IS 8931 sanitary tapware (design reference)", "BS EN 12164 brass bar"],
  },

  "custom-build-to-print": {
    overview: [
      "If it can be turned, drilled, threaded, milled or knurled from bar, we can quote it. Build-to-print is most of what we do. You supply the design and we manufacture it to your drawing at the volume you need.",
      "A typical project moves from drawing review to first-off samples with a dimensional report, then to production on the most economical process. Common reasons buyers come to us: second-source supply, import substitution, and parts too complex or too low-volume for their current supplier.",
    ],
    features: [
      { title: "Drawing review", body: "We flag features that drive cost and suggest changes before you commit." },
      { title: "First-off samples", body: "Produced on the intended process with a full dimensional report." },
      { title: "NDA on request", body: "Your drawings stay confidential and are used only to quote and make your parts." },
      { title: "Prototype to volume", body: "Same inspection plan from development lot to production run." },
    ],
    route: [
      { op: "OP 10", body: "Drawing review and feasibility" },
      { op: "OP 20", body: "Process plan, tooling and gauges" },
      { op: "OP 30", body: "First-off samples and dimensional report" },
      { op: "OP 40", body: "Customer approval, process frozen" },
      { op: "OP 50", body: "Production on scheduled call-offs" },
      { op: "OP 60", body: "Final inspection and dispatch documentation" },
    ],
    checks: ["Full dimensional report on first-off", "Critical-to-function dimensions on every lot", "Material certificate check", "Finish and plating verification"],
    options: ["Any material we machine", "Any finish we coordinate", "Kitting and sub-assembly", "Customer-specific packing and labelling"],
    standards: ["Your drawing and specification", "ISO 2768 general tolerances where not specified"],
  },

  "brass-rods-sheets-wire": {
    overview: [
      "Alongside finished parts we supply brass in stock form: solid and hollow rods for machining, sheet for pressing and fabrication, and brass and copper wire for pins, springs and conductors.",
      "Stock is identified by grade and heat number and can be cut to length, so it arrives ready for your machines with traceability back to the mill certificate.",
    ],
    features: [
      { title: "Solid and hollow", body: "Hollow rod starts with the bore already formed, cutting cycle time and scrap on bushes and fittings." },
      { title: "Cut to length", body: "Bar and sheet cut to your sizes so less handling and storage on your side." },
      { title: "Traceable", body: "Every lot is tagged by grade and heat number with the mill certificate available on request." },
      { title: "Same source as our parts", body: "The grades we machine every day, so you know how the material behaves on the lathe." },
    ],
    route: [
      { op: "OP 10", body: "Material received and checked against the mill certificate" },
      { op: "OP 20", body: "Grade and heat number tagged" },
      { op: "OP 30", body: "Cut to length or sheared to size if ordered" },
      { op: "OP 40", body: "Dimensional and visual check" },
      { op: "OP 50", body: "Bundled or coiled, labelled and packed" },
    ],
    checks: ["Grade against mill certificate", "Diameter, section and thickness", "Straightness and surface condition", "Length and quantity"],
    options: ["Standard or cut lengths", "Round, hex and square sections", "Coils or straight lengths for wire", "Customer labelling"],
    standards: ["IS 319 free-cutting brass bar", "BS EN 12164 brass rod for machining", "BS EN 12163 / 12166 copper and copper-alloy rod and wire"],
  },
};

export function getCategoryDetail(slug: string): CategoryDetail | undefined {
  return categoryDetails[slug];
}
