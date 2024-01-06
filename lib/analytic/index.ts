export const initCountly = async () => {
  if (process.env.NODE_ENV === 'development') return;

  const countly = (await import('countly-sdk-web')).default;

  if (window.Countly) return;

  window.Countly = countly;

  countly.init({
    debug: false,
    app_key: import.meta.env.VITE_COUNTLY_APP_KEY,
    url: import.meta.env.VITE_COUNTLY_URL,
    use_explicit_rc_api: true,
  });

  // track sessions automatically
  countly.track_sessions();
  // track pageviews automatically
  countly.track_pageview();
}
