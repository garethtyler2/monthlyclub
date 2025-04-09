/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["developers.google.com"],
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

export default nextConfig;

