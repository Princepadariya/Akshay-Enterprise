import { NextResponse } from "next/server";
import { getCategory } from "@/content/products";
import { materialName, type MaterialKey } from "@/content/materials";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { rfqSchema, validateFiles } from "@/lib/rfq-schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const limited = rateLimit(`rfq:${clientIp(req.headers)}`, 5);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success so they learn nothing.
  if (String(form.get("website") ?? "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const raw = Object.fromEntries(
    ["name", "company", "email", "phone", "country", "category", "product", "material", "quantity", "targetPrice", "deliveryCountry", "notes"].map(
      (k) => [k, String(form.get(k) ?? "")],
    ),
  );
  const parsed = rfqSchema.safeParse({ ...raw, consent: form.get("consent") === "true", website: "" });
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({ field: i.path.join("."), message: i.message }));
    return NextResponse.json({ ok: false, error: "Please check the form fields.", issues }, { status: 422 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const fileError = validateFiles(files);
  if (fileError) return NextResponse.json({ ok: false, error: fileError }, { status: 422 });

  const v = parsed.data;
  const category = getCategory(v.category)?.name ?? "Other";
  const material = ["other", "not-sure"].includes(v.material) ? v.material : materialName(v.material as MaterialKey);

  const text = [
    "New request for quotation",
    "",
    `Name:          ${v.name}`,
    `Company:       ${v.company}`,
    `Email:         ${v.email}`,
    `Phone:         ${v.phone}`,
    `Country:       ${v.country}`,
    "",
    `Category:      ${category}`,
    `Part / ref:    ${v.product || "-"}`,
    `Material:      ${material}`,
    `Quantity:      ${v.quantity}`,
    `Target price:  ${v.targetPrice || "-"}`,
    `Deliver to:    ${v.deliveryCountry}`,
    "",
    "Notes:",
    v.notes || "-",
    "",
    `Attachments:   ${files.length ? files.map((f) => f.name).join(", ") : "none"}`,
  ].join("\n");

  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) })),
  );

  const result = await sendMail({
    subject: `RFQ: ${category} / ${v.company}`,
    text,
    replyTo: v.email,
    attachments,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "We could not send your request. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, stubbed: result.stubbed ?? false });
}
