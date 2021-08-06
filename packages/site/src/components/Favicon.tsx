import Head from "next/head"

interface Props {
  emoji: string
}

export function Favicon({ emoji }: Props) {
  return (
    <Head>
      <link
        href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="90" dominant-baseline="central" text-anchor="middle">${emoji}</text></svg>`}
        rel="icon"
      />
    </Head>
  )
}
