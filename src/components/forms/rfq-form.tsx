"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2, Paperclip, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, findProductBySlug } from "@/content/products";
import { materials, materialName, type MaterialKey } from "@/content/materials";
import { ACCEPTED_EXTENSIONS, MAX_FILES, MAX_TOTAL_BYTES, rfqSchema, validateFiles, type RfqValues } from "@/lib/rfq-schema";
import { clearPendingDrawings, peekPendingDrawings } from "@/lib/rfq-draft";
import { cn } from "@/lib/utils";
import { Field, Honeypot, inputClass } from "./field";

const steps = [
  { title: "Company & contact", fields: ["name", "company", "email", "phone", "country"] },
  { title: "Part details", fields: ["category", "product", "material", "quantity", "targetPrice", "deliveryCountry", "notes"] },
  { title: "Drawings", fields: [] },
  { title: "Review & submit", fields: ["consent"] },
] as const satisfies readonly { title: string; fields: readonly FieldPath<RfqValues>[] }[];

const selectClass = "h-11 w-full rounded-sm border-input bg-background text-[15px] data-[size=default]:h-11 focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30";

function formatBytes(n: number) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

export function RfqForm() {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const preProduct = findProductBySlug(params.get("product") ?? "");
  const preCategory = params.get("category") ?? preProduct?.category ?? "";

  const [step, setStep] = useState(0);
  // Files dropped on the home page CTA arrive here (client-only module state).
  const [files, setFiles] = useState<File[]>(() => (typeof window === "undefined" ? [] : peekPendingDrawings()));
  const [fileError, setFileError] = useState<string | null>(() => (files.length ? validateFiles(files) : null));
  const [done, setDone] = useState<null | { stubbed: boolean }>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const form = useForm<RfqValues>({
    resolver: zodResolver(rfqSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      category: categories.some((c) => c.slug === preCategory) ? preCategory : undefined,
      product: preProduct?.name ?? "",
      material: preProduct?.materials[0],
      quantity: "",
      targetPrice: "",
      deliveryCountry: "",
      notes: "",
      website: "",
    },
  });
  const { register, control, handleSubmit, trigger, getValues, formState } = form;
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    const pending = peekPendingDrawings();
    if (pending.length) {
      clearPendingDrawings();
      toast.message(`${pending.length} drawing${pending.length > 1 ? "s" : ""} attached. Complete the details to send.`);
    }
  }, []);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)].filter((f, i, arr) => arr.findIndex((g) => g.name === f.name && g.size === f.size) === i);
    setFiles(next);
    setFileError(validateFiles(next));
  };

  const removeFile = (i: number) => {
    const next = files.filter((_, idx) => idx !== i);
    setFiles(next);
    setFileError(validateFiles(next));
  };

  const goTo = (n: number) => {
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const next = async () => {
    const fields = steps[step].fields as readonly FieldPath<RfqValues>[];
    const ok = fields.length ? await trigger(fields as FieldPath<RfqValues>[], { shouldFocus: true }) : true;
    if (step === 2 && fileError) return;
    if (ok) goTo(Math.min(step + 1, steps.length - 1));
  };

  const onSubmit = async (values: RfqValues) => {
    const fe = validateFiles(files);
    if (fe) {
      setFileError(fe);
      goTo(2);
      return;
    }
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    files.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/rfq", { method: "POST", body: fd });
      const data = (await res.json()) as { ok: boolean; error?: string; stubbed?: boolean };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setDone({ stubbed: !!data.stubbed });
      toast.success("Request received. An engineer will review it shortly.");
      topRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your request.");
    }
  };

  if (done) {
    return (
      <div ref={topRef} className="grid scroll-mt-28 gap-5 rounded-sm border border-border bg-card p-8 md:p-12">
        <CheckCircle2 strokeWidth={1.5} className="size-12 text-brass" />
        <h2 className="font-display text-3xl font-semibold tracking-tight">Your request is with our engineers.</h2>
        <p className="max-w-[56ch] text-muted-foreground">
          We will review the drawing, material and quantity and reply to {getValues("email")} with a quote or any questions.
        </p>
        {done.stubbed ? (
          <p className="rounded-sm border border-dashed border-brass/60 p-3 font-mono text-xs text-muted-foreground">
            Development mode: email delivery is stubbed because RESEND_API_KEY is not set. The submission was logged on the server.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/products">Back to products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const v = getValues();
  const catName = categories.find((c) => c.slug === v.category)?.name;
  const matName = v.material && !["other", "not-sure"].includes(v.material) ? materialName(v.material as MaterialKey) : v.material === "not-sure" ? "Not sure, please advise" : "Other";

  return (
    <div ref={topRef} className="grid scroll-mt-28 gap-8">
      {/* Stepper */}
      <ol className="grid grid-cols-4 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <button
              type="button"
              disabled={i > step}
              onClick={() => i < step && goTo(i)}
              className="group grid w-full gap-2 text-left disabled:cursor-default"
            >
              <span className={cn("h-[3px] w-full rounded-full transition-colors duration-500", i <= step ? "metal-brass" : "bg-border")} />
              <span className="flex items-baseline gap-2">
                <span className={cn("font-mono text-[11px]", i <= step ? "text-brass-ink" : "text-muted-foreground")}>{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("hidden text-[13px] sm:inline", i === step ? "font-medium text-foreground" : "text-muted-foreground")}>{s.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <form onSubmit={(e) => handleSubmit(onSubmit)(e)} noValidate className="relative overflow-hidden rounded-sm border border-border bg-card p-6 md:p-10">
        <Honeypot register={register("website")} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6"
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight">{steps[step].title}</h2>

            {step === 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name?.message}>
                  <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className={inputClass} {...register("name")} />
                </Field>
                <Field id="company" label="Company" error={errors.company?.message}>
                  <Input id="company" autoComplete="organization" aria-invalid={!!errors.company} className={inputClass} {...register("company")} />
                </Field>
                <Field id="email" label="Work email" error={errors.email?.message}>
                  <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={inputClass} {...register("email")} />
                </Field>
                <Field id="phone" label="Phone / WhatsApp" hint="Include country code, e.g. +49" error={errors.phone?.message}>
                  <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className={inputClass} {...register("phone")} />
                </Field>
                <Field id="country" label="Country" error={errors.country?.message}>
                  <Input id="country" autoComplete="country-name" aria-invalid={!!errors.country} className={inputClass} {...register("country")} />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="category" label="Product category" error={errors.category?.message}>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="category" aria-invalid={!!errors.category} className={selectClass} onBlur={field.onBlur}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm">
                          {categories.map((c) => (
                            <SelectItem key={c.slug} value={c.slug}>
                              {c.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other / not listed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field id="material" label="Material" error={errors.material?.message}>
                  <Controller
                    control={control}
                    name="material"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="material" aria-invalid={!!errors.material} className={selectClass} onBlur={field.onBlur}>
                          <SelectValue placeholder="Select a material" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm">
                          {materials.map((m) => (
                            <SelectItem key={m.key} value={m.key}>
                              {m.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="not-sure">Not sure, please advise</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field id="product" label="Part name or reference" optional className="sm:col-span-2">
                  <Input id="product" className={inputClass} {...register("product")} />
                </Field>
                <Field id="quantity" label="Quantity" hint="Per order or per year, e.g. 50,000 / year" error={errors.quantity?.message}>
                  <Input id="quantity" inputMode="numeric" aria-invalid={!!errors.quantity} className={inputClass} {...register("quantity")} />
                </Field>
                <Field id="targetPrice" label="Target price" optional hint="Currency and unit, e.g. USD 0.12 / pc">
                  <Input id="targetPrice" className={inputClass} {...register("targetPrice")} />
                </Field>
                <Field id="deliveryCountry" label="Delivery country" error={errors.deliveryCountry?.message}>
                  <Input id="deliveryCountry" aria-invalid={!!errors.deliveryCountry} className={inputClass} {...register("deliveryCountry")} />
                </Field>
                <Field id="notes" label="Notes" optional className="sm:col-span-2" hint="Finish, critical tolerances, packing or certification requirements">
                  <Textarea id="notes" rows={4} className="rounded-sm border-input bg-background text-[15px] focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30" {...register("notes")} />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  className={cn(
                    "grid place-items-center gap-3 rounded-sm border border-dashed p-10 text-center transition-colors",
                    dragOver ? "border-brass bg-brass-soft" : "border-foreground/25",
                  )}
                >
                  <FileUp strokeWidth={1.5} className="size-9 text-brass" />
                  <p className="font-medium">Drag and drop drawings, models or photos</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    PDF, DWG, DXF, STEP, IGES, JPG, PNG. Up to {MAX_FILES} files, {Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} MB total.
                  </p>
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
                    Browse files
                  </Button>
                  <input
                    ref={fileInput}
                    type="file"
                    multiple
                    accept={ACCEPTED_EXTENSIONS.join(",")}
                    className="sr-only"
                    aria-label="Attach drawing files"
                    onChange={(e) => {
                      addFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>
                {fileError ? (
                  <p role="alert" className="text-sm font-medium text-destructive">
                    {fileError}
                  </p>
                ) : null}
                {files.length ? (
                  <ul className="grid gap-2">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 rounded-sm border border-border px-3 py-2">
                        <Paperclip strokeWidth={1.5} className="size-4 text-brass" />
                        <span className="min-w-0 flex-1 truncate text-sm">{f.name}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">{formatBytes(f.size)}</span>
                        <Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${f.name}`} onClick={() => removeFile(i)}>
                          <X strokeWidth={1.5} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No files yet. Drawings are optional, but they make the quote faster and more accurate.</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Larger files? Email them to us after submitting and quote your company name.
                </p>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-6">
                <dl className="grid gap-x-8 gap-y-3 rounded-sm border border-border bg-surface p-5 text-sm sm:grid-cols-[10rem_1fr]">
                  {[
                    ["Contact", `${v.name}, ${v.company}`],
                    ["Email / phone", `${v.email}  /  ${v.phone}`],
                    ["Country", v.country],
                    ["Category", catName ?? "Other"],
                    ["Part", v.product || "-"],
                    ["Material", matName],
                    ["Quantity", v.quantity],
                    ["Target price", v.targetPrice || "-"],
                    ["Deliver to", v.deliveryCountry],
                    ["Drawings", files.length ? files.map((f) => f.name).join(", ") : "None attached"],
                  ].map(([k, val]) => (
                    <div key={k} className="contents">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-mono text-[13px] break-words">{val}</dd>
                    </div>
                  ))}
                </dl>
                <Controller
                  control={control}
                  name="consent"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <label className="flex items-start gap-3 text-sm">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={(c) => field.onChange(c === true ? true : undefined)}
                          aria-invalid={!!errors.consent}
                          className="mt-0.5 rounded-[2px]"
                        />
                        <span>
                          I agree that Akshay Enterprise may use these details and files to prepare a quotation, as described in the{" "}
                          <Link href="/privacy-policy" className="underline underline-offset-2">
                            privacy policy
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.consent ? (
                        <p role="alert" className="text-xs font-medium text-destructive">
                          {errors.consent.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => goTo(step - 1)}>
              <ArrowLeft strokeWidth={1.5} /> Back
            </Button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <Button type="button" size="lg" onClick={next}>
              Continue <ArrowRight strokeWidth={1.5} />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 strokeWidth={1.5} className="animate-spin" /> : null}
              Submit request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
