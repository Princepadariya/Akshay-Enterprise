import { z } from "zod";
import { categories } from "@/content/products";
import { materials } from "@/content/materials";

/** Shared between the client forms and the route handlers. */

export const ACCEPTED_EXTENSIONS = [".pdf", ".dwg", ".dxf", ".step", ".stp", ".igs", ".iges", ".jpg", ".jpeg", ".png", ".webp"];
export const MAX_FILES = 5;
/** Vercel serverless request bodies are capped at ~4.5 MB. Larger files need direct-to-storage upload (see README). */
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const categoryValues: [string, ...string[]] = ["other", ...categories.map((c) => c.slug)];
const materialValues: [string, ...string[]] = ["other", "not-sure", ...materials.map((m) => m.key)];

export const rfqContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  company: z.string().trim().min(2, "Please enter your company"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a phone number with country code"),
  country: z.string().trim().min(2, "Please enter your country"),
});

export const rfqPartSchema = z.object({
  category: z.enum(categoryValues, { error: "Choose a product category" }),
  product: z.string().trim().max(120).optional().or(z.literal("")),
  material: z.enum(materialValues, { error: "Choose a material" }),
  quantity: z
    .string()
    .trim()
    .min(1, "Enter a quantity")
    .regex(/^[0-9][0-9,\s]*$/, "Numbers only"),
  targetPrice: z.string().trim().max(60).optional().or(z.literal("")),
  deliveryCountry: z.string().trim().min(2, "Where should we deliver?"),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const rfqSchema = rfqContactSchema.extend(rfqPartSchema.shape).extend({
  consent: z.literal(true, { error: "Please accept the privacy policy" }),
  website: z.string().max(0).optional(), // honeypot
});

export type RfqValues = z.infer<typeof rfqSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (10 characters minimum)").max(4000),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactValues = z.infer<typeof contactSchema>;

export function validateFiles(files: File[]): string | null {
  if (files.length > MAX_FILES) return `Attach up to ${MAX_FILES} files.`;
  const total = files.reduce((s, f) => s + f.size, 0);
  if (total > MAX_TOTAL_BYTES) return `Total attachment size must be under ${Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} MB.`;
  const bad = files.find((f) => !ACCEPTED_EXTENSIONS.some((ext) => f.name.toLowerCase().endsWith(ext)));
  if (bad) return `${bad.name} is not an accepted file type.`;
  return null;
}
