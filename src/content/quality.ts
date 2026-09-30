/**
 * Quality content.
 * TODO: confirm the instrument list (quantities, calibration) and replace the policy text with the signed quality policy.
 */

export const qualityIntro = {
  headline: "Quality control at every stage",
  body: "Every job starts with an approved first-off, runs with patrol checks, and is released only after final inspection against the drawing.",
};

export const inspectionStages = [
  {
    stage: "Incoming",
    title: "Raw material inspection",
    checks: ["Mill certificate verified against grade", "Bar diameter and straightness", "Chemical composition check (spectro / XRF, TBC)", "Material segregated and tagged by alloy"],
  },
  {
    stage: "In-process",
    title: "First-off and patrol inspection",
    checks: ["First-piece approval before the run starts", "Patrol checks at fixed intervals on every machine", "Thread gauging go / no-go", "Tool wear monitored and offsets recorded"],
  },
  {
    stage: "Final",
    title: "Final inspection and release",
    checks: ["Sampling plan against the drawing", "Visual inspection for burrs and damage", "Plating thickness verification", "Inspection report issued with the lot"],
  },
];

export type Instrument = { name: string; use: string; placeholder?: boolean };

export const instruments: Instrument[] = [
  { name: "Profile projector", use: "Profiles, angles, radii and thread forms" },
  { name: "Surface roughness tester", use: "Ra / Rz on sealing and cosmetic faces" },
  { name: "Digital height gauge", use: "Heights, steps and positional features" },
  { name: "Micrometers (outside, inside, bore)", use: "Diameters to 0.001 mm resolution" },
  { name: "Thread plug and ring gauges", use: "Metric, BSP, NPT and unified threads" },
  { name: "Pin gauges and slip gauges", use: "Bores, slots and gauge calibration" },
  { name: "Vernier and dial calipers", use: "General dimensional checks at the machine" },
  { name: "XRF / spectro analyser", use: "Alloy composition and plating thickness", placeholder: true },
];

export const qualityPolicy = {
  placeholder: true,
  text: "Akshay Enterprise is committed to supplying components that conform to customer drawings and specifications, delivered on time. We achieve this through controlled processes, trained people, calibrated measuring equipment and continual improvement of our quality management system.",
};

export const toleranceHighlights = [
  { label: "Diameter", value: "±0.01", unit: "mm" },
  { label: "Length", value: "±0.02", unit: "mm" },
  { label: "Surface", value: "Ra 0.8", unit: "μm" },
  { label: "Thread", value: "6g / 6H", unit: "class" },
];
