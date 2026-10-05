import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Poppins } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Providers } from "@/components/layout/providers";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PointerFX } from "@/components/motion/pointer-fx";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Labels, figures and technical readouts (the "font-mono" utility). Poppins is not a variable
// font, so only the weights used by those labels are loaded.
const mono = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Precision Turned Components, India`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: `${site.name} | Precision Turned Components`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0a09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="grain flex min-h-dvh flex-col" suppressHydrationWarning>
        <Providers>
          <SmoothScroll />
          <PointerFX />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </Providers>
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
