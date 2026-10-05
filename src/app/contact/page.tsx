import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";
import { CopyButton } from "@/components/sections/copy-button";
import { TodoMark } from "@/components/todo-mark";
import { hasPhone, hasWhatsapp, site, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Akshay Enterprise, precision turned components manufacturer in Gujarat, India. Phone, email, WhatsApp and factory address.",
  path: "/contact",
});

export default function ContactPage() {
  const c = site.contact;
  type Link = { label?: string; display: string; href?: string; external?: boolean; copy?: boolean };
  const rows: { icon: typeof Phone; label: string; links: Link[]; placeholder?: boolean }[] = [
    { icon: MapPin, label: "Factory", links: [{ display: c.addressLines.join(", "), href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapEmbedQuery)}`, external: true }] },
    ...(hasPhone ? [{ icon: Phone, label: "Phone", links: c.phones.map((p) => ({ ...p, copy: true })) }] : []),
    { icon: Mail, label: "Email", links: c.emails.map((e) => ({ ...e, copy: true })) },
    ...(hasWhatsapp ? [{ icon: MessageCircle, label: "WhatsApp", links: [{ display: "Chat with us", href: whatsappHref(), external: true }] }] : []),
    { icon: Clock, label: "Business hours", links: [{ display: c.hours.value }], placeholder: c.hours.placeholder },
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
                    <ul className="mt-1 grid gap-1.5">
                      {r.links.map((l) => (
                        <li key={l.display} className="flex flex-wrap items-center gap-x-2">
                          {l.label ? <span className="basis-full text-xs text-muted-foreground sm:basis-auto sm:w-20 sm:shrink-0">{l.label}</span> : null}
                          {l.href ? (
                            <a
                              href={l.href}
                              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                              className="min-w-0 font-medium break-words hover:text-brass-ink"
                            >
                              {l.display}
                            </a>
                          ) : (
                            <p className="font-medium">{l.display}</p>
                          )}
                          {l.copy ? <CopyButton text={l.display} label={`${r.label.toLowerCase()} ${l.display}`} /> : null}
                        </li>
                      ))}
                    </ul>
                    <TodoMark show={r.placeholder} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <MapEmbed query={c.mapEmbedQuery} title={`Map showing ${site.name}`} />
        </div>
        <div className="lg:col-span-7">
          <h2 id="contact-form" className="mb-6 scroll-mt-28 font-display text-2xl font-semibold tracking-tight">Send a message</h2>
          <Suspense fallback={<div className="h-[480px] animate-pulse rounded-sm border border-border bg-card" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
