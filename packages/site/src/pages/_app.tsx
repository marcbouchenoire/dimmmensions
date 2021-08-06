import { NextSeo } from "next-seo"
import { AppProps } from "next/app"
import "../styles/main.scss"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <NextSeo
        description="A collection of dimensions from iOS."
        openGraph={{
          profile: {
            firstName: "Marc",
            lastName: "Bouchenoire",
            username: "bouchenoiremarc"
          },
          site_name: "Marc Bouchenoire"
        }}
        title="ios-dimensions"
        twitter={{
          handle: "@bouchenoiremarc"
        }}
      />
    </>
  )
}

export default App
