import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cozmgcrpnwoztaetnxeo.supabase.co',
      },
    ],
  },
}

export default nextConfig
