import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["geist"], // Fixes font loading issues for older builds
};

export default nextConfig;
