import { LegalPage } from "@/components/sections/legal-page";
import { terms } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing use of the Akshay Enterprise website.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc={terms} href="/terms" />;
}
