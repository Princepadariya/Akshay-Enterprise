export type NavLink = { label: string; href: string; description?: string };

export const manufacturingNav: NavLink[] = [
  { label: "Capabilities", href: "/capabilities", description: "Turning, VMC, threading, knurling, secondary ops" },
  { label: "Infrastructure", href: "/infrastructure", description: "Plant, machinery and capacity" },
  { label: "Quality", href: "/quality", description: "Inspection stages, lab and certifications" },
  { label: "Materials", href: "/materials", description: "Brass grades, steels, aluminium, copper, finishes" },
];

export const companyNav: NavLink[] = [
  { label: "About us", href: "/about", description: "Who we are and what we make" },
  { label: "Journey", href: "/about/journey", description: "Milestones since the first machine" },
  { label: "Vision, mission, values", href: "/about/vision-mission-values" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Downloads", href: "/downloads" },
  { label: "FAQ", href: "/faq" },
  { label: "Resources", href: "/resources", description: "Guides for buyers and engineers" },
];

/** Company policies (labels kept short for the footer column). Pages live in src/content/policies.ts. */
export const policyNav: NavLink[] = [
  { label: "All policies", href: "/policies", description: "Every policy on one page" },
  { label: "EHS policy", href: "/policies/ehs", description: "People, environment and safe plant operation" },
  { label: "Quality policy", href: "/policies/quality", description: "Parts to drawing, delivered on the agreed date" },
  { label: "Cyber security", href: "/policies/cyber-security", description: "Protecting customer drawings and data" },
  { label: "Conflict minerals", href: "/policies/conflict-minerals", description: "Responsible sourcing of 3TG" },
  { label: "Counterfeit parts", href: "/policies/counterfeit-parts", description: "Keeping suspect material out of our parts" },
];

/** Technical guides (kept here as plain links so menus never load the full guide text). Pages live in src/content/resources.ts. */
export const resourceNav: NavLink[] = [
  { label: "All resources", href: "/resources" },
  { label: "RFQ checklist", href: "/resources/how-to-specify-a-turned-part" },
  { label: "Brass grades compared", href: "/resources/brass-grades-compared" },
  { label: "Thread standards explained", href: "/resources/thread-standards-explained" },
  { label: "Plating and finishes", href: "/resources/plating-and-finishes" },
  { label: "What drives the cost", href: "/resources/what-drives-the-cost-of-a-turned-part" },
  { label: "Glossary", href: "/resources/glossary" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "All products", href: "/products" },
      { label: "Turned components", href: "/products/precision-turned-components" },
      { label: "Electrical parts", href: "/products/electrical-switchgear-parts" },
      { label: "Inserts", href: "/products/inserts-anchors" },
      { label: "Build-to-print", href: "/products/custom-build-to-print" },
    ],
  },
  { title: "Manufacturing", links: [...manufacturingNav, { label: "Industries", href: "/industries" }] },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Request a Quote", href: "/request-quote" },
      { label: "Contact", href: "/contact" },
      { label: "Downloads", href: "/downloads" },
      { label: "FAQ", href: "/faq" },
      { label: "Resources", href: "/resources" },
      { label: "Site map", href: "/site-map" },
    ],
  },
  { title: "Policies", links: policyNav },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Site map", href: "/site-map" },
];
