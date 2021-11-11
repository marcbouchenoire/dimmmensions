import { NextSeo } from "next-seo"
import { AppProps } from "next/app"
import { Favicon } from "../components/Favicon"
import "../styles/main.scss"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
        title="dimmmensions"
        twitter={{
          handle: "@bouchenoiremarc"
        }}
      />
      <Favicon>📏</Favicon>
      <Component {...pageProps} />
    </>
  )
}

export default App
