# Content to confirm before launch

Every item below is currently a **placeholder**. On the live site, placeholders show a small dashed **TBC** marker while
`showPlaceholderMarkers: true` in `src/content/site.ts`. Work through this list, then set that flag to `false`.

## Company details (`src/content/site.ts`)
- [ ] Registered legal entity name (`legalName`)
- [ ] Production domain (`url`, or `NEXT_PUBLIC_SITE_URL`)
- [ ] Year of establishment (`founded`)
- [x] Factory street address, city and PIN
- [x] Phone numbers
- [x] Sales / enquiry emails; [ ] RFQ inbox (`RFQ_TO_EMAIL`, defaults to sales@abcbrass.com)
- [ ] Confirm WhatsApp number (currently +91 84694 08409)
- [ ] Business hours (`contact.hours`)
- [x] Google Maps address
- [ ] RFQ response time in hours (`quoteTurnaroundHours`)
- [ ] Social profile URLs (`social`; empty URLs are hidden)
- [ ] Official logo (replace the hex mark in `src/components/layout/logo.tsx` and `src/app/icon.svg`)

## Numbers (`site.stats`)
- [ ] Years of experience
- [ ] Parts per month capacity
- [ ] Number of machines
- [ ] Number of export countries
- [ ] Number of clients

## Certifications and standards
- [ ] Certifications actually held, with certificate numbers (`site.certifications`)
- [ ] Standards routinely manufactured to (`site.standards`, shown in the home page strip)
- [ ] Certificate PDFs added to `/public/downloads` (`src/content/misc.ts > downloads`)

## Products (`src/content/products.ts`)
- [ ] Confirm the 10 categories (add, remove or rename freely; pages and navigation update automatically)
- [ ] Confirm each product line, size range, thread types and finishes
- [ ] Confirm the typical tolerance statement (`const T`)
- [ ] Real product photographs for every product (`images` keys, see Photos below)
- [ ] Category detail content: overview, features, manufacturing routes, inspection checks, options, standards and FAQs (`src/content/category-details.ts`)

## Manufacturing
- [ ] Shifts (`machinery.ts > plant`)
- [ ] Capability table size and tolerance ranges (`src/content/capabilities.ts > capabilityTable`)
- [ ] Inspection instruments, including whether an XRF / spectro analyser is available (`src/content/quality.ts`)
- [ ] Tolerance highlights on the quality section (`quality.ts > toleranceHighlights`)
- [ ] Signed quality policy text (`quality.ts > qualityPolicy`)
- [ ] Whether plating is in-house or outsourced (`src/content/materials.ts > finishingNote`)
- [ ] Which material grades are stocked vs. procured to order (`materials.ts`)
- [ ] Nominal compositions shown on /materials match the grades you actually buy (`materials.ts > composition`)
- [ ] Hero simulation labels (drawing no. AE-0417, CW614N, callout dimensions) are illustrative; change them in `src/components/three/callouts.ts` and `hero-visual.tsx` if you prefer a real part

## Company story (`src/content/company.ts`, `src/content/timeline.ts`)
- [ ] Founder's name and approved message
- [ ] Real company milestones and years (`timeline.ts`)
- [ ] Facts panel on the About page (`about.facts`)

## Testimonials (`site.testimonials`)
- [ ] Approved client quotes with written permission (role and company type are fine; never invent names)

## FAQ (`src/content/faq.ts`)
- [ ] MOQ, lead times, payment terms, finishing options, shipping and documentation answers

## Sustainability (`src/content/misc.ts > sustainability`)
- [ ] Real programmes (chip recovery, coolant, energy, CSR) or remove the ones that don't apply

## Photos (`src/content/images.ts`)
- [ ] Replace every Unsplash placeholder with real factory, machine, product and team photography
- [ ] Hero fallback / mobile image (`brassParts`)
- [ ] Once all photos are local, remove `images.unsplash.com` from `next.config.ts`

## Downloads (`src/content/misc.ts > downloads`)
- [ ] Product catalogue PDF
- [ ] Company profile PDF
- [ ] Certificates
- [ ] Quality policy PDF
- [ ] RoHS / REACH declarations

## Company policies (`src/content/policies.ts`)
- [ ] EHS policy reviewed against actual plant practice, approved and signed
- [ ] Quality policy approved and signed (also shown on /quality)
- [ ] Cyber security policy matches the systems actually in use (MFA, backups, firewall)
- [ ] Conflict minerals policy approved; CMRT process in place for customer requests
- [ ] Counterfeit parts policy approved; spectro / XRF verification wording confirmed
- [ ] Set `updated` and `approvedBy` on each policy; optional signed PDFs in /public/downloads

## Legal (`src/content/legal.ts`)
- [ ] Privacy policy and terms reviewed by counsel (DPDP Act 2023; GDPR if marketing to the EU)
- [ ] "Last updated" dates

## Launch
- [ ] `RESEND_API_KEY`, `RFQ_TO_EMAIL`, `RFQ_FROM_EMAIL` set in Vercel (sender domain verified in Resend)
- [ ] `showPlaceholderMarkers` set to `false`
- [ ] Lighthouse run on the production URL (Home, a product page, Contact)
