import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Notice images are capped at 4 MB; leave room for multipart overhead.
    serverActions: { bodySizeLimit: "5mb" },
  },
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
