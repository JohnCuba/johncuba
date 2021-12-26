import Head from 'next/head'
import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'

import '../src/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Head>
        <title>John Cuba</title>
        <meta name="description" content="John Cuba - front-end developer with some dev-ops and back-end skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
