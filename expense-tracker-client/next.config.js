/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove output: "export" and images: { unoptimized: true }
};

module.exports = nextConfig;

