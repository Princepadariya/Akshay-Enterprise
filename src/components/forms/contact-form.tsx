"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactValues } from "@/lib/rfq-schema";
import { cn } from "@/lib/utils";
import { Field, Honeypot, inputClass } from "./field";

/** Contact page form; `?subject=` pre-fills the message. */
export function ContactForm() {
  const subject = useSearchParams().get("subject");
  return <EnquiryForm initialMessage={subject ? `${subject}\n\n` : ""} />;
}

/**
 * The general enquiry form (posts to /api/contact). Used on the contact page and, with `compact`,
 * inside the product pages' "Inquire Now" dialog.
 */
export function EnquiryForm({ initialMessage = "", idPrefix = "c", compact = false }: { initialMessage?: string; idPrefix?: string; compact?: boolean }) {
  const id = (name: string) => `${idPrefix}-${name}`;
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: initialMessage, website: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setSent(true);
      reset({ name: "", email: "", phone: "", company: "", message: initialMessage, website: "" });
      toast.success("Message sent. We will reply within one working day.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your message.");
    }
  };

  if (sent) {
    return (
      <div className={cn("grid place-items-start gap-4", !compact && "rounded-sm border border-border bg-card p-8")}>
        <CheckCircle2 strokeWidth={1.5} className="size-10 text-brass" />
        <p className="font-display text-2xl font-semibold tracking-tight">Thank you. Your message is with us.</p>
        <p className="text-muted-foreground">A member of the team will reply by email within one working day.</p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("relative grid gap-5", !compact && "rounded-sm border border-border bg-card p-6 md:p-8")}>
      <Honeypot register={register("website")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name?.message}>
          <Input id={id("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-error") : undefined} className={inputClass} {...register("name")} />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email?.message}>
          <Input id={id("email")} type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-error") : undefined} className={inputClass} {...register("email")} />
        </Field>
        <Field id={id("phone")} label="Phone" optional>
          <Input id={id("phone")} type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        </Field>
        <Field id={id("company")} label="Company" optional>
          <Input id={id("company")} autoComplete="organization" className={inputClass} {...register("company")} />
        </Field>
      </div>
      <Field id={id("message")} label="Message" error={errors.message?.message}>
        <Textarea
          id={id("message")}
          rows={compact ? 4 : 6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? id("message-error") : undefined}
          className={cn(compact ? "min-h-28" : "min-h-36", "rounded-sm border-input bg-background text-[15px] focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30")}
          {...register("message")}
        />
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[40ch] text-xs text-muted-foreground">
          By sending this form you agree to our <a href="/privacy-policy" className="underline underline-offset-2">privacy policy</a>.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 strokeWidth={1.5} className="animate-spin" /> : null}
          Send message
        </Button>
      </div>
    </form>
  );
}
