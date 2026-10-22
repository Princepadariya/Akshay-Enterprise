import type { Metadata, Viewport } from "next";
import { Geist, Poppins } from "next/font/google";
import localFont from "next/font/local";
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

// Archivo (Google Fonts, latin), self-hosted as a trimmed variable font: weights 500-700 and widths
// 100-125% only, the range the headings use (font-stretch 112%, wide numerals 125%). Google's own file
// always ships weights 100-900 once the width axis is requested, which is ~40% larger.
const archivo = localFont({
  src: "./fonts/archivo-500-700-wdth100-125.woff2",
  variable: "--font-archivo",
  weight: "500 700",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
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
  weight: ["400", "500"],
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
  themeColor: "#f7f3ef",
  colorScheme: "light",
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
