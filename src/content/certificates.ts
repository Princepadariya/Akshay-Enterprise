/**
 * Certifications shown on the site: name and the certifying body's logo only (the certificate
 * documents themselves are not published; the supplied copies are kept in /docs/certificates).
 * Logos in /public/logos were taken from those certificates.
 */
export type Certification = {
  /** official standard name, shown as the title */
  code: string;
  /** what the standard covers, used for alt text and search descriptions */
  label: string;
  logo: { src: string; alt: string; width: number; height: number };
};

const LMS = { src: "/logos/lms.png", alt: "LMS Certifications logo", width: 230, height: 137 };

export const certifications: Certification[] = [
  { code: "IATF 16949", label: "Automotive quality management system", logo: { src: "/logos/iatf.png", alt: "IATF logo", width: 148, height: 118 } },
  { code: "ISO 9001:2015", label: "Quality management system", logo: LMS },
  { code: "ISO 14001:2015", label: "Environmental management system", logo: LMS },
  { code: "ISO 45001:2018", label: "Occupational health and safety management system", logo: LMS },
  { code: "RoHS", label: "Restriction of hazardous substances compliance", logo: { src: "/logos/qsa.png", alt: "QSA International logo", width: 455, height: 235 } },
];
