// https://vike.dev/onRenderClient
export default onRenderClient

import Layout from './Layout.svelte'

function onRenderClient(pageContext) {
  /** Mount point of the app */
  let rootElemet = document.getElementById('app');

  /** Create mount point if there is not currently in dom */
  if (!rootElemet) {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
    rootElemet = container;
  }

  const { Page, pageProps } = pageContext

  new Layout({
    target: rootElemet,
    hydrate: true,
    props: {
      pageProps: pageProps,
      Page
    }
  })
}