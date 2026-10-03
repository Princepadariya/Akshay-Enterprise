import type { PhotoKey } from "./images";

/* ---------------------------------------------------------------- Sustainability */
/** TODO: every initiative below is a PLACEHOLDER. Replace with real programmes and numbers, or remove. */
export const sustainability = {
  intro:
    "Brass is one of the most recyclable engineering metals. Running a turning shop responsibly starts with keeping every chip and offcut in the material loop.",
  pillars: [
    {
      title: "Chip and scrap recovery",
      body: "Brass chips are separated by alloy at every machine, de-oiled and returned to the mill for remelting. Mixed scrap is avoided so it keeps its value.",
      image: "chips" as PhotoKey,
      placeholder: true,
    },
    {
      title: "Coolant and oil management",
      body: "Central filtration extends coolant life. Spent oils and sludge are handed to authorised recyclers.",
      image: "brassMachining" as PhotoKey,
      placeholder: true,
    },
    {
      title: "Energy efficiency",
      body: "Machine loading is planned to reduce idle running. Rooftop solar and efficient compressors are being evaluated.",
      image: "solarRoof" as PhotoKey,
      placeholder: true,
    },
    {
      title: "Community",
      body: "Skills training for machine operators from the local community, run with nearby technical institutes.",
      image: "crew" as PhotoKey,
      placeholder: true,
    },
  ],
  /**
   * Status of each practice, derived from the pillar text above ("being evaluated" = evaluating).
   * TODO: confirm each status with the plant before launch.
   */
  status: {
    placeholder: true,
    items: [
      { item: "Chips separated by alloy at every machine", area: "Chip recovery", state: "in-place" },
      { item: "Chips de-oiled and returned to the mill for remelting", area: "Chip recovery", state: "in-place" },
      { item: "Central coolant filtration", area: "Coolant and oil", state: "in-place" },
      { item: "Spent oil and sludge handed to authorised recyclers", area: "Coolant and oil", state: "in-place" },
      { item: "Machine loading planned to reduce idle running", area: "Energy", state: "in-place" },
      { item: "Rooftop solar", area: "Energy", state: "evaluating" },
      { item: "Efficient compressors", area: "Energy", state: "evaluating" },
      { item: "Operator skills training with local technical institutes", area: "Community", state: "in-place" },
    ] as { item: string; area: string; state: "in-place" | "evaluating" }[],
  },
};

/* ---------------------------------------------------------------- Gallery */
export type GalleryItem = { image: PhotoKey; group: "Factory" | "Machines" | "Products" | "Quality"; caption: string };

/** TODO: replace with real factory, machine and product photography. */
export const gallery: GalleryItem[] = [
  { image: "factoryLine", group: "Factory", caption: "Production hall" },
  { image: "lathe", group: "Machines", caption: "Bar turning" },
  { image: "brassParts", group: "Products", caption: "Brass turned parts" },
  { image: "caliperPart", group: "Quality", caption: "Dimensional check" },
  { image: "latheTurret", group: "Machines", caption: "Turret and chuck" },
  { image: "brassNuts", group: "Products", caption: "Threaded fittings" },
  { image: "warehouse", group: "Factory", caption: "Dispatch area" },
  { image: "micrometerFlange", group: "Quality", caption: "Micrometer check" },
  { image: "millCutting", group: "Machines", caption: "Machining centre" },
  { image: "precisionPins", group: "Products", caption: "Precision pins" },
  { image: "barStock", group: "Factory", caption: "Raw material store" },
  { image: "inspector", group: "Quality", caption: "Final inspection" },
  { image: "cncCutting", group: "Machines", caption: "CNC operation" },
  { image: "screwsPile", group: "Products", caption: "Fasteners" },
  { image: "operatorLathe", group: "Factory", caption: "Turning section" },
  { image: "rulerParts", group: "Quality", caption: "Parts against drawing" },
  { image: "latheTurning", group: "Machines", caption: "Turning a bar" },
  { image: "brassFittingsRow", group: "Products", caption: "Brass fittings" },
  { image: "dialIndicator", group: "Quality", caption: "Dial indicator check" },
  { image: "machinistLathe", group: "Factory", caption: "Machinist at the lathe" },
  { image: "copperParts", group: "Products", caption: "Copper electrical parts" },
  { image: "millingChips", group: "Machines", caption: "Milling and chip control" },
];

/* ---------------------------------------------------------------- Downloads */
/** TODO: add the real PDFs to /public/downloads and set `file` to their path. Items without a file show "Request a copy". */
export const downloads: { title: string; description: string; type: string; size?: string; file?: string }[] = [
  { title: "Product catalogue", description: "Full range of standard components with materials and sizes.", type: "PDF" },
  { title: "Company profile", description: "Plant, machinery, quality system and export experience.", type: "PDF" },
  { title: "ISO 9001:2015 certificate", description: "Quality management system certificate (placeholder).", type: "PDF" },
  { title: "Quality policy", description: "Signed quality policy statement.", type: "PDF" },
  { title: "Material grades reference", description: "Brass, stainless, steel, aluminium and copper grades we machine.", type: "PDF" },
  { title: "RoHS / REACH declaration", description: "Compliance declaration for restricted substances (placeholder).", type: "PDF" },
];
