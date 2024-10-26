import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  reactStrictMode: true,
  compiler: {
    removeConsole: false,
  },
}

export default nextConfig
