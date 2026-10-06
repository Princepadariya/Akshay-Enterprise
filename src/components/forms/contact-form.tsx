"use client";

import { SiteImage as Image } from "@/components/site-image";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, findProductBySlug, products } from "@/content/products";
import { photos } from "@/content/images";
import { contactSchema, type ContactValues } from "@/lib/rfq-schema";
import { Field, Honeypot, inputClass } from "./field";

const selectClass = "h-11 w-full rounded-sm border-input bg-background text-[15px] data-[size=default]:h-11 focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30";
const NONE = "none";

/**
 * Contact page form. `?product=<slug>` (from a product page's "Inquire Now") pre-selects the
 * product; `?subject=` pre-fills the message.
 */
export function ContactForm() {
  const params = useSearchParams();
  const subject = params.get("subject");
  const preProduct = findProductBySlug(params.get("product") ?? "");
  const blank: ContactValues = {
    name: "",
    email: "",
    phone: "",
    company: "",
    product: preProduct?.slug ?? "",
    message: subject ? `${subject}\n\n` : "",
    website: "",
  };
  const [sent, setSent] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: blank });
  const picked = findProductBySlug(useWatch({ control, name: "product" }) ?? "");

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
      reset(blank);
      toast.success("Message sent. We will reply within one working day.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your message.");
    }
  };

  if (sent) {
    return (
      <div className="grid place-items-start gap-4 rounded-sm border border-border bg-card p-8">
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-5 rounded-sm border border-border bg-card p-6 md:p-8">
      <Honeypot register={register("website")} />

      {/* product carried over from a product page, so the visitor sees it was picked up */}
      {picked ? (
        <div className="flex items-center gap-4 rounded-sm border border-brass/40 bg-brass-soft p-3 pr-4">
          <span className="relative size-14 shrink-0 overflow-hidden rounded-sm border border-border">
            <Image src={photos[picked.images[0]].src} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10.5px] tracking-[0.14em] text-brass-ink uppercase">Enquiring about</span>
            <span className="block truncate font-medium">{picked.name}</span>
            <span className="block truncate text-xs text-muted-foreground">{picked.sizes}</span>
          </span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Name" error={errors.name?.message}>
          <Input id="c-name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-error" : undefined} className={inputClass} {...register("name")} />
        </Field>
        <Field id="c-email" label="Work email" error={errors.email?.message}>
          <Input id="c-email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-error" : undefined} className={inputClass} {...register("email")} />
        </Field>
        <Field id="c-phone" label="Phone" optional>
          <Input id="c-phone" type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        </Field>
        <Field id="c-company" label="Company" optional>
          <Input id="c-company" autoComplete="organization" className={inputClass} {...register("company")} />
        </Field>
      </div>
      <Field id="c-product" label="Product" optional>
        <Controller
          control={control}
          name="product"
          render={({ field }) => (
            <Select value={field.value || NONE} onValueChange={(v) => field.onChange(v === NONE ? "" : v)}>
              <SelectTrigger id="c-product" className={selectClass} onBlur={field.onBlur}>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-80 rounded-sm">
                <SelectItem value={NONE}>General enquiry (no specific product)</SelectItem>
                {categories.map((c) => (
                  <SelectGroup key={c.slug}>
                    <SelectLabel>{c.name}</SelectLabel>
                    {products
                      .filter((p) => p.category === c.slug)
                      .map((p) => (
                        <SelectItem key={p.slug} value={p.slug}>
                          {p.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>
      <Field id="c-message" label="Message" error={errors.message?.message}>
        <Textarea
          id="c-message"
          rows={6}
          placeholder={picked ? "Sizes, material, finish, quantity or lead time you need" : undefined}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-error" : undefined}
          className="min-h-36 rounded-sm border-input bg-background text-[15px] focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30"
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
