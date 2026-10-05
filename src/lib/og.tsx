import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: graphite field, blueprint grid, accent badge and rule, mono spec line. */
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
          background: "#0f0a09",
          backgroundImage:
            "linear-gradient(rgba(244,236,229,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(244,236,229,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#f4ece5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "radial-gradient(circle at 32% 26%,#f08a3c,#c13a10 35%,#af2f0c 62%,#4a0c03)",
              border: "3px solid #c9cbcf",
              borderRadius: 999,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>AKSHAY</span>
            <span style={{ fontSize: 14, letterSpacing: 6, color: "#ab9d93" }}>ENTERPRISE</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 22, letterSpacing: 4, color: "#f8d9b9", textTransform: "uppercase" }}>{kicker}</span>
          <span style={{ fontSize: title.length > 40 ? 64 : 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 120, height: 3, background: "linear-gradient(90deg,#6e1d07,#e0603a,#af2f0c)" }} />
          <span style={{ fontSize: 22, color: "#ab9d93", fontFamily: "monospace" }}>{spec ?? "Precision turned components  |  Gujarat, India"}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
