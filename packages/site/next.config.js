module.exports = {
  basePath: "/ios-dimensions",
  cleanUrls: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ios-dimensions",
        permanent: true,
        basePath: false
      }
    ]
  }
}
