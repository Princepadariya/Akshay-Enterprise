import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
