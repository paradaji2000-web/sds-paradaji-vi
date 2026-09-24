import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Unsplash (sumber gambar dummy utama)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Bunny CDN
      {
        protocol: "https",
        hostname: "*.b-cdn.net",
      },
      // Google — Share, Lh3 (Google Photos, Drive preview), ggpht
      {
        protocol: "https",
        hostname: "share.google",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      // Cloudinary (CDN umum)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Pexels (alternatif foto gratis)
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      // Picsum (placeholder foto)
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // via.placeholder
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      // Gravatar (avatar)
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      // iStockphoto / Getty
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

export default nextConfig;
