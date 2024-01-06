type initOptions = {
  debug: boolean,
  app_key: string,
  url: string,
  use_explicit_rc_api: boolean,
}

declare type Countly = {
  init(args: initOptions): void

  track_sessions(): void
  track_pageview(): void
}

declare module 'countly-sdk-web' {
  export = {} as Countly
}
