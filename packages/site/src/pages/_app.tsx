import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"
import Head from "next/head"
import "../styles/main.css"

/**
 * A custom `App` component, used to initialize pages.
 *
 * @param props - A set of props.
 * @param props.Component - The active page component.
 * @param props.pageProps - The initial props preloaded for the page.
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Head>
        <title>Dimmmensions</title>
        <meta content="Dimmmensions" name="title" />
        <meta content="Marc Bouchenoire" name="author" />
        <meta content="initial-scale=1, viewport-fit=cover" name="viewport" />
        <meta
          content="A collection of dimensions from iOS and iPadOS devices."
          name="description"
        />
        <meta content="website" property="og:type" />
        <meta
          content="https://dimmmensions.marcbouchenoire.com/"
          property="og:url"
        />
        <meta content="Marc Bouchenoire" property="og:title" />
        <meta
          content="A collection of dimensions from iOS and iPadOS devices."
          property="og:description"
        />
        <meta
          content="https://dimmmensions.marcbouchenoire.com/meta.png"
          property="og:image"
        />
        <meta
          content="https://www.marcbouchenoire.com/"
          property="twitter:url"
        />
        <meta content="@marcbouchenoire" property="twitter:creator" />
        <meta content="Dimmmensions" property="twitter:title" />
        <meta
          content="A collection of dimensions from iOS and iPadOS devices."
          property="twitter:description"
        />
        <meta
          content="https://dimmmensions.marcbouchenoire.com/meta.png"
          property="twitter:image"
        />
        <link href="/favicon.png" rel="icon" sizes="any" type="image/png" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta content="#95f" name="theme-color" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
