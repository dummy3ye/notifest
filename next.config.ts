import type { NextConfig } from "next";

const isExport = process.env.OUTPUT_EXPORT === "true";
const basePath = process.env.BASE_PATH ?? "/notifest";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath,
  output: isExport ? "export" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
