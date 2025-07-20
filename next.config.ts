import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
