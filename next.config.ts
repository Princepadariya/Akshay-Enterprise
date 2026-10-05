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
    ];
  },
};

export default nextConfig;
