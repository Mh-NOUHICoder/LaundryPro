// next.config.ts
import type { NextConfig } from 'next';

// Minimal Next.js config for production builds with Turbopack enabled
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add empty turbopack config to silence Turbopack/webpack conflict
  turbopack: {},
  // If you need to explicitly disable Turbopack in CI or production builds,
  // you can set `experimental.turbo = undefined` or use the --webpack flag
  // in your build script (see package.json). For now, keep the minimal config.
};

export default nextConfig;