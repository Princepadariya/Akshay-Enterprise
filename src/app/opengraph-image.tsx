import { renderOg, ogSize } from "@/lib/og";

export const alt = "Akshay Enterprise: precision turned components manufacturer, Gujarat, India";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ kicker: "Precision components manufacturer", title: "Precision turned parts, made to your drawing." });
}
