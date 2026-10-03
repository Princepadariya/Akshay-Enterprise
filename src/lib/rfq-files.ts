/**
 * Drawing upload limits. Kept free of zod so light client components (the home page drop zone)
 * can import them without pulling the validation library into every page.
 */
export const ACCEPTED_EXTENSIONS = [".pdf", ".dwg", ".dxf", ".step", ".stp", ".igs", ".iges", ".jpg", ".jpeg", ".png", ".webp"];
export const MAX_FILES = 5;
/** Vercel serverless request bodies are capped at ~4.5 MB. Larger files need direct-to-storage upload (see README). */
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
