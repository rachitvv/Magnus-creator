/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;