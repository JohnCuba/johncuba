export const initCountly = async () => {
  const countly = (await import('countly-sdk-web')).default;

  // @ts-expect-error
  if (window.Countly) return;

  // @ts-expect-error
  window.Countly = countly;

  countly.init({
    debug: true,
    app_key: import.meta.env.VITE_COUNTLY_APP_KEY,
    url: import.meta.env.VITE_COUNTLY_URL,
    use_explicit_rc_api: true,
  });

  // track sessions automatically
  countly.track_sessions();
  // track pageviews automatically
  countly.track_pageview();
}
