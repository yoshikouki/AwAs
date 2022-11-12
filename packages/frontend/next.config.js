/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s.gravatar.com"],
  },
  experimental: {
    appDir: true,
    externalDir: true,
  },
};

module.exports = nextConfig;
