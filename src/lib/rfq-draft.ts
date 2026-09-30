"use client";

/**
 * Hand-off for files dropped on the home page CTA. Client-side navigation keeps this module
 * in memory, so the RFQ form can pick the files up in its drawing step. Nothing is persisted.
 */
let pending: File[] = [];

export function setPendingDrawings(files: File[]) {
  pending = files;
}

/** Non-destructive read (safe inside React state initialisers, which may run twice in dev). */
export function peekPendingDrawings(): File[] {
  return pending;
}

export function clearPendingDrawings() {
  pending = [];
}
