import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: false,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
