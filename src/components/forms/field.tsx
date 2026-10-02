import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Label above, control, helper text, error below. Wires aria-describedby for both. */
export function Field({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // content-start: when a neighbouring field in the same row grows, this one keeps its layout.
    <div className={cn("grid content-start gap-2", className)}>
      <Label htmlFor={id} className="text-[13px] font-medium text-foreground">
        {label}
        {optional ? <span className="font-normal text-muted-foreground"> (optional)</span> : null}
      </Label>
      {children}
      {/* one reserved line shared by hint and error, so showing an error never shifts the form */}
      <p
        id={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        role={error ? "alert" : undefined}
        className={cn("text-xs transition-colors", error ? "font-medium text-destructive" : "text-muted-foreground")}
        style={{ minHeight: "1rem", lineHeight: "1rem" }}
      >
        {error ?? hint}
      </p>
    </div>
  );
}

export const inputClass =
  "h-11 rounded-sm border-input bg-background text-[15px] placeholder:text-muted-foreground/80 focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30 aria-invalid:border-destructive";

/** Visually hidden honeypot. Real users never see or fill it. */
export function Honeypot({ register }: { register: object }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}
