import "server-only";
import fs from "node:fs";
import path from "node:path";
import { certificateDetails, type CertificateDetail } from "@/content/certificates";

/**
 * Certificates are plain files dropped into /public/certificates (PDF, JPG, PNG or WebP).
 * They are listed automatically on the Quality and Downloads pages; the file name becomes the
 * title, so name files the way they should read, e.g. "ISO 9001-2015 Quality Management.pdf".
 * Files starting with a number and a dash ("01-...") are ordered by that number, and the prefix
 * is hidden. Issuer, number and scope come from src/content/certificates.ts when the name matches.
 * Pages are static, so a new file appears after the next build / deploy.
 */

export type Certificate = {
  file: string;
  href: string;
  title: string;
  kind: "pdf" | "image";
  size: string;
  detail?: Omit<CertificateDetail, "match">;
};

const DIR = path.join(process.cwd(), "public", "certificates");
const KINDS: Record<string, Certificate["kind"]> = { ".pdf": "pdf", ".jpg": "image", ".jpeg": "image", ".png": "image", ".webp": "image" };

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function getCertificates(): Certificate[] {
  let names: string[] = [];
  try {
    names = fs.readdirSync(DIR);
  } catch {
    return [];
  }
  return names
    .filter((n) => !n.startsWith(".") && KINDS[path.extname(n).toLowerCase()])
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => {
      const ext = path.extname(file);
      const title = path
        .basename(file, ext)
        .replace(/^\d+\s*-\s*/, "")
        .replace(/[_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const found = certificateDetails.find((d) => d.match.test(file));
      const detail = found ? { code: found.code, label: found.label, issuer: found.issuer, number: found.number, scope: found.scope } : undefined;
      return {
        file,
        detail,
        href: `/certificates/${encodeURIComponent(file)}`,
        title: detail?.code ?? title,
        kind: KINDS[ext.toLowerCase()],
        size: formatSize(fs.statSync(path.join(DIR, file)).size),
      };
    });
}
