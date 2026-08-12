/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
