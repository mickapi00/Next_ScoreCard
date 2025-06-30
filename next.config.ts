import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  module.exports = 
  {
  experimental: {
    css: false, // disable lightningcss if it's causing issues
  },
  /* config options here */
  }};

export default nextConfig;