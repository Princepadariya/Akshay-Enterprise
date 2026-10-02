/** Row of instrument ticks (every sixth a major graduation), drawn in currentColor. */
export function InstrumentScale({ ticks = 25, style, ...rest }: React.HTMLAttributes<HTMLSpanElement> & { ticks?: number; "data-sweep"?: boolean }) {
  return (
    <span aria-hidden {...rest} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", ...style }}>
      {Array.from({ length: ticks }, (_, i) => (
        <span key={i} style={{ width: 1, height: i % 6 === 0 ? 12 : 6, background: "currentColor" }} />
      ))}
    </span>
  );
}
