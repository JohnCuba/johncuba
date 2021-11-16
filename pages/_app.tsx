import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../src/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>John Cuba</title>
        <meta name="description" content="John Cuba - front-end developer with some dev-ops and back-end skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
