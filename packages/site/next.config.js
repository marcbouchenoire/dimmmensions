module.exports = {
  basePath: "/projects/ios-dimensions",
  cleanUrls: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects/ios-dimensions",
        permanent: true,
        basePath: false
      }
    ]
  }
}
