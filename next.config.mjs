/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.jp' },
      { protocol: 'https', hostname: 'ipzzciglppxsmaioawic.supabase.co' },
    ],
  },
}

export default nextConfig;
