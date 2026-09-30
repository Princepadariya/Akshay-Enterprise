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
  { label: "Leadership", href: "/about/leadership" },
  { label: "Global presence", href: "/global-presence", description: "Export regions and logistics" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Gallery", href: "/gallery" },
  { label: "Downloads", href: "/downloads" },
  { label: "FAQ", href: "/faq" },
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
      { label: "Leadership", href: "/about/leadership" },
      { label: "Global presence", href: "/global-presence" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Request a Quote", href: "/request-quote" },
      { label: "Contact", href: "/contact" },
      { label: "Downloads", href: "/downloads" },
      { label: "FAQ", href: "/faq" },
      { label: "Site map", href: "/site-map" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Site map", href: "/site-map" },
];
