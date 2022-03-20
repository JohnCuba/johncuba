import Head from 'next/head'
import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'

import '../src/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Head>
        <title>John Cuba</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
