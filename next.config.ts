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
      {
        source: '/ai-physiotherapy',
        destination: '/ai-rehab-insights',
        permanent: true,
      },
      {
        source: '/ai-personal-training',
        destination: '/ai-rehab-insights',
        permanent: true,
      },
      {
        source: '/ai-prehabilitation',
        destination: '/ai-rehab-insights',
        permanent: true,
      },
      {
        source: '/ai-physical-rehabilitation',
        destination: '/ai-rehab-insights',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
