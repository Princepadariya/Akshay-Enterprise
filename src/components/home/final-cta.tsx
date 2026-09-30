import { CtaBand } from "@/components/sections/cta-band";
import { TodoMark } from "@/components/todo-mark";
import { site } from "@/content/site";
import { DrawingDrop } from "./drawing-drop";

export function FinalCta() {
  const h = site.quoteTurnaroundHours;
  return (
    <CtaBand
      title={
        <>
          Send us your drawing. Get a quote in {h.value} hours.
          <TodoMark show={h.placeholder} />
        </>
      }
      body="Share the drawing, material and quantity. An engineer reviews it and replies with a costed quote and any notes on tolerances."
    >
      <DrawingDrop />
    </CtaBand>
  );
}
