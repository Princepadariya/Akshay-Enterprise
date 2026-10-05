import type { PhotoKey } from "./images";
/**
 * Akshay Enterprise: single source of truth for company facts.
 *
 * RULE: nothing in this file may be invented. Every value that has not been
 * confirmed by the client carries `placeholder: true` and/or a `TODO:` comment.
 * While `showPlaceholderMarkers` is true, the UI renders a small "TBC" marker
 * next to placeholder values so they are impossible to miss during review.
 * Set it to false only after CONTENT-TODO.md is fully ticked off.
 */

export type Placeholder<T> = { value: T; placeholder?: boolean };

export const site = {
  name: "Akshay Enterprise",
  shortName: "Akshay",
  legalName: "Akshay Enterprise", // TODO: confirm registered legal entity name (Proprietorship / LLP / Pvt Ltd)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.akshayenterprise.com", // TODO: confirm production domain
  locale: "en",

  showPlaceholderMarkers: false,

  tagline: "Precision turned components in brass and engineering metals.",
  description:
    "Akshay Enterprise manufactures precision turned and machined components in brass, stainless steel, mild steel, aluminium and copper for OEMs in India and export markets. Build-to-print, drawing and sample based development.",
  keywords: [
    "precision turned components manufacturer India",
    "brass components exporter Gujarat",
    "custom brass parts",
    "CNC turned parts",
    "brass electrical parts",
    "brass inserts manufacturer",
  ],

  founded: { value: "1997", placeholder: false } as Placeholder<string>,

  contact: {
    addressLines: [
      "GIDC Industrial Estate", // TODO: plot no. / street address
      "Gujarat, India", // TODO: city + PIN
    ],
    city: "Gujarat", // TODO: replace with city once confirmed
    region: "Gujarat",
    country: "IN",
    phone: { display: "+91 00000 00000", href: "tel:+910000000000", placeholder: true }, // TODO: real number, then placeholder: false (hidden until then)
    email: { display: "sales@akshayenterprise.com", href: "mailto:sales@akshayenterprise.com", placeholder: true }, // TODO
    whatsapp: { number: "910000000000", placeholder: true }, // TODO: international format, digits only, then placeholder: false (hidden until then)
    hours: { value: "Mon to Sat, 09:30 to 18:30 IST", placeholder: true }, // TODO
    mapEmbedQuery: "Gujarat, India", // TODO: replace with exact factory address / Google Maps place name
  },

  quoteTurnaroundHours: { value: 48, placeholder: true } as Placeholder<number>, // TODO: confirm RFQ response time

  social: [
    { label: "LinkedIn", href: "" }, // TODO: add URL (empty hrefs are hidden automatically)
    { label: "YouTube", href: "" },
    { label: "Instagram", href: "" },
  ],

  stats: [
    { value: 25, suffix: "+", label: "Years of turning experience", placeholder: false },
    { value: 1.5, suffix: "M", decimals: 1, label: "Parts per month capacity", placeholder: false },
    { value: 45, suffix: "+", label: "Machines on the shop floor", placeholder: false },
    { value: 25, suffix: "+", label: "Export countries", placeholder: false },
    { value: 200, suffix: "+", label: "OEM and trade clients", placeholder: false },
  ],

  /** Certifications held. TODO: confirm each; remove what is not held; add certificate PDFs in /public/downloads */
  certifications: [
    { code: "ISO 9001:2015", label: "Quality management system", placeholder: true },
    { code: "RoHS", label: "Restricted substances compliance", placeholder: true },
    { code: "REACH", label: "EU chemical regulation compliance", placeholder: true },
    { code: "Udyam", label: "MSME registration", placeholder: true },
  ],

  /** Standards the shop routinely manufactures to. TODO: confirm with engineering. */
  standards: [
    "BS EN 12164 CW614N",
    "ASTM B16 C36000",
    "IS 319 free-cutting brass",
    "ISO 965 metric threads",
    "BS EN ISO 228 BSP",
    "ASME B1.20.1 NPT",
    "ASME B1.1 UNC / UNF",
    "RoHS",
    "REACH",
    "ISO 9001:2015",
  ],

  differentiators: [
    {
      title: "Custom development",
      body: "Send a drawing or a sample. We reverse-engineer, propose tooling and approve a first-off before volume.",
      icon: "PencilRuler",
      image: "micrometerFlange" as PhotoKey,
      proof: "First-off sample with a dimensional report",
    },
    {
      title: "Tight tolerances",
      body: "Diameters held to hundredths of a millimetre, verified at the machine and again before packing.",
      icon: "Crosshair",
      image: "caliperPart" as PhotoKey,
      proof: "Critical diameters to ±0.01 mm",
      placeholder: true,
    },
    {
      title: "Material flexibility",
      body: "Free-cutting and DZR brass, stainless, mild steel, aluminium and copper from one supplier.",
      icon: "Layers",
      image: "barStock" as PhotoKey,
      proof: "Six material families, one supplier",
    },
    {
      title: "Export-ready packing",
      body: "Part-wise labelling, moisture protection, palletisation and the documents your customs broker asks for.",
      icon: "PackageCheck",
      image: "warehouse" as PhotoKey,
      proof: "VCI packing, pallets, certificate of origin",
    },
    {
      title: "On-time delivery",
      body: "Capacity planned against your schedule, with dispatch dates confirmed when the order is placed.",
      icon: "CalendarClock",
      image: "factoryLine" as PhotoKey,
      proof: "Dispatch date confirmed with every order",
    },
    {
      title: "Engineering on the line",
      body: "Queries go to the engineer responsible for your part and are answered the same working day.",
      icon: "MessagesSquare",
      image: "inspector" as PhotoKey,
      proof: "Same working-day replies",
    },
  ],

  /** TODO: replace with real, approved client testimonials (with written permission). Never invent names. */
  testimonials: [
    {
      quote: "Placeholder testimonial. Replace with an approved quote about part quality or delivery performance.",
      role: "Head of Sourcing",
      company: "Electrical OEM, Europe",
      placeholder: true,
    },
    {
      quote: "Placeholder testimonial. Replace with an approved quote about development support on a new part.",
      role: "Purchase Manager",
      company: "Plumbing brand, Middle East",
      placeholder: true,
    },
    {
      quote: "Placeholder testimonial. Replace with an approved quote about export documentation and packing.",
      role: "Supply Chain Lead",
      company: "Gas equipment maker, Africa",
      placeholder: true,
    },
  ],
} as const;

export type Site = typeof site;

/** The phone and WhatsApp numbers are hidden site-wide until real ones are filled in, so no link dials a dummy number. */
export const hasPhone = !site.contact.phone.placeholder;
export const hasWhatsapp = !site.contact.whatsapp.placeholder;

export function whatsappHref(message = "Hello Akshay Enterprise, I would like to discuss a part.") {
  return `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
