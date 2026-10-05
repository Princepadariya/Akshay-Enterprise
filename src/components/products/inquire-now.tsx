import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";

/** "Inquire Now" on product pages: opens the contact form with this product already selected. */
export function InquireNow({ slug }: { slug: string }) {
  return (
    <Button asChild variant="outline" size="lg">
      <Link href={`/contact?product=${slug}#contact-form`}>
        <MessageSquareText strokeWidth={1.5} /> Inquire Now
      </Link>
    </Button>
  );
}
