import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO: remove once all placeholder photography is replaced with real factory/product photos in /public/images
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    // removed pages: keep old links working
    return [
      { source: "/about/leadership", destination: "/about", permanent: true },
      { source: "/gallery", destination: "/about", permanent: true },
      { source: "/faq", destination: "/contact", permanent: true },
      { source: "/products/electrical-switchgear-parts/:path*", destination: "/products/electrical-parts/:path*", permanent: true },
      { source: "/products/neutral-links-earth-bars/:path*", destination: "/products", permanent: true },
      { source: "/products/cable-glands-accessories/:path*", destination: "/products", permanent: true },
      { source: "/products/fasteners/:path*", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
