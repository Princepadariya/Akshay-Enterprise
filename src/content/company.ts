/**
 * About / company content.
 * TODO: founder message and leadership profiles are PLACEHOLDERS. Replace with approved copy,
 * real names and real portraits (portrait photos go in /public/images/team/).
 */

export const about = {
  headline: "About Akshay Enterprise",
  intro:
    "Akshay Enterprise turns brass and engineering metals into components that go inside switchgear, plumbing systems, gas equipment and machines built by OEMs in India and abroad.",
  overview: [
    "We are a precision components manufacturer working from bar stock: brass, DZR brass, stainless steel, mild steel, aluminium and copper. Most of what we make is built to a customer's drawing, in volumes from development lots to repeat production.",
    "The shop combines cam automats for high-volume brass work with CNC turning and machining centres for tighter tolerances and shorter runs. Secondary operations such as thread rolling, cross-drilling, knurling and slotting are done in-house, so a part leaves as a finished component rather than a blank.",
    "Gujarat is one of the world's major centres for brass component manufacturing. We draw on that supply base for raw material and finishing, and add the process discipline and documentation that export buyers expect.",
  ],
  facts: [
    { label: "Headquarters", value: "Gujarat, India", placeholder: true },
    { label: "Established", value: "2005", placeholder: true },
    { label: "Core material", value: "Free-cutting brass" },
    { label: "Work type", value: "Build-to-print and catalogue parts" },
  ],
  founderMessage: {
    placeholder: true,
    name: "Founder name TBC",
    role: "Founder & Managing Director",
    paragraphs: [
      "We started with a few machines and one rule: a part leaves the shop only when it matches the drawing. That rule has not changed as the shop has grown.",
      "Our customers do not buy brass by the kilogram. They buy parts that assemble first time on their line. Everything we invest in, from machines to gauges to people, is aimed at that.",
    ],
  },
};

export const visionMissionValues = {
  vision: {
    title: "Vision",
    body: "To be a long-term supplier of precision turned components to OEMs in India and abroad, known for accurate parts and dependable delivery.",
  },
  mission: {
    title: "Mission",
    body: "Deliver drawing-accurate components in the metal, finish and quantity specified, on the date agreed, with the documentation to prove it.",
  },
  values: [
    { title: "Accuracy first", body: "We work to the drawing. Critical dimensions are checked at first-off, during the run and before dispatch.", icon: "Crosshair" },
    { title: "Straight answers", body: "If a tolerance drives cost or a date is at risk, we say so early.", icon: "MessageSquareText" },
    { title: "Ownership", body: "The person who runs the job knows the part, the customer and the deadline.", icon: "BadgeCheck" },
    { title: "Continuous improvement", body: "Every rejection is traced to a cause and the cause is removed from the process.", icon: "RefreshCw" },
    { title: "Responsible manufacturing", body: "Brass chips and offcuts are recovered and returned to the material stream.", icon: "Recycle" },
    { title: "Long relationships", body: "We plan capacity around customers we expect to serve for years.", icon: "Handshake" },
  ],
};

/** TODO: replace with the real management team. Initials render as monograms until photos are supplied. */
export const leadership = [
  { name: "Name TBC", role: "Founder & Managing Director", focus: "Strategy, key accounts, capacity planning", initials: "MD", placeholder: true },
  { name: "Name TBC", role: "Director, Operations", focus: "Production, maintenance, delivery performance", initials: "OP", placeholder: true },
  { name: "Name TBC", role: "Head of Quality", focus: "Inspection, quality system, customer audits", initials: "QA", placeholder: true },
  { name: "Name TBC", role: "Export & Business Development", focus: "International customers, RFQs, logistics", initials: "EX", placeholder: true },
];
