import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: { ignoreBuildErrors: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
