import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developers.google.com',
      },
      {
        protocol: 'https',
        hostname: 'qnecyousolguftvceaao.supabase.co',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

export default nextConfig;
