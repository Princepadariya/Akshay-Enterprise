import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { footerColumns, legalLinks } from "@/content/navigation";
import { hasPhone, site } from "@/content/site";
import { TodoMark } from "@/components/todo-mark";
import { Logo } from "./logo";
import { FooterWordmark } from "./footer-wordmark";

export function Footer() {
  const socials = site.social.filter((s) => s.href);
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface pb-24 md:pb-0">
      <div aria-hidden className="grid-lines-fine absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Logo />
            <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground">{site.tagline} Built to print for OEMs in India and export markets.</p>
            <address className="grid gap-3 text-sm not-italic">
              <span className="flex gap-3">
                <MapPin strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-brass" />
                <span className="text-muted-foreground">
                  {site.contact.addressLines.join(", ")}
                  <TodoMark />
                </span>
              </span>
              {hasPhone ? (
                <span className="flex gap-3">
                  <Phone strokeWidth={1.5} className="mt-1 size-4 shrink-0 text-brass" />
                  <span className="grid gap-1">
                    {site.contact.phones.map((p) => (
                      <a key={p.href} href={p.href} className="inline-flex min-h-6 items-center font-mono text-[13px] hover:text-brass-ink">
                        {p.display}
                      </a>
                    ))}
                  </span>
                </span>
              ) : null}
              <span className="flex gap-3">
                <Mail strokeWidth={1.5} className="mt-1 size-4 shrink-0 text-brass" />
                <span className="grid gap-1">
                  {site.contact.emails.map((e) => (
                    <a key={e.href} href={e.href} className="inline-flex min-h-6 items-center font-mono text-[13px] hover:text-brass-ink">
                      {e.display}
                    </a>
                  ))}
                </span>
              </span>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 xl:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">{col.title}</h2>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-foreground/80 transition-colors hover:text-brass-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border py-6">
          {site.certifications.map((c) => (
            <span key={c.code} className="font-mono text-[11px] tracking-wide text-muted-foreground">
              {c.code}
              <TodoMark show={c.placeholder} />
            </span>
          ))}
        </div>

        {/* Bottom bar: copyright (left), credit (centre), links (right). Stacks and centres on small screens. */}
        <div className="grid items-center gap-4 border-t border-border py-6 text-center text-xs text-muted-foreground lg:grid-cols-[1fr_auto_1fr] lg:text-left">
          <p className="lg:justify-self-start">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5 whitespace-nowrap">
            Made with
            <Heart aria-label="love" fill="currentColor" strokeWidth={0} className="heartbeat size-3.5 text-[#e5484d]" />
            by
            <a
              href="https://codelixitsolutions.com"
              target="_blank"
              rel="noopener"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-brass-ink hover:underline"
            >
              Codelix
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-self-end lg:justify-end">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                {s.label}
              </a>
            ))}
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container-x relative">
        <FooterWordmark />
      </div>
    </footer>
  );
}
