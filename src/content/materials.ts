import type { PhotoKey } from "./images";

/**
 * Materials and finishes.
 * Property notes are general engineering guidance, not guaranteed values.
 * TODO: confirm with engineering which grades are stocked vs. procured on order.
 */

export type MaterialKey =
  | "brass"
  | "dzr-brass"
  | "stainless-steel"
  | "mild-steel"
  | "aluminium"
  | "copper";

export type Material = {
  key: MaterialKey;
  name: string;
  short: string;
  grades: string[];
  summary: string;
  properties: { label: string; value: string }[];
  uses: string[];
  image: PhotoKey;
  swatch: string;
  /** Nominal chemical composition, % by weight, for the reference grade (per the named standard). */
  composition: { grade: string; standard: string; elements: { el: string; range: string }[] };
};

export const materials: Material[] = [
  {
    key: "brass",
    composition: { grade: "CW614N (CuZn39Pb3)", standard: "BS EN 12164", elements: [{ el: "Cu", range: "57.0 to 59.0" }, { el: "Pb", range: "2.5 to 3.5" }, { el: "Fe", range: "0.3 max" }, { el: "Zn", range: "Remainder" }] },
    name: "Free-cutting brass",
    short: "Brass",
    grades: ["CW614N", "CZ121", "C36000", "IS 319 Type I"],
    summary:
      "The workhorse for turned parts. Lead-bearing free-cutting brass breaks chips cleanly, holds fine threads and takes plating well.",
    properties: [
      { label: "Machinability", value: "Excellent (reference grade)" },
      { label: "Conductivity", value: "Good, suitable for current-carrying parts" },
      { label: "Corrosion", value: "Good in indoor and dry environments" },
      { label: "Typical bar", value: "Round, hex and square" },
    ],
    uses: ["Electrical terminals", "Inserts", "Fasteners", "Gas fittings"],
    image: "brassParts",
    swatch: "linear-gradient(120deg,#8a6428,#e2c283 45%,#a67c36)",
  },
  {
    key: "dzr-brass",
    composition: { grade: "CW602N (CuZn36Pb2As)", standard: "BS EN 12164", elements: [{ el: "Cu", range: "61.0 to 63.0" }, { el: "Pb", range: "1.7 to 2.8" }, { el: "As", range: "0.02 to 0.15" }, { el: "Zn", range: "Remainder" }] },
    name: "DZR brass",
    short: "DZR brass",
    grades: ["CW602N", "CZ132"],
    summary:
      "Dezincification-resistant brass for parts in contact with potable water, where standard brass would degrade over time.",
    properties: [
      { label: "Machinability", value: "Good" },
      { label: "Corrosion", value: "Resists dezincification in water" },
      { label: "Approvals", value: "Commonly specified for water fittings" },
      { label: "Typical bar", value: "Round and hex" },
    ],
    uses: ["Compression fittings", "PPR / CPVC inserts", "Valve components"],
    image: "brassNuts",
    swatch: "linear-gradient(120deg,#7d5f2b,#d4b27a 45%,#8f6e36)",
  },
  {
    key: "stainless-steel",
    composition: { grade: "SS 304 (1.4301)", standard: "ASTM A276 / EN 10088-3", elements: [{ el: "Cr", range: "18.0 to 20.0" }, { el: "Ni", range: "8.0 to 10.5" }, { el: "C", range: "0.08 max" }, { el: "Fe", range: "Balance" }] },
    name: "Stainless steel",
    short: "Stainless",
    grades: ["SS 303", "SS 304", "SS 316"],
    summary:
      "For strength and corrosion resistance. 303 for machinability, 304 for general duty, 316 where chlorides or marine exposure are expected.",
    properties: [
      { label: "Machinability", value: "Fair to good (303 best)" },
      { label: "Corrosion", value: "Very good to excellent (316)" },
      { label: "Strength", value: "High" },
      { label: "Finish", value: "Passivated or natural" },
    ],
    uses: ["Cable glands", "Food and pharma fittings", "Marine hardware"],
    image: "boltsSteel",
    swatch: "linear-gradient(120deg,#5a6069,#c9cdd2 45%,#747b84)",
  },
  {
    key: "mild-steel",
    composition: { grade: "EN1A leaded (230M07Pb)", standard: "BS 970", elements: [{ el: "C", range: "0.15 max" }, { el: "Mn", range: "0.90 to 1.30" }, { el: "S", range: "0.25 to 0.35" }, { el: "Pb", range: "0.15 to 0.35" }] },
    name: "Mild steel",
    short: "Mild steel",
    grades: ["EN1A (leaded)", "EN8", "IS 1079"],
    summary:
      "Economical and strong. Free-cutting EN1A machines fast; EN8 is used where higher tensile strength is specified. Always plated for protection.",
    properties: [
      { label: "Machinability", value: "Very good (EN1A)" },
      { label: "Corrosion", value: "Needs plating or coating" },
      { label: "Strength", value: "Medium to high" },
      { label: "Finish", value: "Zinc, nickel, black oxide" },
    ],
    uses: ["Studs and pins", "Spacers", "Agricultural parts"],
    image: "barStock",
    swatch: "linear-gradient(120deg,#3a3f46,#8d949c 45%,#4a5058)",
  },
  {
    key: "aluminium",
    composition: { grade: "6082", standard: "EN 573-3", elements: [{ el: "Si", range: "0.7 to 1.3" }, { el: "Mg", range: "0.6 to 1.2" }, { el: "Mn", range: "0.4 to 1.0" }, { el: "Al", range: "Balance" }] },
    name: "Aluminium",
    short: "Aluminium",
    grades: ["6061", "6082", "2011"],
    summary:
      "Light and naturally corrosion resistant. 2011 for high-speed turning, 6061 and 6082 for structural parts and anodised finishes.",
    properties: [
      { label: "Machinability", value: "Excellent (2011)" },
      { label: "Weight", value: "About a third of brass" },
      { label: "Corrosion", value: "Good, better when anodised" },
      { label: "Finish", value: "Anodised or natural" },
    ],
    uses: ["Housings", "Heat sinks", "Lightweight spacers"],
    image: "castParts",
    swatch: "linear-gradient(120deg,#8b9199,#e1e4e8 45%,#a1a7ae)",
  },
  {
    key: "copper",
    composition: { grade: "C101 (Cu-ETP)", standard: "BS EN 13601", elements: [{ el: "Cu", range: "99.90 min" }, { el: "O", range: "0.04 max" }] },
    name: "Copper and alloys",
    short: "Copper",
    grades: ["ETP C101 / C110", "Tellurium copper C145", "Phosphor bronze"],
    summary:
      "Where conductivity matters most. Tellurium copper improves machinability without giving up much conductivity; bronze adds wear resistance.",
    properties: [
      { label: "Conductivity", value: "Highest of the metals we machine" },
      { label: "Machinability", value: "Fair (C145 good)" },
      { label: "Corrosion", value: "Good" },
      { label: "Finish", value: "Tin or silver plated" },
    ],
    uses: ["Earthing parts", "Bus connectors", "Contact pins"],
    image: "smallParts",
    swatch: "linear-gradient(120deg,#8a4b2a,#e0a07a 45%,#a55f38)",
  },
];

export type FinishKey =
  | "natural"
  | "nickel"
  | "tin"
  | "chrome"
  | "silver"
  | "zinc"
  | "passivated"
  | "anodised";

export const finishes: { key: FinishKey; name: string; note: string }[] = [
  { key: "natural", name: "Natural / bright", note: "Degreased and tumbled, no plating." },
  { key: "nickel", name: "Nickel", note: "Bright or satin; wear and tarnish resistance." },
  { key: "tin", name: "Tin", note: "Solderability and stable contact resistance." },
  { key: "chrome", name: "Chrome", note: "Decorative finish over nickel for bath fittings." },
  { key: "silver", name: "Silver", note: "Lowest contact resistance for electrical parts." },
  { key: "zinc", name: "Zinc (trivalent)", note: "Corrosion protection for steel parts." },
  { key: "passivated", name: "Passivated", note: "Restores the passive layer on stainless steel." },
  { key: "anodised", name: "Anodised", note: "Hard, coloured oxide layer on aluminium." },
];

/** Plating is carried out with approved partners. TODO: confirm in-house vs. outsourced finishing. */
export const finishingNote =
  "Plating and surface treatment are coordinated with qualified finishing partners and inspected on return, before packing.";

export function materialName(key: MaterialKey) {
  return materials.find((m) => m.key === key)?.short ?? key;
}

export function finishName(key: FinishKey) {
  return finishes.find((f) => f.key === key)?.name ?? key;
}
