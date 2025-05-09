/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://khabribaba.com/cms/api/:path*'
      }
    ]
  }
}
module.exports = nextConfig 