/**
 * FAQ content. Rendered on /faq with FAQPage JSON-LD.
 * TODO: every answer marked `placeholder` must be confirmed by the client (commercial terms especially).
 */

export type Faq = { q: string; a: string; group: string; placeholder?: boolean };

export const faqs: Faq[] = [
  {
    group: "Ordering",
    q: "What is your minimum order quantity?",
    a: "MOQ depends on the part, material and process. For standard turned parts it typically starts at a few thousand pieces; development and prototype lots can be smaller. Share your annual requirement and we will quote the most economical batch size.",
    placeholder: true,
  },
  {
    group: "Ordering",
    q: "What are your typical lead times?",
    a: "Samples for approval are usually ready in 2 to 3 weeks from drawing sign-off. Production lead time depends on quantity and finishing, and is confirmed with the order.",
    placeholder: true,
  },
  {
    group: "Ordering",
    q: "What payment terms do you work with?",
    a: "For export orders we commonly work with advance payment or letter of credit for first orders, moving to agreed credit terms for repeat business. Domestic terms are agreed case by case.",
    placeholder: true,
  },
  {
    group: "Development",
    q: "Can you develop a part from a sample?",
    a: "Yes. Send us the physical sample and your requirements. We measure it, prepare a drawing for your approval, and then produce first-off samples.",
  },
  {
    group: "Development",
    q: "Which drawing formats do you accept?",
    a: "PDF, DWG, DXF and STEP files are preferred. Photographs with key dimensions are useful for early budgetary quotes.",
  },
  {
    group: "Development",
    q: "Do you sign NDAs?",
    a: "Yes. We are happy to sign a mutual non-disclosure agreement before you share drawings.",
  },
  {
    group: "Finishing",
    q: "Which plating and finishing options are available?",
    a: "Nickel, tin, chrome, silver and zinc plating, passivation for stainless steel and anodising for aluminium. Finishing is coordinated with qualified partners and inspected before packing.",
    placeholder: true,
  },
  {
    group: "Shipping",
    q: "Do you ship internationally?",
    a: "Yes. We pack for sea and air freight and prepare the commercial invoice, packing list and certificate of origin. Common Incoterms are EXW, FOB, CIF and DAP.",
    placeholder: true,
  },
  {
    group: "Shipping",
    q: "Can you supply inspection reports with shipments?",
    a: "Yes. Dimensional inspection reports and material certificates can be supplied with each consignment on request.",
    placeholder: true,
  },
];
