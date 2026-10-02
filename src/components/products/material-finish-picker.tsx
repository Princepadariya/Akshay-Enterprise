import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { finishes, materials, type FinishKey, type MaterialKey } from "@/content/materials";

/**
 * Visual sample for each finish. Illustrative only: these show the character of the surface
 * (bright, satin, matte, tinted), not a colour match.
 */
const FINISH_SWATCH: Record<FinishKey, string> = {
  natural: "linear-gradient(135deg,#8a6428,#e2c283 48%,#a67c36)",
  nickel: "linear-gradient(135deg,#8f949a,#eceef0 48%,#9da2a8)",
  tin: "linear-gradient(135deg,#a9adb1,#d3d6d8 50%,#b4b8bb)",
  chrome: "linear-gradient(135deg,#5f666d,#ffffff 42%,#7d848b 58%,#eef1f3)",
  silver: "linear-gradient(135deg,#c3c6c9,#fbfbfb 50%,#c9ccce)",
  zinc: "linear-gradient(135deg,#94a6b9,#e3eaf1 50%,#9fb0c1)",
  passivated: "linear-gradient(135deg,#7f868d,#cfd4d8 50%,#8b9298)",
  anodised: "linear-gradient(135deg,#27313d,#5d7593 50%,#2b3644)",
};

/** Materials as metallic swatch chips (link to the material) and finishes as sample tiles with their note. */
export function MaterialFinishPicker({ materialKeys, finishKeys }: { materialKeys: MaterialKey[]; finishKeys: FinishKey[] }) {
  const mats = materialKeys.map((k) => materials.find((m) => m.key === k)).filter((m) => m !== undefined);
  const fins = finishKeys.map((k) => finishes.find((f) => f.key === k)).filter((f) => f !== undefined);

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Materials</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {mats.map((m) => (
            <li key={m.key}>
              <Link
                href={`/materials#${m.key}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pr-3.5 pl-1.5 text-sm transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brass/60"
              >
                <span
                  aria-hidden
                  className="metal-sheen relative size-7 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]"
                  style={{ background: m.swatch }}
                />
                <span className="font-medium">{m.name}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{m.grades[0]}</span>
                <ArrowUpRight strokeWidth={1.5} className="size-3.5 text-muted-foreground transition-colors group-hover:text-brass-ink" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Finishes</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {fins.map((f) => (
            <li
              key={f.key}
              className="flex items-center gap-3 rounded-sm border border-border bg-card p-2.5 transition-colors duration-300 hover:border-brass/50"
            >
              <span
                aria-hidden
                className="size-10 shrink-0 rounded-[3px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.15)]"
                style={{ background: FINISH_SWATCH[f.key] }}
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{f.name}</span>
                <span className="block text-xs leading-snug text-muted-foreground">{f.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
