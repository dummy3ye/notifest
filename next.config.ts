import type { NextConfig } from "next";

const isExport = process.env.OUTPUT_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isExport ? "export" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
