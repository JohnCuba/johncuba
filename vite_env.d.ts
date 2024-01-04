/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COUNTLY_APP_KEY: string
  readonly VITE_COUNTLY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv

}
