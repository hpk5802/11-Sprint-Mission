/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.co.kr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
