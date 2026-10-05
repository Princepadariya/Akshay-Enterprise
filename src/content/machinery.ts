/**
 * Machinery list for /infrastructure.
 * TODO: replace every row with the actual machine register (type, make, model, quantity, capacity).
 * All values below are PLACEHOLDERS so the table layout can be reviewed.
 */

export type Machine = {
  type: string;
  group: "Turning" | "Milling" | "Secondary" | "Inspection" | "Support";
  make: string;
  quantity: number;
  capacity: string;
  placeholder?: boolean;
};

export const machinery: Machine[] = [
  { type: "CNC turning centre", group: "Turning", make: "" /* TODO: make */, quantity: 12, capacity: "Bar Ø 6 to 65 mm", placeholder: true },
  { type: "Sliding-head CNC (Swiss type)", group: "Turning", make: "" /* TODO: make */, quantity: 4, capacity: "Bar Ø 2 to 20 mm", placeholder: true },
  { type: "Traub-type cam automat", group: "Turning", make: "" /* TODO: make */, quantity: 14, capacity: "Bar Ø 3 to 42 mm", placeholder: true },
  { type: "Multi-spindle automat", group: "Turning", make: "" /* TODO: make */, quantity: 2, capacity: "Bar Ø up to 32 mm", placeholder: true },
  { type: "Vertical machining centre (VMC)", group: "Milling", make: "" /* TODO: make */, quantity: 3, capacity: "600 x 400 x 400 mm", placeholder: true },
  { type: "Thread rolling machine", group: "Secondary", make: "" /* TODO: make */, quantity: 3, capacity: "M2 to M16", placeholder: true },
  { type: "Drilling and tapping machine", group: "Secondary", make: "" /* TODO: make */, quantity: 8, capacity: "Up to M12 tapping", placeholder: true },
  { type: "Knurling and slotting machine", group: "Secondary", make: "" /* TODO: make */, quantity: 4, capacity: "Diamond / straight knurl", placeholder: true },
  { type: "Centreless grinder", group: "Secondary", make: "" /* TODO: make */, quantity: 1, capacity: "Ø 3 to 40 mm", placeholder: true },
  { type: "Profile projector", group: "Inspection", make: "" /* TODO: make */, quantity: 1, capacity: "10x to 100x magnification", placeholder: true },
  { type: "Ultrasonic cleaning line", group: "Support", make: "" /* TODO: make */, quantity: 1, capacity: "Batch degreasing", placeholder: true },
  { type: "Air compressor and dryer", group: "Support", make: "" /* TODO: make */, quantity: 2, capacity: "Plant air", placeholder: true },
];

/** Plant facts. TODO: confirm every value. */
export const plant = {
  area: { value: "50,000+ sq ft covered area", placeholder: false },
  location: { value: "Gujarat, India", placeholder: true },
  shifts: { value: "Two shifts, six days a week", placeholder: true },
  utilities: ["Centralised coolant filtration", "Compressed air network", "Bar stock racking by alloy", "Separate chip and scrap segregation"],
};
