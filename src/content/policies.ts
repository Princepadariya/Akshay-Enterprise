import type { LegalDoc } from "./legal";

/**
 * Company policies (EHS, Quality, Cyber security, Conflict minerals, Counterfeit parts).
 * TODO: These are complete drafts based on recognised frameworks, written for a precision turned-parts
 * manufacturer. Management must review, adjust to actual practice, approve and sign each one before
 * launch. Set `updated` to the approval date and `approvedBy` to the signatory. Certifications held:
 * IATF 16949, ISO 9001, ISO 14001, ISO 45001 and RoHS (see /docs/certificates). Do not reference
 * any other certification (e.g. ISO 27001) unless it is actually held.
 */

export type Policy = LegalDoc & {
  slug: string;
  short: string;
  summary: string;
  icon: "HardHat" | "BadgeCheck" | "ShieldCheck" | "Pickaxe" | "ScanSearch";
  approvedBy: string;
  placeholder: boolean;
};

export const policies: Policy[] = [
  {
    slug: "ehs",
    short: "EHS",
    title: "Environment, Health and Safety Policy",
    icon: "HardHat",
    summary: "How we protect our people, prevent pollution and run the plant within the law.",
    updated: "", // TODO
    approvedBy: "Managing Director", // TODO: name
    placeholder: true,
    intro:
      "Akshay Enterprise is committed to providing a safe and healthy workplace for everyone on our premises and to minimising the environmental impact of our machining operations. Safe working and responsible manufacturing are conditions of doing business, not targets to trade against output. Our environmental and occupational health and safety management systems are certified to ISO 14001:2015 and ISO 45001:2018.",
    sections: [
      {
        heading: "Scope",
        body: [
          "This policy applies to all employees, contract workers, visitors and service providers at our manufacturing plant, and to every activity we control: machining, secondary operations, material handling, finishing coordination, packing and dispatch.",
        ],
      },
      {
        heading: "Our commitments",
        body: [
          "Comply with all applicable environment, health and safety laws, including the Factories Act, 1948, the Environment (Protection) Act, 1986, and the consents and conditions issued by the Gujarat Pollution Control Board, as well as customer requirements we accept.",
          "Identify hazards and assess risks before work starts, and control them using the hierarchy of controls: eliminate, substitute, engineer, administer, and only then rely on personal protective equipment.",
          "Prevent injury and ill health, and aim for zero lost-time incidents.",
          "Prevent pollution and use resources efficiently, with particular attention to coolant, lubricating oils, metal chips and energy.",
          "Consult and involve our workers on matters that affect their safety.",
        ],
      },
      {
        heading: "Workplace safety",
        body: [
          "Machine guarding and interlocks are kept in place and in working order on every turning centre, automat and secondary machine. Guards are never bypassed to save time.",
          "Appropriate PPE (safety glasses, safety footwear, gloves where safe to use near rotating parts, and hearing protection in high-noise areas) is issued free of charge and its use is enforced.",
          "Bar loading, lifting and material handling follow written safe methods, and lifting equipment is inspected at the intervals required by law.",
          "Electrical installations, compressed-air systems and fire-fighting equipment are maintained and inspected, and emergency drills are carried out at least once a year.",
          "First-aid facilities and trained first-aiders are available on every shift.",
        ],
      },
      {
        heading: "Environment",
        body: [
          "Brass and other metal chips are segregated by alloy at the machine, de-oiled and sent for recycling. Mixed scrap is avoided so material keeps its value.",
          "Cutting fluids are managed through filtration to extend their life. Spent oils, coolant sludge and other hazardous wastes are stored safely and handed only to authorised recyclers or processors, with records kept.",
          "Energy use is monitored and reduced through machine-loading planning, compressed-air leak control and efficient equipment.",
          "Plating and surface finishing are carried out by partners who hold the environmental consents required for that work.",
        ],
      },
      {
        heading: "Training and responsibilities",
        body: [
          "Every new employee and contract worker receives safety induction before starting work, and job-specific training before operating any machine.",
          "Management provides the resources needed to implement this policy. Supervisors are responsible for safe working in their areas. Every person has the right and the duty to stop work they believe is unsafe and to report hazards, incidents and near misses without fear of blame.",
        ],
      },
      {
        heading: "Incidents and improvement",
        body: [
          "All incidents and near misses are recorded and investigated to find the root cause, and corrective actions are tracked to completion.",
          "EHS objectives are set every year, performance is reviewed by management, and this policy is reviewed at least annually and communicated to all workers.",
        ],
      },
    ],
  },
  {
    slug: "quality",
    short: "Quality",
    title: "Quality Policy",
    icon: "BadgeCheck",
    summary: "Our commitment to parts that conform to the drawing, delivered on the date agreed.",
    updated: "", // TODO
    approvedBy: "Managing Director", // TODO: name
    placeholder: true,
    intro:
      "Akshay Enterprise is committed to supplying precision components that conform to customer drawings and specifications, delivered on time. We achieve this through controlled processes, trained people, calibrated measuring equipment and continual improvement of our quality management system, which is certified to ISO 9001:2015 and to the automotive standard IATF 16949.",
    sections: [
      {
        heading: "Our commitments",
        body: [
          "Understand each customer's requirements fully before we accept an order, including drawing tolerances, material grade, finish, packing and documentation.",
          "Make every part right the first time, and never knowingly ship a non-conforming part.",
          "Deliver on the date we confirm, and tell the customer early if a date is at risk.",
          "Meet all applicable statutory, regulatory and customer-specific requirements.",
          "Continually improve our processes, products and quality management system.",
        ],
      },
      {
        heading: "How we put this into practice",
        body: [
          "Every drawing is reviewed for manufacturability before quotation, and critical-to-function characteristics are agreed with the customer.",
          "Raw material is accepted only against mill certificates and verified on receipt.",
          "Production starts only after first-piece approval, runs with patrol inspection at a defined frequency, and is released only after final inspection against the drawing.",
          "Measuring instruments and gauges are calibrated at defined intervals against traceable standards, and their status is visible at the point of use.",
          "Non-conforming product is identified, segregated and dispositioned under control, and customers are informed where their product is affected.",
        ],
      },
      {
        heading: "Objectives and measurement",
        body: [
          "We set measurable quality objectives each year, including customer-reported defects (ppm), on-time delivery and internal rejection rates, and review progress at management review meetings.",
          "Every customer complaint receives a root-cause analysis and corrective action, typically documented in an 8D report.",
        ],
      },
      {
        heading: "People",
        body: [
          "Operators and inspectors are trained and assessed for the work they do. Every employee understands how their work affects the quality of the parts we ship and has the authority to stop a process they believe is producing defects.",
        ],
      },
      {
        heading: "Review",
        body: [
          "This policy is communicated to all employees, displayed in the plant, made available to customers and interested parties, and reviewed at least once a year for continuing suitability.",
        ],
      },
    ],
  },
  {
    slug: "cyber-security",
    short: "Cyber security",
    title: "Cyber Security and Information Protection Policy",
    icon: "ShieldCheck",
    summary: "How we protect customer drawings, data and our systems.",
    updated: "", // TODO
    approvedBy: "Managing Director", // TODO: name
    placeholder: true,
    intro:
      "Customers trust us with drawings, 3D models, specifications and commercial information. Akshay Enterprise protects that information, and the systems that hold it, against loss, theft, misuse and unauthorised disclosure.",
    sections: [
      {
        heading: "Scope",
        body: [
          "This policy covers all information we receive or create in the course of business, including customer drawings and models, quotations, purchase orders and personal data, and all computers, servers, networks, cloud services, machine controllers and mobile devices used to process it.",
        ],
      },
      {
        heading: "Protecting customer drawings and intellectual property",
        body: [
          "Customer drawings and technical data are used only to quote, manufacture and inspect that customer's parts. They are never shared with other customers or with third parties, except subcontractors who need them for the work and who are bound by confidentiality.",
          "Access to drawings is limited to the people who need it for their role. We sign non-disclosure agreements on request and honour their terms.",
          "When a customer asks, or a programme ends, drawings and data are returned or securely deleted as agreed.",
        ],
      },
      {
        heading: "Access control",
        body: [
          "Every user has an individual account; shared logins are not permitted. Access rights follow the least-privilege principle and are removed promptly when a person changes role or leaves.",
          "Strong passwords are required, and multi-factor authentication is enabled for email, cloud storage and remote access.",
        ],
      },
      {
        heading: "Systems and network security",
        body: [
          "Operating systems, software and firmware are kept up to date with security patches, and endpoint protection is installed and active on all computers.",
          "Office and machine networks are protected by firewalls. Machine controllers and the programs loaded to them are protected from unauthorised changes.",
          "Business-critical data is backed up regularly, with at least one copy held offline or off site, and restoration is tested periodically.",
          "Information sent over the internet is protected with encryption, and portable devices and removable media are encrypted or controlled.",
        ],
      },
      {
        heading: "People and awareness",
        body: [
          "Employees receive training on information security, including how to recognise phishing and social-engineering attempts, and agree to an acceptable-use policy for company systems.",
          "Suppliers and service providers who handle our or our customers' information must protect it to an equivalent standard.",
        ],
      },
      {
        heading: "Incident response",
        body: [
          "Suspected security incidents are reported immediately, contained, investigated and recorded. Where a customer's information may have been affected, the customer is informed without undue delay, together with the actions taken.",
          "Personal data is handled in line with the Digital Personal Data Protection Act, 2023 and our privacy policy.",
        ],
      },
      {
        heading: "Reporting a concern",
        body: [
          "If you believe you have found a security weakness in our systems or website, please report it to the email address on our contact page. We will acknowledge and investigate every report.",
        ],
      },
    ],
  },
  {
    slug: "conflict-minerals",
    short: "Conflict minerals",
    title: "Conflict Minerals Policy",
    icon: "Pickaxe",
    summary: "Our approach to responsible sourcing of tin, tantalum, tungsten and gold (3TG).",
    updated: "", // TODO
    approvedBy: "Managing Director", // TODO: name
    placeholder: true,
    intro:
      "Akshay Enterprise does not want the materials in our products to finance armed conflict or contribute to human-rights abuses. We support our customers' responsible-sourcing programmes and expect the same commitment from our own suppliers.",
    sections: [
      {
        heading: "Background",
        body: [
          "\"Conflict minerals\" refers to tin, tantalum, tungsten and gold (3TG) and their derivatives where they may originate in the Democratic Republic of the Congo or an adjoining country and finance armed groups. Regulations including Section 1502 of the US Dodd-Frank Act and the EU Conflict Minerals Regulation (EU) 2017/821 require companies to exercise due diligence on these materials.",
          "Our main materials are copper-zinc brasses, stainless and mild steels, aluminium and copper. 3TG can still be present in our supply chain, for example tin in bronze alloys and tin plating, and gold in some electrical platings, so we apply this policy to all of our sourcing.",
        ],
      },
      {
        heading: "Our commitments",
        body: [
          "Follow the OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas as the framework for our due diligence.",
          "Not knowingly source materials containing 3TG that directly or indirectly finance or benefit armed groups.",
          "Work with suppliers to trace 3TG to the smelter or refiner level and favour smelters and refiners validated as conformant under the Responsible Minerals Assurance Process (RMAP).",
        ],
      },
      {
        heading: "Supplier expectations",
        body: [
          "Suppliers of materials, platings and components that may contain 3TG are expected to adopt an equivalent policy, perform due diligence on their own supply chains, and provide a completed Conflict Minerals Reporting Template (CMRT) on request.",
          "Where a supplier cannot provide adequate information, or a risk is identified, we will work with them on improvement and, if necessary, seek alternative sources.",
        ],
      },
      {
        heading: "Customer reporting",
        body: [
          "On request, we provide customers with a completed CMRT for the parts we supply, based on information from our supply chain, and update it when that information changes.",
          "Customers with questions about conflict minerals or cobalt and mica reporting may contact us through the details on our contact page.",
        ],
      },
      {
        heading: "Review",
        body: ["This policy is reviewed annually and whenever relevant regulations or industry guidance change."],
      },
    ],
  },
  {
    slug: "counterfeit-parts",
    short: "Counterfeit parts",
    title: "Counterfeit and Suspect Material Prevention Policy",
    icon: "ScanSearch",
    summary: "How we keep counterfeit, misrepresented or untraceable material out of our parts.",
    updated: "", // TODO
    approvedBy: "Managing Director", // TODO: name
    placeholder: true,
    intro:
      "Counterfeit or misrepresented material, such as bar stock that is not the grade certified or a bought-in item that is not what it claims to be, can cause parts to fail in service. Akshay Enterprise is committed to preventing counterfeit and suspect material from entering the products we supply.",
    sections: [
      {
        heading: "Scope",
        body: [
          "This policy applies to all raw materials (bar, wire and sections), bought-in components such as screws, washers and seals supplied in kits, and outsourced services such as plating and heat treatment that become part of our products.",
          "Our approach follows the principles of SAE AS6174 (counterfeit and fraudulent materiel) as they apply to a manufacturer of machined components.",
        ],
      },
      {
        heading: "Approved and traceable sources",
        body: [
          "Materials and components are purchased only from mills, manufacturers or their authorised distributors on our approved supplier list. Purchases from unauthorised brokers or unknown sources are not permitted without documented approval and additional verification.",
          "Every lot of raw material must be supported by a mill test certificate stating grade, chemical composition and heat number. Heat and batch numbers are carried through production and appear on our dispatch documentation, so any part can be traced back to its material.",
        ],
      },
      {
        heading: "Verification",
        body: [
          "Incoming material is checked against its certificate and purchase order: grade, dimensions, markings and quantity. Where available, chemical composition is verified by spectrometer or XRF analysis on a sampling basis, and on every lot from a new source.",
          "Plating thickness and finish from outsourced finishing partners are verified on return.",
        ],
      },
      {
        heading: "Suspect material",
        body: [
          "Material or components that cannot be verified, show inconsistent markings or certificates, or fail verification are treated as suspect. They are immediately identified, quarantined and kept out of production until investigated.",
          "Confirmed counterfeit or fraudulent material is never returned to the supplier for credit where it could re-enter the supply chain. It is retained or destroyed under control, and the affected customers and, where appropriate, the relevant authorities are informed.",
        ],
      },
      {
        heading: "Training and supplier requirements",
        body: [
          "Purchasing, stores and inspection staff are trained to recognise signs of counterfeit or misrepresented material.",
          "Suppliers are required to supply genuine, traceable material, to flow these requirements down to their own suppliers, and to notify us immediately if they become aware of counterfeit or suspect material they may have supplied.",
        ],
      },
      {
        heading: "Review",
        body: ["This policy is reviewed annually as part of our management review."],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
