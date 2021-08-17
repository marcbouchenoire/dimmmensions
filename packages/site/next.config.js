module.exports = {
  basePath: "/ios-dimensions",
  cleanUrls: true,
  trailingSlash: false,
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
