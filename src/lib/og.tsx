import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: graphite field, blueprint grid, brass rule, mono spec line. */
export function renderOg({ title, kicker, spec }: { title: string; kicker: string; spec?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0d10",
          backgroundImage:
            "linear-gradient(rgba(236,235,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(236,235,230,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#ecebe6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "linear-gradient(135deg,#8a6428,#e6c98e 40%,#b88c45 70%,#d4ae6c)",
              clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>AKSHAY</span>
            <span style={{ fontSize: 14, letterSpacing: 6, color: "#9aa0a9" }}>ENTERPRISE</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 22, letterSpacing: 4, color: "#d8b574", textTransform: "uppercase" }}>{kicker}</span>
          <span style={{ fontSize: title.length > 40 ? 64 : 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 120, height: 3, background: "linear-gradient(90deg,#8a6428,#e6c98e,#b88c45)" }} />
          <span style={{ fontSize: 22, color: "#9aa0a9", fontFamily: "monospace" }}>{spec ?? "Precision turned components  |  Gujarat, India"}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
