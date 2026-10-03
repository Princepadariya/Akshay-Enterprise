"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Prints the current page; print styles in globals.css hide navigation and decoration. */
export function PrintButton({ label = "Print checklist" }: { label?: string }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={() => window.print()} className="print-hide">
      <Printer strokeWidth={1.5} /> {label}
    </Button>
  );
}
