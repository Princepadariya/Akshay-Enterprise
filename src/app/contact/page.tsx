import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";
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
    { icon: Phone, label: "Phone", value: c.phone.display, href: c.phone.href, placeholder: c.phone.placeholder },
    { icon: Mail, label: "Email", value: c.email.display, href: c.email.href, placeholder: c.email.placeholder },
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
          <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border">
            {rows.map((r) => (
              <li key={r.label} className="flex gap-4 bg-card p-5">
                <r.icon strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-brass" />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{r.label}</p>
                  {r.href ? (
                    <a
                      href={r.href}
                      {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="mt-1 inline-block font-medium hover:text-brass-ink"
                    >
                      {r.value}
                    </a>
                  ) : (
                    <p className="mt-1 font-medium">{r.value}</p>
                  )}
                  <TodoMark show={r.placeholder} />
                </div>
              </li>
            ))}
          </ul>
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
