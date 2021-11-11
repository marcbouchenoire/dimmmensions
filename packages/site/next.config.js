module.exports = {
  basePath: "/projects/dimmmensions",
  cleanUrls: true,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects/dimmmensions",
        permanent: true,
        basePath: false
      }
    ]
  }
}
