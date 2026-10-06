/**
 * Details shown with each certificate file in /public/certificates. A file picks up the first entry
 * whose `match` fits its file name, so files can be renamed or replaced with renewed copies without
 * touching this list. A file with no match still appears, titled from its file name.
 * Source: the certificate documents supplied by Akshay Enterprise.
 */
export type CertificateDetail = {
  match: RegExp;
  /** official standard name, shown as the title */
  code: string;
  /** what the standard covers, in plain words */
  label: string;
  issuer: string;
  number: string;
  scope: string;
};

export const certificateDetails: CertificateDetail[] = [
  {
    match: /IATF\s*16949/i,
    code: "IATF 16949",
    label: "Automotive quality management system",
    issuer: "TÜV SÜD Management Service GmbH",
    number: "IATF 0599222",
    scope: "Manufacture of brass machined components",
  },
  {
    match: /ISO\s*9001/i,
    code: "ISO 9001:2015",
    label: "Quality management system",
    issuer: "LMS Certifications Pvt. Ltd.",
    number: "IN124492A",
    scope: "Manufacture of brass extrusion rod and brass machined components",
  },
  {
    match: /ISO\s*14001/i,
    code: "ISO 14001:2015",
    label: "Environmental management system",
    issuer: "LMS Certifications Pvt. Ltd.",
    number: "IN122099B",
    scope: "Manufacture of brass machined components",
  },
  {
    match: /ISO\s*45001/i,
    code: "ISO 45001:2018",
    label: "Occupational health and safety management system",
    issuer: "LMS Certifications Pvt. Ltd.",
    number: "IN122099C-1",
    scope: "Manufacture of brass machined components",
  },
  {
    match: /RoHS/i,
    code: "RoHS",
    label: "Restriction of hazardous substances compliance",
    issuer: "QSA International Ltd., UK",
    number: "QSA-1503404",
    scope: "Ferrous and non-ferrous extrusion rod and precision brass components",
  },
];
