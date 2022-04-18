export const API_BASE_URL = process.env.REACT_APP_API_HTTP_ENDPOINT || "";

export const IS_EXTENSION = !!process.env.REACT_APP_EXTENSION;

export const USE_LONG_POLL = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0);

export const REQUEST_INTERVAL_MS = Number(
  process.env.REACT_APP_REQUEST_INTERVAL || 3000 // 3 seconds
);

export const NOTIFICATION_INTERVAL_MS =
  Number(process.env.REACT_APP_NOTIFICATION_INTERVAL_MINUTES || 60) * 60 * 1000; // 1 hour
