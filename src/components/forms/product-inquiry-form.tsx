"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { productInquirySchema, type ProductInquiryValues } from "@/lib/rfq-schema";
import { Field, Honeypot, inputClass } from "./field";

/** "Inquire Now" form on a product page. The product is fixed to the page it sits on. */
export function ProductInquiryForm({ slug, name }: { slug: string; name: string }) {
  const blank: ProductInquiryValues = {
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    product: slug,
    message: `Please quote for ${name}.`,
    website: "",
  };
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductInquiryValues>({ resolver: zodResolver(productInquirySchema), defaultValues: blank });

  const onSubmit = async (values: ProductInquiryValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setSent(true);
      reset(blank);
      toast.success("Inquiry sent. We will reply within one working day.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your inquiry.");
    }
  };

  if (sent) {
    return (
      <div className="grid place-items-start gap-4 rounded-sm border border-border bg-card p-8">
        <CheckCircle2 strokeWidth={1.5} className="size-10 text-brass" />
        <p className="font-display text-2xl font-semibold tracking-tight">Thank you. Your inquiry is with us.</p>
        <p className="text-muted-foreground">A member of the team will reply by email within one working day.</p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-1">
      <Honeypot register={register("website")} />
      <div className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
        <Field id="pi-name" label="Name *" error={errors.name?.message}>
          <Input id="pi-name" autoComplete="name" aria-invalid={!!errors.name} className={inputClass} {...register("name")} />
        </Field>
        <Field id="pi-email" label="Email *" error={errors.email?.message}>
          <Input id="pi-email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={inputClass} {...register("email")} />
        </Field>
        <Field id="pi-company" label="Company">
          <Input id="pi-company" autoComplete="organization" className={inputClass} {...register("company")} />
        </Field>
        <Field id="pi-phone" label="Contact No *" error={errors.phone?.message}>
          <Input id="pi-phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className={inputClass} {...register("phone")} />
        </Field>
        <Field id="pi-product" label="Product">
          <Input id="pi-product" value={name} readOnly disabled className={inputClass} />
        </Field>
        <Field id="pi-country" label="Country">
          <Input id="pi-country" autoComplete="country-name" className={inputClass} {...register("country")} />
        </Field>
      </div>
      <Field id="pi-message" label="Requirement *" error={errors.message?.message}>
        <Textarea
          id="pi-message"
          rows={4}
          aria-invalid={!!errors.message}
          className="min-h-28 rounded-sm border-input bg-background text-[15px] focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30"
          {...register("message")}
        />
      </Field>
      <div className="pt-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-40">
          {isSubmitting ? <Loader2 strokeWidth={1.5} className="animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </form>
  );
}
