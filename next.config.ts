import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: { 
  domains: [ 'dynamic-media-cdn.tripadvisor.com',
             'images.unsplash.com',
              'cdn.example.com' ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn1.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn2.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn3.gstatic.com',
      },
         {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // add any other external image sources you use
    ],
  },
};

export default nextConfig;
