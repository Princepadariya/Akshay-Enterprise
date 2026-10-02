"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Small icon button that copies text to the clipboard and confirms with a tick for a moment. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked (permissions / insecure context): leave the value selectable instead
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brass/60 hover:text-brass-ink"
    >
      {copied ? <Check strokeWidth={2} className="size-3.5 text-brass-ink" /> : <Copy strokeWidth={1.5} className="size-3.5" />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
