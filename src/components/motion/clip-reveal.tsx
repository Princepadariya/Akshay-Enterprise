import { cn } from "@/lib/utils";

/**
 * Hero media reveal: the frame wipes open from the bottom edge (clip-path) while the picture
 * inside settles from a slight zoom, like a shutter lifting. Pure CSS (see .clip-reveal in
 * globals.css), so it starts on first paint and never holds the page's main image back waiting
 * for JavaScript. Skipped under reduced motion.
 */
export function ClipReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("clip-reveal", className)}>{children}</div>;
}
