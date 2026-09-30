/**
 * Z-index scale. Only these layers use z-index; everything else relies on DOM order.
 *   header      40  sticky site header
 *   floating    45  WhatsApp button, mobile quote bar
 *   overlay     50  sheets, dialogs, lightbox (shadcn defaults)
 *   grain       70  fixed film-grain layer (pointer-events: none)
 */
export const Z = { header: 40, floating: 45, overlay: 50, grain: 70 } as const;
