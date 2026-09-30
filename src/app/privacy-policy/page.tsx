import { LegalPage } from "@/components/sections/legal-page";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Akshay Enterprise collects, uses and protects personal data submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} href="/privacy-policy" />;
}
