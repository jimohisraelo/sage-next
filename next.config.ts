import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore TypeScript errors if needed
    ignoreBuildErrors: true,
  },
  // Fix the multiple lockfile warning
  outputFileTracingRoot: __dirname,
  // If using Turbopack in dev, add this too
  turbopack: {
    resolveAlias: {
      // Ensure proper module resolution
    }
  },
}

module.exports = nextConfig

export default nextConfig;
