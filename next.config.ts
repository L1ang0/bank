import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'vrmuwzkelrwnmsoteluq.supabase.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vrmuwzkelrwnmsoteluq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
