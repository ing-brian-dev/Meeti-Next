import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'tmbkk2wgvm.ufs.sh'
    }]
  }
};

export default nextConfig;
