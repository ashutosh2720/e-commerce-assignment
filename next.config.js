/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.dummyjson.com',
            port: '',
            pathname: '/data/products/**',
          },
          {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            port: '',
            pathname: '/images/I/**',
          },
        ],
      },
}

module.exports = nextConfig
