import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Update with your actual Supabase storage domain
      },
    ],
  },
}

export default nextConfig
