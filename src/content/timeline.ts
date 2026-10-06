/**
 * Company milestones for /about/journey.
 * TODO: replace with the real company history. Every year and event below is a PLACEHOLDER.
 */

export type Milestone = {
  year: string;
  title: string;
  body: string;
  placeholder?: boolean;
};

export const timeline: Milestone[] = [
  { year: "1997", title: "Workshop founded", body: "First cam automats installed, producing brass electrical parts for local panel builders.", placeholder: true },
  { year: "2009", title: "Electrical range expands", body: "Terminal connectors and neutral links added for distribution board makers.", placeholder: true },
  { year: "2012", title: "First CNC turning centre", body: "CNC capacity introduced for tighter tolerances and faster changeovers.", placeholder: true },
  { year: "2015", title: "First export shipment", body: "Build-to-print components dispatched to an overseas OEM.", placeholder: true },
  { year: "2018", title: "RoHS compliance certified", body: "Extrusion rod and precision brass components certified RoHS compliant by QSA International, UK." },
  { year: "2021", title: "New plant", body: "Move to a larger facility with a dedicated inspection room and packing hall.", placeholder: true },
  { year: "2023", title: "ISO 14001 and ISO 45001", body: "Environmental and occupational health and safety management systems certified." },
  { year: "2024", title: "Multi-metal capability", body: "Stainless, aluminium and copper programmes running alongside brass.", placeholder: true },
  { year: "2025", title: "ISO 9001:2015", body: "Quality management system certified for brass extrusion rod and machined components." },
  { year: "2026", title: "IATF 16949", body: "Automotive quality management system certified by TÜV SÜD." },
];
