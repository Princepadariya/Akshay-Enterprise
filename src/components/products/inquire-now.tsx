"use client";

import { MessageSquareText } from "lucide-react";
import { EnquiryForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * "Inquire Now" on product pages: a quick question about a part without the full quote form.
 * Opens the general enquiry form in a dialog with the product already named in the message.
 */
export function InquireNow({ name, sizes }: { name: string; sizes: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <MessageSquareText strokeWidth={1.5} /> Inquire Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-sm p-6 sm:max-w-xl md:p-8">
        <DialogHeader className="pr-6">
          <DialogTitle className="font-display text-2xl font-semibold tracking-tight">Inquire about {name}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            Ask about sizes, materials, finishes, quantities or lead time. An engineer will reply by email.
          </DialogDescription>
        </DialogHeader>
        <EnquiryForm compact idPrefix="inq" initialMessage={`Product: ${name} (${sizes})\n\n`} />
      </DialogContent>
    </Dialog>
  );
}
