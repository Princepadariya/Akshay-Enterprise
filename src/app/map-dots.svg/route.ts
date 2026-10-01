import { getDotsSvg } from "@/lib/world-map";

// Built once at build time and served as a static, long-cached file.
export const dynamic = "force-static";

export function GET() {
  return new Response(getDotsSvg(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
