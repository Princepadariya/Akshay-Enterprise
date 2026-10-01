import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { BrassShader } from "@/components/three/brass-shader";
import { cn } from "@/lib/utils";

type Props = {
  title: React.ReactNode;
  body?: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
  children?: React.ReactNode;
};

export function CtaBand({
  title,
  body,
  primary = { label: "Request a Quote", href: "/request-quote" },
  secondary,
  className,
  children,
}: Props) {
  return (
    <section className={cn("container-x py-16 md:py-24", className)}>
      <div className="relative isolate overflow-hidden rounded-sm border border-border bg-surface">
        {/* live liquid-brass shader, masked so it only rises behind the right side; text stays on the clean surface */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_top,black,transparent_75%)] lg:opacity-100 lg:[mask-image:linear-gradient(to_left,black_20%,transparent_78%)]"
        >
          <BrassShader />
        </div>
        <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
        <div aria-hidden className="metal-brass absolute inset-y-0 left-0 w-1" />
        <div className="relative grid gap-10 p-8 md:p-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="max-w-[20ch] font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
              {title}
            </h2>
            {body ? <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">{body}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight strokeWidth={1.5} className="transition-transform group-hover/button:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              {secondary ? (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
          {children ? <div className="lg:col-span-5">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
