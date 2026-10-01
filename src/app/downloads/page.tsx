import Link from "next/link";
import { Download, FileText, Mail } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { TodoMark } from "@/components/todo-mark";
import { downloads } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";
import { BatchReveal } from "@/components/motion/batch-reveal";

export const metadata = pageMetadata({
  title: "Downloads",
  description: "Product catalogue, company profile, certificates and quality documents from Akshay Enterprise.",
  path: "/downloads",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Downloads", href: "/downloads" }]}
        title="Downloads"
        lead="Documents for supplier registration and technical evaluation. If a file is not yet online, request a copy and we will email it."
      />
      <section className="container-x py-14 md:py-20">
        <BatchReveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {downloads.map((d) => (
              <li key={d.title} className="flex items-start gap-5 rounded-sm border border-border bg-card p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-sm border border-border bg-surface">
                  <FileText strokeWidth={1.5} className="size-6 text-brass" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg font-semibold tracking-tight">
                    {d.title}
                    <TodoMark show={!d.file} />
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                    {d.type}
                    {d.size ? `  ${d.size}` : ""}
                  </p>
                  <div className="mt-4">
                    {d.file ? (
                      <Button asChild size="sm" variant="outline">
                        <a href={d.file} download>
                          <Download strokeWidth={1.5} /> Download
                        </a>
                      </Button>
                    ) : (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/contact?subject=${encodeURIComponent(`Document request: ${d.title}`)}`}>
                          <Mail strokeWidth={1.5} /> Request a copy
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </BatchReveal>
      </section>
    </>
  );
}
