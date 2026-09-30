import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/rfq-schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const limited = rateLimit(`contact:${clientIp(req.headers)}`, 5);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse({ ...body, website: "" });
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form fields." }, { status: 422 });
  }
  const v = parsed.data;

  const result = await sendMail({
    subject: `Website enquiry: ${v.name}${v.company ? ` / ${v.company}` : ""}`,
    replyTo: v.email,
    text: [
      `Name:     ${v.name}`,
      `Email:    ${v.email}`,
      `Phone:    ${v.phone || "-"}`,
      `Company:  ${v.company || "-"}`,
      "",
      v.message,
    ].join("\n"),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "We could not send your message. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, stubbed: result.stubbed ?? false });
}
