/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/greenfarm',
  assetPrefix: '/greenfarm/',
};

export default nextConfig;
