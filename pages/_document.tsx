import NDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="John Cuba - front-end developer" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preload" href="/fonts/LED-Dot-Matrix/LED-Dot-Matrix.ttf.woff" as="font" />
          <link rel="preload" href="/fonts/LED-Dot-Matrix/LED-Dot-Matrix.ttf.eot" as="font" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
