"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import { setPendingDrawings } from "@/lib/rfq-draft";
import { ACCEPTED_EXTENSIONS } from "@/lib/rfq-schema";
import { cn } from "@/lib/utils";

/** Upload shortcut: drop a drawing here, continue in the RFQ form with the file attached. */
export function DrawingDrop() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const handle = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setPendingDrawings(Array.from(list));
    router.push("/request-quote?step=drawing");
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-8 text-center transition-colors duration-300",
        over ? "border-brass bg-brass-soft" : "border-foreground/25 bg-background/60",
      )}
    >
      <FileUp strokeWidth={1.5} className="size-8 text-brass" />
      <p className="font-medium">Drop your drawing here</p>
      <p className="font-mono text-[11px] text-muted-foreground">PDF  DWG  DXF  STEP  JPG  PNG</p>
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="mt-1 text-sm font-medium text-brass-ink underline underline-offset-4"
      >
        or browse files
      </button>
      <input
        ref={input}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="sr-only"
        tabIndex={-1}
        aria-label="Upload drawing"
        onChange={(e) => handle(e.target.files)}
      />
    </div>
  );
}
