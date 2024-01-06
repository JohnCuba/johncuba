// https://vike.dev/onRenderClient
import type { OnRenderClientSync } from 'vike/types'
import { Layout } from '../lib/view/layout'

const onRenderClient: OnRenderClientSync = (pageContext) => {
  /** Mount point of the app */
  let rootElemet = document.getElementById('app');

  /** Create mount point if there is not currently in dom */
  if (!rootElemet) {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
    rootElemet = container;
  }

  new Layout({
    target: rootElemet,
    hydrate: true,
    props: {
      Page: pageContext.Page as typeof Layout,
      // @ts-expect-error -- comes from +config.h.ts
      pageProps: pageContext.pageProps,
    }
  })
}

export default onRenderClient
