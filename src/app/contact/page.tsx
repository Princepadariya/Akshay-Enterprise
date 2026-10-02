import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";
import { CopyButton } from "@/components/sections/copy-button";
import { TodoMark } from "@/components/todo-mark";
import { site, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Akshay Enterprise, precision turned components manufacturer in Gujarat, India. Phone, email, WhatsApp and factory address.",
  path: "/contact",
});

export default function ContactPage() {
  const c = site.contact;
  const rows = [
    { icon: MapPin, label: "Factory", value: c.addressLines.join(", "), placeholder: true },
    { icon: Phone, label: "Phone", value: c.phone.display, href: c.phone.href, placeholder: c.phone.placeholder, copy: c.phone.display },
    { icon: Mail, label: "Email", value: c.email.display, href: c.email.href, placeholder: c.email.placeholder, copy: c.email.display },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappHref(), external: true, placeholder: c.whatsapp.placeholder },
    { icon: Clock, label: "Business hours", value: c.hours.value, placeholder: c.hours.placeholder },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact" }]}
        title="Contact us"
        lead="General enquiries, supplier registration or a question about a part. For pricing, the quote form is faster."
      />
      <section className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="grid content-start gap-8 lg:col-span-5">
          <div className="overflow-hidden rounded-sm border border-border bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-2/60 px-5 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
              <span>Contact details</span>
              <span>{site.name}</span>
            </div>
            <ul>
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4 border-b border-dashed border-border p-5 transition-colors duration-300 last:border-b-0 hover:bg-brass-soft">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background">
                    <r.icon strokeWidth={1.5} className="size-[18px] text-brass" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{r.label}</p>
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="mt-1 inline-block font-medium break-words hover:text-brass-ink"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium">{r.value}</p>
                    )}
                    <TodoMark show={r.placeholder} />
                  </div>
                  {r.copy ? <CopyButton text={r.copy} label={r.label.toLowerCase()} /> : null}
                </li>
              ))}
            </ul>
          </div>
          <MapEmbed query={c.mapEmbedQuery} title={`Map showing ${site.name}`} />
        </div>
        <div className="lg:col-span-7">
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">Send a message</h2>
          <Suspense fallback={<div className="h-[480px] animate-pulse rounded-sm border border-border bg-card" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
