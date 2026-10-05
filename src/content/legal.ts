/**
 * Legal copy.
 * TODO: These are starting templates only, not legal advice. Have them reviewed by counsel
 * (India DPDP Act 2023, and GDPR if you market to EU buyers) before launch, then update `updated`.
 */

export type LegalDoc = { title: string; updated: string; intro: string; sections: { heading: string; body: string[] }[] };

export const privacyPolicy: LegalDoc = {
  title: "Privacy policy",
  updated: "", // TODO
  intro:
    "This policy explains what personal data Akshay Enterprise collects through this website, why we collect it and how you can control it.",
  sections: [
    {
      heading: "What we collect",
      body: [
        "Details you submit through the contact and quote forms: name, company, email, phone, country, part requirements and any files you attach.",
        "Basic technical data needed to deliver the site securely, such as IP address and browser type, held in server logs for a limited period.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "To respond to your enquiry, prepare quotations and manage an ongoing business relationship.",
        "To protect the site from spam and abuse (for example, rate limiting form submissions).",
        "We do not sell your data and we do not use it for unrelated marketing without your consent.",
      ],
    },
    {
      heading: "Drawings and confidential files",
      body: [
        "Files you upload are used only to evaluate and quote your requirement. They are shared internally with the people who need them and are not disclosed to third parties except service providers who process them on our behalf. We are happy to sign a non-disclosure agreement.",
      ],
    },
    {
      heading: "Service providers",
      body: [
        "Form submissions are delivered by email through a transactional email provider. The website is hosted on a cloud platform. Map content loads from Google only if you choose to display it.",
      ],
    },
    {
      heading: "Retention",
      body: ["Enquiry data is kept for as long as needed to handle your request and any resulting business relationship, and then deleted or anonymised."],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask to access, correct or delete personal data we hold about you, or withdraw consent, by writing to the email address on our contact page.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of use",
  updated: "", // TODO
  intro: "These terms govern your use of this website. By using the site you accept them.",
  sections: [
    {
      heading: "Information on this site",
      body: [
        "Product descriptions, sizes, tolerances and material data are provided for general guidance. They are not a specification or an offer. Every order is governed by the quotation, drawing and purchase order agreed in writing.",
      ],
    },
    {
      heading: "Quotations",
      body: ["Submitting a request for quotation does not create a contract. A quotation is valid for the period stated on it."],
    },
    {
      heading: "Intellectual property",
      body: [
        "Content, design and trademarks on this site belong to Akshay Enterprise or its licensors. Drawings you send remain your property.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "We take care to keep the site accurate and available, but we do not guarantee that it is error-free or uninterrupted. To the extent permitted by law, we are not liable for losses arising from use of the site.",
      ],
    },
    {
      heading: "Governing law",
      body: ["These terms are governed by the laws of India. Courts in Gujarat have jurisdiction."],
    },
  ],
};
