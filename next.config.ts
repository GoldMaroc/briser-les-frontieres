import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/download': ['./protected_books/**/*'],
  },
};

export default nextConfig;
