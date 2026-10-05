import "server-only";
import { Resend } from "resend";

/**
 * Email delivery via Resend.
 * Env: RESEND_API_KEY, RFQ_TO_EMAIL (recipient), RFQ_FROM_EMAIL (verified sender).
 * Without RESEND_API_KEY the message is logged and reported as "stubbed" so forms work in development.
 * In production a missing key is an error, so visitors are told to email directly instead of
 * seeing "sent" for a message nobody receives.
 */

type Attachment = { filename: string; content: Buffer };

export async function sendMail({
  subject,
  text,
  replyTo,
  attachments,
}: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<{ ok: boolean; stubbed?: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RFQ_TO_EMAIL ?? "sales@akshayenterprise.com"; // TODO: confirm inbox
  const from = process.env.RFQ_FROM_EMAIL ?? "Akshay Enterprise Website <onboarding@resend.dev>";

  if (!key && process.env.NODE_ENV === "production") {
    console.error("[mail] RESEND_API_KEY is not set: form submissions cannot be delivered");
    return { ok: false, error: "Email delivery is not configured" };
  }
  if (!key) {
    console.info("[mail:stub] RESEND_API_KEY not set. Would send:", {
      to,
      subject,
      replyTo,
      attachments: attachments?.map((a) => `${a.filename} (${a.content.byteLength} B)`),
    });
    return { ok: true, stubbed: true };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({ from, to, subject, text, replyTo, attachments });
  if (error) {
    console.error("[mail] Resend error", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
