/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  serverExternalPackages: ['bcrypt'],
  // Temporarily disable optimizations to debug build hang
  swcMinify: false,
  experimental: {
    optimizePackageImports: [],
  },
};

module.exports = nextConfig;
