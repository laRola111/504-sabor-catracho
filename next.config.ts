/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  // Vercel deployment optimization
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
