// https://vike.dev/onRenderHtml
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'

import { Layout } from '../lib/view/layout'

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  // @ts-expect-error -- not typed in svelte https://svelte.dev/docs/server-side-component-api
  const app = Layout.render(pageContext)
  const { html, head, css } = app

  return escapeInject`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${dangerouslySkipEscape(head)}
        <style>${css.code}</style>
      </head>
      <body>
        <div id="app">
          ${dangerouslySkipEscape(html)}
        </div>
      </body>
    </html>`
}

export default onRenderHtml
