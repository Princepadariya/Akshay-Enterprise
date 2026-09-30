"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Click-to-load Google Map. No third-party request (or cookies) until the visitor asks for it,
 * which also keeps Lighthouse scores intact.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [load, setLoad] = useState(false);
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=11&output=embed`;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface">
      {load ? (
        <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full grayscale-[0.6]" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div aria-hidden className="grid-lines absolute inset-0 opacity-80" />
          <div className="relative grid place-items-center gap-3 text-center">
            <MapPin strokeWidth={1.5} className="size-8 text-brass" />
            <p className="text-sm text-muted-foreground">Map loads from Google on request.</p>
            <Button variant="outline" size="sm" onClick={() => setLoad(true)}>
              Show map
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
