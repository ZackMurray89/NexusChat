import { hostname } from 'os'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
    ],
  },
}

export default nextConfig
