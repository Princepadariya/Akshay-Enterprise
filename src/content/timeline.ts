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
  { year: "2018", title: "Quality system certified", body: "Quality management system formalised and certified.", placeholder: true },
  { year: "2021", title: "New plant", body: "Move to a larger facility with a dedicated inspection room and packing hall.", placeholder: true },
  { year: "2024", title: "Multi-metal capability", body: "Stainless, aluminium and copper programmes running alongside brass.", placeholder: true },
];
