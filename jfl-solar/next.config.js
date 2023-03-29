/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: [], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}

module.exports = nextConfig


