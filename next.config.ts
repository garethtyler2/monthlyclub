import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  images: {
    domains: ['developers.google.com'],
  },

  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/go_to_direct_rehab',
        destination: '/injury_diagnosis',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
