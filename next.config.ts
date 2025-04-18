import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveAlias: {
        fs: "./src/node-compatibility/index.js",
      },
    },
  },
};

export default nextConfig;
